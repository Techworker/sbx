const RPCClient = require('@pascalcoin-sbx/json-rpc').Client;
const RPCExecutor = require('@pascalcoin-sbx/json-rpc').Executor;
const RPCCaller = require('@pascalcoin-sbx/json-rpc').Caller;
const Account = require('@pascalcoin-sbx/json-rpc').Types.Account;

const rpc = new RPCClient(
  new RPCExecutor(
    new RPCCaller('http://127.0.0.1:4003'),
    50
  ),
);

rpc.findAccounts({}).executeAllTransformArrayReport(Account, (accs) => {
    console.log(accs[0].account.account);
}).then(() => {
    console.log('FINI');
});
