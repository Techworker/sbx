const Abstract = require('./../Abstract');
const KDF = require('./KDF');
const BC = require('@pascalcoin-sbx/common').BC;
const CBCPKCS7 = require('./../AES/CBCPKCS7');

const Random = require('mipher/dist/random');
const PrivateKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PrivateKey;
const privKeyCoder = new PrivateKeyCoder();

class PrivateKey extends Abstract {

  /**
   * Creates a new keypair from the given private key.
   *
   * @param {Buffer|Uint8Array|BC|String} encryptedPrivateKey
   * @param {Buffer|Uint8Array|BC|String} password
   * @returns {KeyPair}
   */
  static decrypt(value, options = {password: ''}) {

    value = BC.from(value);
    let password = BC.from(options.password, 'string');
    let salt = value.slice(8, 16);
    let key = KDF.PascalCoin(password, salt);

    // decrypt
    const encData = value.slice(16);

    const privateKeyDecryptedAndEncoded = CBCPKCS7.decrypt(encData, key);

    return privKeyCoder.decodeFromBytes(privateKeyDecryptedAndEncoded);
  }

  /**
   * Creates a new keypair from the given private key.
   *
   * @param {PrivateKey} value
   * @param {Buffer|Uint8Array|BC|String} password
   * @returns {BC}
   */
  static encrypt(value, options = {password: ''}) {
    let password = BC.from(options.password, 'string');
    const privateKeyEncoded = privKeyCoder.encodeToBytes(value);

    const randomGenerator = new Random.Random();
    const salt = new BC(Buffer.from(randomGenerator.get(8)));

    // mocha sees an open setinterval and won't exit without this change
    randomGenerator.stop();

    const keyInfo = KDF.PascalCoin(password, salt);

    const privateKeyEncrypted = CBCPKCS7.encrypt(privateKeyEncoded, keyInfo);

    return BC.concat(BC.fromString('Salted__'), salt, privateKeyEncrypted);
  }
}

module.exports = PrivateKey;
