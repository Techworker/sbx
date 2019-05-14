/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;
const Sender = require('./Sender');

/**
 * The raw coder for a ChangeKey operation.
 */
class RawAndDigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('multiop_sender_raw');
    this.description('The coder for the raw representation of a MultiOperation.Sender');
    this.addSubType(
      new Coding.Pascal.AccountNumber('account')
        .description('The account of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('amount')
        .description('The amount sent by the sender.')
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation of the account.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('payload', 2)
        .description('The payload of the operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('r', 2)
        .description('R value of the sign operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('s', 2)
        .description('S value of the sign operation.')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'MultiOperation.Sender (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the encoded Sender.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ChangeKey}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const sender = new Sender(
      decoded.account,
      decoded.amount
    );

    sender.withPayload(decoded.payload);
    sender.withNOperation(decoded.nOperation);
    sender.withSign(decoded.r, decoded.s);

    return sender;
  }

}

module.exports = RawAndDigestCoder;
