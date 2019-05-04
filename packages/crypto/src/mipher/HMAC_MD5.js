const MipherHMAC = require('mipher/dist/hmac').HMAC;
const MipherMD5 = require('./MD5Mipher');

/**
 * AES-CBC + ZeroPadding integration using the mipher library
 */
class HMAC_MD5 {

  static hash(key, data) {
    return new MipherHMAC(new MipherMD5()).init(key).update(data).digest('hex');
  }
}

module.exports = HMAC_MD5;
