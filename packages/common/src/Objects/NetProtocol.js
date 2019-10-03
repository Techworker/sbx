/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');

const P_VERSION = Symbol('ver.version');
const P_VERSION_AVAILABLE = Symbol('ver_a.versionAvailable');

const ALL_PROPS = [P_VERSION, P_VERSION_AVAILABLE];

/**
 * Holds information about a nodes version.
 */
class NetProtocol extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  static createFromObject(data) {

    let netProtocol = new this(data);
    let mappedData = netProtocol.mapInitializationDataWithProperties(ALL_PROPS);

    netProtocol[P_VERSION] = parseInt(mappedData[P_VERSION], 10);
    netProtocol[P_VERSION_AVAILABLE] = parseInt(mappedData[P_VERSION_AVAILABLE], 10);

    return netProtocol;
  }

  /**
     * Gets the wallets protocol version.
     *
     * @returns {Number}
     */
  get version() {
    return this[P_VERSION];
  }

  /**
     * Gets the miners protocol version.
     *
     * @returns {Number}
     */
  get versionAvailable() {
    return this[P_VERSION_AVAILABLE];
  }
}

module.exports = NetProtocol;
