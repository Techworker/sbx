/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const P_PUBLIC_KEY = Symbol('pubkey');
const P_MAC = Symbol('mac');

const P_ORIGINAL_DATA_LENGTH = Symbol('original_data_length');
const P_ORIGINAL_DATA_LENGTH_INC_PAD_LENGTH = Symbol('original_data_length_inc_pad_length');
const P_ENCRYPTED_DATA = Symbol('encryped_data');

/**
 * A class that can en-/decrypt payloads based on a public key / private key.
 */
class Data {
  withPublicKey(publicKey) {
    this[P_PUBLIC_KEY] = publicKey;
    return this;
  }
  withMac(mac) {
    this[P_MAC] = mac;
    return this;
  }

  withOriginalDataLength(length) {
    this[P_ORIGINAL_DATA_LENGTH] = length;
    return this;
  }
  withOriginalDataLengthIncPadLength(length) {
    this[P_ORIGINAL_DATA_LENGTH_INC_PAD_LENGTH] = length;
    return this;
  }
  withEncryptedData(encryptedData) {
    this[P_ENCRYPTED_DATA] = encryptedData;
    return this;
  }

  get publicKey() {
    return this[P_PUBLIC_KEY];
  }
  get publicKeyLength() {
    return this[P_PUBLIC_KEY].length;
  }
  get originalDataLength() {
    return this[P_ORIGINAL_DATA_LENGTH];
  }
  get originalDataLengthIncPadLength() {
    return this[P_ORIGINAL_DATA_LENGTH_INC_PAD_LENGTH];
  }

  get encryptedData() {
    return this[P_ENCRYPTED_DATA];
  }
  get mac() {
    return this[P_MAC];
  }
  get macLength() {
    return this[P_MAC].length;
  }
}

module.exports = Data;
