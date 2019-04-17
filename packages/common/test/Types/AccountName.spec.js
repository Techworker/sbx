const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;
const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.AccountName', () => {
  it('can be initialized with a valid start pascal64 string', () => {
    new AccountName('abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-+{}[]_:"|<>,.?/~');
  });

  it('cannot be initialized with an invalid char', () => {
    for (let i = 0; i < 32; i++) {
      expect(() => new AccountName(String.fromCharCode(i)).to.throw());
    }
  });

  it('can be initialized with an existing instance', () => {
    let a1 = new AccountName('techworker');
    let a2 = new AccountName(a1);

    expect(a1.toString()).to.be.equal(a2.toString());
  });

  it('will skip empty validation', () => {
    let a1 = new AccountName('');

    expect(a1.toString()).to.be.equal('');
  });

  it('will throw an error if the encoding starts with a number', () => {
    for (let i = 0; i < 10; i++) {
      expect(() => new AccountName(i.toString() + 'techworker')).to.throw();
    }
  });

  it('will throw an error if the name is not at least 3 characters', () => {
    expect(() => new AccountName('t')).to.throw();
    expect(() => new AccountName('te')).to.throw();
  });

  it('will throw an error if a wrong char is used beyond 3 chars', () => {
    expect(() => new AccountName('techä')).to.throw();
  });

  it('will escape certain characters', () => {
    expect(new AccountName('(abc').toStringEscaped()).to.be.equal('\\(abc');
    expect(new AccountName(')abc').toStringEscaped()).to.be.equal('\\)abc');
    expect(new AccountName('{abc').toStringEscaped()).to.be.equal('\\{abc');
    expect(new AccountName('}abc').toStringEscaped()).to.be.equal('\\}abc');
    expect(new AccountName('[abc').toStringEscaped()).to.be.equal('\\[abc');
    expect(new AccountName(']abc').toStringEscaped()).to.be.equal('\\]abc');
    expect(new AccountName(':abc').toStringEscaped()).to.be.equal('\\:abc');
    expect(new AccountName('"abc').toStringEscaped()).to.be.equal('\\"abc');
    expect(new AccountName('<abc').toStringEscaped()).to.be.equal('\\<abc');
    expect(new AccountName('>abc').toStringEscaped()).to.be.equal('\\>abc');
  });

  it('will get a value identifying an escape sequence', () => {
    expect(AccountName.isEscape('\\', '(')).to.be.equal(true);
    expect(AccountName.isEscape('\\', ')')).to.be.equal(true);
    expect(AccountName.isEscape('\\', '{')).to.be.equal(true);
    expect(AccountName.isEscape('\\', '}')).to.be.equal(true);
    expect(AccountName.isEscape('\\', '[')).to.be.equal(true);
    expect(AccountName.isEscape('\\', ']')).to.be.equal(true);
    expect(AccountName.isEscape('\\', ':')).to.be.equal(true);
    expect(AccountName.isEscape('\\', '"')).to.be.equal(true);
    expect(AccountName.isEscape('\\', '<')).to.be.equal(true);
    expect(AccountName.isEscape('\\', '>')).to.be.equal(true);

    expect(AccountName.isEscape('\\', 'A')).to.be.equal(false);
    expect(AccountName.isEscape('\\', 'B')).to.be.equal(false);
    expect(AccountName.isEscape('\\', 'C')).to.be.equal(false);
    expect(AccountName.isEscape('\\', '1')).to.be.equal(false);
    expect(AccountName.isEscape('\\', '2')).to.be.equal(false);
    expect(AccountName.isEscape('\\', '3')).to.be.equal(false);
  });
});
