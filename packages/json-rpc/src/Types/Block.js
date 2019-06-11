/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BN = require('bn.js');
const Abstract = require('./Abstract');
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const BC = require('@pascalcoin-sbx/common').BC;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const pkCoder = new PublicKeyCoder();

const P_BLOCK = Symbol('block');
const P_ENC_PUBKEY = Symbol('enc_pubkey');
const P_REWARD = Symbol('reward');
const P_FEE = Symbol('fee');
const P_VER = Symbol('ver');
const P_VER_A = Symbol('ver_a');
const P_TIMESTAMP = Symbol('timestamp');
const P_TARGET = Symbol('target');
const P_NONCE = Symbol('nonce');
const P_PAYLOAD = Symbol('payload');
const P_SBH = Symbol('sbh');
const P_OPH = Symbol('oph');
const P_POW = Symbol('pow');
const P_HASHRATEKHS = Symbol('hashratekhs');
const P_MATURATION = Symbol('maturation');
const P_OPERATIONS = Symbol('operations');

/**
 * Represents a block.
 */
class Block extends Abstract {
  /**
   * Creates a new instance of the Block class.
   *
   * @param {Object} data
   */
  static createFromRPC(data) {
    let block = new Block(data);

    block[P_BLOCK] = parseInt(data.block, 10);
    block[P_ENC_PUBKEY] = pkCoder.decodeFromBytes(BC.fromHex(data.enc_pubkey));
    block[P_REWARD] = new Currency(data.reward);
    block[P_FEE] = new Currency(data.fee);
    block[P_VER] = parseInt(data.ver, 10);
    block[P_VER_A] = parseInt(data.ver_a, 10);
    block[P_TIMESTAMP] = parseInt(data.timestamp, 10);
    block[P_TARGET] = new BN(data.target.toString(), 10);
    block[P_NONCE] = new BN(data.nonce.toString(), 10);
    block[P_PAYLOAD] = data.payload;
    block[P_SBH] = BC.fromHex(data.sbh);
    block[P_OPH] = BC.fromHex(data.oph);
    block[P_POW] = BC.fromHex(data.pow);
    block[P_HASHRATEKHS] = new BN(data.hashratekhs.toString(), 10);
    block[P_MATURATION] = parseInt(data.maturation, 10);
    block[P_OPERATIONS] = null;
    if (data.operations !== undefined) {
      block[P_OPERATIONS] = parseInt(data.operations, 10);
    }

    return block;
  }

  /**
   * Gets the number of a block.
   *
   * @returns {Number}
   */
  get block() {
    return this[P_BLOCK];
  }

  /**
   * Gets the public key of the miner of the block.
   *
   * @returns {PublicKey}
   */
  get publicKey() {
    return this[P_ENC_PUBKEY];
  }

  /**
   * Gets the reward.
   *
   * @returns {Currency}
   */
  get reward() {
    return this[P_REWARD];
  }

  /**
   * Gets the collective fee awarded to the miner.
   *
   * @returns {Currency}
   */
  get fee() {
    return this[P_FEE];
  }

  /**
   * Gets the version of the protocol.
   *
   * @returns {Number}
   */
  get ver() {
    return this[P_VER];
  }

  /**
   * Gets the protocol version of the miner.
   *
   * @returns {Number}
   */
  get verA() {
    return this[P_VER_A];
  }

  /**
   * Gets the UTC timestamp of the block.
   *
   * @returns {Number}
   */
  get timestamp() {
    return this[P_TIMESTAMP];
  }

  /**
   * Gets the used target.
   *
   * @returns {BigNumber}
   */
  get target() {
    return this[P_TARGET];
  }

  /**
   * Gets the calculated nonce.
   *
   * @returns {BigNumber}
   */
  get nonce() {
    return this[P_NONCE];
  }

  /**
   * Gets the payload of the miner.
   *
   * @returns {String}
   */
  get payload() {
    return this[P_PAYLOAD];
  }

  /**
   * Gets the safebox hash.
   *
   * @returns {BC}
   */
  get sbh() {
    return this[P_SBH];
  }

  /**
   * Gets the operation hash.
   *
   * @returns {BC}
   */
  get oph() {
    return this[P_OPH];
  }

  /**
   * Gets the POW.
   *
   * @returns {BC}
   */
  get pow() {
    return this[P_POW];
  }

  /**
   * Gets the hashrate in kh/s.
   *
   * @returns {BigNumber}
   */
  get hashratekhs() {
    return this[P_HASHRATEKHS];
  }

  /**
   * Gets the age of the block in terms of blocks.
   *
   * @returns {Number}
   */
  get maturation() {
    return this[P_MATURATION];
  }

  /**
   * Gets the number of operations in the block.
   *
   * @returns {Number}
   */
  get operations() {
    return this[P_OPERATIONS];
  }

  /**
   * Gets the list of accounts created.
   *
   * @returns {AccountNumber[]}
   */
  get createdAccounts() {
    return [
      new AccountNumber(this[P_BLOCK] * 5),
      new AccountNumber(this[P_BLOCK] * 5 + 1),
      new AccountNumber(this[P_BLOCK] * 5 + 2),
      new AccountNumber(this[P_BLOCK] * 5 + 3),
      new AccountNumber(this[P_BLOCK] * 5 + 4)
    ];
  }
}

module.exports = Block;
