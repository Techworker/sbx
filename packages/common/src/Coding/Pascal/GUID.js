/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const GUIDType = require('./../../Types/GUID');
const BytesFixedLength = require('../Core/BytesFixedLength');

/**
 * A pascal related type that can de/encode an account name.
 */
class GUID extends BytesFixedLength {

  /**
   * Constructor
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'guid', 16);
    this.description('A GUID');
  }

  /**
   * Reads a value and returns a new PascalCoin AccountNumber instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {AccountNameType}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return new GUIDType(super.decodeFromBytes(bc));
  }

  /**
   *
   * Appends the given GUID.
   *
   * @param {GUIDType} value
   */
  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(new GUIDType(value).toBC());
  }
}

module.exports = GUID;
