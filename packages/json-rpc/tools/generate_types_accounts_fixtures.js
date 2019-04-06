const BT = require('./src/BaseTool');

let data = {
  accountNotForSale: null,
  accountForPublicSale: null,
  accountForPrivateSale: null,
  accountLocked: null,
  accountWithName: null,
  accountWithoutName: null,
  accountWithType: null
};

function isFinished(data) {
  let finished = Object.keys(data).length;

  Object.keys(data).forEach((k) => {
    if (data[k] !== null) {
      finished--;
    }
  });

  return finished;
}

let action = BT.rpc.findAccounts();

action.max = 200;
action.start = 400000;
action.executeAll((accounts) => {
  accounts.forEach((a) => {
    if (data.accountNotForSale === null && a.state !== 'listed') {
      data.accountNotForSale = a;
    } else if (data.accountForPublicSale === null && a.state === 'listed' && a.private_sale !== true) {
      data.accountForPublicSale = a;
    } else if (data.accountForPrivateSale === null && a.state === 'listed' && a.private_sale === true) {
      data.accountForPrivateSale = a;
    } else if (data.accountLocked === null && a.locked_until_block > 0) {
      data.accountLocked = a;
    } else if (data.accountWithName === null && a.name !== '') {
      data.accountWithName = a;
    } else if (data.accountWithoutName === null && a.name === '') {
      data.accountWithoutName = a;
    } else if (data.accountWithType === null && a.type > 0) {
      data.accountWithType = a;
    }
  });
  let f = isFinished(data);

  console.log(accounts[0].account + ' - ' + f);
  if (f === 0) {
    Object.keys(data).forEach((k) => {
      const destination = `${__dirname}/../test/fixtures/types/account/`;

      BT.fs.writeFileSync(`${destination}/${k}.json`, JSON.stringify(data[k], null, 2));
    });
    process.exit();
  }
});
