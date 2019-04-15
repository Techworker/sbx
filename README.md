# SBX - PascalCoin Javascript Client library

A PascalCoin Javascript Client library for the browser and NodeJS.

[![Build Status](https://travis-ci.org/Techworker/sbx.svg?branch=master)](https://travis-ci.org/Techworker/sbx)

This monorepo contains the following packages:

 - `@sbx/common` - Common functionalities
 - `@sbx/crypto` - Cryptographic tools
 - `@sbx/epasa` - EPasa implementation
 - `@sbx/json-rpc` - Javascript to PascalCoin node communication
 - `@sbx/signing` - Sign operations in javascript without a node.
 - `@sbx/graphql` - GraphQL helpers
 - `@sbx/pascalcoin` - All in one package

**Dependency Tree**

 - `@sbx/common`
 - `@sbx/crypto`
   - `@sbx/common`
 - `@sbx/epasa`
   - `@sbx/common`
 - `@sbx/json-rpc`
   - `@sbx/common`
 - `@sbx/signing`
   - `@sbx/common`
   - `@sbx/crypto`
 - `@sbx/pascalcoin`
   - `@sbx/common`
   - `@sbx/crypto`
   - `@sbx/epasa`
   - `@sbx/json-rpc`
   - `@sbx/signing`
   
## Development

 - Install nodejs: https://nodejs.org
 - Install yarn: https://yarnpkg.com/
 - Install lerna: `npm install lerna -g`
 - Checkout the repository
 - run `lerna bootstrap` to install all dependencies.

