const BC = require('@pascalcoin-sbx/common').BC;
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;

const AES = require('@pascalcoin-sbx/crypto').Encryption.Pascal.Password;
const ECIES = require('@pascalcoin-sbx/crypto').Encryption.Pascal.ECIES;

let pascalEncTypes = [{
  type: AES,
  max_length: 224
}, {
  type: ECIES,
  max_length: (encOptions) => {
    switch (encOptions.publicKey.curve.id) {
      case Curve.CI_SECP256K1:
        return 191;
      case Curve.CI_P521:
        return 159;
      case Curve.CI_P384:
        return 175;
    }

    return 256;
  }
}
];

/**
 * A helper that is able to handle payload splitting and concenation.
 */
class Payload {

  /**
   * First splits the decrypted payload and then encrypts each part.
   *
   * @param {BC} payload
   * @param {@pascalcoin-sbx/crypto/Encryption/Abstract} EncryptionType
   * @param {Object} encryptionOptions
   * @param {Number} decryptedMaxLength
   * @return {BC[]}
   */
  static splitAndEncrypt(payload, EncryptionType, encryptionOptions = {}, decryptedMaxLength = -1) {
    payload = BC.from(payload);

    let maxLength = decryptedMaxLength;

    if (maxLength === -1) {
      let specification = pascalEncTypes.find((type) => {
        return type.type === EncryptionType;
      });

      if (specification === undefined) {
        throw new Error(
          'Inefficient to split a payload if I don\'t know ' +
          `the max payload length using ${EncryptionType.constructor.name}`
        );
      }

      if (Number.isInteger(specification.max_length)) {
        maxLength = specification.max_length;
      } else {
        maxLength = specification.max_length(encryptionOptions);
      }
    }

    return payload.split(maxLength).map(splittedPayload => {
      return EncryptionType.encrypt(splittedPayload, encryptionOptions);
    });
  }

  /**
   * Encrypts the given payload first and splits the encrypted result.
   *
   * @param {BC} payload
   * @param {@pascalcoin-sbx/crypto/Encryption/Abstract} EncryptionType
   * @param {Object} encryptionOptions
   * @return {BC[]}
   */
  static encryptAndSplit(payload, EncryptionType, encryptionOptions = {}) {
    payload = BC.from(payload);
    return EncryptionType.encrypt(payload, encryptionOptions).split(256);
  }

  /**
   * Decrypts all given payloads and then concats the results.
   *
   * @param {BC[]} payloads
   * @param {@pascalcoin-sbx/crypto/Encryption/Abstract} DecryptionType
   * @param {Object} decryptionOptions
   * @return {BC}
   */
  static decryptAndConcat(payloads, DecryptionType, decryptionOptions = {}) {
    let decryptedPayloads = payloads.map((payload) => DecryptionType.decrypt(payload, decryptionOptions));
    let decrypted = BC.empty();

    decryptedPayloads.forEach(decryptedPayload => {
      decrypted = decrypted.append(decryptedPayload);
    });

    return decrypted;
  }

  /**
   * Concats all encrypted payloads and decrypts the value.
   *
   * @param {BC[]} payloads
   * @param {@pascalcoin-sbx/crypto/Encryption/Abstract} DecryptionType
   * @param {Object} decryptionOptions
   * @return {BC}
   */
  static concatAndDecrypt(payloads, DecryptionType, decryptionOptions = {}) {
    let encrypted = BC.empty();

    payloads.forEach(encryptedPayload => {
      encrypted = encrypted.append(encryptedPayload);
    });

    return DecryptionType.decrypt(encrypted, decryptionOptions);
  }
}

module.exports = Payload;
