/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Util = require('../Util');

const P_VALUE = Symbol('value');

// the list of characters to escape.
const CHARS_TO_ESCAPE = '(){}[]:"<>'.split('');
const REGEX_TO_ESCAPE = `(${CHARS_TO_ESCAPE.map(c => Util.escapeRegex(c)).join('|')})`;

const ALLOWED_ALL = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+{}[]_:"|<>,.?/~'.split('');
const ALLOWED_START = ALLOWED_ALL.slice(10);

/**
 * AccountName encoding for account names.
 */
class AccountName {
  /**
   * Constructor
   * @param {String|AccountName} value
   */
  constructor(value) {
    if (value instanceof AccountName) {
      this[P_VALUE] = value.toString();
    } else {
      this[P_VALUE] = AccountName.validate(value);
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

    if (value.length < 3) {
      throw new Error('Invalid account name, must be at least 3 characters long.');
    }

    for (let pos = 0; pos < value.length; pos++) {
      if (pos === 0 && ALLOWED_START.indexOf(value[pos]) === -1) {
        throw new Error(`Invalid AccountName encoding - character ${value[pos]} not allowed at position 0`);
      } else if (pos > 0 && ALLOWED_ALL.indexOf(value[pos]) === -1) {
        throw new Error(`Invalid AccountName encoding - character ${value[pos]} not allowed at position ${pos}`);
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

module.exports = AccountName;
