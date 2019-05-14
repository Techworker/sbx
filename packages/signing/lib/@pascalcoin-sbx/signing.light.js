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

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding.Pascal.Keys.PublicKey;

const BytesWithLength = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding.Core.BytesWithLength;

const PascalPublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const publicKeyCoding = new PublicKey();
/**
 * A special Int32 type that can handle account number.
 */

class PublicKeyWithLength extends BytesWithLength {
  constructor(id = null) {
    super(id || 'pubkey', 2);
  }
  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {PascalPublicKey}
   */


  decodeFromBytes(bc, options = {}, all = null) {
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
 * The digest encoder of a BuyAccount Operation.
 */

class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('buy_op_digest');
    super.description('Digest encoder for a BuyAccount operation.'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('sender').description('The buyer account.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation value of the buyer.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account to buy'));
    this.addSubType(new Coding.Pascal.Currency('amount').description('The amount paid for the account.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee paid for the operation.'));
    this.addSubType(new Coding.Core.BytesWithoutLength('payload').description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.Curve('v2_pubkey_curve').description('Curve ID 0 - previously active in <= v2.').withFixedValue(PublicKey.empty().curve));
    this.addSubType(new Coding.Pascal.Currency('price').description('The price of the account to buy'));
    this.addSubType(new Coding.Pascal.AccountNumber('seller').description('The account number of the seller'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('newPublicKey', true).description('The new public key of the account.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(6).description('The buy account optype as 8 bit int8'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Buy Account Operation (DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * @inheritDoc AbstractType#canDecode
   */


  get canDecode() {
    return false;
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
 * Representation of a signable BuyAccount operation.
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
  /**
   * Gets the buyer account.
   *
   * @return {AccountNumber}
   */


  get sender() {
    return this[P_SENDER];
  }
  /**
   * Gets the account to buy.
   *
   * @return {AccountNumber}
   */


  get target() {
    return this[P_TARGET];
  }
  /**
   * Gets the amount to be transferred.
   *
   * @return {Currency}
   */


  get amount() {
    return this[P_AMOUNT];
  }
  /**
   * Gets the price of the account.
   *
   * @return {Currency}
   */


  get price() {
    return this[P_ACCOUNT_PRICE];
  }
  /**
   * Gets the account of the seller.
   *
   * @return {AccountNumber}
   */


  get seller() {
    return this[P_SELLER_ACCOUNT];
  }
  /**
   * Gets the new public key of the bought account.
   *
   * @return {PublicKey}
   */


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

const BuyAccount = __webpack_require__(/*! ./Operation */ "./src/Operations/BuyAccount/Operation.js");
/**
 * The raw coder for a BuyAccount operation.
 */


class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('buy_op_raw');
    this.description('The coder for the raw representation of a BuyAccount operation');
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
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Buy Account Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * Decodes the encoded BuyAccount operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {BuyAccount}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new BuyAccount(decoded.sender, decoded.target, decoded.amount, decoded.price, decoded.seller, decoded.newPublicKey);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);
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
 * The digest encoder of a ChangeAccountInfo Operation.
 */

class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('change_info_op_digest');
    this.description('Digest encoder for a ChangeAccountInfo operation.'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The signer of the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The target account to change info of.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation value of the signer.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee paid for the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('v2_public_key').description('Empty pubkey (6 zero bytes) - previously active in <= v2.').withFixedValue(PublicKey.empty()));
    this.addSubType(new Coding.Core.Int8('changeType').description('The change type.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('newPublicKey').description('The new public key of the account.'));
    this.addSubType(new Coding.Pascal.AccountName('newName').description('The new name of the account.'));
    this.addSubType(new Coding.Core.Int16('newType').description('The new type of the account.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(8).description('The change account info optype as 8 bit int8'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Change Account Info Operation (DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * @inheritDoc AbstractType#canDecode
   */


  get canDecode() {
    return false;
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
 * Representation of a signable ChangeAccountInfo operation.
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
  /**
   * Gets the signer account of the operation.
   *
   * @return {AccountNumber}
   */


  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }
  /**
   * Gets the target account to change.
   *
   * @return {AccountNumber}
   */


  get target() {
    return this[P_ACCOUNT_TARGET];
  }
  /**
   * Gets the new public key of the target.
   *
   * @return {PublicKey}
   */


  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }
  /**
   * Gets the new name of the target.
   *
   * @return {AccountName}
   */


  get newName() {
    return this[P_NEW_NAME];
  }
  /**
   * Gets the new type of the target account.
   *
   * @return {Number}
   */


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

const ChangeAccountInfo = __webpack_require__(/*! ./Operation */ "./src/Operations/ChangeAccountInfo/Operation.js");
/**
 * The raw coder for a ChangeAccountInfo operation.
 */


class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('change_account_info_op_raw');
    this.description('The coder for the raw representation of a ChangeAccountInfo operation');
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
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Change Account Info Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * Decodes the encoded ChangeAccountInfo operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ChangeAccountInfo}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new ChangeAccountInfo(decoded.signer, decoded.target);
    op.withNewType(decoded.type);
    op.withNewName(decoded.name);
    op.withNewPublicKey(decoded.newPublicKey);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawCoder;

/***/ }),

/***/ "./src/Operations/ChangeKey/DigestCoder.js":
/*!*************************************************!*\
  !*** ./src/Operations/ChangeKey/DigestCoder.js ***!
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
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const CompositeType = Coding.CompositeType;
/**
 * The digest encoder of a ChangeKey Operation.
 */

class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('data_op_digest');
    this.description('Digest encoder for a ChangeKey operation.'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation of the signer.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee associated with the operation'));
    this.addSubType(new Coding.Core.BytesWithoutLength('payload').description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.Curve('v2_pubkey_curve').description('Curve ID 0 - previously active in <= v2.').withFixedValue(PublicKey.empty().curve));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('newPublicKey').description('The new public key of the account.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(2).description('The optype as 8bit int.'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Change Key Operation (DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * @inheritDoc AbstractType#canDecode
   */


  get canDecode() {
    return false;
  }

}

module.exports = DigestCoder;

/***/ }),

/***/ "./src/Operations/ChangeKey/Operation.js":
/*!***********************************************!*\
  !*** ./src/Operations/ChangeKey/Operation.js ***!
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
const Abstract = __webpack_require__(/*! ./../../Abstract */ "./src/Abstract.js");

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const P_SIGNER = Symbol('signer');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
/**
 * Representation of a signable ChangeKey operation.
 */

class ChangeKey extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
    return 2;
  }
  /**
   * Constructor.
   * @param {Account|AccountNumber|Number|String} accountSigner
   * @param {PublicKey} newPublicKey
   */


  constructor(accountSigner, newPublicKey) {
    super();
    this[P_SIGNER] = new AccountNumber(accountSigner);
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
  }
  /**
   * Gets the account number of the signer and the account to be changed.
   *
   * @return {AccountNumber}
   */


  get signer() {
    return this[P_SIGNER];
  }
  /**
   * Gets the new public key of the account.
   * @return {PublicKey}
   */


  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

}

module.exports = ChangeKey;

/***/ }),

