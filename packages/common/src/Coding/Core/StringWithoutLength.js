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
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'StringWithoutLength';
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
    return bc.toString();
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
   * Gets the description of the currents type instance.
   *
   * @param {*|null} value
   * @return {{id: String, type: {extra: {}, name: string}, encodedSize: Number}}
   */
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
