/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const BC = require('@pascalcoin-sbx/common').BC;
const NetProtocol = require('./NetProtocol');
const NetStats = require('./NetStats');
const NodeServer = require('./NodeServer');

const P_READY = Symbol('ready');
const P_READY_S = Symbol('ready_s');
const P_STATUS_S = Symbol('status_s');
const P_PORT = Symbol('port');
const P_LOCKED = Symbol('locked');
const P_TIMESTAMP = Symbol('timestamp');
const P_BLOCKS = Symbol('blocks');
const P_NODESERVERS = Symbol('nodeservers');
const P_NETSTATS = Symbol('netstats');
const P_VERSION = Symbol('version');
const P_NETPROTOCOL = Symbol('netprotocol');
const P_SBH = Symbol('sbh');
const P_POW = Symbol('pow');
const P_OPENSSL = Symbol('openssl');

class NodeStatus extends Abstract {
  static createFromRPC(data) {
    let nodeStatus = new NodeStatus(data);

    nodeStatus[P_READY] = !!data.ready;
    nodeStatus[P_READY_S] = data.ready_s;
    nodeStatus[P_STATUS_S] = data.status_s;
    nodeStatus[P_PORT] = parseInt(data.port, 10);
    nodeStatus[P_LOCKED] = !!data.locked;
    nodeStatus[P_TIMESTAMP] = parseInt(data.timestamp, 10);
    nodeStatus[P_BLOCKS] = parseInt(data.blocks, 10);
    nodeStatus[P_VERSION] = data.version;
    nodeStatus[P_SBH] = BC.fromHex(data.sbh);
    nodeStatus[P_POW] = BC.fromHex(data.pow);
    nodeStatus[P_OPENSSL] = BC.fromHex(data.openssl);
    nodeStatus[P_NETPROTOCOL] = new NetProtocol(data.netprotocol);
    nodeStatus[P_NETSTATS] = new NetStats(data.netstats);
    nodeStatus[P_NODESERVERS] = data.nodeservers.map(ns => new NodeServer(ns));

    return nodeStatus;
  }

  /**
     * Gets a flag indicating whether the node is ready.
     *
     * @returns {Boolean}
     */
  get ready() {
    return this[P_READY];
  }

  /**
     * Gets a string explaining the ready status.
     *
     * @returns {String}
     */
  get readyS() {
    return this[P_READY_S];
  }

  /**
     * Gets a string defining the status of the node.
     *
     * @returns {String}
     */
  get statusS() {
    return this[P_STATUS_S];
  }

  /**
     * Gets the port of the node.
     *
     * @returns {Number}
     */
  get port() {
    return this[P_PORT];
  }

  /**
     * Gets a value indicating whether the wallet is locked.
     *
     * @returns {Boolean}
     */
  get locked() {
    return this[P_LOCKED];
  }

  /**
     * Gets the timestamp where the node runs.
     *
     * @returns {Number}
     */
  get timestamp() {
    return this[P_TIMESTAMP];
  }

  /**
     * Gets the number of known blocks.
     *
     * @returns {Number}
     */
  get blocks() {
    return this[P_BLOCKS];
  }

  /**
     * Gets the list of nodeservers.
     *
     * @returns {NodeServer[]}
     */
  get nodeservers() {
    return this[P_NODESERVERS];
  }

  /**
     * Gets the netstats
     *
     * @returns {NetStats}
     */
  get netstats() {
    return this[P_NETSTATS];
  }

  /**
     * Gets the node version info.
     *
     * @returns {Version}
     */
  get version() {
    return this[P_VERSION];
  }

  /**
     * Gets the info about the protocol versions.
     *
     * @returns {NetProtocol}
     */
  get netprotocol() {
    return this[P_NETPROTOCOL];
  }

  /**
     * Gets the last safebox hash.
     *
     * @returns {BC}
     */
  get sbh() {
    return this[P_SBH];
  }

  /**
     * Gets the last known POW.
     *
     * @returns {BC}
     */
  get pow() {
    return this[P_POW];
  }

  /**
     * Gets the openssl info.
     *
     * @returns {BC}
     */
  get openssl() {
    return this[P_OPENSSL];
  }
}

module.exports = NodeStatus;
