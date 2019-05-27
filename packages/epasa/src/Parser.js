/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const EPasa = require('./EPasa');
const Ascii = require('./Types/Ascii');
const BC = require('@pascalcoin-sbx/common').BC;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;

/**
 * A small parser for the EPASA format.
 */
class Parser {
  /**
   * Tries to parse an EPASA string.
   *
   * @param {String} ePasaString
   * @returns {EPasa}
   */
  static parse(ePasaString) {
    let state = {
      inAccount: true,
      inPayload: false,
      inPassword: false,
      inChecksum: false,
      checksumIdentFound: false,
      account: '',
      payload: '',
      format: null,
      encryption: null,
      checksum: '',
      password: '',
      asciiOpen: false,
      asciiClosed: false,
      encOpen: false,
      encClosed: false
    };

    let position = 0;

    /**
         * Gets information of the current char in the loop as well as a flag
         * identifiying an escaped character (position +2) and the next char.
         *
         * @param {Boolean} inAccount
         * @param {Boolean} inPayload
         * @returns {Object}
         */
    const next = function (inAccount, inPayload) {
      // check if we are at the end
      if (position > ePasaString.length - 1) {
        return false;
      }

      // flag identifying an escaped character
      let escaped = false;

      if (inAccount) {
        // account names have special escaping rules
        escaped = AccountName.isEscape(ePasaString[position], ePasaString[position + 1]);
      } else if (inPayload) {
        // payload has special escaping rules
        escaped = Ascii.isEscape(ePasaString[position], ePasaString[position + 1]);
      }

      // increment position, if escaped increment twice to skip the escape
      position++;
      if (escaped) {
        position++;
      }

      return {
        escaped,
        char: ePasaString[position - 1],
        next: ePasaString[position]
      };
    };

    // current char info in the loop
    let curr;

    // loop the epasa string
    while ((curr = next(state.inAccount, state.inPayload)) !== false) {

      // we are in the account, now check for an payload open identifier
      // and toggle the position
      if (state.inAccount) {
        if (curr.escaped === false && ['[', '(', '{', '<'].indexOf(curr.char) > -1) {
          state.inAccount = false;
          state.inPayload = true;
        }
      }

      // if we are in the payload, no encryption was determined
      // and the character is an encryption type open tag
      if (state.encryption === null && curr.escaped === false && state.inPayload &&
                ['[', '(', '{', '<'].indexOf(curr.char) > -1
      ) {
        if (curr.char === '[') {
          state.encryption = EPasa.ENC_PUBLIC;
        } else if (curr.char === '(') {
          state.encryption = EPasa.ENC_RECEIVER;
        } else if (curr.char === '<') {
          state.encryption = EPasa.ENC_SENDER;
        } else if (curr.char === '{') {
          state.encryption = EPasa.ENC_PASSWORD;
        }

        state.encOpen = curr.char;
        // we omit the character
        continue;
      }

      // when we are in the payload or the account and find a ":" it is an
      // password identifier but only if its a password encryption, otherwise it identifies the
      // checksum
      if (curr.escaped === false && (state.inPayload || state.inAccount) && curr.char === ':') {
        if (state.encryption === EPasa.ENC_PASSWORD) {
          state.inPassword = true;
        } else {
          state.inPassword = false;
          state.inChecksum = true;
          state.inAccount = false;
          state.checksumIdentFound = true;
        }

        // we ignore it then
        continue;
      }

      // determine the format, a " identifies ascii, 0x hex, otherwise its probably base58
      if (curr.escaped === false && curr.char === '"' && state.inPayload && state.format === null) {
        state.format = EPasa.FORMAT_ASCII;
        state.asciiOpen = true;
        continue;
      } else if (curr.escaped === false && curr.char === '0' && curr.next === 'x' &&
                state.inPayload && state.format === null) {
        state.format = EPasa.FORMAT_HEX;
      } else if (curr.escaped === false && state.inPayload && state.format === null) {
        state.format = EPasa.FORMAT_BASE58;
      } else if (curr.escaped === false && curr.char === '"' && state.inPayload &&
                state.format === EPasa.FORMAT_ASCII) {
        state.asciiClosed = true;
        continue;
      }

      // check closing encryption
      if (curr.escaped === false && state.inPayload && [']', ')', '}', '>'].indexOf(curr.char) > -1) {
        state.inPayload = false;
        state.inChecksum = true;
        state.encClosed = curr.char;
        // omit
        continue;
      }

      // append to account
      if (state.inAccount) {
        state.account += curr.char;
        continue;
      }

      // if (state.inPayload && curr.escaped === false && curr.char === ':') {
      //  state.inPassword = true;
      // }

      // payload
      if (state.inPayload && !state.inPassword) {
        state.payload += curr.char;
      }
      // password
      if (state.inPayload && state.inPassword) {
        state.password += curr.char;
      }

      // checksum
      if (state.inChecksum) {
        if (curr.char === ':') {
          state.checksumIdentFound = true;
        } else {
          state.checksum += curr.char;
        }
      }
    }

    if (state.asciiOpen && !state.asciiClosed) {
      throw new Error('Invalid EPasa - missing closing ascii');
    }

    if (state.encOpen !== false && state.encClosed === false) {
      throw new Error('Invalid EPasa - missing closing encryption identifier');
    }

    if ((state.encOpen === '[' && state.encClosed !== ']') ||
            (state.encOpen === '(' && state.encClosed !== ')') ||
            (state.encOpen === '<' && state.encClosed !== '>') ||
            (state.encOpen === '{' && state.encClosed !== '}')) {
      throw new Error('Invalid EPasa - wrong closing encryption identifier');
    }

    if (state.inChecksum && state.checksum.length < 4 && state.checksumIdentFound) {
      throw new Error('Invalid EPasa - missing or too short checksum');
    }

    if (state.checksum.length > 0 && !state.checksumIdentFound) {
      throw new Error('Invalid EPasa - missing checksum identifier');
    }

    if (state.inChecksum && state.checksum.length > 4 && state.checksumIdentFound) {
      throw new Error('Invalid EPasa - missing or too long checksum');
    }

    if (state.format === EPasa.FORMAT_HEX && state.payload.substr(2).length > 0 &&
            /^[0-9a-f]+$/.test(state.payload.substr(2)) === false) {
      throw new Error('Invalid EPasa - only lowercase hex allowed.');
    }

    // create a new epasa and trigger the validation
    let epasa = new EPasa();

    if (state.account === '') {
      throw new Error('Missing account number/name');
    }

    try {
      epasa.accountNumber = state.account;
    } catch (exAccNumber) {
      try {
        epasa.accountName = state.account;
      } catch (exAccName) {
        throw new Error(
          `Bad account for epasa: ${exAccNumber.message} - ${exAccName.message}`
        );
      }
    }

    if (state.encryption === EPasa.ENC_PASSWORD) {
      epasa.password = state.password;
    }

    if (state.payload === '') {
      epasa.format = EPasa.NON_DETERMISTIC;
    } else {
      epasa.format = state.format;
    }

    epasa.encryption = state.encryption;

    if (state.format === EPasa.FORMAT_HEX) {
      epasa.payload = BC.fromHex(state.payload.substr(2));
    } else if (state.format !== null) {
      epasa.payload = BC.fromString(state.payload);
    }

    // validate checksum
    if (state.checksum !== '' && EPasa.calculateChecksum(epasa.compile(true)) !== state.checksum) {
      throw new Error('Invalid checksum provided');
    }

    return epasa;
  }
}

module.exports = Parser;
