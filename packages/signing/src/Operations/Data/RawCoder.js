/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const Endian = require('@pascalcoin-sbx/common').Endian;
const CompositeType = Coding.CompositeType;
const Operation = require('./Operation');

/**
 * A DATA operation object that can be signed.
 */
class RawCoder extends CompositeType {
  constructor(opType) {
    super('data_operation_raw');
    this.addSubType(
      new Coding.Pascal.AccountNumber('signer')
        .description('The account that executes the operation.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('sender')
        .description('The account that sends the operation.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('target')
        .description('The account that will receive the operation.')
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation of the signer.')
    );
    this.addSubType(
      new Coding.Core.Int16('dataType', true, Endian.LITTLE_ENDIAN)
        .description('The data type of the operation.')
    );
    this.addSubType(
      new Coding.Core.Int16('dataSequence', true, Endian.LITTLE_ENDIAN)
        .description('The data sequence of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('amount')
        .description('The amount associated the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee associated the operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('payload')
        .description('The payload of the operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('r')
        .description('R value of the signed operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('s')
        .description('R value of the signed operation.')
    );
  }

  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Operation(
      decoded.signer,
      decoded.sender,
      decoded.target
    );

    op.withDataType(decoded.dataType);
    op.withDataSequence(decoded.dataSequence);
    op.withAmount(decoded.amount);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.signFromDecoded(decoded.nOperation, decoded.r, decoded.s);

    return op;
  }
}

module.exports = RawCoder;
