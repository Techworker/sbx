const Payload = require('@sbx/crypto').Payload;
const BC = require('@sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Crypto.Payload', () => {
  it('can decrypt an PascalCoin payload', () => {
    const payload = BC.fromHex('53616C7465645F5F3418C3D7C851A60F2E90E714FFD4C6D352830DAD1D48F8C2');

    expect(Payload.decryptUsingPassword(payload, BC.fromString('test123')).toString()).to.be.equal('this is a test');
  });

  it('can encrypt a payload an decrypt it later on', () => {
    const payload = BC.fromString('techworker');
    const password = 'test123';

    const encrypted = Payload.encryptUsingPassword(payload, BC.fromString(password));

    expect(Payload.decryptUsingPassword(encrypted, BC.fromString(password)).toString()).to.be.equal(payload.toString());
  });

  it('returns false if decryption fails', () => {
    let falseRes = Payload.decryptUsingPassword(
      BC.fromString('test'),
      BC.fromString('ABC')
    );

    expect(falseRes).to.be.equal(false);
  });

});
