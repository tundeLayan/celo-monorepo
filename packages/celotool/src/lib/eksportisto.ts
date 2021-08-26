import fs from 'fs'
import {
  cancelDataFlowJob,
  createDataflowJobIfNotExists,
  DataflowTemplate,
  waitForDataflowJobToBeRunning,
} from 'src/lib/dataflow'
import { envVar, fetchEnv, fetchEnvOrFallback, isVmBased } from 'src/lib/env-utils'
import {
  installGenericHelmChart,
  removeGenericHelmChart,
  upgradeGenericHelmChart,
} from 'src/lib/helm_deploy'
import {
  allowServiceAccountToPublishToTopic,
  createTopicIfNotExists,
  deleteTopic,
} from 'src/lib/pubsub'
import {
  createServiceAccountIfNotExists,
  getServiceAccountEmail,
  getServiceAccountKey,
} from 'src/lib/service-account-utils'
import { getInternalTxNodeLoadBalancerIP } from 'src/lib/vm-testnet-utils'
import { execCmd } from './cmd-utils'
import { outputIncludes, switchToProjectFromEnv } from './utils'

const yaml = require('js-yaml')
const chartDir = '../helm-charts/eksportisto/'

function getReleaseName(celoEnv: string) {
  const suffix = fetchEnvOrFallback(envVar.EKSPORTISTO_SUFFIX, '1')
  return `${celoEnv}-eksportisto-${suffix}`
}

function getTopicName(celoEnv: string) {
  return getReleaseName(celoEnv)
}

function getDataflowJobName(celoEnv: string) {
  return getReleaseName(celoEnv)
}

function getBucketName(celoEnv: string) {
  return `${celoEnv}-eksportisto-dataflow`
}

function getServiceAccountName(celoEnv: string) {
  const suffix = fetchEnvOrFallback(envVar.EKSPORTISTO_SUFFIX, '1')
  return `${celoEnv}-eksportisto-${suffix}`
}

export async function installHelmChart(celoEnv: string) {
  await installGenericHelmChart(
    celoEnv,
    getReleaseName(celoEnv),
    chartDir,
    await helmParameters(celoEnv)
  )
}

export async function upgradeHelmChart(celoEnv: string) {
  await upgradeGenericHelmChart(
    celoEnv,
    getReleaseName(celoEnv),
    chartDir,
    await helmParameters(celoEnv)
  )
}

export async function removeHelmRelease(celoEnv: string) {
  await cancelDataFlowJob(getDataflowJobName(celoEnv))
  await deleteTopic(getTopicName(celoEnv))
  await removeGenericHelmChart(getReleaseName(celoEnv), celoEnv)
}

function fetchSensitiveAccounts() {
  return JSON.stringify({})
}

async function getServiceAccountKeyBase64FromHelm(celoEnv: string) {
  const releaseName = getReleaseName(celoEnv)
  const chartInstalled = await outputIncludes(`helm list -n ${celoEnv}`, `${releaseName}`)
  if (chartInstalled) {
    const [output] = await execCmd(`helm get values -n ${celoEnv} ${releaseName}`)
    const values: any = yaml.safeLoad(output)
    return values.serviceAccountKeyBase64
  }
}

async function getServiceAccountKeyBase64(celoEnv: string) {
  // First check if value already exist in helm release. If so we pass the same value
  // and we avoid creating a new key for the service account
  const serviceAccountKeyBase64 = await getServiceAccountKeyBase64FromHelm(celoEnv)
  if (serviceAccountKeyBase64) {
    return serviceAccountKeyBase64
  } else {
    // We do not have the service account key in helm so we need to create the SA (if it does not exist)
    // and create a new key for the service account in any case
    await switchToProjectFromEnv()
    const serviceAccountName = getServiceAccountName(celoEnv)
    await createServiceAccountIfNotExists(serviceAccountName)
    const serviceAccountEmail = await getServiceAccountEmail(serviceAccountName)
    const serviceAccountKeyPath = `/tmp/gcloud-key-${serviceAccountName}.json`
    await getServiceAccountKey(serviceAccountEmail, serviceAccountKeyPath)
    return fs.readFileSync(serviceAccountKeyPath).toString('base64')
  }
}

async function ensureDataflowJobRunning(celoEnv: string) {
  const jobName = getDataflowJobName(celoEnv)
  await createDataflowJobIfNotExists(jobName, {
    template: DataflowTemplate.Cloud_PubSub_to_GCS_Text,
    bucketName: getBucketName(celoEnv),
    topicId: getTopicName(celoEnv),
    projectId: fetchEnv(envVar.TESTNET_PROJECT_NAME),
  })

  await waitForDataflowJobToBeRunning(jobName)
}

async function helmParameters(celoEnv: string) {
  const suffix = fetchEnvOrFallback(envVar.EKSPORTISTO_SUFFIX, '1')
  const topic = getTopicName(celoEnv)
  await createTopicIfNotExists(topic)
  const projectId = fetchEnv(envVar.TESTNET_PROJECT_NAME)
  await ensureDataflowJobRunning(celoEnv)
  const serviceAccountKeyBase64 = await getServiceAccountKeyBase64(celoEnv)
  const serviceAccountEmail = await getServiceAccountEmail(getServiceAccountName(celoEnv))
  await allowServiceAccountToPublishToTopic(topic, serviceAccountEmail)

  const params = [
    `--namespace ${celoEnv}`,
    `--set environment="${celoEnv}"`,
    `--set imageRepository="${fetchEnv(envVar.EKSPORTISTO_DOCKER_IMAGE_REPOSITORY)}"`,
    `--set imageTag="${fetchEnv(envVar.EKSPORTISTO_DOCKER_IMAGE_TAG)}"`,
    `--set deploymentSuffix=${suffix}`,
    `--set sensitiveAccountsBase64=${Buffer.from(fetchSensitiveAccounts())
      .toString('base64')
      .trim()}`,
    `--set serviceAccountBase64=${serviceAccountKeyBase64}`,
    `--set projectId=${projectId}`,
    `--set topicId=${topic}`,
  ]
  if (isVmBased()) {
    params.push(`--set web3Provider="ws://${await getInternalTxNodeLoadBalancerIP(celoEnv)}:8546"`)
  } else {
    params.push(`--set web3Provider="ws://tx-nodes:8546"`)
  }
  return params
}
