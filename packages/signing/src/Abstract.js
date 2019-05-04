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
const Sha = require('@pascalcoin-sbx/common').Sha;
const Keys = require('@pascalcoin-sbx/crypto').Keys;

const P_PAYLOAD = Symbol('payload');
const P_S = Symbol('s');
const P_R = Symbol('r');
const P_FEE = Symbol('fee');
const P_N_OPERATION = Symbol('nOperation');

/**
 * Signs the given digest with the given keypair and returns the r and s
 * values (because thats all that is needed).
 *
 * @param {KeyPair} keyPair
 * @param {BC} digest
 */
function signWithHash(keyPair, digest) {
  const hash = Sha.sha256(digest);

  return Keys.sign(keyPair, hash);
}

function signWithDigest(keyPair, digest) {
  return Keys.sign(keyPair, digest);
}

/**
 * Abstract class for RPC response objects.
 */
class Abstract {

  /**
   * Constructor.
   */
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
  withMinFee(lastKnownBlock = null) {
    this[P_FEE] = PascalCoinInfo.MIN_FEE(lastKnownBlock);
    return this;
  }

  /**
   * Returns a BC with the digest that needs to be hashed.
   *
   * @return {BC}
   */
  digest(coder) {
    return coder.encodeToBytes(this);
  }

  /**
   * Returns a BC with the digest that needs to be hashed.
   *
   * @return {BC}
   */
  raw(coder) {
    return coder.encodeToBytes(this);
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
      signResult = signWithDigest(keyPair, digest);
    } else {
      signResult = signWithHash(keyPair, digest);
    }

    // save results
    this[P_R] = signResult.r;
    this[P_S] = signResult.s;

    return this;
  }

  signFromDecoded(nOperation, r, s) {
    this[P_N_OPERATION] = nOperation;
    this[P_R] = r;
    this[P_S] = s;
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
