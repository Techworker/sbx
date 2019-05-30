const Abstract = require('./Abstract');

/**
 * A resolver with an Operation as root.
 */
class Operation extends Abstract {
  /**
   * Constructor
   *
   * @param {Client} rpc
   */
  constructor(rpc) {
    super(rpc);
  }

  /**
   * Gets the account with the given account number.
   *
   * @param {OperationHash} opHash
   * @returns {Promise<any>}
   */
  getOperation(opHash) {
    return this.execute(this.rpc.findOperation, {ophash: opHash});
  }
}

module.exports = Operation;
