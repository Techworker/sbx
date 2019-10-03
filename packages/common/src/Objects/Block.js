/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BN = require('bn.js');
const Abstract = require('./Abstract');
const Currency = require('./../Types/Currency');
const AccountNumber = require('./../Types/AccountNumber');
const BC = require('./../BC');
const PublicKeyCoder = require('./../Coding/Pascal/Keys/PublicKey');

const pkCoder = new PublicKeyCoder();

const P_BLOCK_NUMBER = Symbol('block.blockNumber');
const P_PUBLIC_KEY = Symbol('enc_pubkey.publicKey');
const P_REWARD = Symbol('reward_s.reward');
const P_FEE = Symbol('fee_s.fee');
const P_PROTOCOl_VERSION = Symbol('ver.protocolVersion');
const P_MINER_VERSION = Symbol('ver_a.minerVersion');
const P_TIMESTAMP = Symbol('timestamp');
const P_TARGET = Symbol('target');
const P_NONCE = Symbol('nonce');
const P_PAYLOAD = Symbol('payload');
const P_SAFEBOX_HASH = Symbol('sbh.safeboxHash');
const P_OP_HASH = Symbol('oph.opHash');
const P_PROOF_OF_WORK = Symbol('pow.proofOfWork');
const P_HASH_RATE_KHS = Symbol('hashratekhs.hashRateKhs');
const P_MATURATION = Symbol('maturation');
const P_COUNT_OPERATIONS = Symbol('operations.countOperations');

const ALL_PROPS = [
  P_BLOCK_NUMBER, P_PUBLIC_KEY, P_REWARD, P_FEE, P_PROTOCOl_VERSION, P_MINER_VERSION,
  P_TIMESTAMP, P_TARGET, P_NONCE, P_PAYLOAD, P_SAFEBOX_HASH, P_OP_HASH, P_PROOF_OF_WORK,
  P_HASH_RATE_KHS, P_MATURATION, P_COUNT_OPERATIONS
];

/**
 * Represents a block.
 */
class Block extends Abstract {
  /**
   * Creates a new instance of the Block class.
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let block = new this(data);

    let mappedData = block.mapInitializationDataWithProperties(ALL_PROPS);

    block[P_BLOCK_NUMBER] = parseInt(mappedData[P_BLOCK_NUMBER], 10);

    block[P_PUBLIC_KEY] = pkCoder.decodeFromBytes(BC.fromHex(mappedData[P_PUBLIC_KEY]));
    block[P_REWARD] = new Currency(mappedData[P_REWARD]);
    block[P_FEE] = new Currency(mappedData[P_FEE]);
    block[P_PROTOCOl_VERSION] = parseInt(mappedData[P_PROTOCOl_VERSION], 10);
    block[P_MINER_VERSION] = parseInt(mappedData[P_MINER_VERSION], 10);
    block[P_TIMESTAMP] = parseInt(mappedData[P_TIMESTAMP], 10);
    block[P_TARGET] = new BN(mappedData[P_TARGET].toString(), 10);
    block[P_NONCE] = new BN(mappedData[P_NONCE].toString(), 10);
    block[P_PAYLOAD] = mappedData[P_PAYLOAD];
    block[P_SAFEBOX_HASH] = BC.fromHex(mappedData[P_SAFEBOX_HASH]);
    block[P_OP_HASH] = BC.fromHex(mappedData[P_OP_HASH]);
    block[P_PROOF_OF_WORK] = BC.fromHex(mappedData[P_PROOF_OF_WORK]);
    block[P_HASH_RATE_KHS] = new BN(mappedData[P_HASH_RATE_KHS].toString(), 10);
    block[P_MATURATION] = parseInt(mappedData[P_MATURATION], 10);
    block[P_COUNT_OPERATIONS] = 0;
    if (data.operations !== undefined) {
      block[P_COUNT_OPERATIONS] = parseInt(mappedData[P_COUNT_OPERATIONS], 10);
    }

    return block;
  }

  /**
   * Gets the number of a block.
   *
   * @returns {Number}
   */
  get blockNumber() {
    return this[P_BLOCK_NUMBER];
  }

  /**
   * Gets the public key of the miner of the block.
   *
   * @returns {PublicKey}
   */
  get publicKey() {
    return this[P_PUBLIC_KEY];
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
  get protocolVersion() {
    return this[P_PROTOCOl_VERSION];
  }

  /**
   * Gets the protocol version of the miner.
   *
   * @returns {Number}
   */
  get minerVersion() {
    return this[P_MINER_VERSION];
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
  get safeboxHash() {
    return this[P_SAFEBOX_HASH];
  }

  /**
   * Gets the operation hash.
   *
   * @returns {BC}
   */
  get opHash() {
    return this[P_OP_HASH];
  }

  /**
   * Gets the POW.
   *
   * @returns {BC}
   */
  get proofOfWork() {
    return this[P_PROOF_OF_WORK];
  }

  /**
   * Gets the hashrate in kh/s.
   *
   * @returns {BigNumber}
   */
  get hashRateKhs() {
    return this[P_HASH_RATE_KHS];
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
  get countOperations() {
    return this[P_COUNT_OPERATIONS];
  }

  /**
   * Gets the list of accounts created.
   *
   * @returns {AccountNumber[]}
   */
  get createdAccountNumbers() {
    return [
      new AccountNumber(this[P_BLOCK_NUMBER] * 5),
      new AccountNumber(this[P_BLOCK_NUMBER] * 5 + 1),
      new AccountNumber(this[P_BLOCK_NUMBER] * 5 + 2),
      new AccountNumber(this[P_BLOCK_NUMBER] * 5 + 3),
      new AccountNumber(this[P_BLOCK_NUMBER] * 5 + 4)
    ];
  }
}

module.exports = Block;
