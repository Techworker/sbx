/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const Endian = require('@pascalcoin-sbx/common').Endian;
const CompositeType = Coding.CompositeType;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const BuyAccount = require('./Operation');

/**
 * The raw coder for a BuyAccount operation.
 */
class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('buy_op_raw');
    this.description('The coder for the raw representation of a BuyAccount operation');
    this.addSubType(
      new Coding.Pascal.AccountNumber('sender')
        .description('The buyer account.')
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation value of the buyer.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('target')
        .description('The account to buy.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('amount')
        .description('The amount to pay for the account.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee paid for the operation.')
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
      new Coding.Pascal.Keys.PublicKey('v2_public_key')
        .description('Empty pubkey (6 zero bytes) - previously active in <= v2.')
        .withFixedValue(PublicKey.empty())
    );
    this.addSubType(
      new Coding.Core.Int8('type', true, Endian.LITTLE_ENDIAN)
        .description('Fixed type for a "Buy account" transaction.')
        .withFixedValue(2)
    );
    this.addSubType(
      new Coding.Pascal.Currency('price')
        .description('The price of the account.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('seller')
        .description('The account number of the seller.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('newPublicKey')
        .description('The new public key that will own the account.')
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

    info.name = 'Buy Account Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the encoded BuyAccount operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {BuyAccount}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new BuyAccount(
      decoded.sender,
      decoded.target,
      decoded.amount,
      decoded.price,
      decoded.seller,
      decoded.newPublicKey
    );

    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);

    return op;
  }
}

module.exports = RawCoder;
