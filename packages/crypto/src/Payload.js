/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const BC = require('@sbx/common').BC;
const mipherAES = require('mipher/dist/aes');
const mipherRandom = require('mipher/dist/random');
const KDF = require('./KDF');
const ECDH = require('./ECDH');

/**
 * A class that can en-/decrypt payloads.
 */
class Payload {

  /**
   * Encrypts the given payload with the given password the PascalCoin way.
   *
   * @param {Buffer|Uint8Array|BC|String} payload
   * @param {Buffer|Uint8Array|BC|String} password
   *
   * @return {BC}
   */
  static encryptUsingPassword(payload, password) {
    payload = BC.from(payload, 'string');
    password = BC.from(password, 'string');
    let aes = new mipherAES.AES_CBC_PKCS7();

    const randomGenerator = new mipherRandom.Random();
    const salt = new BC(Buffer.from(randomGenerator.get(8)));

    // mocha sees an open setinterval and won't exit without this change
    randomGenerator.stop();

    const keyInfo = KDF.PascalCoin(password, salt);

    return BC.concat(
      BC.fromString('Salted__'),
      salt,
      new BC(aes.encrypt(keyInfo.key.buffer, payload.buffer, keyInfo.iv.buffer))
    );
  }

  /**
   * Decrypts the given encrypted payload with the given password the
   * PascalCoin way.
   *
   * @param {Buffer|Uint8Array|BC|String} encrypted
   * @param {Buffer|Uint8Array|BC|String} password
   *
   * @return {BC}
   */
  static decryptUsingPassword(encrypted, password) {
    encrypted = BC.from(encrypted);
    password = BC.from(password, 'string');
    let aes = new mipherAES.AES_CBC_PKCS7();

    const salt = encrypted.slice(8, 16);
    const rest = encrypted.slice(16);

    const keyInfo = KDF.PascalCoin(password, salt);

    let result = aes.decrypt(keyInfo.key.buffer, rest.buffer, keyInfo.iv.buffer);

    if (result.length === 0) {
      return false;
    }
    return new BC(result);
  }

  /**
   * Decrypts the given encrypted payload using the given key.
   *
   * @param {Buffer|Uint8Array|BC|String} payload
   * @param {KeyPair} keyPair
   */
  static decryptUsingPrivateKey(payload, keyPair) {

    payload = BC.from(payload);
    // extract data
    const publicKeyLength = payload.slice(0, 1).toInt();
    const macLength = payload.slice(1, 2).toInt();
    // const orgMsgLength = payload.slice(2, 4).switchEndian().toInt();
    const messageLength = payload.slice(4, 6).switchEndian().toInt();

    let start = 6;
    let end = start + publicKeyLength;
    const ecdhPubKey = payload.slice(start, end);

    start = end + macLength;
    end = start + messageLength + 1;

    // const ecdhMessage = payload.slice(6 + publicKeyLength + macLength,
    // 6 + publicKeyLength + macLength + messageLength + 1).buffer;
    const ecdhMessage = payload.slice(start, end);

    return ECDH.decrypt(
      keyPair.privateKey,
      ecdhPubKey,
      ecdhMessage,
    );
  }

  /**
   * encrypts the goven payload using the given public key.
   *
   * @param {Buffer|Uint8Array|BC|String} payload
   * @param {PublicKey} publicKey
   */
  static encryptUsingPublicKey(payload, publicKey) {

    payload = BC.from(payload, 'string');
    const enc = ECDH.encrypt(
      publicKey,
      payload
    );

    const hmac = require('crypto').createHmac('md5', enc.key.buffer);
    const m2 = BC.fromHex(hmac.digest('hex'));

    return BC.concat(
      BC.fromInt(enc.publicKey.length), // key
      BC.fromInt(m2.length), // mac
      BC.fromInt(8, 2).switchEndian(), // org
      BC.fromInt(enc.data.length, 2).switchEndian(), // dtaa
      enc.publicKey, // key itself
      m2,
      enc.data
    );
  }
}

module.exports = Payload;
