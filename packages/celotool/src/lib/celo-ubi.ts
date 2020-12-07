import { execCmdWithExitOnFailure } from 'src/lib/cmd-utils'
import { installGenericHelmChart, removeGenericHelmChart } from 'src/lib/helm_deploy'
import { envVar, fetchEnv } from './env-utils'
import { createNamespaceIfNotExists}  from './cluster'

const helmChartPath = '../helm-charts/celo-ubi-api'

export async function installHelmChart(celoEnv: string) {
  await createNamespaceIfNotExists(celoEnv)
  return installGenericHelmChart(
    celoEnv,
    releaseName(celoEnv),
    helmChartPath,
    await helmParameters()
  )
}

export async function removeHelmRelease(celoEnv: string) {
  await removeGenericHelmChart(releaseName(celoEnv), celoEnv)
}

export async function upgradeHelmChart(celoEnv: string) {
  console.info(`Upgrading helm release ${releaseName(celoEnv)}`)

  const upgradeCmdArgs = `${releaseName(celoEnv)} ${helmChartPath} --namespace ${celoEnv} ${(
    await helmParameters()
  ).join(' ')}`

  if (process.env.CELOTOOL_VERBOSE === 'true') {
    await execCmdWithExitOnFailure(`helm upgrade --debug --dry-run ${upgradeCmdArgs}`)
  }
  await execCmdWithExitOnFailure(`helm upgrade ${upgradeCmdArgs}`)
  console.info(`Helm release ${releaseName(celoEnv)} upgrade successful`)
}

async function helmParameters() {

  return [
    `--set domain.name=${fetchEnv(envVar.CLUSTER_DOMAIN_NAME)}`,
    `--set celotool.image.repository=${fetchEnv(envVar.CELOTOOL_DOCKER_IMAGE_REPOSITORY)}`,
    `--set celotool.image.tag=${fetchEnv(envVar.CELOTOOL_DOCKER_IMAGE_TAG)}`,
    `--set celoubi.api.mnemonic="${fetchEnv(envVar.CELO_UBI_MNEMONIC)}"`,
    `--set celoubi.api.image.repository=${fetchEnv(envVar.CELO_UBI_DOCKER_IMAGE_REPOSITORY)}`,
    `--set celoubi.api.image.tag=${fetchEnv(envVar.CELO_UBI_DOCKER_IMAGE_TAG)}`,
    `--set celoubi.api.contractAddress=${fetchEnv(envVar.CELO_UBI_ADDRESS)}`,
    `--set celoubi.api.rpcHost=${fetchEnv(envVar.CELO_UBI_RPC_HOST)}`,
    `--set celoubi.api.domain.name=${fetchEnv(envVar.CLUSTER_DOMAIN_NAME)}`
  ]
}

function releaseName(celoEnv: string) {
  return `${celoEnv}-celo-ubi-api`
}
