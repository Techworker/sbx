const fs = require('fs');
const path = require('path');
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const SignedOperation = require('@pascalcoin-sbx/common').Objects.SignedOperation;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.SignedOperation', () => {
  it('can be created from raw and contains valid values', () => {
    const raws = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/signed_operations.json')));

    raws.forEach((raw) => {
      let s = SignedOperation.createFromObject(raw);

      expect(s.fee).to.be.instanceof(Currency);
      expect(s.fee.toString()).to.be.equal(raw.fee_s);
      expect(s.amount).to.be.instanceof(Currency);
      expect(s.amount.toString()).to.be.equal(raw.amount_s);

      expect(s.countOperations).to.be.equal(raw.operations);
      expect(s.rawOperations.toHex()).to.be.equal(raw.rawoperations);
    });

  });
});
