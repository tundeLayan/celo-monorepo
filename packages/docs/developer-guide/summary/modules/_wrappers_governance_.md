# wrappers/Governance

## Index

### Enumerations

* [ProposalStage](../enums/_wrappers_governance_.proposalstage.md)
* [VoteValue](../enums/_wrappers_governance_.votevalue.md)

### Classes

* [GovernanceWrapper](../classes/_wrappers_governance_.governancewrapper.md)

### Interfaces

* [GovernanceConfig](../interfaces/_wrappers_governance_.governanceconfig.md)
* [HotfixRecord](../interfaces/_wrappers_governance_.hotfixrecord.md)
* [ParticipationParameters](../interfaces/_wrappers_governance_.participationparameters.md)
* [ProposalMetadata](../interfaces/_wrappers_governance_.proposalmetadata.md)
* [ProposalRecord](../interfaces/_wrappers_governance_.proposalrecord.md)
* [ProposalStageDurations](../interfaces/_wrappers_governance_.proposalstagedurations.md)
* [UpvoteRecord](../interfaces/_wrappers_governance_.upvoterecord.md)
* [VoteRecord](../interfaces/_wrappers_governance_.voterecord.md)
* [Voter](../interfaces/_wrappers_governance_.voter.md)
* [Votes](../interfaces/_wrappers_governance_.votes.md)

### Type aliases

* [HotfixParams](_wrappers_governance_.md#hotfixparams)
* [Proposal](_wrappers_governance_.md#proposal)
* [ProposalParams](_wrappers_governance_.md#proposalparams)
* [ProposalTransaction](_wrappers_governance_.md#proposaltransaction)

### Functions

* [hotfixToParams](_wrappers_governance_.md#const-hotfixtoparams)
* [proposalToParams](_wrappers_governance_.md#const-proposaltoparams)

## Type aliases

### HotfixParams

Ƭ **HotfixParams**: _Parameters‹Governance\["methods"\]\["executeHotfix"\]›_

_Defined in_ [_packages/contractkit/src/wrappers/Governance.ts:114_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Governance.ts#L114)

### Proposal

Ƭ **Proposal**: [_ProposalTransaction_](_wrappers_governance_.md#proposaltransaction)_\[\]_

_Defined in_ [_packages/contractkit/src/wrappers/Governance.ts:74_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Governance.ts#L74)

### ProposalParams

Ƭ **ProposalParams**: _Parameters‹Governance\["methods"\]\["propose"\]›_

_Defined in_ [_packages/contractkit/src/wrappers/Governance.ts:72_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Governance.ts#L72)

### ProposalTransaction

Ƭ **ProposalTransaction**: _Pick‹Transaction, "to" \| "input" \| "value"›_

_Defined in_ [_packages/contractkit/src/wrappers/Governance.ts:73_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Governance.ts#L73)

## Functions

### `Const` hotfixToParams

▸ **hotfixToParams**\(`proposal`: [Proposal](_wrappers_governance_.md#proposal), `salt`: Buffer\): [_HotfixParams_](_wrappers_governance_.md#hotfixparams)

_Defined in_ [_packages/contractkit/src/wrappers/Governance.ts:115_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Governance.ts#L115)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `proposal` | [Proposal](_wrappers_governance_.md#proposal) |
| `salt` | Buffer |

**Returns:** [_HotfixParams_](_wrappers_governance_.md#hotfixparams)

### `Const` proposalToParams

▸ **proposalToParams**\(`proposal`: [Proposal](_wrappers_governance_.md#proposal), `descriptionURL`: string\): [_ProposalParams_](_wrappers_governance_.md#proposalparams)

_Defined in_ [_packages/contractkit/src/wrappers/Governance.ts:76_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/Governance.ts#L76)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `proposal` | [Proposal](_wrappers_governance_.md#proposal) |
| `descriptionURL` | string |

**Returns:** [_ProposalParams_](_wrappers_governance_.md#proposalparams)

