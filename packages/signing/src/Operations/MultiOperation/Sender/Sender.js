/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../../Abstract');
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;

const P_ACCOUNT = Symbol('account');
const P_AMOUNT = Symbol('amount');

/**
 * Representation of a Sender in a MultiOperation.
 */
class Sender extends Abstract {

  /**
   * Constructor.
   *
   * @param {AccountNumber|Number} account
   * @param {Number|Currency} amount
   */
  constructor(account, amount) {
    super();
    this[P_ACCOUNT] = new AccountNumber(account);
    this[P_AMOUNT] = new Currency(amount);
  }

  /**
   * Overwrites the min fee setter. MultiOperations dont have a fee field, the fee is
   * added to the full amount.
   *
   * @param {Number|null} lastKnownBlock
   * @return {Sender}
   */
  withMinFee(lastKnownBlock = null) {
    super.withMinFee(lastKnownBlock);
    this[P_AMOUNT] = this[P_AMOUNT].add(this.fee);
    return this;
  }

  /**
   * Overwrites the fee setter. MultiOperations dont have a fee field, the fee is
   * added to the full amount.
   *
   * @return {Sender}
   */
  withFee(fee) {
    super.withFee(fee);
    this[P_AMOUNT] = this[P_AMOUNT].add(this.fee);
    return this;
  }

  /**
   * Gets the sending account.
   *
   * @return {AccountNumber}
   */
  get account() {
    return this[P_ACCOUNT];
  }

  /**
   * Gets the amount to send.
   *
   * @return {Currency}
   */
  get amount() {
    return this[P_AMOUNT];
  }
}

module.exports = Sender;