/***/ "./src/Operations/ChangeKey/RawCoder.js":
/*!**********************************************!*\
  !*** ./src/Operations/ChangeKey/RawCoder.js ***!
  \**********************************************/
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

const ChangeKey = __webpack_require__(/*! ./Operation */ "./src/Operations/ChangeKey/Operation.js");

const PublicKeyWithLength = __webpack_require__(/*! ./../../Coding/PublicKeyWithLength */ "./src/Coding/PublicKeyWithLength.js");
/**
 * The raw coder for a ChangeKey operation.
 */


class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('change_key_op_raw');
    this.description('The coder for the raw representation of a ChangeKey operation');
    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The signer of the operation.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation value of the buyer.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee paid for the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('v2_public_key').description('Empty pubkey (6 zero bytes) - previously active in <= v2.').withFixedValue(PublicKey.empty()));
    this.addSubType(new PublicKeyWithLength('newPublicKey').description('The new public key of the account.'));
    this.addSubType(new Coding.Core.BytesWithLength('r', 2).description('R value of the sign operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('s', 2).description('S value of the sign operation.'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Change Key Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * Decodes the encoded ChangeKey operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ChangeKey}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new ChangeKey(decoded.signer, decoded.newPublicKey);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawCoder;

/***/ }),

/***/ "./src/Operations/ChangeKeySigned/DigestCoder.js":
/*!*******************************************************!*\
  !*** ./src/Operations/ChangeKeySigned/DigestCoder.js ***!
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
const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const CompositeType = Coding.CompositeType;
/**
 * The digest encoder of a ChangeKey Operation.
 */

