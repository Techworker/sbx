const fs = require('fs');
const path = require('path');
const Keys = require('@pascalcoin-sbx/crypto').Keys;
const BC = require('@pascalcoin-sbx/common').BC;
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const KeyPair = require('@pascalcoin-sbx/common').Types.Keys.KeyPair;
const PrivateKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PrivateKey;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;
const PrivateKeyCrypt = require('@pascalcoin-sbx/crypto').Encryption.Pascal.PrivateKey;

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
        for (let i = 0; i < 10; i++) {
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
            new PrivateKeyCoder().decodeFromBytes(BC.fromHex(keyInfo.enc_privkey))
          );

          expect(kp.curve.id).to.be.equal(c);
          expect(new PrivateKeyCoder().encodeToBytes(kp.privateKey).toHex()).to.be.equal(keyInfo.enc_privkey);
          expect(new PublicKeyCoder().encodeToBase58(kp.publicKey)).to.be.equal(keyInfo.b58_pubkey);
        } else {
          expect(() => Keys.fromPrivateKey(new PrivateKeyCoder().decodeFromBytes(BC.fromHex(keyInfo.enc_privkey)))).to.throw();
        }
      });
    });

  });

  it('can retrieve a keypair from an encrypted private key', () => {
    CURVES.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        if (new Curve(c).supported) {
          let pk = PrivateKeyCrypt.decrypt(
            BC.fromHex(keyInfo.encrypted),
            {password: keyInfo.password}
          );
          let kp = Keys.fromPrivateKey(pk);

          expect(kp.curve.id).to.be.equal(c);
          expect(new PrivateKeyCoder().encodeToBytes(kp.privateKey).toHex()).to.be.equal(keyInfo.enc_privkey);
          expect(new PublicKeyCoder().encodeToBase58(kp.publicKey)).to.be.equal(keyInfo.b58_pubkey);
        } else {
          expect(() => {
            let pk = PrivateKeyCrypt.decrypt(
              BC.fromHex(keyInfo.encrypted),
              {password: keyInfo.password});

            Keys.fromPrivateKey(pk);
          }).to.throw();
        }
      });
    });
  });

  it('can sign a value', () => {
    CURVES.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo, idx) => {
        if (new Curve(c).supported) {
          let pk = PrivateKeyCrypt.decrypt(
            BC.fromHex(keyInfo.encrypted),
            {password: keyInfo.password}
          );
          let kp = Keys.fromPrivateKey(pk);

          if(idx === 0) {
            if(c === 714) {
              expect(Keys.sign(kp, BC.from('test123')).r.toHex()).to.be.equal('4C3492DC3FB565D9D4C132575BCEAA55571491A983A82A5460E341198E38C250');
              expect(Keys.sign(kp, BC.from('test123')).s.toHex()).to.be.equal('7FA6FF43CD3B13F6E91F810FEF9BE6359CA355C53272C841D2BF934217EE53DE');
            }
            if(c === 715) {
              expect(Keys.sign(kp, BC.from('test123')).r.toHex()).to.be.equal('D4D78EB2C5C261BB655A039A41A6EFF8E64DA9B68289B33CAF574BD05B7B5AE0B6D78DAA74618EFDF1577302B2FEC531');
              expect(Keys.sign(kp, BC.from('test123')).s.toHex()).to.be.equal('F1A0942153E3FD6535328F7F1F20D6D3815F0CF3AC8B42D3843E7CAECF5704DF52693B15B38F2BFA41635E6845B1FCD9');
            }
            if(c === 716) {
              expect(Keys.sign(kp, BC.from('test123')).r.toHex()).to.be.equal('AA1AA25D38BACCE86AC2107EC951A61C36357FFBF0906744849149BE423AFA13DDB459261E9361E2A8397D6F73989AEDE838042D46B615D2169A3F0DF199C72EDE');
              expect(Keys.sign(kp, BC.from('test123')).s.toHex()).to.be.equal('1B278156ABAC764EE22D26332FB7DAADC6321CEA91C61D2DE1346437FB4B070CF9A9FFB7911CF880DD4DF6DE13C4F8E69F4B8DC5A309CA5ABD30A3EE37469E4B98');
            }
            if(c === 729) {
              // not supported
            }
          }
        } else {
          expect(() => {
            let pk = PrivateKeyCrypt.decrypt(
              BC.fromHex(keyInfo.encrypted),
              {password: keyInfo.password});

            Keys.fromPrivateKey(pk);
          }).to.throw();
        }
      });
    });
  });

  it('will generate a keypair with the default curve if no curve is given', () => {
    expect(Keys.generate().curve.id).to.be.equal(Curve.getDefaultCurve().id);
  });
  it('will throw an exception of the curve is not supported', () => {
    expect(() => Keys.generate(Curve.CI_SECT283K1)).to.throw();
  });
});
