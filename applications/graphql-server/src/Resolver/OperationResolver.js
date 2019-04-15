const BaseResolver = require('./BaseResolver');

/**
 * A resolver with an Operation as root.
 */
class AccountResolver extends BaseResolver {
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

module.exports = AccountResolver;
