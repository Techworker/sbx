/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const P_NAME = Symbol('name');
const P_PUBKEY = Symbol('public_key');
const P_ENC_PRIVATE_KEY = Symbol('encrypted_private_key');

/**
 * Represents a key entry.
 */
class Key {
  /**
   * Constructor.
   *
   * @param {String} name
   * @param {PublicKey} publicKey
   * @param {BC} encryptedPrivateKey
   */
  constructor(name, publicKey, encryptedPrivateKey) {
    this[P_NAME] = name;
    this[P_PUBKEY] = publicKey;
    this[P_ENC_PRIVATE_KEY] = encryptedPrivateKey;
  }

  /**
   * Gets the name of the key.
   *
   * @return {String}
   */
  get name() {
    return this[P_NAME];
  }

  /**
   * Gets the associated public key.
   *
   * @return {PublicKey}
   */
  get publicKey() {
    return this[P_PUBKEY];
  }

  /**
   * Gets the encrypted private key.
   *
   * @return {BC}
   */
  get encryptedPrivateKey() {
    return this[P_ENC_PRIVATE_KEY];
  }
}

module.exports = Key;
