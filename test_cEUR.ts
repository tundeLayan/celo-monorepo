import { CeloContract, newKit } from './packages/sdk/contractkit'

async function sendcEUR(kit, fromAddres, toAddress) {
  let stabletokenEUR = await kit.contracts.getStableTokenEUR()
  console.log('sending...')
  await stabletokenEUR.transfer(toAddress, 1).send({ from: fromAddres })
}

async function exchange(kit, fromAddres) {
  console.log('exchange should not work')
  const exchange = await kit.contracts.getExchangeEUR()
  let celotoken = await kit.contracts.getGoldToken()

  console.log('exchange address', exchange.address)
  console.log('buckets:' + (await exchange.getBuyAndSellBuckets(true)))
  console.log('increase allowance')
  await celotoken
    .increaseAllowance(exchange.address, (1000e18).toFixed())
    .sendAndWaitForReceipt({ from: fromAddres })
  await celotoken
    .increaseAllowance(celotoken.address, (1000e18).toFixed())
    .sendAndWaitForReceipt({ from: fromAddres })
  console.log('exchanging...')

  try {
    await exchange.buy(1e18, 0, true).sendAndWaitForReceipt()
  } catch (error) {
    console.log('buy failed:' + error)
  }
  await celotoken
    .increaseAllowance(exchange.address, (1000e18).toFixed())
    .sendAndWaitForReceipt({ from: fromAddres })
  await celotoken
    .increaseAllowance(celotoken.address, (1000e18).toFixed())
    .sendAndWaitForReceipt({ from: fromAddres })
  try {
    await exchange.sell(1e18, 0, false).sendAndWaitForReceipt()
  } catch (error) {
    console.log('sell failed:' + error)
  }
}

async function main() {
  const kit = newKit('http://localhost:8545')
  kit.connection.addAccount('')
  const pre_mint_account = '0xb04778c00a8e30f59bfc91dd74853c4f32f34e54'
  const validator_1_address = '0x8947f99fa40133f30c43ade925fcbd0abc885b3c'

  kit.defaultAccount = pre_mint_account

  await kit.setFeeCurrency(CeloContract.StableToken)

  console.log('StableToken balance:' + (await kit.contracts.getStableTokenEUR()).address)

  console.log('Community fund balance')
  let totalBalance = await kit.getTotalBalance('0xCF691062547bbe97B25B07f69C2Bffc93B4ddb96')
  console.log(totalBalance)

  console.log('Pre-mint address')
  totalBalance = await kit.getTotalBalance(pre_mint_account)
  console.log(totalBalance)

  // console.log('Send some cEUR')
  // sendcEUR(kit,
  //   pre_mint_account, // from
  //   validator_1_address) // to

  console.log('Pre-mint address')
  totalBalance = await kit.getTotalBalance(pre_mint_account)
  console.log(totalBalance['cEUR'].toString())

  await exchange(kit, pre_mint_account)
}

main()
  .then((text) => {})
  .catch((err) => {
    console.log(err)
  })
