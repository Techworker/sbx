/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const PublicKey = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;
const BytesWithLength = require('@pascalcoin-sbx/common').Coding.Core.BytesWithLength;
const PascalPublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;

const publicKeyCoding = new PublicKey();

/**
 * A special Int32 type that can handle account number.
 */
class PublicKeyWithLength extends BytesWithLength {

  constructor(id = null) {
    super(id || 'pubkey', 2);
  }

  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {PascalPublicKey}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const pubKey = super.decodeFromBytes(bc);
    const parsed = publicKeyCoding.decodeFromBytes(pubKey);

    return new PascalPublicKey(parsed.x, parsed.y, parsed.curve);
  }

  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {*} value
   * @returns {PascalPublicKey}
   */
  encodeToBytes(value) {
    return super.encodeToBytes(publicKeyCoding.encodeToBytes(value));
  }
}

module.exports = PublicKeyWithLength;
