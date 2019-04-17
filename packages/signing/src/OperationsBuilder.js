/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('@pascalcoin-sbx/common').BC;

const P_OPERATIONS = Symbol('operations');

/**
 * This class combines multiple signed operations to a string that
 * can be executed by the node.
 */
class OperationsBuilder {
  /**
   * Constructor
   */
  constructor() {
    this[P_OPERATIONS] = [];
  }

  /**
   * Adds a single operation to the list of Operations.
   *
   * @param operation
   * @returns {OperationsBuilder}
   */
  addOperation(operation) {
    if (!operation.isSigned) {
      throw new Error('Operation needs to be signed.');
    }

    this[P_OPERATIONS].push(operation);
    return this;
  }

  /**
   * Builds the operations.
   *
   * @returns {BC}
   */
  build() {
    let bc = BC.fromInt(this[P_OPERATIONS].length, 4).switchEndian();

    this[P_OPERATIONS].forEach((op) => {
      bc = BC.concat(bc, op.toRaw());
    });

    return bc;
  }

  parse(raw) {

    // let numOperations = raw.slice(0, 3);
    let bc = BC.fromInt(this[P_OPERATIONS].length, 4).switchEndian();

    this[P_OPERATIONS].forEach((op) => {
      bc = BC.concat(bc, op.toRaw());
    });

    return bc;
  }
}

module.exports = OperationsBuilder;
