const AbstractType = require('./../AbstractType');
const Int16 = require('./Int16');
const StringWithoutLength = require('./StringWithoutLength');
const Endian = require('./../../Endian');
const BC = require('./../../BC');

const P_SIZE_ENCODED = Symbol('size_encoded');

const lengthField = new Int16('length', true, Endian.LITTLE_ENDIAN);
const bytesField = new StringWithoutLength('value');

/**
 * A field type to write dynamic strings (prepends the length).
 */
class StringWithLength extends AbstractType {

  constructor(id) {
    super(id || 'string_with_length');
    this.description('String with size prepended');
  }

  /**
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'StringWithLength';
    info.hierarchy.push(info.name);

    return info;
  }

  /**
   * Gets the size in bytes of the encoded value.
   *
   * @returns {number}
   */
  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }

  /**
   * Decodes the string value from the given bytes
   *
   * @param {BC} bc
   * @returns {BC}
   */
  decodeFromBytes(bc) {
    this[P_SIZE_ENCODED] = lengthField.decodeFromBytes(bc);
    return bytesField.decodeFromBytes(bc.slice(2, 2 + this[P_SIZE_ENCODED]));
  }

  /**
   * Encodes the given value.
   *
   * @param {BC} value
   * @returns {BC}
   */
  encodeToBytes(value) {
    this[P_SIZE_ENCODED] = value.length;
    let bc = lengthField.encodeToBytes(this[P_SIZE_ENCODED]);

    return bc.append(bytesField.encodeToBytes(value));
  }

  /**
   * Gets the description of the currents type instance.
   *
   * @param {*|null} value
   * @return {{id: String, type: {extra: {}, name: string}, encodedSize: Number}}
   */
  describe(value) {
    let description = super.describe(value);

    if (arguments.length > 0) {
      description.decoded = value;
      description.encoded = this.encodeToBytes(value);
      description.encodedSize = this.encodedSize;
    }

    return description;
  }
}

module.exports = StringWithLength;
