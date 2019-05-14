/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const AbstractType = require('./../AbstractType');
const BC = require('./../../BC');

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
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'StringWithoutLength';
    info.hierarchy.push(info.name);

    return info;
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
    let encoded = BC.from(value, 'string');

    this[P_SIZE_ENCODED] = encoded.length;
    return encoded;
  }

  /**
   * @inheritDoc AbstractType#describe
   */
  /* istanbul ignore next */
  describe(value) {
    let description = {
      id: this.id,
      type: this.typeInfo
    };

    if (arguments.length > 0) {
      description.value = value;
      description.encoded = this.encodeToBytes(value).toHex();
      description.encodedSize = this.encodedSize;
    }

    return description;
  }
}

module.exports = StringWithoutLength;
