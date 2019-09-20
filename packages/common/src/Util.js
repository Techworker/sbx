/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Util {

  /**
   * https://github.com/MauroJr/escape-regex/blob/master/index.js
   * Tests are not performed.
   *
   * @param {String} string
   * @returns {string}
   */
  /* istanbul ignore next: already tested in lib */
  static escapeRegex(string) {
    return ('' + string).replace(/([?!${}*:()|=^[\]\/\\.+])/g, '\\$1');
  }

  /**
   * Gets a value indicating whether the given value is a string.
   *
   * @param {*} s
   * @return {boolean}
   */
  static isString(s) {
    return Object.prototype.toString.call(s) === '[object String]';
  }

  /**
   * Gets a value indicating whether the given value is a Number.
   *
   * @param {*} n
   * @return {boolean}
   */
  static isNumber(n) {
    return Object.prototype.toString.call(n) === '[object Number]' && isNaN(n) === false;
  }
}

module.exports = Util;
