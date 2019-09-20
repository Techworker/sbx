const BC = require('@pascalcoin-sbx/common').BC;
const StringWithoutLength = require('@pascalcoin-sbx/common').Coding.Core.StringWithoutLength;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.StringWithoutLength', () => {
  it('can encode a string', () => {
    expect(new StringWithoutLength('test').encodeToBytes('test').toHex()).to.be.equal('74657374');
  });

  it('can decode a string', () => {
    expect(new StringWithoutLength('test').decodeFromBytes(BC.from('74657374'))).to.be.equal('test');
  });

  it('sets a default field id', () => {
    expect(new StringWithoutLength().id).to.be.equal('string_without_length');
  });

  it('sets the length', () => {
    let c = new StringWithoutLength();
    c.encodeToBytes('test');
    expect(c.encodedSize).to.be.equal(4);
  });

  it('will not accept something that is not a string', () => {
    expect(() => new StringWithoutLength(false).encodeToBytes(123)).to.throw();
    expect(() => new StringWithoutLength(false).encodeToBytes(() => 'A')).to.throw();
  });
});
