/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const ChangeKeySigned = require('./Operation');
const PublicKeyWithLength = require('./../../Coding/PublicKeyWithLength');

/**
 * The raw coder for a ChangeKey operation.
 */
class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('change_key_signed_op_raw');
    this.description('The coder for the raw representation of a ChangeKeySigned operation');
    this.addSubType(
      new Coding.Pascal.AccountNumber('signer')
        .description('The signer of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('target')
        .description('The target account to be changed.')
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation value of the buyer.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee paid for the operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('payload', 2)
        .description('The payload of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('v2_public_key')
        .description('Empty pubkey (6 zero bytes) - previously active in <= v2.')
        .withFixedValue(PublicKey.empty())
    );
    this.addSubType(
      new PublicKeyWithLength('newPublicKey')
        .description('The new public key of the account.')
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

    info.name = 'Change Key Signed Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the encoded ChangeKeySigned operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Boolean} toArray
   * @return {ChangeKey}
   */
  decodeFromBytes(bc, toArray = false) {
    const decoded = super.decodeFromBytes(bc, false);
    const op = new ChangeKeySigned(
      decoded.signer,
      decoded.target,
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
