const table = require('markdown-table');
const BC = require('@pascalcoin-sbx/common').BC;

let positions = [1];
let level = 0;

function describeType(type, repeating = false) {
  let table = [];

  if (positions[level] === undefined) {
    positions[level] = 1;
  }

  switch (type.constructor.name) {
    case 'BytesWithLength':
      table.push(...describeType(type.lengthField));
      addRow(table, repeating, type.id, type.description(), 'Bytes');
      break;
    case 'PublicKeyWithLength':
      table.push(...describeType(type.lengthField));
      table.push(...describeType(type.publicKeyCoding));
      break;
    case 'StringWithLength':
      addRow(table, repeating, type.id, type.description(), 'Bytes');
      break;
    case 'BytesWithoutLength':
      addRow(table, repeating, type.id, type.description(), 'Bytes');
      break;
    case 'Curve':
      addRow(table, repeating, type.id, type.description(), 'Bytes', {unsigned: type.unsigned, endian: type.endian});
      break;
    case 'OpType':
      addRow(table, repeating, type.id, type.description(), type.constructor.name + ' (' + type.intType.constructor.name + ')', {unsigned: type.intType.unsigned, endian: type.intType.endian});
      break;
    case 'Int16' || 'Int32' || 'Int64' || 'Currency':
      addRow(table, repeating, type.id, type.description(), type.constructor.name, {unsigned: type.unsigned, endian: type.endian});
      break;
    case 'Int8':
      addRow(table, repeating, type.id, type.description(), type.constructor.name, {unsigned: type.unsigned});
      break;
    case 'Repeating':
      addRow(table, repeating, type.id, type.description(), 'Array', {});
      level++;
      positions[level] = 1;
      table.push(...describeType(type.repeatingType, true));
      // addRow(table, ['level down'], ['level down'], '', '');
      positions[level] = 1;
      level--;
      // positions[level]++;
      repeating = false;
      break;
    default:
      if (hasProto(type.constructor, 'CompositeType')) {
        addRow(table, repeating, type.id, type.description(), 'CompositeType', {});
        level++;
        positions[level] = 1;
        type.subTypes.forEach((s) => {
          table.push(...describeType(s));
        });
        if (level > 0) {
          level--;
          // positions[level]++;
        }
      } else {
        let extra = {};

        if (type.unsigned !== undefined) {
          extra.unsigned = type.unsigned;
        }

        if (type.endian !== undefined) {
          extra.endian = type.endian;
        }
        addRow(table, repeating, type.id, type.description(), loopProto(type.constructor), extra);
      }
      break;
  }
  positions[level]++;

  return table;
}

function addRow(arr, repeating, id, description, name, extra = null) {
  arr.push([positions.slice(0, level + 1).join('.') + (repeating ? '..N' : ''), id, description, name, extra]);
}

function createDocumentation(mainType, rootTable = null) {
  if (rootTable === null) {
    rootTable = [];

    rootTable.push(['Position', 'Field', 'Description', 'Name', 'Type Info']);
  }

  positions = [1];
  mainType.subTypes.forEach((subType, idx) => {
    rootTable.push(...describeType(subType));
  });

  rootTable.forEach((row, idx) => {
    let extra = '';

    let tidx = 4;

    if (rootTable[idx][tidx] !== null && rootTable[idx][tidx] !== 'Type Info') {
      Object.keys(rootTable[idx][tidx]).forEach((k) => {
        extra += `${k}: ${rootTable[idx][tidx][k]}<br />`;
      });
    }

    let didx = 2;

    if (rootTable[idx][didx] !== null && rootTable[idx][didx] !== 'Description') {
      rootTable[idx][didx] = rootTable[idx][didx].reverse().join('<br />');
    }
    rootTable[idx][tidx] = extra;

    let cidx = 3;

    if (Array.isArray(rootTable[idx][cidx])) {
      let tmp = rootTable[idx][cidx];

      rootTable[idx][cidx] = rootTable[idx][cidx][0];
      if (tmp.length > 1) {
        rootTable[idx][cidx] += ' (' + tmp.slice(1).join(', ') + ')';
      }
    }
  });
  return rootTable;
}

