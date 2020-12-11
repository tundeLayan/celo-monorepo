# wallets/ledger-wallet

## Index

### Enumerations

* [AddressValidation](../enums/_wallets_ledger_wallet_.addressvalidation.md)

### Classes

* [LedgerWallet](../classes/_wallets_ledger_wallet_.ledgerwallet.md)

### Variables

* [CELO\_BASE\_DERIVATION\_PATH](_wallets_ledger_wallet_.md#const-celo_base_derivation_path)

### Functions

* [newLedgerWalletWithSetup](_wallets_ledger_wallet_.md#newledgerwalletwithsetup)

## Variables

### `Const` CELO\_BASE\_DERIVATION\_PATH

• **CELO\_BASE\_DERIVATION\_PATH**: _string_ = CELO\_DERIVATION\_PATH\_BASE.slice\(2\)

_Defined in_ [_packages/contractkit/src/wallets/ledger-wallet.ts:12_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/ledger-wallet.ts#L12)

## Functions

### newLedgerWalletWithSetup

▸ **newLedgerWalletWithSetup**\(`transport`: any, `derivationPathIndexes?`: number\[\], `baseDerivationPath?`: undefined \| string, `ledgerAddressValidation?`: [AddressValidation](../enums/_wallets_ledger_wallet_.addressvalidation.md)\): _Promise‹_[_LedgerWallet_](../classes/_wallets_ledger_wallet_.ledgerwallet.md)_›_

_Defined in_ [_packages/contractkit/src/wallets/ledger-wallet.ts:27_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/ledger-wallet.ts#L27)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `transport` | any |
| `derivationPathIndexes?` | number\[\] |
| `baseDerivationPath?` | undefined \| string |
| `ledgerAddressValidation?` | [AddressValidation](../enums/_wallets_ledger_wallet_.addressvalidation.md) |

**Returns:** _Promise‹_[_LedgerWallet_](../classes/_wallets_ledger_wallet_.ledgerwallet.md)_›_

