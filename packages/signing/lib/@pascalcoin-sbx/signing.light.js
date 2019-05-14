(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@pascalcoin-sbx/common"), require("@pascalcoin-sbx/crypto"));
	else if(typeof define === 'function' && define.amd)
		define("@pascalcoin-sbx/signing", ["@pascalcoin-sbx/common", "@pascalcoin-sbx/crypto"], factory);
	else if(typeof exports === 'object')
		exports["@pascalcoin-sbx/signing"] = factory(require("@pascalcoin-sbx/common"), require("@pascalcoin-sbx/crypto"));
	else
		root["@pascalcoin-sbx/signing"] = factory(root["@pascalcoin-sbx/common"], root["@pascalcoin-sbx/crypto"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__pascalcoin_sbx_common__, __WEBPACK_EXTERNAL_MODULE__pascalcoin_sbx_crypto__) {
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Signer: __webpack_require__(/*! ./src/Signer */ "./src/Signer.js"),
  RawOperations: __webpack_require__(/*! ./src/RawOperations */ "./src/RawOperations.js"),
  RawOperationsCoder: __webpack_require__(/*! ./src/RawOperationsCoder */ "./src/RawOperationsCoder.js"),
  Coding: {
    PublicKeyWithLength: __webpack_require__(/*! ./src/Coding/PublicKeyWithLength */ "./src/Coding/PublicKeyWithLength.js")
  },
  Operations: __webpack_require__(/*! ./src/Operations */ "./src/Operations/index.js")
};

/***/ }),

/***/ "./src/Abstract.js":
/*!*************************!*\
  !*** ./src/Abstract.js ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
// const Payload = require('../Crypto/Payload');
const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const PascalCoinInfo = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").PascalCoinInfo;

const P_PAYLOAD = Symbol('payload');
const P_S = Symbol('s');
const P_R = Symbol('r');
const P_FEE = Symbol('fee');
const P_N_OPERATION = Symbol('nOperation');
/**
 * Abstract class for RPC response objects.
 */

class Abstract {
  /**
   * Constructor.
   */
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


  withMinFee(lastKnownBlock = null) {
    this[P_FEE] = PascalCoinInfo.MIN_FEE(lastKnownBlock);
    return this;
  }

  withNOperation(nOperation) {
    this[P_N_OPERATION] = nOperation;
    return this;
  }

  withSign(r, s) {
    this[P_R] = r;
    this[P_S] = s;
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

  usesDigestToSign() {
    return false;
  }

}

module.exports = Abstract;

/***/ }),

/***/ "./src/Coding/PublicKeyWithLength.js":
/*!*******************************************!*\
  !*** ./src/Coding/PublicKeyWithLength.js ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding.Pascal.Keys.PublicKey;

const BytesWithLength = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding.Core.BytesWithLength;

const PascalPublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const publicKeyCoding = new PublicKey();
/**
 * A special Int32 type that can handle account number.
 */

class PublicKeyWithLength extends BytesWithLength {
  constructor(id = null) {
    super(id || 'pubkey', 16);
  }
  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC} bc
   * @returns {PascalPublicKey}
   */


  decodeFromBytes(bc) {
    const pubKey = super.decodeFromBytes(bc);
    const parsed = publicKeyCoding.decodeFromBytes(pubKey);
    return new PascalPublicKey(parsed.x, parsed.y, parsed.curve);
  }
  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {*} value
   * @returns {PascalPublicKey}
   */


  encodeToBytes(value) {
    return super.encodeToBytes(publicKeyCoding.encodeToBytes(value));
  }

}

module.exports = PublicKeyWithLength;

/***/ }),

/***/ "./src/Operations/BuyAccount/DigestCoder.js":
/*!**************************************************!*\
  !*** ./src/Operations/BuyAccount/DigestCoder.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const CompositeType = Coding.CompositeType;
/**
 * A DATA operation object that can be signed.
 */

