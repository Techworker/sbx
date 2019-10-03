/* eslint-disable no-unused-vars */
const Indyo = require('./../Indyo');

const Operation = require('./../Objects/Operation');

const P_IND = Symbol('indyo');
const P_RPC = Symbol('rpc');

class Operations {
  /**
   * Constructor
   *
   * @param {Indyo} indyo
   */
  constructor(indyo) {
    this[P_IND] = indyo;
    this[P_RPC] = indyo.rpc;
  }

  /**
   * Tries to find an account by its account number.
   *
   * @param {OperationHash} opHash
   * @return {Promise<void>|Account}
   */
  async findByOpHash(opHash) {
    if (opHash === null) return null;
    return this[P_IND].executeAndTransform(
      this[P_RPC].findOperation({ophash: opHash}), Operation
    );
  }

  /**
   * Tries to find an account by its account number.
   *
   * @param {Number} blockNumber
   * @param {Number} amount
   * @param {Number} offset
   * @return {Promise<void>|Account}
   */
  async findByBlock(blockNumber, amount = null, offset = null) {
    if (blockNumber === null) return null;
    return this[P_IND].execute(
      this[P_RPC].getBlockOperations({block: blockNumber}), Operation, amount, offset
    );
  }
}

module.exports = Operations;
