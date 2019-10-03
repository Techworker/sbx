/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');

const P_PORT = Symbol('port');
const P_LAST_CONNECTION_TIME = Symbol('lastcon.lastConnectionTime');
const P_COUNT_ATTEMPTS = Symbol('attempts.countAttempts');
const P_IP = Symbol('ip');

const ALL_PROPS = [
  P_PORT, P_LAST_CONNECTION_TIME, P_COUNT_ATTEMPTS, P_IP
];

/**
 * Holds information about a single node server connection.
 */
class NodeServer extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  static createFromObject(data) {
    let nodeServer = new this(data);
    let mappedData = nodeServer.mapInitializationDataWithProperties(ALL_PROPS);

    nodeServer[P_PORT] = parseInt(mappedData[P_PORT], 10);
    nodeServer[P_LAST_CONNECTION_TIME] = parseInt(mappedData[P_LAST_CONNECTION_TIME], 10);
    nodeServer[P_COUNT_ATTEMPTS] = parseInt(mappedData[P_COUNT_ATTEMPTS], 10);
    nodeServer[P_IP] = mappedData[P_IP];

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
  get lastConnectionTime() {
    return this[P_LAST_CONNECTION_TIME];
  }

  /**
     * Gets the number of connection attempts.
     *
     * @returns {Number}
     */
  get countAttempts() {
    return this[P_COUNT_ATTEMPTS];
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
