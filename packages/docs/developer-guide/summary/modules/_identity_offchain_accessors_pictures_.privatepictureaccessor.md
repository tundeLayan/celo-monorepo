# PrivatePictureAccessor

## Hierarchy

* [PrivateBinaryAccessor](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md)

  ↳ **PrivatePictureAccessor**

## Implements

* [PrivateAccessor](../interfaces/_identity_offchain_accessors_interfaces_.privateaccessor.md)‹Buffer›

## Index

### Constructors

* [constructor](../classes/_identity_offchain_accessors_pictures_.privatepictureaccessor.md#constructor)

### Properties

* [dataPath](../classes/_identity_offchain_accessors_pictures_.privatepictureaccessor.md#readonly-datapath)
* [read](../classes/_identity_offchain_accessors_pictures_.privatepictureaccessor.md#read)
* [wrapper](../classes/_identity_offchain_accessors_pictures_.privatepictureaccessor.md#readonly-wrapper)

### Methods

* [readAsResult](../classes/_identity_offchain_accessors_pictures_.privatepictureaccessor.md#readasresult)
* [write](../classes/_identity_offchain_accessors_pictures_.privatepictureaccessor.md#write)

## Constructors

### constructor

+ **new PrivatePictureAccessor**\(`wrapper`: [OffchainDataWrapper](../classes/_identity_offchain_data_wrapper_.offchaindatawrapper.md)\): [_PrivatePictureAccessor_](../classes/_identity_offchain_accessors_pictures_.privatepictureaccessor.md)

_Overrides_ [_PrivateBinaryAccessor_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md)_._[_constructor_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md#constructor)

_Defined in_ [_packages/contractkit/src/identity/offchain/accessors/pictures.ts:10_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/accessors/pictures.ts#L10)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `wrapper` | [OffchainDataWrapper](../classes/_identity_offchain_data_wrapper_.offchaindatawrapper.md) |

**Returns:** [_PrivatePictureAccessor_](../classes/_identity_offchain_accessors_pictures_.privatepictureaccessor.md)

## Properties

### `Readonly` dataPath

• **dataPath**: _string_

_Inherited from_ [_PrivateBinaryAccessor_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md)_._[_dataPath_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md#readonly-datapath)

_Defined in_ [_packages/contractkit/src/identity/offchain/accessors/binary.ts:42_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/accessors/binary.ts#L42)

### read

• **read**: _function_ = makeAsyncThrowable\(this.readAsResult.bind\(this\)\)

_Implementation of_ [_PrivateAccessor_](../interfaces/_identity_offchain_accessors_interfaces_.privateaccessor.md)_._[_read_](../interfaces/_identity_offchain_accessors_interfaces_.privateaccessor.md#read)

_Inherited from_ [_PrivateBinaryAccessor_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md)_._[_read_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md#read)

_Defined in_ [_packages/contractkit/src/identity/offchain/accessors/binary.ts:52_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/accessors/binary.ts#L52)

#### Type declaration:

▸ \(...`args`: TArgs\): _Promise‹TResult›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | TArgs |

### `Readonly` wrapper

• **wrapper**: [_OffchainDataWrapper_](../classes/_identity_offchain_data_wrapper_.offchaindatawrapper.md)

_Overrides_ [_PrivateBinaryAccessor_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md)_._[_wrapper_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md#readonly-wrapper)

_Defined in_ [_packages/contractkit/src/identity/offchain/accessors/pictures.ts:11_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/accessors/pictures.ts#L11)

## Methods

### readAsResult

▸ **readAsResult**\(`account`: [Address](_base_.md#address)\): _Promise‹Result‹Buffer‹›,_ [_SchemaErrors_](_identity_offchain_accessors_errors_.md#schemaerrors)_››_

_Inherited from_ [_PrivateBinaryAccessor_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md)_._[_readAsResult_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md#readasresult)

_Defined in_ [_packages/contractkit/src/identity/offchain/accessors/binary.ts:48_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/accessors/binary.ts#L48)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `account` | [Address](_base_.md#address) |

**Returns:** _Promise‹Result‹Buffer‹›,_ [_SchemaErrors_](_identity_offchain_accessors_errors_.md#schemaerrors)_››_

### write

▸ **write**\(`data`: Buffer, `toAddresses`: [Address](_base_.md#address)\[\], `symmetricKey?`: Buffer\): _Promise‹void \|_ [_InvalidDataError_](../classes/_identity_offchain_accessors_errors_.invaliddataerror.md)_‹› \|_ [_OffchainError_](../classes/_identity_offchain_accessors_errors_.offchainerror.md)_‹› \|_ [_UnknownCiphertext_](../classes/_identity_offchain_accessors_errors_.unknownciphertext.md)_‹› \|_ [_UnavailableKey_](../classes/_identity_offchain_accessors_errors_.unavailablekey.md)_‹› \|_ [_InvalidKey_](../classes/_identity_offchain_accessors_errors_.invalidkey.md)_‹››_

_Inherited from_ [_PrivateBinaryAccessor_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md)_._[_write_](../classes/_identity_offchain_accessors_binary_.privatebinaryaccessor.md#write)

_Defined in_ [_packages/contractkit/src/identity/offchain/accessors/binary.ts:44_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/accessors/binary.ts#L44)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `data` | Buffer |
| `toAddresses` | [Address](_base_.md#address)\[\] |
| `symmetricKey?` | Buffer |

**Returns:** _Promise‹void \|_ [_InvalidDataError_](../classes/_identity_offchain_accessors_errors_.invaliddataerror.md)_‹› \|_ [_OffchainError_](../classes/_identity_offchain_accessors_errors_.offchainerror.md)_‹› \|_ [_UnknownCiphertext_](../classes/_identity_offchain_accessors_errors_.unknownciphertext.md)_‹› \|_ [_UnavailableKey_](../classes/_identity_offchain_accessors_errors_.unavailablekey.md)_‹› \|_ [_InvalidKey_](../classes/_identity_offchain_accessors_errors_.invalidkey.md)_‹››_

