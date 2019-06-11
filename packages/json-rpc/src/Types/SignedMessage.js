/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;
const BC = require('@pascalcoin-sbx/common').BC;

const P_DIGEST = Symbol('digest');
const P_PUBKEY = Symbol('public_key');
const P_SIGNATURE = Symbol('signature');

/**
 * Represents a sender in an operation.
 */
class SignedMessage extends Abstract {
  /**
     * Creates a new instance of the Sender class.
     *
     * @param {Object} data
     */
  static createFromRPC(data) {
    let signedMessage = new SignedMessage(data);

    signedMessage[P_DIGEST] = BC.fromHex(data.digest);
    if (data.enc_pubkey !== undefined) {
      signedMessage[P_PUBKEY] = new PublicKeyCoder().decodeFromBytes(BC.fromHex(data.enc_pubkey));
    } else {
      signedMessage[P_PUBKEY] = new PublicKeyCoder().decodeFromBase58(data.b58_pubkey);
    }
    signedMessage[P_SIGNATURE] = BC.fromHex(data.signature);

    return signedMessage;
  }

  /**
     * Gets the digest.
     *
     * @returns {BC}
     */
  get digest() {
    return this[P_DIGEST];
  }

  /**
     * Gets the public key.
     *
     * @returns {PublicKey}
     */
  get publicKey() {
    return this[P_PUBKEY];
  }

  /**
     * Gets the signature.
     *
     * @returns {BC}
     */
  get amount() {
    return this[P_SIGNATURE];
  }
}

module.exports = SignedMessage;
