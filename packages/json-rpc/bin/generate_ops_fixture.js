const BT = require('./src/BaseTool');
const Operation = require('../src/Types/Operation');

(async function () {

  let collectedOps = {};

  // collectedOps[Operation.BLOCKCHAIN_REWARD] = [];
  collectedOps[Operation.TRANSACTION] = [];
  collectedOps[Operation.CHANGE_KEY] = [];
  // collectedOps[Operation.RECOVER_FUNDS] = [];
  collectedOps[Operation.LIST_FOR_SALE] = [];
  collectedOps[Operation.DELIST] = [];
  collectedOps[Operation.BUY] = [];
  collectedOps[Operation.CHANGE_KEY_ACCOUNT] = [];
  collectedOps[Operation.CHANGE_ACCOUNT_INFO] = [];
  collectedOps[Operation.MULTI_OPERATION] = [];
  collectedOps[Operation.DATA] = [];

  function isFinished(ops) {
    let finished = Object.keys(ops).length;

    Object.keys(ops).forEach((opt) => {
      if (opt == Operation.DATA && ops[opt].length === 0) {
        console.log('missing:' + opt);
        finished--;
      }
      if (opt == Operation.MULTI_OPERATION && ops[opt].length < 2) {
        console.log('missing:' + opt);
        finished--;
      }
      if (opt != Operation.DATA && opt != Operation.MULTI_OPERATION && ops[opt].length < 5) {
        console.log('missing:' + opt);
        finished--;
      }
    });

    return finished;
  }

  let max = await BT.rpc.getBlockCount().execute();

  // 273451 contains 1 data op
  for (let blockNo = 273451; blockNo < max; blockNo++) {
    if(blockNo === 275396) {
      blockNo = 280000;
    }
    var ops = await BT.rpc.getBlockOperations(blockNo).executeAll(Operation);

    ops.forEach((op) => {
      if (collectedOps[op.optype].length < 5) {
        collectedOps[op.optype].push(op);
      }
    });
    let f = isFinished(collectedOps);

    if (f === Object.keys(collectedOps).length) {

      Object.keys(collectedOps).forEach((opt) => {
        const destination = `${__dirname}/../test/fixtures/types/ops/`;
        BT.fs.writeFileSync(`${destination}/optype_${opt}.json`, JSON.stringify(collectedOps[opt], null, 2));
      });

      process.exit();

    } else {
      console.log(blockNo + ' - ' + f);
    }
  }
})();
