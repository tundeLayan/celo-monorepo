# GitStorageWriter

## Hierarchy

↳ [LocalStorageWriter](../classes/_identity_offchain_storage_writers_.localstoragewriter.md)

↳ **GitStorageWriter**

## Index

### Constructors

* [constructor](../classes/_identity_offchain_storage_writers_.gitstoragewriter.md#constructor)

### Properties

* [root](../classes/_identity_offchain_storage_writers_.gitstoragewriter.md#readonly-root)

### Methods

* [write](../classes/_identity_offchain_storage_writers_.gitstoragewriter.md#write)

## Constructors

### constructor

+ **new GitStorageWriter**\(`root`: string\): [_GitStorageWriter_](../classes/_identity_offchain_storage_writers_.gitstoragewriter.md)

_Inherited from_ [_LocalStorageWriter_](../classes/_identity_offchain_storage_writers_.localstoragewriter.md)_._[_constructor_](../classes/_identity_offchain_storage_writers_.localstoragewriter.md#constructor)

_Defined in_ [_packages/contractkit/src/identity/offchain/storage-writers.ts:12_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/storage-writers.ts#L12)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `root` | string |

**Returns:** [_GitStorageWriter_](../classes/_identity_offchain_storage_writers_.gitstoragewriter.md)

## Properties

### `Readonly` root

• **root**: _string_

_Inherited from_ [_LocalStorageWriter_](../classes/_identity_offchain_storage_writers_.localstoragewriter.md)_._[_root_](../classes/_identity_offchain_storage_writers_.localstoragewriter.md#readonly-root)

_Defined in_ [_packages/contractkit/src/identity/offchain/storage-writers.ts:13_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/storage-writers.ts#L13)

## Methods

### write

▸ **write**\(`data`: Buffer, `dataPath`: string\): _Promise‹void›_

_Overrides_ [_LocalStorageWriter_](../classes/_identity_offchain_storage_writers_.localstoragewriter.md)_._[_write_](../classes/_identity_offchain_storage_writers_.localstoragewriter.md#write)

_Defined in_ [_packages/contractkit/src/identity/offchain/storage-writers.ts:28_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/identity/offchain/storage-writers.ts#L28)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `data` | Buffer |
| `dataPath` | string |

**Returns:** _Promise‹void›_

