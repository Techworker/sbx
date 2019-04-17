(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@pascalcoin-sbx/common"), require("@pascalcoin-sbx/crypto"));
	else if(typeof define === 'function' && define.amd)
		define("@pascalcoin-sbx/signing", ["@pascalcoin-sbx/common", "@pascalcoin-sbx/crypto"], factory);
	else if(typeof exports === 'object')
		exports["@pascalcoin-sbx/signing"] = factory(require("@pascalcoin-sbx/common"), require("@pascalcoin-sbx/crypto"));
	else
		root["@pascalcoin-sbx/signing"] = factory(root["@pascalcoin-sbx/common"], root["@pascalcoin-sbx/crypto"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__sbx_common__, __WEBPACK_EXTERNAL_MODULE__sbx_crypto__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  OperationsBuilder: __webpack_require__(/*! ./src/OperationsBuilder */ "./src/OperationsBuilder.js"),
  Signer: __webpack_require__(/*! ./src/Signer */ "./src/Signer.js"),
  Operations: __webpack_require__(/*! ./src/Operations */ "./src/Operations/index.js")
};

/***/ }),

/***/ "./src/Abstract.js":
/*!*************************!*\
  !*** ./src/Abstract.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
// const Payload = require('../Crypto/Payload');
const Signer = __webpack_require__(/*! ./Signer */ "./src/Signer.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const P_PAYLOAD = Symbol('payload');
const P_S = Symbol('s');
const P_R = Symbol('r');
const P_FEE = Symbol('fee');
const P_N_OPERATION = Symbol('nOperation');
/**
 * Abstract class for RPC response objects.
 */

class Abstract {
  constructor() {
    this[P_PAYLOAD] = BC.fromString('');
    this[P_S] = null;
    this[P_R] = null;
    this[P_FEE] = new Currency(0);
  }
  /**
     * Sets the payload of the transaction instance.
     *
     * @param {BC} payload
     *
     * @returns {Abstract}
     */


  withPayload(payload) {
    this[P_PAYLOAD] = payload;
    return this;
  }
  /**
   * Sets the fee.
   *
   * @param {Currency} fee
   * @returns {Abstract}
   */


  withFee(fee) {
    this[P_FEE] = new Currency(fee);
    return this;
  }
  /**
   * Sets the fee to the minimum.
   *
   * @returns {Abstract}
   */


  withMinFee() {
    this[P_FEE] = Currency.MIN_FEE;
    return this;
  }
  /**
     * Returns a BC with the digest that needs to be hashed.
     *
     * @return {BC}
     */
  // eslint-disable-next-line class-methods-use-this


  digest() {
    throw new Error('Not implemented');
  }
  /**
   * Signs the given operation and returns a new rawoperations string.
   *
   * @param {KeyPair} keyPair
   * @param {Number} nOperation
   * @param {Boolean} useDigest
   * @returns {Abstract}
   */


  sign(keyPair, nOperation, useDigest = false) {
    this[P_N_OPERATION] = nOperation;
    const digest = this.digest();
    let signResult;

    if (useDigest === true) {
      signResult = Signer.signWithDigest(keyPair, digest);
    } else {
      signResult = Signer.signWithHash(keyPair, digest);
    } // save results


    this[P_R] = signResult.r;
    this[P_S] = signResult.s;
    return this;
  }
  /**
     * Returns the BC for a rawoperations info.
     *
     * @return {BC}
     */


  toRaw() {
    // eslint-disable-line class-methods-use-this
    throw new Error('Not implemented');
  }
  /**
     * Returns a new instance of the derived class based on the given raw
     * string.
     *
     * @return {Abstract}
     */
  // eslint-disable-next-line class-methods-use-this


  static fromRaw() {
    throw new Error('Not implemented');
  }
  /**
     * Gets a BC from the given int value.
     *
     * @param {Number} value
     * @param {Number|undefined} size
     * @returns {BC}
     */
  // eslint-disable-next-line class-methods-use-this


  bcFromInt(value, size = null) {
    return (size === null ? BC.fromInt(value) : BC.fromInt(value, size)).switchEndian();
  }
  /**
     * Gets the given string as a byte collection with the size of the string
     * prepended.
     *
     * @param {String} value
     * @returns {BC}
     */