class DigestCoder extends CompositeType {
  constructor(opType) {
    super('buy_operation_digest');
    super.description('Digest for buy account operation'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('sender').description('The buyer account.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation value of the buyer.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account to buy'));
    this.addSubType(new Coding.Pascal.Currency('amount').description('The amount paid for the account.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee paid for the operation.'));
    this.addSubType(new Coding.Core.BytesWithoutLength('payload').description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.Curve('v2_pubkey_curve').description('Curve ID 0 - previously active in <= v2.').withFixedValue(PublicKey.empty().curve));
    this.addSubType(new Coding.Pascal.Currency('price').description('The price of the account to buy'));
    this.addSubType(new Coding.Pascal.AccountNumber('seller').description('The account number of the seller'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('newPublicKey').description('The new public key of the account.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(opType).description('The buy account optype as 8 bit int8'));
  }

}

module.exports = DigestCoder;

/***/ }),

/***/ "./src/Operations/BuyAccount/Operation.js":
/*!************************************************!*\
  !*** ./src/Operations/BuyAccount/Operation.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../../Abstract */ "./src/Abstract.js");

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
  get opType() {
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

  get sender() {
    return this[P_SENDER];
  }

  get target() {
    return this[P_TARGET];
  }

  get amount() {
    return this[P_AMOUNT];
  }

  get price() {
    return this[P_ACCOUNT_PRICE];
  }

  get seller() {
    return this[P_SELLER_ACCOUNT];
  }

  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

}

module.exports = BuyAccount;

/***/ }),

/***/ "./src/Operations/BuyAccount/RawCoder.js":
/*!***********************************************!*\
  !*** ./src/Operations/BuyAccount/RawCoder.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const Endian = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Endian;

const CompositeType = Coding.CompositeType;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const Operation = __webpack_require__(/*! ./Operation */ "./src/Operations/BuyAccount/Operation.js");
/**
 * A DATA operation object that can be signed.
 */


