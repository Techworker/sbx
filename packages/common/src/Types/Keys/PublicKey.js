/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('../../BC');
const Curve = require('./Curve');

const P_X = Symbol('x');
const P_XL = Symbol('xl');
const P_Y = Symbol('y');
const P_YL = Symbol('yl');
const P_CURVE = Symbol('curve');

/**
 * Represents a public key in pascalcoin.
 */
class PublicKey {
  /**
     * Constructor
     *
     * @param {BC|Buffer|Uint8Array|String} x
     * @param {BC|Buffer|Uint8Array|String} y
     * @param {Curve} curve
     */
  constructor(x, y, curve) {
    x = BC.from(x);
    y = BC.from(y);

    this[P_X] = x;
    this[P_Y] = y;
    this[P_XL] = x.length;
    this[P_YL] = y.length;
    this[P_CURVE] = curve;

    if (this[P_XL] > curve.xylPublicKey('x') || this[P_YL] > curve.xylPublicKey('y')) {
      throw new Error(`Invalid x and/or y length for curve ${curve.name} - ` +
          `expected <= X${curve.xylPublicKey('x')}:Y${curve.xylPublicKey('y')}, ` +
          `got X${this[P_XL]}:Y${this[P_YL]}`
      );
    }
  }

  /**
     * Gets the X value of the key.
     *
     * @returns {BC}
     */
  get x() {
    return this[P_X];
  }

  /**
     * Gets the y value of the key.
     *
     * @returns {BC}
     */
  get y() {
    return this[P_Y];
  }

  /**
     * Gets the length of X.
     *
     * @returns {Number}
     */
  get yl() {
    return this[P_YL];
  }

  /**
     * Gets the length of Y.
     *
     * @returns {Number}
     */
  get xl() {
    return this[P_XL];
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
   * Gets the ec key.
   *
   * @returns {BC}
   */
  get ec() {
    return BC.concat(this.x, this.y);
  }

  /**
   * Gets the ecdh public key.
   *
   * @returns {BC}
   */
  get ecdh() {
    if (this.curve.id === Curve.CI_P521) {
      return BC.concat(BC.fromHex('0400'), this.x, BC.fromHex('00'), this.y);
    }

    return BC.concat(BC.fromHex('04'), this.x, this.y);
  }

  /**
     * Gets an empty public key instance.
     *
     * @returns {PublicKey}
     */
  static empty() {
    return new PublicKey(
      BC.fromString(''),
      BC.fromString(''),
      new Curve(0),
    );
  }
}

module.exports = PublicKey;
