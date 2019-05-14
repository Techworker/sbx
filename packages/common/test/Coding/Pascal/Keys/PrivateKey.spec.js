const fs = require('fs');
const path = require('path');

const BC = require('@pascalcoin-sbx/common').BC;
const PrivateKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PrivateKey;
const CurveType = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const chai = require('chai');
const expect = chai.expect;

const curves = [
  CurveType.CI_SECP256K1,
  CurveType.CI_SECT283K1,
  CurveType.CI_P521,
  CurveType.CI_P384
];

describe('Coding.Pascal.Keys.PrivateKey', () => {

  it('can decode a pascalcoin private key', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../../fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let pk = new PrivateKeyCoder().decodeFromBytes(BC.fromHex(keyInfo.enc_privkey));
        expect(pk.curve.id).to.be.equal(c);
      });
    });
  });

  it('can encode a pascalcoin private key', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../../fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let pk = new PrivateKeyCoder().decodeFromBytes(BC.fromHex(keyInfo.enc_privkey));

        expect(new PrivateKeyCoder().encodeToBytes(pk).toHex()).to.be.equal(keyInfo.enc_privkey);
      });
    });
  });
});
