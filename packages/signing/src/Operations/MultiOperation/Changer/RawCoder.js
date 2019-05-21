/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;

/**
 * The raw coder for a MultiOperation.Changer operation.
 */
class RawAndDigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('multiop_changer_raw');
    this.description('The coder for the raw representation of a MultiOperation.Changer');
    this.addSubType(
      new Coding.Pascal.AccountNumber('account')
        .description('The account of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation of the account.')
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

    info.name = 'MultiOperation.Changer (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }
}

module.exports = RawAndDigestCoder;
