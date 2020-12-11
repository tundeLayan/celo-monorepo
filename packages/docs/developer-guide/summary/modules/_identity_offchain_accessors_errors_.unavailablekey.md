# UnavailableKey

## Hierarchy

* RootError‹[UnavailableKey](../enums/_identity_offchain_accessors_errors_.schemaerrortypes.md#unavailablekey)›

  ↳ **UnavailableKey**

## Implements

* BaseError‹[UnavailableKey](../enums/_identity_offchain_accessors_errors_.schemaerrortypes.md#unavailablekey)›

## Index

### Constructors

* [constructor](../classes/_identity_offchain_accessors_errors_.unavailablekey.md#constructor)

### Properties

* [account](../classes/_identity_offchain_accessors_errors_.unavailablekey.md#readonly-account)
* [errorType](../classes/_identity_offchain_accessors_errors_.unavailablekey.md#readonly-errortype)
* [message](../classes/_identity_offchain_accessors_errors_.unavailablekey.md#message)
* [name](../classes/_identity_offchain_accessors_errors_.unavailablekey.md#name)
* [stack](../classes/_identity_offchain_accessors_errors_.unavailablekey.md#optional-stack)

## Constructors

### constructor

+ **new UnavailableKey**\(`account`: [Address](_base_.md#address)\): [_UnavailableKey_](../classes/_identity_offchain_accessors_errors_.unavailablekey.md)

_Overrides void_

_Defined in_ [_packages/contractkit/src/identity/offchain/accessors/errors.ts:31_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/accessors/errors.ts#L31)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `account` | [Address](_base_.md#address) |

**Returns:** [_UnavailableKey_](../classes/_identity_offchain_accessors_errors_.unavailablekey.md)

## Properties

### `Readonly` account

• **account**: [_Address_](_base_.md#address)

_Defined in_ [_packages/contractkit/src/identity/offchain/accessors/errors.ts:32_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/accessors/errors.ts#L32)

### `Readonly` errorType

• **errorType**: [_UnavailableKey_](../enums/_identity_offchain_accessors_errors_.schemaerrortypes.md#unavailablekey)

_Inherited from_ [_InvalidDataError_](../classes/_identity_offchain_accessors_errors_.invaliddataerror.md)_._[_errorType_](../classes/_identity_offchain_accessors_errors_.invaliddataerror.md#readonly-errortype)

Defined in packages/base/lib/result.d.ts:19

### message

• **message**: _string_

_Inherited from_ [_InvalidDataError_](../classes/_identity_offchain_accessors_errors_.invaliddataerror.md)_._[_message_](../classes/_identity_offchain_accessors_errors_.invaliddataerror.md#message)

Defined in node\_modules/typescript/lib/lib.es5.d.ts:974

### name

• **name**: _string_

_Inherited from_ [_InvalidDataError_](../classes/_identity_offchain_accessors_errors_.invaliddataerror.md)_._[_name_](../classes/_identity_offchain_accessors_errors_.invaliddataerror.md#name)

Defined in node\_modules/typescript/lib/lib.es5.d.ts:973

### `Optional` stack

• **stack**? : _undefined \| string_

_Inherited from_ [_InvalidDataError_](../classes/_identity_offchain_accessors_errors_.invaliddataerror.md)_._[_stack_](../classes/_identity_offchain_accessors_errors_.invaliddataerror.md#optional-stack)

Defined in node\_modules/typescript/lib/lib.es5.d.ts:975

