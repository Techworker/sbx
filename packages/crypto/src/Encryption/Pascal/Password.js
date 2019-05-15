/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const Abstract = require('./../Abstract');
const BC = require('@pascalcoin-sbx/common').BC;
const mipherAES = require('mipher/dist/aes');
const mipherRandom = require('mipher/dist/random');
const KDF = require('./KDF');

/**
 * A class that can en-/decrypt values just the way payloads are encrypted
 * using a password in pascalcoin.
 */
class Password extends Abstract {

  /**
   * Encrypts the given value with the given password the PascalCoin way.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @param {Object} options
   * @return {BC}
   */
  static encrypt(value, options = {password: ''}) {
    value = BC.from(value);
    let aes = new mipherAES.AES_CBC_PKCS7();

    const randomGenerator = new mipherRandom.Random();
    const salt = new BC(Buffer.from(randomGenerator.get(8)));

    // mocha sees an open setinterval and won't exit without this change
    randomGenerator.stop();

    const keyInfo = KDF.PascalCoin(options.password, salt);

    return BC.concat(
      BC.fromString('Salted__'),
      salt,
      new BC(aes.encrypt(keyInfo.key.buffer, value.buffer, keyInfo.iv.buffer))
    );
  }

  /**
   * Decrypts the given encrypted value with the given password the
   * PascalCoin way.
   *
   * @param {Buffer|Uint8Array|BC|String} encrypted
   * @param {Object} options
   * @return {BC|false}
   */
  static decrypt(encrypted, options = {password: ''}) {
    encrypted = BC.from(encrypted);
    let aes = new mipherAES.AES_CBC_PKCS7();

    const salt = encrypted.slice(8, 16);
    const rest = encrypted.slice(16);

    const keyInfo = KDF.PascalCoin(options.password, salt);

    let result = aes.decrypt(keyInfo.key.buffer, rest.buffer, keyInfo.iv.buffer);

    if (result.length === 0) {
      throw new Error('Unable to decrypt value.');
    }
    return new BC(result);
  }
}

module.exports = Password;
