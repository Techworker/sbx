/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const AbstractType = require('./../AbstractType');
const BC = require('./../../BC');

const P_SIZE = Symbol('size');

/**
 * A field type to encode and decode bytes with a fixed length.
 */
class BytesFixedLength extends AbstractType {

  /**
   * Constructor
   *
   * @param {String} id
   * @param {Number} length
   */
  constructor(id, length) {
    super(id || 'bytes_fixed_length_' + length);
    this.description('Bytes with a fixed length of ' + length);
    this[P_SIZE] = length;
  }

  /**
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return this[P_SIZE];
  }

  /**
   * Returns the values of the given bc in the configured length.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {BC}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return BC.from(bc).slice(0, this[P_SIZE]);
  }

  /**
   * Encodes the given value to a collection of bytes.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @returns {BC}
   */
  encodeToBytes(value) {
    value = BC.from(value);
    return value.slice(0, this[P_SIZE]);
  }
}

module.exports = BytesFixedLength;
