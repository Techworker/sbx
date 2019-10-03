/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const BC = require('./../BC');
const Currency = require('./../Types/Currency');

const P_RAW_OPERATIONS = Symbol('rawoperations.rawOperations');
const P_COUNT_OPERATIONS = Symbol('operations.countOperations');
const P_AMOUNT = Symbol('amount_s.amount');
const P_FEE = Symbol('fee_s.fee');

const ALL_PROPS = [
  P_RAW_OPERATIONS, P_COUNT_OPERATIONS, P_AMOUNT, P_FEE
];

/**
 * Represents a signed operation.
 */
class SignedOperation extends Abstract {
  /**
   * Creates a new instance of the SignedOperation class.
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let signedOperation = new this(data);
    let mappedData = signedOperation.mapInitializationDataWithProperties(ALL_PROPS);

    signedOperation[P_RAW_OPERATIONS] = BC.fromHex(mappedData[P_RAW_OPERATIONS]);
    signedOperation[P_COUNT_OPERATIONS] = parseInt(mappedData[P_COUNT_OPERATIONS], 10);
    signedOperation[P_FEE] = new Currency(mappedData[P_FEE]);
    signedOperation[P_AMOUNT] = new Currency(mappedData[P_AMOUNT]);

    return signedOperation;
  }

  /**
   * Gets the signed raw operation(s)
   *
   * @return {BC}
   */
  get rawOperations() {
    return this[P_RAW_OPERATIONS];
  }

  /**
   * Gets the number of operations in rawoperations.
   *
   * @return {Number}
   */
  get countOperations() {
    return this[P_COUNT_OPERATIONS];
  }

  /**
   * Gets the accumulated amount.
   *
   * @return {Currency}
   */
  get amount() {
    return this[P_AMOUNT];
  }

  /**
   * Gets the accumulated fee.
   *
   * @return {Currency}
   */
  get fee() {
    return this[P_FEE];
  }
}

module.exports = SignedOperation;