class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('change_key_signed_op_digest');
    this.description('Digest encoder for a ChangeKeySigned operation.'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account that should be changed.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation of the signer.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee associated with the operation'));
    this.addSubType(new Coding.Core.BytesWithoutLength('payload').description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.Curve('v2_pubkey_curve').description('Curve ID 0 - previously active in <= v2.').withFixedValue(PublicKey.empty().curve));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('newPublicKey').description('The new public key of the account.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(7).description('The optype as 8bit int.'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Change Key Signed Operation (DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * @inheritDoc AbstractType#canDecode
   */


  get canDecode() {
    return false;
  }

}

module.exports = DigestCoder;

/***/ }),

/***/ "./src/Operations/ChangeKeySigned/Operation.js":
/*!*****************************************************!*\
  !*** ./src/Operations/ChangeKeySigned/Operation.js ***!
  \*****************************************************/
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

const P_SIGNER = Symbol('signer');
const P_TARGET = Symbol('target');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
/**
 * Representation of a signable ChangeKeySigned operation.
 */

class ChangeKeySigned extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
    return 7;
  }
  /**
   * Constructor.
   *
   * @param {Account|AccountNumber|Number|String} accountSigner
   * @param {Account|AccountNumber|Number|String} accountTarget
   * @param {PublicKey} newPublicKey
   */


  constructor(accountSigner, accountTarget, newPublicKey) {
    super();
    this[P_SIGNER] = new AccountNumber(accountSigner);
    this[P_TARGET] = new AccountNumber(accountTarget);
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
  }
  /**
   * Gets the account number of the signer.
   *
   * @return {AccountNumber}
   */


  get signer() {
    return this[P_SIGNER];
  }
  /**
   * Gets the account number of the account to be changed.
   *
   * @return {AccountNumber}
   */


  get target() {
    return this[P_TARGET];
  }
  /**
   * Gets the new public key of the target account.
   *
   * @return {PublicKey}
   */


  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

}

module.exports = ChangeKeySigned;

/***/ }),

/***/ "./src/Operations/ChangeKeySigned/RawCoder.js":
/*!****************************************************!*\
  !*** ./src/Operations/ChangeKeySigned/RawCoder.js ***!
  \****************************************************/
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

const ChangeKeySigned = __webpack_require__(/*! ./Operation */ "./src/Operations/ChangeKeySigned/Operation.js");

const PublicKeyWithLength = __webpack_require__(/*! ./../../Coding/PublicKeyWithLength */ "./src/Coding/PublicKeyWithLength.js");
/**
 * The raw coder for a ChangeKey operation.
 */


