/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');

const P_BYTES_RECEIVED = Symbol('breceived.bytesReceived');
const P_BYTES_SENT = Symbol('bsend.bytesSent');

const P_COUNT_ACTIVE_CONNECTIONS = Symbol('active.countActiveConnections');
const P_COUNT_CLIENT_CONNECTIONS = Symbol('clients.countClientConnections');
const P_COUNT_SERVER_CONNECTIONS_WITH_RESPONSE = Symbol('servers.countServerConnectionsWithResponse');
const P_COUNT_SERVER_CONNECTIONS = Symbol('servers_t.countServerConnections'); // servers_t

const P_COUNT_TOTAL_CONNECTIONS = Symbol('total.countTotalConnections');

const P_COUNT_TOTAL_CLIENT_CONNECTIONS = Symbol('tclients.countTotalClientConnections');
const P_COUNT_TOTAL_SERVER_CONNECTIONS = Symbol('tservers.countTotalServerConnections');

const ALL_PROPS = [
  P_BYTES_RECEIVED, P_BYTES_SENT, P_COUNT_ACTIVE_CONNECTIONS, P_COUNT_CLIENT_CONNECTIONS,
  P_COUNT_SERVER_CONNECTIONS_WITH_RESPONSE, P_COUNT_SERVER_CONNECTIONS, P_COUNT_TOTAL_CONNECTIONS,
  P_COUNT_TOTAL_CLIENT_CONNECTIONS, P_COUNT_TOTAL_SERVER_CONNECTIONS
];

/**
 * Class that holds netstats of a node server.
 */
class NetStats extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  static createFromObject(data) {

    let netStats = new this(data);
    let mappedData = netStats.mapInitializationDataWithProperties(ALL_PROPS);

    netStats[P_COUNT_ACTIVE_CONNECTIONS] = parseInt(mappedData[P_COUNT_ACTIVE_CONNECTIONS], 10);
    netStats[P_COUNT_CLIENT_CONNECTIONS] = parseInt(mappedData[P_COUNT_CLIENT_CONNECTIONS], 10);
    netStats[P_COUNT_SERVER_CONNECTIONS_WITH_RESPONSE] =
      parseInt(mappedData[P_COUNT_SERVER_CONNECTIONS_WITH_RESPONSE], 10);
    netStats[P_COUNT_SERVER_CONNECTIONS] = parseInt(mappedData[P_COUNT_SERVER_CONNECTIONS], 10);
    netStats[P_COUNT_TOTAL_CONNECTIONS] = parseInt(mappedData[P_COUNT_TOTAL_CONNECTIONS], 10);

    netStats[P_COUNT_TOTAL_CLIENT_CONNECTIONS] = parseInt(mappedData[P_COUNT_TOTAL_CLIENT_CONNECTIONS], 10);
    netStats[P_COUNT_TOTAL_SERVER_CONNECTIONS] = parseInt(mappedData[P_COUNT_TOTAL_SERVER_CONNECTIONS], 10);

    netStats[P_BYTES_RECEIVED] = parseInt(mappedData[P_BYTES_RECEIVED], 10);
    netStats[P_BYTES_SENT] = parseInt(mappedData[P_BYTES_SENT], 10);

    return netStats;
  }

  /**
   * Gets the received bytes.
   *
   * @returns {Number}
   */
  get bytesReceived() {
    return this[P_BYTES_RECEIVED];
  }

  /**
   * Gets the sent bytes.
   *
   * @returns {Number}
   */
  get bytesSent() {
    return this[P_BYTES_SENT];
  }

  get countActiveConnections() {
    return this[P_COUNT_ACTIVE_CONNECTIONS];
  }

  get countClientConnections() {
    return this[P_COUNT_TOTAL_CLIENT_CONNECTIONS];
  }

  get countServerConnectionsWithResponse() {
    return this[P_COUNT_SERVER_CONNECTIONS_WITH_RESPONSE];
  }

  get countServerConnections() {
    return this[P_COUNT_SERVER_CONNECTIONS];
  }

  get countTotalConnections() {
    return this[P_COUNT_TOTAL_CONNECTIONS];
  }

  get countTotalClientConnections() {
    return this[P_COUNT_TOTAL_CLIENT_CONNECTIONS];
  }

  get countTotalServerConnections() {
    return this[P_COUNT_TOTAL_SERVER_CONNECTIONS];
  }
}

module.exports = NetStats;
