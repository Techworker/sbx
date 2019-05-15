# SBX - PascalCoin Javascript Client library

A PascalCoin Javascript Client library for the browser and NodeJS.

This monorepo contains the following packages:

 - `@pascalcoin-sbx/common` - Common functionalities
 - `@pascalcoin-sbx/crypto` - Cryptographic tools
 - `@pascalcoin-sbx/epasa` - EPasa implementation
 - `@pascalcoin-sbx/json-rpc` - PascalCoin node communication via JSON-RPC
 - `@pascalcoin-sbx/signing` - Sign operations in javascript without a node
 - `@pascalcoin-sbx/graphql` - GraphQL helpers
 - `@pascalcoin-sbx/pascalcoin` - All in one package

**Dependency Tree**

 - `@pascalcoin-sbx/common`
 - `@pascalcoin-sbx/crypto`
   - `@pascalcoin-sbx/common`
 - `@pascalcoin-sbx/epasa`
   - `@pascalcoin-sbx/common`
 - `@pascalcoin-sbx/json-rpc`
   - `@pascalcoin-sbx/common`
 - `@pascalcoin-sbx/signing`
   - `@pascalcoin-sbx/common`
   - `@pascalcoin-sbx/crypto`
 - `@pascalcoin-sbx/pascalcoin`
   - `@pascalcoin-sbx/common`
   - `@pascalcoin-sbx/crypto`
   - `@pascalcoin-sbx/epasa`
   - `@pascalcoin-sbx/json-rpc`
   - `@pascalcoin-sbx/signing`
   
## Development

 - Install nodejs: https://nodejs.org
 - Install yarn: https://yarnpkg.com/
 - Install lerna: `npm install lerna -g`
 - Checkout the repository
 - run `lerna bootstrap` to install all dependencies.
