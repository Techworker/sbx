/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');

const AccountNumber = require('./../Types/AccountNumber');
const AccountName = require('./../Types/AccountName');
const BC = require('./../BC');
const Currency = require('./../Types/Currency');
const PublicKeyCoder = require('./../Coding/Pascal/Keys/PublicKey');

const pkCoder = new PublicKeyCoder();

const P_ACCOUNT_NUMBER = Symbol('account.accountNumber');
const P_PUBLIC_KEY = Symbol('enc_pubkey.publicKey');
const P_BALANCE = Symbol('balance_s.balance');
const P_N_OPERATION = Symbol('n_operation.nOperation');
const P_UPDATED_IN_BLOCK_NUMBER = Symbol('updated_b.updatedInBlockNumber');
const P_STATE = Symbol('state');
const P_NAME = Symbol('name');
const P_TYPE = Symbol('type');
const P_LOCKED_UNTIL_BLOCK_NUMBER = Symbol('locked_until_block.lockedUntilBlockNumber');
const P_PRICE = Symbol('price_s.price');
const P_SELLER_ACCOUNT_NUMBER = Symbol('seller_account.sellerAccountNumber');
const P_IS_PRIVATE_SALE = Symbol('private_sale.isPrivateSale');
const P_NEW_PUBLIC_KEY = Symbol('new_enc_pubkey.newPublicKey');

// v5
const P_DATA = Symbol('data');
const P_SEAL = Symbol('seal');
const P_HASHED_SECRET = Symbol('hashed_secret.hashedSecret');
const P_AMOUNT_TO_SWAP = Symbol('amount_to_swap_s.amountToSwap');
const P_RECEIVER_SWAP_ACCOUNT_NUMBER = Symbol('receiver_swap_account.receiverSwapAccountNumber');

const ALL_PROPS = [
  P_ACCOUNT_NUMBER, P_PUBLIC_KEY, P_BALANCE, P_N_OPERATION, P_UPDATED_IN_BLOCK_NUMBER, P_STATE,
  P_NAME, P_TYPE, P_LOCKED_UNTIL_BLOCK_NUMBER, P_PRICE, P_SELLER_ACCOUNT_NUMBER, P_IS_PRIVATE_SALE,
  P_NEW_PUBLIC_KEY, P_DATA, P_SEAL, P_HASHED_SECRET, P_AMOUNT_TO_SWAP, P_RECEIVER_SWAP_ACCOUNT_NUMBER
];

/**
 * Represents an account.
 */
class Account extends Abstract {
  /**
   * The state of an account when it is listed for sale.
   *
   * @returns {string}
   */
  static get STATE_LISTED() {
    return 'listed';
  }

  /**
   * The state of an account when it is not listed.
   *
   * @returns {string}
   */
  static get STATE_NORMAL() {
    return 'normal';
  }

  /**
   * Coin swap state
   *
   * @returns {string}
   */
  static get STATE_COIN_SWAP() {
    return 'coin_swap';
  }

  /**
   * TODO
   *
   * @returns {string}
   */
  static get STATE_ACCOUNT_SWAP() {
    return 'account_swap';
  }

  /**
   * Constructor
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let account = new this(data);

    const mappedData = account.mapInitializationDataWithProperties(ALL_PROPS);

    account[P_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_ACCOUNT_NUMBER]);
    account[P_PUBLIC_KEY] = pkCoder.decodeFromBytes(BC.fromHex(mappedData[P_PUBLIC_KEY]));
    account[P_BALANCE] = new Currency(mappedData[P_BALANCE]);
    account[P_N_OPERATION] = parseInt(mappedData[P_N_OPERATION], 10);
    account[P_UPDATED_IN_BLOCK_NUMBER] = parseInt(mappedData[P_UPDATED_IN_BLOCK_NUMBER], 10);

    account[P_SEAL] = null;
    if (mappedData[P_SEAL] !== undefined) {
      account[P_SEAL] = BC.fromHex(mappedData[P_SEAL]);
    }

    account[P_DATA] = null;
    if (mappedData[P_DATA] !== undefined) {
      account[P_DATA] = BC.fromHex(mappedData[P_DATA]);
    }

    const state = mappedData[P_STATE];

    if (state !== Account.STATE_NORMAL && state !== Account.STATE_LISTED &&
        state !== Account.STATE_ACCOUNT_SWAP && state !== Account.STATE_COIN_SWAP) {
      throw new Error('Invalid account state.');
    }

    account[P_STATE] = state;
    account[P_NAME] = new AccountName(mappedData[P_NAME]);
    account[P_TYPE] = mappedData[P_TYPE];

    account[P_LOCKED_UNTIL_BLOCK_NUMBER] = null;
    if (mappedData[P_LOCKED_UNTIL_BLOCK_NUMBER] !== undefined) {
      account[P_LOCKED_UNTIL_BLOCK_NUMBER] = parseInt(mappedData[P_LOCKED_UNTIL_BLOCK_NUMBER], 10);
    }

    account[P_PRICE] = null;
    if (mappedData[P_PRICE] !== undefined) {
      account[P_PRICE] = new Currency(mappedData[P_PRICE]);
    }

    account[P_SELLER_ACCOUNT_NUMBER] = null;
    if (mappedData[P_SELLER_ACCOUNT_NUMBER] !== undefined) {
      account[P_SELLER_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_SELLER_ACCOUNT_NUMBER]);
    }

    account[P_IS_PRIVATE_SALE] = false;
    if (mappedData[P_IS_PRIVATE_SALE] !== undefined) {
      account[P_IS_PRIVATE_SALE] = mappedData[P_IS_PRIVATE_SALE];
    }

    account[P_NEW_PUBLIC_KEY] = null;
    if (mappedData[P_NEW_PUBLIC_KEY] !== undefined && mappedData[P_NEW_PUBLIC_KEY] !== '000000000000') {
      account[P_NEW_PUBLIC_KEY] = pkCoder.decodeFromBytes(BC.fromHex(mappedData[P_NEW_PUBLIC_KEY]));
    }

    account[P_HASHED_SECRET] = null;
    if (mappedData[P_HASHED_SECRET] !== undefined) {
      account[P_HASHED_SECRET] = BC.fromHex(mappedData[P_HASHED_SECRET]);
    }

    account[P_AMOUNT_TO_SWAP] = null;
    if (mappedData[P_AMOUNT_TO_SWAP] !== undefined) {
      account[P_AMOUNT_TO_SWAP] = new Currency(mappedData[P_AMOUNT_TO_SWAP]);
    }

    account[P_RECEIVER_SWAP_ACCOUNT_NUMBER] = null;
    if (mappedData[P_RECEIVER_SWAP_ACCOUNT_NUMBER] !== undefined) {
      account[P_RECEIVER_SWAP_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_RECEIVER_SWAP_ACCOUNT_NUMBER]);
    }

    return account;
  }

  /**
   * Gets the account number of the account.
   *
   * @returns {AccountNumber}
   */
  get accountNumber() {
    return this[P_ACCOUNT_NUMBER];
  }

