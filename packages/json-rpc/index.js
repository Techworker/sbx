const JsonRPCClient = require('./src/Client');

module.exports = {
  Client: JsonRPCClient,
  Executor: require('./src/Executor'),
  Caller: require('./src/Caller'),
  Actions: require('./src/Actions'),
  Errors: require('./src/Errors'),
  Types: require('./src/Types'),

  /**
   * Returns a new rpc client.
   *
   * @param rpcHostAddress
   * @return {Client}
   */
  factory(rpcHostAddress) {
    return JsonRPCClient.factory(rpcHostAddress);
  }
};
