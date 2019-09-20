const fs = require('fs');
const path = require('path');

const BC = require('@pascalcoin-sbx/common').BC;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;
const PublicKeyType = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const CurveType = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const chai = require('chai');
const expect = chai.expect;

const curves = [
  CurveType.CI_SECP256K1,
  CurveType.CI_SECT283K1,
  CurveType.CI_P521,
  CurveType.CI_P384
];

describe('Coding.Pascal.Keys.PublicKey', () => {
  it('can decode a pascalcoin pubkey', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = new PublicKeyCoder().decodeFromBytes(BC.fromHex(keyInfo.enc_pubkey));

        expect(key.x.toHex()).to.be.equal(keyInfo.x);
        expect(key.y.toHex()).to.be.equal(keyInfo.y);
        expect(key.curve.id).to.be.equal(keyInfo.ec_nid);
      });
    });
  });

  it('can decode a pascalcoin pubkey from base58', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = new PublicKeyCoder().decodeFromBase58(keyInfo.b58_pubkey);

        expect(key.x.toHex()).to.be.equal(keyInfo.x);
        expect(key.y.toHex()).to.be.equal(keyInfo.y);
        expect(key.curve.id).to.be.equal(keyInfo.ec_nid);
      });
    });
  });

  it('can encode a pascalcoin pubkey', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = new PublicKeyCoder().decodeFromBytes(BC.fromHex(keyInfo.enc_pubkey));

        expect(new PublicKeyCoder().encodeToBytes(key).toHex()).to.be.equal(keyInfo.enc_pubkey);
      });
    });
  });

  it('can encode a pascalcoin pubkey to base58', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../../fixtures/public-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let key = new PublicKeyCoder().decodeFromBytes(BC.fromHex(keyInfo.enc_pubkey));

        expect(new PublicKeyCoder().encodeToBase58(key)).to.be.equal(keyInfo.b58_pubkey);
      });
    });
  });

  it('can en-/decode a pascalcoin pubkey without lengths', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../../fixtures/public-keys/curve_' + c + '.json')));

      const prefixes = {
        714: 'CA02',
        715: 'CB02',
        716: 'CC02',
        729: 'D902'
      };

      keys.forEach((keyInfo) => {
        let key = new PublicKeyCoder('test', true).decodeFromBytes(BC.fromHex(prefixes[c] + keyInfo.x + keyInfo.y));
        expect(new PublicKeyCoder('test', true).encodeToBytes(key).toHex()).to.be.equal(prefixes[c] + keyInfo.x + keyInfo.y);
      });
    });
  });

});
