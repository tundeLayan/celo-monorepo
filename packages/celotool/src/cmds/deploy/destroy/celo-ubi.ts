import { removeHelmRelease } from 'src/lib/celo-ubi'
import { switchToClusterFromEnv } from 'src/lib/cluster'
import { DestroyArgv } from '../destroy'

export const command = 'celo-ubi'

export const describe = 'destroy the celo-ubi deploy'

export const builder = {}

export const handler = async (argv: DestroyArgv) => {
  await switchToClusterFromEnv()
  await removeHelmRelease(argv.celoEnv)
}
