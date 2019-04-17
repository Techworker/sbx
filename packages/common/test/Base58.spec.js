const fs = require('fs');
const path = require('path');
const Base58 = require('@pascalcoin-sbx/common').Base58;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');
// test lerna
chai.expect();
const expect = chai.expect;

describe('Core.Base58', () => {
  it('can encode to a base58 string', () => {

    const vectors = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/base58.json')));

    vectors.forEach((v) => {
      let input = BC.fromHex(v[0]);
      let output = v[1];

      expect(Base58.encode(input)).to.be.equal(output);
    });
  });

  it('can decode from a base58 string', () => {

    const vectors = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/base58.json')));

    vectors.forEach((v) => {
      let input = v[1];
      let output = v[0].toUpperCase();

      expect(Base58.decode(input).toHex()).to.be.equal(output);
    });
  });

});
