/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;

/**
 * A DATA operation object that can be signed.
 */
class OperationListCoder extends CompositeType {
  constructor() {
    super('combined signed operations');
    super.description('Coder to combine multiple operations');
  }

  encodeToBytes(value) {
    this.clearSubTypes();

    // config for digest creation
    this.addSubType(
      new Coding.Core.Int32('count')
        .description('The number of operations.')
    );

  }

  encodeTo(field) {
    if(field.id === 'count') {
      return super.addSubType(field);
    }

    this.addSubType(
      new Coding.Pascal.OpType(4)
        .withFixedValue(opType)
        .description(`The optype of the operation (${opType})`)
    );

  }
}

module.exports = OperationListCoder;
