const graphql = require('graphql');
const BC = require('@pascalcoin-sbx/common').BC;

/**
 * Describes a HexaString type.
 */
class HexaString {

  /**
   * Gets the name of the type.
   *
   * @returns {string}
   */
  get name() {
    return 'HexaString';
  }

  /**
   * Gets the description of the type.
   *
   * @returns {string}
   */
  get description() {
    return 'PascalCoin HexaString - Hex values as strings without leading 0x';
  }

  /**
   * Gets the hex value.
   *
   * @param {BC} value
   * @returns {*}
   */
  serialize(value) {
    return value.toHex();
  }

  /**
   * Tries to parse the given hex value.
   *
   * @param {String} value
   * @returns {BC}
   */
  parseValue(value) {
    return BC.fromHex(value);
  }

  /**
   * Tries to parse a literal.
   *
   * @param {Object} ast
   * @returns {BC|null}
   */
  parseLiteral(ast) {
    if (ast.kind === graphql.STRING) {
      return this.parseValue(ast.value);
    }

    return null;
  }
}

module.exports = new graphql.GraphQLScalarType(new HexaString());
