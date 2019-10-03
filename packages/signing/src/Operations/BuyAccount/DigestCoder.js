/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = require('@pascalcoin-sbx/common').Coding;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const CompositeType = Coding.CompositeType;

/**
 * The digest encoder of a BuyAccount Operation.
 */
class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('buy_op_digest');
    super.description('Digest encoder for a BuyAccount operation.');

    // config for digest creation
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
        .description('The account to buy')
    );
    this.addSubType(
      new Coding.Pascal.Currency('amount')
        .description('The amount paid for the account.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee paid for the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Payload('payload', false)
    );
    this.addSubType(
      new Coding.Pascal.Keys.Curve('v2_pubkey_curve')
        .description('Curve ID 0 - previously active in <= v2.')
        .withFixedValue(PublicKey.empty().curve)
    );
    this.addSubType(
      new Coding.Pascal.Currency('price')
        .description('The price of the account to buy')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('seller')
        .description('The account number of the seller')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('newPublicKey', true)
        .description('The new public key of the account.')
    );
    this.addSubType(
      new Coding.Pascal.OpType('optype', 1)
        .withFixedValue(6)
        .description('The buy account optype as 8 bit int8')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Buy Account Operation (DIGEST)';
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
