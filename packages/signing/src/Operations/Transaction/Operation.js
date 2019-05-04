/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../Abstract');
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;

const P_ACCOUNT_SENDER = Symbol('sender');
const P_ACCOUNT_TARGET = Symbol('target');
const P_AMOUNT = Symbol('amount');

/**
 * A transaction object that can be signed.
 */
class Transaction extends Abstract {
  /**
     * Gets the optype.
     *
     * @returns {number}
     */
  get opType() {
    return 1;
  }

  /**
   * Gets the sender account.
   * @returns {AccountNumber}
   */
  get sender() {
    return this[P_ACCOUNT_SENDER];
  }

  /**
   * Gets the sender account.
   * @returns {AccountNumber}
   */
  get target() {
    return this[P_ACCOUNT_TARGET];
  }

  /**
   * Gets the sender account.
   * @returns {AccountNumber}
   */
  get amount() {
    return this[P_AMOUNT];
  }

  /**
     * Creates a new Transaction instance with the given data. The payload is
     * empty by default and not encoded.
     *
   * @param {AccountNumber|Account|String|Number} sender
   * @param {AccountNumber|Account|String|Number} target
   * @param {Currency} amount
     */
  constructor(sender, target, amount) {
    super();
    this[P_ACCOUNT_SENDER] = new AccountNumber(sender);
    this[P_ACCOUNT_TARGET] = new AccountNumber(target);
    this[P_AMOUNT] = new Currency(amount);
  }
}

module.exports = Transaction;
