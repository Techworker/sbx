const CryptoEncryptionPascalPrivateKey = require('./src/Encryption/Pascal/PrivateKey');
const CryptoKeys = require('./src/Keys');
const ECIES = require('./src/Encryption/Pascal/ECIES');
const Password = require('./src/Encryption/Pascal/Password');

module.exports = {
  Encryption: {
    Abstract: require('./src/Encryption/Abstract'),
    ECDH: require('./src/Encryption/ECDH'),
    AES: {
      CBCPKCS7: require('./src/Encryption/AES/CBCPKCS7'),
      CBCZeroPadding: require('./src/Encryption/AES/CBCZeroPadding')
    },
    Pascal: {
      KDF: require('./src/Encryption/Pascal/KDF'),
      ECIES,
      Password,
      PrivateKey: CryptoEncryptionPascalPrivateKey
    }
  },
  Keys: CryptoKeys,
  mipher: {
    AES_CBC_ZeroPadding: require('./src/mipher/AES_CBC_ZeroPadding')
  },

  // functions..

  /**
   * Returns a keypair.
   *
   * @param encryptedPrivateKey
   * @param password
   * @return {KeyPair}
   */
  keyPairFromEncryptedPrivateKey(encryptedPrivateKey, password) {
    return CryptoKeys.fromPrivateKey(
      CryptoEncryptionPascalPrivateKey.decrypt(encryptedPrivateKey, { password })
    );
  },

  /**
   * Encrypts a value with the given pubic key.
   *
   * @param value
   * @param publicKey
   * @return {BC}
   */
  encryptWithPublicKey(value, publicKey) {
    return ECIES.encrypt(value, {publicKey});
  },

  /**
   * Decrypts a value with the given keypair.
   *
   * @param value
   * @param keyPair
   * @return {BC|false}
   */
  decryptWithPrivateKey(value, keyPair) {
    return ECIES.decrypt(value, {keyPair});
  },

  /**
   * Encrypts a value with the given password.
   *
   * @param value
   * @param password
   * @return {BC}
   */
  encryptWithPassword(value, password) {
    return Password.encrypt(value, {password});
  },

  /**
   * decrypts a value with the given password.
   *
   * @param value
   * @param password
   * @return {BC|false}
   */
  decryptWithPassword(value, password) {
    return Password.decrypt(value, {password});
  },

  /**
   * Generates a new keypair.
   *
   * @param curve
   * @return {KeyPair}
   */
  generate(curve) {
    return CryptoKeys.generate(curve);
  }
};