  bcFromStringWithSize(value) {
    return BC.concat(this.bcFromInt(value.length, 2), this.bcFromString(value));
  }
  /**
   * Gets the given BC as a byte collection with the size of
   * the BC prepended.
   *
   * @param {BC} value
   * @returns {BC}
   */


  bcFromBcWithSize(value) {
    return BC.concat(this.bcFromInt(value.length, 2), value);
  }
  /**
   * Extracts a BC with size from the given BC.
   *
   * @param {BC} value
   * @param {Number} offset
   * @returns {BC}
   */


  static readBCWithSize(value, offset) {
    const data = {
      size: value.slice(offset, offset + 2).switchEndian().toInt()
    };
    data.value = value.slice(offset + 2, offset + 2 + data.size);
    return data;
  }
  /**
     * Gets the BC from the given string.
     *
     * @param {String} value
     * @returns {BC}
     */


  bcFromString(value) {
    // eslint-disable-line class-methods-use-this
    return BC.fromString(value);
  }
  /**
     * Returns the BC for an r and s signing result.
     *
     * @param {BC} r
     * @param {BC} s
     * @returns {BC}
     */


  bcFromSign(r, s) {
    return BC.concat(this.bcFromBcWithSize(r), this.bcFromBcWithSize(s));
  }
  /**
     * Gets the prepared payload.
     *
     * @returns {BC}
     */


  get payload() {
    return this[P_PAYLOAD];
  }
  /**
     * Gets the r value of the sign result.
     *
     * @returns {BC|null}
     */


  get r() {
    return this[P_R];
  }
  /**
     * Gets the s value of the sign result.
     *
     * @returns {BC|null}
     */


  get s() {
    return this[P_S];
  }
  /**
     * Gets the fee.
     *
     * @returns {Currency}
     */


  get fee() {
    return this[P_FEE];
  }
  /**
     * Gets the n operation.
     *
     * @returns {Number}
     */


  get nOperation() {
    return this[P_N_OPERATION];
  }
  /**
   * Gets a value indicating whether the current operation is already signed.
   *
   * @returns {boolean}
   */


  get isSigned() {
    return this[P_S] !== null && this[P_R] !== null;
  }

}

module.exports = Abstract;

/***/ }),

/***/ "./src/Operations/BuyAccount.js":
/*!**************************************!*\
  !*** ./src/Operations/BuyAccount.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const P_SENDER = Symbol('sender');
const P_TARGET = Symbol('target');
const P_AMOUNT = Symbol('amount');
const P_ACCOUNT_PRICE = Symbol('price');
const P_SELLER_ACCOUNT = Symbol('seller');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
/**
 * A transaction object that can be signed.
 */

