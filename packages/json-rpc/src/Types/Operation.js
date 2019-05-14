/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const BC = require('@pascalcoin-sbx/common').BC;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const OperationHashCoder = require('@pascalcoin-sbx/common').Coding.Pascal.OperationHash;

const opHashCoder = new OperationHashCoder();

const Sender = require('./Sender');
const Receiver = require('./Receiver');
const Changer = require('./Changer');

const P_VALID = Symbol('valid');
const P_ERRORS = Symbol('errors');
const P_BLOCK = Symbol('block');
const P_TIME = Symbol('time');
const P_OPBLOCK = Symbol('opblock');
const P_PAYLOAD = Symbol('payload');
const P_MATURATION = Symbol('maturation');
const P_OPTYPE = Symbol('optype');
const P_ACCOUNT = Symbol('account');
const P_OPTXT = Symbol('optxt');
const P_AMOUNT = Symbol('amount');
const P_FEE = Symbol('fee');
const P_BALANCE = Symbol('balance');
const P_OPHASH = Symbol('ophash');
const P_OLD_OPHASH = Symbol('old_ophash');
const P_SUBTYPE = Symbol('subtype');
const P_SIGNER_ACCOUNT = Symbol('signer_account');
const P_CHANGERS = Symbol('changers');
const P_SENDERS = Symbol('senders');
const P_RECEIVERS = Symbol('receivers');

/**
 * A class thats holds the information about an operation.
 */
class Operation extends Abstract {
  // The available optypes
  static get BLOCKCHAIN_REWARD() {
    return 0;
  }

  static get TRANSACTION() {
    return 1;
  }

  static get CHANGE_KEY() {
    return 2;
  }

  static get RECOVER_FUNDS() {
    return 3;
  }

  static get LIST_FOR_SALE() {
    return 4;
  }

  static get DELIST() {
    return 5;
  }

  static get BUY() {
    return 6;
  }

  static get CHANGE_KEY_ACCOUNT() {
    return 7;
  }

  static get CHANGE_ACCOUNT_INFO() {
    return 8;
  }

  static get MULTI_OPERATION() {
    return 9;
  }

  static get DATA() {
    return 10;
  }

  static get SUBTYPE_MINER() {
    return 1;
  }
  static get SUBTYPE_DEVELOPER() {
    return 2;
  }
  static get SUBTYPE_TX_SENDER() {
    return 11;
  }
  static get SUBTYPE_TX_RECEIVER() {
    return 12;
  }
  static get SUBTYPE_TX_BUY_BUYER() {
    return 13;
  }
  static get SUBTYPE_TX_BUY_TARGET() {
    return 14;
  }
  static get SUBTYPE_TX_BUY_SELLER() {
    return 15;
  }
  static get SUBTYPE_CHANGE_KEY() {
    return 21;
  }
  static get SUBTYPE_RECOVER() {
    return 31;
  }
  static get SUBTYPE_LIST_PUBLIC() {
    return 41;
  }
  static get SUBTYPE_LIST_PRIVATE() {
    return 42;
  }
  static get SUBTYPE_DELIST() {
    return 51;
  }
  static get SUBTYPE_BUY_BUYER() {
    return 61;
  }
  static get SUBTYPE_BUY_TARGET() {
    return 62;
  }
  static get SUBTYPE_BUY_SELLER() {
    return 63;
  }
  static get SUBTYPE_CHANGE_KEY_SIGNED() {
    return 71;
  }
  static get SUBTYPE_CHANGE_ACCOUNT_INFO() {
    return 81;
  }
  static get SUBTYPE_MULTI_GLOBAL() {
    return 91;
  }
  static get SUBTYPE_MULTI_ACCOUNT_INFO() {
    return 92;
  }
  static get SUBTYPE_DATA_GLOBAL() {
    return 101;
  }
  static get SUBTYPE_DATA_SENDER() {
    return 102;
  }
  static get SUBTYPE_DATA_SIGNER() {
    return 103;
  }
  static get SUBTYPE_DATA_RECEIVER() {
    return 104;
  }

