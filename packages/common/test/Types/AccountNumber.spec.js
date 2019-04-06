const AccountNumber = require('@sbx/common').Types.AccountNumber;
const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.AccountNumber', () => {
  it('can be created from a non-checksum pasa number', () => {
    let an = new AccountNumber(77);

    expect(an.toString()).to.be.equal('77-44');
  });
  it('can be created from a non-checksum pasa string', () => {
    let an = new AccountNumber('77');

    expect(an.toString()).to.be.equal('77-44');
  });
  it('can be created from a checksummed pasa', () => {
    let an = new AccountNumber('77-44');

    expect(an.toString()).to.be.equal('77-44');
  });
  it('can be created from an existing accountnumber object', () => {
    let an = new AccountNumber(new AccountNumber('77-44'));

    expect(an.toString()).to.be.equal('77-44');
  });
  it('will fail with an invalid account number', () => {
    expect(() => new AccountNumber('-77')).to.throw();
  });
  it('will fail with an invalid account checksum', () => {
    expect(() => new AccountNumber('77-33')).to.throw();
    expect(() => new AccountNumber(true)).to.throw();
  });
  it('will deliver the correct block info', () => {
    let an = new AccountNumber(77);

    expect(an.createdInBlock).to.be.equal(15);
    an = new AccountNumber(75);
    expect(an.createdInBlock).to.be.equal(15);
    an = new AccountNumber(80);
    expect(an.createdInBlock).to.be.equal(16);
    an = new AccountNumber(0);
    expect(an.createdInBlock).to.be.equal(0);
  });
  it('will return the correct account number', () => {
    let an = new AccountNumber(77);

    expect(an.account).to.be.equal(77);
  });
  it('will return the correct checksum', () => {
    let an = new AccountNumber(77);

    expect(an.checksum).to.be.equal(44);
  });
  it('will detect if it is a developer reward account', () => {
    let an = new AccountNumber(77);

    expect(an.isFoundationReward).to.be.equal(false);
    an = new AccountNumber(1050000);
    expect(an.isFoundationReward).to.be.equal(false);

    // first dev reward account
    an = new AccountNumber(1050004);
    expect(an.isFoundationReward).to.be.equal(true);
  });
  it('can compare account number objects', () => {
    let an = new AccountNumber(77);

    expect(an.equals(new AccountNumber(77))).to.be.equal(true);
    an = new AccountNumber(77);
    expect(an.equals(new AccountNumber(99))).to.be.equal(false);
  });
});
