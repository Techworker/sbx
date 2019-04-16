const fs = require('fs');
const sbxRpc = require('@sbx/json-rpc');

const prompt = require('prompt');

prompt.start();

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/\-+/g, '_') // Replace - with _
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

function appendCSV(account, date_from, date_to, csv) {
  const f = slugify(`${account}_${date_from}_${date_to}.csv`);

  fs.appendFileSync('./' + f, csv);
}

function deleteCSV(account, date_from, date_to) {
  const f = slugify(`${account}_${date_from}_${date_to}.csv`);

  if (fs.existsSync('./' + f)) {
    fs.unlinkSync('./' + f);
  }
}

function formatDate(date) {
  let d = date;
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  const hours = ('0' + d.getHours()).slice(-2);
  const minutes = ('0' + d.getMinutes()).slice(-2);
  const seconds = ('0' + d.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

prompt.get(['account', 'year_from', 'month_from', 'day_from', 'year_to', 'month_to', 'day_to', 'node'], (err, result) => {

  console.log('');

  let node = result.node;

  if (node === '') {
    node = 'http://127.0.0.1:4003';
  }

  const rpc = sbxRpc.Client.factory(node);

  const account = parseInt(result.account, 10);

  let year_from = parseInt(result.year_from, 10);
  let month_from = parseInt(result.month_from, 10) - 1;
  let day_from = parseInt(result.day_from, 10);

  let year_to = parseInt(result.year_to, 10);
  let month_to = parseInt(result.month_to, 10) - 1;
  let day_to = parseInt(result.day_to, 10);

  if (day_from > 0 && (Number.isNan(year_from) || Number.isNaN(month_from))) {
    console.error('if you set the day, set month and year');
    process.exit();
  }

  if (month_from > 0 && Number.isNaN(year_from)) {
    console.error('if you set the month, set year');
    process.exit();
  }

  if (day_to > 0 && (Number.isNaN(year_to) || Number.isNaN(month_to))) {
    console.error('if you set the day, set month and year');
    process.exit();
  }

  if (month_to > 0 && Number.isNaN(year_to)) {
    console.error('if you set the month, set year');
    process.exit();
  }

  if (!Number.isNaN(year_from)) {
    if (Number.isNaN(month_from)) {
      month_from = 0;
      day_from = 1;
    } else {
      if (Number.isNaN(day_from)) {
        day_from = 1;
      }
    }
  } else {
    year_from = 2000;
    month_from = 0;
    day_from = 1;
  }

  if (!Number.isNaN(year_to)) {
    if (Number.isNaN(month_to)) {
      month_to = 11;
      day_to = new Date(year_to, month_to + 1, 0).getDate();
    } else {
      if (Number.isNaN(day_to)) {
        day_to = new Date(year_to, month_to + 1, 0).getDate();
      }
    }
  } else {
    year_to = 2050;
    month_to = 12;
    day_to = 31;
  }

  const dFrom = new Date(year_from, month_from, day_from, 0, 0, 0).getTime() / 1000 | 0;
  const dFromDate = new Date(year_from, month_from, day_from, 0, 0, 0);
  const dTo = new Date(year_to, month_to, day_to, 23, 59, 59, 999).getTime() / 1000 | 0;
  const dToDate = new Date(year_to, month_to, day_to, 23, 59, 59, 999);

  console.log(`Collecting ${formatDate(dFromDate)} to ${formatDate(dToDate)}`);

  deleteCSV(account, formatDate(dFromDate), formatDate(dToDate));

  const action = rpc.getAccountOperations({account: 1000, depth: 1000000});
  let counts = {
    account: account,
    reports: 0,
    all: 0,
    tx: 0,
    txSkipped: 0,
    txCollected: 0,
    currentYear: 0,
    currentMonth: 0,
    currentDay: 0
  };

  action.executeAllReport(([operations, transform]) => {
    operations = transform(operations);
    let csv = '';
    let txDate;

    counts.reports++;
    let exitProcess = false;

    operations.forEach((operation) => {
      counts.all++;
      if (operation.isTransaction()) {
        counts.tx++;
        let type = 'outgoing';

        if (operation.subType === 12) {
          type = 'incoming';
        }

        txDate = new Date(operation.time * 1000);

        let skip = false;

        if (operation.time > dTo) {
          skip = true;
        } else {
          if (operation.time < dFrom) {
            exitProcess = true;
          }
        }

        if (exitProcess) {
          appendCSV(account, formatDate(dFromDate), formatDate(dToDate), csv);
          return false;
        }

        if (!skip) {
          let line = `${operation.block},`;

          line += `${type},`;
          line += `${operation.senders[0].account.account},`;
          line += `${operation.receivers[0].account.account},`;
          line += `${operation.amount.toStringOpt()},`;
          line += `${operation.fee.toStringOpt()},`;
          line += `${formatDate(txDate)},`;
          line += `${operation.opTxt},`;
          line += `${operation.payload.toString()},`;
          line += `${operation.opHash.encode().toHex()}`;

          csv += `${line}\n`;
          counts.txCollected++;
        } else {
          counts.skipped++;
        }
      }
    });
    if (exitProcess) {
      return false;
    }

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`R${counts.reports} ${counts.all}/${counts.tx}/${counts.txSkipped}/${counts.txCollected} ${txDate !== undefined ? formatDate(txDate) : ''}`);
    // console.log((`R${counts.reports} ${counts.all}/${counts.tx}/${counts.txSkipped}/${counts.txCollected} ${txDate !== undefined ? formatDate(txDate) : ''}`));
    appendCSV(account, formatDate(dFromDate), formatDate(dToDate), csv);
  }, 50, 10, () => {
    // console.log(' - giving node some time to rest..');
    process.stdout.write(' - giving node some time to rest..');
  }).then(() => {
    console.log(' - finsihed!');
  });
});
