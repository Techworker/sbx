/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;
const DeList = require('./Operation');

/**
 * The raw coder for a Delist operation.
 */
class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('delist_operation_raw');
    this.description('The coder for the raw representation of a Delist Account operation');
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
        .withFixedValue(5)
        .description('The optype of the operation (5)')
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
      new Coding.Core.Int8('payloadType', true)
        .description('The type of the payload.')
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

    info.name = 'Delist Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the encoded Delist operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {Data}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new DeList(
      decoded.signer,
      decoded.target
    );

    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);

    return op;
  }
}

module.exports = RawCoder;
