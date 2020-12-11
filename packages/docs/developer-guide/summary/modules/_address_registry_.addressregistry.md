# AddressRegistry

Celo Core Contract's Address Registry

## Hierarchy

* **AddressRegistry**

## Index

### Constructors

* [constructor](../classes/_address_registry_.addressregistry.md#constructor)

### Methods

* [addressFor](../classes/_address_registry_.addressregistry.md#addressfor)
* [addressMapping](../classes/_address_registry_.addressregistry.md#addressmapping)

## Constructors

### constructor

+ **new AddressRegistry**\(`kit`: [ContractKit](../classes/_kit_.contractkit.md)\): [_AddressRegistry_](../classes/_address_registry_.addressregistry.md)

_Defined in_ [_packages/contractkit/src/address-registry.ts:17_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/address-registry.ts#L17)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `kit` | [ContractKit](../classes/_kit_.contractkit.md) |

**Returns:** [_AddressRegistry_](../classes/_address_registry_.addressregistry.md)

## Methods

### addressFor

▸ **addressFor**\(`contract`: [CeloContract](../enums/_base_.celocontract.md)\): _Promise‹_[_Address_](_base_.md#address)_›_

_Defined in_ [_packages/contractkit/src/address-registry.ts:27_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/address-registry.ts#L27)

Get the address for a `CeloContract`

**Parameters:**

| Name | Type |
| :--- | :--- |
| `contract` | [CeloContract](../enums/_base_.celocontract.md) |

**Returns:** _Promise‹_[_Address_](_base_.md#address)_›_

### addressMapping

▸ **addressMapping**\(\): _Promise‹Map‹_[_CeloContract_](../enums/_base_.celocontract.md)_, string››_

_Defined in_ [_packages/contractkit/src/address-registry.ts:46_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/address-registry.ts#L46)

Get the address mapping for known registered contracts

**Returns:** _Promise‹Map‹_[_CeloContract_](../enums/_base_.celocontract.md)_, string››_

