/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const Endian = require('@pascalcoin-sbx/common').Endian;
const File = require('./File');
const KeyCoder = require('./KeyCoder');
const CompositeType = Coding.CompositeType;

/**
 * Coder for a WalletKeys.dat file from the classic wallet.
 */
class FileCoder extends CompositeType {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'walletkeys.dat');
    this.description('The coder for the walletkeys.dat file from the classic wallet.');
    this.addSubType(
      new Coding.Core.StringWithLength('magic', 1, 'magic_length', 'Length of the magic', Endian.LITTLE_ENDIAN, true)
        .description('The name of the magic.')
    );
    this.addSubType(
      new Coding.Core.Int32('version', true, Endian.LITTLE_ENDIAN)
        .description('Version of file')
    );
    const decissiveCoder = new Coding.Decissive('versioned', 'version', (versionValue) => {
      // Decide here when the version is updated, currently only 100 is supported
      if (versionValue === 100 || true) {
        const V100Coder = new Coding.CompositeType('v100');

        V100Coder.addSubType(
          new Coding.Core.Int32('countKeys', true, Endian.LITTLE_ENDIAN)
            .description('The number of keys in the file')
        );

        V100Coder.addSubType(
          new Coding.Repeating('keys', new KeyCoder('keys'), -1, 'countKeys')
            .description('List of keys')
        );

        return V100Coder;
      }
    });

    this.addSubType(decissiveCoder);
  }

  /**
   * Decodes the given bytes.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {File}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc, options, all);
    const keyFile = new File(decoded.magic, decoded.version);

    decoded.versioned.keys.forEach((key => {
      keyFile.addKey(key);
    }));

    return keyFile;
  }

  /**
   * Encodes the given File object to a list of bytes.
   *
   * @param {File} objOrArray
   * @returns {BC}
   */
  encodeToBytes(objOrArray) {
    let obj = {
      magic: objOrArray.magic,
      version: objOrArray.version,
      versioned: {
        countKeys: objOrArray.countKeys,
        keys: objOrArray.keys
      }
    };

    return super.encodeToBytes(obj);
  }
}

module.exports = FileCoder;
