/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../Abstract');
const BC = require('@sbx/common').BC;
const AccountNumber = require('@sbx/common').Types.AccountNumber;
const Currency = require('@sbx/common').Types.Currency;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_SENDER = Symbol('account_sender');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_DATA_TYPE = Symbol('data_type');
const P_DATA_SEQUENCE = Symbol('data_sequence');
const P_AMOUNT = Symbol('amount');

/**
 * A DATA operation object that can be signed.
 */
class Data extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  static get OPTYPE() {
    return 10;
  }

  /**
   * Constructor
   *
   * @param {Number|AccountNumber} signer
   * @param {Number|AccountNumber} sender
   * @param {Number|AccountNumber} target
   */
  constructor(signer, sender, target) {
    super();
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
   * Gets the digest of the operation.
   *
   * @returns {BC}
   */
  digest() {
    return BC.concat(
      this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4),
      this.bcFromInt(this[P_ACCOUNT_SENDER].account, 4),
      this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4),
      this.bcFromInt(this.nOperation, 4),
      this.bcFromInt(this[P_DATA_TYPE], 2),
      this.bcFromInt(this[P_DATA_SEQUENCE], 2),
      this.bcFromInt(this[P_AMOUNT].toMolina(), 8),
      this.bcFromInt(this.fee.toMolina(), 8),
      this.bcFromBcWithSize(this.payload),
      this.bcFromInt(Data.OPTYPE, 1),
    );
  }

  /**
   * Gets the raw implementation.
   *
   * @returns {BC}
   */
  toRaw() {
    return BC.concat(
      this.bcFromInt(Data.OPTYPE, 4),
      this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4),
      this.bcFromInt(this[P_ACCOUNT_SENDER].account, 4),
      this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4),
      this.bcFromInt(this.nOperation, 4),
      this.bcFromInt(this[P_DATA_TYPE], 2),
      this.bcFromInt(this[P_DATA_SEQUENCE], 2),
      this.bcFromInt(this[P_AMOUNT].toMolina(), 8),
      this.bcFromInt(this.fee.toMolina(), 8),
      this.bcFromBcWithSize(this.payload),
      this.bcFromSign(this.r, this.s),
    );
  }

  /**
   * Gets a new Operation object from the given signed operation.
   *
   * @param {BC|Buffer|String|Uint8Array} raw
   * @returns {BC}
   */
  static fromRaw(raw) {
    raw = BC.from(raw);
    const signer = raw.slice(4, 8).switchEndian().toInt();
    const sender = raw.slice(8, 12).switchEndian().toInt();
    const target = raw.slice(12, 16).switchEndian().toInt();
    const dataType = raw.slice(20, 22).switchEndian().toInt();
    const dataSequence = raw.slice(22, 24).switchEndian().toInt();
    const amount = raw.slice(24, 32).switchEndian().toInt();
    const fee = raw.slice(32, 40).switchEndian().toInt();
    const payload = Data.readBCWithSize(raw, 40).value;

    const op = new Data(signer, sender, target);

    op.withDataType(dataType);
    op.withDataSequence(dataSequence);
    op.withAmount(Currency.fromMolina(amount));
    op.withFee(Currency.fromMolina(fee));
    op.withPayload(payload);

    return op;
  }

  /**
   * Data ops are signed with the digest, not the hash of the digest.
   *
   * @param {KeyPair} keyPair
   * @param {Number} nOperation
   */
  sign(keyPair, nOperation) {
    super.sign(keyPair, nOperation, true);
  }
}

module.exports = Data;
