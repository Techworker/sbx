const CommonReceiver = require('@pascalcoin-sbx/common').Objects.Receiver;

const P_IND = Symbol('indyo');
const P_RPC = Symbol('rpc');

class Receiver extends CommonReceiver {

  /**
   * Sets the indyo instance.
   *
   * @param {Indyo} indyo
   * @return {Receiver}
   */
  withIndyo(indyo) {
    this[P_IND] = indyo;
    this[P_RPC] = indyo.rpc;
    return this;
  }

  async account() {
    return this[P_IND].Accounts.findByAccountNumber(this.accountNumber);
  }
}

module.exports = Receiver;
