import { DynamicEnvVar, envVar, fetchEnv } from 'src/lib/env-utils'
import {
  installGenericHelmChart,
  removeGenericHelmChart,
  upgradeGenericHelmChart,
} from 'src/lib/helm_deploy'
import { CloudProvider } from 'src/lib/k8s-cluster/base'
import {
  createKeyVaultIdentityIfNotExists,
  deleteAzureKeyVaultIdentity,
  getAzureKeyVaultIdentityName,
} from './azure'
import {
  getClusterConfigForContext,
  getContextDynamicEnvVarValues,
  getContextRegionForConfig,
} from './context-utils'

const helmChartPath = '../helm-charts/odis'

/**
 * Information for the Azure Key Vault
 */
interface ODISSignerAKSKeyVaultConfig {
  vaultName: string
  secretName: string
}

/**
 * Information for the Azure Key Vault
 */
interface ODISSignerGCPKeyVaultConfig {
  projectId: string
  secretName: string
  gcpServiceAccount: string
  k8sServiceAccount: string
}

/**
 * Information for the ODIS postgres db
 */
interface ODISSignerDatabaseConfig {
  host: string
  port: string
  username: string
  password: string
}

/**
 * Information for the ODIS logging
 */
interface ODISSignerLoggingConfig {
  level: string
  format: string
}

/*
 * Prefix for the cluster's identity name
 */
const identityNamePrefix = 'ODISSIGNERID'

/**
 * Env vars corresponding to each value for the ODISSignerAKSKeyVaultConfig for a particular Azure AKS context
 */
const contextODISSignerAKSKeyVaultConfigDynamicEnvVars: {
  [k in keyof ODISSignerAKSKeyVaultConfig]: DynamicEnvVar
} = {
  vaultName: DynamicEnvVar.ODIS_SIGNER_AZURE_KEYVAULT_NAME,
  secretName: DynamicEnvVar.ODIS_SIGNER_AZURE_KEYVAULT_SECRET_NAME,
}

/**
 * Env vars corresponding to each value for the ODISSignerAKSKeyVaultConfig for a particular Azure AKS context
 */
const contextODISSignerGCPKeyVaultConfigDynamicEnvVars: {
  [k in keyof ODISSignerGCPKeyVaultConfig]: DynamicEnvVar
} = {
  projectId: DynamicEnvVar.GCP_PROJECT_NAME,
  secretName: DynamicEnvVar.ODIS_SIGNER_GCP_SERVICE_ACCOUNT,
  gcpServiceAccount: DynamicEnvVar.ODIS_SIGNER_GCP_SERVICE_ACCOUNT,
  k8sServiceAccount: DynamicEnvVar.ODIS_SIGNER_K8S_SERVICE_ACCOUNT,
}

/**
 * Env vars corresponding to each value for the ODISSignerDatabaseConfig for a particular context
 */
const contextDatabaseConfigDynamicEnvVars: {
  [k in keyof ODISSignerDatabaseConfig]: DynamicEnvVar
} = {
  host: DynamicEnvVar.ODIS_SIGNER_DB_HOST,
  port: DynamicEnvVar.ODIS_SIGNER_DB_PORT,
  username: DynamicEnvVar.ODIS_SIGNER_DB_USERNAME,
  password: DynamicEnvVar.ODIS_SIGNER_DB_PASSWORD,
}

/**
 * Env vars corresponding to each value for the logging for a particular context
 */
const contextLoggingConfigDynamicEnvVars: {
  [k in keyof ODISSignerLoggingConfig]: DynamicEnvVar
} = {
  level: DynamicEnvVar.ODIS_SIGNER_LOG_LEVEL,
  format: DynamicEnvVar.ODIS_SIGNER_LOG_FORMAT,
}

function releaseName(celoEnv: string, context: string) {
  const contextK8sFriendly = context.toLowerCase().replace(/_/g, '-')
  return `${celoEnv}--${contextK8sFriendly}--odissigner`
}

export async function installODISHelmChart(celoEnv: string, context: string) {
  return installGenericHelmChart(
    celoEnv,
    releaseName(celoEnv, context),
    helmChartPath,
    await helmParameters(celoEnv, context)
  )
}

export async function upgradeODISChart(celoEnv: string, context: string) {
  return upgradeGenericHelmChart(
    celoEnv,
    releaseName(celoEnv, context),
    helmChartPath,
    await helmParameters(celoEnv, context)
  )
}

