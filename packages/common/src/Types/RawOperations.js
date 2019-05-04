/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Currency = require('./Currency');
const BC = require('./BC');

const P_OPERATIONS = Symbol('operations');
const P_AMOUNT = Symbol('amount');
const P_FEE = Symbol('fee');
const P_RAWOPERATIONS = Symbol('rawoperations');

class RawOperations {

  /**
     * Gets the number of operations in this object.
     *
     * @returns {Number}
     */
  get operations() {
    return this[P_OPERATIONS];
  }

  /**
     * Gets the accumulated amount of all operations.
     *
     * @returns {Currency}
     */
  get amount() {
    return this[P_AMOUNT];
  }

  /**
     * Gets the accumulated amount of all operations.
     *
     * @returns {Currency}
     */
  get fee() {
    return this[P_FEE];
  }

  /**
     * Gets the raw operations info.
     *
     * @returns {BC}
     */
  get rawoperations() {
    return this[P_RAWOPERATIONS];
  }
}

module.exports = RawOperations;
