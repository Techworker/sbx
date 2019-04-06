const fs = require('fs');
const path = require('path');
const AES = require('@sbx/crypto').AES;
const BC = require('@sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Crypto.AES', () => {

  it('passes aes-cbc vector tests', () => {
    const vectors = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/aes.json')));

    vectors.forEach((v) => {
      const input = BC.fromHex(v.input);
      const output = BC.fromHex(v.output);
      const iv = BC.fromHex(v.iv);
      const key = BC.fromHex(v.key);
      const enc = AES.encrypt(key, iv, input);

      // TODO: why slicing?
      expect(output.toHex()).to.be.equal(enc.slice(0, 16).toHex());
    });
  });

});
