/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('@pascalcoin-sbx/common').BC;
const Signer = require('./Signer');
const OperationListCoder = require('./RawOperationsCoder');

const P_OPERATIONS = Symbol('operations');
const P_CODER = Symbol('coder');
const P_SIGNER = Symbol('signer');

/**
 * This class combines multiple signed operations to a string that
 * can be executed by the node.
 */
class RawOperations {
  /**
   * Constructor
   */
  constructor() {
    this[P_OPERATIONS] = [];
    this[P_CODER] = new OperationListCoder();
    this[P_SIGNER] = new Signer();
  }

  /**
   * Adds a single operation to the list of Operations.
   *
   * @param operation
   * @returns {RawOperations}
   */
  addOperation(keyPair, operation) {
    if (operation.isSigned) {
      throw new Error('Operation should not be signed.');
    }

    let sign = this[P_SIGNER].sign(keyPair, operation);

    operation.withSign(sign.r, sign.s);
    this[P_OPERATIONS].push({
      optype: operation.opType,
      operation: operation
    });
    return this;
  }

  get operations() {
    return this[P_OPERATIONS];
  }

  get count() {
    return this[P_OPERATIONS].length;
  }
}

module.exports = RawOperations;
