/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const Key = require('./Key');
const CompositeType = Coding.CompositeType;

/**
 * Coder for a key entry in the WalletKeys.dat file.
 */
class KeyCoder extends CompositeType {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'walletkeys.dat_key');
    this.description('The coder for a key entry in the walletkeys.dat file from the classic wallet.');
    this.addSubType(
      new Coding.Core.StringWithLength('name', 2, 'name_length', 'Length of the key name')
        .description('The name of the key.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('publicKey')
        .description('The public key')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('encryptedPrivateKey', 2, 'encryptedPrivateKeyLength', 'Length of crypted')
        .description('The crypted key')
    );
  }

  /**
   * Decodes the given bytes.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {Key}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc, options, all);

    return new Key(decoded.name, decoded.publicKey, decoded.encryptedPrivateKey);
  }
}

module.exports = KeyCoder;
