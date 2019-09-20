/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * The list of available curves in pascalcoin.
 */
const CURVES = {
  0: 'empty',
  714: 'secp256k1',
  715: 'p384',
  729: 'sect283k1',
  716: 'p521'
};

const XYL_PUBKEYS = {
  714: {x: 32, y: 32},
  715: {x: 48, y: 48},
  716: {x: 66, y: 66},
  729: {x: 36, y: 36},
  0: {x: 0, y: 0}
};

const L_PRIVKEYS = {
  714: 32,
  715: 48,
  716: 66,
  729: 36
};

const P_ID = Symbol('id');
const P_NAME = Symbol('name');

/**
 * Simple elliptic curve representation of keys in pascalcoin.
 */
class Curve {

  /**
   * Gets the curve name of the secp256k1 curve.
   *
   * @returns {string}
   * @constructor
   */
  static get CN_SECP256K1() {
    return 'secp256k1';
  }

  /**
   * Gets the curve name of the p384 curve.
   *
   * @returns {string}
   * @constructor
   */
  static get CN_P384() {
    return 'p384';
  }

  /**
   * Gets the curve name of the sect283k1 curve.
   *
   * @returns {string}
   * @constructor
   */
  static get CN_SECT283K1() {
    return 'sect283k1';
  }

  /**
   * Gets the curve name of the p521 curve.
   *
   * @returns {string}
   * @constructor
   */
  static get CN_P521() {
    return 'p521';
  }

  /**
   * Gets the curve id of the secp256k1 curve.
   *
   * @returns {string}
   * @constructor
   */
  static get CI_SECP256K1() {
    return 714;
  }

  /**
   * Gets the curve id of the p384 curve.
   *
   * @returns {string}
   * @constructor
   */
  static get CI_P384() {
    return 715;
  }

  /**
   * Gets the curve id of the sect283k1 curve.
   *
   * @returns {string}
   * @constructor
   */
  static get CI_SECT283K1() {
    return 729;
  }

  /**
   * Gets the curve id of the p521 curve.
   *
   * @returns {Number}
   * @constructor
   */
  static get CI_P521() {
    return 716;
  }

  /**
   * Constructor
   *
   * @param {Number|String} curve
   */
  constructor(curve) {
    if (typeof curve === 'number') {
      if (CURVES[curve] === undefined) {
        throw new Error(`Unknown curve: ${curve}`);
      }

      this[P_ID] = curve;
      this[P_NAME] = CURVES[curve];
    } else if (curve instanceof Curve) {
      this[P_ID] = curve.id;
      this[P_NAME] = curve.name;
    } else {
      if (Object.values(CURVES).indexOf(curve.toString()) === -1) {
        throw new Error(`Unknown curve: ${curve}`);
      }

      this[P_NAME] = curve.toString();
      this[P_ID] = parseInt(Object.keys(CURVES)[Object.values(CURVES).indexOf(this[P_NAME])], 10);
    }
  }

  /**
     * Gets the id of the curve.
     *
     * @returns {Number}
     */
  get id() {
    return this[P_ID];
  }

  /**
     * Gets the name of the curve.
     *
     * @returns {String}
     */
  get name() {
    return this[P_NAME];
  }

  /**
     * Gets the name of the curve.
     *
     * @returns {String}
     */
  toString() {
    return this.name;
  }

  /**
     * Gets the default curve.
     *
     * @returns {Curve}
     */
  static getDefaultCurve() {
    return new Curve(Curve.CI_SECP256K1);
  }

  /**
   * Gets the length of either x and y for validation.
   *
   * @returns {array}
   */
  xylPublicKey(xOrY) {
    return XYL_PUBKEYS[this.id][xOrY];
  }

  /**
   * Gets the length of either x and y for validation.
   *
   * @returns {array}
   */
  lPrivateKey() {
    return L_PRIVKEYS[this.id];
  }

  /**
   * Gets a value indicating whether the key is supported for signing /
   * generation etc.
   *
   * @returns {boolean}
   */
  get supported() {
    return this.id !== Curve.CI_SECT283K1 && this.id !== 0;
  }
}

module.exports = Curve;
