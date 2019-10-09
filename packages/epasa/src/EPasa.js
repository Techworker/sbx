/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;
const Endian = require('@pascalcoin-sbx/common').Endian;
const Int16 = require('@pascalcoin-sbx/common').Coding.Core.Int16;
const MurmurHash3 = require('murmur-hash').v3;
const Ascii = require('./Types/Ascii');
const Base58 = require('./Types/Base58');
const BC = require('@pascalcoin-sbx/common').BC;
const Payload = require('@pascalcoin-sbx/common').Types.Payload;

const P_ACCOUNT_NUMBER = Symbol('account_number');
const P_ACCOUNT_NAME = Symbol('account_name');
const P_PAYLOAD = Symbol('payload');
const P_PAYLOAD_TYPE = Symbol('payload_type');
const P_PASSWORD = Symbol('password');

/**
 * Represents an EPasa.
 */
class EPasa {

  /**
   * Constructor.
   */
  constructor() {
    this[P_PAYLOAD_TYPE] = Payload.NON_DETERMISTIC;
  }

  /**
   * Sets the account number.
   *
   * @param accountNumber
   */
  set accountNumber(accountNumber) {
    if (this[P_ACCOUNT_NAME] !== undefined) {
      throw new Error('Either set the account name or the account number. Both is not possible.');
    }

    this[P_ACCOUNT_NUMBER] = new AccountNumber(accountNumber);
  }

  /**
   * Gets the account number if set.
   *
   * @returns {null|AccountNumber}
   */
  get accountNumber() {
    return this[P_ACCOUNT_NUMBER];
  }

  /**
   * Gets the account name if set.
   *
   * @returns {null|AccountName}
   */
  get accountName() {
    return this[P_ACCOUNT_NAME];
  }

  /**
   * Gets a value indicating whether the epasa has an assigned format.
   */
  hasFormat() {
    return (this.isFormatBase58() || this.isFormatAscii() || this.isFormatHex());
  }

  /**
   * Gets a value indicating whether the epasa has an encryption assigned.
   */
  hasEncryption() {
    return (this.isEncryptionPublic() || this.isEncryptionPassword() ||
        this.isEncryptionSender() || this.isEncryptionReceiver());
  }

  /**
   * Gets a value indicating the the payload format is base58.
   *
   * @returns {boolean}
   */
  isFormatBase58() {
    return ((this[P_PAYLOAD_TYPE] & Payload.FORMAT_BASE58) === Payload.FORMAT_BASE58);
  }

  /**
   * Gets a value indicating the the payload format is base58.
   *
   * @returns {boolean}
   */
  isFormatAscii() {
    return ((this[P_PAYLOAD_TYPE] & Payload.FORMAT_ASCII) === Payload.FORMAT_ASCII);
  }

  /**
   * Gets a value indicating the the payload format is base58.
   *
   * @returns {boolean}
   */
  isFormatHex() {
    return ((this[P_PAYLOAD_TYPE] & Payload.FORMAT_HEX) === Payload.FORMAT_HEX);
  }

  /**
   * Gets a value indicating that the encryption method is the receivers public key.
   *
   * @returns {boolean}
   */
  isEncryptionReceiver() {
    return ((this[P_PAYLOAD_TYPE] & Payload.ENC_RECEIVER) === Payload.ENC_RECEIVER);
  }

  /**
   * Gets a value indicating that the encryption method is the senders public key.
   *
   * @returns {boolean}
   */
  isEncryptionSender() {
    return ((this[P_PAYLOAD_TYPE] & Payload.ENC_SENDER) === Payload.ENC_SENDER);
  }

  /**
   * Gets a value indicating that the encryption method is aes.
   *
   * @returns {boolean}
   */
  isEncryptionPassword() {
    return ((this[P_PAYLOAD_TYPE] & Payload.ENC_PASSWORD) === Payload.ENC_PASSWORD);
  }

  /**
   * Gets a value indicating that there is no encryption (public payloads).
   *
   * @returns {boolean}
   */
  isEncryptionPublic() {
    return ((this[P_PAYLOAD_TYPE] & Payload.ENC_PUBLIC) === Payload.ENC_PUBLIC);
  }

  /**
   * Gets a value indicating that the encryption method is not set.
   *
   * @returns {boolean}
   */
  isNonDetermistic() {
    return !this.hasEncryption() || !this.hasFormat();
  }

  /**
   * Gets the password of the epasa.
   *
   * @returns {null|String}
   */
  get password() {
    return this[P_PASSWORD];
  }

  /**
   * Gets the payload of the epasa.
   *
   * @returns {null|Payload}
   */
  get payload() {
    return this[P_PAYLOAD];
  }

  /**
   * Gets the extended checksum.
   *
   * @returns {string}
   */
  get checksum() {
    return EPasa.calculateChecksum(this.compile(true));
  }

  /**
   * Sets the account name.
   *
   * @param {AccountName} accountName
   */
  set accountName(accountName) {
    if (this[P_ACCOUNT_NUMBER] !== undefined) {
      throw new Error('Either set the account name or the account number. Both is not possible.');
    }

    this[P_ACCOUNT_NAME] = new AccountName(accountName);
    this[P_PAYLOAD_TYPE] |= Payload.ADDRESSED_BY_NAME;
  }

  /**
   * Sets the payload.
   *
   * @param {BC} payload
   */
  set payload(payload) {

    if (!this.hasFormat()) {
      this.format = Payload.NON_DETERMISTIC;
    }

    if ((!this.hasFormat() || !this.hasEncryption()) && payload.toString() !== '') {
      throw new Error('EPasa payloads can only be set when the encryption and format is defined.');
    }

    if (!(payload instanceof BC)) {
      payload = BC.from(payload);
    }

    this.validatePayloadLength(payload);
    this[P_PAYLOAD] = payload;

    return this;
  }

