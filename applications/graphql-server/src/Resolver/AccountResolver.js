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
    return this.execute(this.rpc.getAccount, {account});
  }

  /**
   * Gets the operations of the given account.
   *
   * @param {Number} account
   * @param {Number} page
   * @param {Number} amount
   * @param {Number} opType
   * @returns {Promise<any>}
   */
  getOperations(account, page, amount, opType, subType) {
    const resolvedOpType = EnumResolver.OPTYPE(opType);
    const resolvedSubType = EnumResolver.SUBTYPE(subType);
    const filter = (operation) => {
      if (resolvedOpType === -1 || operation.opType === resolvedOpType) {
        if (resolvedSubType === -1 || operation.subType === resolvedSubType) {
          return true;
        }
      }

      return false;
    };

    return new Promise((resolve, reject) => {
      let params = {account};

      if (page > 1) {
        params.start = (page - 1) * amount;
      }

      const actionPromise = this.executeLimited(
        this.rpc.getAccountOperations, params, page * amount, filter);

      actionPromise.then((operations) => {
        resolve(operations.slice((page - 1) * amount, page * amount));
      });
      actionPromise.catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = AccountResolver;