class RawCoder extends CompositeType {
  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Buy Account Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }

  constructor(opType) {
    super('buy_operation_raw');
    this.description('The coder for the raw representation of a BuyAccount operation');
    this.description('Encoded BuyAccount Operation');
    this.addSubType(new Coding.Pascal.AccountNumber('sender').description('The buyer account.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation value of the buyer.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account to buy.'));
    this.addSubType(new Coding.Pascal.Currency('amount').description('The amount to pay for the account.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee paid for the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('v2_public_key').description('Empty pubkey (6 zero bytes) - previously active in <= v2.').withFixedValue(PublicKey.empty()));
    this.addSubType(new Coding.Core.Int8('type', true, Endian.LITTLE_ENDIAN).description('Fixed type for a "Buy account" transaction.').withFixedValue(2));
    this.addSubType(new Coding.Pascal.Currency('price').description('The price of the account.'));
    this.addSubType(new Coding.Pascal.AccountNumber('seller').description('The account number of the seller.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('newPublicKey').description('The new public key that will own the account.'));
    this.addSubType(new Coding.Core.BytesWithLength('r', 2).description('R value of the sign operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('s', 2).description('S value of the sign operation.'));
  }

  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Operation(decoded.sender, decoded.target, decoded.amount, decoded.price, decoded.seller, decoded.newPublicKey);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.signFromDecoded(decoded.nOperation, decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawCoder;

/***/ }),

/***/ "./src/Operations/ChangeAccountInfo/DigestCoder.js":
/*!*********************************************************!*\
  !*** ./src/Operations/ChangeAccountInfo/DigestCoder.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const CompositeType = Coding.CompositeType;
/**
 * A DATA operation object that can be signed.
 */

class DigestCoder extends CompositeType {
  constructor(opType) {
    super('change_info_operation_digest'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The signer of the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The target account to change info of.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation value of the buyer.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee paid for the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('v2_public_key').description('Empty pubkey (6 zero bytes) - previously active in <= v2.').withFixedValue(PublicKey.empty()));
    this.addSubType(new Coding.Core.Int8('changeType').description('The change type.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('newPublicKey').description('The new public key of the account.'));
    this.addSubType(new Coding.Pascal.AccountName('newName').description('The new name of the account.'));
    this.addSubType(new Coding.Core.Int16('newType').description('The new type of the account.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(opType).description('The buy account optype as 8 bit int8'));
  }

}

module.exports = DigestCoder;

/***/ }),

/***/ "./src/Operations/ChangeAccountInfo/Operation.js":
/*!*******************************************************!*\
  !*** ./src/Operations/ChangeAccountInfo/Operation.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../../Abstract */ "./src/Abstract.js");

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
 * A transaction object that can be signed.
 */

class ChangeAccountInfo extends Abstract {
  /**
     * Gets the optype.
     *
     * @returns {number}
     */
  get opType() {
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

  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }

  get target() {
    return this[P_ACCOUNT_TARGET];
  }

  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

  get newName() {
    return this[P_NEW_NAME];
  }

  get newType() {
    return this[P_NEW_TYPE];
  }
  /**
   * Gets the change type of the op.
   *
   * @returns {number}
   */


  get changeType() {
    let changeType = 0;

    if (this[P_WITH_NEW_PUBKEY] === true) {
      changeType |= 1;
    }

    if (this[P_WITH_NEW_NAME] === true) {
      changeType |= 2;
    }

    if (this[P_WITH_NEW_TYPE] === true) {
      changeType |= 4;
    }

    return changeType;
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

}

module.exports = ChangeAccountInfo;

/***/ }),

/***/ "./src/Operations/ChangeAccountInfo/RawCoder.js":
/*!******************************************************!*\
  !*** ./src/Operations/ChangeAccountInfo/RawCoder.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const CompositeType = Coding.CompositeType;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const Operation = __webpack_require__(/*! ./Operation */ "./src/Operations/ChangeAccountInfo/Operation.js");
/**
 * A DATA operation object that can be signed.
 */


class RawCoder extends CompositeType {
  constructor(opType) {
    super('buy_operation_raw');
    this.description('Encoded BuyAccount Operation');
    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The signer of the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The target account to change info of.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation value of the buyer.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee paid for the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('v2_public_key').description('Empty pubkey (6 zero bytes) - previously active in <= v2.').withFixedValue(PublicKey.empty()));
    this.addSubType(new Coding.Core.Int8('changeType').description('The change type.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('newPublicKey').description('The new public key of the account.'));
    this.addSubType(new Coding.Pascal.AccountName('newName').description('The new name of the account.'));
    this.addSubType(new Coding.Core.Int16('newType').description('The new type of the account.'));
    this.addSubType(new Coding.Core.BytesWithLength('r', 2).description('R value of the sign operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('s', 2).description('S value of the sign operation.'));
  }

  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Operation(decoded.signer, decoded.target);
    op.withNewType(decoded.type);
    op.withNewName(decoded.name);
    op.withNewPublicKey(decoded.newPublicKey);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.signFromDecoded(decoded.nOperation, decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawCoder;

/***/ }),

/***/ "./src/Operations/ChangeKey.js":
/*!*************************************!*\
  !*** ./src/Operations/ChangeKey.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
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
/*! all exports used */
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

/***/ "./src/Operations/Data/DigestCoder.js":
/*!********************************************!*\
  !*** ./src/Operations/Data/DigestCoder.js ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const Endian = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Endian;

const CompositeType = Coding.CompositeType;
/**
 * A DATA operation object that can be signed.
 */

class DigestCoder extends CompositeType {
  constructor(opType) {
    super('data_operation_digest'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('sender').description('The account that sends the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account that will receive the operation.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation of the signer.'));
    this.addSubType(new Coding.Core.Int16('dataType', true, Endian.LITTLE_ENDIAN).description('The data type of the operation.'));
    this.addSubType(new Coding.Core.Int16('dataSequence', true, Endian.LITTLE_ENDIAN).description('The data sequence of the operation.'));
    this.addSubType(new Coding.Pascal.Currency('amount').description('The amount associated with the operation.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee associated with the operation'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(opType).description('The optype as 8bit int.'));
  }

}

module.exports = DigestCoder;

/***/ }),

/***/ "./src/Operations/Data/Operation.js":
/*!******************************************!*\
  !*** ./src/Operations/Data/Operation.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../../Abstract */ "./src/Abstract.js");

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
  get opType() {
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

  usesDigestToSign() {
    return true;
  }

}

module.exports = Data;

/***/ }),

/***/ "./src/Operations/Data/RawCoder.js":
/*!*****************************************!*\
  !*** ./src/Operations/Data/RawCoder.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const Endian = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Endian;

const CompositeType = Coding.CompositeType;

const Operation = __webpack_require__(/*! ./Operation */ "./src/Operations/Data/Operation.js");
/**
 * A DATA operation object that can be signed.
 */


class RawCoder extends CompositeType {
  constructor(opType) {
    super('data_operation_raw');
    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('sender').description('The account that sends the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account that will receive the operation.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation of the signer.'));
    this.addSubType(new Coding.Core.Int16('dataType', true, Endian.LITTLE_ENDIAN).description('The data type of the operation.'));
    this.addSubType(new Coding.Core.Int16('dataSequence', true, Endian.LITTLE_ENDIAN).description('The data sequence of the operation.'));
    this.addSubType(new Coding.Pascal.Currency('amount').description('The amount associated the operation.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee associated the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('r', 2).description('R value of the signed operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('s', 2).description('R value of the signed operation.'));
  }

  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Operation(decoded.signer, decoded.sender, decoded.target);
    op.withDataType(decoded.dataType);
    op.withDataSequence(decoded.dataSequence);
    op.withAmount(decoded.amount);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.signFromDecoded(decoded.nOperation, decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawCoder;

/***/ }),

/***/ "./src/Operations/DeListAccountForSale/DigestCoder.js":
/*!************************************************************!*\
  !*** ./src/Operations/DeListAccountForSale/DigestCoder.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const CompositeType = Coding.CompositeType;
/**
 * A DATA operation object that can be signed.
 */

class DigestCoder extends CompositeType {
  constructor(opType) {
    super('delist_operation_digest'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account that will be de-listed.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation of the signer.'));
    this.addSubType(new Coding.Pascal.Currency('price').description('The price of the target account.'));
    this.addSubType(new Coding.Pascal.AccountNumber('accountToPay').description('The account where the amount goes to when the target is sold.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee associated with the operation'));
    this.addSubType(new Coding.Core.BytesWithoutLength('payload').description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.Curve('v2_pubkey_curve').withFixedValue(PublicKey.empty().curve).description('Curve ID 0 - previously active in <= v2.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('newPublicKey').description('The new public key of the buyer (private sale).'));
    this.addSubType(new Coding.Core.Int32('lockedUntilBlock').description('The block number until the account is locked.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(opType).description('The optype as 8bit int.'));
  }

}

module.exports = DigestCoder;

/***/ }),

/***/ "./src/Operations/DeListAccountForSale/Operation.js":
/*!**********************************************************!*\
  !*** ./src/Operations/DeListAccountForSale/Operation.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../../Abstract */ "./src/Abstract.js");

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

class DeListAccountForSale extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
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

  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }

  get target() {
    return this[P_ACCOUNT_TARGET];
  }

  get price() {
    return this[P_PRICE];
  }

  get accountToPay() {
    return this[P_ACCOUNT_TO_PAY];
  }

  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

  get lockedUntilBlock() {
    return this[P_LOCKED_UNTIL_BLOCK];
  }

}

module.exports = DeListAccountForSale;

/***/ }),

