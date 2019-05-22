# PascalCoin WalletKeys.dat library

A sub package of [sbx](http://www.github.com/techworker/sbx)

This library can be used do encode and decode a WalletKeys.dat file from the
classic wallet.

## Installation

`npm install @pascalcoin-sbx/walletkeys.dat`

## Usage

```
var fs = require('fs');
const FileCoder = require('@pascalcoin-sbx/walletkeys.dat').FileCoder;

var data = fs.readFileSync('WalletKeys.dat');

let fileCoder = new FileCoder().decodeFromBytes(data);
let decoded = fileCoder.decodeFromBytes(data);

// output decoded
console.log(decoded);

// output walletkeys.dat as hex
console.log(fileCoder.encodeToBytes(decoded).toHex());

```
