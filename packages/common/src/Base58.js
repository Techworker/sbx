/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const bs58 = require('bs58');
const BC = require('./BC');

/**
 * Contains methods to convert stuff to various formats.
 */
class Base58 {
  /**
     * Gets the base58 representation of the given buffer.
     *
     * @param {BC|Buffer|Uint8Array|String} data
     * @returns {String}
     */
  static encode(data) {
    return bs58.encode(BC.from(data).buffer);
  }

  /**
   * Decodes a Base58 encoded string.
   *
   * @param {String} str
   * @returns {BC}
   */
  static decode(str) {
    return new BC(bs58.decode(str));
  }
}

module.exports = Base58;
