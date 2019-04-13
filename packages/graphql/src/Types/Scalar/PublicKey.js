const graphql = require('graphql');
const PascalPublicKey = require('@sbx/common').Types.Keys.PublicKey;

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
    return value.encode().toBase58();
  }

  /**
   * Tries to parse the value.
   *
   * @param {String} value
   * @returns {PascalPublicKey}
   */
  parseValue(value) {
    try {
      return PascalPublicKey.fromBase58(value);
    } catch (e) {
      return PascalPublicKey.decode(value);
    }
  }

  /**
   * Tries to parse the value.
   *
   * @param {Object} ast
   * @returns {null|PascalPublicKey}
   */
  parseLiteral(ast) {
    if (ast.kind === graphql.Kind.STRING) {
      return this.parseValue(ast.value);
    }

    return null;
  }
}

module.exports = new graphql.GraphQLScalarType(new PublicKey());
