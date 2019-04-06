const BT = require('./src/BaseTool');
const ByteCollection = require('../src/ByteCollection');
const Curve = require('../src/Types/Keys/Curve');

(async function () {

  let collectedKeys = {};

  // collectedOps[Operation.BLOCKCHAIN_REWARD] = [];
  collectedKeys[Curve.CI_SECP256K1] = [];
  collectedKeys[Curve.CI_SECT283K1] = [];
  collectedKeys[Curve.CI_P384] = [];
  collectedKeys[Curve.CI_P521] = [];

  function isFinished(keys) {
    let finished = Object.keys(keys).length;

    Object.keys(keys).forEach((opt) => {
      if (keys[opt].length < 3) {
        console.log('missing:' + opt);
        finished--;
      }
    });

    return finished;
  }

  BT.rpc.findAccounts().executeAllReport(async (accounts) => {
    console.log(accounts[0].account);
    accounts.forEach(async (a) => {
      let decoded = await BT.rpc.decodePubKey(ByteCollection.fromHex(a.enc_pubkey)).execute();

      if (collectedKeys[decoded.ec_nid].length < 3) {
        let add = true;

        collectedKeys[decoded.ec_nid].forEach((d) => {
          if (d.enc_pubkey === decoded.enc_pubkey) {
            add = false;
          }
        });
        if (add) {
          collectedKeys[decoded.ec_nid].push(decoded);
        }
      }

      let f = isFinished(collectedKeys);

      if (f === Object.keys(collectedKeys).length) {
        Object.keys(collectedKeys).forEach((k) => {
          const destination = `${__dirname}/../test/fixtures/types/public-keys/`;

          BT.fs.writeFileSync(`${destination}/curve_${k}.json`, JSON.stringify(collectedKeys[k], null, 2));
        });
        process.exit();
      }
    });
  });
})();
