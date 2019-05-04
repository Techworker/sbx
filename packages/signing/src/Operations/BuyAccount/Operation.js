/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../Abstract');
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;

const P_SENDER = Symbol('sender');
const P_TARGET = Symbol('target');
const P_AMOUNT = Symbol('amount');
const P_ACCOUNT_PRICE = Symbol('price');
const P_SELLER_ACCOUNT = Symbol('seller');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');

/**
 * A transaction object that can be signed.
 */
class BuyAccount extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
    return 6;
  }

  /**
   * Constructor
   *
   * @param {AccountNumber|Number} sender
   * @param {AccountNumber|Number} target
   * @param {Currency} amount
   * @param {Currency} price
   * @param {AccountNumber} seller
   * @param {PublicKey} newPublicKey
   */
  constructor(sender, target, amount, price, seller, newPublicKey) {
    super();
    this[P_SENDER] = new AccountNumber(sender);
    this[P_TARGET] = new AccountNumber(target);
    this[P_AMOUNT] = new Currency(amount);
    this[P_ACCOUNT_PRICE] = new Currency(price);
    this[P_SELLER_ACCOUNT] = new AccountNumber(seller);
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
  }

  get sender() {
    return this[P_SENDER];
  }

  get target() {
    return this[P_TARGET];
  }

  get amount() {
    return this[P_AMOUNT];
  }

  get price() {
    return this[P_ACCOUNT_PRICE];
  }

  get seller() {
    return this[P_SELLER_ACCOUNT];
  }

  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }
}

module.exports = BuyAccount;
