/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = require('@pascalcoin-sbx/common').Coding;
const Endian = require('@pascalcoin-sbx/common').Endian;
const CompositeType = Coding.CompositeType;

/**
 * The digest encoder of a DATA Operation.
 */
class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('data_op_digest');
    this.description('Digest encoder for a DATA operation.');
    // config for digest creation
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
        .description('The amount associated with the operation.')
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
      new Coding.Pascal.OpType('optype', 1)
        .withFixedValue(10)
        .description('The optype as 8bit int.')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Data Operation (DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * @inheritDoc AbstractType#canDecode
   */
  get canDecode() {
    return false;
  }
}

module.exports = DigestCoder;
