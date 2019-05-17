/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const AbstractType = require('./../AbstractType');
const P_ENDIAN = Symbol('endian');
const P_UNSIGNED = Symbol('unsigned');

/**
 * Abstract integer field type.
 */
class AbstractInt extends AbstractType {

  /**
   * Constructor
   *
   * @param {String} id
   * @param {Boolean} unsigned
   * @param {String} endian
   */
  constructor(id, unsigned, endian) {
    super(id);
    this[P_UNSIGNED] = unsigned;
    this[P_ENDIAN] = endian;
  }

  /**
   * Gets the endianness.
   *
   * @returns {String}
   */
  get endian() {
    return this[P_ENDIAN];
  }

  /**
   * Gets a value indicating whether the value is an unsigned integer.
   *
   * @returns {Boolean}
   */
  get unsigned() {
    return this[P_UNSIGNED];
  }
}

module.exports = AbstractInt;
