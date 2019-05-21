/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const Endian = require('@pascalcoin-sbx/common').Endian;
const CompositeType = Coding.CompositeType;
const Data = require('./Operation');

/**
 * The raw coder for a DATA operation.
 */
class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('data_operation_raw');
    this.description('The coder for the raw representation of a Data operation');
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
      new Coding.Core.BytesWithLength('payload', 2, 'payload_length', 'The length of the payload')
        .description('The payload of the operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('r', 2, 'r_length', 'Length of r.')
        .description('R value of the sign operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('s', 2, 's_length', 'Length of s.')
        .description('S value of the sign operation.')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Data Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the encoded Data operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {Data}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Data(
      decoded.signer,
      decoded.sender,
      decoded.target
    );

    op.withDataType(decoded.dataType);
    op.withDataSequence(decoded.dataSequence);
    op.withAmount(decoded.amount);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);

    return op;
  }
}

module.exports = RawCoder;
