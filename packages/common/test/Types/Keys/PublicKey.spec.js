const fs = require('fs');
const path = require('path');

const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
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

    expect(pubkey.encode().toHex()).to.be.equal('000000000000');
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

  it('can decode a pascalcoin pubkey', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = PublicKey.decode(BC.fromHex(keyInfo.enc_pubkey));

        expect(key.x.toHex()).to.be.equal(keyInfo.x);
        expect(key.y.toHex()).to.be.equal(keyInfo.y);
        expect(key.curve.id).to.be.equal(keyInfo.ec_nid);
      });
    });
  });

  it('can decode a pascalcoin pubkey from base58', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = PublicKey.fromBase58(keyInfo.b58_pubkey);

        expect(key.x.toHex()).to.be.equal(keyInfo.x);
        expect(key.y.toHex()).to.be.equal(keyInfo.y);
        expect(key.curve.id).to.be.equal(keyInfo.ec_nid);
      });
    });
  });

  it('can encode a pascalcoin pubkey', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = PublicKey.decode(BC.fromHex(keyInfo.enc_pubkey));

        expect(key.encode().toHex()).to.be.equal(keyInfo.enc_pubkey);
      });
    });
  });

  it('can encode a pascalcoin pubkey to base58', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = PublicKey.decode(BC.fromHex(keyInfo.enc_pubkey));

        expect(key.toBase58()).to.be.equal(keyInfo.b58_pubkey);
      });
    });
  });

  it('can return a value only containing x and y', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = PublicKey.decode(BC.fromHex(keyInfo.enc_pubkey));

        expect(key.ec.toHex()).to.be.equal(keyInfo.x + keyInfo.y);
      });
    });
  });
});
