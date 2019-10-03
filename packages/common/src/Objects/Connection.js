/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');

const P_RECEIVED_BYTES = Symbol('recv.receivedBytes');
const P_TIME_DIFF = Symbol('timediff.timeDiff');
const P_NET_PROTOCOL = Symbol('netver.netProtocol');
const P_CONNECTION_ALIVE_SECONDS = Symbol('secs,connectionAliveSeconds');
const P_IS_SERVER = Symbol('server');
const P_IP = Symbol('ip');
const P_NET_PROTOCOL_AVAILABLE = Symbol('netver_a.netProtocolAvailable');
const P_SENT_BYTES = Symbol('sent.sentBytes');
const P_APP_VERSION = Symbol('appver.appVersion');
const P_PORT = Symbol('port');

const ALL_PROPS = [
  P_RECEIVED_BYTES, P_TIME_DIFF, P_NET_PROTOCOL, P_CONNECTION_ALIVE_SECONDS,
  P_IS_SERVER, P_IP, P_NET_PROTOCOL_AVAILABLE, P_SENT_BYTES, P_APP_VERSION,
  P_PORT
];

/**
 * Holds information about a node connection.
 */
class Connection extends Abstract {
  /**
   * Constructor
   *
   * @param {Object} data
   */
  static createFromObject(data) {

    let connection = new this(data);
    let mappedData = connection.mapInitializationDataWithProperties(ALL_PROPS);

    connection[P_RECEIVED_BYTES] = parseInt(mappedData[P_RECEIVED_BYTES], 10);
    connection[P_TIME_DIFF] = parseInt(mappedData[P_TIME_DIFF], 10);
    connection[P_NET_PROTOCOL] = parseInt(mappedData[P_NET_PROTOCOL], 10);
    connection[P_CONNECTION_ALIVE_SECONDS] = parseInt(mappedData[P_CONNECTION_ALIVE_SECONDS], 10);
    connection[P_IS_SERVER] = !!mappedData[P_IS_SERVER];
    connection[P_IP] = mappedData[P_IP];
    connection[P_NET_PROTOCOL_AVAILABLE] = parseInt(mappedData[P_NET_PROTOCOL_AVAILABLE], 10);
    connection[P_SENT_BYTES] = parseInt(mappedData[P_SENT_BYTES], 10);
    connection[P_APP_VERSION] = mappedData[P_APP_VERSION];
    connection[P_PORT] = parseInt(mappedData[P_PORT], 10);

    return connection;
  }

  /**
   * Gets the number of received bytes from the connection.
   *
   * @returns {Number}
   */
  get receivedBytes() {
    return this[P_RECEIVED_BYTES];
  }

  /**
   * Gets the time difference of the current and the remote node in seconds.
   *
   * @returns {Number}
   */
  get timeDiff() {
    return this[P_TIME_DIFF];
  }

  /**
   * Net protocol available of other node
   *
   * @returns {Number}
   */
  get netProtocol() {
    return this[P_NET_PROTOCOL];
  }

  /**
   * The duration of the connection.
   *
   * @returns {Number}
   */
  get connectionAliveSeconds() {
    return this[P_CONNECTION_ALIVE_SECONDS];
  }

  /**
   * A flag indicating whether the other node is a server node (daemon).
   * @returns {*}
   */
  get isServer() {
    return this[P_IS_SERVER];
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
  get netProtocolAvailable() {
    return this[P_NET_PROTOCOL_AVAILABLE];
  }

  /**
   * The bytes sent to the other node.
   *
   * @returns {*}
   */
  get sentBytes() {
    return this[P_SENT_BYTES];
  }

  /**
   * The node version.
   *
   * @returns {*}
   */
  get appVersion() {
    return this[P_APP_VERSION];
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
