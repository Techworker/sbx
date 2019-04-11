const BaseResolver = require('./BaseResolver');
const EnumResolver = require('./EnumResolver');

/**
 * A resolver with an Account as root.
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
   * @param {Number} account
   * @returns {Promise<any>}
   */
  getAccount(account) {
    return this.execute(this.rpc.getAccount, {account: account});
  }

  /**
   * Gets the last operations of the given account.
   *
   * @param {Number} account
   * @param {Number} opType
   * @param {Number} amount
   * @returns {Promise<any>}
   */
  lastOperations(account, opType, amount) {
    const resolvedOpType = EnumResolver.OPTYPE(opType);
    const filter = (operation) => {
      return operation.optype === resolvedOpType;
    };

    return this.executeLimited(this.rpc.getAccountOperations, {account}, amount, filter);
  }
}

module.exports = AccountResolver;
