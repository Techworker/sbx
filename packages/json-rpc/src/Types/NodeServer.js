/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');

const P_PORT = Symbol('port');
const P_LASTCON = Symbol('lastcon');
const P_ATTEMPTS = Symbol('attempts');
const P_IP = Symbol('ip');

/**
 * Holds information about a single node server connection.
 */
class NodeServer extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  constructor(data) {
    super(data);

    this[P_PORT] = parseInt(data.port, 10);
    this[P_LASTCON] = parseInt(data.lastcon, 10);
    this[P_ATTEMPTS] = parseInt(data.attempts, 10);
    this[P_IP] = data.ip;
  }

  /**
     * Gets the port of the server.
     *
     * @returns {Number}
     */
  get port() {
    return this[P_PORT];
  }

  /**
     * Gets the timestamp of the last connection.
     *
     * @returns {Number}
     */
  get lastcon() {
    return this[P_LASTCON];
  }

  /**
     * Gets the number of connection attempts.
     *
     * @returns {Number}
     */
  get attempts() {
    return this[P_ATTEMPTS];
  }

  /**
     * Gets the IP of the node.
     *
     * @returns {String}
     */
  get ip() {
    return this[P_IP];
  }
}

module.exports = NodeServer;
