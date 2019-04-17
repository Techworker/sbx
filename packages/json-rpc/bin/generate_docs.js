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

  gen += '### ' + md.camel + NL + NL;

  gen += md.description + NL + NL;

  gen += '```' + NL + md.camel + '(';
  if (md.params.length > 0) {
    gen += '{' + NL;
  }

  md.params.forEach((p, i) => {
    gen += '  ';
    if (!p.required) {
      gen += '[';
    }

    if (tpMap[p.type] !== undefined) {
      gen += tpMap[p.type];
    } else {
      gen += p.type;
    }

    gen += ' ' + usCC(p.name);

    if (!p.required) {
      gen += ']';
    }

    if (i < md.params.length - 1) {
      gen += ', ';
    }

    gen += NL;
  });

  if (md.params.length > 0) {
    gen += '}';
  }

  gen += ') : ' + md.action + ' -> ' + md.return_type;
  if (md.return_array === true) {
    gen += '[]';
  }

  gen += NL + '```' + NL + NL;

  gen += '| Parameter | Type | Required | Description |' + NL;
  gen += '|---|---|---|---|' + NL;
  md.params.forEach((p, i) => {
    gen += '|';
    gen += usCC(p.name) + '|';
    if (tpMap[p.type] !== undefined) {
      gen += tpMap[p.type].replace(/\|/g, '\\|') + '|';
    } else {
      gen += p.type.replace(/\|/g, '\\|') + '|';
    }

    if (p.required) {
      gen += 'yes|';
    } else {
      gen += 'no|';
    }

    gen += (p.description || '') + '|';
    gen += NL;
  });

  if (md.action === 'BaseAction') {
    gen += '**Example:**' + NL + NL;

    gen += '```js' + NL +
        "const sbxRpc = require('@pascalcoin-sbx/json-rpc');" + NL + NL +
        '// create an rpc client for a local wallet' + NL +
        "const rpcClient = sbxRpc.Client.factory('http://127.0.0.1:4003');" + NL + NL;

    gen += '// create action instance' + NL;
    gen += `const action = rpcClient.${md.camel}(`;
    if (md.params.length > 0) {
      gen += '{' + NL;
    }
    md.params.forEach((p, i) => {
      gen += '  ' + usCC(p.name) + ': ';
      if (data.examples[usCC(p.name)] !== undefined) {
        gen += data.examples[usCC(p.name)];
      } else if (data.examples[p.type] !== undefined) {
        gen += data.examples[p.type];
      }
      if (i < md.params.length - 1) {
        gen += ', ';
      }

      gen += NL;
    });

    if (md.params.length > 0) {
      gen += '}';
    }

    gen += ');' + NL + NL;
    gen += '// execute and handle promise' + NL;
    gen += 'const promise = action.execute();' + NL;
    gen += 'promise.then(([data, transform]) => {' + NL;
    gen += '  console.log(data); // raw' + NL;
    gen += '  console.log(transform(data)); // mapped to rich object' + NL;
    gen += '}).catch((err) => {' + NL;
    gen += '  console.log(err); // something went wrong' + NL;
    gen += '});';
    gen += NL + '```' + NL + NL;
  }

  if (md.action === 'PagedAction') {
    gen += '**Example to fetch all data:**' + NL + NL;

    gen += '```js' + NL +
        "const sbxRpc = require('@pascalcoin-sbx/json-rpc');" + NL + NL +
        '// create an rpc client for a local wallet' + NL +
        "const rpcClient = sbxRpc.Client.factory('http://127.0.0.1:4003');" + NL + NL;

    gen += '// // create action instance of type PagedAction' + NL;
    gen += `const action = rpcClient.${md.camel}(`;
    if (md.params.length > 0) {
      gen += '{' + NL;
    }
    md.params.forEach((p, i) => {
      gen += '  ' + usCC(p.name) + ': ';
      if (data.examples[usCC(p.name)] !== undefined) {
        gen += data.examples[usCC(p.name)];
      } else if (data.examples[p.type] !== undefined) {
        gen += data.examples[p.type];
      }
      if (i < md.params.length - 1) {
        gen += ', ';
      }

      gen += NL;
    });

    if (md.params.length > 0) {
      gen += '}';
    }

    gen += ');' + NL + NL;
    gen += '// execute and handle promise' + NL;
    gen += 'const promise = action.executeAll();' + NL;
    gen += 'promise.then(([data, transform]) => {' + NL;
    gen += '  console.log(data); // raw' + NL;
    gen += '  console.log(transform(data)); // mapped to rich object' + NL;
    gen += '}).catch((err) => {' + NL;
    gen += '  console.log(err); // something went wrong' + NL;
    gen += '});';
    gen += NL + '```' + NL + NL;

    gen += '**Example for custom paging:**' + NL + NL;

    gen += '```js' + NL +
        "const sbxRpc = require('@pascalcoin-sbx/json-rpc');" + NL + NL +
        '// create an rpc client for a local wallet' + NL +
        "const rpcClient = sbxRpc.Client.factory('http://127.0.0.1:4003');" + NL + NL;

    gen += '// create action instance of type PagedAction' + NL;
    gen += `const action = rpcClient.${md.camel}(`;
    if (md.params.length > 0) {
      gen += '{' + NL;
    }
    md.params.forEach((p, i) => {
      gen += '  ' + usCC(p.name) + ': ';
      if (data.examples[usCC(p.name)] !== undefined) {
        gen += data.examples[usCC(p.name)];
      } else if (data.examples[p.type] !== undefined) {
        gen += data.examples[p.type];
      }
      if (i < md.params.length - 1) {
        gen += ', ';
      }

      gen += NL;
    });

    if (md.params.length > 0) {
      gen += '}';
    }

    gen += ');' + NL + NL;
    gen += '// change start and max if you need control' + NL;
    gen += 'action.start = 0;' + NL;
    gen += 'action.max = 10;' + NL + NL;
    gen += '// execute and handle promise' + NL;
    gen += 'const promise = action.execute();' + NL;
    gen += 'promise.then(([data, transform]) => {' + NL;
    gen += '  console.log(data); // raw' + NL;
    gen += '  console.log(transform(data)); // mapped to rich object' + NL;
    gen += '}).catch((err) => {' + NL;
    gen += '  console.log(err); // something went wrong' + NL;
    gen += '});';
    gen += NL + '```' + NL + NL;

    gen += '**Example to fetch all data but getting paged data reported.:**' + NL + NL;

    gen += '```js' + NL +
        "const sbxRpc = require('@pascalcoin-sbx/json-rpc');" + NL + NL +
        '// create an rpc client for a local wallet' + NL +
        "const rpcClient = sbxRpc.Client.factory('http://127.0.0.1:4003');" + NL + NL;

    gen += '// create action instance of type PagedAction' + NL;
    gen += `const action = rpcClient.${md.camel}(`;
    if (md.params.length > 0) {
      gen += '{' + NL;
    }
    md.params.forEach((p, i) => {
      gen += '  ' + usCC(p.name) + ': ';
      if (data.examples[usCC(p.name)] !== undefined) {
        gen += data.examples[usCC(p.name)];
      } else if (data.examples[p.type] !== undefined) {
        gen += data.examples[p.type];
      }
      if (i < md.params.length - 1) {
        gen += ', ';
      }

      gen += NL;
    });

    if (md.params.length > 0) {
      gen += '}';
    }

    gen += ');' + NL + NL;

    gen += '// execute and handle promise' + NL;
    gen += 'const promise = action.executeAllReport(([data, transform]) => {' + NL;
    gen += '  // gets called whenever a chunk was loaded' + NL;
    gen += '  console.log(data); // raw' + NL;
    gen += '  console.log(transform(data)); // mapped' + NL;
    gen += '});' + NL + NL;
    gen += 'promise.then(() => {' + NL;
    gen += "  console.log('finished');" + NL;
    gen += '}).catch((err) => {' + NL;
    gen += '  console.log(err); // something went wrong' + NL;
    gen += '});';
    gen += NL + '```' + NL + NL;
  }

});

console.log(gen);

// tpl = tpl.toString().replace('__CONTENT__', gen);
// fs.writeFileSync(__dirname + '/Client.js', tpl);
