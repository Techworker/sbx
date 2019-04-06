/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('../../BC');
const Curve = require('./Curve');
const Sha = require('../../Sha');
const Base58 = require('../../Base58');

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
   * Gets the ec key.
   *
   * @returns {BC}
   */
  get ecdh() {
    return BC.concat(BC.fromInt(4), this.x, this.y);
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

  /**
   * Encodes a public key to a BC defined by PascalCoin.
   *
   * @returns {BC}
   */
  encode() {
    const curve = BC.fromInt(this.curve.id, 2).switchEndian();
    const xl = BC.fromInt(this.xl, 2).switchEndian();
    const yl = BC.fromInt(this.yl, 2).switchEndian();

    return BC.concat(curve, xl, this.x, yl, this.y);
  }

  /**
   * Decodes an encoded public key.
   *
   * @param {BC|Buffer|Uint8Array|String} encoded
   * @returns {PublicKey}
   */
  static decode(encoded) {
    encoded = BC.from(encoded);
    const curve = encoded.slice(0, 2).switchEndian().toInt();
    const xl = encoded.slice(2, 4).switchEndian().toInt();
    const x = encoded.slice(4, 4 + xl);
    const yl = encoded.slice(4 + xl, 6 + xl).switchEndian().toInt();
    const y = encoded.slice(6 + xl, 6 + xl + yl);

    return new PublicKey(x, y, new Curve(curve));
  }

  /**
   * Gets the base58 representation of a public key.
   *
   * @returns {String}
   */
  toBase58() {
    const prefix = BC.fromHex('01');
    const encoded = this.encode();
    const aux = Sha.sha256(encoded);
    const suffix = aux.slice(0, 4);

    const raw = BC.concat(prefix, encoded, suffix);

    return Base58.encode(raw);
  }

  /**
   * Gets a public key instance from the given base58 string.
   *
   * @param {String} base58
   * @returns {PublicKey}
   */
  static fromBase58(base58) {
    const decoded = Base58.decode(base58);

    return PublicKey.decode(decoded.slice(1, -4));
  }
}

module.exports = PublicKey;
