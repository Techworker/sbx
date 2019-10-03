const BaseOperation = require('@pascalcoin-sbx/common').Objects.Operation;
const Sender = require('./Sender');
const Changer = require('./Changer');
const Receiver = require('./Receiver');

const P_IND = Symbol('indyo');
const P_RPC = Symbol('rpc');

class Operation extends BaseOperation {

  /**
   * Sets the indyo instance.
   *
   * @param {Indyo} indyo
   * @return {Operation}
   */
  withIndyo(indyo) {
    this[P_IND] = indyo;
    this[P_RPC] = indyo.rpc;
    return this;
  }

  constructor(initializationData) {
    super(initializationData);

    // override parent settings
    this.senderClass = Sender;
    this.changerClass = Changer;
    this.receiverClass = Receiver;
  }
}

module.exports = Operation;