/***/ "./src/Operations/DeListAccountForSale/RawCoder.js":
/*!*********************************************************!*\
  !*** ./src/Operations/DeListAccountForSale/RawCoder.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const CompositeType = Coding.CompositeType;

const Operation = __webpack_require__(/*! ./Operation */ "./src/Operations/DeListAccountForSale/Operation.js");
/**
 * A DATA operation object that can be signed.
 */


class RawCoder extends CompositeType {
  constructor(opType) {
    super('delist_operation_raw');
    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account that will be listed.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 2).withFixedValue(opType).description(`The optype of the operation (${opType})`));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation of the signer.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee associated with the operation'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('r', 2).description('R value of the signed operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('s', 2).description('R value of the signed operation.'));
  }

  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Operation(decoded.signer, decoded.target);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.signFromDecoded(decoded.nOperation, decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawCoder;

/***/ }),

/***/ "./src/Operations/ListAccountForSale/DigestCoder.js":
/*!**********************************************************!*\
  !*** ./src/Operations/ListAccountForSale/DigestCoder.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const Endian = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Endian;

const CompositeType = Coding.CompositeType;
/**
 * A DATA operation object that can be signed.
 */

class DigestCoder extends CompositeType {
  constructor(opType) {
    super('data_operation_digest'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account that will be listed.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation of the signer.'));
    this.addSubType(new Coding.Pascal.Currency('price').description('The price of the target account.'));
    this.addSubType(new Coding.Pascal.AccountNumber('accountToPay').description('The account where the amount goes to when the target is sold.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee associated with the operation'));
    this.addSubType(new Coding.Core.StringWithoutLength('payload').description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.Curve('v2_pubkey_curve').withFixedValue(PublicKey.empty().curve).description('Curve ID 0 - previously active in <= v2.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('newPublicKey').description('The new public key of the buyer (private sale).'));
    this.addSubType(new Coding.Core.Int32('lockedUntilBlock', true, Endian.LITTLE_ENDIAN).description('The block number until the account is locked.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(opType).description('The optype as 8bit int.'));
  }

}

module.exports = DigestCoder;

/***/ }),

/***/ "./src/Operations/ListAccountForSale/Operation.js":
/*!********************************************************!*\
  !*** ./src/Operations/ListAccountForSale/Operation.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../../Abstract */ "./src/Abstract.js");

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
  get opType() {
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

  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }

  get target() {
    return this[P_ACCOUNT_TARGET];
  }

  get price() {
    return this[P_PRICE];
  }

  get accountToPay() {
    return this[P_ACCOUNT_TO_PAY];
  }

  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

  get lockedUntilBlock() {
    return this[P_LOCKED_UNTIL_BLOCK];
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

}

module.exports = ListAccountForSale;

/***/ }),

