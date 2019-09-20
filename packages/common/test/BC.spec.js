const chai = require('chai');
const BC = require('@pascalcoin-sbx/common').BC;
const Endian = require('@pascalcoin-sbx/common').Endian;

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

  it('will fallback to string in case hex parsing failed', () => {
    expect(BC.from('test').toString()).to.be.equal('test');
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

  it('can split into same size arrays', () => {
    let bc = BC.fromString('ABCDEFGHIJK');
    let splitted = bc.split(2);

    expect(splitted.length).to.be.equal(6);
    expect(splitted[0].toString()).to.be.equal('AB');
    expect(splitted[1].toString()).to.be.equal('CD');
    expect(splitted[2].toString()).to.be.equal('EF');
    expect(splitted[3].toString()).to.be.equal('GH');
    expect(splitted[4].toString()).to.be.equal('IJ');
    expect(splitted[5].toString()).to.be.equal('K');
  });

  it('can create an empty instance', () => {
    expect(BC.empty().toHex()).to.be.equal('');
  });

  it('can read an int8 from', () => {
    const v = BC.fromHex('0C9B');
    expect(v.readInt8(0, true)).to.be.equal(12);
    expect(v.readInt8(1, true)).to.be.equal(155);

    const vu = BC.fromHex('14EC');
    expect(vu.readInt8(0, false)).to.be.equal(20);
    expect(vu.readInt8(1, false)).to.be.equal(-20);
  });

  it('can read an int16 from', () => {
    const v = BC.fromHex('14009B00');
    expect(v.readInt16(0, true, Endian.LITTLE_ENDIAN)).to.be.equal(20);
    expect(v.readInt16(2, true, Endian.LITTLE_ENDIAN)).to.be.equal(155);

    const v2 = BC.fromHex('0014009B');
    expect(v2.readInt16(0, true, Endian.BIG_ENDIAN)).to.be.equal(20);
    expect(v2.readInt16(2, true, Endian.BIG_ENDIAN)).to.be.equal(155);

    const v3 = BC.fromHex('1400ECFF');
    expect(v3.readInt16(0, false, Endian.LITTLE_ENDIAN)).to.be.equal(20);
    expect(v3.readInt16(2, false, Endian.LITTLE_ENDIAN)).to.be.equal(-20);

    const v4 = BC.fromHex('0014FFEC');
    expect(v4.readInt16(0, false, Endian.BIG_ENDIAN)).to.be.equal(20);
    expect(v4.readInt16(2, false, Endian.BIG_ENDIAN)).to.be.equal(-20);
  });

  it('can read an int32 from', () => {
    const v = BC.fromHex('140000009B000000');
    expect(v.readInt32(0, true, Endian.LITTLE_ENDIAN)).to.be.equal(20);
    expect(v.readInt32(4, true, Endian.LITTLE_ENDIAN)).to.be.equal(155);

    const v2 = BC.fromHex('000000140000009B');
    expect(v2.readInt32(0, true, Endian.BIG_ENDIAN)).to.be.equal(20);
    expect(v2.readInt32(4, true, Endian.BIG_ENDIAN)).to.be.equal(155);

    const v3 = BC.fromHex('14000000ECFFFFFF');
    expect(v3.readInt32(0, false, Endian.LITTLE_ENDIAN)).to.be.equal(20);
    expect(v3.readInt32(4, false, Endian.LITTLE_ENDIAN)).to.be.equal(-20);

    const v4 = BC.fromHex('00000014FFFFFFEC');
    expect(v4.readInt32(0, false, Endian.BIG_ENDIAN)).to.be.equal(20);
    expect(v4.readInt32(4, false, Endian.BIG_ENDIAN)).to.be.equal(-20);
  });

  it('can write an int8', () => {
    expect(BC.fromInt8(12, true).toHex()).to.be.equal('0C');
    expect(BC.fromInt8(-20, false).toHex()).to.be.equal('EC');
  });
  it('can write an int16', () => {
    expect(BC.fromInt16(20, true, Endian.LITTLE_ENDIAN).toHex()).to.be.equal('1400');
    expect(BC.fromInt16(155, true, Endian.BIG_ENDIAN).toHex()).to.be.equal('009B');
    expect(BC.fromInt16(-20, false, Endian.LITTLE_ENDIAN).toHex()).to.be.equal('ECFF');
    expect(BC.fromInt16(-20, false, Endian.BIG_ENDIAN).toHex()).to.be.equal('FFEC');
  });
  it('can write an int32', () => {
    expect(BC.fromInt32(20, true, Endian.LITTLE_ENDIAN).toHex()).to.be.equal('14000000');
    expect(BC.fromInt32(155, true, Endian.BIG_ENDIAN).toHex()).to.be.equal('0000009B');
    expect(BC.fromInt32(-20, false, Endian.LITTLE_ENDIAN).toHex()).to.be.equal('ECFFFFFF');
    expect(BC.fromInt32(-20, false, Endian.BIG_ENDIAN).toHex()).to.be.equal('FFFFFFEC');
  });
});
