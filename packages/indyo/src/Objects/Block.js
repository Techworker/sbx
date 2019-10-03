const CommonBlock = require('@pascalcoin-sbx/common').Objects.Block;

const P_IND = Symbol('indyo');
const P_RPC = Symbol('rpc');

class Block extends CommonBlock {

  /**
   * Sets the indyo instance.
   *
   * @param {Indyo} indyo
   * @return {Block}
   */
  withIndyo(indyo) {
    this[P_IND] = indyo;
    this[P_RPC] = indyo.rpc;
    return this;
  }

  async createdAccounts() {
    return this[P_IND].Accounts.findByAccountNumbers(this.createdAccountNumbers);
  }
}

module.exports = Block;
