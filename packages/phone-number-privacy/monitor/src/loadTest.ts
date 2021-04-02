import { ErrorMessages } from '@celo/identity/lib/odis/query'
import { rootLogger as logger } from '@celo/phone-number-privacy-common'
import { queryOdisForSalt } from './query'

export const runTest = async () => {
  while (true) {
    const test = []
    for (let i = 0; i < 10; i++) {
      test.push(
        new Promise(async (resolve, reject) => {
          logger.info('Performing test query')
          try {
            await queryOdisForSalt()
            resolve(true)
          } catch (err) {
            if ((err as Error).message === ErrorMessages.ODIS_QUOTA_ERROR) {
              resolve(true)
            } else {
              reject(err)
            }
          }
        })
      )
    }
    await Promise.all(test)
  }
}

runTest()
