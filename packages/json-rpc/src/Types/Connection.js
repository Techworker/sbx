/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');

const P_RECV = Symbol('recv');
const P_TIMEDIFF = Symbol('timediff');
const P_NETVER_A = Symbol('nerver_a');
const P_SECS = Symbol('secs');
const P_SERVER = Symbol('server');
const P_IP = Symbol('ip');
const P_NETVER = Symbol('netver');
const P_SENT = Symbol('sent');
const P_APPVER = Symbol('appver');
const P_PORT = Symbol('port');

/**
 * Holds information about a node connection.
 */
class Connection extends Abstract {
  /**
   * Constructor
   *
   * @param {Object} data
   */
  constructor(data) {
    super(data);
    this[P_RECV] = parseInt(data.recv, 10);
    this[P_TIMEDIFF] = parseInt(data.timediff, 10);
    this[P_NETVER_A] = parseInt(data.netver_a, 10);
    this[P_SECS] = parseInt(data.secs, 10);
    this[P_SERVER] = !!data.server;
    this[P_IP] = data.ip;
    this[P_NETVER] = parseInt(data.netver, 10);
    this[P_SENT] = parseInt(data.sent, 10);
    this[P_APPVER] = data.appver;
    this[P_PORT] = parseInt(data.port, 10);
  }

  /**
   * Gets the number of received bytes from the connection.
   *
   * @returns {Number}
   */
  get recv() {
    return this[P_RECV];
  }

  /**
   * Gets the time difference of the current and the remote node in seconds.
   *
   * @returns {Number}
   */
  get timeDiff() {
    return this[P_TIMEDIFF];
  }

  /**
   * Net protocol available of other node
   *
   * @returns {Number}
   */
  get netVerA() {
    return this[P_NETVER_A];
  }

  /**
   * The duration of the connection.
   *
   * @returns {Number}
   */
  get secs() {
    return this[P_SECS];
  }

  /**
   * A flag indicating whether the other node is a server node (daemon).
   * @returns {*}
   */
  get server() {
    return this[P_SERVER];
  }

  /**
   * The IP of the remote node.
   *
   * @returns {*}
   */
  get ip() {
    return this[P_IP];
  }

  /**
   * The netprotocol version of the other node.
   *
   * @returns {*}
   */
  get netVer() {
    return this[P_NETVER];
  }

  /**
   * The bytes sent to the other node.
   *
   * @returns {*}
   */
  get sent() {
    return this[P_SENT];
  }

  /**
   * The node version.
   *
   * @returns {*}
   */
  get appVer() {
    return this[P_APPVER];
  }

  /**
   * The port of the other node.
   *
   * @returns {*}
   */
  get port() {
    return this[P_PORT];
  }
}

module.exports = Connection;
