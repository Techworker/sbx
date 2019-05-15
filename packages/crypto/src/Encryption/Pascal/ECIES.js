/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const Abstract = require('./../Abstract');
const BC = require('@pascalcoin-sbx/common').BC;
const ECDH = require('./../ECDH');
const ECIESData = require('./ECIES/Data');
const ECIESCoding = require('./ECIES/Coding');
const CryptoJSEncHex = require('crypto-js/enc-hex');
const CryptoJSHmacMd5 = require('crypto-js/hmac-md5');

/**
 * A class that can en-/decrypt payloads based on a public key / private key.
 */
class ECIES extends Abstract {
  /**
   * Decrypts the given encrypted value using the given key pair.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @param {Object} options
   *
   * @return {BC|false}
   */
  static decrypt(value, options = {keyPair: null}) {

    let keyData = new ECIESCoding().decodeFromBytes(value);

    const dec = ECDH.decrypt(
      keyData.encryptedData, {
        privateKey: options.keyPair.privateKey,
        publicKey: keyData.publicKey,
        origMsgLength: keyData.originalDataLength
      }
    );

    const mac = BC.fromHex(CryptoJSHmacMd5(
      CryptoJSEncHex.parse(keyData.encryptedData.toHex()),
      CryptoJSEncHex.parse(dec.key.toHex())
    ).toString());

    // var mac5 = hmac3.update(keyData.encryptedData.toString(), 'utf8').digest('hex');

    if (keyData.mac.equals(mac)) {
      return dec.data;
    }

    throw new Error('Unable to decrypt value.');
  }

  /**
   * Encrypts the given value using the given public key.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @param {Object} options
   * @return {BC}
   */
  static encrypt(value, options = {publicKey: null}) {
    value = BC.from(value);
    const enc = ECDH.encrypt(value, options);

    // TODO: this causes a big polyfill
    const mac = BC.fromHex(CryptoJSHmacMd5(
      CryptoJSEncHex.parse(enc.data.toHex()),
      CryptoJSEncHex.parse(enc.key.toHex())
    ).toString());

    const originalDataLength = value.length;
    const originalDataLengthIncPadLength = (originalDataLength % 16) === 0 ?
      0 : 16 - (originalDataLength % 16);

    let keyData = new ECIESData();

    keyData.withPublicKey(enc.publicKey);
    keyData.withMac(mac);
    keyData.withEncryptedData(enc.data);
    keyData.withOriginalDataLength(originalDataLength);
    keyData.withOriginalDataLengthIncPadLength(originalDataLengthIncPadLength);

    return new ECIESCoding().encodeToBytes(keyData);
  }
}

module.exports = ECIES;
