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
  static createFromRPC(data) {
    let nodeServer = new NodeServer(data);

    nodeServer[P_PORT] = parseInt(data.port, 10);
    nodeServer[P_LASTCON] = parseInt(data.lastcon, 10);
    nodeServer[P_ATTEMPTS] = parseInt(data.attempts, 10);
    nodeServer[P_IP] = data.ip;

    return nodeServer;
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
