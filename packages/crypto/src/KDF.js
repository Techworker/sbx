/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const Sha = require('@sbx/common').Sha;
const BC = require('@sbx/common').BC;

/**
 * Key derivation function(s).
 */
class KDF {

  /**
   * Gets the key and iv for pascalcoin.
   *
   * @param {BC|Buffer|Uint8Array|String} password
   * @param {Buffer|Uint8Array|BC|String} salt
   * @returns {{iv: BC, key: BC}}
   * @constructor
   */
  static PascalCoin(password, salt = null) {
    password = BC.from(password, 'string');
    if (salt === null) {
      salt = new BC([]);
    } else {
      salt = BC.from(salt);
    }

    // Key = sha256 (password + salt);
    let key = Sha.sha256(password, salt);
    // iv = sha256 (KEY + password + salt);
    let iv = Sha.sha256(key, password, salt);

    return { key, iv };
  }
}

module.exports = KDF;