function loopProto(type) {
  let res = [];

  do {
    if (type.name.substr(0, 8) === 'Abstract') {
      return res;
    }
    res.push(type.name);
    type = type.__proto__;
  } while (type.name !== '');

  return res;
}

function hasProto(type, name) {
  do {
    if (type.name === name) {
      return true;
    }
    type = type.__proto__;
  } while (type.name !== '');

  return false;
}

/*
const pubkc = new (require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey)();
const privkc = new (require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PrivateKey)();
const oph = new (require('@pascalcoin-sbx/common').Coding.Pascal.OperationHash)();
const ba = new (require('@pascalcoin-sbx/signing').Operations.BuyAccount.RawCoder)();
*/

let desc = [];

desc.push({
  type: new (require('@pascalcoin-sbx/common').Coding.Pascal.OperationHash)(),
  cat: 'Types',
  description: '',
  data: new (require('@pascalcoin-sbx/common').Types.OperationHash)(285123, 2354, 17, BC.fromHex('4C6B755A593FA502C41176CE26067CBAC169F906'))
});
desc.push({
  type: new (require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey)(),
  cat: 'Types',
  description: ''
});

desc.push({
  type: new (require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PrivateKey)(),
  cat: 'Types',
  description: ''
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.Transaction.RawCoder)(),
  cat: 'Transaction signing (raw)',
  description: ''
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.Transaction.DigestCoder)(),
  cat: 'Transaction signing (digest)',
  description: ''
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.ChangeKey.RawCoder)(),
  cat: 'Signing',
  description: 'ChangeKey signing (raw)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.ChangeKey.DigestCoder)(),
  cat: 'Signing',
  description: 'ChangeKey signing (digest)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.ListAccountForSale.RawCoder)(),
  cat: 'Signing',
  description: 'ListAccountForSale signing (raw)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.ListAccountForSale.DigestCoder)(),
  cat: 'Signing',
  description: 'ListAccountForSale signing (digest)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.DeListAccountForSale.RawCoder)(),
  cat: 'Signing',
  description: 'DeListAccountForSale signing (digest)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.DeListAccountForSale.DigestCoder)(),
  cat: 'Signing',
  description: 'DeListAccountForSale signing (raw)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.BuyAccount.RawCoder)(),
  cat: 'Signing',
  description: 'BuyAccount signing (raw)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.BuyAccount.DigestCoder)(),
  cat: 'Signing',
  description: 'BuyAccount signing (digest)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.ChangeKeySigned.RawCoder)(),
  cat: 'Signing',
  description: 'ChangeKeySigned signing (raw)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.ChangeKeySigned.DigestCoder)(),
  cat: 'Signing',
  description: 'ChangeKeySigned signing (digest)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.MultiOperation.RawCoder)(),
  cat: 'Signing',
  description: 'MultiOperation signing (raw)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.MultiOperation.DigestCoder)(),
  cat: 'Signing',
  description: 'MultiOperation signing (digest)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.Data.RawCoder)(),
  cat: 'Signing',
  description: 'Data signing (raw)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').Operations.Data.DigestCoder)(),
  cat: 'Signing',
  description: 'Data signing (digest)'
});

desc.push({
  type: new (require('@pascalcoin-sbx/signing').RawOperationsCoder)(),
  cat: 'Collection',
  description: 'Rawoperations'
});

desc.forEach((t) => {
  let title = '## ' + t.cat + ' -> ' + t.description;

  if (t.description === '') {
    title += t.type.constructor.name;
  }
  console.log(title);
  console.log('');
  console.log(t.type.description().reverse().join('\n'));
  let docs = createDocumentation(t.type);

  console.log('');
  console.log(table(docs));
});
