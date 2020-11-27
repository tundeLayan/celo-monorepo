import { IdentityMetadataWrapper } from '@celo/contractkit'
import { createStorageClaim } from '@celo/contractkit/lib/identity/claims/claim'
import OffchainDataWrapper from '@celo/contractkit/lib/identity/offchain-data-wrapper'
import { PrivateNameAccessor } from '@celo/contractkit/lib/identity/offchain/accessors/name'
import { LocalStorageWriter } from '@celo/contractkit/lib/identity/offchain/storage-writers'
import { UnlockableWallet } from '@celo/contractkit/lib/wallets/wallet'
import { AccountsWrapper } from '@celo/contractkit/lib/wrappers/Accounts'
import {
  ensureLeading0x,
  normalizeAddressWith0x,
  privateKeyToAddress,
} from '@celo/utils/lib/address'
import { NativeSigner } from '@celo/utils/lib/signatureUtils'
import { call, put, select } from 'redux-saga/effects'
import { profileUploaded } from 'src/account/actions'
import { isProfileUploadedSelector, nameSelector } from 'src/account/selectors'
import { ErrorMessages } from 'src/app/ErrorMessages'
import { sendTransaction } from 'src/transactions/send'
import { newTransactionContext } from 'src/transactions/types'
import Logger from 'src/utils/Logger'
import { getContractKit, getWallet } from 'src/web3/contracts'
import { currentAccountSelector, dataEncryptionKeySelector } from 'src/web3/selectors'

const TAG = 'account/profileInfo'
const BUCKET_URL = 'https://storage.googleapis.com/isabellewei-test/'

class ValoraStorageWriter extends LocalStorageWriter {
  private readonly account: string

  constructor(readonly local: string, bucket: string) {
    super(local)
    this.account = bucket
  }

