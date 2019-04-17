/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const mAES = require('mipher/dist/aes');
const AES_CBC_ZeroPadding = require('./mipher/AES_CBC_ZeroPadding');
const BC = require('@pascalcoin-sbx/common').BC;

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
  static encryptPKCS7(key, data, iv) {
    let aes = new mAES.AES_CBC_PKCS7();

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
    let aes = new mAES.AES_CBC_PKCS7();

    return new BC(aes.decrypt(BC.from(key).buffer, BC.from(data).buffer, BC.from(iv).buffer));
  }

  /**
   *
   * @param {BC|Buffer|Uint8Array|String} key
   * @param {BC|Buffer|Uint8Array|String} iv
   * @param {BC|Buffer|Uint8Array|String} data
   * @returns {BC}
   */
  static encryptZeroPadding(key, data, iv) {
    let aes = new AES_CBC_ZeroPadding();

    return new BC(aes.encrypt(BC.from(key).buffer, BC.from(data).buffer, BC.from(iv).buffer));
  }

  /**
   *
   * @param {BC|Buffer|Uint8Array|String} key
   * @param {BC|Buffer|Uint8Array|String} iv
   * @param {BC|Buffer|Uint8Array|String} data
   * @returns {BC}
   */
  static decryptZeroPadding(key, data, iv) {
    let aes = new AES_CBC_ZeroPadding();

    return new BC(aes.decrypt(BC.from(key).buffer, BC.from(data).buffer, BC.from(iv).buffer));
  }
}

module.exports = AES;
