# SBX Common library

A sub package of [sbx](http://www.github.com/techworker/sbx)

This is the core library of for the SBX family that contains common 
functionality related to the [PascalCoin](https://www.pascalcoin.org) BlockChain
project.

## Installation

`npm install @sbx/common`

## Usage

This library consists of low level objects used throughout PascalCoin. Please 
check the tests for proper usage beyond this documentation.

### (@sbx/common).BC

A wrapper around a byte array with helper methods to convert between custom 
strings, hex strings and integer values.

BC stands for ByteCollection.

This object type is used extensively throughout the libraries packages.

```js
const BC = require('@sbx/common').BC;

// initializes a BC from a hex string outputs it as string
const hex = BC.fromHex('74656368776F726B6572');
console.log(hex.toString()); // output: techworker

// initializes a BC from a string and outputs it as hex
const string = BC.fromString('techworker');
console.log(string.toHex()); // output: 74656368776F726B6572

// 123 is the number you want to convert to bytes
// 2 is the byte size, will be filled up with zero bytes
const int = BC.fromInt(123, 2);

// switchEndian switches the endianness
console.log(int.switchEndian().toHex()); // output: 7B00 
```

### (@sbx/common).Base58

Encodes a value to Base58 format or decodes it from base58.
 
```js
const Base58 = require('@sbx/common').Base58;
```
