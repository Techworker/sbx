const fs = require('fs');
const data = JSON.parse(fs.readFileSync(__dirname + '/../json-rpc.json'));

const tpMap = {};

tpMap['AccountNumber'] = 'AccountNumber|Number|String';
tpMap['AccountNumberArray'] = 'AccountNumber[]|Number[]|String[]';
tpMap['StringArray'] = 'String[]';
tpMap['AccountName'] = 'AccountName|String';
tpMap['PublicKey'] = 'String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair';
tpMap['Block'] = 'Number';
tpMap['ChangerArray'] = 'Object[]|Changer[]';
tpMap['SenderArray'] = 'Object[]|Sender[]';
tpMap['ReceiverArray'] = 'Object[]|Receiver[]';

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var ccUS = function (str) {
  return str.split(/(?=[A-Z])/).join('_').toLowerCase();
};

var usCC = (function () {
  var DEFAULT_REGEX = /[-_]+(.)?/g;

  function toUpper(match, group1) {
    return group1 ? group1.toUpperCase() : '';
  }
  return function (str, delimiters) {
    return str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, toUpper);
  };
})();

const NL = '\n';

let gen = '';

Object.keys(data.methods).forEach((m) => {

  const md = data.methods[m];

  gen += `  /**${NL}   * ${md.description}${NL}   *${NL}`;

  Object.keys(md.params).forEach((p, i) => {
    const pd = md.params[p];

    gen += '   * @param {';
    if (tpMap[pd.type] !== undefined) {
      gen += tpMap[pd.type];
    } else {
      gen += pd.type;
    }
    if (!pd.required) {
      gen += '|null';
    }

    if (pd.description !== undefined) {
      gen += `} ${usCC(pd.name)} - ` + pd.description + NL;
    } else {
      gen += `} ${usCC(pd.name)}` + NL;

    }
  });

  if (Object.keys(md.params).length > 0) {
    gen += `   *${NL}`;
  }

  gen += `   * @returns {${md.action}}${NL}   */${NL}`;

  gen += `  ${md.camel}(`;

  if (Object.keys(md.params).length > 0) {
    gen += '{';
    gen += NL;
  }
  Object.keys(md.params).forEach((p, i) => {
    const pd = md.params[p];

    gen += `    ${usCC(pd.name)}`;
    if (!pd.required) {
      gen += ' = null';
    }

    if (i < Object.keys(md.params).length - 1) {
      gen += ', ';
    }
    gen += NL;
  });
  if (Object.keys(md.params).length > 0) {
    gen += '  }';
  }

  gen += ') {' + NL;

  gen += `    return new ${md.action}('${m}', {`;
  if (Object.keys(md.params).length > 0) {
    gen += NL;
  }
  Object.keys(md.params).forEach((p, i) => {
    const pd = md.params[p];

    switch (pd.type) {
      case 'AccountName':
        if (pd.required) {
          gen += `      ${pd.name}: new AccountName(${usCC(pd.name)})`;
        } else {
          gen += `      ${pd.name}: ${usCC(pd.name)} !== null ? new AccountName(${usCC(pd.name)}) : ${usCC(pd.name)}`;
        }
        break;
      case 'StringArray':
        if (pd.implode !== undefined) {
          gen += `      ${pd.name}: ${usCC(pd.name)}.join('${pd.implode}')`;
        } else {
          if (pd.name !== usCC(pd.name)) {
            gen += `      ${pd.name}: ${usCC(pd.name)}`;
          } else {
            gen += `      ${usCC(pd.name)}`;
          }
        }
        break;
      case 'AccountNumber':
        if (pd.required) {
          gen += `      ${pd.name}: new AccountNumber(${usCC(pd.name)})`;
        } else {
          gen += `      ${pd.name}: ${usCC(pd.name)} !== null ? new AccountNumber(${usCC(pd.name)}) : ${usCC(pd.name)}`;
        }
        break;
      case 'AccountNumberArray':
        gen += `      ${pd.name}: ${usCC(pd.name)}.map((acc) => new AccountNumber(acc))`;
        break;
      case 'ChangerArray':
        gen += `      ${pd.name}: ${usCC(pd.name)}.map((chng) => new Changer(chng))`;
        break;
      case 'ReceiverArray':
        gen += `      ${pd.name}: ${usCC(pd.name)}.map((rec) => new Receiver(rec))`;
        break;
      case 'SenderArray':
        gen += `      ${pd.name}: ${usCC(pd.name)}.map((sen) => new Sender(sen))`;
        break;
      case 'Number':
      case 'Block':
        gen += `      ${pd.name}: ${usCC(pd.name)} !== null ? parseInt(${usCC(pd.name)}, 10) : ${usCC(pd.name)}`;
        break;
      case 'Currency':
        if (pd.required) {
          gen += `      ${pd.name}: new Currency(${usCC(pd.name)})`;
        } else {
          gen += `      ${pd.name}: ${usCC(pd.name)} !== null ? new Currency(${usCC(pd.name)}) : ${usCC(pd.name)}`;
        }
        break;
      default:
        if (pd.name !== usCC(pd.name)) {
          gen += `      ${pd.name}: ${usCC(pd.name)}`;
        } else {
          gen += `      ${usCC(pd.name)}`;
        }

        break;
    }

    if (i < Object.keys(md.params).length - 1) {
      gen += ', ' + NL;
    }
  });

  if (Object.keys(md.params).length > 0) {
    gen += NL;
    gen += '    }, this[P_EXECUTOR], ';
  } else {
    gen += '}, this[P_EXECUTOR], ';
  }

  gen += md.return_type + ', ' + md.return_array + ');' + NL;
  gen += '  }';
  gen += NL + NL;
});

let tpl = fs.readFileSync(__dirname + '/Client.js.tpl');

tpl = tpl.toString().replace('__CONTENT__', gen);
fs.writeFileSync(__dirname + '/Client.js', tpl);
