const AbstractInt = require('./AbstractInt');
const Endian = require('./../../Endian');
const BC = require('./../../BC');

/**
 * Fields type for an 8Bit int value.
 */
class Int8 extends AbstractInt {

  /**
   * Constructor.
   *
   * @param {String} id
   * @param {Boolean} unsigned
   */
  constructor(id, unsigned) {
    super(id || 'int8', unsigned, Endian.LITTLE_ENDIAN);
    this.description('1byte 8bit int value');
  }

  /**
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Int8';
    info.hierarchy.push(info.name);

    delete info.extra.endian;

    return info;
  }

  /**
   * Gets the size in bytes.
   *
   * @returns {number}
   */
  get encodedSize() {
    return 1;
  }

  /**
   * Reads the int8 value from the given bytes.
   *
   * @param {BC} bc
   * @returns {Number}
   */
  decodeFromBytes(bc) {
    return bc.readInt8(0, this.unsigned, this.endian);
  }

  /**
   * Appends the given int8 value.
   *
   * @param {Number} value
   * @returns {BC}
   */
  encodeToBytes(value) {
    return BC.fromInt8(value, this.unsigned, this.endian);
  }
}

module.exports = Int8;
