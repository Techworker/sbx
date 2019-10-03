const Types = require('./src/Types');
const Objects = require('./src/Objects');
const Coding = require('./src/Coding');

module.exports = {
  Base58: require('./src/Base58'),
  BC: require('./src/BC'),
  Endian: require('./src/Endian'),
  PascalInfo: require('./src/PascalInfo'),
  Sha: require('./src/Sha'),
  Util: require('./src/Util'),
  Types,
  Coding,
  Objects,
  accountNumber(accountNumber) {
    return new Types.AccountNumber(accountNumber);
  },
  accountName(accountName) {
    return new Types.AccountName(accountName);
  },
  currency(value) {
    return new Types.Currency;
  },
  opHash(opHash) {
    return new Types.OperationHash;
  },
  curve(curve) {
    return new Types.Curve(curve);
  },
  keyPair(privateKey, publicKey) {
    return new Types.KeyPair(privateKey, publicKey);
  },
  privateKey(privateKey) {
    return new Types.PrivateKey(privateKey);
  },
  encodePublicKey(publicKey) {
    return new Coding.Pascal.Keys.PublicKey().encodeToBytes(publicKey);
  },
  encodePublicKeyBase58(publicKey) {
    return new Coding.Pascal.Keys.PublicKey().encodeToBase58(publicKey);
  },
  decodePublicKey(publicKey) {
    return new Coding.Pascal.Keys.PublicKey().decodeFromBytes(publicKey);
  },
  decodePublicKeyBase58(publicKey) {
    return new Coding.Pascal.Keys.PublicKey().decodeFromBase58(publicKey);
  },
  encodePrivateKey(privateKey) {
    return new Coding.Pascal.Keys.PrivateKey().encodeToBytes(privateKey);
  }
};
