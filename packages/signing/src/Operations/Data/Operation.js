/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../Abstract');
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_SENDER = Symbol('account_sender');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_DATA_TYPE = Symbol('data_type');
const P_DATA_SEQUENCE = Symbol('data_sequence');
const P_AMOUNT = Symbol('amount');

/**
 * Representation of a signable DATA operation.
 */
class Data extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
    return 10;
  }

  /**
   * Constructor
   *
   * @param {Number|AccountNumber} signer
   * @param {Number|AccountNumber} sender
   * @param {Number|AccountNumber} target
   */
  constructor(signer, sender = null, target = null) {
    super();

    if (sender === null) {
      sender = signer;
    }

    if (target === null) {
      target = sender;
    }

    this[P_ACCOUNT_SIGNER] = new AccountNumber(signer);
    this[P_ACCOUNT_SENDER] = new AccountNumber(sender);
    this[P_ACCOUNT_TARGET] = new AccountNumber(target);
    this[P_DATA_TYPE] = 0;
    this[P_DATA_SEQUENCE] = 0;
    this[P_AMOUNT] = new Currency(0);
  }

  /**
   * Sets the data type.
   *
   * @param {Number} dataType
   * @returns {Data}
   */
  withDataType(dataType) {
    this[P_DATA_TYPE] = parseInt(dataType, 10);

    return this;
  }

  /**
   * Sets the data information.
   *
   * @param {Number} dataSequence
   * @returns {Data}
   */
  withDataSequence(dataSequence) {
    this[P_DATA_SEQUENCE] = parseInt(dataSequence, 10);

    return this;
  }

  /**
   * Sets the amount to transfer.
   *
   * @param {Currency|Number|String} amount
   * @returns {Data}
   */
  withAmount(amount) {
    this[P_AMOUNT] = new Currency(amount);
    return this;
  }

  /**
   * Gets the signer account number.
   *
   * @returns {AccountNumber}
   */
  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }

  /**
   * Gets the sender account number.
   *
   * @returns {AccountNumber}
   */
  get sender() {
    return this[P_ACCOUNT_SENDER];
  }

  /**
   * Gets the target account number.
   *
   * @returns {AccountNumber}
   */
  get target() {
    return this[P_ACCOUNT_TARGET];
  }

  /**
   * Gets the data type.
   *
   * @returns {Number}
   */
  get dataType() {
    return this[P_DATA_TYPE];
  }

  /**
   * Gets the data sequence.
   *
   * @returns {Number}
   */
  get dataSequence() {
    return this[P_DATA_SEQUENCE];
  }

  /**
   * Gets the amount to send.
   *
   * @returns {Currency}
   */
  get amount() {
    return this[P_AMOUNT];
  }

  /**
   * Forces the signer to use the digest instead of the hash of the digest
   * to sign the operation.
   *
   * @return {boolean}
   */
  usesDigestToSign() {
    return true;
  }
}

module.exports = Data;
