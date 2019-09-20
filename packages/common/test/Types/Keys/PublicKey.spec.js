const fs = require('fs');
const path = require('path');

const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
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

describe('Core.Types.Keys.PublicKey', () => {
  it('can be created as an empty key (used by pasc v2)', () => {
    const pubkey = PublicKey.empty();

    expect(pubkey.curve.id).to.be.equal(0);
    expect(pubkey.x.length).to.be.equal(0);
    expect(pubkey.y.length).to.be.equal(0);
  });

  it('cannot be created with wrong x/y values managed by the curve', () => {

    const curves = [
      Curve.CI_SECP256K1,
      Curve.CI_SECT283K1,
      Curve.CI_P521,
      Curve.CI_P384
    ];

    curves.forEach(c => {
      const curve = new Curve(c);

      expect(() => {
        new PublicKey(
          BC.fromHex('00'.repeat(curve.xylPublicKey('x') + 1)),
          BC.fromHex('00'.repeat(curve.xylPublicKey('x'))),
          curve
        );
      }).to.throw();
      expect(() => {
        new PublicKey(
          BC.fromHex('00'.repeat(curve.xylPublicKey('x'))),
          BC.fromHex('00'.repeat(curve.xylPublicKey('x') + 1)),
          curve
        );
      }).to.throw();
    });
  });

  it('can return a value only containing x and y', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = new PublicKeyCoder().decodeFromBytes(BC.fromHex(keyInfo.enc_pubkey));

        expect(key.ec.toHex()).to.be.equal(keyInfo.x + keyInfo.y);
      });
    });
  });

  it('can return the lengths of x and y', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = new PublicKeyCoder().decodeFromBytes(BC.fromHex(keyInfo.enc_pubkey));

        expect(key.xl).to.be.equal(keyInfo.x.length / 2);
        expect(key.yl).to.be.equal(keyInfo.y.length / 2);
      });
    });
  });

  it('erturns the correct ecdh version', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = new PublicKeyCoder().decodeFromBytes(BC.fromHex(keyInfo.enc_pubkey));

        if (key.curve.id === Curve.CI_P521) {
          expect(key.ecdh.toHex()).to.be.equal('0400' + keyInfo.x + '00' + keyInfo.y);
        } else {
          expect(key.ecdh.toHex()).to.be.equal('04' + keyInfo.x + keyInfo.y);
        }
      });
    });
  });
});
