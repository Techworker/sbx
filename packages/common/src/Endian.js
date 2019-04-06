/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Endian {

  /**
   * Gets the identifier for big endian.
   *
   * @returns {string}
   * @constructor
   */
  static get BIG_ENDIAN() {
    return 'BE';
  }

  /**
   * Gets the identifier for big endian.
   *
   * @returns {string}
   * @constructor
   */
  static get LITTLE_ENDIAN() {
    return 'LE';
  }

  /**
   * Detects the systems endianness.
   *
   * @returns {string}
   */
  static detect() {
    var b = new ArrayBuffer(4);
    var a = new Uint32Array(b);
    var c = new Uint8Array(b);

    a[0] = 0xdeadbeef;
    if (c[0] === 0xef) {
      return Endian.LITTLE_ENDIAN;
    }
    if (c[0] === 0xde) {
      return Endian.BIG_ENDIAN;
    }

    throw new Error('unknown endianness');
  }

  /**
   * Gets a value indicating whether the system uses little endian.
   *
   * @returns {boolean}
   */
  static isLittleEndian() {
    return Endian.detect() === Endian.LITTLE_ENDIAN;
  }

  /**
   * Gets a value indicating whether the system uses big endian.
   *
   * @returns {boolean}
   */
  static isBigEndian() {
    return Endian.detect() === Endian.BIG_ENDIAN;
  }
}

module.exports = Endian;
