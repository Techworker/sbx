/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const CurveType = require('./../../../Types/Keys/Curve');
const Endian = require('./../../../Endian');
const Int16 = require('./../../Core/Int16');

/**
 * A special pascal type that can en/decode a curve id.
 */
class Curve extends Int16 {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'curve', true, Endian.LITTLE_ENDIAN);
    this.description('Key curve id');
  }

  /**
   * Reads the pascal currency value from the given BC.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {CurveType}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return new CurveType(super.decodeFromBytes(bc));
  }

  /**
   * Appends the given currency value to the given BC.
   *
   * @param {CurveType} value
   * @return {BC}
   */
  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(new CurveType(value).id);
  }
}

module.exports = Curve;
