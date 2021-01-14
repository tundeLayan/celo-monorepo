import OffchainDataWrapper from '@celo/identity/src/offchain-data-wrapper'
import { PublicNameAccessor } from '@celo/identity/src/offchain/accessors/name'
import colors from '@celo/react-components/styles/colors'
import fontStyles from '@celo/react-components/styles/fonts'
import { Spacing } from '@celo/react-components/styles/styles'
import { EIP712TypedData } from '@celo/utils/src/sign-typed-data-utils'
import WalletConnect from '@walletconnect/client'
import { IConnector, IJsonRpcRequest, ISessionParams } from '@walletconnect/types'
import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Dialog from 'src/components/Dialog'
import DrawerTopBar from 'src/navigator/DrawerTopBar'
import { getPassword } from 'src/pincode/authentication'
import { getContractKitAsync, getWalletAsync } from 'src/web3/contracts'

enum Actions {
  sendTransaction = 'eth_sendTransaction',
  personalSign = 'personal_sign',
  signTypedData = 'eth_signTypedData',
}

function parsePersonalSign(req: IJsonRpcRequest): { from: string; payload: string } {
  const [payload, from] = req.params
  return { from, payload }
}
function parseSignTypedData(req: IJsonRpcRequest): { from: string; payload: EIP712TypedData } {
  const [from, payload] = req.params
  return { from, payload: JSON.parse(payload) }
}

function hexToUtf8(hex: string) {
  return Buffer.from(hex.replace('0x', ''), 'hex').toString()
}