/***/ "./src/Operations/ListAccountForSale/RawCoder.js":
/*!*******************************************************!*\
  !*** ./src/Operations/ListAccountForSale/RawCoder.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const Endian = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Endian;

const PublicKeyWithLength = __webpack_require__(/*! ./../../Coding/PublicKeyWithLength */ "./src/Coding/PublicKeyWithLength.js");

const CompositeType = Coding.CompositeType;

const Operation = __webpack_require__(/*! ./Operation */ "./src/Operations/ListAccountForSale/Operation.js");
/**
 * A DATA operation object that can be signed.
 */


class RawCoder extends CompositeType {
  constructor(opType) {
    super('list_operation_raw');
    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account that will be listed.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 2).withFixedValue(opType).description(`The optype of the operation (${opType})`));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation of the signer.'));
    this.addSubType(new Coding.Pascal.Currency('price').description('The price of the target account.'));
    this.addSubType(new Coding.Pascal.AccountNumber('accountToPay').description('The account where the amount goes to when the target is sold.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('v2_pubkey').description('Empty pubkey (6 zero bytes) - previously active in <= v2.').withFixedValue(PublicKey.empty()));
    this.addSubType(new PublicKeyWithLength('newPublicKey').description('The new public key of the buyer (private sale).'));
    this.addSubType(new Coding.Core.Int32('lockedUntilBlock', true, Endian.LITTLE_ENDIAN).description('The block number until the account is locked.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee associated with the operation'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('r', 2).description('R value of the signed operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('s', 2).description('S value of the signed operation.'));
  }

  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Operation(decoded.signer, decoded.target, decoded.price, decoded.accountToPay);
    op.asPrivateSale(decoded.newPublicKey, decoded.lockedUntilBlock);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.signFromDecoded(decoded.nOperation, decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawCoder;

/***/ }),

/***/ "./src/Operations/Transaction/DigestCoder.js":
/*!***************************************************!*\
  !*** ./src/Operations/Transaction/DigestCoder.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const CompositeType = Coding.CompositeType;
/**
 * A DATA operation object that can be signed.
 */

class DigestCoder extends CompositeType {
  constructor(opType) {
    super('tx_operation_digest'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('sender').description('The sender account.'));
    this.addSubType(new Coding.Pascal.NOperation('nOperation').description('The next n_operation value of the sender.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The receiving account.'));
    this.addSubType(new Coding.Pascal.Currency('amount').description('The amount that is sent from sender to receiver.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee included in the operation.'));
    this.addSubType(new Coding.Core.BytesWithoutLength('payload').description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.Curve('v2_pubkey_curve').description('Curve ID 0 - previously active in <= v2.').withFixedValue(PublicKey.empty().curve));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).description('Operation type.').withFixedValue(opType));
  }

}

module.exports = DigestCoder;

/***/ }),

