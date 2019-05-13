/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;
const Operation = require('./Operation');

/**
 * A DATA operation object that can be signed.
 */
class RawCoder extends CompositeType {
  constructor(opType) {
    super('delist_operation_raw');
    this.addSubType(
      new Coding.Pascal.AccountNumber('signer')
        .description('The account that executes the operation.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('target')
        .description('The account that will be listed.')
    );
    this.addSubType(
      new Coding.Pascal.OpType('optype', 2)
        .withFixedValue(opType)
        .description(`The optype of the operation (${opType})`)
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation of the signer.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee associated with the operation')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('payload', 2)
        .description('The payload of the operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('r', 2)
        .description('R value of the signed operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('s', 2)
        .description('R value of the signed operation.')
    );
  }

  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Operation(
      decoded.signer,
      decoded.target
    );

    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.signFromDecoded(decoded.nOperation, decoded.r, decoded.s);

    return op;
  }
}

module.exports = RawCoder;
