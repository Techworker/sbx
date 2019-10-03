/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const BC = require('./../BC');
const PublicKeyCoder = require('./../Coding/Pascal/Keys/PublicKey');

const P_NAME = Symbol('name');
const P_PUBLIC_KEY = Symbol('enc_pubkey.publicKey');
const P_CAN_USE = Symbol('can_use.canUse');

const ALL_PROPS = [
  P_NAME, P_PUBLIC_KEY, P_CAN_USE
];

/**
 * Holds information about a public key in the wallet (fetched via rpc).
 */
class WalletPublicKey extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  static createFromObject(data) {
    let walletPublicKey = new this(data);
    let mappedData = walletPublicKey.mapInitializationDataWithProperties(ALL_PROPS);

    walletPublicKey[P_NAME] = mappedData[P_NAME];
    walletPublicKey[P_PUBLIC_KEY] = new PublicKeyCoder().decodeFromBytes(BC.fromHex(mappedData[P_PUBLIC_KEY]));
    walletPublicKey[P_CAN_USE] = !!mappedData[P_CAN_USE];

    return walletPublicKey;
  }

  /**
     * Gets the name of the key.
     *
     * @returns {String}
     */
  get name() {
    return this[P_NAME];
  }

  /**
     * Gets the public key.
     *
     * @returns {BC}
     */
  get publicKey() {
    return this[P_PUBLIC_KEY];
  }

  /**
     * Gets a flag indicating whether the key can be used.
     *
     * @returns {Boolean}
     */
  get canUse() {
    return this[P_CAN_USE];
  }
}

module.exports = WalletPublicKey;
