/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('./../../BC');
const AbstractType = require('./../AbstractType');
const Int8 = require('./Int8');
const Int16 = require('./Int16');
const Int32 = require('./Int32');

const StringWithoutLength = require('./StringWithoutLength');
const Endian = require('./../../Endian');

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_HAS_LEADING_ZB = Symbol('has_leading_zerobyte');
const P_LENGTH_FIELD = Symbol('length_field');
const P_STRING_FIELD = Symbol('bytes_field');

/**
 * A field type to write dynamic strings (prepends the length).
 */
class StringWithLength extends AbstractType {

  constructor(id, byteSize = 1, lengthId = 'length', lengthDesc = null, endian = Endian.LITTLE_ENDIAN, hasLeadingZeroByte = false) {
    super(id || `bytes_size${byteSize * 8}`);
    this.description('String with size prepended');
    this[P_STRING_FIELD] = new StringWithoutLength('value');
    this[P_HAS_LEADING_ZB] = hasLeadingZeroByte;
    switch (byteSize) {
      case 1:
        this[P_LENGTH_FIELD] = new Int8(lengthId, true);
        break;
      case 2:
        this[P_LENGTH_FIELD] = new Int16(lengthId, true, endian);
        break;
      case 4:
        this[P_LENGTH_FIELD] = new Int32(lengthId, true, endian);
        break;
      default:
        throw new Error('ByteSize must be either 1, 2 or 4');
    }

    if (lengthDesc !== null) {
      this[P_LENGTH_FIELD].description(lengthDesc);
    }
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
    this[P_SIZE_ENCODED] = this[P_LENGTH_FIELD].encodedSize + this[P_LENGTH_FIELD].decodeFromBytes(BC.from(bc)) + (+this[P_HAS_LEADING_ZB]);
    return this[P_STRING_FIELD].decodeFromBytes(
      bc.slice(
        this[P_LENGTH_FIELD].encodedSize + (+this[P_HAS_LEADING_ZB]),
        this[P_SIZE_ENCODED]
      )
    );
  }

  /**
   * Encodes the given value.
   *
   * @param {String} value
   * @returns {BC}
   */
  encodeToBytes(value) {
    this[P_SIZE_ENCODED] = value.length;
    let bc = this[P_LENGTH_FIELD].encodeToBytes(this[P_SIZE_ENCODED]);

    if (this[P_HAS_LEADING_ZB]) {
      bc = bc.append('00');
    }

    return bc.append(this[P_STRING_FIELD].encodeToBytes(value));
  }
}

module.exports = StringWithLength;