/***/ "./src/Operations/Transaction/Operation.js":
/*!*************************************************!*\
  !*** ./src/Operations/Transaction/Operation.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./../../Abstract */ "./src/Abstract.js");

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const P_ACCOUNT_SENDER = Symbol('sender');
const P_ACCOUNT_TARGET = Symbol('target');
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
  get opType() {
    return 1;
  }
  /**
   * Gets the sender account.
   * @returns {AccountNumber}
   */


  get sender() {
    return this[P_ACCOUNT_SENDER];
  }
  /**
   * Gets the sender account.
   * @returns {AccountNumber}
   */


  get target() {
    return this[P_ACCOUNT_TARGET];
  }
  /**
   * Gets the sender account.
   * @returns {AccountNumber}
   */


  get amount() {
    return this[P_AMOUNT];
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
    this[P_ACCOUNT_SENDER] = new AccountNumber(sender);
    this[P_ACCOUNT_TARGET] = new AccountNumber(target);
    this[P_AMOUNT] = new Currency(amount);
  }

}

module.exports = Transaction;

/***/ }),

/***/ "./src/Operations/Transaction/RawCoder.js":
/*!************************************************!*\
  !*** ./src/Operations/Transaction/RawCoder.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const CompositeType = Coding.CompositeType;

const Operation = __webpack_require__(/*! ./Operation */ "./src/Operations/Transaction/Operation.js");
/**
 * A DATA operation object that can be signed.
 */


