const Password = require('@pascalcoin-sbx/crypto').Encryption.Pascal.Password;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Crypto.Encryption.Pascal.Password', () => {
  it('can decrypt an PascalCoin payload', () => {
    const payload = BC.fromHex('53616C7465645F5F2D8EBC9483E82D5DC876047AFD46A568D9A6FF26033D0967882364059282EEA8616F030DAA9E3FAD5BEAB14BFEEDA3499C9A3FE5662DCD98286A7669D77E7C1B36C061811082064B3750BD071886CFB326A46BC24A42BBA1CEF461D0F3C6086883B637028999B94CF442648C9FA921E2BEB50974AFD8598A53940C68FF1EFDE3240F1504D78030E4D08F849FB0CD2C92B355EB708C89F47D5FE8A06DA8E8458A71AE5A29FE6C410E91C02DACCD4F33143BC26966F577895F30C4ADB2F928A7A6CD6016244AB16A462CD76EFF17E3B574E2A8FD3275380302CFD71F7F256A1E643FFAE2328BBD9EA0');

    expect(Password.decrypt(payload, {password: BC.fromString('test1234567890123')}).toString()).to.be.equal('this is a test');
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
