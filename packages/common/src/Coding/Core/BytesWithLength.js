const AbstractType = require('./../AbstractType');
const Int16 = require('./Int16');
const BytesWithoutLength = require('./BytesWithoutLength');
const Endian = require('./../../Endian');
const BC = require('./../../BC');

const P_SIZE_ENCODED = Symbol('size_encoded');

const lengthField = new Int16('length', true, Endian.LITTLE_ENDIAN);
const bytesField = new BytesWithoutLength('value');

/**
 * A field type to write dynamic strings (prepends the length).
 */
class BytesWithLength extends AbstractType {

  constructor(id) {
    super(id || 'hexastring_with_length');
    this.description('Bytes with variable size prepended');
  }

  /**
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'BytesWithLength';
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
    this[P_SIZE_ENCODED] = lengthField.decodeFromBytes(bc) + lengthField.encodedSize;
    return bytesField.decodeFromBytes(bc.slice(lengthField.encodedSize, this[P_SIZE_ENCODED]));
  }

  /**
   * Encodes the given value.
   *
   * @param {BC} value
   * @returns {BC}
   */
  encodeToBytes(value) {
    this[P_SIZE_ENCODED] = value.length + lengthField.encodedSize;
    let bc = lengthField.encodeToBytes(this[P_SIZE_ENCODED] - lengthField.encodedSize);

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
      description.decodedSimple = value.toHex();
      description.encoded = this.encodeToBytes(value).toHex();
      description.encodedSize = this.encodedSize;
    }

    return description;
  }
}

module.exports = BytesWithLength;
