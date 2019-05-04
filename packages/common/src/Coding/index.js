module.exports = {
  CompositeType: require('./CompositeType'),
  AbstractType: require('./AbstractType'),
  Core: {
    AbstractInt: require('./Core/AbstractInt'),
    Int8: require('./Core/Int8'),
    Int16: require('./Core/Int16'),
    Int32: require('./Core/Int32'),
    Int64: require('./Core/Int64'),
    StringWithLength: require('./Core/StringWithLength'),
    StringWithoutLength: require('./Core/StringWithoutLength'),
    BytesWithLength: require('./Core/BytesWithLength'),
    BytesWithoutLength: require('./Core/BytesWithoutLength')
  },
  Pascal: {
    Keys: {
      Curve: require('./Pascal/Keys/Curve'),
      PublicKey: require('./Pascal/Keys/PublicKey')
    },
    AccountNumber: require('./Pascal/AccountNumber'),
    AccountName: require('./Pascal/AccountName'),
    Currency: require('./Pascal/Currency'),
    NOperation: require('./Pascal/NOperation'),
    OpType: require('./Pascal/OpType')
  }
};
