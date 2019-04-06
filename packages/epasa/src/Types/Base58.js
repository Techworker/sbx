/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const P_VALUE = Symbol('value');

const ALLOWED = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('');

/**
 * Small class to initialize and validate a base58 value.
 */
class Base58 {
  /**
   * Constructor
   * @param {String|AccountName} value
   */
  constructor(value) {
    if (value instanceof Base58) {
      this[P_VALUE] = value.toString();
    } else {
      this[P_VALUE] = Base58.validate(value);
    }
  }

  /**
   * Validates a string.
   *
   * @param {String} value
   * @return {String}
   */
  static validate(value) {
    if (value.length === 0) {
      return value;
    }

    for (let pos = 0; pos < value.length; pos++) {
      if (ALLOWED.indexOf(value[pos]) === -1) {
        throw new Error(`Invalid base58 - character ${value[pos]} not allowed at position ${pos}`);
      }
    }

    return value;
  }

  /**
   * Gets the string value.
   *
   * @returns {String}
   */
  toString() {
    return this[P_VALUE];
  }
}

module.exports = Base58;
