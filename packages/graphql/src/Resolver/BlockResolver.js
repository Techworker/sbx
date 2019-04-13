const BaseResolver = require('./BaseResolver');
const EnumResolver = require('./EnumResolver');

/**
 * A resolver with an Account as root.
 */
class BlockResolver extends BaseResolver {
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
   * @param {Number} Block
   * @returns {Promise<any>}
   */
  getBlock(block) {
    return this.execute(this.rpc.getBlock, {block});
  }

  /**
   * Gets the operations of the given account.
   *
   * @param {Number} block
   * @param {Number} page
   * @param {Number} amount
   * @param {Number} opType
   * @returns {Promise<any>}
   */
  getOperations(block, page, amount, opType, subType) {
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
      let params = {block};

      if (page > 1) {
        params.start = (page - 1) * amount;
      }

      const actionPromise = this.executeLimited(
        this.rpc.getBlockOperations, params, page * amount, filter);

      actionPromise.then((operations) => {
        resolve(operations.slice((page - 1) * amount, page * amount));
      });
      actionPromise.catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = BlockResolver;
