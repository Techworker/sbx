const chai = require('chai');
const BC = require('@pascalcoin-sbx/common').BC;

chai.expect();
const expect = chai.expect;

describe('Core.BC', () => {
  it('can be statically create from a hex string', () => {
    const hexString = '02CA';

    expect(BC.fromHex(hexString).toHex()).to.be.equal(hexString);
  });
  it('can be statically created from an int', () => {
    const val = 714;

    expect(BC.fromInt(val).toHex()).to.be.equal('02CA');
  });
  it('will append a leading 0 in case of mod 2 == 1 && not strict mode', () => {
    const hexString = '2CA';

    expect(BC.fromHex(hexString, false).toHex()).to.be.equal(`0${hexString}`);
  });
  it('will not append a leading 0 in case of mod 2 == 1 && strict mode', () => {
    const hexString = '2CA';

    expect(() => BC.fromHex(hexString).toHex()).to.throw();
  });
  it('will return the length of the bytes', () => {
    const hexString = 'ABABABABAB';

    expect(BC.fromHex(hexString).length).to.be.equal(5);
  });
  it('will return the length of the resulting hexastring', () => {
    const hexString = 'ABABABABAB';

    expect(BC.fromHex(hexString).hexLength).to.be.equal(10);
  });
  it('can concat one or more hexastrings', () => {
    const hexas = ['ABCD', '0020', 'FFFFFFDD'].map(hex => BC.fromHex(hex));

    expect(BC.concat(...hexas).toHex()).to.be.equal('ABCD0020FFFFFFDD');
  });
  it('can append a hexastring to an existing hexastring', () => {
    const base = BC.fromHex('ABCD');
    const append = BC.fromHex('DCBA');

    expect(base.append(append).toHex()).to.be.equal('ABCDDCBA');
  });
  it('prepend append a hexastring to an existing hexastring', () => {
    const base = BC.fromHex('ABCD');
    const prepend = BC.fromHex('DCBA');

    expect(base.prepend(prepend).toHex()).to.be.equal('DCBAABCD');
  });
  it('can slice parts', () => {
    const base = BC.fromHex('0123456789ABCDEF');
    const firstTwo = base.slice(0, 2);
    const midTwo = base.slice(4, 6);
    const lastTwo = base.slice(7);

    expect(firstTwo.toHex()).to.be.equal('0123');
    expect(midTwo.toHex()).to.be.equal('89AB');
    expect(lastTwo.toHex()).to.be.equal('EF');
  });
  it('can return the results as a string', () => {
    const h = BC.fromString('Hello Techworker');

    expect(h.toString()).to.be.equal('Hello Techworker');
  });
  it('can return the results as an int', () => {
    const h = BC.fromInt(714);

    expect(h.toInt()).to.be.equal(714);
  });
  it('can return the results as hex', () => {
    const h = BC.fromHex('ABCD');

    expect(h.toHex()).to.be.equal('ABCD');
  });
  it('will throw an error when initializing from hex with non hex nibble', () => {
    expect(
      () => BC.fromHex('ZZ')
    ).to.throw();
  });
  it('can handle existing BC in fromHex', () => {
    const h = BC.fromHex('ABCD');
    const b = BC.fromHex(h);

    expect(b.toHex()).to.be.equal('ABCD');
  });
  it('can handle existing BC in fromString', () => {
    const h = BC.fromString('TW');
    const b = BC.fromString(h);

    expect(b.toHex()).to.be.equal('5457');
  });
  it('returns a copy of the buffer and the originl buffer stays untouched', () => {
    const h = BC.fromHex('5457');
    const buffer = h.buffer;

    buffer[0] = 85;

    expect(buffer.toString()).to.be.equal('UW');
    expect(h.toString()).to.be.equal('TW');
  });
  it('will fill up missing bytes when initialized from an int with size', () => {
    const h = BC.fromInt(1, 3);

    expect(h.toHex()).to.be.equal('000001');
  });
  it('can return a lowercased hex value', () => {
    const h = BC.fromHex('AABB');

    expect(h.toHex(true)).to.be.equal('aabb');
  });
  it('can compare', () => {
    const h = BC.fromHex('AABB');
    const h2 = BC.fromHex('AABB');
    const h3 = BC.fromHex('AABBCC');

    expect(h.equals(h2)).to.be.equal(true);
    expect(h.equals(h3)).to.be.equal(false);
  });

  it('can be initialized via from', () => {
    // hex string
    expect(BC.from('ABAB').toHex()).to.be.equal('ABAB');

    // string
    expect(BC.from('test', 'string').toString()).to.be.equal('test');

    // buffer
    expect(BC.from(BC.from('ABAB').buffer).toHex()).to.be.equal('ABAB');

    // BC
    expect(BC.from(BC.from('ABAB')).toHex()).to.be.equal('ABAB');

    // uint8array
    expect(BC.from(new Uint8Array(BC.from('ABAB').buffer)).toHex()).to.be.equal('ABAB');
  });
});
