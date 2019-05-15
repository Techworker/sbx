const Abstract = require('./../Abstract');
const AES_CBC_ZeroPadding = require('./../../mipher/AES_CBC_ZeroPadding');
const BC = require('@pascalcoin-sbx/common').BC;

/**
 * AES-CBC Zero Padding implementation.
 */
class CBCZeroPadding extends Abstract {
  /**
   * @inheritDoc Abstract#encrypt
   */
  static encrypt(value, options = {key: BC.empty(), iv: BC.empty()}) {
    let aes = new AES_CBC_ZeroPadding();

    return new BC(
      aes.encrypt(
        BC.from(options.key).buffer,
        BC.from(value).buffer,
        BC.from(options.iv).buffer
      )
    );
  }

  /**
   * @inheritDoc Abstract#encrypt
   */
  static decrypt(value, options = {key: BC.empty(), iv: BC.empty()}) {
    let aes = new AES_CBC_ZeroPadding();

    return new BC(
      aes.decrypt(
        BC.from(options.key).buffer,
        BC.from(value).buffer,
        BC.from(options.iv).buffer
      )
    );
  }
}

module.exports = CBCZeroPadding;
