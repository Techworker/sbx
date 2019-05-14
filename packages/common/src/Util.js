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
  /* istanbul ignore next */
  static escapeRegex(string) {
    return ('' + string).replace(/([?!${}*:()|=^[\]\/\\.+])/g, '\\$1');
  }
}

module.exports = Util;
