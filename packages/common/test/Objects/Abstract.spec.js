const Abstract = require('@pascalcoin-sbx/common').Objects.Abstract;
const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.Abstract', () => {
  it('cant be initialized directly', () => {
    expect(() => new Abstract()).to.throw();
  });
});
