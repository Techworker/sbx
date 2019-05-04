/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

let detected = null;

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
    if (detected === null) {
      const b = new ArrayBuffer(4);
      const a = new Uint32Array(b);
      const c = new Uint8Array(b);

      a[0] = 0xdeadbeef;
      if (c[0] === 0xef) {
        detected = Endian.LITTLE_ENDIAN;
      }
      if (c[0] === 0xde) {
        detected = Endian.BIG_ENDIAN;
      }
    }

    return detected;
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
