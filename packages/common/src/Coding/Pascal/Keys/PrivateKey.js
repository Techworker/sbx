/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Curve = require('./Curve');
const BytesWithLength = require('../../Core/BytesWithLength');
const CompositeType = require('../../CompositeType');
const PrivateKeyType = require('./../../../../src/Types/Keys/PrivateKey');

/**
 * A coder for a private key.
 */
class PrivateKey extends CompositeType {
  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'private_key');
    this.addSubType(
      new Curve('curve')
    );
    this.addSubType(
      new BytesWithLength('key', 2)
        .description('The private key value.')
    );
  }

  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {PrivateKeyType}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);

    return new PrivateKeyType(decoded.key, decoded.curve);
  }

  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {PrivateKeyType} value
   * @returns {PrivateKeyType}
   */
  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(value);
  }
}

module.exports = PrivateKey;
