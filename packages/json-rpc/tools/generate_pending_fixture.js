const BT = require('./src/BaseTool');
const Operation = require('../src/Types/Operation');

(async function () {

  var ops = await BT.rpc.getPendings().executeAll();
  const destination = `${__dirname}/../test/fixtures/types/ops/`;
  BT.fs.writeFileSync(`${destination}/pending.json`, JSON.stringify(ops, null, 2));
})();
