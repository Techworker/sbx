const graphql = require('graphql');
const PascalAccountName = require('@pascalcoin-sbx/common').Types.AccountName;

/**
 * The scalar type for an account name.
 */
class AccountName {

  /**
   * Gets the name of the scalar type.
   *
   * @returns {string}
   */
  get name() {
    return 'AccountName';
  }

  /**
   * Gets a description of the type.
   *
   * @returns {string}
   */
  get description() {
    return 'PascalCoin Account name, 3-64 characters. First character ' +
        'cannot start with a number. Set: ' +
        'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-+{}[]_:`|<>,.?/~';
  }

  /**
   * Gets the account name value as a string.
   *
   * @param {AccountName} value
   * @returns {String}
   */
  serialize(value) {
    return value.toString();
  }

  /**
   * Parses an account name and returns a new AccountName instance.
   *
   * @param {String} value
   * @returns {PascalAccountName}
   */
  parseValue(value) {
    return new PascalAccountName(value);
  }

  /**
   * Parses an account name.
   *
   * @param {Object} ast
   * @returns {null|PascalAccountName}
   */
  parseLiteral(ast) {
    if (ast.kind === graphql.Kind.STRING) {
      return this.parseValue(ast.value);
    }

    return null;
  }
}

module.exports = new graphql.GraphQLScalarType(new AccountName());