class BuyAccount extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  static get OPTYPE() {
    return 6;
  }
  /**
   * Constructor
   *
   * @param {AccountNumber|Number} sender
   * @param {AccountNumber|Number} target
   * @param {Currency} amount
   * @param {Currency} price
   * @param {AccountNumber} seller
   * @param {PublicKey} newPublicKey
   */


  constructor(sender, target, amount, price, seller, newPublicKey) {
    super();
    this[P_SENDER] = new AccountNumber(sender);
    this[P_TARGET] = new AccountNumber(target);
    this[P_AMOUNT] = new Currency(amount);
    this[P_ACCOUNT_PRICE] = new Currency(price);
    this[P_SELLER_ACCOUNT] = new AccountNumber(seller);
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
  }
  /**
   * Gets the digest of the operation.
   *
   * @returns {BC}
   */


  digest() {
    return BC.concat(this.bcFromInt(this[P_SENDER].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this[P_TARGET].account, 4), this.bcFromInt(this[P_AMOUNT].toMolina(), 8), this.bcFromInt(this.fee.toMolina(), 8), this.payload, this.bcFromInt(PublicKey.empty().curve.id, 2), // just zero as curve id
    this.bcFromInt(this[P_ACCOUNT_PRICE].toMolina(), 8), this.bcFromInt(this[P_SELLER_ACCOUNT].account, 4), this[P_NEW_PUBLIC_KEY].encode(), BC.fromInt(BuyAccount.OPTYPE));
  }
  /**
   * Gets the signed raw operations.
   *
   * @returns {BC}
   */


  toRaw() {
    return BC.concat(this.bcFromInt(BuyAccount.OPTYPE, 4), this.bcFromInt(this[P_SENDER].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this[P_TARGET].account, 4), this.bcFromInt(this[P_AMOUNT].toMolina(), 8), this.bcFromInt(this.fee.toMolina(), 8), this.bcFromBcWithSize(this.payload), PublicKey.empty().encode(), // v2
    this.bcFromInt(2, 1), // buy account
    this.bcFromInt(this[P_ACCOUNT_PRICE].toMolina(), 8), this.bcFromInt(this[P_SELLER_ACCOUNT].account, 4), this[P_NEW_PUBLIC_KEY].encode(), this.bcFromSign(this.r, this.s));
  }
  /**
   * Gets a new Operation object from the given signed operation.
   *
   * @param {BC|Buffer|String|Uint8Array} raw
   * @returns {BC}
   */


  static fromRaw(raw) {
    /*
    raw = BC.from(raw);
    const sender = raw.slice(4, 8).switchEndian().toInt();
    const target = raw.slice(12, 16).switchEndian().toInt();
    const amount = raw.slice(16, 24).switchEndian().toInt();
    const fee = raw.slice(24, 32).switchEndian().toInt();
    const payload = Abstract.readBCWithSize(raw, 32).value;
    const publicKey = Abstract.readBCWithSize(raw, 34 + payload.length).value;
    const price = raw.slice(36 + payload.length + publicKey.length, 8).switchEndian().toInt();
    const seller = raw.slice(44 + payload.length + publicKey.length, 4).switchEndian().toInt();
    const newPublicKey = Abstract.readBCWithSize(raw, 48 + payload.length + publicKey.length).value;
     const op = new BuyAccount(sender, target, amount, price, seller, newPublicKey);
     //op.withFee(dataType, dataSequence, amount);
    //op.withFee(fee);
    //op.withPayload(payload);
     return op;*/
  }

}

module.exports = BuyAccount;

/***/ }),

/***/ "./src/Operations/ChangeAccountInfo.js":
/*!*********************************************!*\
  !*** ./src/Operations/ChangeAccountInfo.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountName;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
const P_NEW_NAME = Symbol('new_name');
const P_NEW_TYPE = Symbol('new_type');
const P_WITH_NEW_PUBKEY = Symbol('with_new_pubkey');
const P_WITH_NEW_NAME = Symbol('with_new_name');
const P_WITH_NEW_TYPE = Symbol('with_new_type');
/**
 * Gets the change type of the op.
 *
 * @param {ChangeAccountInfo} op
 * @returns {number}
 */

function getChangeType(op) {
  let changeType = 0;

  if (op[P_WITH_NEW_PUBKEY] === true) {
    changeType |= 1;
  }

  if (op[P_WITH_NEW_NAME] === true) {
    changeType |= 2;
  }

  if (op[P_WITH_NEW_TYPE] === true) {
    changeType |= 4;
  }

  return changeType;
}
/**
 * A transaction object that can be signed.
 */


class ChangeAccountInfo extends Abstract {
  /**
     * Gets the optype.
     *
     * @returns {number}
     */
  static get OPTYPE() {
    return 8;
  }
  /**
     * Constructor.
     *
     * @param {Account|AccountNumber|Number|String} accountSigner
     * @param {Account|AccountNumber|Number|String} accountTarget
     */


