# ElectionWrapper

Contract for voting for validators and managing validator groups.

## Hierarchy

* [BaseWrapper](../classes/_wrappers_basewrapper_.basewrapper.md)‹Election›

  ↳ **ElectionWrapper**

## Index

### Constructors

* [constructor](../classes/_wrappers_election_.electionwrapper.md#constructor)

### Properties

* [electabilityThreshold](../classes/_wrappers_election_.electionwrapper.md#electabilitythreshold)
* [eventTypes](../classes/_wrappers_election_.electionwrapper.md#eventtypes)
* [events](../classes/_wrappers_election_.electionwrapper.md#events)
* [getCurrentValidatorSigners](../classes/_wrappers_election_.electionwrapper.md#getcurrentvalidatorsigners)
* [getGroupsVotedForByAccount](../classes/_wrappers_election_.electionwrapper.md#getgroupsvotedforbyaccount)
* [getTotalVotes](../classes/_wrappers_election_.electionwrapper.md#gettotalvotes)
* [getTotalVotesForGroupByAccount](../classes/_wrappers_election_.electionwrapper.md#gettotalvotesforgroupbyaccount)
* [methodIds](../classes/_wrappers_election_.electionwrapper.md#methodids)
* [numberValidatorsInCurrentSet](../classes/_wrappers_election_.electionwrapper.md#numbervalidatorsincurrentset)
* [numberValidatorsInSet](../classes/_wrappers_election_.electionwrapper.md#numbervalidatorsinset)
* [validatorSignerAddressFromCurrentSet](../classes/_wrappers_election_.electionwrapper.md#validatorsigneraddressfromcurrentset)
* [validatorSignerAddressFromSet](../classes/_wrappers_election_.electionwrapper.md#validatorsigneraddressfromset)

### Accessors

* [address](../classes/_wrappers_election_.electionwrapper.md#address)

### Methods

* [activate](../classes/_wrappers_election_.electionwrapper.md#activate)
* [electValidatorSigners](../classes/_wrappers_election_.electionwrapper.md#electvalidatorsigners)
* [electableValidators](../classes/_wrappers_election_.electionwrapper.md#electablevalidators)
* [findLesserAndGreaterAfterVote](../classes/_wrappers_election_.electionwrapper.md#findlesserandgreateraftervote)
* [getActiveVotesForGroup](../classes/_wrappers_election_.electionwrapper.md#getactivevotesforgroup)
* [getConfig](../classes/_wrappers_election_.electionwrapper.md#getconfig)
* [getElectedValidators](../classes/_wrappers_election_.electionwrapper.md#getelectedvalidators)
* [getEligibleValidatorGroupsVotes](../classes/_wrappers_election_.electionwrapper.md#geteligiblevalidatorgroupsvotes)
* [getGroupVoterRewards](../classes/_wrappers_election_.electionwrapper.md#getgroupvoterrewards)
* [getPastEvents](../classes/_wrappers_election_.electionwrapper.md#getpastevents)
* [getTotalVotesForGroup](../classes/_wrappers_election_.electionwrapper.md#gettotalvotesforgroup)
* [getValidatorGroupVotes](../classes/_wrappers_election_.electionwrapper.md#getvalidatorgroupvotes)
* [getValidatorGroupsVotes](../classes/_wrappers_election_.electionwrapper.md#getvalidatorgroupsvotes)
* [getValidatorSigners](../classes/_wrappers_election_.electionwrapper.md#getvalidatorsigners)
* [getVoter](../classes/_wrappers_election_.electionwrapper.md#getvoter)
* [getVoterRewards](../classes/_wrappers_election_.electionwrapper.md#getvoterrewards)
* [getVoterShare](../classes/_wrappers_election_.electionwrapper.md#getvotershare)
* [getVotesForGroupByAccount](../classes/_wrappers_election_.electionwrapper.md#getvotesforgroupbyaccount)
* [hasActivatablePendingVotes](../classes/_wrappers_election_.electionwrapper.md#hasactivatablependingvotes)
* [hasPendingVotes](../classes/_wrappers_election_.electionwrapper.md#haspendingvotes)
* [revoke](../classes/_wrappers_election_.electionwrapper.md#revoke)
* [revokeActive](../classes/_wrappers_election_.electionwrapper.md#revokeactive)
* [revokePending](../classes/_wrappers_election_.electionwrapper.md#revokepending)
* [vote](../classes/_wrappers_election_.electionwrapper.md#vote)

## Constructors

### constructor

+ **new ElectionWrapper**\(`kit`: [ContractKit](../classes/_kit_.contractkit.md), `contract`: Election\): [_ElectionWrapper_](../classes/_wrappers_election_.electionwrapper.md)

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_constructor_](../classes/_wrappers_basewrapper_.basewrapper.md#constructor)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:26_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L26)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `kit` | [ContractKit](../classes/_kit_.contractkit.md) |
| `contract` | Election |

**Returns:** [_ElectionWrapper_](../classes/_wrappers_election_.electionwrapper.md)

## Properties

### electabilityThreshold

• **electabilityThreshold**: _function_ = proxyCall\( this.contract.methods.getElectabilityThreshold, undefined, fixidityValueToBigNumber \)

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:85_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L85)

Returns the current election threshold.

**`returns`** Election threshold.

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

• **events**: _Election\["events"\]_ = this.contract.events

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_events_](../classes/_wrappers_basewrapper_.basewrapper.md#events)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:40_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L40)

### getCurrentValidatorSigners

• **getCurrentValidatorSigners**: _function_ = proxyCall\( this.contract.methods.getCurrentValidatorSigners \)

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:143_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L143)

Returns the current validator signers using the precompiles.

**`returns`** List of current validator signers.

#### Type declaration:

▸ \(\): _Promise‹_[_Address_](_base_.md#address)_\[\]›_

### getGroupsVotedForByAccount

• **getGroupsVotedForByAccount**: _function_ = proxyCall\( this.contract.methods.getGroupsVotedForByAccount \)

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:216_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L216)

Returns the groups that `account` has voted for.

**`param`** The address of the account casting votes.

**`returns`** The groups that `account` has voted for.

#### Type declaration:

▸ \(`account`: [Address](_base_.md#address)\): _Promise‹_[_Address_](_base_.md#address)_\[\]›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `account` | [Address](_base_.md#address) |

### getTotalVotes

• **getTotalVotes**: _function_ = proxyCall\(this.contract.methods.getTotalVotes, undefined, valueToBigNumber\)

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:137_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L137)

Returns the total votes received across all groups.

**`returns`** The total votes received across all groups.

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### getTotalVotesForGroupByAccount

• **getTotalVotesForGroupByAccount**: _function_ = proxyCall\( this.contract.methods.getTotalVotesForGroupByAccount, undefined, valueToBigNumber \)

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:194_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L194)

Returns the total votes for `group` made by `account`.

**`param`** The address of the validator group.

**`param`** The address of the voting account.

**`returns`** The total votes for `group` made by `account`.

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

### numberValidatorsInCurrentSet

• **numberValidatorsInCurrentSet**: _function_ = proxyCall\( this.contract.methods.numberValidatorsInCurrentSet, undefined, valueToInt \)

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:127_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L127)

Gets the size of the current elected validator set.

**`returns`** Size of the current elected validator set.

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

### numberValidatorsInSet

• **numberValidatorsInSet**: _function_ = proxyCall\( this.contract.methods.numberValidatorsInSet, undefined, valueToInt \)

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:117_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L117)

Gets the size of the validator set that must sign the given block number.

**`param`** Block number to retrieve the validator set from.

**`returns`** Size of the validator set.

#### Type declaration:

▸ \(`blockNumber`: number\): _Promise‹number›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `blockNumber` | number |

### validatorSignerAddressFromCurrentSet

• **validatorSignerAddressFromCurrentSet**: _function_ = proxyCall\( this.contract.methods.validatorSignerAddressFromCurrentSet, tupleParser\(identity\) \)

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:107_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L107)

Gets a validator address from the current validator set.

**`param`** Index of requested validator in the validator set.

**`returns`** Address of validator at the requested index.

#### Type declaration:

▸ \(`index`: number\): _Promise‹_[_Address_](_base_.md#address)_›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `index` | number |

### validatorSignerAddressFromSet

• **validatorSignerAddressFromSet**: _function_ = proxyCall\(this.contract.methods.validatorSignerAddressFromSet\)

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:97_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L97)

Gets a validator address from the validator set at the given block number.

**`param`** Index of requested validator in the validator set.

**`param`** Block number to retrieve the validator set from.

**`returns`** Address of validator at the requested index.

#### Type declaration:

▸ \(`signerIndex`: number, `blockNumber`: number\): _Promise‹_[_Address_](_base_.md#address)_›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `signerIndex` | number |
| `blockNumber` | number |

## Accessors

### address

• **get address**\(\): _string_

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_address_](../classes/_wrappers_basewrapper_.basewrapper.md#address)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:30_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L30)

Contract address

**Returns:** _string_

## Methods

### activate

▸ **activate**\(`account`: [Address](_base_.md#address)\): _Promise‹Array‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean›››_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:327_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L327)

Activates any activatable pending votes.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `account` | [Address](_base_.md#address) | The account with pending votes to activate. |

**Returns:** _Promise‹Array‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean›››_

### electValidatorSigners

▸ **electValidatorSigners**\(`min?`: undefined \| number, `max?`: undefined \| number\): _Promise‹_[_Address_](_base_.md#address)_\[\]›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:164_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L164)

Returns a list of elected validators with seats allocated to groups via the D'Hondt method.

**`dev`** See [https://en.wikipedia.org/wiki/D%27Hondt\_method\#Allocation](https://en.wikipedia.org/wiki/D%27Hondt_method#Allocation) for more information.

**Parameters:**

| Name | Type |
| :--- | :--- |
| `min?` | undefined \| number |
| `max?` | undefined \| number |

**Returns:** _Promise‹_[_Address_](_base_.md#address)_\[\]›_

The list of elected validators.

### electableValidators

▸ **electableValidators**\(\): _Promise‹_[_ElectableValidators_](../interfaces/_wrappers_election_.electablevalidators.md)_›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:76_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L76)

Returns the minimum and maximum number of validators that can be elected.

**Returns:** _Promise‹_[_ElectableValidators_](../interfaces/_wrappers_election_.electablevalidators.md)_›_

The minimum and maximum number of validators that can be elected.

### findLesserAndGreaterAfterVote

▸ **findLesserAndGreaterAfterVote**\(`votedGroup`: [Address](_base_.md#address), `voteWeight`: BigNumber\): _Promise‹object›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:423_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L423)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `votedGroup` | [Address](_base_.md#address) |
| `voteWeight` | BigNumber |

**Returns:** _Promise‹object›_

### getActiveVotesForGroup

▸ **getActiveVotesForGroup**\(`group`: [Address](_base_.md#address), `blockNumber?`: undefined \| number\): _Promise‹BigNumber›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:205_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L205)

Returns the active votes for `group`.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `group` | [Address](_base_.md#address) | The address of the validator group. |
| `blockNumber?` | undefined \| number | - |

**Returns:** _Promise‹BigNumber›_

The active votes for `group`.

### getConfig

▸ **getConfig**\(\): _Promise‹_[_ElectionConfig_](../interfaces/_wrappers_election_.electionconfig.md)_›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:282_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L282)

Returns current configuration parameters.

**Returns:** _Promise‹_[_ElectionConfig_](../interfaces/_wrappers_election_.electionconfig.md)_›_

### getElectedValidators

▸ **getElectedValidators**\(`epochNumber`: number\): _Promise‹_[_Validator_](../interfaces/_wrappers_validators_.validator.md)_\[\]›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:452_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L452)

Retrieves the set of validatorsparticipating in BFT at epochNumber.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `epochNumber` | number | The epoch to retrieve the elected validator set at. |

**Returns:** _Promise‹_[_Validator_](../interfaces/_wrappers_validators_.validator.md)_\[\]›_

### getEligibleValidatorGroupsVotes

▸ **getEligibleValidatorGroupsVotes**\(\): _Promise‹_[_ValidatorGroupVote_](../interfaces/_wrappers_election_.validatorgroupvote.md)_\[\]›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:408_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L408)

Returns the current eligible validator groups and their total votes.

**Returns:** _Promise‹_[_ValidatorGroupVote_](../interfaces/_wrappers_election_.validatorgroupvote.md)_\[\]›_

### getGroupVoterRewards

▸ **getGroupVoterRewards**\(`epochNumber`: number\): _Promise‹_[_GroupVoterReward_](../interfaces/_wrappers_election_.groupvoterreward.md)_\[\]›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:463_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L463)

Retrieves GroupVoterRewards at epochNumber.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `epochNumber` | number | The epoch to retrieve GroupVoterRewards at. |

**Returns:** _Promise‹_[_GroupVoterReward_](../interfaces/_wrappers_election_.groupvoterreward.md)_\[\]›_

### getPastEvents

▸ **getPastEvents**\(`event`: Events‹Election›, `options`: PastEventOptions\): _Promise‹EventLog\[\]›_

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_getPastEvents_](../classes/_wrappers_basewrapper_.basewrapper.md#getpastevents)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:36_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L36)

Contract getPastEvents

**Parameters:**

| Name | Type |
| :--- | :--- |
| `event` | Events‹Election› |
| `options` | PastEventOptions |

**Returns:** _Promise‹EventLog\[\]›_

### getTotalVotesForGroup

▸ **getTotalVotesForGroup**\(`group`: [Address](_base_.md#address), `blockNumber?`: undefined \| number\): _Promise‹BigNumber›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:182_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L182)

Returns the total votes for `group`.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `group` | [Address](_base_.md#address) | The address of the validator group. |
| `blockNumber?` | undefined \| number | - |

**Returns:** _Promise‹BigNumber›_

The total votes for `group`.

### getValidatorGroupVotes

▸ **getValidatorGroupVotes**\(`address`: [Address](_base_.md#address)\): _Promise‹_[_ValidatorGroupVote_](../interfaces/_wrappers_election_.validatorgroupvote.md)_›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:298_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L298)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `address` | [Address](_base_.md#address) |

**Returns:** _Promise‹_[_ValidatorGroupVote_](../interfaces/_wrappers_election_.validatorgroupvote.md)_›_

### getValidatorGroupsVotes

▸ **getValidatorGroupsVotes**\(\): _Promise‹_[_ValidatorGroupVote_](../interfaces/_wrappers_election_.validatorgroupvote.md)_\[\]›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:315_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L315)

Returns the current registered validator groups and their total votes and eligibility.

**Returns:** _Promise‹_[_ValidatorGroupVote_](../interfaces/_wrappers_election_.validatorgroupvote.md)_\[\]›_

### getValidatorSigners

▸ **getValidatorSigners**\(`blockNumber`: number\): _Promise‹_[_Address_](_base_.md#address)_\[\]›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:152_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L152)

Returns the validator signers for block `blockNumber`.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `blockNumber` | number | Block number to retrieve signers for. |

**Returns:** _Promise‹_[_Address_](_base_.md#address)_\[\]›_

Address of each signer in the validator set.

### getVoter

▸ **getVoter**\(`account`: [Address](_base_.md#address), `blockNumber?`: undefined \| number\): _Promise‹_[_Voter_](../interfaces/_wrappers_election_.voter.md)_›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:242_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L242)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `account` | [Address](_base_.md#address) |
| `blockNumber?` | undefined \| number |

**Returns:** _Promise‹_[_Voter_](../interfaces/_wrappers_election_.voter.md)_›_

### getVoterRewards

▸ **getVoterRewards**\(`address`: [Address](_base_.md#address), `epochNumber`: number, `voterShare?`: Record‹[Address](_base_.md#address), BigNumber›\): _Promise‹_[_VoterReward_](../interfaces/_wrappers_election_.voterreward.md)_\[\]›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:488_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L488)

Retrieves VoterRewards for address at epochNumber.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `address` | [Address](_base_.md#address) | The address to retrieve VoterRewards for. |
| `epochNumber` | number | The epoch to retrieve VoterRewards at. |
| `voterShare?` | Record‹[Address](_base_.md#address), BigNumber› | Optionally address' share of group rewards. |

**Returns:** _Promise‹_[_VoterReward_](../interfaces/_wrappers_election_.voterreward.md)_\[\]›_

### getVoterShare

▸ **getVoterShare**\(`address`: [Address](_base_.md#address), `blockNumber?`: undefined \| number\): _Promise‹Record‹_[_Address_](_base_.md#address)_, BigNumber››_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:518_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L518)

Retrieves a voter's share of active votes.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `address` | [Address](_base_.md#address) | The voter to retrieve share for. |
| `blockNumber?` | undefined \| number | The block to retrieve the voter's share at. |

**Returns:** _Promise‹Record‹_[_Address_](_base_.md#address)_, BigNumber››_

### getVotesForGroupByAccount

▸ **getVotesForGroupByAccount**\(`account`: [Address](_base_.md#address), `group`: [Address](_base_.md#address), `blockNumber?`: undefined \| number\): _Promise‹_[_GroupVote_](../interfaces/_wrappers_election_.groupvote.md)_›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:220_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L220)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `account` | [Address](_base_.md#address) |
| `group` | [Address](_base_.md#address) |
| `blockNumber?` | undefined \| number |

**Returns:** _Promise‹_[_GroupVote_](../interfaces/_wrappers_election_.groupvote.md)_›_

### hasActivatablePendingVotes

▸ **hasActivatablePendingVotes**\(`account`: [Address](_base_.md#address)\): _Promise‹boolean›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:271_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L271)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `account` | [Address](_base_.md#address) |

**Returns:** _Promise‹boolean›_

### hasPendingVotes

▸ **hasPendingVotes**\(`account`: [Address](_base_.md#address)\): _Promise‹boolean›_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:259_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L259)

Returns whether or not the account has any pending votes.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `account` | [Address](_base_.md#address) | The address of the account casting votes. |

**Returns:** _Promise‹boolean›_

The groups that `account` has voted for.

### revoke

▸ **revoke**\(`account`: [Address](_base_.md#address), `group`: [Address](_base_.md#address), `value`: BigNumber\): _Promise‹Array‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean›››_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:366_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L366)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `account` | [Address](_base_.md#address) |
| `group` | [Address](_base_.md#address) |
| `value` | BigNumber |

**Returns:** _Promise‹Array‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean›››_

### revokeActive

▸ **revokeActive**\(`account`: [Address](_base_.md#address), `group`: [Address](_base_.md#address), `value`: BigNumber\): _Promise‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean››_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:351_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L351)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `account` | [Address](_base_.md#address) |
| `group` | [Address](_base_.md#address) |
| `value` | BigNumber |

**Returns:** _Promise‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean››_

### revokePending

▸ **revokePending**\(`account`: [Address](_base_.md#address), `group`: [Address](_base_.md#address), `value`: BigNumber\): _Promise‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean››_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:336_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L336)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `account` | [Address](_base_.md#address) |
| `group` | [Address](_base_.md#address) |
| `value` | BigNumber |

**Returns:** _Promise‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean››_

### vote

▸ **vote**\(`validatorGroup`: [Address](_base_.md#address), `value`: BigNumber\): _Promise‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean››_

_Defined in_ [_packages/contractkit/src/wrappers/Election.ts:392_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Election.ts#L392)

Increments the number of total and pending votes for `group`.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `validatorGroup` | [Address](_base_.md#address) | The validator group to vote for. |
| `value` | BigNumber | The amount of gold to use to vote. |

**Returns:** _Promise‹_[_CeloTransactionObject_](../classes/_wrappers_basewrapper_.celotransactionobject.md)_‹boolean››_

