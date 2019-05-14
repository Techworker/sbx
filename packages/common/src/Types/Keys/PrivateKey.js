/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('../../BC');

const P_KEY = Symbol('key');
const P_CURVE = Symbol('curve');

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

    const privateKeyLength = curve.lPrivateKey();

    if (this[P_KEY].length > privateKeyLength) {
      throw new Error(`Invalid length for curve ${curve.name} - ` +
          `expected <= ${privateKeyLength}, got ${this[P_KEY].length}`
      );
    }
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
     * Gets the used curve.
     *
     * @returns {Curve}
     */
  get curve() {
    return this[P_CURVE];
  }
}

module.exports = PrivateKey;
