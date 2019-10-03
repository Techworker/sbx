/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const AccountNumber = require('./../Types/AccountNumber');
const Payload = require('./../Types/Payload');
const Currency = require('./../Types/Currency');
const BC = require('./../BC');

const P_ACCOUNT_NUMBER = Symbol('account.accountNumber');
const P_AMOUNT = Symbol('amount_s.amount');
const P_PAYLOAD = Symbol('payload');
const P_PAYLOAD_TYPE = Symbol('payload_type');

const ALL_PROPS = [
  P_ACCOUNT_NUMBER, P_AMOUNT, P_PAYLOAD, P_PAYLOAD_TYPE
];

/**
 * Represents a receiver in an operation.
 */
class Receiver extends Abstract {
  /**
   * Creates a new instance of the Receiver class.
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let receiver = new this(data);
    let mappedData = receiver.mapInitializationDataWithProperties(ALL_PROPS);

    receiver[P_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_ACCOUNT_NUMBER]);
    receiver[P_AMOUNT] = new Currency(mappedData[P_AMOUNT]);
    receiver[P_PAYLOAD] = new Payload(BC.fromHex(mappedData[P_PAYLOAD]), mappedData[P_PAYLOAD_TYPE]);

    return receiver;
  }

  /**
   * Gets the account of the receiver.
   *
   * @returns {AccountNumber}
   */
  get accountNumber() {
    return this[P_ACCOUNT_NUMBER];
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
   * @returns {Payload}
   */
  get payload() {
    return this[P_PAYLOAD];
  }
}

module.exports = Receiver;