class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('change_key_signed_op_raw');
    this.description('The coder for the raw representation of a ChangeKeySigned operation');
    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The signer of the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The target account to be changed.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation value of the buyer.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee paid for the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.PublicKey('v2_public_key').description('Empty pubkey (6 zero bytes) - previously active in <= v2.').withFixedValue(PublicKey.empty()));
    this.addSubType(new PublicKeyWithLength('newPublicKey').description('The new public key of the account.'));
    this.addSubType(new Coding.Core.BytesWithLength('r', 2).description('R value of the sign operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('s', 2).description('S value of the sign operation.'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Change Key Signed Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * Decodes the encoded ChangeKeySigned operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ChangeKey}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new ChangeKeySigned(decoded.signer, decoded.target, decoded.newPublicKey);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawCoder;

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
 * The digest encoder of a DATA Operation.
 */

class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('data_op_digest');
    this.description('Digest encoder for a DATA operation.'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('sender').description('The account that sends the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account that will receive the operation.'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation of the signer.'));
    this.addSubType(new Coding.Core.Int16('dataType', true, Endian.LITTLE_ENDIAN).description('The data type of the operation.'));
    this.addSubType(new Coding.Core.Int16('dataSequence', true, Endian.LITTLE_ENDIAN).description('The data sequence of the operation.'));
    this.addSubType(new Coding.Pascal.Currency('amount').description('The amount associated with the operation.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee associated with the operation'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(10).description('The optype as 8bit int.'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Data Operation (DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * @inheritDoc AbstractType#canDecode
   */


  get canDecode() {
    return false;
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
 * Representation of a signable DATA operation.
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
  /**
   * Forces the signer to use the digest instead of the hash of the digest
   * to sign the operation.
   *
   * @return {boolean}
   */


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

const Data = __webpack_require__(/*! ./Operation */ "./src/Operations/Data/Operation.js");
/**
 * The raw coder for a DATA operation.
 */


class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('data_operation_raw');
    this.description('The coder for the raw representation of a Data operation');
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
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Data Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * Decodes the encoded Data operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {Data}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Data(decoded.signer, decoded.sender, decoded.target);
    op.withDataType(decoded.dataType);
    op.withDataSequence(decoded.dataSequence);
    op.withAmount(decoded.amount);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);
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
 * The digest encoder of a Delist Operation.
 */

class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('delist_op_digest');
    this.description('Digest encoder for a Delist operation.'); // config for digest creation

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
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(5).description('The optype as 8bit int.'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Delist Account Operation (DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * @inheritDoc AbstractType#canDecode
   */


  get canDecode() {
    return false;
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
 * Representation of a signable Delist operation.
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
   * Constructor.
   *
   * @param {Number|AccountNumber} accountSigner
   * @param {Number|AccountNumber} accountTarget
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
   * Gets the signer of the delist operation.
   *
   * @return {AccountNumber}
   */


  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }
  /**
   * Gets the account that should be delisted.
   *
   * @return {AccountNumber}
   */


  get target() {
    return this[P_ACCOUNT_TARGET];
  }
  /**
   * Gets the price of the account (defaulted to 0).
   *
   * @return {Currency}
   */


  get price() {
    return this[P_PRICE];
  }
  /**
   * Gets the account that should have received the amount on sale (defaulted to 0)
   *
   * @return {Currency}
   */


  get accountToPay() {
    return this[P_ACCOUNT_TO_PAY];
  }
  /**
   * Gets the new public key in case of a private sale (defaulted to an empty pubkey).
   *
   * @return {PublicKey}
   */


  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }
  /**
   * Gets the value until when the account is locked (defaulted to 0).
   *
   * @return {Number}
   */


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

const DeList = __webpack_require__(/*! ./Operation */ "./src/Operations/DeListAccountForSale/Operation.js");
/**
 * The raw coder for a Delist operation.
 */


class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('delist_operation_raw');
    this.description('The coder for the raw representation of a Delist Account operation');
    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account that will be listed.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 2).withFixedValue(5).description('The optype of the operation (5)'));
    this.addSubType(new Coding.Pascal.NOperation().description('The next n_operation of the signer.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee associated with the operation'));
    this.addSubType(new Coding.Core.BytesWithLength('payload', 2).description('The payload of the operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('r', 2).description('R value of the signed operation.'));
    this.addSubType(new Coding.Core.BytesWithLength('s', 2).description('R value of the signed operation.'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Delist Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * Decodes the encoded Delist operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {Data}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new DeList(decoded.signer, decoded.target);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);
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
 * The digest encoder of a List Operation.
 */

class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('list_op_digest');
    this.description('Digest encoder for a List operation.'); // config for digest creation

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
    this.addSubType(new Coding.Pascal.OpType('optype', 1).withFixedValue(4).description('The optype as 8bit int.'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'List Account Operation (DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * @inheritDoc AbstractType#canDecode
   */


  get canDecode() {
    return false;
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
 * Representation of a signable List operation.
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
   * Constructor.
   *
   * @param {Number|AccountNumber} accountSigner
   * @param {Number|AccountNumber} accountTarget
   * @param {Currency} price
   * @param {Number|AccountNumber} accountToPay
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
   * Gets the signer of the list operation.
   *
   * @return {AccountNumber}
   */


  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }
  /**
   * Gets the account that should be listed.
   *
   * @return {AccountNumber}
   */


  get target() {
    return this[P_ACCOUNT_TARGET];
  }
  /**
   * Gets the price of the listed account (target)
   *
   * @return {Currency}
   */


  get price() {
    return this[P_PRICE];
  }
  /**
   * Gets the account where the money should be send to on sale.
   *
   * @return {AccountNumber}
   */


  get accountToPay() {
    return this[P_ACCOUNT_TO_PAY];
  }
  /**
   * Gets the new public key in case its a private sale.
   *
   * @return {PublicKey}
   */


  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }
  /**
   * Gets the block number until when the account is locked in case of a
   * private sale.
   *
   * @return {Number}
   */


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

const ListOperation = __webpack_require__(/*! ./Operation */ "./src/Operations/ListAccountForSale/Operation.js");
/**
 * The raw coder for a List operation.
 */


class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('list_operation_raw');
    this.description('The coder for the raw representation of a List Account operation');
    this.addSubType(new Coding.Pascal.AccountNumber('signer').description('The account that executes the operation.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The account that will be listed.'));
    this.addSubType(new Coding.Pascal.OpType('optype', 2).withFixedValue(4).description('The optype of the operation (4)'));
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
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'List Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * Decodes the encoded List operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ListOperation}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new ListOperation(decoded.signer, decoded.target, decoded.price, decoded.accountToPay);
    op.asPrivateSale(decoded.newPublicKey, decoded.lockedUntilBlock);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawCoder;

/***/ }),

/***/ "./src/Operations/MultiOperation/Operation.js":
/*!****************************************************!*\
  !*** ./src/Operations/MultiOperation/Operation.js ***!
  \****************************************************/
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

const Receiver = __webpack_require__(/*! ./Receiver/Receiver */ "./src/Operations/MultiOperation/Receiver/Receiver.js");

const Sender = __webpack_require__(/*! ./Sender/Sender */ "./src/Operations/MultiOperation/Sender/Sender.js");

const P_OPERATIONS = Symbol('operations');
const P_CHANGERS = Symbol('changers');
const P_SENDERS = Symbol('senders');
const P_RECEIVERS = Symbol('receivers');
const P_RECEIVERS_UQ = Symbol('receivers_uq');
const P_KEYPAIRS = Symbol('keypairs');
/**
 * Representation of a signable ChangeKey operation.
 */

class MultiOperation extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
    return 9;
  }
  /**
   * Constructor.
   */


  constructor() {
    super();
    this[P_OPERATIONS] = [];
    this[P_SENDERS] = {};
    this[P_RECEIVERS] = [];
    this[P_CHANGERS] = {};
    this[P_RECEIVERS_UQ] = {};
    this[P_KEYPAIRS] = {};
  }

  addTransaction(keyPair, operation, receiverPayload = null) {
    // transaction operation, first create a single sender
    if (this[P_SENDERS][operation.sender] === undefined) {
      let sender = new Sender(operation.sender, operation.amount);
      sender.withNOperation(operation.nOperation);
      sender.withPayload(operation.payload);
      this[P_SENDERS][operation.sender] = sender;
    } else {
      this[P_SENDERS][operation.sender].addAmount(operation.amount);
    }

    this[P_KEYPAIRS][operation.sender] = keyPair;
    let receiver = new Receiver(operation.target, operation.amount);
    receiver.withPayload(receiverPayload || operation.payload);
    const uq = receiver.payload.toHex() + receiver.amount.toStringOpt();

    if (this[P_RECEIVERS_UQ][uq] !== undefined) {
      throw new Error('Receivers must have unique amount and payload.');
    }

    this[P_RECEIVERS_UQ][uq] = uq;
    this[P_RECEIVERS].push(receiver);
  }

  get senders() {
    return Object.values(this[P_SENDERS]);
  }

  get sendersCount() {
    return this.senders.length;
  }

  get receivers() {
    return this[P_RECEIVERS];
  }

  get receiversCount() {
    return this[P_RECEIVERS].length;
  }

  get changers() {
    return Object.values(this[P_CHANGERS]);
  }

  get changersCount() {
    return this.changers.length;
  }

}

module.exports = MultiOperation;

/***/ }),

/***/ "./src/Operations/MultiOperation/RawAndDigestCoder.js":
/*!************************************************************!*\
  !*** ./src/Operations/MultiOperation/RawAndDigestCoder.js ***!
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
const Endian = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Endian;

const Coding = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding;

const CompositeType = Coding.CompositeType;

const ChangeKey = __webpack_require__(/*! ./Operation */ "./src/Operations/MultiOperation/Operation.js");
/**
 * The raw coder for a ChangeKey operation.
 */


class RawAndDigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('change_key_op_raw');
    this.description('The coder for the raw representation of a ChangeKey operation');
    this.addSubType(new Coding.Core.Int16('protocol').description('The protocol version (3).').withFixedValue(3));
    this.addSubType(new Coding.Core.Int16('sendersCount', true, Endian.LITTLE_ENDIAN).description('The number of senders'));
    this.addSubType(new Coding.Repeating('senders', new RawAndDigestCoder()).description('Senders of the multi-operation'));
    this.addSubType(new Coding.Core.Int16('receiversCount', true, Endian.LITTLE_ENDIAN).description('The number of receivers'));
    this.addSubType(new Coding.Repeating('receivers', new RawAndDigestCoder()).description('Receivers of the multi-operation'));
    this.addSubType(new Coding.Core.Int16('changersCount', true, Endian.LITTLE_ENDIAN).description('The number of changers'));
    this.addSubType(new Coding.Repeating('changers', new RawAndDigestCoder()).description('Changers of the multi-operation'));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Change Key Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * Decodes the encoded ChangeKey operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ChangeKey}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new ChangeKey(decoded.signer, decoded.newPublicKey);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);
    return op;
  }

}

