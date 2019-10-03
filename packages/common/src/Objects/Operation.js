/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const AccountNumber = require('./../Types/AccountNumber');
const Payload = require('./../Types/Payload');
const BC = require('./../BC');
const Currency = require('./../Types/Currency');
const OperationHashCoder = require('./../Coding/Pascal/OperationHash');

const opHashCoder = new OperationHashCoder();

const Sender = require('./Sender');
const Receiver = require('./Receiver');
const Changer = require('./Changer');

const P_IS_VALID = Symbol('valid.isValid');
const P_ERRORS = Symbol('errors');
const P_BLOCK_NUMBER = Symbol('block.blockNumber');
const P_BLOCK_TIME = Symbol('time.blockTime');
const P_OP_BLOCK = Symbol('opblock.opBlock');
const P_PAYLOAD = Symbol('payload');
const P_PAYLOAD_TYPE = Symbol('payload_type');
const P_MATURATION = Symbol('maturation');
const P_OP_TYPE = Symbol('optype.opType');
const P_ACCOUNT_NUMBER = Symbol('account.accountNumber');
const P_OP_DESCRIPTION = Symbol('optxt.opDescription');
const P_AMOUNT = Symbol('amount_s.amount');
const P_FEE = Symbol('fee_s.dee');
const P_BALANCE = Symbol('balance_s.balance');
const P_OP_HASH = Symbol('ophash.opHash');
const P_OLD_OP_HASH = Symbol('old_ophash.oldOpHash');
const P_SUB_TYPE = Symbol('subtype.subType');
const P_SIGNER_ACCOUNT_NUMBER = Symbol('signer_account.signerAccountNumber');
const P_CHANGERS = Symbol('changers');
const P_SENDERS = Symbol('senders');
const P_RECEIVERS = Symbol('receivers');

const ALL_PROPS = [
  P_IS_VALID, P_ERRORS, P_BLOCK_NUMBER, P_BLOCK_TIME, P_OP_BLOCK, P_PAYLOAD, P_PAYLOAD_TYPE, P_MATURATION,
  P_OP_TYPE, P_ACCOUNT_NUMBER, P_OP_DESCRIPTION, P_AMOUNT, P_FEE, P_BALANCE, P_OP_HASH, P_OLD_OP_HASH,
  P_SUB_TYPE, P_SIGNER_ACCOUNT_NUMBER, P_CHANGERS, P_SENDERS, P_RECEIVERS
];

