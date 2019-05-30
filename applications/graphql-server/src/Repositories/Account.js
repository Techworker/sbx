const Abstract = require('./Abstract');
const Enum = require('./../Enum');

/**
 * A resolver with an Account as root.
 */
class Account extends Abstract {
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
    const resolvedOpType = Enum.OPTYPE(opType);
    const resolvedSubType = Enum.SUBTYPE(subType);
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

module.exports = Account;
