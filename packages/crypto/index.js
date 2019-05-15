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
      PrivateKey: require('./src/Encryption/Pascal/PrivateKey')
    }
  },
  Keys: require('./src/Keys'),
  mipher: {
    AES_CBC_ZeroPadding: require('./src/mipher/AES_CBC_ZeroPadding')
  }
};
