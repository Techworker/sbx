/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const Sha = require('@pascalcoin-sbx/common').Sha;
const BC = require('@pascalcoin-sbx/common').BC;
const AES = require('./AES');
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
   * @returns {BC}
   */
  static encrypt(publicKey, data) {
    data = BC.from(data);
    let ecCurve = elliptic(publicKey.curve.name);
    let tempKey = ecCurve.genKeyPair();
    let pubkey = ecCurve.keyFromPublic(publicKey.ecdh.buffer);
    let sharedSecret = tempKey.derive(pubkey.getPublic());
    let secrectkey = Sha.sha512(new BC(sharedSecret.toArray()));

    let encryptedData = AES.encryptZeroPadding(
      secrectkey.slice(0, 32),
      data,
      new Uint8Array(16)
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
   * @returns {BC}
   */
  static decrypt(privateKey, publicKey, data, origMsgLength) {
    publicKey = BC.from(publicKey);
    data = BC.from(data);
    let ecCurve = elliptic(privateKey.curve.name);
    let ecPrivateKey = ecCurve.keyFromPrivate(privateKey.key.buffer);
    let ecPublicKey = ecCurve.keyFromPublic(publicKey.buffer);
    let sharedSecret = ecPrivateKey.derive(ecPublicKey.getPublic());
    let secrectKey = Sha.sha512(new BC(Buffer.from(sharedSecret.toArray())));

    let decryptedData = AES.decryptZero(
      secrectKey.slice(0, 32),
      data,
      new Uint8Array(16)
    );

    let decryptedDataWithPaddingRemoved = decryptedData.slice(0, origMsgLength);

    return {
      data: decryptedDataWithPaddingRemoved,
      key: secrectKey.slice(32, 32)
    };
  }
}

module.exports = ECDH;