  constructor(accountSigner, accountTarget) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_ACCOUNT_TARGET] = new AccountNumber(accountTarget);
    this[P_NEW_PUBLIC_KEY] = PublicKey.empty();
    this[P_NEW_NAME] = BC.fromString(''); // TODO: Im not so sure if this is correct

    this[P_NEW_TYPE] = 0;
    this[P_WITH_NEW_PUBKEY] = false;
    this[P_WITH_NEW_NAME] = false;
    this[P_WITH_NEW_TYPE] = false;
  }
  /**
     * Will set the new public key.
     *
     * @param {PublicKey} publicKey
     * @returns {ChangeAccountInfo}
     */


  withNewPublicKey(publicKey) {
    this[P_NEW_PUBLIC_KEY] = publicKey;
    this[P_WITH_NEW_PUBKEY] = true;
    return this;
  }
  /**
     * Will set the new name of the account.
     *
     * @param {String|AccountName} newName
     * @returns {ChangeAccountInfo}
     */


  withNewName(newName) {
    this[P_NEW_NAME] = new AccountName(newName);
    this[P_WITH_NEW_NAME] = true;
    return this;
  }
  /**
     * Will set the new type of the account.
     *
     * @param {Number} newType
     * @returns {ChangeAccountInfo}
     */


  withNewType(newType) {
    this[P_NEW_TYPE] = newType;
    this[P_WITH_NEW_TYPE] = true;
    return this;
  }
  /**
     * Gets the digest of the operation.
     *
     * @returns {BC}
     */


  digest() {
    return BC.concat(this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this.fee.toMolina(), 8), this.bcFromBcWithSize(this.payload), PublicKey.empty().encode(), // v2
    this.bcFromInt(getChangeType(this)), this[P_NEW_PUBLIC_KEY].encode(), this.bcFromBcWithSize(BC.fromString(this[P_NEW_NAME].toString())), this.bcFromInt(this[P_NEW_TYPE], 2), this.bcFromInt(ChangeAccountInfo.OPTYPE));
  }
  /**
     * Gets the raw implementation.
     *
     * @returns {BC}
     */


  toRaw() {
    return BC.concat(this.bcFromInt(ChangeAccountInfo.OPTYPE, 4), this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this.fee.toMolina(), 8), this.bcFromBcWithSize(this.payload), PublicKey.empty().encode(), // v2
    this.bcFromInt(getChangeType(this)), this[P_NEW_PUBLIC_KEY].encode(), this.bcFromBcWithSize(BC.fromString(this[P_NEW_NAME].toString())), this.bcFromInt(this[P_NEW_TYPE], 2), this.bcFromSign(this.r, this.s));
  }

}

module.exports = ChangeAccountInfo;

/***/ }),

/***/ "./src/Operations/ChangeKey.js":
/*!*************************************!*\
  !*** ./src/Operations/ChangeKey.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
/**
 * A transaction object that can be signed.
 */

class ChangeKey extends Abstract {
  /**
     * Gets the optype.
     *
     * @returns {number}
     */
  static get OPTYPE() {
    return 2;
  }
  /**
     *
     * @param {Account|AccountNumber|Number|String} accountSigner
     * @param {PublicKey} newPublicKey
     */


  constructor(accountSigner, newPublicKey) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
  }
  /**
     * Gets the digest of the operation.
     *
     * @returns {BC}
     */


  digest() {
    return BC.concat(this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this.fee.toMolina(), 8), this.payload, this.bcFromInt(PublicKey.empty().curve.id, 2), // just zero as curve id
    this[P_NEW_PUBLIC_KEY].encode(), this.bcFromInt(ChangeKey.OPTYPE));
  }
  /**
     * Gets the raw implementation.
     *
     * @returns {BC}
     */


  toRaw() {
    return BC.concat(this.bcFromInt(ChangeKey.OPTYPE, 4), this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this.fee.toMolina(), 8), this.bcFromBcWithSize(this.payload), PublicKey.empty().encode(), this.bcFromInt(this[P_NEW_PUBLIC_KEY].encode().length, 2), this[P_NEW_PUBLIC_KEY].encode(), this.bcFromSign(this.r, this.s));
  }

}

module.exports = ChangeKey;

/***/ }),

/***/ "./src/Operations/ChangeKeySigned.js":
/*!*******************************************!*\
  !*** ./src/Operations/ChangeKeySigned.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
/**
 * A transaction object that can be signed.
 */

class ChangeKeySigned extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  static get OPTYPE() {
    return 7;
  }
  /**
   *
   * @param {Account|AccountNumber|Number|String} accountSigner
   * @param {PublicKey} newPublicKey
   */


  constructor(accountSigner, accountTarget, newPublicKey) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_ACCOUNT_TARGET] = new AccountNumber(accountTarget);
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
  }
  /**
   * Gets the digest of the operation.
   *
   * @returns {BC}
   */


  digest() {
    return BC.concat(this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this.fee.toMolina(), 8), this.payload, this.bcFromInt(PublicKey.empty().curve.id, 2), // just zero as curve id
    this[P_NEW_PUBLIC_KEY].encode(), this.bcFromInt(ChangeKeySigned.OPTYPE));
  }
  /**
   * Gets the raw implementation.
   *
   * @returns {BC}
   */


  toRaw() {
    return BC.concat(this.bcFromInt(ChangeKeySigned.OPTYPE, 4), this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this.fee.toMolina(), 8), this.bcFromBcWithSize(this.payload), PublicKey.empty().encode(), this.bcFromInt(this[P_NEW_PUBLIC_KEY].encode().length, 2), this[P_NEW_PUBLIC_KEY].encode(), this.bcFromSign(this.r, this.s));
  }

}

