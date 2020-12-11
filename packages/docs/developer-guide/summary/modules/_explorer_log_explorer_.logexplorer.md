# LogExplorer

## Hierarchy

* **LogExplorer**

## Index

### Constructors

* [constructor](../classes/_explorer_log_explorer_.logexplorer.md#constructor)

### Properties

* [contractDetails](../classes/_explorer_log_explorer_.logexplorer.md#readonly-contractdetails)

### Methods

* [fetchTxReceipt](../classes/_explorer_log_explorer_.logexplorer.md#fetchtxreceipt)
* [getKnownLogs](../classes/_explorer_log_explorer_.logexplorer.md#getknownlogs)
* [tryParseLog](../classes/_explorer_log_explorer_.logexplorer.md#tryparselog)

## Constructors

### constructor

+ **new LogExplorer**\(`kit`: [ContractKit](../classes/_kit_.contractkit.md), `contractDetails`: [ContractDetails](../interfaces/_explorer_base_.contractdetails.md)\[\]\): [_LogExplorer_](../classes/_explorer_log_explorer_.logexplorer.md)

_Defined in_ [_packages/contractkit/src/explorer/log-explorer.ts:17_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/explorer/log-explorer.ts#L17)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `kit` | [ContractKit](../classes/_kit_.contractkit.md) |
| `contractDetails` | [ContractDetails](../interfaces/_explorer_base_.contractdetails.md)\[\] |

**Returns:** [_LogExplorer_](../classes/_explorer_log_explorer_.logexplorer.md)

## Properties

### `Readonly` contractDetails

• **contractDetails**: [_ContractDetails_](../interfaces/_explorer_base_.contractdetails.md)_\[\]_

_Defined in_ [_packages/contractkit/src/explorer/log-explorer.ts:19_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/explorer/log-explorer.ts#L19)

## Methods

### fetchTxReceipt

▸ **fetchTxReceipt**\(`txhash`: string\): _Promise‹TransactionReceipt›_

_Defined in_ [_packages/contractkit/src/explorer/log-explorer.ts:49_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/explorer/log-explorer.ts#L49)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `txhash` | string |

**Returns:** _Promise‹TransactionReceipt›_

### getKnownLogs

▸ **getKnownLogs**\(`tx`: TransactionReceipt\): _EventLog\[\]_

_Defined in_ [_packages/contractkit/src/explorer/log-explorer.ts:53_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/explorer/log-explorer.ts#L53)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `tx` | TransactionReceipt |

**Returns:** _EventLog\[\]_

### tryParseLog

▸ **tryParseLog**\(`log`: Log\): _null \| EventLog_

_Defined in_ [_packages/contractkit/src/explorer/log-explorer.ts:64_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/explorer/log-explorer.ts#L64)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `log` | Log |

**Returns:** _null \| EventLog_

