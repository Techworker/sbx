/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const BC = require('@pascalcoin-sbx/common').BC;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;

const P_RAWOPERATIONS = Symbol('rawoperations');
const P_OPERATIONS = Symbol('operations');
const P_AMOUNT = Symbol('amount');
const P_FEE = Symbol('fee');

/**
 * Represents a signed operation.
 */
class SignedOperation extends Abstract {
  /**
   * Creates a new instance of the SignedOperation class.
   *
   * @param {Object} data
   */
  static createFromRPC(data) {
    let signedOperation = new SignedOperation(data);

    signedOperation[P_RAWOPERATIONS] = BC.fromHex(data.rawoperations);
    signedOperation[P_OPERATIONS] = parseInt(data.operations, 10);
    signedOperation[P_FEE] = new Currency(data.fee_s);
    signedOperation[P_AMOUNT] = new Currency(data.amount_s);

    return signedOperation;
  }

  /**
   * Gets the signed raw operation(s)
   *
   * @return {BC}
   */
  get rawOperations() {
    return this[P_RAWOPERATIONS];
  }

  /**
   * Gets the number of operations in rawoperations.
   *
   * @return {Number}
   */
  get operations() {
    return this[P_OPERATIONS];
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
