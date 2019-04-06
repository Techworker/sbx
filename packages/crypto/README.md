# SBX Crypto library

A sub package of [sbx](http://www.github.com/techworker/sbx)

This library provides basic crypto functionalities used in PascalCoin.

## Installation

`npm install @sbx/crypto`

## SBX Dependencies

This library depends on the following SBX dependencies:

 - `@sbx/common`
 
For all code examples in this documentation expect the import of the SBX 
libraries to be named: `sbxPackage`.

**Example**

```js
const sbxCommon = require('@sbx/common');
const sbxCrypto = require('@sbx/crypto');
// ...and so on
```

## Other dependencies

External dependencies are:

 - `mipher` https://github.com/mpaland/mipher
 - `elliptic` https://github.com/indutny/elliptic

## Usage

### (@sbx/common).Keys

A class that provides static methods to handle key related functionalities.

PascalCoin provides 4 Key-Types (elliptic curve types):

 - secp256k1 (ID: 714)
 - secp384r1 (ID: 715)
 - secp283k1 (ID: 729)
 - secp521r1 (ID: 716)
 
All but `secp283k1` are supported by this library. When using an unsopprted
curve the library will throw an exception that you have to catch.

#### Generating a new keypair

The following code generates a new KeyPair based on the given curve.

```js
const sbxCommon = require('@sbx/common');
const sbxCrypto = require('@sbx/crypto');

// a new curve instance can created by with the name or the id of the curve
const curve = new sbxCommon.Types.Keys.Curve(sbxCommon.Types.Keys.Curve.CI_SECP256K1());

// check if the curve is supported
if (curve.supported) {
  /** @var kp sbxCommon.Types.Keys.KeyPair */
  let kp = sbxCrypto.Keys.generate(curve);
  console.log(kp.privateKey.encode().toHex());
  console.log(kp.publicKey.encode().toHex());
}
```

#### Importing an encrypted private key

The library can decrypt an wallet exported and encrypted private key from the 
wallet and returns a KeyPair.

```js
const sbxCrypto = require('@sbx/crypto');

/** @var kp sbxCommon.Types.Keys.KeyPair */
let kp = sbxCrypto.Keys.decrypt(
  '53616C7465645F5FED4A37ECAD2BF13FF24A66DDA299A57632520447B28B9E642C4B2A301CACC217FBD7713F6282C20CCCFDC5FFD2AB93A8E48D8C2C81704D36', 
  'test1234'
);
console.log(kp.privateKey.encode().toHex());
console.log(kp.publicKey.encode().toHex());
```

#### Create a KeyPair from a private key 

The library can create a new keypair from a private key instance.

```js
const sbxCommon = require('@sbx/common');
const sbxCrypto = require('@sbx/crypto');

const privateKey = sbxCommon.Types.Keys.decode('CA02200046B7A086680D208272F6982F574FE226042F30D049F9A226283FC3346506411D');

/** @var kp sbxCommon.Types.Keys.KeyPair */
let kp = sbxCrypto.Keys.fromPrivateKey('ABCD', 'test123');
```

