# MetaTransactionWalletWrapper

Class that wraps the MetaTransactionWallet

## Hierarchy

* [BaseWrapper](../classes/_wrappers_basewrapper_.basewrapper.md)‹MetaTransactionWallet›

  ↳ **MetaTransactionWalletWrapper**

## Index

### Constructors

* [constructor](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#constructor)

### Properties

* [\_chainId](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#optional-_chainid)
* [\_signer](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#optional-_signer)
* [eip712DomainSeparator](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#eip712domainseparator)
* [eventTypes](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#eventtypes)
* [events](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#events)
* [getMetaTransactionDigest](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#getmetatransactiondigest)
* [getMetaTransactionSigner](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#getmetatransactionsigner)
* [isOwner](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#isowner)
* [methodIds](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#methodids)
* [nonce](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#nonce)
* [setEip712DomainSeparator](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#seteip712domainseparator)
* [setSigner](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#setsigner)
* [transferERC20ToSigner](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#transfererc20tosigner)
* [transferOwnership](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#transferownership)

### Accessors

* [address](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#address)

### Methods

* [executeMetaTransaction](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#executemetatransaction)
* [executeTransaction](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#executetransaction)
* [executeTransactions](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#executetransactions)
* [getPastEvents](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#getpastevents)
* [signAndExecuteMetaTransaction](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#signandexecutemetatransaction)
* [signMetaTransaction](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#signmetatransaction)
* [signer](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md#signer)

## Constructors

### constructor

+ **new MetaTransactionWalletWrapper**\(`kit`: [ContractKit](../classes/_kit_.contractkit.md), `contract`: MetaTransactionWallet\): [_MetaTransactionWalletWrapper_](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md)

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_constructor_](../classes/_wrappers_basewrapper_.basewrapper.md#constructor)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:26_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L26)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `kit` | [ContractKit](../classes/_kit_.contractkit.md) |
| `contract` | MetaTransactionWallet |

**Returns:** [_MetaTransactionWalletWrapper_](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md)

## Properties

### `Optional` \_chainId

• **\_chainId**? : _undefined \| number_

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:190_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L190)

Get and cache the chain ID -- assume it's static for a kit instance

**`returns`** chainId

### `Optional` \_signer

• **\_signer**? : [_Address_](_base_.md#address)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:202_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L202)

Get an cache the signer - it should be static for a Wallet instance

**`returns`** signer

### eip712DomainSeparator

• **eip712DomainSeparator**: _function_ = proxyCall\(this.contract.methods.eip712DomainSeparator\)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:161_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L161)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### eventTypes

• **eventTypes**: _EventsEnum‹T›_ = Object.keys\(this.events\).reduce&gt;\( \(acc, key\) =&gt; \({ ...acc, \[key\]: key }\), {} as any \)

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_eventTypes_](../classes/_wrappers_basewrapper_.basewrapper.md#eventtypes)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:42_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L42)

### events

• **events**: _MetaTransactionWallet\["events"\]_ = this.contract.events

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_events_](../classes/_wrappers_basewrapper_.basewrapper.md#events)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:40_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L40)

### getMetaTransactionDigest

• **getMetaTransactionDigest**: _function_ = proxyCall\( this.contract.methods.getMetaTransactionDigest, this.getMetaTransactionDigestParams, stringIdentity \)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:133_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L133)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### getMetaTransactionSigner

• **getMetaTransactionSigner**: _function_ = proxyCall\( this.contract.methods.getMetaTransactionSigner, this.getMetaTransactionSignerParams, stringIdentity \)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:155_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L155)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### isOwner

• **isOwner**: _function_ = proxyCall\(this.contract.methods.isOwner\)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:162_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L162)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### methodIds

• **methodIds**: _Record‹keyof T\["methods"\], string›_ = Object.keys\(this.contract.methods\).reduce, string&gt;&gt;\( \(acc, method: Methods\) =&gt; { const methodABI = this.contract.options.jsonInterface.find\(\(item\) =&gt; item.name === method\)

```text
  acc[method] =
    methodABI === undefined ? '0x' : this.kit.web3.eth.abi.encodeFunctionSignature(methodABI)

  return acc
},
{} as any
```

\)

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_methodIds_](../classes/_wrappers_basewrapper_.basewrapper.md#methodids)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:47_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L47)

### nonce

• **nonce**: _function_ = proxyCall\(this.contract.methods.nonce, undefined, valueToInt\)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:163_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L163)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### setEip712DomainSeparator

• **setEip712DomainSeparator**: _function_ = proxySend\( this.kit, this.contract.methods.setEip712DomainSeparator \)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:181_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L181)

#### Type declaration:

▸ \(\): [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹void›_

### setSigner

• **setSigner**: _function_ = proxySend\( this.kit, this.contract.methods.setSigner \)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:176_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L176)

#### Type declaration:

▸ \(`newSigner`: [Address](_base_.md#address)\): [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹void›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `newSigner` | [Address](_base_.md#address) |

### transferERC20ToSigner

• **transferERC20ToSigner**: _function_ = proxySend\( this.kit, this.contract.methods.transferERC20ToSigner \)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:166_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L166)

#### Type declaration:

▸ \(`token`: [Address](_base_.md#address)\): [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `token` | [Address](_base_.md#address) |

### transferOwnership

• **transferOwnership**: _function_ = proxySend\( this.kit, this.contract.methods.transferOwnership \)

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:171_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L171)

#### Type declaration:

▸ \(`newOwner`: [Address](_base_.md#address)\): [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹void›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `newOwner` | [Address](_base_.md#address) |

## Accessors

### address

• **get address**\(\): _string_

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_address_](../classes/_wrappers_basewrapper_.basewrapper.md#address)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:30_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L30)

Contract address

**Returns:** _string_

## Methods

### executeMetaTransaction

▸ **executeMetaTransaction**\(`tx`: [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any›, `signature`: Signature\): [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹string›_

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:74_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L74)

Execute a signed meta transaction Reverts if meta-tx signer is not a signer for the wallet

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `tx` | [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any› | a TransactionInput |
| `signature` | Signature | a Signature |

**Returns:** [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹string›_

### executeTransaction

▸ **executeTransaction**\(`tx`: [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any›\): [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹string›_

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:44_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L44)

Execute a transaction originating from the MTW Reverts if the caller is not a signer

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `tx` | [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any› | a TransactionInput |

**Returns:** [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹string›_

### executeTransactions

▸ **executeTransactions**\(`txs`: Array‹[TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any››\): [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹object›_

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:57_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L57)

Execute a batch of transactions originating from the MTW Reverts if the caller is not a signer

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `txs` | Array‹[TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any›› | An array of TransactionInput |

**Returns:** [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹object›_

### getPastEvents

▸ **getPastEvents**\(`event`: Events‹MetaTransactionWallet›, `options`: PastEventOptions\): _Promise‹EventLog\[\]›_

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_getPastEvents_](../classes/_wrappers_basewrapper_.basewrapper.md#getpastevents)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:36_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L36)

Contract getPastEvents

**Parameters:**

| Name | Type |
| :--- | :--- |
| `event` | Events‹MetaTransactionWallet› |
| `options` | PastEventOptions |

**Returns:** _Promise‹EventLog\[\]›_

### signAndExecuteMetaTransaction

▸ **signAndExecuteMetaTransaction**\(`tx`: [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any›\): _Promise‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹string››_

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:118_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L118)

Execute a signed meta transaction Reverts if meta-tx signer is not a signer for the wallet

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `tx` | [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any› | a TransactionInput |

**Returns:** _Promise‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹string››_

### signMetaTransaction

▸ **signMetaTransaction**\(`tx`: [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any›, `nonce?`: undefined \| number\): _Promise‹Signature›_

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:99_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L99)

Signs a meta transaction as EIP712 typed data

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `tx` | [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any› | a TransactionWrapper |
| `nonce?` | undefined \| number | Optional -- will query contract state if not passed |

**Returns:** _Promise‹Signature›_

signature a Signature

### signer

▸ **signer**\(\): _Promise‹string›_

_Defined in_ [_packages/contractkit/src/wrappers/MetaTransactionWallet.ts:203_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L203)

**Returns:** _Promise‹string›_