module.exports = RawAndDigestCoder;

/***/ }),

/***/ "./src/Operations/MultiOperation/Receiver/Receiver.js":
/*!************************************************************!*\
  !*** ./src/Operations/MultiOperation/Receiver/Receiver.js ***!
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
const Abstract = __webpack_require__(/*! ./../../../Abstract */ "./src/Abstract.js");

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const P_ACCOUNT = Symbol('account');
const P_AMOUNT = Symbol('amount');
/**
 * Representation of a signable ChangeKey operation.
 */

class Receiver extends Abstract {
  /**
   * Constructor.
   */
  constructor(account, amount) {
    super();
    this[P_ACCOUNT] = new AccountNumber(account);
    this[P_AMOUNT] = new Currency(amount);
  }

  get account() {
    return this[P_ACCOUNT];
  }

  get amount() {
    return this[P_AMOUNT];
  }

}

module.exports = Receiver;

/***/ }),

/***/ "./src/Operations/MultiOperation/Sender/Sender.js":
/*!********************************************************!*\
  !*** ./src/Operations/MultiOperation/Sender/Sender.js ***!
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
const Abstract = __webpack_require__(/*! ./../../../Abstract */ "./src/Abstract.js");

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const P_ACCOUNT = Symbol('account');
const P_AMOUNT = Symbol('amount');
/**
 * Representation of a signable ChangeKey operation.
 */

