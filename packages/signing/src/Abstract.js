/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// const Payload = require('../Crypto/Payload');
const BC = require('@pascalcoin-sbx/common').BC;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const PascalCoinInfo = require('@pascalcoin-sbx/common').PascalCoinInfo;

const P_PAYLOAD = Symbol('payload');
const P_PAYLOAD_TYPE = Symbol('payload_type');
const P_S = Symbol('s');
const P_R = Symbol('r');
const P_FEE = Symbol('fee');
const P_N_OPERATION = Symbol('nOperation');

/**
 * Abstract class for RPC response objects.
 */
class Abstract {

  /**
   * Constructor.
   */
  constructor() {
    this[P_PAYLOAD] = BC.fromString('');
    this[P_PAYLOAD_TYPE] = 0;
    this[P_S] = null;
    this[P_R] = null;
    this[P_FEE] = new Currency(0);
  }

  /**
   * Sets the payload of the transaction instance.
   *
   * @param {BC} payload
   * @param {Number} payloadType
   *
   * @returns {Abstract}
   */
  withPayload(payload, payloadType = 0) {
    this[P_PAYLOAD] = BC.from(payload);
    this[P_PAYLOAD_TYPE] = payloadType;
    return this;
  }

  /**
   * Sets the fee.
   *
   * @param {Currency} fee
   * @returns {Abstract}
   */
  withFee(fee) {
    this[P_FEE] = new Currency(fee);
    return this;
  }

  /**
   * Sets the fee to the minimum.
   *
   * @returns {Abstract}
   */
  withMinFee(lastKnownBlock = null) {
    this[P_FEE] = PascalCoinInfo.MIN_FEE(lastKnownBlock);
    return this;
  }

  withNOperation(nOperation) {
    this[P_N_OPERATION] = nOperation;
    return this;
  }

  withSign(r, s) {
    this[P_R] = BC.from(r);
    this[P_S] = BC.from(s);
  }

  /**
   * Gets the prepared payload.
   *
   * @returns {BC}
   */
  get payload() {
    return this[P_PAYLOAD];
  }

  /**
   * Gets the payload type identifier.
   *
   * @returns {BC}
   */
  get payloadType() {
    return this[P_PAYLOAD_TYPE];
  }

  /**
   * Gets the r value of the sign result.
   *
   * @returns {BC|null}
   */
  get r() {
    return this[P_R];
  }

  /**
   * Gets the s value of the sign result.
   *
   * @returns {BC|null}
   */
  get s() {
    return this[P_S];
  }

  /**
   * Gets the fee.
   *
   * @returns {Currency}
   */
  get fee() {
    return this[P_FEE];
  }

  /**
   * Gets the n operation.
   *
   * @returns {Number}
   */
  get nOperation() {
    return this[P_N_OPERATION];
  }

  /**
   * Gets a value indicating whether the current operation is already signed.
   *
   * @returns {boolean}
   */
  get isSigned() {
    return this[P_S] !== null && this[P_R] !== null;
  }
}

module.exports = Abstract;
