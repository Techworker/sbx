const AbstractInt = require('./AbstractInt');
const BC = require('./../../BC');

/**
 * Field type for a 16bit int value.
 */
class Int16 extends AbstractInt {

  /**
   * Constructor.
   *
   * @param {String} id
   * @param {Boolean} unsigned
   * @param {String} endian
   */
  constructor(id, unsigned, endian) {
    super(id || 'int16', unsigned, endian);
    this.description('2byte 16bit int value');
  }

  /**
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Int16';
    info.hierarchy.push(info.name);

    return info;
  }

  /**
   * Gets the encoded size in bytes.
   *
   * @returns {number}
   */
  get encodedSize() {
    return 2;
  }

  /**
   * Decodes the int16 value from the given bytes.
   *
   * @param {BC} bc
   * @returns {Number}
   */
  decodeFromBytes(bc) {
    return bc.readInt16(0, this.unsigned, this.endian);
  }

  /**
   * Encodes the given Int16 value to a byte sequence.
   *
   * @param {Number} value
   * @returns {BC}
   */
  encodeToBytes(value) {
    return BC.fromInt16(value, this.unsigned, this.endian);
  }
}

module.exports = Int16;
