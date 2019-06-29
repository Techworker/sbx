const fs = require('fs');
const path = require('path');
const Mnemonic = require('@pascalcoin-sbx/crypto').Mnemonic;
const BC = require('@pascalcoin-sbx/common').BC;
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const KeyPair = require('@pascalcoin-sbx/common').Types.Keys.KeyPair;
const PrivateKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PrivateKey;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

const LANGS = ['english', 'chinese_simplified', 'chinese_traditional', 'french', 'italian', 'japanese', 'korean', 'spanish'];

const CURVE_INSTANCES = [new Curve(Curve.CN_SECP256K1), new Curve(Curve.CN_P384), new Curve(Curve.CN_P521), , new Curve(Curve.CI_SECT283K1), new Curve(0)];

const CURVES = [
  Curve.CI_SECP256K1,
  Curve.CI_SECT283K1,
  Curve.CI_P521,
  Curve.CI_P384
];


describe('Crypto.Mnemonic', () => {
  it('can generate mnemonic', function (done) {
    this.timeout(0);
    CURVE_INSTANCES.forEach((curve) => {
      if (curve.supported) {
        LANGS.forEach((lang) => {
          const {mnemonic, kp} = Mnemonic.generate(curve.name, lang);

          expect(mnemonic).to.be.a('string');
          expect(kp).to.be.instanceof(KeyPair);
          expect(kp.curve.id).to.be.equal(curve.id);
        });
      }
    });
    done();
  });

  it('cannot generate unsupported curves', () => {
    CURVE_INSTANCES.forEach((curve) => {
      if (!curve.supported) {
        LANGS.forEach((lang) => {
          expect(() => Mnemonic.generate(curve.name, lang)).to.throw();
        });
      }
    });
  });

  it('cannot generate unsupported language', () => {
    CURVE_INSTANCES.forEach((curve) => {
      expect(() => Mnemonic.generate(curve.name, 'pig_latin')).to.throw();
    });
  });

  it('can retrieve a keypair from a mnemonic', () => {
    CURVES.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/mnemonic/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        if (new Curve(c).supported) {
          const {curve, kp} = Mnemonic.restore(keyInfo.mnemonic);

          expect(curve).to.be.equal(keyInfo.curve);
          expect(kp.curve.id).to.be.equal(c);
          expect(new PrivateKeyCoder().encodeToBytes(kp.privateKey).toHex()).to.be.equal(keyInfo.enc_privkey);
        } else {
          expect(() => Mnemonic.restore(keyInfo.mnemonic)).to.throw();
        }
      });
    });

  });

});