module.exports = ChangeKeySigned;

/***/ }),

/***/ "./src/Operations/Data.js":
/*!********************************!*\
  !*** ./src/Operations/Data.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_SENDER = Symbol('account_sender');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_DATA_TYPE = Symbol('data_type');
const P_DATA_SEQUENCE = Symbol('data_sequence');
const P_AMOUNT = Symbol('amount');
/**
 * A DATA operation object that can be signed.
 */

class Data extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  static get OPTYPE() {
    return 10;
  }
  /**
   * Constructor
   *
   * @param {Number|AccountNumber} signer
   * @param {Number|AccountNumber} sender
   * @param {Number|AccountNumber} target
   */


  constructor(signer, sender, target) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(signer);
    this[P_ACCOUNT_SENDER] = new AccountNumber(sender);
    this[P_ACCOUNT_TARGET] = new AccountNumber(target);
    this[P_DATA_TYPE] = 0;
    this[P_DATA_SEQUENCE] = 0;
    this[P_AMOUNT] = new Currency(0);
  }
  /**
   * Sets the data type.
   *
   * @param {Number} dataType
   * @returns {Data}
   */


  withDataType(dataType) {
    this[P_DATA_TYPE] = parseInt(dataType, 10);
    return this;
  }
  /**
   * Sets the data information.
   *
   * @param {Number} dataSequence
   * @returns {Data}
   */


  withDataSequence(dataSequence) {
    this[P_DATA_SEQUENCE] = parseInt(dataSequence, 10);
    return this;
  }
  /**
   * Sets the amount to transfer.
   *
   * @param {Currency|Number|String} amount
   * @returns {Data}
   */


  withAmount(amount) {
    this[P_AMOUNT] = new Currency(amount);
    return this;
  }
  /**
   * Gets the signer account number.
   *
   * @returns {AccountNumber}
   */


  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }
  /**
   * Gets the sender account number.
   *
   * @returns {AccountNumber}
   */


  get sender() {
    return this[P_ACCOUNT_SENDER];
  }
  /**
   * Gets the target account number.
   *
   * @returns {AccountNumber}
   */


  get target() {
    return this[P_ACCOUNT_TARGET];
  }
  /**
   * Gets the data type.
   *
   * @returns {Number}
   */


  get dataType() {
    return this[P_DATA_TYPE];
  }
  /**
   * Gets the data sequence.
   *
   * @returns {Number}
   */


  get dataSequence() {
    return this[P_DATA_SEQUENCE];
  }
  /**
   * Gets the amount to send.
   *
   * @returns {Currency}
   */


  get amount() {
    return this[P_AMOUNT];
  }
  /**
   * Gets the digest of the operation.
   *
   * @returns {BC}
   */


  digest() {
    return BC.concat(this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this[P_ACCOUNT_SENDER].account, 4), this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this[P_DATA_TYPE], 2), this.bcFromInt(this[P_DATA_SEQUENCE], 2), this.bcFromInt(this[P_AMOUNT].toMolina(), 8), this.bcFromInt(this.fee.toMolina(), 8), this.bcFromBcWithSize(this.payload), this.bcFromInt(Data.OPTYPE, 1));
  }
  /**
   * Gets the raw implementation.
   *
   * @returns {BC}
   */


  toRaw() {
    return BC.concat(this.bcFromInt(Data.OPTYPE, 4), this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this[P_ACCOUNT_SENDER].account, 4), this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this[P_DATA_TYPE], 2), this.bcFromInt(this[P_DATA_SEQUENCE], 2), this.bcFromInt(this[P_AMOUNT].toMolina(), 8), this.bcFromInt(this.fee.toMolina(), 8), this.bcFromBcWithSize(this.payload), this.bcFromSign(this.r, this.s));
  }
  /**
   * Gets a new Operation object from the given signed operation.
   *
   * @param {BC|Buffer|String|Uint8Array} raw
   * @returns {BC}
   */


  static fromRaw(raw) {
    raw = BC.from(raw);
    const signer = raw.slice(4, 8).switchEndian().toInt();
    const sender = raw.slice(8, 12).switchEndian().toInt();
    const target = raw.slice(12, 16).switchEndian().toInt();
    const dataType = raw.slice(20, 22).switchEndian().toInt();
    const dataSequence = raw.slice(22, 24).switchEndian().toInt();
    const amount = raw.slice(24, 32).switchEndian().toInt();
    const fee = raw.slice(32, 40).switchEndian().toInt();
    const payload = Data.readBCWithSize(raw, 40).value;
    const op = new Data(signer, sender, target);
    op.withDataType(dataType);
    op.withDataSequence(dataSequence);
    op.withAmount(Currency.fromMolina(amount));
    op.withFee(Currency.fromMolina(fee));
    op.withPayload(payload);
    return op;
  }
  /**
   * Data ops are signed with the digest, not the hash of the digest.
   *
   * @param {KeyPair} keyPair
   * @param {Number} nOperation
   */


  sign(keyPair, nOperation) {
    super.sign(keyPair, nOperation, true);
  }

}

