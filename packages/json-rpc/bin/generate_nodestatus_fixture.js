const fs = require('fs');
const RPCClient = require('@pascalcoin-sbx/json-rpc').Client;
const RPCExecutor = require('@pascalcoin-sbx/json-rpc').Executor;
const RPCCaller = require('@pascalcoin-sbx/json-rpc').Caller;

const rpc = new RPCClient(
    new RPCExecutor(
        new RPCCaller('http://127.0.0.1:4103'),
        50
    ),
);

const destination = `${__dirname}/../test/fixtures`;

rpc.nodeStatus().execute().then((status) => {
  fs.writeFileSync(`${destination}/nodestatus.json`, JSON.stringify(status, null, 2));
});
