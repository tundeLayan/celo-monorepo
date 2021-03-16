import { sleep } from '@celo/base'
import { describe, test } from '@jest/globals'
import BigNumber from 'bignumber.js'
import { EnvTestContext } from '../context'
import {
  // fundAccountWithStableToken,
  getKey,
  initExchangeFromRegistry,
  initStableTokenFromRegistry,
  ONE,
  TestAccounts,
} from '../scaffold'

// @ts-ignore
export function runExchangeTest(context: EnvTestContext, stableTokensToTest: string[]) {
  describe('Exchange Test', () => {
    test(`sell CELO for cEUR`, async () => {
      /**
       * This code simply exchanges CELO for cEUR using the RootAccount.
       * It is intended to be used to fund the RootAccount with some cEUR that we can then use to run
       * the general exchange & transfer env-tests from the master branch once cEUR is activated on mainnet.
       */

      const logger = context.logger
      const root = await getKey(context.mnemonic, TestAccounts.Root)
      context.kit.connection.addAccount(root.privateKey)
      context.kit.defaultAccount = root.address

      const goldToken = await context.kit.contracts.getGoldToken()
      const exchange = await initExchangeFromRegistry('cEUR', context.kit)
      const stableTokenInstance = await initStableTokenFromRegistry('cEUR', context.kit)

      const initialcEURBalance = await stableTokenInstance.balanceOf(root.address)
      logger.debug(`initial cEUR balance in rootAccount: ${initialcEURBalance}`)
      const amountOfCeloToSell = ONE.times(2.5)

      const stableTokenAmountExpected = await exchange.getBuyTokenAmount(amountOfCeloToSell, true)
      logger.debug(`selling ${amountOfCeloToSell}, expecting ~${stableTokenAmountExpected} cEUR`)

      const approveGoldTx = await goldToken
        .approve(exchange.address, amountOfCeloToSell.toString())
        .send()
      await approveGoldTx.waitReceipt()
      await sleep(5000)
      logger.debug(`approved sell amount in the gold token contract, will now sell CELO`)

      const sellGoldTx = await exchange
        .sellGold(
          amountOfCeloToSell,
          stableTokenAmountExpected
            .times(0.9)
            .integerValue(BigNumber.ROUND_DOWN)
            .toString()
        )
        .send()
      const sellGoldReceipt = await sellGoldTx.waitReceipt()
      logger.debug(`successfully exchanged with MENTO`)
      const postcEURBalance = await stableTokenInstance.balanceOf(root.address)
      logger.debug(`new cEUR balance in rootAccount: ${postcEURBalance}`)
      logger.debug(sellGoldReceipt)
    })
  })
}
