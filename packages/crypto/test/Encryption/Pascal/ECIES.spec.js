const ECIES = require('@pascalcoin-sbx/crypto').Encryption.Pascal.ECIES;
const Keys = require('@pascalcoin-sbx/crypto').Keys;
const PrivateKeyCrypt = require('@pascalcoin-sbx/crypto').Encryption.Pascal.PrivateKey;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Crypto.Encryption.Pascal.ECIES', () => {
  it('can decrypt an PascalCoin payload', () => {
    let keyPair = Keys.fromPrivateKey(
      PrivateKeyCrypt.decrypt(
        BC.from('53616C7465645F5F1CD34699BAFAD73EAE8A574154F08760BF8E8B9A554CA9691819BA06962D4A3774B9ACADA4B75471A85A10B2C418A56B1AFFF8F560AC6F66'),
        {password: 'test123'}
      )
    );

    const payloads = JSON.parse(require('fs').readFileSync(__dirname + '/../../fixtures/ecies.json'));

    payloads.forEach((pl) => {
      expect(ECIES.decrypt(pl.encrypted, {keyPair}).toString()).to.be.equal(pl.decrypted);
    });
  });

  it('can encrypt and decrypt a value', () => {
    let keyPair = Keys.fromPrivateKey(
      PrivateKeyCrypt.decrypt(
        BC.from('53616C7465645F5F1CD34699BAFAD73EAE8A574154F08760BF8E8B9A554CA9691819BA06962D4A3774B9ACADA4B75471A85A10B2C418A56B1AFFF8F560AC6F66'),
        {password: 'test123'}
      )
    );

    let encrypted = ECIES.encrypt(BC.from('test123'), {publicKey: keyPair.publicKey});
    expect(ECIES.decrypt(encrypted, {keyPair}).toString()).to.be.equal('test123');
  });


  it('can will throw an error if decryption fails', () => {
    let keyPair = Keys.fromPrivateKey(
      PrivateKeyCrypt.decrypt(
        BC.from('53616C7465645F5F1CD34699BAFAD73EAE8A574154F08760BF8E8B9A554CA9691819BA06962D4A3774B9ACADA4B75471A85A10B2C418A56B1AFFF8F560AC6F66'),
        {password: 'test123'}
      )
    );

    expect(() => ECIES.decrypt(BC.fromString('Hello'), {keyPair})).to.throw();
  });
});
