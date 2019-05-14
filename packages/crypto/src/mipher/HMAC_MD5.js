/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
