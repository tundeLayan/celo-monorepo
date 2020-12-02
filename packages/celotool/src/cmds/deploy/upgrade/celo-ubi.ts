import { upgradeHelmChart } from 'src/lib/celo-ubi'
import { switchToClusterFromEnv } from 'src/lib/cluster'
import yargs from 'yargs'
import { UpgradeArgv } from '../upgrade'

export const command = 'celo-ubi'

export const describe = 'upgrade the celo-ubi package'

export const builder = (argv: yargs.Argv) => {
  return argv
}

export const handler = async (argv: UpgradeArgv) => {
  await switchToClusterFromEnv()
  await upgradeHelmChart(argv.celoEnv)
}
