/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const graphql = require('graphql');
const OperationHashCoder = require('@pascalcoin-sbx/common').Coding.Pascal.OperationHash;

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
   * @param {OperationHashType} value
   * @returns {String}
   */
  serialize(value) {
    return new OperationHashCoder().encodeToBytes(value).toHex();
  }

  /**
   * Parses an operation hash value.
   *
   * @param value
   * @returns {OperationHashType}
   */
  parseValue(value) {
    return new OperationHashCoder().decodeFromBytes(value);
  }

  /**
   * Tries to parse an ophash value.
   *
   * @param {Object} ast
   * @returns {OperationHashType|null}
   */
  parseLiteral(ast) {
    if (ast.kind === graphql.Kind.STRING) {
      return this.parseValue(ast.value);
    }

    return null;
  }
}

module.exports = new graphql.GraphQLScalarType(new OperationHash());
