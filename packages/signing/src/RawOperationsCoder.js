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
const ChangeAccountInfoRawCoder = require('./Operations/ChangeAccountInfo/RawCoder');
const CompositeType = Coding.CompositeType;

/**
 * A DATA operation object that can be signed.
 */
class RawOperationsCoder extends CompositeType {
  constructor() {
    super('combined signed operations');
    super.description('Coder to combine multiple operations');
    this.addSubType(new Coding.Core.Int32('count', true, Endian.LITTLE_ENDIAN));
    const operationType = new CompositeType('operation');

    operationType.addSubType(new Coding.Pascal.OpType('optype', 4));
    operationType.addSubType(new Coding.Decissive('operation', 'optype', (markerValue) => {
      let a = 'b';

      switch (markerValue) {
        case 1:
          return new TransactionRawCoder(1);
        case 4:
          return new ListRawCoder(4);
        case 5:
          return new DeListRawCoder(5);
        case 8:
          return new ChangeAccountInfoRawCoder(8);
        case 10:
          return new DataRawCoder(10);
      }
    }));
    this.addSubType(new Coding.Repeating('operations', operationType));
  }
}

module.exports = RawOperationsCoder;
