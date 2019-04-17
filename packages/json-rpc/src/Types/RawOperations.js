/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const Abstract = require('./Abstract');
const BC = require('@pascalcoin-sbx/common').BC;

const P_OPERATIONS = Symbol('operations');
const P_AMOUNT = Symbol('amount');
const P_FEE = Symbol('fee');
const P_RAWOPERATIONS = Symbol('rawoperations');

class RawOperations extends Abstract {
  constructor(data) {
    super(data);
    this[P_OPERATIONS] = parseInt(data.operations, 10);
    this[P_AMOUNT] = new Currency(data.amount);
    this[P_FEE] = new Currency(data.fee);
    this[P_RAWOPERATIONS] = BC.fromHex(data.rawoperations);
  }

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
