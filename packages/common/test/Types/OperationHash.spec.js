const fs = require('fs');
const path = require('path');
const OperationHash = require('@pascalcoin-sbx/common').Types.OperationHash;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.OperationHash', () => {
  it('can be created manually and returns correct initialization values', () => {
    const oph = new OperationHash(1, 2, 3, BC.fromHex('AA'.repeat(20)));

    expect(oph.block).to.be.equal(1);
    expect(oph.account.account).to.be.equal(2);
    expect(oph.nOperation).to.be.equal(3);
    expect(oph.md160.toHex()).to.be.equal('AA'.repeat(20));
  });

  it('checks a valid md160', () => {
    expect(() => new OperationHash(1, 2, 3, BC.fromHex('AA'.repeat(10)))).to.throw();
  });

  it('can be decoded from existing hashes', () => {
    const hashes = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/operation-hashes.json')));

    hashes.forEach((hashData) => {
      let oph = OperationHash.decode(BC.fromHex(hashData.ophash));

      expect(oph.block).to.be.equal(hashData.block);
      expect(oph.account.account).to.be.equal(hashData.account);
      expect(oph.nOperation).to.be.equal(hashData.n_operation);
      expect(oph.md160.toHex()).to.be.equal(hashData.ophash.substr(-40));
    });
  });

  it('can be decode and encode', () => {
    const hashes = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/operation-hashes.json')));

    hashes.forEach((hashData) => {
      let oph = OperationHash.decode(BC.fromHex(hashData.ophash));

      expect(oph.encode().toHex()).to.be.equal(hashData.ophash);
    });
  });

  it('can be encoded as a pending ophash', () => {
    const hashes = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/operation-hashes.json')));

    hashes.forEach((hashData) => {
      let oph = OperationHash.decode(BC.fromHex(hashData.ophash));

      expect(oph.encodeAsPending().toHex()).to.be.equal('00000000' + hashData.ophash.substr(8));
    });
  });

});
