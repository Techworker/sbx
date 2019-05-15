const Abstract = require('./../Abstract');
const mAES = require('mipher/dist/aes');
const BC = require('@pascalcoin-sbx/common').BC;

/**
 * AES-CBC PKCS7 implementation.
 */
class CBCPKCS7 extends Abstract {
  /**
   * @inheritDoc Abstract#encrypt
   */
  static encrypt(value, options = {key: BC.empty(), iv: BC.empty()}) {
    let aes = new mAES.AES_CBC_PKCS7();

    return new BC(
      aes.encrypt(
        BC.from(options.key).buffer,
        BC.from(value).buffer,
        BC.from(options.iv).buffer
      )
    );
  }

  /**
   * @inheritDoc Abstract#decrypt
   */
  static decrypt(value, options = {key: BC.empty(), iv: BC.empty()}) {
    let aes = new mAES.AES_CBC_PKCS7();

    return new BC(
      aes.decrypt(
        BC.from(options.key).buffer,
        BC.from(value).buffer,
        BC.from(options.iv).buffer
      )
    );
  }
}

module.exports = CBCPKCS7;