  /**
   * Creates a new Operation instance from an rpc response.
   *
   * @param {Object} data
   */
  constructor(data) {
    super(data);

    this[P_VALID] = true;
    if (data.valid !== undefined) {
      this[P_VALID] = !!data.valid;
    }

    this[P_ERRORS] = null;
    if (data.errors !== undefined) {
      this[P_ERRORS] = data.errors;
    }

    if (data.payload !== undefined) {
      this[P_PAYLOAD] = BC.fromHex(data.payload);
    } else {
      this[P_PAYLOAD] = BC.fromHex('');
    }

    this[P_BLOCK] = parseInt(data.block, 10);
    this[P_TIME] = parseInt(data.time, 10);
    this[P_OPBLOCK] = parseInt(data.opblock, 10);
    this[P_MATURATION] = 0;
    // pending
    if (data.maturation !== null) {
      this[P_MATURATION] = parseInt(data.maturation, 10);
    }

    this[P_OPTYPE] = parseInt(data.optype, 10);
    // multi-op
    this[P_ACCOUNT] = null;
    if (data.account !== undefined) {
      this[P_ACCOUNT] = new AccountNumber(data.account);
    }
    this[P_OPTXT] = data.optxt;
    this[P_AMOUNT] = new Currency(data.amount);
    this[P_FEE] = new Currency(data.fee);
    this[P_BALANCE] = null;
    if (data.balance !== undefined) {
      this[P_BALANCE] = new Currency(data.balance);
    }

    this[P_OPHASH] = null;
    if (data.ophash !== undefined) {
      this[P_OPHASH] = BC.fromHex(data.ophash);
      if (this[P_OPTYPE] !== Operation.BLOCKCHAIN_REWARD) {
        this[P_OPHASH] = opHashCoder.decodeFromBytes(this[P_OPHASH]);
      }
    }

    this[P_OLD_OPHASH] = null;
    if (data.old_ophash !== undefined) {
      this[P_OLD_OPHASH] = BC.fromHex(data.old_ophash);
    }

    this[P_SUBTYPE] = data.subtype;
    this[P_SIGNER_ACCOUNT] = null;
    if (data.signer_account !== undefined) {
      this[P_SIGNER_ACCOUNT] = new AccountNumber(data.signer_account);
    }

    // eslint-disable-next-line no-multi-assign
    this[P_SENDERS] = [];
    this[P_RECEIVERS] = [];
    this[P_CHANGERS] = [];

    // loop given data and initialize objects
    data.senders.forEach(s => this[P_SENDERS].push(new Sender(s)));
    data.receivers.forEach(r => this[P_RECEIVERS].push(new Receiver(r)));
    data.changers.forEach(c => this[P_CHANGERS].push(new Changer(c)));
  }

  /**
   * Gets an indicator whether the operation was valid.
   *
   * @returns {Boolean}
   */
  get valid() {
    return this[P_VALID];
  }

  /**
   * If the operation is invalid you'll get the error message.
   *
   * @returns {String|null}
   */
  get errors() {
    return this[P_ERRORS];
  }

  /**
   * Gets the block that is associated with the operation.
   *
   * @returns {Number}
   */
  get block() {
    return this[P_BLOCK];
  }

  /**
   * Gets the time of the operation.
   *
   * @returns {Number}
   */
  get time() {
    return this[P_TIME];
  }

  /**
   * Gets the position inside a block.
   *
   * @returns {Number}
   */
  get opBlock() {
    return this[P_OPBLOCK];
  }

  /**
   * Gets the age in blocks of the operation.
   *
   * @returns {Number}
   */
  get maturation() {
    return this[P_MATURATION];
  }

  /**
   * Gets the type of the operation.
   *
   * @returns {Number}
   */
  get opType() {
    return this[P_OPTYPE];
  }

  /**
   * Gets the account.
   *
   * @returns {AccountNumber}
   */
  get account() {
    return this[P_ACCOUNT];
  }

  /**
   * Gets a textual representation of the operation.
   *
   * @returns {String}
   */
  get opTxt() {
    return this[P_OPTXT];
  }

  /**
   * Gets the amount.
   *
   * @returns {Currency}
   */
  get amount() {
    return this[P_AMOUNT];
  }

  /**
   * Gets the fee.
   *
   * @returns {Currency}
   */
  get fee() {
    return this[P_FEE];
  }

  /**
   * Gets the balance of the account.
   *
   * @returns {Number}
   */
  get balance() {
    return this[P_BALANCE];
  }

