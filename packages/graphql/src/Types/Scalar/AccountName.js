const graphql = require('graphql');
const PascalAccountName = require('@sbx/common').Types.AccountName;

class AccountName {
  get name() {
    return 'AccountName';
  }

  get description() {
    return 'PascalCoin Account name';
  }

  serialize(value) {
    return new PascalAccountName(value).toString();
  }

  parseValue(value) {
    return new PascalAccountName(value).toString();
  }

  parseLiteral(ast) {
  }
}

module.exports = new graphql.GraphQLScalarType(new AccountName());
