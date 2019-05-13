const AbstractType = require('./../AbstractType');
const BC = require('./../../BC');

const P_SIZE = Symbol('size');

/**
 * A field type to write bytes without prepending the length.
 */
class BytesFixedLength extends AbstractType {

  /**
   * Constructor
   *
   * @param {String} id
   */
  constructor(id, length) {
    super(id || 'bytes_fixed_length');
    this.description('Btes without length prepended.');
    this[P_SIZE] = length;
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'BytesFixedLength';
    info.hierarchy.push(info.name);

    return info;
  }

  /**
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return this[P_SIZE];
  }

  /**
   * In fact this does nothing other than updating the internal size.
   *
   * @param {BC} bc
   * @returns {BC}
   */
  decodeFromBytes(bc) {
    return bc.slice(0, this[P_SIZE]);
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

  /**
   * @inheritDoc AbstractType#describe
   */
  /* istanbul ignore next */
  describe(value) {
    let description = {
      id: this.id,
      type: this.typeInfo
    };

    description.encodedSize = this[P_SIZE];
    if (arguments.length > 0) {
      description.value = value;
      description.encoded = this.encodeToBytes(value);
    }

    return description;
  }
}

module.exports = BytesFixedLength;
