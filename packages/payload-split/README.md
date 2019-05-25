# SBX Payload library

A sub package of [sbx](http://www.github.com/techworker/sbx)

This package can split pascalcoin payloads to handle multi-operation payloads.

## Installation

`npm install @pascalcoin-sbx/payload-split`

## Usage

```js
const PayloadSplit = require('@pascalcoin-sbx/payload-split');
// call static methods
```

Also see tests for usage.

There are 4 methods available:

 - `splitAndEncrypt`
 Splits the given payload and then encrypts each value.
 - `decryptAndConcat`
Counterpart to `splitAndEncrypt`. Decrypts all values and returns the decrypted value.

The above solution takes up more space, but will keep a single operation
entity consistent.

 - `encryptAndSplit`
 Will encrypt the given payload first and split it afterwards.
 - `concatAndDecrypt`
Counterpart to `encryptAndSplit`. Concats all encrypted payloads and decrypts the value.

The above solution takes up less space, but it will not be possible to even decrypt parts
of the payload.


```js
const PayloadSplit = require('@pascalcoin-sbx/payload-split');
const AES = require('@pascalcoin-sbx/crypto').Encryption.Pascal.Password;
const ECIES = require('@pascalcoin-sbx/crypto').Encryption.Pascal.ECIES;

const BC = require('@pascalcoin-sbx/common').BC;

let keyPair256 = require('@pascalcoin-sbx/crypto').Keys.fromPrivateKey(
  require('@pascalcoin-sbx/crypto').Encryption.Pascal.PrivateKey.decrypt(
    '53616C7465645F5F7317EBF1F267E51B71C35B1F9B3E4EFD591A46F7F7E13154C509ED2CD7E58F0AC0FB1F54C99A7DF879E3584C0FF687D37B1A98D0181C84F3',
    {password: 'test123'}
  )
);

let payload = BC.fromString('techworker'.repeat(100));

// first split, then encrypt
let encPayloads1 = PayloadSplit.splitAndEncrypt(
  payload, AES, {password: 'test123'}
);
let decPayloads1 = PayloadSplit.decryptAndConcat(
  encPayloads1, AES, {password: 'test123'}
);

// first encrypt, then split
let encPayloads2 = PayloadSplit.encryptAndSplit(
  payload, AES, {password: 'test123'}
);
let decPayloads2 = PayloadSplit.concateAndDecrypt(
  encPayloads2, AES, {password: 'test123'}
);


// first split, then encrypt
let encEciesPayloads1 = PayloadSplit.splitAndEncrypt(
  payload, ECIES, {publicKey: keyPair256.publicKey}
);
let decPayloads1 = PayloadSplit.decryptAndConcat(
  encEciesPayloads1, ECIES, {keyPair: keyPair256}
);

// first encrypt, then split
let encEciesPayloads2 = PayloadSplit.encryptAndSplit(
  payload, ECIES, {publicKey: keyPair256.publicKey}
);
let encEciesPayloads2 = PayloadSplit.concateAndDecrypt(
  encEciesPayloads2, ECIES, {keyPair: keyPair256}
);
```
