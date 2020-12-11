# CeloTransactionObject

## Type parameters

▪ **O**

## Hierarchy

* **CeloTransactionObject**

## Index

### Constructors

* [constructor](../classes/_wrappers_basewrapper_.celotransactionobject.md#constructor)

### Properties

* [defaultParams](../classes/_wrappers_basewrapper_.celotransactionobject.md#optional-readonly-defaultparams)
* [txo](../classes/_wrappers_basewrapper_.celotransactionobject.md#readonly-txo)

### Methods

* [send](../classes/_wrappers_basewrapper_.celotransactionobject.md#send)
* [sendAndWaitForReceipt](../classes/_wrappers_basewrapper_.celotransactionobject.md#sendandwaitforreceipt)

## Constructors

### constructor

+ **new CeloTransactionObject**\(`kit`: [ContractKit](../classes/_kit_.contractkit.md), `txo`: TransactionObject‹O›, `defaultParams?`: [CeloTransactionParams](_wrappers_basewrapper_.md#celotransactionparams)\): [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:321_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L321)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `kit` | [ContractKit](../classes/_kit_.contractkit.md) |
| `txo` | TransactionObject‹O› |
| `defaultParams?` | [CeloTransactionParams](_wrappers_basewrapper_.md#celotransactionparams) |

**Returns:** [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)

## Properties

### `Optional` `Readonly` defaultParams

• **defaultParams**? : [_CeloTransactionParams_](_wrappers_basewrapper_.md#celotransactionparams)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:325_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L325)

### `Readonly` txo

• **txo**: _TransactionObject‹O›_

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:324_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L324)

## Methods

### send

▸ **send**\(`params?`: Partial‹[CeloTransactionParams](_wrappers_basewrapper_.md#celotransactionparams)›\): _Promise‹_[_TransactionResult_](../classes/_utils_tx_result_.transactionresult.md)_›_

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:329_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L329)

send the transaction to the chain

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params?` | Partial‹[CeloTransactionParams](_wrappers_basewrapper_.md#celotransactionparams)› |

**Returns:** _Promise‹_[_TransactionResult_](../classes/_utils_tx_result_.transactionresult.md)_›_

### sendAndWaitForReceipt

▸ **sendAndWaitForReceipt**\(`params?`: Partial‹[CeloTransactionParams](_wrappers_basewrapper_.md#celotransactionparams)›\): _Promise‹TransactionReceipt›_

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:334_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L334)

send the transaction and waits for the receipt

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params?` | Partial‹[CeloTransactionParams](_wrappers_basewrapper_.md#celotransactionparams)› |

**Returns:** _Promise‹TransactionReceipt›_

