/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const elliptic = require('elliptic/lib/elliptic/ec/index');

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

    // TODO: unable to test, cannot remember when this happened.
    /* istanbul ignore next: unable to test */
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
   *
   * @param keyPair
   * @param digest
   * @returns {{r: BC, s: BC}}
   */
  static sign(keyPair, digest) {
    // create an ecpair
    const ecPair = elliptic(keyPair.curve.name).keyFromPrivate(keyPair.privateKey.key.buffer);

    const signature = ecPair.sign(digest.buffer, ecPair.getPrivate('hex'), 'hex', {
      canonical: false
    });

    // Verify signature
    // TODO: yet not sure how to test
    /* istanbul ignore next: unable to test */
    if (ecPair.verify(digest.buffer, signature.toDER()) === false) {
      throw Error('Unable to verify the sign result.');
    }

    return {
      s: new BC(Buffer.from(signature.s.toArray())),
      r: new BC(Buffer.from(signature.r.toArray()))
    };
  }

}

module.exports = Keys;
