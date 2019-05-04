const fs = require('fs');
const path = require('path');
const Keys = require('@pascalcoin-sbx/crypto').Keys;
const BC = require('@pascalcoin-sbx/common').BC;
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const KeyPair = require('@pascalcoin-sbx/common').Types.Keys.KeyPair;
const PrivateKey = require('@pascalcoin-sbx/common').Types.Keys.PrivateKey;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const pkCoder = new PublicKeyCoder();

const chai = require('chai');

chai.expect();
const expect = chai.expect;

const CURVE_INSTANCES = [new Curve(Curve.CN_SECP256K1), new Curve(Curve.CN_P384), new Curve(Curve.CN_P521), , new Curve(Curve.CI_SECT283K1), new Curve(0)];

const CURVES = [
  Curve.CI_SECP256K1,
  Curve.CI_SECT283K1,
  Curve.CI_P521,
  Curve.CI_P384
];

describe('Crypto.Keys', () => {
  it('can generate keypairs', function (done) {
    this.timeout(0);
    CURVE_INSTANCES.forEach((curve) => {
      if (curve.supported) {
        for (let i = 0; i < 100; i++) {
          let kp = Keys.generate(curve.name);

          expect(kp).to.be.instanceof(KeyPair);
          expect(kp.curve.id).to.be.equal(curve.id);
        }
      }
    });
    done();
  });

  it('cannot generate unsupported curves', () => {
    CURVE_INSTANCES.forEach((curve) => {
      if (!curve.supported) {
        expect(() => Keys.generateKeyPair(curve)).to.throw();
      }
    });
  });

  it('can retrieve a keypair from a private key', () => {
    CURVES.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        if (new Curve(c).supported) {
          let kp = Keys.fromPrivateKey(
            PrivateKey.decode(BC.fromHex(keyInfo.enc_privkey))
          );

          expect(kp.curve.id).to.be.equal(c);
          expect(kp.privateKey.encode().toHex()).to.be.equal(keyInfo.enc_privkey);
          expect(pkCoder.encodeToBase58(kp.publicKey)).to.be.equal(keyInfo.b58_pubkey);
        } else {
          expect(() => Keys.fromPrivateKey(PrivateKey.decode(BC.fromHex(keyInfo.enc_privkey)))).to.throw();
        }
      });
    });

  });

  it('can retrieve a keypair from an encrypted private key', () => {
    CURVES.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        if (new Curve(c).supported) {
          let kp = Keys.decrypt(
            BC.fromHex(keyInfo.encrypted),
            BC.fromString(keyInfo.password)
          );

          expect(kp.curve.id).to.be.equal(c);
          expect(kp.privateKey.encode().toHex()).to.be.equal(keyInfo.enc_privkey);
          expect(pkCoder.encodeToBase58(kp.publicKey)).to.be.equal(keyInfo.b58_pubkey);
        } else {
          expect(() => Keys.decrypt(
            BC.fromHex(keyInfo.encrypted),
            BC.fromString(keyInfo.password))
          ).to.throw();
        }
      });
    });
  });

  it('can encrypt and decrypt a private key', () => {
    CURVES.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {

        if (new Curve(c).supported) {

          // first decrypt and get a keypair
          let kpDecrypted = Keys.decrypt(
            BC.fromHex(keyInfo.encrypted),
            BC.fromString(keyInfo.password)
          );

          // encrypt and get private key encrpted
          let pkEncrypted = Keys.encrypt(kpDecrypted.privateKey, BC.fromString('test123'));

          // decrypt and get keypair
          let kpDecrypted2 = Keys.decrypt(pkEncrypted, BC.fromString('test123'));

          expect(kpDecrypted2.privateKey.encode().toHex()).to.be.equal(keyInfo.enc_privkey);
        } else {
          expect(() => Keys.decrypt(BC.fromHex(keyInfo.encrypted), BC.fromString(keyInfo.password))).to.throw();
        }
      });
    });
  });

});
