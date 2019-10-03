/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const PublicKeyCoder = require('./../Coding/Pascal/Keys/PublicKey');
const BC = require('./../BC');

const P_DIGEST = Symbol('digest');
const P_PUBLIC_KEY = Symbol('enc_pubkey.publicKey');
const P_SIGNATURE = Symbol('signature');

const ALL_PROPS = [
  P_DIGEST, P_PUBLIC_KEY, P_SIGNATURE
];

/**
 * Represents a sender in an operation.
 */
class SignedMessage extends Abstract {
  /**
     * Creates a new instance of the Sender class.
     *
     * @param {Object} data
     */
  static createFromObject(data) {
    let signedMessage = new this(data);
    let mappedData = signedMessage.mapInitializationDataWithProperties(ALL_PROPS);

    signedMessage[P_DIGEST] = BC.fromHex(mappedData[P_DIGEST]);
    if (mappedData[P_PUBLIC_KEY] !== undefined) {
      signedMessage[P_PUBLIC_KEY] = new PublicKeyCoder().decodeFromBytes(BC.fromHex(mappedData[P_PUBLIC_KEY]));
    } else {
      // TODO: edge case when mapping
      signedMessage[P_PUBLIC_KEY] = new PublicKeyCoder().decodeFromBase58(data.b58_pubkey);
    }
    signedMessage[P_SIGNATURE] = BC.fromHex(mappedData[P_SIGNATURE]);

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
    return this[P_PUBLIC_KEY];
  }

  /**
     * Gets the signature.
     *
     * @returns {BC}
     */
  get signature() {
    return this[P_SIGNATURE];
  }
}

module.exports = SignedMessage;
