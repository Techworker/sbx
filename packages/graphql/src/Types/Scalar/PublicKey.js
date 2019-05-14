const graphql = require('graphql');
const BC = require('@pascalcoin-sbx/common').BC;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

/**
 * A public key scalar type.
 */
class PublicKey {
  /**
   * Gets the name of the type.
   * @returns {string}
   */
  get name() {
    return 'PublicKey';
  }

  /**
   * Gets the description of the type.
   *
   * @returns {string}
   */
  get description() {
    return 'PascalCoin Public Key - output in base58. Input can be hexastring or base58';
  }

  /**
   * Gets the base58 representation.
   *
   * @param {PascalPublicKey} value
   * @returns {String}
   */
  serialize(value) {
    return new PublicKeyCoder().encodeToBase58(value);
  }

  /**
   * Tries to parse the value.
   *
   * @param {String} value
   * @returns {PublicKeyType}
   */
  parseValue(value) {
    try {
      return new PublicKeyCoder().decodeFromBase58(value);
    } catch (e) {
      return new PublicKeyCoder().decodeFromBytes(BC.from(value));
    }
  }

  /**
   * Tries to parse the value.
   *
   * @param {Object} ast
   * @returns {null|PublicKeyType}
   */
  parseLiteral(ast) {
    if (ast.kind === graphql.Kind.STRING) {
      return this.parseValue(ast.value);
    }

    return null;
  }
}

module.exports = new graphql.GraphQLScalarType(new PublicKey());
