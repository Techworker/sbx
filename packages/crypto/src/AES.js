/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const mipherAES = require('mipher/dist/aes');
const BC = require('@sbx/common').BC;

/**
 * AES encryption / decryption for PascalCoin.
 */
class AES {
  /**
   *
   * @param {BC|Buffer|Uint8Array|String} key
   * @param {BC|Buffer|Uint8Array|String} iv
   * @param {BC|Buffer|Uint8Array|String} data
   * @returns {BC}
   */
  static encrypt(key, data, iv) {
    let aes = new mipherAES.AES_CBC_PKCS7();

    return new BC(aes.encrypt(BC.from(key).buffer, BC.from(data).buffer, BC.from(iv).buffer));
  }

  /**
   *
   * @param {BC|Buffer|Uint8Array|String} key
   * @param {BC|Buffer|Uint8Array|String} iv
   * @param {BC|Buffer|Uint8Array|String} data
   * @returns {BC}
   */
  static decrypt(key, data, iv) {
    let aes = new mipherAES.AES_CBC_PKCS7();

    return new BC(aes.decrypt(BC.from(key).buffer, BC.from(data).buffer, BC.from(iv).buffer));
  }
}

module.exports = AES;
