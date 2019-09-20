const BC = require('@pascalcoin-sbx/common').BC;
const Repeating = require('@pascalcoin-sbx/common').Coding.Repeating;
const Int8 = require('@pascalcoin-sbx/common').Coding.Core.Int8;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.Repeating', () => {
  it('can encode a list of subtypes', () => {

    const repeatCoder = new Int8('test', true);
    const coder = new Repeating('test', repeatCoder);
    const encoded = coder.encodeToBytes([1, 2, 3]);
    expect(encoded.toHex()).to.be.equal('010203');
  });

  it('can decode a list of subtypes', () => {

    const repeatCoder = new Int8('test', true);
    const coder = new Repeating('test', repeatCoder);
    const decoded = coder.decodeFromBytes(BC.from('010203'));
    expect(decoded[0]).to.be.equal(1);
    expect(decoded[1]).to.be.equal(2);
    expect(decoded[2]).to.be.equal(3);
  });

  it('can encode a limited list of subtypes', () => {

    const repeatCoder = new Int8('test', true);
    const coder = new Repeating('test', repeatCoder, 2);
    const encoded = coder.encodeToBytes([1, 2, 3]);
    expect(encoded.toHex()).to.be.equal('0102');
  });

  it('can decode a limited list of subtypes', () => {

    const repeatCoder = new Int8('test', true);
    const coder = new Repeating('test', repeatCoder, 2);
    const decoded = coder.decodeFromBytes(BC.from('010203'));
    expect(decoded[0]).to.be.equal(1);
    expect(decoded[1]).to.be.equal(2);
    expect(decoded.length).to.be.equal(2);
  });
  it('sets a default field id', () => {
    expect(new Repeating(false, null).id).to.be.equal('repeating');
  });

  it('returns the repeating type for the elements', () => {
    const repeatCoder = new Int8('test', true);
    const coder = new Repeating('test', repeatCoder);
    expect(coder.repeatingType).to.be.equal(repeatCoder);
  });

  it('returns the encoded size', () => {
    const repeatCoder = new Int8('test', true);
    const coder = new Repeating('test', repeatCoder);
    coder.encodeToBytes([1,2,3]);

    expect(coder.encodedSize).to.be.equal(3);
  });

});
