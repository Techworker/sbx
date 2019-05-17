/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return 2;
  }

  /**
   * Decodes the int16 value from the given bytes.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {Number|*}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return BC.from(bc).readInt16(0, this.unsigned, this.endian);
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
