const AbstractType = require('./../AbstractType');
const P_ENDIAN = Symbol('endian');
const P_UNSIGNED = Symbol('unsigned');

/**
 * Abstract integer field type.
 */
class AbstractInt extends AbstractType {

  /**
   * Constructor
   *
   * @param {String} id
   * @param {Boolean} unsigned
   * @param {String} endian
   */
  constructor(id, unsigned, endian) {
    super(id);
    this[P_UNSIGNED] = unsigned;
    this[P_ENDIAN] = endian;
  }

  /**
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'AbstractInt';
    info.extra = {
      unsigned: this.unsigned,
      endian: this.endian
    };

    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Gets the endianness.
   *
   * @returns {String}
   */
  get endian() {
    return this[P_ENDIAN];
  }

  /**
   * Gets a value indicating whether the value is an unsigned integer.
   *
   * @returns {Boolean}
   */
  get unsigned() {
    return this[P_UNSIGNED];
  }

  /**
   * Gets the description of the currents type instance.
   *
   * @param {*|null} value
   * @return {{id: String, type: {extra: {}, name: string}, encodedSize: Number}}
   */
  describe(value) {
    let description = super.describe(value);

    description.encodedSize = this.encodedSize;

    if (arguments.length > 0) {
      description.decoded = value;
      description.encoded = this.encodeToBytes(value).toHex();
    }

    return description;
  }
}

module.exports = AbstractInt;
