const fs = require('fs');
const path = require('path');

const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const PrivateKey = require('@pascalcoin-sbx/common').Types.Keys.PrivateKey;
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const KeyPair = require('@pascalcoin-sbx/common').Types.Keys.KeyPair;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

const curves = [
  Curve.CI_SECP256K1,
  Curve.CI_SECT283K1,
  Curve.CI_P521,
  Curve.CI_P384
];

describe('Core.Types.Keys.KeyPair', () => {
  it('can be created from a public and private key', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let priv = PrivateKey.decode(BC.fromHex(keyInfo.enc_privkey));
        let pub = PublicKey.fromBase58(keyInfo.b58_pubkey);

        const kp = new KeyPair(priv, pub);

        expect(kp.publicKey.toBase58()).to.be.equal(keyInfo.b58_pubkey);
        expect(kp.privateKey.encode().toHex()).to.be.equal(keyInfo.enc_privkey);
        expect(kp.curve.id).to.be.equal(c);
      });
    });
  });
  it('does not allow different curves', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let priv = PrivateKey.decode(BC.fromHex(keyInfo.enc_privkey));

        let b58wrong;

        if (c === 714) {
          // a 715 key
          b58wrong = 'gD8AW4sifppye1utSGPZn2TpTkTXd1EAxGiGTfEEZe87JXCx7oCKFw3ew6hz8E5RB66NuMjSzp59qWu4YrwSEjBh4P9RSsb2Xhc5z7rA4feG5eCAz9mQYqCTQRYsDQHwtftCxMRB625c5X7b4';
        } else {
          // a 714 key
          b58wrong = '3GhhbopVb9wfo4HzecYwKYMWRvLCssTeFWjocfnWv12Yt3GtaW3seeatH9GqhVmnYrF586RKLwjFFMYn7Txq8X2D4qT7CbqrZgbdRm';
        }
        let pub = PublicKey.fromBase58(b58wrong);

        expect(() => new KeyPair(priv, pub)).to.throw();
      });
    });
  });
});
