# Wallet

## Hierarchy

* [ReadOnlyWallet](../interfaces/_wallets_wallet_.readonlywallet.md)

  ↳ **Wallet**

  ↳ [UnlockableWallet](../interfaces/_wallets_wallet_.unlockablewallet.md)

## Implemented by

* [LocalWallet](../classes/_wallets_local_wallet_.localwallet.md)

## Index

### Properties

* [addAccount](../interfaces/_wallets_wallet_.wallet.md#addaccount)
* [computeSharedSecret](../interfaces/_wallets_wallet_.wallet.md#computesharedsecret)
* [decrypt](../interfaces/_wallets_wallet_.wallet.md#decrypt)
* [getAccounts](../interfaces/_wallets_wallet_.wallet.md#getaccounts)
* [hasAccount](../interfaces/_wallets_wallet_.wallet.md#hasaccount)
* [removeAccount](../interfaces/_wallets_wallet_.wallet.md#removeaccount)
* [signPersonalMessage](../interfaces/_wallets_wallet_.wallet.md#signpersonalmessage)
* [signTransaction](../interfaces/_wallets_wallet_.wallet.md#signtransaction)
* [signTypedData](../interfaces/_wallets_wallet_.wallet.md#signtypeddata)

## Properties

### addAccount

• **addAccount**: _addInMemoryAccount \| addRemoteAccount_

_Defined in_ [_packages/contractkit/src/wallets/wallet.ts:28_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L28)

### computeSharedSecret

• **computeSharedSecret**: _function_

_Inherited from_ [_ReadOnlyWallet_](../interfaces/_wallets_wallet_.readonlywallet.md)_._[_computeSharedSecret_](../interfaces/_wallets_wallet_.readonlywallet.md#computesharedsecret)

_Defined in_ [_packages/contractkit/src/wallets/wallet.ts:21_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L21)

#### Type declaration:

▸ \(`address`: [Address](_base_.md#address), `publicKey`: string\): _Promise‹Buffer›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `address` | [Address](_base_.md#address) |
| `publicKey` | string |

### decrypt

• **decrypt**: _function_

_Inherited from_ [_ReadOnlyWallet_](../interfaces/_wallets_wallet_.readonlywallet.md)_._[_decrypt_](../interfaces/_wallets_wallet_.readonlywallet.md#decrypt)

_Defined in_ [_packages/contractkit/src/wallets/wallet.ts:20_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L20)

#### Type declaration:

▸ \(`address`: [Address](_base_.md#address), `ciphertext`: Buffer\): _Promise‹Buffer›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `address` | [Address](_base_.md#address) |
| `ciphertext` | Buffer |

### getAccounts

• **getAccounts**: _function_

_Inherited from_ [_ReadOnlyWallet_](../interfaces/_wallets_wallet_.readonlywallet.md)_._[_getAccounts_](../interfaces/_wallets_wallet_.readonlywallet.md#getaccounts)

_Defined in_ [_packages/contractkit/src/wallets/wallet.ts:14_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L14)

#### Type declaration:

▸ \(\): [_Address_](_base_.md#address)_\[\]_

### hasAccount

• **hasAccount**: _function_

_Inherited from_ [_ReadOnlyWallet_](../interfaces/_wallets_wallet_.readonlywallet.md)_._[_hasAccount_](../interfaces/_wallets_wallet_.readonlywallet.md#hasaccount)

_Defined in_ [_packages/contractkit/src/wallets/wallet.ts:16_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L16)

#### Type declaration:

▸ \(`address?`: [Address](_base_.md#address)\): _boolean_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `address?` | [Address](_base_.md#address) |

### removeAccount

• **removeAccount**: _function_

_Inherited from_ [_ReadOnlyWallet_](../interfaces/_wallets_wallet_.readonlywallet.md)_._[_removeAccount_](../interfaces/_wallets_wallet_.readonlywallet.md#removeaccount)

_Defined in_ [_packages/contractkit/src/wallets/wallet.ts:15_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L15)

#### Type declaration:

▸ \(`address`: [Address](_base_.md#address)\): _void_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `address` | [Address](_base_.md#address) |

### signPersonalMessage

• **signPersonalMessage**: _function_

_Inherited from_ [_ReadOnlyWallet_](../interfaces/_wallets_wallet_.readonlywallet.md)_._[_signPersonalMessage_](../interfaces/_wallets_wallet_.readonlywallet.md#signpersonalmessage)

_Defined in_ [_packages/contractkit/src/wallets/wallet.ts:19_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L19)

#### Type declaration:

▸ \(`address`: [Address](_base_.md#address), `data`: string\): _Promise‹string›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `address` | [Address](_base_.md#address) |
| `data` | string |

### signTransaction

• **signTransaction**: _function_

_Inherited from_ [_ReadOnlyWallet_](../interfaces/_wallets_wallet_.readonlywallet.md)_._[_signTransaction_](../interfaces/_wallets_wallet_.readonlywallet.md#signtransaction)

_Defined in_ [_packages/contractkit/src/wallets/wallet.ts:17_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L17)

#### Type declaration:

▸ \(`txParams`: Tx\): _Promise‹EncodedTransaction›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `txParams` | Tx |

### signTypedData

• **signTypedData**: _function_

_Inherited from_ [_ReadOnlyWallet_](../interfaces/_wallets_wallet_.readonlywallet.md)_._[_signTypedData_](../interfaces/_wallets_wallet_.readonlywallet.md#signtypeddata)

_Defined in_ [_packages/contractkit/src/wallets/wallet.ts:18_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L18)

#### Type declaration:

▸ \(`address`: [Address](_base_.md#address), `typedData`: EIP712TypedData\): _Promise‹string›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `address` | [Address](_base_.md#address) |
| `typedData` | EIP712TypedData |

