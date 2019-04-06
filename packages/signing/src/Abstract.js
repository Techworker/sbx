/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// const Payload = require('../Crypto/Payload');
const Signer = require('./Signer');
const BC = require('@sbx/common').BC;
const Currency = require('@sbx/common').Types.Currency;

const P_PAYLOAD = Symbol('payload');
const P_S = Symbol('s');
const P_R = Symbol('r');
const P_FEE = Symbol('fee');
const P_N_OPERATION = Symbol('nOperation');

/**
 * Abstract class for RPC response objects.
 */
class Abstract {
  constructor() {
    this[P_PAYLOAD] = BC.fromString('');
    this[P_S] = null;
    this[P_R] = null;
    this[P_FEE] = new Currency(0);
  }

  /**
     * Sets the payload of the transaction instance.
     *
     * @param {BC} payload
     *
     * @returns {Abstract}
     */
  withPayload(payload) {
    this[P_PAYLOAD] = payload;
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
  withMinFee() {
    this[P_FEE] = Currency.MIN_FEE;
    return this;
  }

  /**
     * Returns a BC with the digest that needs to be hashed.
     *
     * @return {BC}
     */
  // eslint-disable-next-line class-methods-use-this
  digest() {
    throw new Error('Not implemented');
  }

  /**
   * Signs the given operation and returns a new rawoperations string.
   *
   * @param {KeyPair} keyPair
   * @param {Number} nOperation
   * @param {Boolean} useDigest
   * @returns {Abstract}
   */
  sign(keyPair, nOperation, useDigest = false) {
    this[P_N_OPERATION] = nOperation;
    const digest = this.digest();

    let signResult;

    if (useDigest === true) {
      signResult = Signer.signWithDigest(keyPair, digest);
    } else {
      signResult = Signer.signWithHash(keyPair, digest);
    }

    // save results
    this[P_R] = signResult.r;
    this[P_S] = signResult.s;

    return this;
  }

  /**
     * Returns the BC for a rawoperations info.
     *
     * @return {BC}
     */
  toRaw() { // eslint-disable-line class-methods-use-this
    throw new Error('Not implemented');
  }

  /**
     * Returns a new instance of the derived class based on the given raw
     * string.
     *
     * @return {Abstract}
     */
  // eslint-disable-next-line class-methods-use-this
  static fromRaw() {
    throw new Error('Not implemented');
  }

  /**
     * Gets a BC from the given int value.
     *
     * @param {Number} value
     * @param {Number|undefined} size
     * @returns {BC}
     */
  // eslint-disable-next-line class-methods-use-this
  bcFromInt(value, size = null) {
    return (size === null ?
      BC.fromInt(value) :
      BC.fromInt(value, size)).switchEndian();
  }

  /**
     * Gets the given string as a byte collection with the size of the string
     * prepended.
     *
     * @param {String} value
     * @returns {BC}
     */
  bcFromStringWithSize(value) {
    return BC.concat(
      this.bcFromInt(value.length, 2),
      this.bcFromString(value),
    );
  }

  /**
   * Gets the given BC as a byte collection with the size of
   * the BC prepended.
   *
   * @param {BC} value
   * @returns {BC}
   */
  bcFromBcWithSize(value) {
    return BC.concat(
      this.bcFromInt(value.length, 2),
      value,
    );
  }

  /**
   * Extracts a BC with size from the given BC.
   *
   * @param {BC} value
   * @param {Number} offset
   * @returns {BC}
   */
  static readBCWithSize(value, offset) {
    const data = {
      size: value.slice(offset, offset + 2).switchEndian().toInt()
    };

    data.value = value.slice(offset + 2, offset + 2 + data.size);
    return data;
  }

  /**
     * Gets the BC from the given string.
     *
     * @param {String} value
     * @returns {BC}
     */
  bcFromString(value) { // eslint-disable-line class-methods-use-this
    return BC.fromString(value);
  }

  /**
     * Returns the BC for an r and s signing result.
     *
     * @param {BC} r
     * @param {BC} s
     * @returns {BC}
     */
  bcFromSign(r, s) {
    return BC.concat(
      this.bcFromBcWithSize(r),
      this.bcFromBcWithSize(s),
    );
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
