const Password = require('@pascalcoin-sbx/crypto').Encryption.Pascal.Password;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Crypto.Encryption.Pascal.Password', () => {
  it('can decrypt an PascalCoin payload', () => {
    const payload = BC.fromHex('53616C7465645F5F089E95BD2AB01F7F7A5676AAD28B27ABF7235CBAACCCBE08');

    expect(Password.decrypt(payload, {password: 'test1234567890123'}).toString()).to.be.equal('this is a test');
  });

  it('can encrypt a payload an decrypt it later on', () => {
    const payload = BC.fromString('techworker');
    const password = 'test123';

    const encrypted = Password.encrypt(payload, { password: BC.fromString(password)});

    expect(Password.decrypt(encrypted, {password: BC.fromString(password)}).toString()).to.be.equal(payload.toString());
  });

  it('throws an error if decryption fails', () => {
    expect(() =>  Password.decrypt(
      BC.fromString('test'),
      {password: BC.fromString('ABC')}
    )).to.throw();
  });

});