class RawCoder extends CompositeType {
  constructor() {
    super('data_operation_raw');
    this.addSubType(new Coding.Pascal.AccountNumber('sender').description('The sender account.'));
    this.addSubType(new Coding.Pascal.NOperation('nOperation').description('The next n_operation value of the sender.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The receiving account.'));
    this.addSubType(new Coding.Pascal.Currency('amount').description('The amount that is sent from sender to receiver.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee included in the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('v2_pubkey').description('Empty pubkey (6 zero bytes) - previously active in <= v2.').withFixedValue(PublicKey.empty()));
    this.addSubType(new Coding.Core.BytesWithLength('r', 2).description('R value of the signed operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('s', 2).description('S value of the signed operation.'));
  }

  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Operation(decoded.sender, decoded.target, decoded.amount);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.signFromDecoded(decoded.nOperation, decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawCoder;

/***/ }),

/***/ "./src/Operations/index.js":
/*!*********************************!*\
  !*** ./src/Operations/index.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

let Items = {
  ChangeKey: __webpack_require__(/*! ./ChangeKey */ "./src/Operations/ChangeKey.js"),
  ChangeKeySigned: __webpack_require__(/*! ./ChangeKeySigned */ "./src/Operations/ChangeKeySigned.js"),
  ChangeAccountInfo: {
    Operation: __webpack_require__(/*! ./ChangeAccountInfo/Operation */ "./src/Operations/ChangeAccountInfo/Operation.js"),
    RawCoder: __webpack_require__(/*! ./ChangeAccountInfo/RawCoder */ "./src/Operations/ChangeAccountInfo/RawCoder.js"),
    DigestCoder: __webpack_require__(/*! ./ChangeAccountInfo/DigestCoder */ "./src/Operations/ChangeAccountInfo/DigestCoder.js")
  },
  Data: {
    Operation: __webpack_require__(/*! ./Data/Operation */ "./src/Operations/Data/Operation.js"),
    RawCoder: __webpack_require__(/*! ./Data/RawCoder */ "./src/Operations/Data/RawCoder.js"),
    DigestCoder: __webpack_require__(/*! ./Data/DigestCoder */ "./src/Operations/Data/DigestCoder.js")
  },
  Transaction: {
    Operation: __webpack_require__(/*! ./Transaction/Operation */ "./src/Operations/Transaction/Operation.js"),
    RawCoder: __webpack_require__(/*! ./Transaction/RawCoder */ "./src/Operations/Transaction/RawCoder.js"),
    DigestCoder: __webpack_require__(/*! ./Transaction/DigestCoder */ "./src/Operations/Transaction/DigestCoder.js")
  },
  ListAccountForSale: {
    Operation: __webpack_require__(/*! ./ListAccountForSale/Operation */ "./src/Operations/ListAccountForSale/Operation.js"),
    RawCoder: __webpack_require__(/*! ./ListAccountForSale/RawCoder */ "./src/Operations/ListAccountForSale/RawCoder.js"),
    DigestCoder: __webpack_require__(/*! ./ListAccountForSale/DigestCoder */ "./src/Operations/ListAccountForSale/DigestCoder.js")
  },
  DeListAccountForSale: {
    Operation: __webpack_require__(/*! ./DeListAccountForSale/Operation */ "./src/Operations/DeListAccountForSale/Operation.js"),
    RawCoder: __webpack_require__(/*! ./DeListAccountForSale/RawCoder */ "./src/Operations/DeListAccountForSale/RawCoder.js"),
    DigestCoder: __webpack_require__(/*! ./DeListAccountForSale/DigestCoder */ "./src/Operations/DeListAccountForSale/DigestCoder.js")
  },
  BuyAccount: {
    Operation: __webpack_require__(/*! ./BuyAccount/Operation */ "./src/Operations/BuyAccount/Operation.js"),
    RawCoder: __webpack_require__(/*! ./BuyAccount/RawCoder */ "./src/Operations/BuyAccount/RawCoder.js"),
    DigestCoder: __webpack_require__(/*! ./BuyAccount/DigestCoder */ "./src/Operations/BuyAccount/DigestCoder.js")
  }
};

Items.digestCoderFor = operation => {
  return Items[operation.constructor.name].DigestCoder;
};

Items.rawCoderFor = operation => {
  return Items[operation.constructor.name].RawCoder;
};

module.exports = Items;

/***/ }),

/***/ "./src/RawOperations.js":
/*!******************************!*\
  !*** ./src/RawOperations.js ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Signer = __webpack_require__(/*! ./Signer */ "./src/Signer.js");

const OperationListCoder = __webpack_require__(/*! ./RawOperationsCoder */ "./src/RawOperationsCoder.js");

const P_OPERATIONS = Symbol('operations');
const P_CODER = Symbol('coder');
const P_SIGNER = Symbol('signer');
/**
 * This class combines multiple signed operations to a string that
 * can be executed by the node.
 */

class RawOperations {
  /**
   * Constructor
   */
  constructor() {
    this[P_OPERATIONS] = [];
    this[P_CODER] = new OperationListCoder();
    this[P_SIGNER] = new Signer();
  }
  /**
   * Adds a single operation to the list of Operations.
   *
   * @param operation
   * @returns {RawOperations}
   */


  addOperation(keyPair, operation) {
    if (operation.isSigned) {
      throw new Error('Operation should not be signed.');
    }

    let sign = this[P_SIGNER].sign(keyPair, operation);
    operation.withSign(sign.r, sign.s);
    this[P_OPERATIONS].push({
      optype: operation.opType,
      operation: operation
    });
    return this;
  }

  get operations() {
    return this[P_OPERATIONS];
  }

  get count() {
    return this[P_OPERATIONS].length;
  }

}

module.exports = RawOperations;

/***/ }),

