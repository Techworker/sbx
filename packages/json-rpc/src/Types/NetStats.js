/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');

const P_BRECEIVED = Symbol('breceived');
const P_SERVERS_T = Symbol('servers_t');
const P_TSERVERS = Symbol('tservers');
const P_TOTAL = Symbol('total');
const P_BSEND = Symbol('bsend');
const P_SERVERS = Symbol('servers');
const P_CLIENTS = Symbol('clients');
const P_ACTIVE = Symbol('active');
const P_TCLIENTS = Symbol('tclients');

/**
 * Class that holds netstats of a node server.
 */
class NetStats extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  static createFromRPC(data) {

    let netStats = new NetStats(data);

    netStats[P_BRECEIVED] = parseInt(data.breceived, 10);
    netStats[P_SERVERS_T] = parseInt(data.servers_t, 10);
    netStats[P_TSERVERS] = parseInt(data.tservers, 10);
    netStats[P_TOTAL] = parseInt(data.total, 10);
    netStats[P_BSEND] = parseInt(data.bsend, 10);
    netStats[P_SERVERS] = parseInt(data.servers, 10);
    netStats[P_CLIENTS] = parseInt(data.clients, 10);
    netStats[P_ACTIVE] = parseInt(data.active, 10);
    netStats[P_TCLIENTS] = parseInt(data.tclients, 10);

    return netStats;
  }

  /**
     * Gets the received bytes.
     *
     * @returns {Number}
     */
  get breceived() {
    return this[P_BRECEIVED];
  }

  /**
     * Gets the number of server connections
     *
     * @returns {Number}
     */
  get serversT() {
    return this[P_SERVERS_T];
  }

  /**
     * Gets the number of server connections.
     *
     * @returns {Number}
     */
  get tservers() {
    return this[P_TSERVERS];
  }

  /**
     * Gets the number of total connections.
     *
     * @returns {Number}
     */
  get total() {
    return this[P_TOTAL];
  }

  /**
     * Gets the number of bytes sent.
     *
     * @returns {Number}
     */
  get bsend() {
    return this[P_BSEND];
  }

  /**
     * Gets the number of servers that responded.
     *
     * @returns {Number}
     */
  get servers() {
    return this[P_SERVERS];
  }

  /**
     * Gets the number of client connections.
     *
     * @returns {Number}
     */
  get clients() {
    return this[P_CLIENTS];
  }

  /**
     * Gets the number of active connections.
     *
     * @returns {Number}
     */
  get active() {
    return this[P_ACTIVE];
  }

  /**
     * Gets the number of total client connections.
     *
     * @returns {Number}
     */
  get tclients() {
    return this[P_TCLIENTS];
  }
}

module.exports = NetStats;
