/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const BC = require('@pascalcoin-sbx/common').BC;

const P_ACCOUNT = Symbol('account');
const P_AMOUNT = Symbol('amount');
const P_PAYLOAD = Symbol('payload');

/**
 * Representation of a signable ChangeKey operation.
 */
class Receiver {

  /**
   * Constructor.
   *
   * @param {AccountNumber|Number} account
   * @param {Number|Currency} amount
   */
  constructor(account, amount) {
    this[P_ACCOUNT] = new AccountNumber(account);
    this[P_AMOUNT] = new Currency(amount);
  }

  /**
   * Sets the payload of the receiver.
   *
   * @param {BC|String} payload
   * @return {Receiver}
   */
  withPayload(payload) {
    this[P_PAYLOAD] = BC.from(payload);
    return this;
  }

  /**
   * Gets the receiving account.
   *
   * @return {AccountNumber}
   */
  get account() {
    return this[P_ACCOUNT];
  }

  /**
   * Gets the amount received.
   *
   * @return {Currency}
   */
  get amount() {
    return this[P_AMOUNT];
  }

  /**
   * Gets the payload of the receiver.
   *
   * @return {BC}
   */
  get payload() {
    return this[P_PAYLOAD];
  }
}

module.exports = Receiver;