const P_RECEIVER_CLASS = Symbol('receiver_class');
const P_SENDER_CLASS = Symbol('sender_class');
const P_CHANGER_CLASS = Symbol('changer_class');

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

  constructor(initializationData) {
    super(initializationData);
    this[P_RECEIVER_CLASS] = Receiver;
    this[P_SENDER_CLASS] = Sender;
    this[P_CHANGER_CLASS] = Changer;
  }

  /**
   * Sets the class used to initialize a receiver.
   *
   * @param {Function} receiverClass
   */
  set receiverClass(receiverClass) {
    this[P_RECEIVER_CLASS] = receiverClass;
  }

  /**
   * Sets the class used to initialize a sender.
   *
   * @param {Function} senderClass
   */
  set senderClass(senderClass) {
    this[P_SENDER_CLASS] = senderClass;
  }

  /**
   * Sets the class used to initialize a changer.
   *
   * @param {Function} changerClass
   */
  set changerClass(changerClass) {
    this[P_CHANGER_CLASS] = changerClass;
  }

  /**
   * Creates a new Operation instance from an rpc response.
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let operation = new this(data);
    let mappedData = operation.mapInitializationDataWithProperties(ALL_PROPS);

    operation[P_IS_VALID] = true;
    if (mappedData[P_IS_VALID] !== undefined) {
      operation[P_IS_VALID] = !!mappedData[P_IS_VALID];
    }

    operation[P_ERRORS] = null;
    if (mappedData[P_ERRORS] !== undefined) {
      operation[P_ERRORS] = mappedData[P_ERRORS];
    }

    if (mappedData[P_PAYLOAD] !== undefined) {
      operation[P_PAYLOAD] = new Payload(BC.fromHex(mappedData[P_PAYLOAD]), mappedData[P_PAYLOAD_TYPE]);
    } else {
      operation[P_PAYLOAD] = new Payload(BC.fromHex(''));
    }

    operation[P_BLOCK_NUMBER] = parseInt(mappedData[P_BLOCK_NUMBER], 10);
    operation[P_BLOCK_TIME] = parseInt(mappedData[P_BLOCK_TIME], 10);
    operation[P_OP_BLOCK] = parseInt(mappedData[P_OP_BLOCK], 10);

    operation[P_MATURATION] = 0;
    // pending
    if (mappedData[P_MATURATION] !== null) {
      operation[P_MATURATION] = parseInt(mappedData[P_MATURATION], 10);
    }

    operation[P_OP_TYPE] = parseInt(mappedData[P_OP_TYPE], 10);
    // multi-op
    operation[P_ACCOUNT_NUMBER] = null;
    if (mappedData[P_ACCOUNT_NUMBER] !== undefined) {
      operation[P_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_ACCOUNT_NUMBER]);
    }

    operation[P_OP_DESCRIPTION] = mappedData[P_OP_DESCRIPTION];
    operation[P_AMOUNT] = new Currency(mappedData[P_AMOUNT]);
    operation[P_FEE] = new Currency(mappedData[P_FEE]);
    operation[P_BALANCE] = null;
    if (mappedData[P_BALANCE] !== undefined) {
      operation[P_BALANCE] = new Currency(mappedData[P_BALANCE]);
    }

    operation[P_OP_HASH] = null;
    if (mappedData[P_OP_HASH] !== undefined) {
      operation[P_OP_HASH] = BC.fromHex(mappedData[P_OP_HASH]);
      if (operation[P_OP_TYPE] !== Operation.BLOCKCHAIN_REWARD) {
        operation[P_OP_HASH] = opHashCoder.decodeFromBytes(operation[P_OP_HASH]);
      }
    }

    operation[P_OLD_OP_HASH] = null;
    if (mappedData[P_OLD_OP_HASH] !== undefined) {
      operation[P_OLD_OP_HASH] = BC.fromHex(mappedData[P_OLD_OP_HASH]);
    }

    operation[P_SUB_TYPE] = mappedData[P_SUB_TYPE];
    operation[P_SIGNER_ACCOUNT_NUMBER] = null;
    if (mappedData[P_SIGNER_ACCOUNT_NUMBER] !== undefined) {
      operation[P_SIGNER_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_SIGNER_ACCOUNT_NUMBER]);
    }

    // eslint-disable-next-line no-multi-assign
    operation[P_SENDERS] = [];
    operation[P_RECEIVERS] = [];
    operation[P_CHANGERS] = [];

    // loop given data and initialize objects
    mappedData[P_SENDERS].forEach(s => {
      operation[P_SENDERS].push(operation[P_SENDER_CLASS].createFromObject(s));
    });
    mappedData[P_RECEIVERS].forEach(r => {
      operation[P_RECEIVERS].push(operation[P_RECEIVER_CLASS].createFromObject(r));
    });
    mappedData[P_CHANGERS].forEach(c => {
      operation[P_CHANGERS].push(operation[P_CHANGER_CLASS].createFromObject(c));
    });

    return operation;
  }

  /**
   * Gets an indicator whether the operation was valid.
   *
   * @returns {Boolean}
   */
  get isValid() {
    return this[P_IS_VALID];
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
  get blockNumber() {
    return this[P_BLOCK_NUMBER];
  }

  /**
   * Gets the time of the operation.
   *
   * @returns {Number}
   */
  get blockTime() {
    return this[P_BLOCK_TIME];
  }

  /**
   * Gets the position inside a block.
   *
   * @returns {Number}
   */
  get opBlock() {
    return this[P_OP_BLOCK];
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
    return this[P_OP_TYPE];
  }

  /**
   * Gets the account.
   *
   * @returns {AccountNumber}
   */
  get accountNumber() {
    return this[P_ACCOUNT_NUMBER];
  }

  /**
   * Gets a textual representation of the operation.
   *
   * @returns {String}
   */
  get opDescription() {
    return this[P_OP_DESCRIPTION];
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
    return this[P_OP_HASH];
  }

  /**
   * Gets the <= V2 operation Hash.
   *
   * @returns {BC|null}
   */
  get oldOpHash() {
    return this[P_OLD_OP_HASH];
  }

  /**
   * Gets the subtype.
   *
   * @returns {String}
   */
  get subType() {
    return this[P_SUB_TYPE];
  }

  /**
   * Gets the signer account number.
   *
   * @returns {AccountNumber|null}
   */
  get signerAccountNumber() {
    return this[P_SIGNER_ACCOUNT_NUMBER];
  }

  /**
   * Gets the payload.
   *
   * @returns {Payload}
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
    return this[P_OP_TYPE] === Operation.BLOCKCHAIN_REWARD;
  }

  /**
   * Gets a value indicating whether the operation is a TRANSACTION operation.
   *
   * @returns {boolean}
   */
  isTransaction() {
    return this[P_OP_TYPE] === Operation.TRANSACTION;
  }

  /**
   * Gets a value indicating whether the operation is a CHANGE_KEY operation.
   *
   * @returns {boolean}
   */
  isChangeKey() {
    return this[P_OP_TYPE] === Operation.CHANGE_KEY;
  }

  /**
   * Gets a value indicating whether the operation is a RECOVER_FUNDS operation.
   *
   * @returns {boolean}
   */
  isRecoverFunds() {
    return this[P_OP_TYPE] === Operation.RECOVER_FUNDS;
  }

  /**
   * Gets a value indicating whether the operation is a LIST_FOR_SALE operation.
   *
   * @returns {boolean}
   */
  isListForSale() {
    return this[P_OP_TYPE] === Operation.LIST_FOR_SALE;
  }

  /**
   * Gets a value indicating whether the operation is a DELIST operation.
   *
   * @returns {boolean}
   */
  isDelist() {
    return this[P_OP_TYPE] === Operation.DELIST;
  }

  /**
   * Gets a value indicating whether the operation is a BUY operation.
   *
   * @returns {boolean}
   */
  isBuy() {
    return this[P_OP_TYPE] === Operation.BUY;
  }

  /**
   * Gets a value indicating whether the operation is a CHANGE_KEY_ACCOUNT operation.
   *
   * @returns {boolean}
   */
  isChangeKeyAccount() {
    return this[P_OP_TYPE] === Operation.CHANGE_KEY_ACCOUNT;
  }

  /**
   * Gets a value indicating whether the operation is a CHANGE_ACCOUNT_INFO operation.
   *
   * @returns {boolean}
   */
  isChangeAccountInfo() {
    return this[P_OP_TYPE] === Operation.CHANGE_ACCOUNT_INFO;
  }

  /**
   * Gets a value indicating whether the operation is a MULTI_OPERATION operation.
   *
   * @returns {boolean}
   */
  isMultiOperation() {
    return this[P_OP_TYPE] === Operation.MULTI_OPERATION;
  }

  /**
   * Gets a value indicating whether the operation is a DATA operation.
   *
   * @returns {boolean}
   */
  isData() {
    return this[P_OP_TYPE] === Operation.DATA;
  }

  /**
   * Gets a value indicating whether the op is pending.
   *
   * @returns {boolean}
   */
  isPending() {
    return this[P_BLOCK_NUMBER] === 0;
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
