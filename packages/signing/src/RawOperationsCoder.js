/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = require('@pascalcoin-sbx/common').Coding;
const Endian = require('@pascalcoin-sbx/common').Endian;
const TransactionRawCoder = require('./Operations/Transaction/RawCoder');
const DataRawCoder = require('./Operations/Data/RawCoder');
const ListRawCoder = require('./Operations/ListAccountForSale/RawCoder');
const DeListRawCoder = require('./Operations/DeListAccountForSale/RawCoder');
const BuyRawCoder = require('./Operations/BuyAccount/RawCoder');
const ChangeKeyRawCoder = require('./Operations/ChangeKey/RawCoder');
const ChangeKeySignedRawCoder = require('./Operations/ChangeKeySigned/RawCoder');
const ChangeAccountInfoRawCoder = require('./Operations/ChangeAccountInfo/RawCoder');
const MultiOperationRawCoder = require('./Operations/MultiOperation/RawCoder');
const CompositeType = Coding.CompositeType;

/**
 * A DATA operation object that can be signed.
 */
class RawOperationsCoder extends CompositeType {
  constructor() {
    super('combined signed operations');
    super.description('Coder to combine multiple operations.');
    this.addSubType(
      new Coding.Core.Int32('count', true, Endian.LITTLE_ENDIAN)
        .description('The number of operations this message holds.')
    );
    const operationType = new CompositeType('operation')
      .description('The number of operations this message holds.');

    operationType.addSubType(
      new Coding.Pascal.OpType('optype', 4)
        .description('The operation type.'));
    operationType.addSubType(new Coding.Decissive('operation', 'optype', (markerValue) => {
      switch (markerValue) {
        case 1:
          return new TransactionRawCoder();
        case 2:
          return new ChangeKeyRawCoder();
        case 4:
          return new ListRawCoder();
        case 5:
          return new DeListRawCoder();
        case 6:
          return new BuyRawCoder();
        case 7:
          return new ChangeKeySignedRawCoder();
        case 8:
          return new ChangeAccountInfoRawCoder();
        case 9:
          return new MultiOperationRawCoder();
        case 10:
          return new DataRawCoder();
        default:
          throw new Error('Unable to map marker to a coder.');
      }
    }).description('Possible subtypes: Transaction op (raw), ChangeKey op (raw), ListAccountForSale op (raw), DeList op (raw), BuyAccount op (raw), ChangeKeySigned op (raw), ChangeAccountInfo op (raw), MultiOperation op (raw), Data op (raw)'));
    this.addSubType(new Coding.Repeating('operations', operationType, -1, 'count'));
  }
}

module.exports = RawOperationsCoder;
