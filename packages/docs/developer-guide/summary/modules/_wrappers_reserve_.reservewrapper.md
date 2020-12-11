# ReserveWrapper

Contract for handling reserve for stable currencies

## Hierarchy

* [BaseWrapper](../classes/_wrappers_basewrapper_.basewrapper.md)‹Reserve›

  ↳ **ReserveWrapper**

## Index

### Constructors

* [constructor](../classes/_wrappers_reserve_.reservewrapper.md#constructor)

### Properties

* [dailySpendingRatio](../classes/_wrappers_reserve_.reservewrapper.md#dailyspendingratio)
* [eventTypes](../classes/_wrappers_reserve_.reservewrapper.md#eventtypes)
* [events](../classes/_wrappers_reserve_.reservewrapper.md#events)
* [frozenReserveGoldDays](../classes/_wrappers_reserve_.reservewrapper.md#frozenreservegolddays)
* [frozenReserveGoldStartBalance](../classes/_wrappers_reserve_.reservewrapper.md#frozenreservegoldstartbalance)
* [frozenReserveGoldStartDay](../classes/_wrappers_reserve_.reservewrapper.md#frozenreservegoldstartday)
* [getOrComputeTobinTax](../classes/_wrappers_reserve_.reservewrapper.md#getorcomputetobintax)
* [getOtherReserveAddresses](../classes/_wrappers_reserve_.reservewrapper.md#getotherreserveaddresses)
* [getReserveGoldBalance](../classes/_wrappers_reserve_.reservewrapper.md#getreservegoldbalance)
* [isOtherReserveAddress](../classes/_wrappers_reserve_.reservewrapper.md#isotherreserveaddress)
* [isSpender](../classes/_wrappers_reserve_.reservewrapper.md#isspender)
* [methodIds](../classes/_wrappers_reserve_.reservewrapper.md#methodids)
* [tobinTaxStalenessThreshold](../classes/_wrappers_reserve_.reservewrapper.md#tobintaxstalenessthreshold)
* [transferGold](../classes/_wrappers_reserve_.reservewrapper.md#transfergold)

### Accessors

* [address](../classes/_wrappers_reserve_.reservewrapper.md#address)

### Methods

* [getConfig](../classes/_wrappers_reserve_.reservewrapper.md#getconfig)
* [getPastEvents](../classes/_wrappers_reserve_.reservewrapper.md#getpastevents)
* [getSpenders](../classes/_wrappers_reserve_.reservewrapper.md#getspenders)

## Constructors

### constructor

+ **new ReserveWrapper**\(`kit`: [ContractKit](../classes/_kit_.contractkit.md), `contract`: Reserve\): [_ReserveWrapper_](../classes/_wrappers_reserve_.reservewrapper.md)

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_constructor_](../classes/_wrappers_basewrapper_.basewrapper.md#constructor)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:26_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L26)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `kit` | [ContractKit](../classes/_kit_.contractkit.md) |
| `contract` | Reserve |

**Returns:** [_ReserveWrapper_](../classes/_wrappers_reserve_.reservewrapper.md)

## Properties

### dailySpendingRatio

• **dailySpendingRatio**: _function_ = proxyCall\( this.contract.methods.getDailySpendingRatio, undefined, fixidityValueToBigNumber \)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:34_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L34)

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

• **events**: _Reserve\["events"\]_ = this.contract.events

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_events_](../classes/_wrappers_basewrapper_.basewrapper.md#events)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:40_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L40)

### frozenReserveGoldDays

• **frozenReserveGoldDays**: _function_ = proxyCall\( this.contract.methods.frozenReserveGoldDays, undefined, valueToBigNumber \)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:52_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L52)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### frozenReserveGoldStartBalance

• **frozenReserveGoldStartBalance**: _function_ = proxyCall\( this.contract.methods.frozenReserveGoldStartBalance, undefined, valueToBigNumber \)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:42_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L42)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### frozenReserveGoldStartDay

• **frozenReserveGoldStartDay**: _function_ = proxyCall\( this.contract.methods.frozenReserveGoldStartDay, undefined, valueToBigNumber \)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:47_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L47)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### getOrComputeTobinTax

• **getOrComputeTobinTax**: _function_ = proxySend\(this.kit, this.contract.methods.getOrComputeTobinTax\)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:41_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L41)

#### Type declaration:

▸ \(...`args`: InputArgs\): [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### getOtherReserveAddresses

• **getOtherReserveAddresses**: _function_ = proxyCall\(this.contract.methods.getOtherReserveAddresses\)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:62_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L62)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### getReserveGoldBalance

• **getReserveGoldBalance**: _function_ = proxyCall\( this.contract.methods.getReserveGoldBalance, undefined, valueToBigNumber \)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:57_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L57)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### isOtherReserveAddress

• **isOtherReserveAddress**: _function_ = proxyCall\(this.contract.methods.isOtherReserveAddress\)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:77_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L77)

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### isSpender

• **isSpender**: _function_ = proxyCall\(this.contract.methods.isSpender\)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:39_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L39)

#### Type declaration:

▸ \(`account`: string\): _Promise‹boolean›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `account` | string |

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

### tobinTaxStalenessThreshold

• **tobinTaxStalenessThreshold**: _function_ = proxyCall\( this.contract.methods.tobinTaxStalenessThreshold, undefined, valueToBigNumber \)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:29_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L29)

Query Tobin tax staleness threshold parameter.

**`returns`** Current Tobin tax staleness threshold.

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### transferGold

• **transferGold**: _function_ = proxySend\(this.kit, this.contract.methods.transferGold\)

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:40_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L40)

#### Type declaration:

▸ \(...`args`: InputArgs\): [_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

## Accessors

### address

• **get address**\(\): _string_

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_address_](../classes/_wrappers_basewrapper_.basewrapper.md#address)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:30_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L30)

Contract address

**Returns:** _string_

## Methods

### getConfig

▸ **getConfig**\(\): _Promise‹_[_ReserveConfig_](../interfaces/_wrappers_reserve_.reserveconfig.md)_›_

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:67_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L67)

Returns current configuration parameters.

**Returns:** _Promise‹_[_ReserveConfig_](../interfaces/_wrappers_reserve_.reserveconfig.md)_›_

### getPastEvents

▸ **getPastEvents**\(`event`: Events‹Reserve›, `options`: PastEventOptions\): _Promise‹EventLog\[\]›_

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_getPastEvents_](../classes/_wrappers_basewrapper_.basewrapper.md#getpastevents)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:36_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L36)

Contract getPastEvents

**Parameters:**

| Name | Type |
| :--- | :--- |
| `event` | Events‹Reserve› |
| `options` | PastEventOptions |

**Returns:** _Promise‹EventLog\[\]›_

### getSpenders

▸ **getSpenders**\(\): _Promise‹_[_Address_](_base_.md#address)_\[\]›_

_Defined in_ [_packages/contractkit/src/wrappers/Reserve.ts:79_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Reserve.ts#L79)

**Returns:** _Promise‹_[_Address_](_base_.md#address)_\[\]›_

