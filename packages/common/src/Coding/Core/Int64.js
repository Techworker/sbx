const AbstractInt = require('./AbstractInt');
const BC = require('./../../BC');
const BN = require('bn.js');

/**
 * Field type for 64bit int values using BN.js.
 */
class Int64 extends AbstractInt {

  /**
   * Constructor
   *
   * @param {String} id
   * @param {Boolean} unsigned
   * @param {String} endian
   */
  constructor(id, unsigned, endian) {
    super(id || 'int64', unsigned, endian);
    this.description('8byte 64bit int value');
  }

  /**
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Int64';
    info.hierarchy.push(info.name);

    return info;
  }

  /**
   * Gets the size in bytes.
   *
   * @returns {number}
   */
  get encodedSize() {
    return 8;
  }

  /**
   * Reads the pascal currency value from the given BC.
   *
   * @param {BC} bc
   * @returns {BN}
   */
  decodeFromBytes(bc) {
    return new BN(bc.buffer, 10, this.endian.toLowerCase());
  }

  /**
   * Appends the given currency value to the given BC.
   *
   * @param {BC} value
   */
  encodeToBytes(value) {
    return BC.from(value.toBuffer(this.endian.toLowerCase(), this.encodedSize));
  }

  /**
   * Gets the description of the currents type instance.
   *
   * @param {BN} value
   * @return {{id: String, type: {extra: {}, name: string}, encodedSize: Number}}
   */
  describe(value) {
    let description = super.describe(value);

    description.encodedSize = this.encodedSize;

    if (arguments.length > 0) {
      description.decoded = value;
      description.decodedSimple = value.toString(10, this.encodedSize);
      description.encoded = this.encodeToBytes(value).toHex();
    }

    return description;
  }
}

module.exports = Int64;
