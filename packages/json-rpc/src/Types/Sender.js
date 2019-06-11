/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const BC = require('@pascalcoin-sbx/common').BC;

const P_ACCOUNT = Symbol('account');
const P_AMOUNT = Symbol('amount');
const P_PAYLOAD = Symbol('payload');
const P_N_OPERATION = Symbol('nOperation');

/**
 * Represents a sender in an operation.
 */
class Sender extends Abstract {
  /**
   * Creates a new instance of the Sender class.
   *
   * @param {Object} data
   */
  static createFromRPC(data) {
    let sender = new Sender(data);

    sender[P_N_OPERATION] = parseInt(data.n_operation, 10);
    sender[P_ACCOUNT] = new AccountNumber(data.account);
    sender[P_AMOUNT] = new Currency(data.amount);
    sender[P_PAYLOAD] = BC.fromHex(data.payload);

    return sender;
  }

  /**
   * Gets the n operation of thwe sender.
   *
   * @returns {Number}
   */
  get nOperation() {
    return this[P_N_OPERATION];
  }

  /**
   * Gets the account of the sender.
   *
   * @returns {AccountNumber}
   */
  get account() {
    return this[P_ACCOUNT];
  }

  /**
   * Gets the amount.
   *
   * @returns {Currency}
   */
  get amount() {
    return this[P_AMOUNT];
  }

  /**
   * Gets the payload.
   *
   * @returns {BC}
   */
  get payload() {
    return this[P_PAYLOAD];
  }
}

module.exports = Sender;
