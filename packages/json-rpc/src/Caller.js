/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const jaysonBrowserClient = require('jayson/lib/client/browser');
const fetch = require('node-fetch');
const ConnectionError = require('./Errors/ConnectionError');
const ResultError = require('./Errors/ResultError');

const P_CLIENT = Symbol('client');

/**
 * A caller object that can call JSON-RPC methods.
 */
class Caller {
  /**
     * Creates a new caller instance.
     *
     * @param {String} host
     */
  constructor(host) {
    this[P_CLIENT] = jaysonBrowserClient((request, callback) => {
      const options = {
        method: 'POST',
        body: request,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return fetch(host, options)
        .then(res => res.text())
        .then((text) => {
          callback(null, text);
        })
        .catch((err) => {
          callback(err);
        });
    });
  }

  /**
     * Calls the given method with the given params and returns a promise.
     *
     * @param {String}method
     * @param {Object} params
     * @returns {Promise<any>}
     */
  call(method, params) {
    return new Promise((resolve, reject) => {
      this[P_CLIENT].request(method, params, (err, error, result) => {
        if (err !== null || error !== undefined || result === undefined) {
          if (err !== null && err.constructor.name === 'FetchError') {
            return reject(new ConnectionError(err));
          }
          return reject(new ResultError(error.code, error.message));
        }
        return resolve(result);
      });
    });
  }
}

module.exports = Caller;
