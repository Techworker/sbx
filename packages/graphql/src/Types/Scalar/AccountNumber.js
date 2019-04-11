const graphql = require('graphql');
const PascalAccountNumber = require('@sbx/common').Types.AccountNumber;

class AccountNumber {
  get name() {
    return 'AccountNumber';
  }

  get description() {
    return 'PascalCoin Account Number';
  }

  serialize(value) {
    return new PascalAccountNumber(value).account;
  }

  parseValue(value) {
    return new PascalAccountNumber(value).account;
  }

  parseLiteral(ast) {
  }
}

module.exports = new graphql.GraphQLScalarType(new AccountNumber());
