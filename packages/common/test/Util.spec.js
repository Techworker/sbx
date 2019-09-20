const chai = require('chai');
const Util = require('@pascalcoin-sbx/common').Util;

chai.expect();
const expect = chai.expect;

describe('Common.Util', () => {
  it('is able to check if a string is a string', () => {
    expect(Util.isString('abc')).to.be.equal(true);
    expect(Util.isString(123)).to.be.equal(false);
    expect(Util.isString(new String('abc'))).to.be.equal(true);
    expect(Util.isString(() => 'A')).to.be.equal(false);
  });
  it('is able to check if a number is a number', () => {
    expect(Util.isNumber(1)).to.be.equal(true);
    expect(Util.isNumber(-1)).to.be.equal(true);
    expect(Util.isNumber(NaN)).to.be.equal(false);
    expect(Util.isNumber('ABC')).to.be.equal(false);
  });
});
