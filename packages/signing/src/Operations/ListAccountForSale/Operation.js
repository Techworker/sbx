/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../Abstract');
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_PRICE = Symbol('price');
const P_ACCOUNT_TO_PAY = Symbol('account_to_pay');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
const P_LOCKED_UNTIL_BLOCK = Symbol('locked_until_block');

/**
 * A transaction object that can be signed.
 */
class ListAccountForSale extends Abstract {
  /**
     * Gets the optype.
     *
     * @returns {number}
     */
  get opType() {
    return 4;
  }

  /**
   *
   * @param accountSigner
   * @param accountTarget
   * @param price
   * @param accountToPay
   */
  constructor(accountSigner, accountTarget, price, accountToPay) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_ACCOUNT_TARGET] = new AccountNumber(accountTarget);
    this[P_PRICE] = new Currency(price);
    this[P_ACCOUNT_TO_PAY] = new AccountNumber(accountToPay);
    this[P_NEW_PUBLIC_KEY] = PublicKey.empty();
    this[P_LOCKED_UNTIL_BLOCK] = 0;
  }

  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }

  get target() {
    return this[P_ACCOUNT_TARGET];
  }

  get price() {
    return this[P_PRICE];
  }

  get accountToPay() {
    return this[P_ACCOUNT_TO_PAY];
  }

  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

  get lockedUntilBlock() {
    return this[P_LOCKED_UNTIL_BLOCK];
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
}

module.exports = ListAccountForSale;
