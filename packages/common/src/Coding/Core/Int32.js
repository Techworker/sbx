const AbstractInt = require('./AbstractInt');
const BC = require('./../../BC');

/**
 * Field type for 32bit int values.
 */
class Int32 extends AbstractInt {

  /**
   * Constructor
   *
   * @param {String} id
   * @param {Boolean} unsigned
   * @param {String} endian
   */
  constructor(id, unsigned, endian) {
    super(id || 'int32', unsigned, endian);
    this.description('4byte 32bit int value');
  }

  /**
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Int32';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Gets the size in bytes.
   *
   * @returns {number}
   */
  get encodedSize() {
    return 4;
  }

  /**
   * Reads the given int32 value.
   *
   * @param {BC} bc
   * @returns {Number}
   */
  decodeFromBytes(bc) {
    return bc.readInt32(0, this.unsigned, this.endian);
  }

  /**
   * Appends the given Int32 value.
   *
   * @param {Number} value
   * @returns {BC}
   */
  encodeToBytes(value) {
    return BC.fromInt32(value, this.unsigned, this.endian);
  }
}

module.exports = Int32;
