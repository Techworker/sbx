/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

let Items = {
  ChangeKey: {
    Operation: require('./ChangeKey/Operation'),
    RawCoder: require('./ChangeKey/RawCoder'),
    DigestCoder: require('./ChangeKey/DigestCoder')
  },
  ChangeKeySigned: {
    Operation: require('./ChangeKeySigned/Operation'),
    RawCoder: require('./ChangeKeySigned/RawCoder'),
    DigestCoder: require('./ChangeKeySigned/DigestCoder')
  },
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
  },
  MultiOperation: {
    Operation: require('./MultiOperation/Operation'),
    RawCoder: require('./MultiOperation/RawCoder'),
    DigestCoder: require('./MultiOperation/DigestCoder'),
    Changer: require('./MultiOperation/Changer/Changer'),
    Sender: require('./MultiOperation/Sender/Sender'),
    Receiver: require('./MultiOperation/Receiver/Receiver')
  }
};

Items.digestCoderFor = operation => {
  return Items[operation.constructor.name].DigestCoder;
};
module.exports = Items;
