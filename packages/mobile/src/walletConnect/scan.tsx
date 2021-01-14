import colors from '@celo/react-components/styles/colors'
import fontStyles from '@celo/react-components/styles/fonts'
import { Spacing } from '@celo/react-components/styles/styles'
import WalletConnect from '@walletconnect/client'
import { IConnector, IJsonRpcRequest } from '@walletconnect/types'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Dialog from 'src/components/Dialog'
import DrawerTopBar from 'src/navigator/DrawerTopBar'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import { getPassword } from 'src/pincode/authentication'
import { getContractKitAsync, getWalletAsync } from 'src/web3/contracts'
WalletConnect
enum Actions {
  sendTransaction = 'eth_sendTransaction',
  personalSign = 'personal_sign',
  signTypedData = 'eth_signTypedData',
}

function parsePersonalSign(req: IJsonRpcRequest): { from: string; payload: string } {
  const [from, payload] = req.params
  return { from, payload }
}

function Scan(props: any) {
  const [uri, setUri] = useState('')
  const [wc, setWc] = useState<IConnector | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [pendingRequest, setPendingRequest] = useState<IJsonRpcRequest | null>(null)
  // @ts-ignore
  const account = useSelector((state) => state.web3.account)
  // const { backupCompleted, route, account } = this.props
  // const navigatedFromSettings = route.params?.navigatedFromSettings

  // const account = useSelector(getAccount)
  // const wallet = useSelector(getWallet)

  // console.log('>>>', account, wallet)

  function ConfirmActionModal({
    isVisible,
    onConfirm,
    onCancel,
  }: {
    isVisible: boolean
    onConfirm: any
    onCancel: any
  }) {
    if (!pendingRequest) {
      return null
    }

    let body
    if (pendingRequest.method === Actions.personalSign) {
      const { from, payload } = parsePersonalSign(pendingRequest)
      body = (
        <View>
          <Text>{Buffer.from(payload, 'hex').toString()}</Text>
        </View>
      )
    }

    return (
      <Dialog
        title="Approve Action"
        isVisible={isVisible}
        actionText="Approve"
        actionPress={onConfirm}
        secondaryActionText="Cancel"
        secondaryActionPress={onCancel}
        // image={inviteModal}
        testID="ConfirmActionModal"
      >
        <Text>Hello hello</Text>
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

    connector.on('session_request', (error, payload) => {
      console.log('session_request', error, JSON.stringify(payload, null, 2))
      connector.approveSession({
        accounts: [account],
        chainId: 44787,
      })
      setWc(connector)
    })

    connector.on('call_request', async (error, { id, method, params }) => {
      setShowConfirmModal(true)
      setPendingRequest({ id, method, params })
      return
      console.log('call_request eeee', 'error=', error, 'method=', method, 'params=', params)

      const wallet = await getWalletAsync()
      const password = await getPassword('000008')

      if (method === 'personal_sign') {
        const [data, from] = params
        console.log('unlocked', await wallet.unlockAccount(from, password, 100000))
        const signature = await wallet.signPersonalMessage(from, data)
        console.log('got signature', signature)
        connector.approveRequest({
          id,
          result: signature,
        })
      }

      if (method === 'eth_signTypedData') {
        const [from, data] = params
        console.log('unlocked', await wallet.unlockAccount(from, password, 100000))
        console.log('parsed data', JSON.parse(data))
        const signature = await wallet.signTypedData(from, JSON.parse(data))
        connector.approveRequest({
          id,
          result: signature,
        })
      }

      if (method === 'eth_sendTransaction') {
        const [tx] = params
        console.log('unlocked', await wallet.unlockAccount(tx.from, password, 100000))
        const kit = await getContractKitAsync(false)
        const sent = await kit.sendTransaction(tx)
        const hash = await sent.getHash()
        // const result = await sendTransactionAsync(tx, tx.from, undefined)
        // const hash = await result.transactionHash
        console.log('hash', hash)
        connector.approveRequest({
          id,
          result: hash,
        })
      }

      // connector.killSession()
    })

    connector.on('disconnect', (error, payload) => {
      console.log('disconnect', error, payload)

      // Delete connector
    })

    console.log('>>>', connector)
  }

  return (
    <SafeAreaView style={styles.container}>
      <DrawerTopBar />
      <ConfirmActionModal isVisible={showConfirmModal} onCancel={() => {}} onConfirm={() => {}} />
      <Text>Hello</Text>
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

interface AccountKeyStartProps {
  onPrimaryPress: () => void
}

function goToAccountKeyGuide() {
  navigate(Screens.AccountKeyEducation, { nextScreen: Screens.BackupIntroduction })
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
