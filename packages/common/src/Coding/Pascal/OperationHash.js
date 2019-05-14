const Endian = require('./../../Endian');
const CompositeType = require('./../CompositeType');
const Int32 = require('./../Core/Int32');
const AccountNumber = require('./AccountNumber');
const BytesWithoutLength = require('./../Core/BytesWithoutLength');
const NOperation = require('./NOperation');
const OperationHashType = require('./../../Types/OperationHash');

/**
 * Simple wrapper for an unsigned Int32 value (used for the n_operation value)
 */
class OperationHash extends CompositeType {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'ophash');
    this.description('A pascalCoin operation hash');

    this.addSubType(new Int32('block', true, Endian.LITTLE_ENDIAN));
    this.addSubType(new AccountNumber('account'));
    this.addSubType(new NOperation('nOperation', 4));
    this.addSubType(new BytesWithoutLength('md160'));
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'OperationHash';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Reads a value and returns a new PascalCoin AccountNumber instance.
   *
   * @param {BC} bc
   * @returns {OperationHash}
   */
  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);

    return new OperationHashType(decoded.block, decoded.account, decoded.nOperation, decoded.md160);
  }

  /**
   *
   * Appends the given pascalcoin account number to the BC.
   *
   * @param {OperationHash} value
   */
  encodeToBytes(value) {
    return super.encodeToBytes(value);
  }

  /**
   * @inheritDoc AbstractType#describe
   */
  /* istanbul ignore next */
  describe(value) {
    return super.describe(value);
  }
}

module.exports = OperationHash;
