const fs = require('fs');
const WalletKeys = require('@pascalcoin-sbx/walletkeys.dat');
const {table} = require('table');
require('dotenv').config();

const rpc = require('@pascalcoin-sbx/json-rpc').factory('http://127.0.0.1:4103');

const Common = require('@pascalcoin-sbx/common');

let keys = WalletKeys.decode(fs.readFileSync(process.env.WALLETKEYS)).keys;
const output = keys.map(key => [key.name, Common.encodePublicKeyBase58(key.publicKey)]);

console.log(keys);
process.exit();
let b58 = Common.encodePublicKeyBase58(keys[0].publicKey);
let p = Common.decodePublicKeyBase58(b58);
console.log(b58);
console.log(Common.encodePublicKeyBase58(p));
console.log(Common.encodePublicKey(p).toHex());
process.exit();

let commands = [];
commands.push(rpc.findAccounts({pubkey: Common.decodePublicKeyBase58('3GhhboqY4df2kzLRGLZUzm6E1Fj5tRHRvdAUk1uzFXXyux5MVkqPyRzxFQkJZZGfiQ7oxx1c1YKhr6UdoXtBNjZgiGi9JtLcfQjsUY')}).execute());

Promise.all(commands).then(([...result]) => {
  result.forEach(([accounts, transform]) => {
    console.log(transform(accounts));
  });
}).catch(e => {
  console.log(e);
});
