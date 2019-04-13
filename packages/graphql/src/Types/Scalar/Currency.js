const graphql = require('graphql');
const PascalCurrency = require('@sbx/common').Types.Currency;

/**
 * Currency scalar.
 */
class Currency {

  /**
   * Gets the name of the scalar type.
   *
   * @returns {string}
   */
  get name() {
    return 'Currency';
  }

  /**
   * Gets the description of the type.
   *
   * @returns {string}
   */
  get description() {
    return 'PascalCoin Currency - denomination is 4.';
  }

  /**
   * Gets the optimized string representation of the value.
   *
   * @param {PascalCurrency} value
   * @returns {string}
   */
  serialize(value) {
    return value.toStringOpt();
  }

  /**
   * Parses a currency value.
   *
   * @param {String|Number} value
   * @returns {PascalCurrency}
   */
  parseValue(value) {
    return new PascalCurrency(value);
  }

  /**
   * Tries to parse a currency from the given value.
   *
   * @param {Object} ast
   * @returns {PascalCurrency}
   */
  parseLiteral(ast) {
    if (ast.kind === graphql.Kind.INT || ast.kind === graphql.Kind.STRING || ast.kind === graphql.Kind.FLOAT) {
      return this.parseValue(ast.value);
    }

    return null;
  }
}

module.exports = new graphql.GraphQLScalarType(new Currency());