  /**
   * Gets the public key of the account.
   *
   * @returns {PublicKey}
   */
  get publicKey() {
    return this[P_PUBLIC_KEY];
  }

  /**
   * Gets the balance of the account.
   *
   * @returns {Currency}
   */
  get balance() {
    return this[P_BALANCE];
  }

  /**
   * Gets the number of operations of this account.
   *
   * @returns {Number}
   */
  get nOperation() {
    return this[P_N_OPERATION];
  }

  /**
   * Gets the block number when the account was last updated.
   *
   * @returns {Number}
   */
  get updatedInBlockNumber() {
    return this[P_UPDATED_IN_BLOCK_NUMBER];
  }

  /**
   * Gets the block number when the account was created.
   *
   * @returns {Number}
   */
  get createdInBlockNumber() {
    return Math.floor(this[P_ACCOUNT_NUMBER] / 5);
  }

  /**
   * Gets the state of the account (normal, listed).
   *
   * @returns {String}
   */
  get state() {
    return this[P_STATE];
  }

  /**
   * Gets the name of the account.
   *
   * @returns {AccountName}
   */
  get name() {
    return this[P_NAME];
  }

  /**
   * Gets the type of the account.
   *
   * @returns {Number}
   */
  get type() {
    return this[P_TYPE];
  }

  /**
   * Gets the block number until the account is locked when it's listed for
   * sale.
   *
   * @returns {Number|null}
   */
  get lockedUntilBlockNumber() {
    return this[P_LOCKED_UNTIL_BLOCK_NUMBER];
  }

  /**
   * Gets the price of the account in case its listed.
   *
   * @returns {Currency|null}
   */
  get price() {
    return this[P_PRICE];
  }

  /**
   * Gets the account of the seller in case the account is listed for sale.
   *
   * @returns {AccountNumber|null}
   */
  get sellerAccountNumber() {
    return this[P_SELLER_ACCOUNT_NUMBER];
  }

  /**
   * Gets a flag indicating whether the account is for sale. Attention:
   * null and false = not for sale.
   *
   * @returns {boolean}
   */
  get isPrivateSale() {
    return !!this[P_IS_PRIVATE_SALE];
  }

  /**
   * Gets the new public key in case of a escrow.
   *
   * @returns {PublicKey|null}
   */
  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

  /**
   * Gets the hashed secret.
   *
   * @return {BC}
   */
  get hashedSecret() {
    return this[P_HASHED_SECRET];
  }

  /**
   * Gets the account data.
   *
   * @return {BC}
   */
  get data() {
    return this[P_DATA];
  }

  /**
   * Gets the account seal.
   *
   * @return {BC}
   */
  get seal() {
    return this[P_SEAL];
  }

  /**
   *Gets the amount to be swapped.
   *
   * @return {Currency}
   */
  get amountToSwap() {
    return this[P_AMOUNT_TO_SWAP];
  }

  /**
   * Gets the coin swap receiver account.
   *
   * @return {AccountNumber}
   */
  get receiverSwapAccountNumber() {
    return this[P_RECEIVER_SWAP_ACCOUNT_NUMBER];
  }

  /**
   * Gets a value indicating whether the account is for sale.
   *
   * @returns {boolean}
   */
  isForSale() {
    return this[P_STATE] === Account.STATE_LISTED;
  }

  /**
   * Gets a value indicating whether the account is in account swap state.
   *
   * @returns {boolean}
   */
  isAccountSwap() {
    return this[P_STATE] === Account.STATE_ACCOUNT_SWAP;
  }

  /**
   * Gets a value indicating whether the account is in coin swap state.
   *
   * @returns {boolean}
   */
  isCoinSwap() {
    return this[P_STATE] === Account.STATE_COIN_SWAP;
  }
}

module.exports = Account;
