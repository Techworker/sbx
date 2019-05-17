/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return 4;
  }

  /**
   * Reads the given int32 value.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {Number|*}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return BC.from(bc).readInt32(0, this.unsigned, this.endian);
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
