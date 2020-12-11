# wrappers/MetaTransactionWallet

## Index

### Classes

* [MetaTransactionWalletWrapper](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md)

### Interfaces

* [RawTransaction](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md)
* [TransactionObjectWithValue](../interfaces/_wrappers_metatransactionwallet_.transactionobjectwithvalue.md)

### Type aliases

* [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)

### Functions

* [buildMetaTxTypedData](_wrappers_metatransactionwallet_.md#const-buildmetatxtypeddata)
* [toRawTransaction](_wrappers_metatransactionwallet_.md#const-torawtransaction)
* [toTransactionBatch](_wrappers_metatransactionwallet_.md#const-totransactionbatch)

## Type aliases

### TransactionInput

Ƭ **TransactionInput**: _TransactionObject‹T› \|_ [_TransactionObjectWithValue_](../interfaces/_wrappers_metatransactionwallet_.transactionobjectwithvalue.md)_‹T› \|_ [_RawTransaction_](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:30_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L30)

## Functions

### `Const` buildMetaTxTypedData

▸ **buildMetaTxTypedData**\(`walletAddress`: [Address](_base_.md#address), `tx`: [RawTransaction](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md), `nonce`: number, `chainId`: number\): _EIP712TypedData_

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:265_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L265)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `walletAddress` | [Address](_base_.md#address) |
| `tx` | [RawTransaction](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md) |
| `nonce` | number |
| `chainId` | number |

**Returns:** _EIP712TypedData_

### `Const` toRawTransaction

▸ **toRawTransaction**\(`tx`: [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any›\): [_RawTransaction_](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:220_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L220)

Turns any possible way to pass in a transaction into the raw values that are actually required. This is used both internally to normalize ways in which transactions are passed in but also public in order for one instance of ContractKit to serialize a meta transaction to send over the wire and be consumed somewhere else.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `tx` | [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any› | TransactionInput union of all the ways we expect transactions |

**Returns:** [_RawTransaction_](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md)

a RawTransactions that's serializable

### `Const` toTransactionBatch

▸ **toTransactionBatch**\(`txs`: Array‹[TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any››\): _object_

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:248_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L248)

Turns an array of transaction inputs into the argument that need to be passed to the executeTransactions call. Main transformation is that all the `data` parts of each transaction in the batch are concatenated and an array of lengths is constructed. This is a gas optimisation on the contract.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `txs` | Array‹[TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any›› | Array&gt; array of txs |

**Returns:** _object_

Params for the executeTransactions method call

* **callData**: _string_
* **callDataLengths**: _number\[\]_
* **destinations**: _string\[\]_
* **values**: _string\[\]_

