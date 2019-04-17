/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
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
  constructor(data) {
    super(data);

    this[P_DIGEST] = BC.fromHex(data.digest);
    if (data.enc_pubkey !== undefined) {
      this[P_PUBKEY] = PublicKey.decode(BC.fromHex(data.enc_pubkey));
    } else {
      this[P_PUBKEY] = PublicKey.fromBase58(data.b58_pubkey);
    }
    this[P_SIGNATURE] = BC.fromHex(data.signature);
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
