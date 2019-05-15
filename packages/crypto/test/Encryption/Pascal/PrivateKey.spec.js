const fs = require('fs');
const path = require('path');
const BC = require('@pascalcoin-sbx/common').BC;
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const PrivateKeyCrypt = require('@pascalcoin-sbx/crypto').Encryption.Pascal.PrivateKey;
const PrivateKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PrivateKey;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

const CURVES = [
  Curve.CI_SECP256K1,
  Curve.CI_SECT283K1,
  Curve.CI_P521,
  Curve.CI_P384
];

describe('Crypto.Encryption.Pascal.PrivateKey', () => {

  it('can encrypt and decrypt a private key', () => {
    CURVES.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {

        // first decrypt and get a keypair
        let pkDecrypted = PrivateKeyCrypt.decrypt(
          BC.fromHex(keyInfo.encrypted),
          {password: keyInfo.password}
        );

        // encrypt and get private key encrpted
        let pkEncrypted = PrivateKeyCrypt.encrypt(pkDecrypted, {password: 'test123'});

        // decrypt and get keypair
        let pkDecrypted2 = PrivateKeyCrypt.decrypt(pkEncrypted, {password: 'test123'});

        expect(new PrivateKeyCoder().encodeToBytes(pkDecrypted2).toHex()).to.be.equal(keyInfo.enc_privkey);
      });
    });
  });

});
