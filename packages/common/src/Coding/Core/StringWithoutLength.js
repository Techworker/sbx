/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const AbstractType = require('./../AbstractType');
const BC = require('./../../BC');
const Util = require('./../../Util');

const P_SIZE_ENCODED = Symbol('size_encoded');

/**
 * A field type to write dynamic strings without prepending the length.
 */
class StringWithoutLength extends AbstractType {

  /**
   * Constructor
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'string_without_length');
    this.description('Single string value without length prepended.');
  }

  /**
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }

  /**
   * Decodes the string value from the given bytes
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {String}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return BC.from(bc).toString();
  }

  /**
   * Encodes the given value.
   *
   * @param {String} value
   * @returns {BC}
   */
  encodeToBytes(value) {
    value = this.determineValue(value);
    if (!Util.isString(value)) {
      this.throwEncodeValueTypeError(value, 'String');
    }

    let encoded = BC.from(value, 'string');

    this[P_SIZE_ENCODED] = encoded.length;
    return encoded;
  }
}

module.exports = StringWithoutLength;
