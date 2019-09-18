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
 * The digest encoder of a ChangeAccountInfo Operation.
 */
class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('change_info_op_digest');
    this.description('Digest encoder for a ChangeAccountInfo operation.');

    // config for digest creation
    this.addSubType(
      new Coding.Pascal.AccountNumber('signer')
        .description('The signer of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('target')
        .description('The target account to change info of.')
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation value of the signer.')
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
      new Coding.Core.Int8('changeType')
        .description('The change type.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('newPublicKey')
        .description('The new public key of the account.')
    );
    this.addSubType(
      new Coding.Pascal.AccountName('newName')
        .description('The new name of the account.')
    );
    this.addSubType(
      new Coding.Core.Int16('newType')
        .description('The new type of the account.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('newData')
        .description('The new data of the account.')
    );
    this.addSubType(
      new Coding.Pascal.OpType('optype', 1)
        .withFixedValue(8)
        .description('The change account info optype as 8 bit int8')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Change Account Info Operation (DIGEST)';
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
