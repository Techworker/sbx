/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Util = require('@sbx/common').Util;

const P_VALUE = Symbol('value');

// the list of characters to escape.
const CHARS_TO_ESCAPE = '"():<>[\\]{}'.split('');
const REGEX_TO_ESCAPE = `(${CHARS_TO_ESCAPE.map(c => Util.escapeRegex(c)).join('|')})`;

/**
 * Small class that holds, validated and outputs an EPasa ascii string.
 */
class Ascii {
  /**
   * Constructor
   *
   * @param {String|Ascii} value
   */
  constructor(value) {
    if (value instanceof Ascii) {
      this[P_VALUE] = value.toString();
    } else {
      this[P_VALUE] = Ascii.validate(value);
    }
  }

  /**
   * Validates an ascii string.
   *
   * @param {String} value
   * @return {String}
   */
  static validate(value) {
    if (value.length === 0) {
      return value;
    }

    for (let pos = 0; pos < value.length; pos++) {
      if (value.charCodeAt(pos) < 32 || value.charCodeAt(pos) > 126) {
        throw new Error(`Invalid ascii - character ${value[pos]} not allowed at position ${pos}`);
      }
    }

    return value;
  }

  /**
   * Gets the string value itself.
   *
   * @returns {String}
   */
  toString() {
    return this[P_VALUE];
  }

  /**
   * Gets an escaped string representation for EPasa usage.
   *
   * @returns {*}
   */
  toStringEscaped() {
    return this[P_VALUE].replace(new RegExp(REGEX_TO_ESCAPE, 'gm'), '\\$1');
  }

  /**
   * Gets a value indicating whether the current char c1 is an escape modifier
   * and the second is in the list of chars to escape.
   *
   * @param {String} c1
   * @param {String} c2
   * @returns {boolean}
   */
  static isEscape(c1, c2) {
    return c1 === '\\' && CHARS_TO_ESCAPE.indexOf(c2) > -1;
  }
}

module.exports = Ascii;
