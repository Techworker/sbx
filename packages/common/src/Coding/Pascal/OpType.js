/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
  constructor(id, byteSize) {
    super(id || `optype_int${byteSize * 8}`);
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
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return this[P_INT_TYPE].encodedSize;
  }

  /**
   * Decodes and returns the optype.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {Number}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return this[P_INT_TYPE].decodeFromBytes(bc);
  }

  /**
   * Encodes the given optype to bytes.
   *
   * @param {Number} value
   * @return {*}
   */
  encodeToBytes(value) {
    value = this.determineValue(value);
    return this[P_INT_TYPE].encodeToBytes(value);
  }

  get intType() {
    return this[P_INT_TYPE];
  }
}

module.exports = OpType;
