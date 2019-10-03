const fs = require('fs');
const path = require('path');
const CBCPKCS7 = require('@pascalcoin-sbx/crypto').Encryption.AES.CBCPKCS7;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Crypto.Encryption.AES.CBC-PKCS7', () => {

  it('passes aes-cbc vector tests', () => {
    const vectors = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../fixtures/aes.json')));

    vectors.forEach((v) => {
      const input = BC.fromHex(v.input);
      const output = BC.fromHex(v.output);
      const iv = BC.fromHex(v.iv);
      const key = BC.fromHex(v.key);
      const enc = CBCPKCS7.encrypt(input, {key, iv});

      // TODO: why slicing?
      expect(output.toHex()).to.be.equal(enc.slice(0, 16).toHex());
      expect(CBCPKCS7.decrypt(enc, {key, iv}).toHex()).to.be.equal(v.input.toUpperCase());
    });
  });

});
