const mipherAES = require('mipher/dist/aes');
const mipherPadding = require('mipher/dist/padding');

class AES_CBC_ZeroPadding {
  constructor() {
    this.cipher = new mipherAES.AES_CBC();
    this.padding = new mipherPadding.ZeroPadding();
  }

  encrypt(key, pt, iv) {
    return this.cipher.encrypt(key, this.padding.pad(pt, this.cipher.cipher.blockSize), iv);
  }

  decrypt(key, ct, iv) {
    return this.padding.strip(this.cipher.decrypt(key, ct, iv));
  };
}

module.exports = AES_CBC_ZeroPadding;
