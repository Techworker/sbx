/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('@pascalcoin-sbx/common').BC;
const OperationListCoder = require('./OperationListCoder');

const P_OPERATIONS = Symbol('operations');
const P_CODER = Symbol('coder');

/**
 * This class combines multiple signed operations to a string that
 * can be executed by the node.
 */
class OperationList {
  /**
   * Constructor
   */
  constructor() {
    this[P_OPERATIONS] = [];
    this[P_CODER] = new OperationListCoder();
  }

  /**
   * Adds a single operation to the list of Operations.
   *
   * @param operation
   * @returns {OperationList}
   */
  addOperation(operation) {
    if (!operation.isSigned) {
      throw new Error('Operation needs to be signed.');
    }

    this[P_OPERATIONS].push(operation);
    return this;
  }
}

module.exports = OperationList;
