const graphql = require('graphql');
const PascalOperationHash = require('@pascalcoin-sbx/common').Types.OperationHash;

/**
 * Operation Hash scalar type.
 */
class OperationHash {

  /**
   * Gets the name of the type.
   *
   * @returns {string}
   */
  get name() {
    return 'OperationHash';
  }

  /**
   * Gets the description of the type.
   *
   * @returns {string}
   */
  get description() {
    return 'PascalCoin Operation Hash HexaString.';
  }

  /**
   * Gets the hex representation.
   *
   * @param {OperationHash} value
   * @returns {String}
   */
  serialize(value) {
    return value.encode().toHex();
  }

  /**
   * Parses an operation hash value.
   *
   * @param value
   * @returns {PascalOperationHash}
   */
  parseValue(value) {
    return PascalOperationHash.decode(value);
  }

  /**
   * Tries to parse an ophash value.
   *
   * @param {Object} ast
   * @returns {PascalOperationHash|null}
   */
  parseLiteral(ast) {
    if (ast.kind === graphql.Kind.STRING) {
      return this.parseValue(ast.value);
    }

    return null;
  }
}

module.exports = new graphql.GraphQLScalarType(new OperationHash());
