/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const rand = require('brorand');
const bip39 = require('bip39');
const utils = require('minimalistic-crypto-utils');

const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const Keys = require('./Keys');

/**
 * Mnemonic seed constants
 *
 * VERSION_MASK 11000000
 * CURVE_MASK   00110000
 * CURVE_MASKS
 *   secp256k1  00000000
 *   p384       00010000
 *   sect283k1  00100000
 *   p521       00110000
 */

const VERSION_MASK = 192;
const CURVE_MASK = 48;
const CURVE_MASKS = {
  secp256k1: 0,
  p384: 16,
  sect283k1: 32,
  p521: 48
};

/**
 * Handles mnemonic seeds.
 */
class Mnemonic {
  /**
   * Gets the default language.
   *
   * @returns {string}
   */
  static getDefaultLanguage() {
    return 'english';
  }

  /**
   * Gets the default language.
   *
   * @returns {array}
   */
  static getLanguages() {
    return Object.keys(bip39.wordlists);
  }

  /**
   * Generates a new keypair from the given curve.
   *
   * @param {Curve} curve
   * @param {string} language
   * @returns {Object}
   */
  static generate(curve, lang) {
    if (curve === undefined) {
      // eslint-disable-next-line no-param-reassign
      curve = Curve.getDefaultCurve();
    } else if (!(curve instanceof Curve)) {
      // eslint-disable-next-line no-param-reassign
      curve = new Curve(curve);
    }

    if (curve.supported === false) {
      throw new Error('Unsupported curve: ' + curve.name);
    }

    if (lang === undefined) {
      // eslint-disable-next-line no-param-reassign
      lang = this.getDefaultLanguage();
    }

    if (!this.getLanguages().includes(lang)) {
      throw new Error('Language not supported');
    }

    // Generate 192 bits of entropy. 24 bytes == 192 bits
    const entropy = rand(24);

    // Modify the first byte to indicate which curve we use. This removes 4 bits of entropy
    entropy[0] = (entropy[0] & ((VERSION_MASK | CURVE_MASK) ^ 255)) | CURVE_MASKS[curve.name];

    // Generate the mnemonic from the entropy
    const mnemonic = bip39.entropyToMnemonic(entropy, bip39.wordlists[lang]);

    const kp = Keys.generate(curve, {
      entropy: utils.toHex(entropy),
      entropyEnc: 'hex'
    });

    return { mnemonic, kp };

  }

  /**
   * Restores a keypair from the given mnemonic words.
   *
   * @param {string} mnemonic
   * @returns {Object}
   */
  static restore(mnemonic) {

    // Validate input is string
    if (!(typeof mnemonic === 'string' || mnemonic instanceof String)) {
      throw new Error('Argument must be a string');
    }

    // Validate correct number of words
    if (mnemonic.trim().split(/\s+/g).length !== 18) {
      throw new Error('Invalid word length');
    }

    // Convert mnemonic to entropy
    let entropy = null;

    for (let lang in this.getLanguages()) {
      try {
        entropy = utils.toArray(bip39.mnemonicToEntropy(mnemonic, bip39.wordlists[lang]), 'hex');
        break;
      } catch (e) {
      }
    }

    if (entropy === null) {
      throw new Error('Invalid mnemonic');
    }

    // Version must be zero
    if ((entropy[0] & VERSION_MASK) !== 0) {
      throw new Error('Invalid mnemonic version');
    }

    // Bitwise and to get the curve id
    const curve_id = entropy[0] & CURVE_MASK;
    let curve = null;

    // Loop to find the curve name
    for (let curve_name in CURVE_MASKS) {
      if (CURVE_MASKS.hasOwnProperty(curve_name) && CURVE_MASKS[curve_name] === curve_id) {
        curve = curve_name;
        break;
      }
    }

    // This should never be null, since there are two bits for curve id and four curves
    if (curve === null) {
      throw new Error('Invalid curve');
    }

    const kp = Keys.generate(curve, {
      entropy: utils.toHex(entropy),
      entropyEnc: 'hex'
    });

    return { curve, kp };

  }

}

module.exports = Mnemonic;
