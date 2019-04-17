const fs = require('fs');
const path = require('path');

const PrivateKey = require('@pascalcoin-sbx/common').Types.Keys.PrivateKey;
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

describe('Core.Types.Keys.PrivateKey', () => {
  it('cannot be created with wrong length values managed by the curve', () => {
    expect(() => new PrivateKey(BC.fromHex('00'.repeat(33)), new Curve(714))).to.throw();
    expect(() => new PrivateKey(BC.fromHex('00'.repeat(49)), new Curve(715))).to.throw();
    expect(() => new PrivateKey(BC.fromHex('00'.repeat(67)), new Curve(716))).to.throw();
    expect(() => new PrivateKey(BC.fromHex('00'.repeat(37)), new Curve(729))).to.throw();
  });

  it('can decode a pascalcoin private key', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let pk = PrivateKey.decode(BC.fromHex(keyInfo.enc_privkey));

        expect(pk.curve.id).to.be.equal(c);
      });
    });
  });

  it('can encode a pascalcoin private key', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let pk = PrivateKey.decode(BC.fromHex(keyInfo.enc_privkey));

        expect(pk.encode().toHex()).to.be.equal(keyInfo.enc_privkey);
      });
    });
  });

  it('returns key as ec', () => {
    curves.forEach((c) => {
      const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/private-keys/curve_' + c + '.json')));

      keys.forEach((keyInfo) => {
        let pk = PrivateKey.decode(BC.fromHex(keyInfo.enc_privkey));

        expect(pk.ec.toHex()).to.be.equal(pk.key.toHex());
      });
    });
  });
});