function Scan(props: any) {
  const [uri, setUri] = useState('')
  const [wc, setWc] = useState<IConnector | null>(null)
  const [pendingRequest, setPendingRequest] = useState<IJsonRpcRequest | null>(null)
  const [pendingSession, setPendingSession] = useState<ISessionParams | null>(null)
  // @ts-ignore
  const account = useSelector((state) => state.web3.account)
  const [requestMetadata, setRequestMetadata] = useState<{ to: string } | null>(null)
  // const { backupCompleted, route, account } = this.props
  // const navigatedFromSettings = route.params?.navigatedFromSettings

  // const account = useSelector(getAccount)
  // const wallet = useSelector(getWallet)

  // console.log('>>>', account, wallet)

  async function handleRequest() {
    if (!pendingRequest) {
      return
    }
    // console.log('call_request eeee', 'error=', error, 'method=', method, 'params=', params)

    const wallet = await getWalletAsync()
    // if (!wallet.isAccountUnlocked(account)) {
    const password = await getPassword('000008')
    await wallet.unlockAccount(account, password, 100000)
    // }

    const { id, method } = pendingRequest

    if (method === Actions.personalSign) {
      const { payload, from } = parsePersonalSign(pendingRequest)
      const signature = await wallet.signPersonalMessage(from, payload)
      wc?.approveRequest({
        id,
        result: signature,
      })
      setPendingRequest(null)
      return
    }

    if (method === Actions.signTypedData) {
      const { from, payload } = parseSignTypedData(pendingRequest)
      const signature = await wallet.signTypedData(from, payload)
      wc?.approveRequest({
        id,
        result: signature,
      })
      setPendingRequest(null)
      return
    }

    if (method === 'eth_sendTransaction') {
      const [tx] = pendingRequest.params
      const kit = await getContractKitAsync(false)
      const sent = await kit.sendTransaction(tx)
      const hash = await sent.getHash()
      console.log('hash', hash)
      wc?.approveRequest({
        id,
        result: hash,
      })
      setPendingRequest(null)
      return
    }

    throw new Error(`Unknown action ${method}`)
  }

  function InitiateConnectionModal() {
    return (
      <Dialog
        title={`Establish connection with ${pendingSession?.peerMeta?.name}?`}
        isVisible={!!pendingSession}
        actionText="Allow"
        secondaryActionText="Cancel"
        actionPress={() => {
          wc?.approveSession({
            accounts: [account],
            chainId: 44787,
          })
          setPendingSession(null)
        }}
        secondaryActionPress={() => {
          wc?.rejectSession({ message: 'User cancelled' })
          setPendingSession(null)
        }}
      >
        <Text>
          {pendingSession?.peerMeta?.name}{' '}
          {pendingSession?.peerMeta?.description
            ? `(${pendingSession?.peerMeta?.description}) `
            : ''}
          is attempting to establish a connection with your device.
        </Text>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
        <Text>Don't be alarmed, every action will still have to be manually approved by you.</Text>
      </Dialog>
    )
  }

  function ConfirmActionModal() {
    if (!pendingRequest) {
      return null
    }

    let body
    if (pendingRequest.method === Actions.personalSign) {
      const { payload } = parsePersonalSign(pendingRequest)
      body = (
        <View>
          <View>
            <Text>{wc?.peerMeta?.name} is requesting you sign the following payload:</Text>
          </View>
          <View style={{ backgroundColor: colors.goldFaint, padding: 12, marginVertical: 12 }}>
            <Text>{hexToUtf8(payload)}</Text>
          </View>
        </View>
      )
    }

    if (pendingRequest.method === Actions.signTypedData) {
      const { payload } = parseSignTypedData(pendingRequest)
      body = (
        <View>
          <View>
            <Text>{wc?.peerMeta?.name} is requesting you sign the following payload:</Text>
          </View>

          <View style={{ backgroundColor: colors.goldFaint, padding: 12, marginVertical: 12 }}>
            <Text>{JSON.stringify(payload, null, 2)}</Text>
          </View>
        </View>
      )
    }

    // note this is hard coded to handle CELO transfers right now
    if (pendingRequest.method === Actions.sendTransaction) {
      const [tx] = pendingRequest.params
      const value = new BigNumber(tx.value).toNumber()
      body = (
        <View>
          <View>
            <Text>{wc?.peerMeta?.name} is requesting transfer the following:</Text>
          </View>

          <Text style={{ paddingTop: 36 }}>Value (CELO): {value}</Text>
          <Text>To: {requestMetadata ? `${requestMetadata.to} (${tx.to})` : tx.to}</Text>
        </View>
      )
    }

    return (
      <Dialog
        title="Approve Action"
        isVisible={!!pendingRequest}
        actionText="Approve"
        actionPress={handleRequest}
        secondaryActionText="Cancel"
        secondaryActionPress={() => setPendingRequest(null)}
        testID="ConfirmActionModal"
      >
        {body}

        <View style={{ paddingTop: 48 }}>
          <Text style={{ color: colors.gray5 }}>
            Worried about this request? Get in touch with Valora Support
          </Text>
        </View>
      </Dialog>
    )
  }

  const initiate = async () => {
    // Create connector
    const connector = new WalletConnect({
      uri,
      clientMeta: {
        description: 'A mobile payments app that works worldwide',
        url: 'https://valoraapp.com',
        icons: ['https://walletconnect.org/walletconnect-logo.png'],
        name: 'Valora',
      },
    })
    setWc(connector)

    connector.on('session_request', (error, payload) => {
      console.log('session_request', error, JSON.stringify(payload, null, 2))
      const [session] = payload.params
      setPendingSession(session)
    })

    connector.on('call_request', async (error, req) => {
      // get request metadata if it exists
      console.log(req)
      if (req.params[0].to) {
        const wrapper = new OffchainDataWrapper(account, await getContractKitAsync(true))
        const name = new PublicNameAccessor(wrapper)
        const offchainReadResult = await name.readAsResult(req.params[0].to)
        if (offchainReadResult.ok) {
          setRequestMetadata({ to: offchainReadResult.result.name })
        }
      }

      setPendingRequest(req)
    })

    connector.on('disconnect', (error, payload) => {
      console.log('disconnect', error, payload)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <DrawerTopBar />
      <InitiateConnectionModal />
      <ConfirmActionModal />
      <TextInput
        style={{
          width: '100%',
          borderColor: 'green',
          borderWidth: 1,
          borderStyle: 'solid',
          padding: 12,
        }}
        value={uri}
        onChangeText={(newQr) => setUri(newQr)}
      ></TextInput>
      <Button title="Initiate" onPress={initiate} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  introContainer: {
    flex: 1,
    paddingHorizontal: Spacing.Thick24,
    justifyContent: 'center',
  },
  postSetupContentContainer: {
    flex: 1,
  },
  postSetupContainer: {
    flex: 1,
    paddingTop: Spacing.Thick24,
    paddingHorizontal: Spacing.Regular16,
  },
  postSetupTitle: {
    ...fontStyles.h2,
    marginBottom: Spacing.Smallest8,
  },
  h1: {
    ...fontStyles.h1,
    paddingBottom: Spacing.Regular16,
    paddingTop: Spacing.Regular16,
  },
  body: {
    ...fontStyles.large,
    paddingBottom: Spacing.Regular16,
  },
  postSetupBody: {
    ...fontStyles.regular,
    marginVertical: Spacing.Regular16,
    flexGrow: 1,
  },
  postSetupCTA: {
    alignSelf: 'center',
    paddingVertical: Spacing.Regular16,
    marginBottom: Spacing.Regular16,
  },
})

export default Scan
