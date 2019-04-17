const fs = require('fs');
const path = require('path');
const Sha = require('@pascalcoin-sbx/common').Sha;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Sha', () => {
  it('uses the currect SHA256 version', () => {

    const hashes = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/sha256.json')));

    hashes.forEach((hash) => {
      let result = Sha.sha256(BC.fromString(hash.input)).toHex();

      expect(result).to.be.equal(hash.expected);
    });
  });
  it('uses the currect SHA512 version', () => {

    const hashes = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/sha512.json')));

    hashes.forEach((hash) => {
      let result = Sha.sha512(BC.fromString(hash.input)).toHex();

      expect(result).to.be.equal(hash.expected);
    });
  });
});
