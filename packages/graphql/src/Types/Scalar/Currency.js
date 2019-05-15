/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const graphql = require('graphql');
const CurrencyType = require('@pascalcoin-sbx/common').Types.Currency;

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
   * @param {CurrencyType} value
   * @returns {string}
   */
  serialize(value) {
    return value.toStringOpt();
  }

  /**
   * Parses a currency value.
   *
   * @param {String|Number} value
   * @returns {CurrencyType}
   */
  parseValue(value) {
    return new CurrencyType(value);
  }

  /**
   * Tries to parse a currency from the given value.
   *
   * @param {Object} ast
   * @returns {CurrencyType}
   */
  parseLiteral(ast) {
    if (ast.kind === graphql.Kind.INT || ast.kind === graphql.Kind.STRING || ast.kind === graphql.Kind.FLOAT) {
      return this.parseValue(ast.value);
    }

    return null;
  }
}

module.exports = new graphql.GraphQLScalarType(new Currency());
