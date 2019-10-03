const CommonSender = require('@pascalcoin-sbx/common').Objects.Sender;

const P_IND = Symbol('indyo');
const P_RPC = Symbol('rpc');

class Sender extends CommonSender {

  /**
   * Sets the indyo instance.
   *
   * @param {Indyo} indyo
   * @return {Sender}
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

module.exports = Sender;