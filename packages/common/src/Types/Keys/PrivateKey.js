/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('../../BC');
const Curve = require('./Curve');

const P_KEY = Symbol('key');
const P_CURVE = Symbol('curve');
const P_LENGTH = Symbol('length');

/**
 * Represents a public key in pascalcoin.
 */
class PrivateKey {
  /**
     * Constructor
     *
     * @param {BC|Buffer|Uint8Array|String} key
     * @param {Curve} curve
     */
  constructor(key, curve) {
    this[P_KEY] = BC.from(key);
    this[P_CURVE] = curve;
    this[P_LENGTH] = key.length;

    const privateKeyLength = curve.lPrivateKey();

    if (this[P_LENGTH] > privateKeyLength) {
      throw new Error(`Invalid length for curve ${curve.name} - ` +
          `expected <= ${privateKeyLength}, got ${this[P_LENGTH]}`
      );
    }

    /*
    if (this[P_LENGTH] < privateKeyLength) {
      this[P_LENGTH] = privateKeyLength;
      this[P_KEY] = key.prepend(BC.fromHex('00'.repeat(privateKeyLength - this[P_LENGTH])));
    }*/
  }

  /**
     * Gets the key value.
     *
     * @returns {BC}
     */
  get key() {
    return this[P_KEY];
  }

  /**
     * Gets the ec key.
     *
     * @returns {BC}
     */
  get ec() {
    return this.key;
  }

  /**
     * Gets the y value of the key.
     *
     * @returns {Number}
     */
  get length() {
    return this[P_LENGTH];
  }

  /**
     * Gets the used curve.
     *
     * @returns {Curve}
     */
  get curve() {
    return this[P_CURVE];
  }

  /**
   * Encodes a private key to a BC defined by PascalCoin.
   *
   * @returns {BC}
   */
  encode() {
    const curve = BC.fromInt(this.curve.id).switchEndian();
    const length = BC.fromInt(this.length, 2).switchEndian();

    return BC.concat(curve, length, this.key);
  }

  /**
   * Decodes a PascalCoin private key string.
   *
   * @param {BC|Buffer|Uint8Array|String} encoded
   * @returns {PrivateKey}
   */
  static decode(encoded) {
    encoded = BC.from(encoded);
    const curve = encoded.slice(0, 2).switchEndian().toInt();
    const length = encoded.slice(2, 4).switchEndian().toInt();
    const key = encoded.slice(4, 4 + length);

    return new PrivateKey(key, new Curve(curve));
  }
}

module.exports = PrivateKey;
