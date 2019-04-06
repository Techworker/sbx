const chai = require('chai');
const EPasaParser = require('@sbx/epasa').Parser;
const EPasa = require('@sbx/epasa').EPasa;
const BC = require('@sbx/common').BC;

chai.expect();
const expect = chai.expect;

describe('Layer2.EPasa.Parser', () => {
  it('can be created from a simple PASA', () => {
    let ep = EPasaParser.parse('77');

    expect(ep.accountNumber.toString()).to.be.equal('77-44');
    expect(ep.accountNumber.checksum).to.be.equal(44);
    expect(ep.accountNumber.account).to.be.equal(77);
    expect(ep.isNonDetermistic()).to.be.equal(true);
  });

  it('can be created from a simple PASA with checksum', () => {
    let ep = EPasaParser.parse('77-44');

    expect(ep.accountNumber.toString()).to.be.equal('77-44');
    expect(ep.accountNumber.checksum).to.be.equal(44);
    expect(ep.accountNumber.account).to.be.equal(77);
    expect(ep.isNonDetermistic()).to.be.equal(true);
  });
  it('can be created from a PASA 0', () => {
    let ep = EPasaParser.parse('0');

    expect(ep.accountNumber.toString()).to.be.equal('0-10');
    expect(ep.accountNumber.checksum).to.be.equal(10);
    expect(ep.accountNumber.account).to.be.equal(0);
    expect(ep.isNonDetermistic()).to.be.equal(true);
  });
  it('detects invalid pasa', () => {
    expect(() => EPasaParser.parse('077')).to.throw();
    expect(() => EPasaParser.parse('77s')).to.throw();
    expect(() => EPasaParser.parse('77s-44')).to.throw();
    expect(() => EPasaParser.parse('77 -44')).to.throw();
    expect(() => EPasaParser.parse('77-444')).to.throw();
    expect(() => EPasaParser.parse('77-4c')).to.throw();
  });
  it('detects invalid checksum', () => {
    expect(() => EPasaParser.parse('77:1000')).to.throw();
  });
  it('detects too long public ascii payloads', () => {
    let ep = new EPasa();

    ep.encryption = EPasa.ENC_PUBLIC;
    ep.format = EPasa.FORMAT_ASCII;

    // invalid payload
    expect(() => (ep.payload = BC.fromString('A'.repeat(256)))).to.throw();

    // valid payload
    ep.payload = BC.fromString('A'.repeat(255));
  });
  it('detects too long public hex payloads', () => {
    let ep = new EPasa();

    ep.encryption = EPasa.ENC_PUBLIC;
    ep.format = EPasa.FORMAT_HEX;

    // invalid payload
    expect(() => (ep.payload = BC.fromHex('F'.repeat(512)))).to.throw();

    // valid payload
    ep.payload = BC.fromHex('A'.repeat(510));
  });
  it('detects too long public base8 payloads', () => {
    let ep = new EPasa();

    ep.encryption = EPasa.ENC_PUBLIC;
    ep.format = EPasa.FORMAT_BASE58;

    // invalid payload
    expect(() => (ep.payload = BC.fromString('B'.repeat(349)))).to.throw();

    // valid payload
    ep.payload = BC.fromHex('B'.repeat(348));
  });
  it('detects too long AES ascii payloads', () => {
    let ep = new EPasa();

    ep.password = 'A';
    ep.encryption = EPasa.ENC_PASSWORD;
    ep.format = EPasa.FORMAT_ASCII;

    // invalid payload
    expect(() => (ep.payload = BC.fromString('A'.repeat(224)))).to.throw();

    // valid payload
    ep.payload = BC.fromString('A'.repeat(223));
  });
  it('detects too long AES hex payloads', () => {
    let ep = new EPasa();

    ep.password = 'A';

    ep.encryption = EPasa.ENC_PASSWORD;
    ep.format = EPasa.FORMAT_HEX;

    // invalid payload
    expect(() => (ep.payload = BC.fromHex('F'.repeat(448)))).to.throw();

    // valid payload
    ep.payload = BC.fromHex('A'.repeat(446));
  });
  it('detects too long AES base8 payloads', () => {
    let ep = new EPasa();

    ep.password = 'A';
    ep.encryption = EPasa.ENC_PASSWORD;
    ep.format = EPasa.FORMAT_BASE58;

    // invalid payload
    expect(() => (ep.payload = BC.fromString('B'.repeat(305)))).to.throw();

    // valid payload
    ep.payload = BC.fromHex('B'.repeat(304));
  });
  ['SENDER', 'RECEIVER'].forEach((WHO) => {
    it(`detects too long ECIES ${WHO} ascii payloads`, () => {
      let ep = new EPasa();

      ep.encryption = EPasa[`ENC_${WHO}`];
      ep.format = EPasa.FORMAT_ASCII;

      // invalid payload
      expect(() => (ep.payload = BC.fromString('A'.repeat(145)))).to.throw();

      // valid payload
      ep.payload = BC.fromString('A'.repeat(144));
    });
    it(`detects too long ECIES ${WHO} hex payloads`, () => {
      let ep = new EPasa();

      ep.encryption = EPasa[`ENC_${WHO}`];
      ep.format = EPasa.FORMAT_HEX;

      // invalid payload
      expect(() => (ep.payload = BC.fromHex('F'.repeat(290)))).to.throw();

      // valid payload
      ep.payload = BC.fromHex('A'.repeat(288));
    });
    it(`detects too long ECIES ${WHO} base58 payloads`, () => {
      let ep = new EPasa();

      ep.encryption = EPasa[`ENC_${WHO}`];
      ep.format = EPasa.FORMAT_BASE58;

      // invalid payload
      expect(() => (ep.payload = BC.value.fromString('B'.repeat(197)))).to.throw();

      // valid payload
      ep.payload = BC.fromHex('B'.repeat(196));
    });
  });
});
