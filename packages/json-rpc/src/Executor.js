/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const P_CALLER = Symbol('caller');

const AccountNumber = require('@sbx/common').Types.AccountNumber;
const AccountName = require('@sbx/common').Types.AccountName;
const OperationHash = require('@sbx/common').Types.OperationHash;
const PublicKey = require('@sbx/common').Types.Keys.PublicKey;
const KeyPair = require('@sbx/common').Types.Keys.KeyPair;
const Currency = require('@sbx/common').Types.Currency;
const BC = require('@sbx/common').BC;

const Block = require('./Types/Block');
const WalletPublicKey = require('./Types/WalletPublicKey');
const Account = require('./Types/Account');

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
        newParams[newField] = item.encode().toHex();
      } else if (item instanceof WalletPublicKey) {
        newParams[newField] = item.publicKey.encode().toHex();
      } else if (item instanceof KeyPair) {
        newParams[newField] = item.publicKey.encode().toHex();
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
      if (newParams[field].isVague()) {
        throw new Error('Currency value has more that 4 decimals, you need ' +
            'to round the value by yourself. We will not round automagically.');
      } else {
        newParams[field] = newParams[field].toStringOpt();
      }
    } else if (typeof item === 'boolean') {
      newParams[field] = item;
    } else if (item instanceof BC) {
      newParams[field] = item.toHex();
    } else if (item instanceof OperationHash) {
      newParams[field] = item.encode().toHex();
    } else if (item instanceof Account) {
      newParams[field] = item.account.account; // NICE!!!!! :-D
    } else if (item instanceof AccountNumber) {
      newParams[field] = item.account;
    } else if (item instanceof AccountName) {
      newParams[field] = item.toString();
    } else if (item instanceof Block) {
      newParams[field] = item.block;
    } else if (item instanceof Currency) {
      if (item.isVague()) {
        throw new Error('Currency value has more that 4 decimals, you need ' +
            'to round the value by yourself. We will not round automagically.');
      }
      newParams[field] = item.toStringOpt();
    } else if (typeof item === 'number') {
      newParams[field] = item;
    } else {
      newParams[field] = item.toString();
    }
  });

  return newParams;
}

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
   * @param {String} method
   * @param {Object} params
   * @param {Function} transformCallback
   * @returns {Promise<any>}
   */
  async execute(method, params, transformCallback = r => r) {
    return new Promise((resolve, reject) => {
      this[P_CALLER].call(method, transformRpcParams(params))
        .then(response => resolve(transformCallback(response)))
        .catch(error => reject(error));
    });
  }

  /**
   * Calls the given method with the given params and returns a promise that
   * itself will transform the returned value and resolve the promise.
   *
   * @param {Object} action
   * @param {Function} transformCallback
   * @returns {Promise<any>}
   */
  async executeAll(action, transformCallback = r => r) {
    const all = [];
    let result = [];

    do {
      result = await this.execute(action.method, action.params, transformCallback);
      result.forEach(item => all.push(item));
      action.changeParam('start', action.params.start + action.params.max);
    } while (result.length > 0 && result.length === action.params.max);

    return all;
  }

  /**
     * Calls the rpc method with the given parameters and returns a promise that
     * resolves with an array of objects of the given Destination type.
     *
     * @param {String} method
     * @param {Object} params
     * @param {*} DestinationType
     * @returns {Promise<any>}
     */
  async executeTransformArray(method, params, DestinationType) {
    return this.execute(method, params, r => r.map(ri => new DestinationType(ri)));
  }

  /**
     * Calls the rpc method with the given parameters and returns a promise that
     * resolves with an object of the given Destination type.
     *
     * @param {String} method
     * @param {Object} params
     * @param {*} DestinationType
     * @returns {Promise<any>}
     */
  async executeTransformItem(method, params, DestinationType) {
    return this.execute(method, params, (r) => {
      return new DestinationType(r);
    });
  }
}

module.exports = Executor;
