const P_RPC = Symbol('rpc');

class BaseResolver {
  /**
     *
     * @param {Client} rpc
     */
  constructor(rpc) {
    this[P_RPC] = rpc;
  }

  /**
   * Gets the rpc client to ease integration in subclasses.
   *
   * @returns {Client}
   */
  get rpc() {
    return this[P_RPC];
  }

  /**
   * Executes an rpc method and returns a definitive result.
   *
   * @param {Function} rpcMethod
   * @param {Object} params
   * @returns {Promise<any>}
   */
  execute(rpcMethod, params) {
    return new Promise((resolve, reject) => {
      rpcMethod.call(this.rpc, params).execute().then(([data, transform]) => {
        resolve(transform(data));
      }).catch(err => reject(err));
    });
  }

  /**
   * Executes a single method.
   *
   * @param {Function} rpcMethod
   * @param {Object} params
   * @param {Function} callback
   * @returns {Promise<any>}
   */
  executeAllReport(rpcMethod, params, callback) {
    return new Promise((resolve, reject) => {
      rpcMethod.call(this.rpc, params).executeAllReport(callback).then(() => {
        resolve();
      }).catch(err => reject(err));
    });
  }

  /**
   * Gets the last operations of the given account.
   *
   * @param {Function} rpcMethod
   * @param {Object} params
   * @param {Number} limit
   * @param {Function} filter
   * @returns {Promise<any>}
   */
  executeLimited(rpcMethod, params, limit, filter) {
    const collected = [];

    return new Promise((resolve, reject) => {
      /* eslint consistent-return: "off" */
      const innerPromise = this.executeAllReport(rpcMethod, params, ([data, transform]) => {
        transform(data).forEach((item) => {

          if (collected.length === limit) {
            return;
          }

          if (filter(item) === true) {
            collected.push(item);
          }
        });

        if (collected.length === limit) {
          return false;
        }
      });

      innerPromise.then(() => resolve(collected));
      innerPromise.catch((err) => reject(err));
    });
  }
}

module.exports = BaseResolver;
