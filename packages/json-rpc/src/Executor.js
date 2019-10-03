/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const P_CALLER = Symbol('caller');

const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;
const OperationHash = require('@pascalcoin-sbx/common').Types.OperationHash;
const OperationHashCoder = require('@pascalcoin-sbx/common').Coding.Pascal.OperationHash;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const KeyPair = require('@pascalcoin-sbx/common').Types.Keys.KeyPair;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const BC = require('@pascalcoin-sbx/common').BC;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const Block = require('@pascalcoin-sbx/common').Objects.Block;
const WalletPublicKey = require('@pascalcoin-sbx/common').Objects.WalletPublicKey;
const Account = require('@pascalcoin-sbx/common').Objects.Account;

const publicKeyCoder = new PublicKeyCoder();
const opHashCoder = new OperationHashCoder();

/**
 * Simple function that transforms the values of an object to make them usable
 * in rpc calls.
 *
 * @param {Object} params
 * @returns {Object}
 */
function transformRpcParams(params) {
  const newParams = {};

  Object.keys(params).forEach((field) => {
    const item = params[field];

    // we weill delete fields that are null
    if (item === null) {

    } else if (field.indexOf('pubkey') !== -1) {
      // correct the field name..
      let newField = field.replace('pubkey', 'enc_pubkey');

      // and set the value
      if (item instanceof BC) {
        newParams[newField] = item.toHex();
      } else if (item instanceof PublicKey) {
        newParams[newField] = publicKeyCoder.encodeToBytes(item).toHex();
      } else if (item instanceof WalletPublicKey) {
        newParams[newField] = publicKeyCoder.encodeToBytes(item.publicKey).toHex();
      } else if (item instanceof KeyPair) {
        newParams[newField] = publicKeyCoder.encodeToBytes(item.publicKey).toHex();
      } else {
        newField = newField.replace('enc_pubkey', 'b58_pubkey');
        newParams[newField] = item.toString();
      }
    } else if (field === 'payload' && !(item instanceof BC)) {
      newParams[field] = BC.fromString(item).toHex();
    } else if (field === 'max' || field === 'start' || field === 'end' || field === 'depth') {
      newParams[field] = parseInt(item, 10);
    } else if ((field === 'fee' || field === 'amount' || field === 'price') &&
        !(params[field] instanceof Currency)
    ) {
      newParams[field] = new Currency(item);
      newParams[field] = newParams[field].toStringOpt();
    } else if (typeof item === 'boolean') {
      newParams[field] = item;
    } else if (field === 'senders') {
      newParams[field] = item.map(senderItem => {
        let o = {
          account: senderItem.account.account,
          amount: senderItem.amount.toStringOpt(),
          payload: senderItem.payload.toHex()
        };

        if (!isNaN(senderItem.nOperation)) {
          o.n_operation = senderItem.nOperation;
        }
        return o;
      });
    } else if (field === 'receivers') {
      newParams[field] = item.map(receiverItem => {
        return {
          account: receiverItem.account.account,
          amount: receiverItem.amount.toStringOpt(),
          payload: receiverItem.payload.toHex()
        };
      });
    } else if (field === 'changesinfo') {
      newParams[field] = item.map(changerItem => {
        let o = {
          account: changerItem.account.account
        };

        if (changerItem.newPublicKey !== null) {
          o.new_b58_pubkey = new PublicKeyCoder().encodeToBase58(changerItem.newPublicKey);
        }
        if (changerItem.newName !== null) {
          o.new_name = changerItem.newName.toString();
        }
        if (changerItem.newType !== null) {
          o.new_type = changerItem.newType;
        }

        if (!isNaN(changerItem.nOperation)) {
          o.n_operation = changerItem.nOperation;
        }
        return o;
      });
    } else if (item.constructor.name === 'Array') {
      if (item.length > 0) {
        newParams[field] = item;
      }
    } else if (item instanceof BC) {
      newParams[field] = item.toHex();
    } else if (item instanceof OperationHash) {
      newParams[field] = opHashCoder.encodeToBytes(item).toHex();
    } else if (item instanceof Account) {
      newParams[field] = item.accountNumber.account;
    } else if (item instanceof AccountNumber) {
      newParams[field] = item.account;
    } else if (item instanceof AccountName) {
      newParams[field] = item.toString();
    } else if (item instanceof Block) {
      newParams[field] = item.blockNumber;
    } else if (item instanceof Currency) {
      newParams[field] = item.toStringOpt();
    } else if (typeof item === 'number') {
      newParams[field] = item;
    } else {
      newParams[field] = item.toString();
    }
  });

  return newParams;
}

function transformRpcResult(value, DestinationType) {
  switch (DestinationType.name) {
    case 'Boolean':
      return !!value;
    case 'String':
      return value.toString();
    case 'Object':
      return value;
    case 'BC':
      return BC.from(value);
    default:
      if (DestinationType.createFromObject !== undefined) {
        return DestinationType.createFromObject(value);
      }

      return new DestinationType(value);
  }
};

/**
 * This class will execute an rpc call and returns a promise.
 */
class Executor {
  /**
     * Constructor
     *
     * @param {Caller} caller
     */
  constructor(caller) {
    this[P_CALLER] = caller;
  }

  /**
   * Calls the given method with the given params and returns a promise that
   * itself will transform the returned value and resolve the promise.
   *
   * @param {BaseAction} action
   * @param {Function|null} transformCallback
   * @returns {Promise<any>}
   */
  async execute(action, transformCallback = null) {
    transformCallback = transformCallback || this.transform(action.destinationType, action.returnsArray);
    return new Promise((resolve, reject) => {
      this[P_CALLER].call(action.method, transformRpcParams(action.params))
        .then((response) => {
          resolve([response, transformCallback, action.requestId]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Transforms a raw response value to a special type.
   *
   * @param {*} DestinationType
   * @param {Boolean} returnsArray
   * @returns {*}
   */
  transform(DestinationType, returnsArray) {
    if (returnsArray) {
      return function (value) {
        return value.map(v => transformRpcResult(v, DestinationType));
      };
    }

    return function (value) {
      return transformRpcResult(value, DestinationType);
    };
  }
}

module.exports = Executor;
