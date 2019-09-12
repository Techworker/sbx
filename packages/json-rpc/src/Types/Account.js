/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');

const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;
const BC = require('@pascalcoin-sbx/common').BC;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const pkCoder = new PublicKeyCoder();

const P_ACCOUNT = Symbol('account');
const P_ENC_PUBKEY = Symbol('enc_pubkey');
const P_BALANCE = Symbol('balance');
const P_N_OPERATION = Symbol('n_operation');
const P_UPDATED_B = Symbol('updated_b');
const P_STATE = Symbol('state');
const P_NAME = Symbol('name');
const P_TYPE = Symbol('type');
const P_LOCKED_UNTIL_BLOCK = Symbol('locked_until_block');
const P_PRICE = Symbol('price');
const P_SELLER_ACCOUNT = Symbol('seller_account');
const P_PRIVATE_SALE = Symbol('private_sale');
const P_NEW_ENC_PUBKEY = Symbol('new_enc_pubkey');

// v5
const P_DATA = Symbol('data');
const P_SEAL = Symbol('seal');
const P_HASHED_SECRET = Symbol('hashed_secret');
const P_AMOUNT_TO_SWAP = Symbol('amount_to_swap');
const P_RECEIVER_SWAP_AMOUNT = Symbol('receiver_swap_amount');

const codingProps = {
  account: P_ACCOUNT,
  publicKey: P_ENC_PUBKEY,
  balance: P_BALANCE,
  nOperation: P_N_OPERATION,
  updatedB: P_UPDATED_B,
  name: P_NAME,
  type: P_TYPE,
  lockedUntilBlock: P_LOCKED_UNTIL_BLOCK,
  price: P_PRICE,
  sellerAccount: P_SELLER_ACCOUNT,
  privateSale: P_PRIVATE_SALE,
  newPublicKey: P_NEW_ENC_PUBKEY,

  // v5
  data: P_DATA,
  seal: P_SEAL,
  hashedSecret: P_HASHED_SECRET,
  amountToSwap: P_AMOUNT_TO_SWAP,
  receiverSwapAccount: P_RECEIVER_SWAP_AMOUNT
};

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
  static createFromRPC(data) {
    let account = new Account(data);

    account[P_ACCOUNT] = new AccountNumber(data.account);
    account[P_ENC_PUBKEY] = pkCoder.decodeFromBytes(BC.fromHex(data.enc_pubkey));
    account[P_BALANCE] = new Currency(data.balance_s);
    account[P_N_OPERATION] = parseInt(data.n_operation, 10);
    account[P_UPDATED_B] = parseInt(data.updated_b, 10);

    account[P_SEAL] = null;
    if (data.seal !== undefined) {
      account[P_SEAL] = BC.fromHex(data.seal);
    }

    account[P_DATA] = null;
    if (data.data !== undefined) {
      account[P_DATA] = BC.fromHex(data.data);
    }

    if (data.state !== Account.STATE_NORMAL && data.state !== Account.STATE_LISTED &&
        data.state !== Account.STATE_ACCOUNT_SWAP && data.state !== Account.STATE_COIN_SWAP) {
      throw new Error('Invalid account state.');
    }

    account[P_STATE] = data.state;
    account[P_NAME] = new AccountName(data.name);
    account[P_TYPE] = data.type;

    account[P_LOCKED_UNTIL_BLOCK] = null;
    if (data.locked_until_block !== undefined) {
      account[P_LOCKED_UNTIL_BLOCK] = parseInt(data.locked_until_block, 10);
    }

    account[P_PRICE] = null;
    if (data.price_s !== undefined) {
      account[P_PRICE] = new Currency(data.price_s);
    }

    account[P_SELLER_ACCOUNT] = null;
    if (data.seller_account !== undefined) {
      account[P_SELLER_ACCOUNT] = new AccountNumber(data.seller_account);
    }

    account[P_PRIVATE_SALE] = null;
    if (data.private_sale !== undefined) {
      account[P_PRIVATE_SALE] = data.private_sale;
    }

    account[P_NEW_ENC_PUBKEY] = null;
    if (data.new_enc_pubkey !== undefined && data.new_enc_pubkey !== '000000000000') {
      account[P_NEW_ENC_PUBKEY] = pkCoder.decodeFromBytes(BC.fromHex(data.new_enc_pubkey));
    }

    account[P_HASHED_SECRET] = null;
    if (data.hashed_secret !== undefined) {
      account[P_HASHED_SECRET] = BC.fromHex(data.hashed_secret);
    }

    account[P_AMOUNT_TO_SWAP] = null;
    if (data.amount_to_swap_s !== undefined) {
      account[P_AMOUNT_TO_SWAP] = new Currency(data.amount_to_swap_s);
    }

    account[P_RECEIVER_SWAP_AMOUNT] = null;
    if (data.receiver_swap_account !== undefined) {
      account[P_RECEIVER_SWAP_AMOUNT] = new AccountNumber(data.receiver_swap_account);
    }

    return account;
  }

  /**
   * Gets the account number of the account.
   *
   * @returns {AccountNumber}
   */
  get account() {
    return this[P_ACCOUNT];
  }

  /**
   * Gets the public key of the account.
   *
   * @returns {PublicKey}
   */
  get publicKey() {
    return this[P_ENC_PUBKEY];
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
  get updatedB() {
    return this[P_UPDATED_B];
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
  get lockedUntilBlock() {
    return this[P_LOCKED_UNTIL_BLOCK];
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
  get sellerAccount() {
    return this[P_SELLER_ACCOUNT];
  }

  /**
   * Gets a flag indicating whether the account is for sale. Attention:
   * null and false = not for sale.
   *
   * @returns {boolean}
   */
  get privateSale() {
    return !!this[P_PRIVATE_SALE];
  }

  /**
   * Gets the new public key in case of a escrow.
   *
   * @returns {PublicKey|null}
   */
  get newPublicKey() {
    return this[P_NEW_ENC_PUBKEY];
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
  get receiverSwapAccount() {
    return this[P_RECEIVER_SWAP_AMOUNT];
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

  /**
   * Gets a plain object copy of the instance.
   */
  serialize() {
    let serialized = {};

    Object.keys(codingProps).forEach((p) => (serialized[p] = this[p]));
    return serialized;
  }

  static createFromSerialized(serialized) {
    let account = new Account({});

    Object.keys(codingProps).forEach((p) => {
      account[codingProps[p]] = serialized[p];
    });
    return account;
  }

}

module.exports = Account;