class Sender extends Abstract {
  /**
   * Constructor.
   */
  constructor(account, amount) {
    super();
    this[P_ACCOUNT] = new AccountNumber(account);
    this[P_AMOUNT] = new Currency(amount);
  }

  get account() {
    return this[P_ACCOUNT];
  }

  addAmount(amount) {
    this[P_AMOUNT] = this[P_AMOUNT].add(new Currency(amount));
  }

  get amount() {
    return this[P_AMOUNT];
  }

}

module.exports = Sender;

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
 * The digest encoder of a Transaction Operation.
 */

class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('tx_op_digest');
    this.description('Digest encoder for a Transaction operation.'); // config for digest creation

    this.addSubType(new Coding.Pascal.AccountNumber('sender').description('The sender account.'));
    this.addSubType(new Coding.Pascal.NOperation('nOperation').description('The next n_operation value of the sender.'));
    this.addSubType(new Coding.Pascal.AccountNumber('target').description('The receiving account.'));
    this.addSubType(new Coding.Pascal.Currency('amount').description('The amount that is sent from sender to receiver.'));
    this.addSubType(new Coding.Pascal.Currency('fee').description('The fee included in the operation.'));
    this.addSubType(new Coding.Core.BytesWithoutLength('payload').description('The payload of the operation.'));
    this.addSubType(new Coding.Pascal.Keys.Curve('v2_pubkey_curve').description('Curve ID 0 - previously active in <= v2.').withFixedValue(PublicKey.empty().curve));
    this.addSubType(new Coding.Pascal.OpType('optype', 1).description('Operation type.').withFixedValue(1));
  }
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Transaction Operation (DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * @inheritDoc AbstractType#canDecode
   */


  get canDecode() {
    return false;
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
 * Representation of a signable Transaction operation.
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

const Transaction = __webpack_require__(/*! ./Operation */ "./src/Operations/Transaction/Operation.js");
/**
 * The raw coder for a Transaction operation.
 */


class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('data_operation_raw');
    this.description('The coder for the raw representation of a Transaction operation');
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
  /**
   * @inheritDoc AbstractType#typeInfo
   */

  /* istanbul ignore next */


  get typeInfo() {
    let info = super.typeInfo;
    info.name = 'Transaction Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }
  /**
   * Decodes the encoded Transaction operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ListOperation}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Transaction(decoded.sender, decoded.target, decoded.amount);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);
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

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
let Items = {
  ChangeKey: {
    Operation: __webpack_require__(/*! ./ChangeKey/Operation */ "./src/Operations/ChangeKey/Operation.js"),
    RawCoder: __webpack_require__(/*! ./ChangeKey/RawCoder */ "./src/Operations/ChangeKey/RawCoder.js"),
    DigestCoder: __webpack_require__(/*! ./ChangeKey/DigestCoder */ "./src/Operations/ChangeKey/DigestCoder.js")
  },
  ChangeKeySigned: {
    Operation: __webpack_require__(/*! ./ChangeKeySigned/Operation */ "./src/Operations/ChangeKeySigned/Operation.js"),
    RawCoder: __webpack_require__(/*! ./ChangeKeySigned/RawCoder */ "./src/Operations/ChangeKeySigned/RawCoder.js"),
    DigestCoder: __webpack_require__(/*! ./ChangeKeySigned/DigestCoder */ "./src/Operations/ChangeKeySigned/DigestCoder.js")
  },
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
  },
  MultiOperation: {
    Operation: __webpack_require__(/*! ./MultiOperation/Operation */ "./src/Operations/MultiOperation/Operation.js"),
    RawCoder: __webpack_require__(/*! ./MultiOperation/RawAndDigestCoder */ "./src/Operations/MultiOperation/RawAndDigestCoder.js"),
    DigestCoder: __webpack_require__(/*! ./MultiOperation/RawAndDigestCoder */ "./src/Operations/MultiOperation/RawAndDigestCoder.js")
  }
};

