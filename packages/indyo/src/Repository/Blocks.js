const Block = require('./../Objects/Block');

const P_IND = Symbol('indyo');
const P_RPC = Symbol('rpc');

class Blocks {
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
   * @param {Number} blockNumber
   * @return {Promise<void>|Block}
   */
  async findByBlockNumber(blockNumber) {
    if (blockNumber === null) return null;

    return this[P_IND].executeAndTransform(
      this[P_RPC].getBlock({block: blockNumber}), Block
    );
  }
}

module.exports = Blocks;