  /**
   * Gets the operation hash.
   *
   * @returns {OperationHash}
   */
  get opHash() {
    return this[P_OPHASH];
  }

  /**
   * Gets the <= V2 operation Hash.
   *
   * @returns {BC|null}
   */
  get oldOpHash() {
    return this[P_OLD_OPHASH];
  }

  /**
   * Gets the subtype.
   *
   * @returns {String}
   */
  get subType() {
    return this[P_SUBTYPE];
  }

  /**
   * Gets the signer account number.
   *
   * @returns {AccountNumber|null}
   */
  get signerAccount() {
    return this[P_SIGNER_ACCOUNT];
  }

  /**
   * Gets the payload.
   *
   * @returns {BC}
   */
  get payload() {
    return this[P_PAYLOAD];
  }

  /**
   * Gets the list of changers.
   *
   * @returns {Changer[]}
   */
  get changers() {
    return this[P_CHANGERS];
  }

  /**
   * Gets the list of senders.
   *
   * @returns {Sender[]}
   */
  get senders() {
    return this[P_SENDERS];
  }

  /**
   * Gets the list of receivers.
   *
   * @returns {Receiver[]}
   */
  get receivers() {
    return this[P_RECEIVERS];
  }

  /**
   * Gets a value indicating whether the operation is a BLOCKCHAIN_REWARD operation.
   *
   * @returns {boolean}
   */
  isBlockchainReward() {
    return this[P_OPTYPE] === Operation.BLOCKCHAIN_REWARD;
  }

  /**
   * Gets a value indicating whether the operation is a TRANSACTION operation.
   *
   * @returns {boolean}
   */
  isTransaction() {
    return this[P_OPTYPE] === Operation.TRANSACTION;
  }

  /**
   * Gets a value indicating whether the operation is a CHANGE_KEY operation.
   *
   * @returns {boolean}
   */
  isChangeKey() {
    return this[P_OPTYPE] === Operation.CHANGE_KEY;
  }

  /**
   * Gets a value indicating whether the operation is a RECOVER_FUNDS operation.
   *
   * @returns {boolean}
   */
  isRecoverFunds() {
    return this[P_OPTYPE] === Operation.RECOVER_FUNDS;
  }

  /**
   * Gets a value indicating whether the operation is a LIST_FOR_SALE operation.
   *
   * @returns {boolean}
   */
  isListForSale() {
    return this[P_OPTYPE] === Operation.LIST_FOR_SALE;
  }

  /**
   * Gets a value indicating whether the operation is a DELIST operation.
   *
   * @returns {boolean}
   */
  isDelist() {
    return this[P_OPTYPE] === Operation.DELIST;
  }

  /**
   * Gets a value indicating whether the operation is a BUY operation.
   *
   * @returns {boolean}
   */
  isBuy() {
    return this[P_OPTYPE] === Operation.BUY;
  }

  /**
   * Gets a value indicating whether the operation is a CHANGE_KEY_ACCOUNT operation.
   *
   * @returns {boolean}
   */
  isChangeKeyAccount() {
    return this[P_OPTYPE] === Operation.CHANGE_KEY_ACCOUNT;
  }

  /**
   * Gets a value indicating whether the operation is a CHANGE_ACCOUNT_INFO operation.
   *
   * @returns {boolean}
   */
  isChangeAccountInfo() {
    return this[P_OPTYPE] === Operation.CHANGE_ACCOUNT_INFO;
  }

  /**
   * Gets a value indicating whether the operation is a MULTI_OPERATION operation.
   *
   * @returns {boolean}
   */
  isMultiOperation() {
    return this[P_OPTYPE] === Operation.MULTI_OPERATION;
  }

  /**
   * Gets a value indicating whether the operation is a DATA operation.
   *
   * @returns {boolean}
   */
  isData() {
    return this[P_OPTYPE] === Operation.DATA;
  }

  /**
   * Gets a value indicating whether the op is pending.
   *
   * @returns {boolean}
   */
  isPending() {
    return this[P_BLOCK] === 0;
  }

  /**
   * Gets a value indicating whether the operation was not executed because of
   * fees.
   *
   * @returns {boolean}
   */
  isZeroFeeError() {
    return this.valid === false &&
        this[P_ERRORS].indexOf('zero fee operations per block') > -1;
  }
}

module.exports = Operation;
