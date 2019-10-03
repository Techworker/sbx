/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = {
  AbstractType: require('./AbstractType'),
  CompositeType: require('./CompositeType'),
  Repeating: require('./Repeating'),
  Decissive: require('./Decissive'),
  Core: {
    AbstractInt: require('./Core/AbstractInt'),
    Int8: require('./Core/Int8'),
    Int16: require('./Core/Int16'),
    Int32: require('./Core/Int32'),
    Int64: require('./Core/Int64'),
    StringWithLength: require('./Core/StringWithLength'),
    StringWithoutLength: require('./Core/StringWithoutLength'),
    BytesWithLength: require('./Core/BytesWithLength'),
    BytesWithoutLength: require('./Core/BytesWithoutLength'),
    BytesFixedLength: require('./Core/BytesFixedLength')
  },
  Pascal: {
    Keys: {
      Curve: require('./Pascal/Keys/Curve'),
      PublicKey: require('./Pascal/Keys/PublicKey'),
      PrivateKey: require('./Pascal/Keys/PrivateKey')
    },
    AccountNumber: require('./Pascal/AccountNumber'),
    AccountName: require('./Pascal/AccountName'),
    Currency: require('./Pascal/Currency'),
    NOperation: require('./Pascal/NOperation'),
    OpType: require('./Pascal/OpType'),
    OperationHash: require('./Pascal/OperationHash'),
    GUID: require('./Pascal/GUID'),
    Payload: require('./Pascal/Payload')
  }
};
