# BaseWrapper

Base ContractWrapper

## Type parameters

▪ **T**: _Contract_

## Hierarchy

* **BaseWrapper**

  ↳ [AccountsWrapper](../classes/_wrappers_accounts_.accountswrapper.md)

  ↳ [ValidatorsWrapper](../classes/_wrappers_validators_.validatorswrapper.md)

  ↳ [AttestationsWrapper](../classes/_wrappers_attestations_.attestationswrapper.md)

  ↳ [BlockchainParametersWrapper](../classes/_wrappers_blockchainparameters_.blockchainparameterswrapper.md)

  ↳ [BaseSlasher](../classes/_wrappers_baseslasher_.baseslasher.md)

  ↳ [ElectionWrapper](../classes/_wrappers_election_.electionwrapper.md)

  ↳ [EscrowWrapper](../classes/_wrappers_escrow_.escrowwrapper.md)

  ↳ [ExchangeWrapper](../classes/_wrappers_exchange_.exchangewrapper.md)

  ↳ [FreezerWrapper](../classes/_wrappers_freezer_.freezerwrapper.md)

  ↳ [GasPriceMinimumWrapper](../classes/_wrappers_gaspriceminimum_.gaspriceminimumwrapper.md)

  ↳ [GoldTokenWrapper](../classes/_wrappers_goldtokenwrapper_.goldtokenwrapper.md)

  ↳ [GovernanceWrapper](../classes/_wrappers_governance_.governancewrapper.md)

  ↳ [LockedGoldWrapper](../classes/_wrappers_lockedgold_.lockedgoldwrapper.md)

  ↳ [MetaTransactionWalletWrapper](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md)

  ↳ [MetaTransactionWalletDeployerWrapper](../classes/_wrappers_metatransactionwalletdeployer_.metatransactionwalletdeployerwrapper.md)

  ↳ [MultiSigWrapper](../classes/_wrappers_multisig_.multisigwrapper.md)

  ↳ [ReserveWrapper](../classes/_wrappers_reserve_.reservewrapper.md)

  ↳ [SortedOraclesWrapper](../classes/_wrappers_sortedoracles_.sortedoracleswrapper.md)

  ↳ [StableTokenWrapper](../classes/_wrappers_stabletokenwrapper_.stabletokenwrapper.md)

  ↳ [ReleaseGoldWrapper](../classes/_wrappers_releasegold_.releasegoldwrapper.md)

## Index

### Constructors

* [constructor](../classes/_wrappers_basewrapper_.basewrapper.md#constructor)

### Properties

* [eventTypes](../classes/_wrappers_basewrapper_.basewrapper.md#eventtypes)
* [events](../classes/_wrappers_basewrapper_.basewrapper.md#events)
* [methodIds](../classes/_wrappers_basewrapper_.basewrapper.md#methodids)

### Accessors

* [address](../classes/_wrappers_basewrapper_.basewrapper.md#address)

### Methods

* [getPastEvents](../classes/_wrappers_basewrapper_.basewrapper.md#getpastevents)

## Constructors

### constructor

+ **new BaseWrapper**\(`kit`: [ContractKit](../classes/_kit_.contractkit.md), `contract`: T\): [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:26_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L26)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `kit` | [ContractKit](../classes/_kit_.contractkit.md) |
| `contract` | T |

**Returns:** [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)

## Properties

### eventTypes

• **eventTypes**: _EventsEnum‹T›_ = Object.keys\(this.events\).reduce&gt;\( \(acc, key\) =&gt; \({ ...acc, \[key\]: key }\), {} as any \)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:42_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L42)

### events

• **events**: _T\["events"\]_ = this.contract.events

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:40_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L40)

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

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:47_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L47)

## Accessors

### address

• **get address**\(\): _string_

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:30_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L30)

Contract address

**Returns:** _string_

## Methods

### getPastEvents

▸ **getPastEvents**\(`event`: Events‹T›, `options`: PastEventOptions\): _Promise‹EventLog\[\]›_

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:36_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L36)

Contract getPastEvents

**Parameters:**

| Name | Type |
| :--- | :--- |
| `event` | Events‹T› |
| `options` | PastEventOptions |

**Returns:** _Promise‹EventLog\[\]›_

