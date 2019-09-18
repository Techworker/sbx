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
const P_PAYLOAD_TYPE = Symbol('payload_type');

/**
 * Represents a receiver in an operation.
 */
class Receiver extends Abstract {
  /**
   * Creates a new instance of the Receiver class.
   *
   * @param {Object} data
   */
  static createFromRPC(data) {
    let receiver = new Receiver(data);

    receiver[P_ACCOUNT] = new AccountNumber(data.account);
    receiver[P_AMOUNT] = new Currency(data.amount);
    receiver[P_PAYLOAD] = BC.fromHex(data.payload);
    receiver[P_PAYLOAD_TYPE] = parseInt(data.payload_type, 10);

    return receiver;
  }

  /**
   * Gets the account of the receiver.
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

  /**
   * Gets the payload type identifier.
   *
   * @returns {Number}
   */
  get payloadType() {
    return this[P_PAYLOAD_TYPE];
  }
}

module.exports = Receiver;