  // TEMP for testing
  async write(data: Buffer, dataPath: string): Promise<void> {
    const response = await fetch(`${BUCKET_URL}${this.account}${dataPath}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: data,
    })
    if (!response.ok) {
      throw Error('Unable to write')
    }
  }
}

// requires that the DEK has already been registered
export function* uploadProfileInfo() {
  const isAlreadyUploaded = yield select(isProfileUploadedSelector)
  if (isAlreadyUploaded) {
    return
  }
  try {
    try {
      const privateDataKey: string | null = yield select(dataEncryptionKeySelector)
      if (!privateDataKey) {
        throw new Error('No data key in store. Should never happen.')
      }
      const dataKeyaddress = normalizeAddressWith0x(
        privateKeyToAddress(ensureLeading0x(privateDataKey))
      )
      const wallet: UnlockableWallet = yield call(getWallet)
      yield call([wallet, wallet.addAccount], privateDataKey, '')
      // unlocking with a duration of 0 should unlock the DEK indefinitely
      yield call([wallet, wallet.unlockAccount], dataKeyaddress, '', 0)
    } catch (e) {
      if (e === ErrorMessages.GETH_ACCOUNT_ALREADY_EXISTS) {
        Logger.warn(TAG + '@uploadProfileInfo', 'Attempted to import DEK to wallet again')
      } else {
        Logger.error(TAG + '@uploadProfileInfo', 'Error importing DEK to wallet')
        throw e
      }
    }

    yield call(addMetadataClaim)
    yield call(uploadName)

    yield put(profileUploaded())
    // TODO: add analytics
  } catch (e) {
    Logger.error(TAG + '@uploadProfileInfo', 'Error uploading profile', e)
    // TODO
  }
}

export function* addMetadataClaim() {
  try {
    const contractKit = yield call(getContractKit)
    const account = yield select(currentAccountSelector)
    const metadata = IdentityMetadataWrapper.fromEmpty(account)
    yield call(
      [metadata, 'addClaim'],
      createStorageClaim(BUCKET_URL),
      NativeSigner(contractKit.web3.eth.sign, account)
    )
    Logger.info(TAG + '@addMetadataClaim' + 'created storage claim on chain')
    yield call(writeToGCPBucket, metadata.toString(), `${account}/metadata.json`)
    Logger.info(TAG + '@addMetadataClaim' + 'uploaded metadata.json')
    const accountsWrapper: AccountsWrapper = yield call([
      contractKit.contracts,
      contractKit.contracts.getAccounts,
    ])
    const setAccountTx = accountsWrapper.setMetadataURL(`${BUCKET_URL}${account}/metadata.json`)
    const context = newTransactionContext(TAG, 'Set metadata URL')
    yield call(sendTransaction, setAccountTx.txo, account, context)
    Logger.info(TAG + '@addMetadataClaim' + 'set metadata URL')
  } catch (error) {
    Logger.error(`${TAG}/addMetadataClaim`, 'Could not add metadata claim', error)
    throw error
  }
}

// TEMP for testing
async function writeToGCPBucket(data: string, dataPath: string) {
  const response = await fetch(`${BUCKET_URL}${dataPath}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
  if (!response.ok) {
    console.log(response.statusText)
    throw Error('Unable to claim metadata')
  }
}

export function* uploadName() {
  const contractKit = yield call(getContractKit)
  const account = yield select(currentAccountSelector)
  const name = yield select(nameSelector)

  const storageWriter = new ValoraStorageWriter(`/tmp/${account}`, account)
  const offchainWrapper = new OffchainDataWrapper(account, contractKit)
  offchainWrapper.storageWriter = storageWriter
  const nameAccessor = new PrivateNameAccessor(offchainWrapper)

  const writeError = yield call([nameAccessor, 'write'], { name }, [])
  Logger.info(TAG + '@uploadName' + 'uploaded name')

  if (writeError) {
    Logger.error(TAG + '@uploadName', error)
    throw Error('Unable to write data')
  }
}

// this function gives permission to the recipient to view the user's profile info
export function* uploadSymmetricKeys(recipientAddresses: string[]) {
  // TODO: check if key for user already exists, skip if yes
  const account = yield select(currentAccountSelector)
  const contractKit = yield call(getContractKit)

  const privateDataKey: string | null = yield select(dataEncryptionKeySelector)
  if (!privateDataKey) {
    throw new Error('No data key in store. Should never happen.')
  }
  const dataKeyaddress = normalizeAddressWith0x(
    privateKeyToAddress(ensureLeading0x(privateDataKey))
  )
  const wallet: UnlockableWallet = yield call(getWallet)
  // unlocking with a duration of 0 should unlock the DEK indefinitely
  yield call([wallet, wallet.unlockAccount], dataKeyaddress, '', 0)

  const storageWriter = new ValoraStorageWriter(`/tmp/${account}`, account)
  const offchainWrapper = new OffchainDataWrapper(account, contractKit)
  offchainWrapper.storageWriter = storageWriter
  const nameAccessor = new PrivateNameAccessor(offchainWrapper)

  const writeError = yield call([nameAccessor, 'writeKeys'], { name }, recipientAddresses)
  Logger.info(TAG + '@uploadSymmetricKeys', 'uploaded symmetric keys for ' + recipientAddresses)

  if (writeError) {
    Logger.error(TAG + '@uploadSymmetricKeys', writeError)
    throw Error('Unable to write keys')
  }
}

export function* getProfileInfo(address: string) {
  const account = yield select(currentAccountSelector)
  const contractKit = yield call(getContractKit)

  const privateDataKey: string | null = yield select(dataEncryptionKeySelector)
  if (!privateDataKey) {
    throw new Error('No data key in store. Should never happen.')
  }
  const dataKeyaddress = normalizeAddressWith0x(
    privateKeyToAddress(ensureLeading0x(privateDataKey))
  )
  const wallet: UnlockableWallet = yield call(getWallet)
  // unlocking with a duration of 0 should unlock the DEK indefinitely
  yield call([wallet, wallet.unlockAccount], dataKeyaddress, '', 0)

  const offchainWrapper = new OffchainDataWrapper(account, contractKit)
  const nameAccessor = new PrivateNameAccessor(offchainWrapper)
  console.log('READING NAME FOR', address)
  try {
    const result = yield call([nameAccessor, 'read'], address)
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
    Logger.warn("can't fetch name for", address)
  }
}
