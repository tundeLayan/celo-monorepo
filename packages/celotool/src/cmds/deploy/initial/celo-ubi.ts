import { installHelmChart } from 'src/lib/celo-ubi'
import { switchToClusterFromEnv } from 'src/lib/cluster'
import yargs from 'yargs'
import { InitialArgv } from '../initial'

export const command = 'celo-ubi'

export const describe = 'deploy the celo-ubi package'

export const builder = (argv: yargs.Argv) => {
  return argv
}

export const handler = async (argv: InitialArgv) => {
  await switchToClusterFromEnv()
  await installHelmChart(argv.celoEnv)
}
