/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const BC = require('./../BC');
const NetProtocol = require('./NetProtocol');
const NetStats = require('./NetStats');
const NodeServer = require('./NodeServer');

const P_IS_READY = Symbol('ready.isReady');
const P_READY_STRING = Symbol('ready_s.readyString');
const P_STATUS_STRING = Symbol('status_s.statusString');
const P_PORT = Symbol('port');
const P_IS_LOCKED = Symbol('locked.isLocked');
const P_TIMESTAMP = Symbol('timestamp');
const P_COUNT_BLOCKS = Symbol('blocks.countBlocks');
const P_NODE_SERVERS = Symbol('nodeservers.nodeServers');
const P_NET_STATS = Symbol('netstats.netStats');
const P_VERSION = Symbol('version');
const P_NET_PROTOCOL = Symbol('netprotocol.netProtocol');
const P_SAFEBOX_HASH = Symbol('sbh.safeboxHash');
const P_PROOF_OF_WORK = Symbol('pow.proofOfWork');
const P_OPENSSL_VERSION = Symbol('openssl.opensslVersion');

const ALL_PROPS = [
  P_IS_READY, P_READY_STRING, P_STATUS_STRING, P_PORT, P_IS_LOCKED, P_TIMESTAMP,
  P_COUNT_BLOCKS, P_NODE_SERVERS, P_NET_STATS, P_VERSION, P_NET_PROTOCOL, P_SAFEBOX_HASH,
  P_PROOF_OF_WORK, P_OPENSSL_VERSION
];

const P_NET_PROTOCOL_CLASS = Symbol('net_protocol_class');
const P_NET_STATS_CLASS = Symbol('net_stats_class');
const P_NODE_SERVER_CLASS = Symbol('node_server_class');


class NodeStatus extends Abstract {

  constructor(initializationData) {
    super(initializationData);
    this[P_NET_PROTOCOL_CLASS] = NetProtocol;
    this[P_NET_STATS_CLASS] = NetStats;
    this[P_NODE_SERVER_CLASS] = NodeServer;
  }

  set netProtocolClass(netProtocolClass) {
    this[P_NET_PROTOCOL_CLASS] = netProtocolClass;
  }
  set netStatsClass(netstatsClass) {
    this[P_NET_STATS_CLASS] = netstatsClass;
  }
  set nodeServerClass(nodeServerClass) {
    this[P_NODE_SERVER_CLASS] = nodeServerClass;
  }

  static createFromObject(data) {
    let nodeStatus = new this(data);
    let mappedData = nodeStatus.mapInitializationDataWithProperties(ALL_PROPS);

    nodeStatus[P_IS_READY] = !!mappedData[P_IS_READY];
    nodeStatus[P_READY_STRING] = mappedData[P_READY_STRING];
    nodeStatus[P_STATUS_STRING] = mappedData[P_STATUS_STRING];
    nodeStatus[P_PORT] = parseInt(mappedData[P_PORT], 10);
    nodeStatus[P_IS_LOCKED] = !!mappedData[P_IS_LOCKED];
    nodeStatus[P_TIMESTAMP] = parseInt(mappedData[P_TIMESTAMP], 10);
    nodeStatus[P_COUNT_BLOCKS] = parseInt(mappedData[P_COUNT_BLOCKS], 10);
    nodeStatus[P_VERSION] = mappedData[P_VERSION];
    nodeStatus[P_SAFEBOX_HASH] = BC.fromHex(mappedData[P_SAFEBOX_HASH]);
    nodeStatus[P_PROOF_OF_WORK] = BC.fromHex(mappedData[P_PROOF_OF_WORK]);
    nodeStatus[P_OPENSSL_VERSION] = BC.fromHex(mappedData[P_OPENSSL_VERSION]);
    nodeStatus[P_NET_PROTOCOL] = nodeStatus[P_NET_PROTOCOL_CLASS].createFromObject(mappedData[P_NET_PROTOCOL]);
    nodeStatus[P_NET_STATS] = nodeStatus[P_NET_STATS_CLASS].createFromObject(mappedData[P_NET_STATS]);
    nodeStatus[P_NODE_SERVERS] = mappedData[P_NODE_SERVERS].map(ns => nodeStatus[P_NODE_SERVER_CLASS].createFromObject(ns));

    return nodeStatus;
  }

  /**
     * Gets a flag indicating whether the node is ready.
     *
     * @returns {Boolean}
     */
  get isReady() {
    return this[P_IS_READY];
  }

  /**
     * Gets a string explaining the ready status.
     *
     * @returns {String}
     */
  get readyString() {
    return this[P_READY_STRING];
  }

  /**
     * Gets a string defining the status of the node.
     *
     * @returns {String}
     */
  get statusString() {
    return this[P_STATUS_STRING];
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
  get isLocked() {
    return this[P_IS_LOCKED];
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
  get countBlocks() {
    return this[P_COUNT_BLOCKS];
  }

  /**
     * Gets the list of nodeservers.
     *
     * @returns {NodeServer[]}
     */
  get nodeServers() {
    return this[P_NODE_SERVERS];
  }

  /**
     * Gets the netstats
     *
     * @returns {NetStats}
     */
  get netStats() {
    return this[P_NET_STATS];
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
  get netProtocol() {
    return this[P_NET_PROTOCOL];
  }

  /**
     * Gets the last safebox hash.
     *
     * @returns {BC}
     */
  get safeboxHash() {
    return this[P_SAFEBOX_HASH];
  }

  /**
     * Gets the last known POW.
     *
     * @returns {BC}
     */
  get proofOfWork() {
    return this[P_PROOF_OF_WORK];
  }

  /**
     * Gets the openssl info.
     *
     * @returns {BC}
     */
  get opensslVersion() {
    return this[P_OPENSSL_VERSION];
  }
}

module.exports = NodeStatus;
