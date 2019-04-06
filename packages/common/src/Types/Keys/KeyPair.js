/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const P_PRIVATE_KEY = Symbol('private_key');
const P_PUBLIC_KEY = Symbol('public_key');
const P_CURVE = Symbol('curve');

/**
 * Represents a private and public keypair.
 */
class KeyPair {
  /**
     * Creates a new private-public keypair instance.
     *
     * @param {PrivateKey} privateKey
     * @param {PublicKey} publicKey
     */
  constructor(privateKey, publicKey) {
    this[P_CURVE] = privateKey.curve;
    this[P_PRIVATE_KEY] = privateKey;
    this[P_PUBLIC_KEY] = publicKey;

    if (privateKey.curve.id !== publicKey.curve.id) {
      throw new Error('Mixed up curves between private an public key');
    }
  }

  /**
     * Gets the private key.
     *
     * @returns {PrivateKey}
     */
  get privateKey() {
    return this[P_PRIVATE_KEY];
  }

  /**
     * Gets the public key.
     *
     * @returns {PublicKey}
     */
  get publicKey() {
    return this[P_PUBLIC_KEY];
  }

  /**
     * Gets the curve used for the keypair.
     *
     * @returns {Curve}
     */
  get curve() {
    return this[P_CURVE];
  }
}

module.exports = KeyPair;