module.exports = Data;

/***/ }),

/***/ "./src/Operations/DelistAccountForSale.js":
/*!************************************************!*\
  !*** ./src/Operations/DelistAccountForSale.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_PRICE = Symbol('price');
const P_ACCOUNT_TO_PAY = Symbol('account_to_pay');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
const P_LOCKED_UNTIL_BLOCK = Symbol('locked_until_block');
/**
 * A transaction object that can be signed.
 */

class DelistAccountForSale extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  static get OPTYPE() {
    return 5;
  }
  /**
   *
   * @param accountSigner
   * @param accountTarget
   */


  constructor(accountSigner, accountTarget) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_ACCOUNT_TARGET] = new AccountNumber(accountTarget);
    this[P_PRICE] = new Currency(0);
    this[P_ACCOUNT_TO_PAY] = new AccountNumber(0);
    this[P_NEW_PUBLIC_KEY] = PublicKey.empty();
    this[P_LOCKED_UNTIL_BLOCK] = 0;
  }
  /**
   * Gets the digest of the operation.
   *
   * @returns {BC}
   */


  digest() {
    return BC.concat(this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this[P_PRICE].toMolina(), 8), this.bcFromInt(this[P_ACCOUNT_TO_PAY].account, 4), this.bcFromInt(this.fee.toMolina(), 8), this.payload, this.bcFromInt(PublicKey.empty().curve.id, 2), // just zero as curve id
    this[P_NEW_PUBLIC_KEY].encode(), this.bcFromInt(this[P_LOCKED_UNTIL_BLOCK], 4), this.bcFromInt(DelistAccountForSale.OPTYPE));
  }
  /**
   * Gets the raw implementation.
   *
   * @returns {BC}
   */


  toRaw() {
    return BC.concat(this.bcFromInt(DelistAccountForSale.OPTYPE, 4), this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4), this.bcFromInt(5, 2), // list account for sale
    this.bcFromInt(this.nOperation, 4), this.bcFromInt(this.fee.toMolina(), 8), this.bcFromBcWithSize(this.payload), this.bcFromSign(this.r, this.s));
  }

}

module.exports = DelistAccountForSale;

/***/ }),

/***/ "./src/Operations/ListAccountForSale.js":
/*!**********************************************!*\
  !*** ./src/Operations/ListAccountForSale.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_PRICE = Symbol('price');
const P_ACCOUNT_TO_PAY = Symbol('account_to_pay');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
const P_LOCKED_UNTIL_BLOCK = Symbol('locked_until_block');
/**
 * A transaction object that can be signed.
 */

class ListAccountForSale extends Abstract {
  /**
     * Gets the optype.
     *
     * @returns {number}
     */
  static get OPTYPE() {
    return 4;
  }
  /**
   *
   * @param accountSigner
   * @param accountTarget
   * @param price
   * @param accountToPay
   */


