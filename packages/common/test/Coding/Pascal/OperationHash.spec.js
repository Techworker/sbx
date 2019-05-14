const fs = require('fs');
const path = require('path');

const BC = require('@pascalcoin-sbx/common').BC;
const OperationHashCoder = require('@pascalcoin-sbx/common').Coding.Pascal.OperationHash;
const OperationHashType = require('@pascalcoin-sbx/common').Types.OperationHash;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Pascal.Operationhash', () => {
  it('can decode a pascalcoin Operationhash', () => {
    const hashes = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/operation-hashes.json')));

    hashes.forEach((hashData) => {
      let oph = new OperationHashCoder().decodeFromBytes(BC.fromHex(hashData.ophash));

      expect(oph.block).to.be.equal(hashData.block);
      expect(oph.account.account).to.be.equal(hashData.account);
      expect(oph.nOperation).to.be.equal(hashData.n_operation);
      expect(oph.md160.toHex()).to.be.equal(hashData.ophash.substr(-40));
    });
  });

  it('can decode a pascalcoin Operationhash', () => {
    const hashes = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/operation-hashes.json')));

    hashes.forEach((hashData) => {
      let opHash = new OperationHashType(hashData.block, hashData.account, hashData.n_operation, hashData.ophash.substr(-40));
      let hex = new OperationHashCoder().encodeToBytes(opHash).toHex();

      expect(hex).to.be.equal(hashData.ophash);
    });
  });
});
