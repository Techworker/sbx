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
const P_N_OPERATION = Symbol('n_operation.nOperation');

const ALL_PROPS = [
  P_ACCOUNT_NUMBER, P_AMOUNT, P_PAYLOAD, P_PAYLOAD_TYPE, P_N_OPERATION
];

/**
 * Represents a sender in an operation.
 */
class Sender extends Abstract {
  /**
   * Creates a new instance of the Sender class.
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let sender = new this(data);
    let mappedData = sender.mapInitializationDataWithProperties(ALL_PROPS);

    sender[P_N_OPERATION] = parseInt(mappedData[P_N_OPERATION], 10);
    sender[P_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_ACCOUNT_NUMBER]);
    sender[P_AMOUNT] = new Currency(mappedData[P_AMOUNT]);
    sender[P_PAYLOAD] = new Payload(BC.fromHex(mappedData[P_PAYLOAD]), mappedData[P_PAYLOAD_TYPE]);

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

module.exports = Sender;
