const BaseChanger = require('@pascalcoin-sbx/common').Objects.Changer;

const P_IND = Symbol('indyo');
const P_RPC = Symbol('rpc');

class Changer extends BaseChanger {

  /**
   * Sets the indyo instance.
   *
   * @param {Indyo} indyo
   * @return {Changer}
   */
  withIndyo(indyo) {
    this[P_IND] = indyo;
    this[P_RPC] = indyo.rpc;
    return this;
  }

  async lockedUntilBlock() {
    return this[P_IND].Blocks.findByBlockNumber(this.lockedUntilBlockNumber);
  }

  async account() {
    return this[P_IND].Accounts.findByAccountNumber(this.accountNumber);
  }

  async sellerAccount() {
    return this[P_IND].Accounts.findByAccountNumber(this.sellerAccountNumber);
  }
}

module.exports = Changer;
