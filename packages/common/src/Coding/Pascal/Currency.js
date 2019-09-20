/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Int64 = require('./../Core/Int64');
const CurrencyType = require('./../../Types/Currency');
const Endian = require('./../../Endian');

/**
 * A special Int64 type that can handle pascalcoin currencies.
 */
class Currency extends Int64 {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null, unsigned = true, endian = Endian.LITTLE_ENDIAN) {
    super(id || 'currency', unsigned, endian);
    this.description('A type for currency values.');
  }

  /**
   * Reads the pascal currency value from the given BC.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {CurrencyType}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return CurrencyType.fromMolina(super.decodeFromBytes(bc));
  }

  /**
   * Appends the given currency value to the given BC.
   *
   * @param {CurrencyType} value
   * @return {BC}
   */
  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(new CurrencyType(value).bn);
  }
}

module.exports = Currency;
