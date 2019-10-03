/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../Abstract');
const BC = require('@pascalcoin-sbx/common').BC;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_PRICE = Symbol('price');
const P_ACCOUNT_TO_PAY = Symbol('account_to_pay');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
const P_LOCKED_UNTIL_BLOCK = Symbol('locked_until_block');
const P_HASH_LOCK = Symbol('hash_lock');
const P_STATE = Symbol('state');

/**
 * Representation of a signable List operation.
 */
class ListAccount extends Abstract {
  static get STATE_NORMAL() {
    return 1;
  }
  static get STATE_FOR_SALE() {
    return 2;
  }
  static get STATE_FOR_ATOMIC_ACCOUNT_SWAP() {
    return 3;
  }
  static get STATE_FOR_ATOMIC_COIN_SWAP() {
    return 4;
  }
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
    return 4;
  }

  /**
   * Constructor.
   *
   * @param {Number|AccountNumber} accountSigner
   * @param {Number|AccountNumber} accountTarget
   * @param {Currency} price
   * @param {Number|AccountNumber} accountToPay
   */
  constructor(accountSigner, accountTarget, price, accountToPay) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_ACCOUNT_TARGET] = new AccountNumber(accountTarget);
    this[P_PRICE] = new Currency(price);
    this[P_ACCOUNT_TO_PAY] = new AccountNumber(accountToPay);
    this[P_NEW_PUBLIC_KEY] = PublicKey.empty();
    this[P_LOCKED_UNTIL_BLOCK] = 0;
    this[P_HASH_LOCK] = BC.fromHex('00'.repeat(32));
    this[P_STATE] = ListAccount.STATE_FOR_SALE;
  }

  /**
   * Gets the signer of the list operation.
   *
   * @return {AccountNumber}
   */
  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }

  /**
   * Gets the account that should be listed.
   *
   * @return {AccountNumber}
   */
  get target() {
    return this[P_ACCOUNT_TARGET];
  }

  /**
   * Gets the price of the listed account (target)
   *
   * @return {Currency}
   */
  get price() {
    return this[P_PRICE];
  }

  /**
   * Gets the account where the money should be send to on sale.
   *
   * @return {AccountNumber}
   */
  get accountToPay() {
    return this[P_ACCOUNT_TO_PAY];
  }

  /**
   * Gets the new public key in case its a private sale.
   *
   * @return {PublicKey}
   */
  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

  /**
   * Gets the block number until when the account is locked in case of a
   * private sale.
   *
   * @return {Number}
   */
  get lockedUntilBlock() {
    return this[P_LOCKED_UNTIL_BLOCK];
  }

  /**
   * Gets the designated new state.
   *
   * @return {Number}
   */
  get state() {
    return this[P_STATE];
  }

  get hashLock() {
    return this[P_HASH_LOCK];
  }

  /**
   * Will mark the operation as a private sale to a public key.
   *
   * @param {PublicKey} newPublicKey
   * @param {Number} lockedUntilBlock
   */
  asPrivateSale(newPublicKey, lockedUntilBlock = 0) {
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
    this[P_LOCKED_UNTIL_BLOCK] = parseInt(lockedUntilBlock, 10);
  }

  asForSale() {
    this[P_STATE] = ListAccount.STATE_FOR_SALE;
  }

  asAccountSwap(hashLock, lockedUntilBlock, newPublicKey) {
    this[P_STATE] = ListAccount.STATE_FOR_ATOMIC_ACCOUNT_SWAP;
    this[P_HASH_LOCK] = hashLock;
    this[P_LOCKED_UNTIL_BLOCK] = lockedUntilBlock;
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
  }

  asCoinSwap(hashLock) {
    this[P_STATE] = ListAccount.STATE_FOR_ATOMIC_COIN_SWAP;
    this[P_HASH_LOCK] = hashLock;
  }
}

module.exports = ListAccount;
