import { Address, ensureLeading0x } from '@celo/base/lib/address'
import { Signature } from '@celo/base/lib/signatureUtils'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import MTWContract from '@celo/protocol/build/contracts/MetaTransactionWallet.json'
import { generateTypedDataHash } from '@celo/utils/lib/sign-typed-data-utils'
import BigNumber from 'bignumber.js'
import { newKitFromWeb3 } from '../kit'
import { GoldTokenWrapper } from './GoldTokenWrapper'
import {
  buildMetaTxTypedData,
  buildMetaTxWithRefundTypedData,
  MetaTransactionWalletWrapper,
  RawTransaction,
  toRawTransaction,
  toRawTransactionWithRefund,
} from './MetaTransactionWallet'

const contract = require('@truffle/contract')
const MetaTransactionWallet = contract(MTWContract)

testWithGanache('MetaTransactionWallet Wrapper', (web3) => {
  MetaTransactionWallet.setProvider(web3.currentProvider)

  const deployWallet = async (deployer: Address, signer: Address): Promise<Address> => {
    const instance = await MetaTransactionWallet.new(true, { from: deployer })
    await instance.initialize(signer, { from: deployer })
    return instance.address
  }

  // Ganache returns 1 in chainId assembly code
  const chainId = 1
  const kit = newKitFromWeb3(web3)

  let accounts: Address[]
  let walletDeployer: Address
  let walletSigner: Address
  let wallet: MetaTransactionWalletWrapper
  let gold: GoldTokenWrapper
  let emptyAccounts: Address[]
  let rando: Address
  let maxGasPrice: number
  let gasLimit: number
  let metaGasLimit: number

  beforeAll(async () => {
    accounts = await web3.eth.getAccounts()
    walletDeployer = accounts[0]
    walletSigner = accounts[1]
    kit.defaultAccount = walletSigner
    rando = accounts[2]
    gold = await kit.contracts.getGoldToken()
    maxGasPrice = 20
    gasLimit = 10000000
    metaGasLimit = 10000
  })

  beforeEach(async () => {
    const walletAddress = await deployWallet(walletDeployer, walletSigner)
    wallet = await kit.contracts.getMetaTransactionWallet(walletAddress)
    // Ganache returns 1 in chainId assembly code
    // @ts-ignore
    wallet.chainId = () => Promise.resolve(chainId)

    // Give the wallet some funds
    await gold.transfer(wallet.address, new BigNumber(20e18).toFixed()).sendAndWaitForReceipt()
    emptyAccounts = [0, 0, 0, 0, 0].map(() => web3.utils.randomHex(20))
  })

  describe('#executeTransaction', () => {
    describe('as a rando', () => {
      it('reverts', async () => {
        expect.assertions(1)
        await expect(
          wallet
            .executeTransaction(gold.transfer(emptyAccounts[0], 10000).txo)
            .sendAndWaitForReceipt({ from: rando })
        ).rejects.toThrow(/Invalid transaction sender/)
      })
    })

    describe('as the signer', () => {
      it('can call contracts', async () => {
        const value = new BigNumber(1e18)
        const result = await wallet
          .executeTransaction(gold.transfer(emptyAccounts[0], value.toFixed()).txo)
          .sendAndWaitForReceipt()
        expect(result.status).toBe(true)
        expect(await gold.balanceOf(emptyAccounts[0])).toEqual(value)
      })
    })
  })

  describe('#executeTransactions', () => {
    describe('as a rando', () => {
      it('reverts', async () => {
        expect.assertions(1)
        await expect(
          wallet
            .executeTransactions([
              gold.transfer(emptyAccounts[0], 1000).txo,
              gold.transfer(emptyAccounts[1], 1000).txo,
            ])
            .sendAndWaitForReceipt({ from: rando })
        ).rejects.toThrow(/Invalid transaction sender/)
      })
    })

    describe('as the signer', () => {
      it('can execute transactions', async () => {
        const walletBalanceBefore = await gold.balanceOf(wallet.address)
        const value = new BigNumber(1e18)
        const result = await wallet
          .executeTransactions([
            gold.transfer(emptyAccounts[0], value.toFixed()).txo,
            gold.transfer(emptyAccounts[1], value.toFixed()).txo,
          ])
          .sendAndWaitForReceipt()
        expect(result.status).toBe(true)

        expect(await gold.balanceOf(wallet.address)).toEqual(
          walletBalanceBefore.minus(value.times(2))
        )
        expect(await gold.balanceOf(emptyAccounts[0])).toEqual(value)
        expect(await gold.balanceOf(emptyAccounts[1])).toEqual(value)
      })
    })
  })

  describe('#getMetaTransactionDigest', () => {
    it('should match the digest created off-chain', async () => {
      const metaTransfer = gold.transfer(emptyAccounts[0], 1000).txo
      const onChainDigest = await wallet.getMetaTransactionDigest(metaTransfer, 0)
      const typedData = buildMetaTxTypedData(
        wallet.address,
        toRawTransaction(metaTransfer),
        0,
        chainId
      )
      const offChainDigest = ensureLeading0x(generateTypedDataHash(typedData).toString('hex'))

      expect(onChainDigest).toEqual(offChainDigest)
    })
  })

  describe('#getMetaTransactionWithRefundDigest', () => {
    it('should match the digest created off-chain', async () => {
      const metaTransfer = gold.transfer(emptyAccounts[0], 1000).txo
      const onChainDigest = await wallet.getMetaTransactionWithRefundDigest(
        metaTransfer,
        0,
        maxGasPrice,
        gasLimit,
        metaGasLimit
      )
      const typedData = buildMetaTxWithRefundTypedData(
        wallet.address,
        toRawTransactionWithRefund(metaTransfer, maxGasPrice, gasLimit, metaGasLimit),
        0,
        chainId
      )
      const offChainDigest = ensureLeading0x(generateTypedDataHash(typedData).toString('hex'))
      expect(onChainDigest).toEqual(offChainDigest)
    })
  })

  describe('#getMetaTransactionSigner', () => {
    it('should match what is signed off-chain', async () => {
      const metaTransfer = gold.transfer(emptyAccounts[0], 1000000).txo
      const signature = await wallet.signMetaTransaction(metaTransfer, 0)
      const signer = await wallet.getMetaTransactionSigner(metaTransfer, 0, signature)
      expect(signer).toEqual(walletSigner)
    })
  })

  describe('#getMetaTransactionWithRefundSigner', () => {
    it('should match what is signed off-chain', async () => {
      const metaTransfer = gold.transfer(emptyAccounts[0], 1000000).txo
      const signature = await wallet.signMetaTransactionWithRefund(
        metaTransfer,
        maxGasPrice,
        gasLimit,
        metaGasLimit,
        0
      )
      const signer = await wallet.getMetaTransactionWithRefundSigner(
        metaTransfer,
        0,
        signature,
        maxGasPrice,
        gasLimit,
        metaGasLimit
      )
      expect(signer).toEqual(walletSigner)
    })
  })

  describe('#signMetaTransaction', () => {
    describe('with an unlocked account', () => {
      it('returns a signature', async () => {
        const signature = await wallet.signMetaTransaction(
          gold.transfer(emptyAccounts[0], 1000).txo
        )
        expect(signature).toBeDefined()
      })
    })
  })

  describe('#signMetaTransactionWithRefund', () => {
    describe('with an unlocked account', () => {
      it('returns a signature', async () => {
        const signature = await wallet.signMetaTransactionWithRefund(
          gold.transfer(emptyAccounts[0], 1000).txo,
          maxGasPrice,
          gasLimit,
          metaGasLimit
        )
        expect(signature).toBeDefined()
      })
    })
  })

  describe('#executeMetaTransaction', () => {
    describe('as a rando', () => {
      it('can execute transactions', async () => {
        const walletBalanceBefore = await gold.balanceOf(wallet.address)
        const value = new BigNumber(1e18)

        const metaTransfer = gold.transfer(emptyAccounts[0], value.toFixed()).txo
        const signature = await wallet.signMetaTransaction(metaTransfer)

        const result = await wallet
          .executeMetaTransaction(metaTransfer, signature)
          .sendAndWaitForReceipt({ from: rando })
        expect(result.status).toBe(true)

        expect(await gold.balanceOf(emptyAccounts[0])).toEqual(value)
        expect(await gold.balanceOf(wallet.address)).toEqual(walletBalanceBefore.minus(value))
      })

      it('can batch transactions as a call to self', async () => {
        const walletBalanceBefore = await gold.balanceOf(wallet.address)
        const value = new BigNumber(1e18)
        const metaBatch = wallet.executeTransactions([
          gold.transfer(emptyAccounts[0], value.toFixed()).txo,
          gold.transfer(emptyAccounts[1], value.toFixed()).txo,
          gold.transfer(emptyAccounts[2], value.toFixed()).txo,
        ]).txo

        const signature = await wallet.signMetaTransaction(metaBatch, 0)
        const result = await wallet
          .executeMetaTransaction(metaBatch, signature)
          .sendAndWaitForReceipt({ from: rando })
        expect(result.status).toBe(true)

        expect(await gold.balanceOf(wallet.address)).toEqual(
          walletBalanceBefore.minus(value.times(3))
        )
        for (let i = 0; i < 3; i++) {
          expect(await gold.balanceOf(emptyAccounts[i])).toEqual(value)
        }
      })
    })

    describe('when passed over the wire', () => {
      it('can hydrate and execute directly', async () => {
        const walletBalanceBefore = await gold.balanceOf(wallet.address)
        const value = new BigNumber(1e18)
        const metaTx = wallet.executeTransactions([
          gold.transfer(emptyAccounts[0], value.toFixed()).txo,
          gold.transfer(emptyAccounts[1], value.toFixed()).txo,
          gold.transfer(emptyAccounts[2], value.toFixed()).txo,
        ]).txo
        const signature = await wallet.signMetaTransaction(metaTx, 0)
        const rawTx = toRawTransaction(metaTx)
        const payload = JSON.stringify({ rawTx, signature })
        // Now we're somewhere else:
        const resp: { rawTx: RawTransaction; signature: Signature } = JSON.parse(payload)
        const result = await wallet
          .executeMetaTransaction(resp.rawTx, resp.signature)
          .sendAndWaitForReceipt({ from: rando })
        expect(result.status).toBe(true)

        expect(await gold.balanceOf(wallet.address)).toEqual(
          walletBalanceBefore.minus(value.times(3))
        )
        for (let i = 0; i < 3; i++) {
          expect(await gold.balanceOf(emptyAccounts[i])).toEqual(value)
        }
      })
    })
  })

  describe('#executeMetaTransactionWithRefund', () => {
    describe('as a rando', () => {
      it('can execute transactions with refund', async () => {
        const randoBalanceBefore = await gold.balanceOf(rando)
        const walletBalanceBefore = await gold.balanceOf(wallet.address)
        const value = new BigNumber(1e18)

        const metaTransfer = { destination: emptyAccounts[0], value: value.toString(), data: '0x' }

        const signature = await wallet.signMetaTransactionWithRefund(
          metaTransfer,
          maxGasPrice,
          gasLimit,
          metaGasLimit
        )

        const MTx = wallet.executeMetaTransactionWithRefund(
          metaTransfer,
          signature,
          maxGasPrice,
          gasLimit,
          metaGasLimit
        )

        const result = await MTx.sendAndWaitForReceipt({ from: rando, gas: gasLimit, gasPrice: 1 })

        const randoBalanceAfter = await gold.balanceOf(rando)
        const walletBalanceAfter = await gold.balanceOf(wallet.address)

        //executes transaction successfully
        expect(result.status).toBe(true)
        expect((await gold.balanceOf(emptyAccounts[0])).isEqualTo(value)).toBe(true)

        //withdraws value from wallet and pays for gas
        expect(walletBalanceAfter.isLessThanOrEqualTo(walletBalanceBefore.minus(value))).toBe(true)

        //refunds relayer
        expect(
          randoBalanceAfter.isGreaterThanOrEqualTo(randoBalanceBefore.multipliedBy(0.99999))
        ).toBe(true)
        expect(
          randoBalanceAfter.isLessThanOrEqualTo(randoBalanceBefore.multipliedBy(1.00001))
        ).toBe(true)
      })
    })
  })

  describe('#signAndExecuteMetaTransaction', () => {
    describe('as a rando', () => {
      it('can execute transactions', async () => {
        const walletBalanceBefore = await gold.balanceOf(wallet.address)
        const value = new BigNumber(1e18)

        const metaTransfer = gold.transfer(emptyAccounts[0], value.toFixed()).txo
        const tx = await wallet.signAndExecuteMetaTransaction(metaTransfer)
        const result = await tx.sendAndWaitForReceipt({ from: rando })
        expect(result.status).toBe(true)

        expect(await gold.balanceOf(emptyAccounts[0])).toEqual(value)
        const walletBalanceAfter = await gold.balanceOf(wallet.address)
        expect(walletBalanceAfter.isLessThan(walletBalanceBefore.minus(value)))
      })

      it('can batch transactions as a call to self', async () => {
        const walletBalanceBefore = await gold.balanceOf(wallet.address)
        const value = new BigNumber(1e18)

        const tx = await wallet.signAndExecuteMetaTransaction(
          wallet.executeTransactions([
            gold.transfer(emptyAccounts[0], value.toFixed()).txo,
            gold.transfer(emptyAccounts[1], value.toFixed()).txo,
            gold.transfer(emptyAccounts[2], value.toFixed()).txo,
          ]).txo
        )
        const result = await tx.sendAndWaitForReceipt({ from: rando })
        expect(result.status).toBe(true)

        expect(await gold.balanceOf(wallet.address)).toEqual(
          walletBalanceBefore.minus(value.times(3))
        )
        for (let i = 0; i < 3; i++) {
          expect(await gold.balanceOf(emptyAccounts[i])).toEqual(value)
        }
      })
    })
  })

  describe('#signAndExecuteMetaTransactionWithRefund', () => {
    describe('as a rando', () => {
      it('can execute transactions', async () => {
        const walletBalanceBefore = await gold.balanceOf(wallet.address)
        const randoBalanceBefore = await gold.balanceOf(rando)
        const value = new BigNumber(1e18)

        const metaTransfer = { destination: emptyAccounts[0], value: value.toString(), data: '0x' }

        const tx = await wallet.signAndExecuteMetaTransactionWithRefund(
          metaTransfer,
          maxGasPrice,
          gasLimit,
          metaGasLimit
        )

        const result = await tx.sendAndWaitForReceipt({ from: rando, gasPrice: 1, gas: gasLimit })

        const walletBalanceAfter = await gold.balanceOf(wallet.address)
        const randoBalanceAfter = await gold.balanceOf(rando)

        //executes transaction successfully
        expect(result.status).toBe(true)
        expect(await gold.balanceOf(emptyAccounts[0])).toEqual(value)

        //withdraws value from wallet and pays for gas
        expect(walletBalanceAfter.isLessThanOrEqualTo(walletBalanceBefore.minus(value))).toBe(true)

        //refunds relayer
        expect(
          randoBalanceAfter.isGreaterThanOrEqualTo(randoBalanceBefore.multipliedBy(0.99999))
        ).toBe(true)
        expect(
          randoBalanceAfter.isLessThanOrEqualTo(randoBalanceBefore.multipliedBy(1.00001))
        ).toBe(true)
      })
    })
  })
})