export async function removeHelmRelease(celoEnv: string, context: string) {
  await removeGenericHelmChart(releaseName(celoEnv, context), celoEnv)
  const keyVaultConfig = getContextDynamicEnvVarValues(
    contextODISSignerAKSKeyVaultConfigDynamicEnvVars,
    context
  )

  await deleteAzureKeyVaultIdentity(
    context,
    getAzureKeyVaultIdentityName(context, identityNamePrefix, keyVaultConfig.vaultName),
    keyVaultConfig.vaultName
  )
}

async function helmParameters(celoEnv: string, context: string) {
  const databaseConfig = getContextDynamicEnvVarValues(contextDatabaseConfigDynamicEnvVars, context)

  const loggingConfig = getContextDynamicEnvVarValues(contextLoggingConfigDynamicEnvVars, context, {
    level: 'trace',
    format: 'stackdriver',
  })

  // const clusterConfig = getAksClusterConfig(context)
  const clusterConfig = getClusterConfigForContext(context)

  let params = [
    `--set environment.name=${celoEnv}`,
    `--set environment.cluster.name=${clusterConfig.clusterName}`,
    // TODO: Seems environment.cluster.location is not being used in the chart
    `--set environment.cluster.location=${getContextRegionForConfig(clusterConfig)}`,
    `--set image.repository=${fetchEnv(envVar.ODIS_SIGNER_DOCKER_IMAGE_REPOSITORY)}`,
    `--set image.tag=${fetchEnv(envVar.ODIS_SIGNER_DOCKER_IMAGE_TAG)}`,
    `--set db.host=${databaseConfig.host}`,
    `--set db.port=${databaseConfig.port}`,
    `--set db.username=${databaseConfig.username}`,
    `--set db.password='${databaseConfig.password}'`,
    `--set blockchainProvider=${fetchEnv(envVar.ODIS_SIGNER_BLOCKCHAIN_PROVIDER)}`,
    `--set log.level=${loggingConfig.level}`,
    `--set log.format=${loggingConfig.format}`,
  ]

  if (clusterConfig.cloudProvider === CloudProvider.AZURE) {
    const keyVaultConfig = getContextDynamicEnvVarValues(
      contextODISSignerAKSKeyVaultConfigDynamicEnvVars,
      context
    )
    params.push(
      `--set cloudProvider=AZURE`,
      `--set keystore.vaultName=${keyVaultConfig.vaultName}`,
      `--set keystore.secretName=${keyVaultConfig.secretName}`
    )
    params.push(...(await ODISSignerAKSKeyVaultIdentityHelmParameters(context, keyVaultConfig)))
  } else if (clusterConfig.cloudProvider === CloudProvider.GCP) {
    const keyVaultConfig = getContextDynamicEnvVarValues(
      contextODISSignerGCPKeyVaultConfigDynamicEnvVars,
      context
    )
    params.push(
      `--set cloudProvider=GCP`,
      `--set keystore.projectId=${keyVaultConfig.projectId}`,
      `--set keystore.secretName=${keyVaultConfig.secretName}`,
      `--set gcpWorkloadIdentity.serviceAccountEmail=${contextODISSignerGCPKeyVaultConfigDynamicEnvVars.gcpServiceAccount}`,
      `--set k8sServiceAccountNameOverride=${contextODISSignerGCPKeyVaultConfigDynamicEnvVars.k8sServiceAccount}`
    )
  }

  return params
}

/**
 * Setups the Azure identity for accessing the Key Vault Secret and use with aad-pod-indetity,
 * and returns an array with the corresponding helm variables
 * More info: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
 */
async function ODISSignerAKSKeyVaultIdentityHelmParameters(
  context: string,
  keyVaultConfig: ODISSignerAKSKeyVaultConfig
) {
  const azureKVIdentity = await createKeyVaultIdentityIfNotExists(
    context,
    getAzureKeyVaultIdentityName(context, identityNamePrefix, keyVaultConfig.vaultName),
    keyVaultConfig.vaultName,
    null,
    null,
    ['get']
  )
  const params: string[] = [
    `--set azureKVIdentity.id=${azureKVIdentity.id}`,
    `--set azureKVIdentity.clientId=${azureKVIdentity.clientId}`,
  ]

  return params
}
