const Crypto = require('@pascalcoin-sbx/crypto');
const BC = require('@pascalcoin-sbx/common').BC;
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

class Keys {

  /**
   * Returns a keypair.
   *
   * @param {BC} encryptedPrivateKey
   * @param {String} password
   * @return {KeyPair}
   */
  decryptPrivateKey(encryptedPrivateKey, password) {
    return Crypto.Keys.fromPrivateKey(
      Crypto.Encryption.Pascal.PrivateKey.decrypt(encryptedPrivateKey, { password })
    );
  }

  /**
   * Encrypts the given private key.
   *
   * @param {KeyPair} keyPair
   * @param {String} password
   */
  encryptPrivateKey(keyPair, password) {
    return Crypto.Encryption.Pascal.PrivateKey.encrypt(keyPair.privateKey, { password });
  }

  /**
   * Generates a new SECP256K1 keypair.
   *
   * @return {KeyPair}
   */
  generateSECP256() {
    return Crypto.Keys.generate(new Curve(Curve.CI_SECP256K1));
  }

  /**
   * Generates a new P384 keypair.
   *
   * @return {KeyPair}
   */
  generateP384() {
    return Crypto.Keys.generate(new Curve(Curve.CI_P384));
  }

  /**
   * Generates a new P521 keypair.
   *
   * @return {KeyPair}
   */
  generateP521() {
    return Crypto.Keys.generate(new Curve(Curve.CI_P521));
  }

  /**
   * Converts the given public key to a base58 string.
   *
   * @param {PublicKey} publicKey
   * @return {String}
   */
  toBase58Format(publicKey) {
    return new PublicKeyCoder().encodeToBase58(publicKey);
  }

  /**
   * Converts a base58 public key to a PublicKey object.
   *
   * @param {String} base58PublicKey
   * @return {PublicKey}
   */
  fromBase58Format(base58PublicKey) {
    return new PublicKeyCoder().decodeFromBase58(base58PublicKey);
  }

  /**
   * Converts a public key to the pascal key format.
   *
   * @param {PublicKey} publicKey
   * @return {BC}
   */
  toPascalFormat(publicKey) {
    return new PublicKeyCoder().encodeToBytes(publicKey);
  }

  /**
   * Converts a pascal encoded public key to a public key instance.
   *
   * @param {BC} pascalPublicKey
   * @return {PublicKey}
   */
  fromPascalFormat(pascalPublicKey) {
    return new PublicKeyCoder().decodeFromBytes(BC.from(pascalPublicKey));
  }
}

module.exports = Keys;
