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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let collectedBlocks = [];
let blocks = [];
let amount = 100;

function s(max) {
  let blockNo;

  do {
    blockNo = getRandomInt(1, max - 1);
  } while (blocks.indexOf(blockNo) > -1);

  blocks.push(blockNo);
  rpc.getBlock(blockNo).execute().then((block) => {
    if (collectedBlocks.length === amount) {
      const destination = `${__dirname}/../test/fixtures`;

      fs.writeFileSync(`${destination}/blocks.json`, JSON.stringify(collectedBlocks, null, 2));
      process.exit();
    }
    collectedBlocks.push(block);
    s(max);
  });
}

rpc.getBlockCount().execute().then((max) => {
  s(max);
});
