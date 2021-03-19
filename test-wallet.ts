import { attestationSecurityCode } from '@celo/utils/lib/typed-data-constructors'
import { newLedgerWalletWithSetup } from '@celo/wallet-ledger'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'

async function main() {
  TransportNodeHid.create().then(async (transport) => {
    const wallet = await newLedgerWalletWithSetup(transport)
    await wallet.init()
    const res = await wallet.signTypedData(
      '0xD744bCDB71c4D4ef5b32143E6a1a3740207343Eb',
      attestationSecurityCode('code')
    )
    console.log(res)
  })
}

main()
