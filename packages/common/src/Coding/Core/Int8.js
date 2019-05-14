/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Int8';
    info.hierarchy.push(info.name);

    delete info.extra.endian;

    return info;
  }

  /**
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return 1;
  }

  /**
   * Reads the int8 value from the given bytes.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {Number|*}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return BC.from(bc).readInt8(0, this.unsigned);
  }

  /**
   * Encodes the given int8 value.
   *
   * @param {Number} value
   * @returns {BC}
   */
  encodeToBytes(value) {
    return BC.fromInt8(value, this.unsigned);
  }
}

module.exports = Int8;