  constructor(accountSigner, accountTarget, price, accountToPay) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_ACCOUNT_TARGET] = new AccountNumber(accountTarget);
    this[P_PRICE] = new Currency(price);
    this[P_ACCOUNT_TO_PAY] = new AccountNumber(accountToPay);
    this[P_NEW_PUBLIC_KEY] = PublicKey.empty();
    this[P_LOCKED_UNTIL_BLOCK] = 0;
  }
  /**
   * Will mark the operation as a private sale to a public key.
   *
   * @param {PublicKey} newPublicKey
   * @param {Number} lockedUntilBlock
   */


  asPrivateSale(newPublicKey, lockedUntilBlock = 0) {
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
    this[P_LOCKED_UNTIL_BLOCK] = parseInt(lockedUntilBlock, 10);
  }
  /**
     * Gets the digest of the operation.
     *
     * @returns {BC}
     */


  digest() {
    return BC.concat(this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this[P_PRICE].toMolina(), 8), this.bcFromInt(this[P_ACCOUNT_TO_PAY].account, 4), this.bcFromInt(this.fee.toMolina(), 8), this.payload, this.bcFromInt(PublicKey.empty().curve.id, 2), // just zero as curve id
    this[P_NEW_PUBLIC_KEY].encode(), this.bcFromInt(this[P_LOCKED_UNTIL_BLOCK], 4), this.bcFromInt(ListAccountForSale.OPTYPE));
  }
  /**
     * Gets the raw implementation.
     *
     * @returns {BC}
     */


  toRaw() {
    return BC.concat(this.bcFromInt(ListAccountForSale.OPTYPE, 4), this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4), this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4), this.bcFromInt(4, 2), // list account for sale
    this.bcFromInt(this.nOperation, 4), this.bcFromInt(this[P_PRICE].toMolina(), 8), this.bcFromInt(this[P_ACCOUNT_TO_PAY].account, 4), this.bcFromInt(PublicKey.empty().curve.id, 2), // just zero as curve id
    this.bcFromInt(0, 2), // x length
    this.bcFromInt(0, 2), // y length
    this.bcFromInt(this[P_NEW_PUBLIC_KEY].encode().length, 2), this[P_NEW_PUBLIC_KEY].encode(), this.bcFromInt(this[P_LOCKED_UNTIL_BLOCK], 4), this.bcFromInt(this.fee.toMolina(), 8), this.bcFromBcWithSize(this.payload), this.bcFromSign(this.r, this.s));
  }

}

module.exports = ListAccountForSale;

/***/ }),

/***/ "./src/Operations/Transaction.js":
/*!***************************************!*\
  !*** ./src/Operations/Transaction.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const P_SENDER = Symbol('sender');
const P_TARGET = Symbol('target');
const P_AMOUNT = Symbol('amount');
/**
 * A transaction object that can be signed.
 */

class Transaction extends Abstract {
  /**
     * Gets the optype.
     *
     * @returns {number}
     */
  static get OPTYPE() {
    return 1;
  }
  /**
   * Gets the sender account.
   * @returns {AccountNumber}
   */


  get sender() {
    return this[P_SENDER];
  }
  /**
     * Creates a new Transaction instance with the given data. The payload is
     * empty by default and not encoded.
     *
   * @param {AccountNumber|Account|String|Number} sender
   * @param {AccountNumber|Account|String|Number} target
   * @param {Currency} amount
     */


  constructor(sender, target, amount) {
    super();
    this[P_SENDER] = new AccountNumber(sender);
    this[P_TARGET] = new AccountNumber(target);
    this[P_AMOUNT] = new Currency(amount);
  }
  /**
     * Gets the digest of the operation.
     *
     * @returns {BC}
     */


  digest() {
    return BC.concat(this.bcFromInt(this[P_SENDER].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this[P_TARGET].account, 4), this.bcFromInt(this[P_AMOUNT].toMolina(), 8), this.bcFromInt(this.fee.toMolina(), 8), this.payload, BC.fromInt(0, 2), BC.fromInt(Transaction.OPTYPE));
  }
  /**
     * Gets the signed raw operations.
     *
     * @returns {BC}
     */


