const Ascii = require('@sbx/epasa').Types.Ascii;
const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Types.EPasa.Ascii', () => {
  it('can be initialized with a string from 32 to 126', () => {
    for (let i = 32; i <= 126; i++) {
      expect(new Ascii(String.fromCharCode(i)).toString()).to.be.equal(String.fromCharCode(i));
    }
  });
  it('cannot be initialized with a string < 32 or > 126', () => {
    for (let i = 0; i < 32; i++) {
      expect(() => Ascii.validate(String.fromCharCode(i)).to.throw());
    }
    for (let i = 127; i < 256; i++) {
      expect(() => Ascii.validate(String.fromCharCode(i)).to.throw());
    }
  });

  it('can be initialized with an existing instance', () => {
    let a1 = new Ascii('A');
    let a2 = new Ascii(a1);

    expect(a1.toString()).to.be.equal(a2.toString());
  });

  it('will skip empty validation', () => {
    let a1 = new Ascii('');

    expect(a1.toString()).to.be.equal('');
  });

  it('will escape certain characters', () => {
    expect(new Ascii('{').toStringEscaped()).to.be.equal('\\{');
    expect(new Ascii('}').toStringEscaped()).to.be.equal('\\}');
    expect(new Ascii('(').toStringEscaped()).to.be.equal('\\(');
    expect(new Ascii(')').toStringEscaped()).to.be.equal('\\)');
    expect(new Ascii('"').toStringEscaped()).to.be.equal('\\"');
    expect(new Ascii('\\').toStringEscaped()).to.be.equal('\\\\');
    expect(new Ascii(':').toStringEscaped()).to.be.equal('\\:');
    expect(new Ascii('<').toStringEscaped()).to.be.equal('\\<');
    expect(new Ascii('>').toStringEscaped()).to.be.equal('\\>');
    expect(new Ascii('[').toStringEscaped()).to.be.equal('\\[');
    expect(new Ascii(']').toStringEscaped()).to.be.equal('\\]');
  });

  it('will get a value identifying an escape sequence', () => {
    expect(Ascii.isEscape('\\', '{')).to.be.equal(true);
    expect(Ascii.isEscape('\\', '}')).to.be.equal(true);
    expect(Ascii.isEscape('\\', '(')).to.be.equal(true);
    expect(Ascii.isEscape('\\', ')')).to.be.equal(true);
    expect(Ascii.isEscape('\\', '"')).to.be.equal(true);
    expect(Ascii.isEscape('\\', '\\')).to.be.equal(true);
    expect(Ascii.isEscape('\\', ':')).to.be.equal(true);
    expect(Ascii.isEscape('\\', '<')).to.be.equal(true);
    expect(Ascii.isEscape('\\', '>')).to.be.equal(true);
    expect(Ascii.isEscape('\\', '[')).to.be.equal(true);
    expect(Ascii.isEscape('\\', ']')).to.be.equal(true);

    expect(Ascii.isEscape('\\', 'A')).to.be.equal(false);
    expect(Ascii.isEscape('\\', 'B')).to.be.equal(false);
    expect(Ascii.isEscape('\\', 'C')).to.be.equal(false);
    expect(Ascii.isEscape('\\', '1')).to.be.equal(false);
    expect(Ascii.isEscape('\\', '2')).to.be.equal(false);
    expect(Ascii.isEscape('\\', '3')).to.be.equal(false);
  });
});
