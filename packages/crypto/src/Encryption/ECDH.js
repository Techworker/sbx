/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const Sha = require('@pascalcoin-sbx/common').Sha;
const BC = require('@pascalcoin-sbx/common').BC;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const CBCZeroPadding = require('./AES/CBCZeroPadding');
const elliptic = require('elliptic/lib/elliptic/ec/index');

/**
 * AES encryption / decryption for PascalCoin.
 */
class ECDH {
  /**
   * Encrypts the given data with the given public key.
   *
   * @param {BC|Buffer|Uint8Array|String} data
   * @param {PublicKey} publicKey
   * @returns {Object}
   */
  static encrypt(value, options = {publicKey: PublicKey.empty()}) {
    value = BC.from(value);
    let ecCurve = elliptic(options.publicKey.curve.name);
    let tempKey = ecCurve.genKeyPair();
    let pubkey = ecCurve.keyFromPublic(options.publicKey.ecdh.buffer);
    let sharedSecret = tempKey.derive(pubkey.getPublic());
    let secrectkey = Sha.sha512(new BC(sharedSecret.toArray()));

    let encryptedData = CBCZeroPadding.encrypt(
      value, {key: secrectkey.slice(0, 32), iv: new Uint8Array(16)}
    );

    return {
      data: encryptedData,
      key: secrectkey.slice(32, 64),
      publicKey: new BC(tempKey.getPublic(true, 'buffer'))
    };
  }

  /**
   * Decrypts the given data.
   *
   * @param {PrivateKey} privateKey
   * @param {BC|Buffer|Uint8Array|String} publicKey
   * @param {BC|Buffer|Uint8Array|String} data
   * @returns {Object}
   */
  static decrypt(value, options = {privateKey: null, publicKey: PublicKey.empty(), origMsgLength: 0}) {
    options.publicKey = BC.from(options.publicKey);
    value = BC.from(value);
    let ecCurve = elliptic(options.privateKey.curve.name);
    let ecPrivateKey = ecCurve.keyFromPrivate(options.privateKey.key.buffer);
    let ecPublicKey = ecCurve.keyFromPublic(options.publicKey.buffer);
    let sharedSecret = ecPrivateKey.derive(ecPublicKey.getPublic());
    let secrectKey = Sha.sha512(new BC(Buffer.from(sharedSecret.toArray())));

    let decryptedData = CBCZeroPadding.decrypt(
      value, {key: secrectKey.slice(0, 32), iv: new Uint8Array(16)}
    );

    let decryptedDataWithPaddingRemoved = decryptedData.slice(0, options.origMsgLength);

    return {
      data: decryptedDataWithPaddingRemoved,
      key: secrectKey.slice(32, 64)
    };
  }
}

module.exports = ECDH;