  /**
   * Vaidates the length of an unencrypted payload.
   *
   * @param {BC} payload
   * @returns {boolean}
   */
  validatePayloadLength(payload) {
    // TODO: Oh yes, wanted to be smart, but now im unreadable.
    let payloadCompare = '';
    let typeIdent = 'ASCII';

    if (this.isFormatAscii()) {
      payloadCompare = payload.toString();
    } else if (this.isFormatHex()) {
      payloadCompare = payload.toHex();
      typeIdent = 'HEX';
    } else if (this.isFormatBase58()) {
      payloadCompare = payload.toString();
      typeIdent = 'BASE58';
    }

    let maxIdent = 'PUBLIC';

    if (this.isEncryptionReceiver() || this.isEncryptionSender()) {
      maxIdent = 'ECIES';
    } else if (this.isEncryptionPassword()) {
      maxIdent = 'AES';
    }

    if (payloadCompare.length > Payload[`MAX_${maxIdent}_${typeIdent}`]) {
      throw new Error(
        `Invalid payload length ${payloadCompare.length} for ${maxIdent}_${typeIdent}. 
        Max is ${Payload[`MAX_${maxIdent}_${typeIdent}`]}`
      );
    }

    return true;
  }

  /**
   * Sets the payload
   *
   * @param {String} password
   */
  set password(password) {
    this[P_PASSWORD] = password;
  }

  /**
   * Sets the payload
   *
   * @param {Number} encryption
   */
  set encryption(encryption) {
    if (encryption === Payload.ENC_PASSWORD && this[P_PASSWORD] === undefined) {
      throw new Error('Set password before setting the password encryption flag.');
    }

    this[P_PAYLOAD_TYPE] |= encryption;
  }

  /**
   * Sets the payload
   *
   * @param {Number} format
   */
  set format(format) {
    this[P_PAYLOAD_TYPE] |= format;
  }

  /**
   * Creates a new E-PASA string.
   *
   * @param {Boolean} omitChecksum
   * @returns {string}
   */
  compile(omitChecksum = false) {
    let data = {
      account: null,
      enc_marker_start: null,
      enc_marker_end: null,
      payload: ''
    };

    // determine and validate account info
    if ((this[P_PAYLOAD_TYPE] & Payload.ADDRESSED_BY_NAME) === Payload.ADDRESSED_BY_NAME) {
      data.account = this[P_ACCOUNT_NAME].toStringEscaped();
    } else {
      data.account = this[P_ACCOUNT_NUMBER].toString();
    }

    // if there is a payload, we need to format it
    if (this[P_PAYLOAD] !== undefined) {
      if ((this[P_PAYLOAD_TYPE] & Payload.FORMAT_HEX) === Payload.FORMAT_HEX) {
        data.payload = `0x${this[P_PAYLOAD].toHex().toLowerCase()}`;
      } else if ((this[P_PAYLOAD_TYPE] & Payload.FORMAT_BASE58) === Payload.FORMAT_BASE58) {
        data.payload = new Base58(this[P_PAYLOAD].toString()).toString();
      } else if ((this[P_PAYLOAD_TYPE] & Payload.FORMAT_ASCII) === Payload.FORMAT_ASCII) {
        let asciiPayload = new Ascii(this[P_PAYLOAD].toString()).toStringEscaped();

        if (asciiPayload.length > 0) {
          data.payload = `"${asciiPayload}"`;
        }
      }

      // now we need to determine the wanted encryption of the payload.
      if ((this[P_PAYLOAD_TYPE] & Payload.ENC_PUBLIC) === Payload.ENC_PUBLIC) {
        data.enc_marker_start = '[';
        data.enc_marker_end = ']';
      } else if ((this[P_PAYLOAD_TYPE] & Payload.ENC_RECEIVER) === Payload.ENC_RECEIVER) {
        data.enc_marker_start = '(';
        data.enc_marker_end = ')';
      } else if ((this[P_PAYLOAD_TYPE] & Payload.ENC_SENDER) === Payload.ENC_SENDER) {
        data.enc_marker_start = '<';
        data.enc_marker_end = '>';
      } else if ((this[P_PAYLOAD_TYPE] & Payload.ENC_PASSWORD) === Payload.ENC_PASSWORD) {
        data.enc_marker_start = '{';
        data.enc_marker_end = '}';
        // append password
        let password = new Ascii(this[P_PASSWORD]);

        data.payload += `:${password.toStringEscaped()}`;
      }
    } else {
      // no payload, no marker
      data.payload = '';
      data.enc_marker_start = '';
      data.enc_marker_end = '';
    }

    // combine collected data
    let epasa = `${data.account}${data.enc_marker_start}${data.payload}${data.enc_marker_end}`;

    // no checksum
    if (omitChecksum) {
      return epasa;
    }

    // calculate the checksum
    return `${epasa}:${EPasa.calculateChecksum(epasa)}`;
  }

  /**
   * Calculates the checksum of the epasa.
   *
   * @param {String} ePasaString
   * @returns {string}
   */
  static calculateChecksum(ePasaString) {
    return new Int16('checksum', true, Endian.LITTLE_ENDIAN)
      .encodeToBytes(MurmurHash3.x86.hash32(ePasaString) % 65536)
      .toHex(true);
  }
}

module.exports = EPasa;

