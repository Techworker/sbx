/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('@pascalcoin-sbx/common').BC;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const Coding = require('@pascalcoin-sbx/common').Coding;
const Endian = require('@pascalcoin-sbx/common').Endian;
const PublicKeyWithLength = require('./../../Coding/PublicKeyWithLength');
const CompositeType = Coding.CompositeType;
const ListOperation = require('./Operation');

/**
 * The raw coder for a List operation.
 */
class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('list_operation_raw');
    this.description('The coder for the raw representation of a List Account operation');
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
        .withFixedValue(4)
        .description('The optype of the operation (4)')
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation of the signer.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('price')
        .description('The price of the target account.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('accountToPay')
        .description('The account where the amount goes to when the target is sold.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('v2_pubkey')
        .description('Empty pubkey (6 zero bytes) - previously active in <= v2.')
        .withFixedValue(PublicKey.empty())
    );
    this.addSubType(
      new PublicKeyWithLength('newPublicKey')
        .description('The new public key of the buyer (private sale).')
    );
    this.addSubType(
      new Coding.Core.Int32('lockedUntilBlock', true, Endian.LITTLE_ENDIAN)
        .description('The block number until the account is locked.')
    );
    this.addSubType(
      new Coding.Core.Int16('state', true, Endian.LITTLE_ENDIAN)
        .description('The account state.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('hashLock', 2)
        .description('The hash lock which is empty when listing for sale.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee associated with the operation')
    );
    this.addSubType(
      new Coding.Pascal.Payload('payload', true)
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

    info.name = 'List Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the encoded List operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ListOperation}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new ListOperation(
      decoded.signer,
      decoded.target,
      decoded.price,
      decoded.accountToPay
    );

    op.asPrivateSale(decoded.newPublicKey, decoded.lockedUntilBlock);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);

    return op;
  }
}

module.exports = RawCoder;