  toRaw() {
    return BC.concat(this.bcFromInt(Transaction.OPTYPE, 4), this.bcFromInt(this[P_SENDER].account, 4), this.bcFromInt(this.nOperation, 4), this.bcFromInt(this[P_TARGET].account, 4), this.bcFromInt(this[P_AMOUNT].toMolina(), 8), this.bcFromInt(this.fee.toMolina(), 8), this.bcFromBcWithSize(this.payload), PublicKey.empty().encode(), // v2
    this.bcFromSign(this.r, this.s));
  }

}

module.exports = Transaction;

/***/ }),

/***/ "./src/Operations/index.js":
/*!*********************************!*\
  !*** ./src/Operations/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  BuyAccount: __webpack_require__(/*! ./BuyAccount */ "./src/Operations/BuyAccount.js"),
  ChangeAccountInfo: __webpack_require__(/*! ./ChangeAccountInfo */ "./src/Operations/ChangeAccountInfo.js"),
  ChangeKey: __webpack_require__(/*! ./ChangeKey */ "./src/Operations/ChangeKey.js"),
  ChangeKeySigned: __webpack_require__(/*! ./ChangeKeySigned */ "./src/Operations/ChangeKeySigned.js"),
  Data: __webpack_require__(/*! ./Data */ "./src/Operations/Data.js"),
  DelistAccountForSale: __webpack_require__(/*! ./DelistAccountForSale */ "./src/Operations/DelistAccountForSale.js"),
  ListAccountForSale: __webpack_require__(/*! ./ListAccountForSale */ "./src/Operations/ListAccountForSale.js"),
  Transaction: __webpack_require__(/*! ./Transaction */ "./src/Operations/Transaction.js")
};

/***/ }),

/***/ "./src/OperationsBuilder.js":
/*!**********************************!*\
  !*** ./src/OperationsBuilder.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const P_OPERATIONS = Symbol('operations');
/**
 * This class combines multiple signed operations to a string that
 * can be executed by the node.
 */

class OperationsBuilder {
  /**
   * Constructor
   */
  constructor() {
    this[P_OPERATIONS] = [];
  }
  /**
   * Adds a single operation to the list of Operations.
   *
   * @param operation
   * @returns {OperationsBuilder}
   */


  addOperation(operation) {
    if (!operation.isSigned) {
      throw new Error('Operation needs to be signed.');
    }

    this[P_OPERATIONS].push(operation);
    return this;
  }
  /**
   * Builds the operations.
   *
   * @returns {BC}
   */


  build() {
    let bc = BC.fromInt(this[P_OPERATIONS].length, 4).switchEndian();
    this[P_OPERATIONS].forEach(op => {
      bc = BC.concat(bc, op.toRaw());
    });
    return bc;
  }

  parse(raw) {
    // let numOperations = raw.slice(0, 3);
    let bc = BC.fromInt(this[P_OPERATIONS].length, 4).switchEndian();
    this[P_OPERATIONS].forEach(op => {
      bc = BC.concat(bc, op.toRaw());
    });
    return bc;
  }

}

module.exports = OperationsBuilder;

/***/ }),

/***/ "./src/Signer.js":
/*!***********************!*\
  !*** ./src/Signer.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


const Sha = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Sha;

const Keys = __webpack_require__(/*! @pascalcoin-sbx/crypto */ "@pascalcoin-sbx/crypto").Keys;

class Signer {
  /**
   * Signs the given digest with the given keypair and returns the r and s
   * values (because thats all that is needed).
   *
   * @param {KeyPair} keyPair
   * @param {BC} digest
   */
  static signWithHash(keyPair, digest) {
    const hash = Sha.sha256(digest);
    return Keys.sign(keyPair, hash);
  }

  static signWithDigest(keyPair, digest) {
    return Keys.sign(keyPair, digest);
  }

}

module.exports = Signer;

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ben/Code/crypto/pascalcoin/untitled/packages/signing/index.js */"./index.js");


/***/ }),

/***/ "@pascalcoin-sbx/common":
/*!******************************!*\
  !*** external "@pascalcoin-sbx/common" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__sbx_common__;

/***/ }),

/***/ "@pascalcoin-sbx/crypto":
/*!******************************!*\
  !*** external "@pascalcoin-sbx/crypto" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__sbx_crypto__;

/***/ })

/******/ });
});
//# sourceMappingURL=signing.light.js.map
