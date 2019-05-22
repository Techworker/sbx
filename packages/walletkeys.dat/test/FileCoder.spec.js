const fs = require('fs');
const path = require('path');

const FileCoder = require('@pascalcoin-sbx/walletkeys.dat').FileCoder;
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('WalletKeys.dat.FileCoder', () => {

  it('can read a walletkeys.dat byte stream', () => {
    let data = fs.readFileSync(__dirname + '/WalletKeys.dat');
    const decoded = new FileCoder().decodeFromBytes(data);

    expect(decoded.magic).to.be.equal('TWalletKeys');
    expect(decoded.version).to.be.equal(100);
    expect(decoded.keys.length).to.be.equal(4);
    decoded.keys.forEach((key, idx) => {
      switch (idx) {
        case 0:
          expect(key.name).to.be.equal('secp256k1');
          expect(key.publicKey.curve.id).to.be.equal(Curve.CI_SECP256K1);
          break;
        case 1:
          expect(key.name).to.be.equal('sect283k1');
          expect(key.publicKey.curve.id).to.be.equal(Curve.CI_SECT283K1);
          break;
        case 2:
          expect(key.name).to.be.equal('secp384r1');
          expect(key.publicKey.curve.id).to.be.equal(Curve.CI_P384);
          break;
        case 3:
          expect(key.name).to.be.equal('secp521r1');
          expect(key.publicKey.curve.id).to.be.equal(Curve.CI_P521);
          break;
      }
    });
  });

  it('can write a walletkeys.dat byte stream', function (done) {
    let data = fs.readFileSync(__dirname + '/WalletKeys.dat');
    const decoded = new FileCoder().decodeFromBytes(data);

    expect(BC.from(data).toHex()).to.be.equal(new FileCoder().encodeToBytes(decoded).toHex());
    done();
  });
});
