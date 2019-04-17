const graphql = require('graphql');
const PascalAccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;

/**
 * A AccountNumber Scalar.
 */
class AccountNumber {

  /**
   * Gets the name.
   *
   * @returns {string}
   */
  get name() {
    return 'AccountNumber';
  }

  /**
   * Gets a description of the AccountNumber Scalar.
   *
   * @returns {string}
   */
  get description() {
    return 'PascalCoin Account Number. Can be parsed from int or string + checksum.';
  }

  /**
   * Gets the account number.
   *
   * @param {PascalAccountNumber} value
   * @returns {Number}
   */
  serialize(value) {
    return value.account;
  }

  /**
   * Parses the given account number value.
   *
   * @param {Number} value
   * @returns {PascalAccountNumber}
   */
  parseValue(value) {
    return new PascalAccountNumber(value);
  }

  /**
   * Tries to parse an account number value.
   *
   * @param {Object} ast
   * @returns {null|PascalAccountNumber}
   */
  parseLiteral(ast) {
    if (ast.kind === graphql.Kind.INT || ast.kind === graphql.Kind.STRING) {
      return this.parseValue(ast.value);
    }

    return null;
  }
}

module.exports = new graphql.GraphQLScalarType(new AccountNumber());
