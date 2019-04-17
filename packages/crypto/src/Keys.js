/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const elliptic = require('elliptic/lib/elliptic/ec/index');

const AES = require('./AES');
const KDF = require('./KDF');
const Random = require('mipher/dist/random');
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const PrivateKey = require('@pascalcoin-sbx/common').Types.Keys.PrivateKey;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const KeyPair = require('@pascalcoin-sbx/common').Types.Keys.KeyPair;
const BC = require('@pascalcoin-sbx/common').BC;

/**
 * Handles cryptographic keys.
 */
class Keys {
  /**
   * Generates a new keypair from the given curve.
   *
   * @param {Curve} curve
   * @returns {KeyPair}
   */
  static generate(curve) {
    if (curve === undefined) {
      // eslint-disable-next-line no-param-reassign
      curve = Curve.getDefaultCurve();
    } else if (!(curve instanceof Curve)) {
      // eslint-disable-next-line no-param-reassign
      curve = new Curve(curve);
    }

    if (curve.supported === false) {
      throw new Error('Unsupported curve: ' + curve.name);
    }

    // TODO: entropy?
    // eslint-disable-next-line new-cap
    const kp = new elliptic(curve.name).genKeyPair();

    return new KeyPair(
      new PrivateKey(
        new BC(kp.getPrivate().toArray()),
        curve
      ),
      new PublicKey(
        new BC(kp.getPublic().getX().toArray()),
        new BC(kp.getPublic().getY().toArray()),
        curve)
    );
  }

  /**
   * Creates a new keypair from the given private key.
   *
   * @param {PrivateKey} privateKey
   * @returns {KeyPair}
   */
  static fromPrivateKey(privateKey) {

    if (privateKey.curve.supported === false) {
      throw new Error('Unsupported curve: ' + privateKey.curve.name);
    }

    const kp = elliptic(privateKey.curve.name).keyFromPrivate(privateKey.key.buffer);

    if (!privateKey.key.equals(new BC(kp.getPrivate().toArray()))) {
      throw new Error('Something went wrong, the imported private key does not equal the elliptic one');
    }

    return new KeyPair(
      privateKey,
      new PublicKey(
        new BC(kp.getPublic().getX().toArray()),
        new BC(kp.getPublic().getY().toArray()),
        privateKey.curve)
    );
  }

  /**
   * Creates a new keypair from the given private key.
   *
   * @param {Buffer|Uint8Array|BC|String} encryptedPrivateKey
   * @param {Buffer|Uint8Array|BC|String} password
   * @returns {KeyPair}
   */
  static decrypt(encryptedPrivateKey, password) {

    encryptedPrivateKey = BC.from(encryptedPrivateKey);
    password = BC.from(password, 'string');
    let salt = encryptedPrivateKey.slice(8, 16);
    let key = KDF.PascalCoin(password, salt);

    // decrypt
    const encData = encryptedPrivateKey.slice(16);

    const privateKeyDecryptedAndEncoded = AES.decrypt(key.key, encData, key.iv);

    return Keys.fromPrivateKey(
      PrivateKey.decode(privateKeyDecryptedAndEncoded)
    );
  }

  /**
   * Creates a new keypair from the given private key.
   *
   * @param {PrivateKey} privateKey
   * @param {Buffer|Uint8Array|BC|String} password
   * @returns {BC}
   */
  static encrypt(privateKey, password) {
    password = BC.from(password, 'string');
    const privateKeyEncoded = privateKey.encode();

    const randomGenerator = new Random.Random();
    const salt = new BC(Buffer.from(randomGenerator.get(8)));

    // mocha sees an open setinterval and won't exit without this change
    randomGenerator.stop();

    const keyInfo = KDF.PascalCoin(password, salt);

    const privateKeyEncrypted = AES.encryptPKCS7(keyInfo.key, privateKeyEncoded, keyInfo.iv);

    return BC.concat(BC.fromString('Salted__'), salt, privateKeyEncrypted);
  }

  /**
   *
   * @param keyPair
   * @param digest
   * @returns {{r: BC, s: BC}}
   */
  static sign(keyPair, digest) {
    // create an ecpair
    const ecPair = elliptic(keyPair.curve.name).keyFromPrivate(keyPair.privateKey.key.buffer);

    const signature = ecPair.sign(digest.buffer, ecPair.getPrivate('hex'), 'hex', {
      canonical: true
    });

    return {
      s: new BC(Buffer.from(signature.s.toArray())),
      r: new BC(Buffer.from(signature.r.toArray()))
    };
  }

}

module.exports = Keys;
