const CB = require('@pascalcoin-sbx/common').BC;
const AbstractType = require('@pascalcoin-sbx/common').Coding.AbstractType;
const CompositeType = require('@pascalcoin-sbx/common').Coding.CompositeType;
const StringWOL = require('@pascalcoin-sbx/common').Coding.Core.StringWithoutLength;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.AbstractType', () => {
  it('can handle default values via callback check', () => {

    const at = new StringWOL('test');

    at.withDefaultValue('test123', (v) => v === '');
    expect(at.hasDefaultValue).to.be.equal(true);
    expect(at.defaultValue).to.be.equal('test123');
    expect((at.defaultValueCallable)('')).to.be.equal(true);
    expect((at.defaultValueCallable)('testa')).to.be.equal(false);

    // take default
    expect(at.encodeToBytes('').toString()).to.be.equal('test123');

    // take given value
    expect(at.encodeToBytes('abc').toString()).to.be.equal('abc');
    expect(at.determineValue('')).to.be.equal('test123');
    expect(at.determineValue('abc')).to.be.equal('abc');
  });

  it('can contain fixed values', () => {

    const at = new StringWOL('test');

    at.withFixedValue('abc');
    expect(at.hasFixedValue).to.be.equal(true);
    expect(at.fixedValue).to.be.equal('abc');
    expect(at.encodeToBytes({}).toString()).to.be.equal('abc');
  });

  it('can handle an alternate field name (instead of id)', () => {

    const ct = new CompositeType();
    const at = new StringWOL('test');

    at.withTargetFieldName('techworker');
    ct.addSubType(at);

    expect(ct.encodeToBytes({techworker: 'hello'}).toString()).to.be.equal('hello');
    expect(() => ct.encodeToBytes({test: 'hello'}).toString()).to.throw();
  });

  it('forces you to implement encodeToBytes', () => {
    const at = new AbstractType();

    expect(() => at.encodeToBytes('abc')).to.throw();
  });
  it('forces you to implement decodeFromBytes', () => {
    const at = new AbstractType();

    expect(() => at.decodeFromBytes('ABC')).to.throw();
  });
  it('forces you to implement encodedSize', () => {
    const at = new AbstractType();

    expect(() => at.encodedSize).to.throw();
  });
  it('returns the previosly set description if no param to description() is given', () => {
    const at = new AbstractType();
    at.description('test123');
    expect(at.description()).to.be.eql(['test123']);
  });
});
