const Base58 = require('@sbx/epasa').Types.Base58;
const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Types.EPasa.Base58', () => {
  it('can be initialized with valid characters', () => {
    new Base58('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ');
  });
  it('cannot be initialized with an invalid base58 character', () => {
    expect(() => new Base58('"')).to.throw();
    expect(() => new Base58('ä')).to.throw();
    expect(() => new Base58('.')).to.throw();
    expect(() => new Base58('@')).to.throw();
    expect(() => new Base58('l')).to.throw();
    expect(() => new Base58('I')).to.throw();
    expect(() => new Base58('O')).to.throw();
  });

  it('can be initialized with an existing instance', () => {
    let a1 = new Base58('A');
    let a2 = new Base58(a1);

    expect(a1.toString()).to.be.equal(a2.toString());
  });

  it('will skip empty validation', () => {
    let a1 = new Base58('');

    expect(a1.toString()).to.be.equal('');
  });
});
