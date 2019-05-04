const Endian = require('./../../Endian');
const AbstractType = require('./../AbstractType');
const Int8 = require('./../Core/Int8');
const Int16 = require('./../Core/Int16');
const Int32 = require('./../Core/Int32');

const P_INT_TYPE = Symbol('int_type');

/**
 * A special Int32 type that can handle account number.
 */
class OpType extends AbstractType {

  /**
   * Constructor
   *
   * @param {Number} byteSize
   */
  constructor(byteSize) {
    super(`optype_int${byteSize * 8}`);
    switch (byteSize) {
      case 1:
        this[P_INT_TYPE] = new Int8('OpType[Int8]', true);
        break;
      case 2:
        this[P_INT_TYPE] = new Int16('OpType[Int16]', true, Endian.LITTLE_ENDIAN);
        break;
      case 4:
        this[P_INT_TYPE] = new Int32('OpType[Int32]', true, Endian.LITTLE_ENDIAN);
        break;
      default:
        throw Error('Invalid byte size.');
    }
    this.description(`Operation type in ${byteSize * 8} bits`);
  }

  /**
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
  get typeInfo() {
    let info = this[P_INT_TYPE].typeInfo;

    info.name = 'OpType';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Gets the size in bytes.
   *
   * @returns {number}
   */
  get encodedSize() {
    return this[P_INT_TYPE].encodedSize;
  }

  /**
   * Decodes and returns the optype.
   *
   * @param {BC} bc
   * @return {Number}
   */
  decodeFromBytes(bc) {
    return this[P_INT_TYPE].decodeFromBytes(bc);
  }

  /**
   * Encodes the given optype to bytes.
   *
   * @param {Number} value
   * @return {*}
   */
  encodeToBytes(value) {
    return this[P_INT_TYPE].encodeToBytes(value);
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

module.exports = OpType;