Items.digestCoderFor = operation => {
  return Items[operation.constructor.name].DigestCoder;
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

const BuyRawCoder = __webpack_require__(/*! ./Operations/BuyAccount/RawCoder */ "./src/Operations/BuyAccount/RawCoder.js");

const ChangeKeyRawCoder = __webpack_require__(/*! ./Operations/ChangeKey/RawCoder */ "./src/Operations/ChangeKey/RawCoder.js");

const ChangeKeySignedRawCoder = __webpack_require__(/*! ./Operations/ChangeKeySigned/RawCoder */ "./src/Operations/ChangeKeySigned/RawCoder.js");

const ChangeAccountInfoRawCoder = __webpack_require__(/*! ./Operations/ChangeAccountInfo/RawCoder */ "./src/Operations/ChangeAccountInfo/RawCoder.js");

const MultiOperationRawCoder = __webpack_require__(/*! ./Operations/MultiOperation/RawAndDigestCoder */ "./src/Operations/MultiOperation/RawAndDigestCoder.js");

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
          return new TransactionRawCoder();

        case 2:
          return new ChangeKeyRawCoder();

        case 4:
          return new ListRawCoder();

        case 5:
          return new DeListRawCoder();

        case 6:
          return new BuyRawCoder();

        case 7:
          return new ChangeKeySignedRawCoder();

        case 8:
          return new ChangeAccountInfoRawCoder();

        case 9:
          return new MultiOperationRawCoder();

        case 10:
          return new DataRawCoder();

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

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
/**
 * Signs the digest.
 *
 * @param {KeyPair} keyPair
 * @param {BC} digest
 * @return {{r: BC, s: BC}}
 */


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
    let signResult;

    if (operation.usesDigestToSign() === true) {
      signResult = signWithDigest(keyPair, digest);
    } else {
      signResult = signWithHash(keyPair, digest);
    } // save results


    return signResult;
  }
  /**
   * TODO
   * @param operation
   */


  signMultiOperation(operation) {// const DigestCoder = Operations.digestCoderFor(operation);
    // const digest = new DigestCoder(operation.opType).encodeToBytes(operation);
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