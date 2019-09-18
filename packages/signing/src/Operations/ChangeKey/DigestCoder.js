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
 * The digest encoder of a ChangeKey Operation.
 */
class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('data_op_digest');
    this.description('Digest encoder for a ChangeKey operation.');
    // config for digest creation
    this.addSubType(
      new Coding.Pascal.AccountNumber('signer')
        .description('The account that executes the operation.')
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
      new Coding.Core.BytesWithoutLength('payload')
        .description('The payload of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.Curve('v2_pubkey_curve')
        .description('Curve ID 0 - previously active in <= v2.')
        .withFixedValue(PublicKey.empty().curve)
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('newPublicKey')
        .description('The new public key of the account.')
    );
    this.addSubType(
      new Coding.Pascal.OpType('optype', 1)
        .withFixedValue(2)
        .description('The optype as 8bit int.')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Change Key Operation (DIGEST)';
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
