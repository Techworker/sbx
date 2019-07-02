const CryptoEncryptionPascalPrivateKey = require('./src/Encryption/Pascal/PrivateKey');
const CryptoKeys = require('./src/Keys');

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
      ECIES: require('./src/Encryption/Pascal/ECIES'),
      Password: require('./src/Encryption/Pascal/Password'),
      PrivateKey: CryptoEncryptionPascalPrivateKey
    }
  },
  Keys: CryptoKeys,
  mipher: {
    AES_CBC_ZeroPadding: require('./src/mipher/AES_CBC_ZeroPadding')
  },
  /**
   * Returns a keypair.
   *
   * @param encryptedPrivateKey
   * @param password
   * @return {KeyPair}
   */
  importEncryptedPrivateKey(encryptedPrivateKey, password) {
    return CryptoKeys.fromPrivateKey(
      CryptoEncryptionPascalPrivateKey.decrypt(encryptedPrivateKey, { password })
    );
  }
};
