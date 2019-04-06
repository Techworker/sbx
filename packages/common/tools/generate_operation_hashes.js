const BT = require('./src/BaseTool');

let hashes = [];
let blocks = [];
let amount = 1000;

function s(max) {
  let blockNo;

  do {
    blockNo = BT.getRandomInt(1, max - 1);
  } while (blocks.indexOf(blockNo) > -1);

  blocks.push(blockNo);
  BT.rpc.getBlock(blockNo).execute().then((block) => {
    const a = BT.rpc.getBlockOperations(block.block);

    a.max = 1;
    a.execute().then((ops) => {
      if (hashes.length === amount) {
        const destination = `${__dirname}/../test/fixtures/types/`;

        BT.fs.writeFileSync(`${destination}/operation-hashes.json`, JSON.stringify(hashes, null, 2));
        process.exit();
      }

      if (ops && ops.length > 0) {
        const d = {
          block: block.block,
          account: ops[0].account,
          ophash: ops[0].ophash
        };

        if (ops[0].changers.length > 0 && ops[0].changers[0].n_operation !== undefined) {
          d.n_operation = ops[0].changers[0].n_operation;
          hashes.push(d);
        } else if (ops[0].senders.length > 0) {
          d.n_operation = ops[0].senders[0].n_operation;
          hashes.push(d);
        }
      }

      s(max);
    });
  });
}

BT.rpc.getBlockCount().execute().then((max) => {
  s(max);
});

console.log(hashes);
