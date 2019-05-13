let Items = {
  ChangeKey: require('./ChangeKey'),
  ChangeKeySigned: require('./ChangeKeySigned'),
  ChangeAccountInfo: {
    Operation: require('./ChangeAccountInfo/Operation'),
    RawCoder: require('./ChangeAccountInfo/RawCoder'),
    DigestCoder: require('./ChangeAccountInfo/DigestCoder')
  },
  Data: {
    Operation: require('./Data/Operation'),
    RawCoder: require('./Data/RawCoder'),
    DigestCoder: require('./Data/DigestCoder')
  },
  Transaction: {
    Operation: require('./Transaction/Operation'),
    RawCoder: require('./Transaction/RawCoder'),
    DigestCoder: require('./Transaction/DigestCoder')
  },
  ListAccountForSale: {
    Operation: require('./ListAccountForSale/Operation'),
    RawCoder: require('./ListAccountForSale/RawCoder'),
    DigestCoder: require('./ListAccountForSale/DigestCoder')
  },
  DeListAccountForSale: {
    Operation: require('./DeListAccountForSale/Operation'),
    RawCoder: require('./DeListAccountForSale/RawCoder'),
    DigestCoder: require('./DeListAccountForSale/DigestCoder')
  },
  BuyAccount: {
    Operation: require('./BuyAccount/Operation'),
    RawCoder: require('./BuyAccount/RawCoder'),
    DigestCoder: require('./BuyAccount/DigestCoder')
  }
};

Items.digestCoderFor = operation => {
  return Items[operation.constructor.name].DigestCoder;
};
Items.rawCoderFor = operation => {
  return Items[operation.constructor.name].RawCoder;
};

module.exports = Items;