/***/ "./src/RawOperationsCoder.js":
/*!***********************************!*\
  !*** ./src/RawOperationsCoder.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const Endian = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Endian;

const TransactionRawCoder = __webpack_require__(/*! ./Operations/Transaction/RawCoder */ "./src/Operations/Transaction/RawCoder.js");

const DataRawCoder = __webpack_require__(/*! ./Operations/Data/RawCoder */ "./src/Operations/Data/RawCoder.js");

const ListRawCoder = __webpack_require__(/*! ./Operations/ListAccountForSale/RawCoder */ "./src/Operations/ListAccountForSale/RawCoder.js");

const DeListRawCoder = __webpack_require__(/*! ./Operations/DeListAccountForSale/RawCoder */ "./src/Operations/DeListAccountForSale/RawCoder.js");

const ChangeAccountInfoRawCoder = __webpack_require__(/*! ./Operations/ChangeAccountInfo/RawCoder */ "./src/Operations/ChangeAccountInfo/RawCoder.js");

const CompositeType = Coding.CompositeType;
/**
 * A DATA operation object that can be signed.
 */

class RawOperationsCoder extends CompositeType {
  constructor() {
    super('combined signed operations');
    super.description('Coder to combine multiple operations');
    this.addSubType(new Coding.Core.Int32('count', true, Endian.LITTLE_ENDIAN));
    const operationType = new CompositeType('operation');
    operationType.addSubType(new Coding.Pascal.OpType('optype', 4));
    operationType.addSubType(new Coding.Decissive('operation', 'optype', markerValue => {
      switch (markerValue) {
        case 1:
          return new TransactionRawCoder(1);

        case 4:
          return new ListRawCoder(4);

        case 5:
          return new DeListRawCoder(5);

        case 8:
          return new ChangeAccountInfoRawCoder(8);

        case 10:
          return new DataRawCoder(10);

        default:
          throw new Error('Unable to map marker to a coder.');
      }
    }));
    this.addSubType(new Coding.Repeating('operations', operationType));
  }

}

module.exports = RawOperationsCoder;

/***/ }),

/***/ "./src/Signer.js":
/*!***********************!*\
  !*** ./src/Signer.js ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

const Sha = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Sha;

const Keys = __webpack_require__(/*! @pascalcoin-sbx/crypto */ "@pascalcoin-sbx/crypto").Keys;

const Operations = __webpack_require__(/*! ./Operations */ "./src/Operations/index.js");
/**
 * Signs the given digest with the given keypair and returns the r and s
 * values (because thats all that is needed).
 *
 * @param {KeyPair} keyPair
 * @param {BC} digest
 */


function signWithHash(keyPair, digest) {
  const hash = Sha.sha256(digest);
  return Keys.sign(keyPair, hash);
}

function signWithDigest(keyPair, digest) {
  return Keys.sign(keyPair, digest);
}

class Signer {
  /**
   * Signs the given operation and returns a new rawoperations string.
   *
   * @param {KeyPair} keyPair
   * @param {Number} nOperation
   * @param {Boolean} useDigest
   * @returns {Abstract}
   */
  sign(keyPair, operation) {
    const DigestCoder = Operations.digestCoderFor(operation);
    const digest = new DigestCoder(operation.opType).encodeToBytes(operation);
    let signResult; // TODO: check DATA operation

    if (operation.usesDigestToSign() === true) {
      signResult = signWithDigest(keyPair, digest);
    } else {
      signResult = signWithHash(keyPair, digest);
    } // save results


    return signResult;
  }

}

module.exports = Signer;

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ben/Code/crypto/pascalcoin/untitled/packages/signing/index.js */"./index.js");


/***/ }),

/***/ "@pascalcoin-sbx/common":
/*!*****************************************!*\
  !*** external "@pascalcoin-sbx/common" ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__pascalcoin_sbx_common__;

/***/ }),

/***/ "@pascalcoin-sbx/crypto":
/*!*****************************************!*\
  !*** external "@pascalcoin-sbx/crypto" ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__pascalcoin_sbx_crypto__;

/***/ })

/******/ });
});
//# sourceMappingURL=signing.light.js.map