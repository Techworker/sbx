(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@sbx/common"));
	else if(typeof define === 'function' && define.amd)
		define("@sbx/json-rpc", ["@sbx/common"], factory);
	else if(typeof exports === 'object')
		exports["@sbx/json-rpc"] = factory(require("@sbx/common"));
	else
		root["@sbx/json-rpc"] = factory(root["@sbx/common"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__sbx_common__) {
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

/***/ "../../node_modules/bignumber.js/bignumber.js":
/*!****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/bignumber.js/bignumber.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function (globalObject) {
  'use strict';

/*
 *      bignumber.js v8.1.1
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2019 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


  var BigNumber,
    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
    hasSymbol = typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol',

    mathceil = Math.ceil,
    mathfloor = Math.floor,

    bignumberError = '[BigNumber Error] ',
    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

    BASE = 1e14,
    LOG_BASE = 14,
    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
    SQRT_BASE = 1e7,

    // EDITABLE
    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
    MAX = 1E9;                                   // 0 to MAX_INT32


  /*
   * Create and return a BigNumber constructor.
   */
  function clone(configObject) {
    var div, convertBase, parseNumeric,
      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
      ONE = new BigNumber(1),


      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


      // The default values below must be integers within the inclusive ranges stated.
      // The values can also be changed at run-time using BigNumber.set.

      // The maximum number of decimal places for operations involving division.
      DECIMAL_PLACES = 20,                     // 0 to MAX

      // The rounding mode used when rounding to the above decimal places, and when using
      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
      // UP         0 Away from zero.
      // DOWN       1 Towards zero.
      // CEIL       2 Towards +Infinity.
      // FLOOR      3 Towards -Infinity.
      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      ROUNDING_MODE = 4,                       // 0 to 8

      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

      // The exponent value at and beneath which toString returns exponential notation.
      // Number type: -7
      TO_EXP_NEG = -7,                         // 0 to -MAX

      // The exponent value at and above which toString returns exponential notation.
      // Number type: 21
      TO_EXP_POS = 21,                         // 0 to MAX

      // RANGE : [MIN_EXP, MAX_EXP]

      // The minimum exponent value, beneath which underflow to zero occurs.
      // Number type: -324  (5e-324)
      MIN_EXP = -1e7,                          // -1 to -MAX

      // The maximum exponent value, above which overflow to Infinity occurs.
      // Number type:  308  (1.7976931348623157e+308)
      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
      MAX_EXP = 1e7,                           // 1 to MAX

      // Whether to use cryptographically-secure random number generation, if available.
      CRYPTO = false,                          // true or false

      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP        0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN      1 The remainder has the same sign as the dividend.
      //             This modulo mode is commonly known as 'truncated division' and is
      //             equivalent to (a % n) in JavaScript.
      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
      //             The remainder is always positive.
      //
      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
      // modes are commonly used for the modulus operation.
      // Although the other rounding modes can also be used, they may not give useful results.
      MODULO_MODE = 1,                         // 0 to 9

      // The maximum number of significant digits of the result of the exponentiatedBy operation.
      // If POW_PRECISION is 0, there will be unlimited significant digits.
      POW_PRECISION = 0,                    // 0 to MAX

      // The format specification used by the BigNumber.prototype.toFormat method.
      FORMAT = {
        prefix: '',
        groupSize: 3,
        secondaryGroupSize: 0,
        groupSeparator: ',',
        decimalSeparator: '.',
        fractionGroupSize: 0,
        fractionGroupSeparator: '\xA0',      // non-breaking space
        suffix: ''
      },

      // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
      // '-', '.', whitespace, or repeated character.
      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';


    //------------------------------------------------------------------------------------------


    // CONSTRUCTOR


    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * v {number|string|BigNumber} A numeric value.
     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
     */
    function BigNumber(v, b) {
      var alphabet, c, caseChanged, e, i, isNum, len, str,
        x = this;

      // Enable constructor call without `new`.
      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

      if (b == null) {

        if (v && v._isBigNumber === true) {
          x.s = v.s;

          if (!v.c || v.e > MAX_EXP) {
            x.c = x.e = null;
          } else if (v.e < MIN_EXP) {
            x.c = [x.e = 0];
          } else {
            x.e = v.e;
            x.c = v.c.slice();
          }

          return;
        }

        if ((isNum = typeof v == 'number') && v * 0 == 0) {

          // Use `1 / n` to handle minus zero also.
          x.s = 1 / v < 0 ? (v = -v, -1) : 1;

          // Fast path for integers, where n < 2147483648 (2**31).
          if (v === ~~v) {
            for (e = 0, i = v; i >= 10; i /= 10, e++);

            if (e > MAX_EXP) {
              x.c = x.e = null;
            } else {
              x.e = e;
              x.c = [v];
            }

            return;
          }

          str = String(v);
        } else {

          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        }

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

        // Exponential form?
        if ((i = str.search(/e/i)) > 0) {

          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {

          // Integer.
          e = str.length;
        }

      } else {

        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base');

        // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.
        if (b == 10) {
          x = new BigNumber(v);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        str = String(v);

        if (isNum = typeof v == 'number') {

          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error
             (tooManyDigits + v);
          }
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0;

        // Check that str is a valid base b number.
        // Don't use RegExp, so alphabet can contain special characters.
        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {

              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {

              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                  str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, String(v), isNum, b);
          }
        }

        // Prevent later check for length on converted number.
        isNum = false;
        str = convertBase(str, b, 10, x.s);

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
        else e = str.length;
      }

      // Determine leading zeros.
      for (i = 0; str.charCodeAt(i) === 48; i++);

      // Determine trailing zeros.
      for (len = str.length; str.charCodeAt(--len) === 48;);

      if (str = str.slice(i, ++len)) {
        len -= i;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (isNum && BigNumber.DEBUG &&
          len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
            throw Error
             (tooManyDigits + (x.s * v));
        }

         // Overflow?
        if ((e = e - i - 1) > MAX_EXP) {

          // Infinity.
          x.c = x.e = null;

        // Underflow?
        } else if (e < MIN_EXP) {

          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = [];

          // Transform base

          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.
          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE;  // i < 1

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            i = LOG_BASE - (str = str.slice(i)).length;
          } else {
            i -= len;
          }

          for (; i--; str += '0');
          x.c.push(+str);
        }
      } else {

        // Zero.
        x.c = [x.e = 0];
      }
    }


    // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;

    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;


    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *     prefix                 {string}
     *     groupSize              {number}
     *     secondaryGroupSize     {number}
     *     groupSeparator         {string}
     *     decimalSeparator       {string}
     *     fractionGroupSize      {number}
     *     fractionGroupSeparator {string}
     *     suffix                 {string}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */
    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {

        if (typeof obj == 'object') {

          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          }

          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          }

          // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          }

          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error
                 (bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          }

          // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'
          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];
            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto &&
                 (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error
                   (bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error
               (bignumberError + p + ' not true or false: ' + v);
            }
          }

          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          }

          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          }

          // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'
          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;
            else throw Error
             (bignumberError + p + ' not an object: ' + v);
          }

          // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'
          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p];

            // Disallow if only one character,
            // or if it contains '+', '-', '.', whitespace, or a repeated character.
            if (typeof v == 'string' && !/^.$|[+-.\s]|(.).*\1/.test(v)) {
              ALPHABET = v;
            } else {
              throw Error
               (bignumberError + p + ' invalid: ' + v);
            }
          }

        } else {

          // '[BigNumber Error] Object expected: {v}'
          throw Error
           (bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };


    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
     *
     * v {any}
     *
     * '[BigNumber Error] Invalid BigNumber: {v}'
     */
    BigNumber.isBigNumber = function (v) {
      if (!v || v._isBigNumber !== true) return false;
      if (!BigNumber.DEBUG) return true;

      var i, n,
        c = v.c,
        e = v.e,
        s = v.s;

      out: if ({}.toString.call(c) == '[object Array]') {

        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

          // If the first element is zero, the BigNumber value must be zero.
          if (c[0] === 0) {
            if (e === 0 && c.length === 1) return true;
            break out;
          }

          // Calculate number of digits that c[0] should have, based on the exponent.
          i = (e + 1) % LOG_BASE;
          if (i < 1) i += LOG_BASE;

          // Calculate number of digits of c[0].
          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
          if (String(c[0]).length == i) {

            for (i = 0; i < c.length; i++) {
              n = c[i];
              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
            }

            // Last element cannot be zero, unless it is the only element.
            if (n !== 0) return true;
          }
        }

      // Infinity/NaN
      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
        return true;
      }

      throw Error
        (bignumberError + 'Invalid BigNumber: ' + v);
    };


    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, P.lt);
    };


    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, P.gt);
    };


    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */
    BigNumber.random = (function () {
      var pow2_53 = 0x20000000000000;

      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
       ? function () { return mathfloor(Math.random() * pow2_53); }
       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
         (Math.random() * 0x800000 | 0); };

      return function (dp) {
        var a, b, e, k, v,
          i = 0,
          c = [],
          rand = new BigNumber(ONE);

        if (dp == null) dp = DECIMAL_PLACES;
        else intCheck(dp, 0, MAX);

        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {

          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {

            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {

              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

              // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {

                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }
            i = k / 2;

          // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {

            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {

              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {

                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }
            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error
             (bignumberError + 'crypto unavailable');
          }
        }

        // Use Math.random.
        if (!CRYPTO) {

          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE;

        // Convert trailing digits to zeros according to dp.
        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        }

        // Remove trailing elements which are zero.
        for (; c[i] === 0; c.pop(), i--);

        // Zero?
        if (i < 0) {
          c = [e = 0];
        } else {

          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

          // Count the digits of the first element of c to determine leading zeros, and...
          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

          // adjust the exponent accordingly.
          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    })();


    /*
     * Return a BigNumber whose value is the sum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.sum = function () {
      var i = 1,
        args = arguments,
        sum = new BigNumber(args[0]);
      for (; i < args.length;) sum = sum.plus(args[i++]);
      return sum;
    };


    // PRIVATE FUNCTIONS


    // Called by BigNumber and BigNumber.prototype.toString.
    convertBase = (function () {
      var decimal = '0123456789';

      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */
      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
          arr = [0],
          arrL,
          i = 0,
          len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {

            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      }

      // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.
      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet, d, e, k, r, x, xc, y,
          i = str.indexOf('.'),
          dp = DECIMAL_PLACES,
          rm = ROUNDING_MODE;

        // Non-integer.
        if (i >= 0) {
          k = POW_PRECISION;

          // Unlimited precision.
          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k;

          // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
           10, baseOut, decimal);
          y.e = y.c.length;
        }

        // Convert the number as integer.

        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
         ? (alphabet = ALPHABET, decimal)
         : (alphabet = decimal, ALPHABET));

        // xc now represents str as an integer and converted to baseOut. e is the exponent.
        e = k = xc.length;

        // Remove trailing zeros.
        for (; xc[--k] == 0; xc.pop());

        // Zero?
        if (!xc[0]) return alphabet.charAt(0);

        // Does str represent an integer? If so, no need for the division.
        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e;

          // The sign is needed for correct rounding.
          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        }

        // xc now represents str converted to baseOut.

        // THe index of the rounding digit.
        d = e + dp + 1;

        // The rounding digit: the digit to the right of the digit that may be rounded up.
        i = xc[d];

        // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;

        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
               rm == (x.s < 0 ? 8 : 7));

        // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.
        if (d < 1 || !xc[0]) {

          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
        } else {

          // Truncate xc to the required number of decimal places.
          xc.length = d;

          // Round up?
          if (r) {

            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          }

          // Determine trailing zeros.
          for (k = xc.length; !xc[--k];);

          // E.g. [4, 11, 15] becomes 4bf.
          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

          // Add leading zeros, decimal point and trailing zeros as required.
          str = toFixedPoint(str, e, alphabet.charAt(0));
        }

        // The caller will add the sign.
        return str;
      };
    })();


    // Perform division in the specified base. Called by div and convertBase.
    div = (function () {

      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m, temp, xlo, xhi,
          carry = 0,
          i = x.length,
          klo = k % SQRT_BASE,
          khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);

        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {

          for (i = cmp = 0; i < aL; i++) {

            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0;

        // Subtract b from a.
        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        }

        // Remove leading zeros.
        for (; !a[0] && a.length > 1; a.splice(0, 1));
      }

      // x: dividend, y: divisor.
      return function (x, y, dp, rm, base) {
        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
          yL, yz,
          s = x.s == y.s ? 1 : -1,
          xc = x.c,
          yc = y.c;

        // Either NaN, Infinity or 0?
        if (!xc || !xc[0] || !yc || !yc[0]) {

          return new BigNumber(

           // Return NaN if either NaN, or both Infinity or 0.
           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
         );
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        }

        // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
        for (i = 0; yc[i] == (xc[i] || 0); i++);

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2;

          // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1));

          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length;

          // Add zeros to make remainder as long as divisor.
          for (; remL < yL; rem[remL++] = 0);
          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++;
          // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0;

            // Compare divisor and remainder.
            cmp = compare(yc, rem, yL, remL);

            // If divisor < remainder.
            if (cmp < 0) {

              // Calculate trial digit, n.

              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

              // n is how many times the divisor goes into the current remainder.
              n = mathfloor(rem0 / yc0);

              //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {

                // n may be > base only when base is 3.
                if (n >= base) n = base - 1;

                // product = divisor * trial digit.
                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length;

                // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.
                while (compare(prod, rem, prodL, remL) == 1) {
                  n--;

                  // Subtract divisor from product.
                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {

                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {

                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                }

                // product = divisor
                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod);

              // Subtract product from remainder.
              subtract(rem, prod, remL, base);
              remL = rem.length;

               // If product was < remainder.
              if (cmp == -1) {

                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++;

                  // Subtract divisor from remainder.
                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0

            // Add the next digit, n, to the result array.
            qc[i++] = n;

            // Update the remainder.
            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null;

          // Leading zero?
          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {

          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

        // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    })();


    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */
    function format(n, i, rm, id) {
      var c0, e, ne, len, str;

      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      if (!n.c) return n.toString();

      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
         ? toExponential(str, ne)
         : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm);

        // n.e may have changed if the value was rounded up.
        e = n.e;

        str = coeffToString(n.c);
        len = str.length;

        // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.

        // Exponential notation.
        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

          // Append zeros?
          for (; len < i; str += '0', len++);
          str = toExponential(str, e);

        // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0');

          // Append zeros?
          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0');
          } else {
            i += e - len;
            if (i > 0) {
              if (e + 1 == len) str += '.';
              for (; i--; str += '0');
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    }


    // Handle BigNumber.max and BigNumber.min.
    function maxOrMin(args, method) {
      var n,
        i = 1,
        m = new BigNumber(args[0]);

      for (; i < args.length; i++) {
        n = new BigNumber(args[i]);

        // If any number is NaN, return NaN.
        if (!n.s) {
          m = n;
          break;
        } else if (method.call(m, n)) {
          m = n;
        }
      }

      return m;
    }


    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */
    function normalise(n, c, e) {
      var i = 1,
        j = c.length;

       // Remove trailing zeros.
      for (; !c[--j]; c.pop());

      // Calculate the base 10 exponent. First get the number of digits of c[0].
      for (j = c[0]; j >= 10; j /= 10, i++);

      // Overflow?
      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

        // Infinity.
        n.c = n.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    }


    // Handle values that fail the validity test in BigNumber.
    parseNumeric = (function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
        dotAfter = /^([^.]+)\.$/,
        dotBefore = /^\.([^.]+)$/,
        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

      return function (x, str, isNum, b) {
        var base,
          s = isNum ? str : str.replace(whitespaceOrPlus, '');

        // No exception on ±Infinity or NaN.
        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
        } else {
          if (!isNum) {

            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b;

              // E.g. '1.' to '1', '.1' to '0.1'
              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          }

          // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'
          if (BigNumber.DEBUG) {
            throw Error
              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          }

          // NaN
          x.s = null;
        }

        x.c = x.e = null;
      }
    })();


    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */
    function round(x, sd, rm, r) {
      var d, i, j, k, n, ni, rd,
        xc = x.c,
        pows10 = POWS_TEN;

      // if x is not Infinity or NaN...
      if (xc) {

        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {

          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
          i = sd - d;

          // If the rounding digit is in the first element of xc...
          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0];

            // Get the rounding digit at index j of n.
            rd = n / pows10[d - j - 1] % 10 | 0;
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {

              if (r) {

                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0));
                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni];

              // Get the number of digits of n.
              for (d = 1; k >= 10; k /= 10, d++);

              // Get the index of rd within n.
              i %= LOG_BASE;

              // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.
              j = i - LOG_BASE + d;

              // Get the rounding digit at index j of n.
              rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
            }
          }

          r = r || sd < 0 ||

          // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

          r = rm < 4
           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

            // Check whether the digit to the left of the rounding digit is odd.
            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
             rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {

              // Convert sd to decimal places.
              sd -= x.e + 1;

              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {

              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          }

          // Remove excess digits.
          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i];

            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.
            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          }

          // Round up?
          if (r) {

            for (; ;) {

              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {

                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
                j = xc[0] += k;
                for (k = 1; j >= 10; j /= 10, k++);

                // if i != k the length has increased.
                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          }

          // Remove trailing zeros.
          for (i = xc.length; xc[--i] === 0; xc.pop());
        }

        // Overflow? Infinity.
        if (x.e > MAX_EXP) {
          x.c = x.e = null;

        // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    }


    function valueOf(n) {
      var str,
        e = n.e;

      if (e === null) return n.toString();

      str = coeffToString(n.c);

      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
        ? toExponential(str, e)
        : toFixedPoint(str, e, '0');

      return n.s < 0 ? '-' + str : str;
    }


    // PROTOTYPE/INSTANCE METHODS


    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */
    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };


    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */
    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };


    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.decimalPlaces = P.dp = function (dp, rm) {
      var c, n, v,
        x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

      // Subtract the number of trailing zeros of the last number.
      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
      if (n < 0) n = 0;

      return n;
    };


    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };


    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */
    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };


    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */
    P.exponentiatedBy = P.pow = function (n, m) {
      var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
        x = this;

      n = new BigNumber(n);

      // Allow NaN and ±Infinity, but not other non-integers.
      if (n.c && !n.isInteger()) {
        throw Error
          (bignumberError + 'Exponent not an integer: ' + valueOf(n));
      }

      if (m != null) m = new BigNumber(m);

      // Exponent of MAX_SAFE_INTEGER is 15.
      nIsBig = n.e > 14;

      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to ±Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {

        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

        if (isModExp) x = x.mod(m);

      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
        // [1, 240000000]
        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
        // [80000000000000]  [99999750000000]
        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0;

        // If x >= 1, k = ±Infinity.
        if (x.e > -1) k = 1 / k;

        // If n is negative return ±0, else return ±Infinity.
        return new BigNumber(nIsNeg ? 1 / k : k);

      } else if (POW_PRECISION) {

        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        if (nIsNeg) n.s = 1;
        nIsOdd = isOdd(n);
      } else {
        i = Math.abs(+valueOf(n));
        nIsOdd = i % 2;
      }

      y = new BigNumber(ONE);

      // Performs 54 loop iterations for n of 9007199254740991.
      for (; ;) {

        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (i) {
          i = mathfloor(i / 2);
          if (i === 0) break;
          nIsOdd = i % 2;
        } else {
          n = n.times(half);
          round(n, n.e + 1, 1);

          if (n.e > 14) {
            nIsOdd = isOdd(n);
          } else {
            i = +valueOf(n);
            if (i === 0) break;
            nIsOdd = i % 2;
          }
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);

      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */
    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };


    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };


    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */
    P.isFinite = function () {
      return !!this.c;
    };


    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };


    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

    };


    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */
    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };


    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };


    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };


    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */
    P.isNaN = function () {
      return !this.s;
    };


    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */
    P.isNegative = function () {
      return this.s < 0;
    };


    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */
    P.isPositive = function () {
      return this.s > 0;
    };


    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */
    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };


    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */
    P.minus = function (y, b) {
      var i, j, t, xLTy,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

        // Either zero?
        if (!xc[0] || !yc[0]) {

          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
           ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Determine which is the bigger number.
      if (a = xe - ye) {

        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse();

        // Prepend zeros to equalise exponents.
        for (b = a; b--; t.push(0));
        t.reverse();
      } else {

        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {

          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      }

      // x < y? Point xc to the array of the bigger number.
      if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

      b = (j = yc.length) - (i = xc.length);

      // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
      if (b > 0) for (; b--; xc[i++] = 0);
      b = BASE - 1;

      // Subtract yc from xc.
      for (; j > a;) {

        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b);
          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      }

      // Remove leading zeros and adjust exponent accordingly.
      for (; xc[0] == 0; xc.splice(0, 1), --ye);

      // Zero?
      if (!xc[0]) {

        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      }

      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.
      return normalise(y, xc, ye);
    };


    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */
    P.modulo = P.mod = function (y, b) {
      var q, s,
        x = this;

      y = new BigNumber(y, b);

      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN);

      // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {

        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y));

      // To match JavaScript %, ensure sign of zero is sign of dividend.
      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

      return y;
    };


    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */
    P.multipliedBy = P.times = function (y, b) {
      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
        base, sqrtBase,
        x = this,
        xc = x.c,
        yc = (y = new BigNumber(y, b)).c;

      // Either NaN, ±Infinity or ±0?
      if (!xc || !yc || !xc[0] || !yc[0]) {

        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s;

          // Return ±Infinity if either is ±Infinity.
          if (!xc || !yc) {
            y.c = y.e = null;

          // Return ±0 if either is ±0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length;

      // Ensure xc points to longer array and xcL to its length.
      if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

      // Initialise the result array with zeros.
      for (i = xcL + ycL, zc = []; i--; zc.push(0));

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */
    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };


    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */
    P.plus = function (y, b) {
      var t,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
       if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Return ±Infinity if either ±Infinity.
        if (!xc || !yc) return new BigNumber(a / 0);

        // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();
        for (; a--; t.push(0));
        t.reverse();
      }

      a = xc.length;
      b = yc.length;

      // Point xc to the longer array, and b to the shorter length.
      if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      }

      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible
      return normalise(y, xc, ye);
    };


    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.precision = P.sd = function (sd, rm) {
      var c, n, v,
        x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {

        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--);

        // Add the number of digits of the first element.
        for (v = c[0]; v >= 10; v /= 10, n++);
      }

      if (sd && x.e + 1 > n) n = x.e + 1;

      return n;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */
    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };


    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.squareRoot = P.sqrt = function () {
      var m, n, r, rep, t,
        x = this,
        c = x.c,
        s = x.s,
        e = x.e,
        dp = DECIMAL_PLACES + 4,
        half = new BigNumber('0.5');

      // Negative/NaN/Infinity/zero?
      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      }

      // Initial estimate.
      s = Math.sqrt(+valueOf(x));

      // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(+n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '1e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      }

      // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.
      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0;

        // Newton-Raphson iteration.
        for (; ;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1);

            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.
            if (n == '9999' || !rep && n == '4999') {

              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {

              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };


    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }
      return format(this, dp, rm, 1);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }
      return format(this, dp, rm);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the format or FORMAT object (see BigNumber.set).
     *
     * The formatting object may contain some or all of the properties shown below.
     *
     * FORMAT = {
     *   prefix: '',
     *   groupSize: 3,
     *   secondaryGroupSize: 0,
     *   groupSeparator: ',',
     *   decimalSeparator: '.',
     *   fractionGroupSize: 0,
     *   fractionGroupSeparator: '\xA0',      // non-breaking space
     *   suffix: ''
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     * [format] {object} Formatting options. See FORMAT pbject above.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     * '[BigNumber Error] Argument not an object: {format}'
     */
    P.toFormat = function (dp, rm, format) {
      var str,
        x = this;

      if (format == null) {
        if (dp != null && rm && typeof rm == 'object') {
          format = rm;
          rm = null;
        } else if (dp && typeof dp == 'object') {
          format = dp;
          dp = rm = null;
        } else {
          format = FORMAT;
        }
      } else if (typeof format != 'object') {
        throw Error
          (bignumberError + 'Argument not an object: ' + format);
      }

      str = x.toFixed(dp, rm);

      if (x.c) {
        var i,
          arr = str.split('.'),
          g1 = +format.groupSize,
          g2 = +format.secondaryGroupSize,
          groupSeparator = format.groupSeparator || '',
          intPart = arr[0],
          fractionPart = arr[1],
          isNeg = x.s < 0,
          intDigits = isNeg ? intPart.slice(1) : intPart,
          len = intDigits.length;

        if (g2) i = g1, g1 = g2, g2 = i, len -= i;

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);
          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart
         ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
           '$&' + (format.fractionGroupSeparator || ''))
          : fractionPart)
         : intPart;
      }

      return (format.prefix || '') + str + (format.suffix || '');
    };


    /*
     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
     * fraction with an integer numerator and an integer denominator.
     * The denominator will be a positive non-zero value less than or equal to the specified
     * maximum denominator. If a maximum denominator is not specified, the denominator will be
     * the lowest value necessary to represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */
    P.toFraction = function (md) {
      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
        x = this,
        xc = x.c;

      if (md != null) {
        n = new BigNumber(md);

        // Throw if md is less than one or is not an integer, unless it is Infinity.
        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error
            (bignumberError + 'Argument ' +
              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
        }
      }

      if (!xc) return new BigNumber(x);

      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc);

      // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s);

      // n0 = d1 = 0
      n0.c[0] = 0;

      for (; ;)  {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e = e * 2;

      // Determine which fraction is closer to x, n0/d0 or n1/d1
      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
          div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

      MAX_EXP = exp;

      return r;
    };


    /*
     * Return the value of this BigNumber converted to a number primitive.
     */
    P.toNumber = function () {
      return +valueOf(this);
    };


    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };


    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */
    P.toString = function (b) {
      var str,
        n = this,
        s = n.s,
        e = n.e;

      // Infinity or NaN?
      if (e === null) {
        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
           ? toExponential(coeffToString(n.c), e)
           : toFixedPoint(coeffToString(n.c), e, '0');
        } else if (b === 10) {
          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
          str = toFixedPoint(coeffToString(n.c), n.e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };


    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */
    P.valueOf = P.toJSON = function () {
      return valueOf(this);
    };


    P._isBigNumber = true;

    if (hasSymbol) {
      P[Symbol.toStringTag] = 'BigNumber';

      // Node.js v10.12.0+
      P[Symbol.for('nodejs.util.inspect.custom')] = P.valueOf;
    }

    if (configObject != null) BigNumber.set(configObject);

    return BigNumber;
  }


  // PRIVATE HELPER FUNCTIONS

  // These functions don't need access to variables,
  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  }


  // Return a coefficient array as a string of base 10 digits.
  function coeffToString(a) {
    var s, z,
      i = 1,
      j = a.length,
      r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;
      for (; z--; s = '0' + s);
      r += s;
    }

    // Determine trailing zeros.
    for (j = r.length; r.charCodeAt(--j) === 48;);

    return r.slice(0, j + 1 || 1);
  }


  // Compare the value of BigNumbers x and y.
  function compare(x, y) {
    var a, b,
      xc = x.c,
      yc = y.c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either NaN?
    if (!i || !j) return null;

    a = xc && !xc[0];
    b = yc && !yc[0];

    // Either zero?
    if (a || b) return a ? b ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    a = i < 0;
    b = k == l;

    // Either Infinity?
    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

    // Compare exponents.
    if (!b) return k > l ^ a ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

    // Compare lengths.
    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }


  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */
  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== mathfloor(n)) {
      throw Error
       (bignumberError + (name || 'Argument') + (typeof n == 'number'
         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
         : ' not a primitive number: ') + String(n));
    }
  }


  // Assumes finite n.
  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }


  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
     (e < 0 ? 'e' : 'e+') + e;
  }


  function toFixedPoint(str, e, z) {
    var len, zs;

    // Negative exponent?
    if (e < 0) {

      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z);
      str = zs + str;

    // Positive exponent
    } else {
      len = str.length;

      // Append zeros.
      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z);
        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  }


  // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

  // AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return BigNumber; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node.js and other environments that support module.exports.
  } else {}
})(this);


/***/ }),

/***/ "../../node_modules/jayson/lib/client/browser.js":
/*!*******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/jayson/lib/client/browser.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extend = __webpack_require__(/*! lodash/extend */ "../../node_modules/lodash/extend.js");
var isArray = __webpack_require__(/*! lodash/isArray */ "../../node_modules/lodash/isArray.js");
var isFunction = __webpack_require__(/*! lodash/isFunction */ "../../node_modules/lodash/isFunction.js");
var isObject = __webpack_require__(/*! lodash/isObject */ "../../node_modules/lodash/isObject.js");
var isUndefined = __webpack_require__(/*! lodash/isUndefined */ "../../node_modules/lodash/isUndefined.js");
var negate = __webpack_require__(/*! lodash/negate */ "../../node_modules/lodash/negate.js");
var uuid = __webpack_require__(/*! uuid/v4 */ "../../node_modules/uuid/v4.js");
var generateRequest = __webpack_require__(/*! ../generateRequest */ "../../node_modules/jayson/lib/generateRequest.js");

/**
 *  Constructor for a Jayson Browser Client that does not depend any node.js core libraries
 *  @class ClientBrowser
 *  @param {Function} callServer Method that calls the server, receives the stringified request and a regular node-style callback
 *  @param {Object} [options]
 *  @param {Function} [options.reviver] Reviver function for JSON
 *  @param {Function} [options.replacer] Replacer function for JSON
 *  @param {Number} [options.version=2] JSON-RPC version to use (1|2)
 *  @param {Function} [options.generator] Function to use for generating request IDs
 *  @return {ClientBrowser}
 */
var ClientBrowser = function(callServer, options) {
  if(!(this instanceof ClientBrowser)) {
    return new ClientBrowser(callServer, options);
  }

  var defaults = {
    reviver: null,
    replacer: null,
    generator: function() { return uuid(); },
    version: 2
  };

  this.options = extend(defaults, options || {});
  this.callServer = callServer;
};

module.exports = ClientBrowser;

/**
 *  Creates a request and dispatches it if given a callback.
 *  @param {String|Array} method A batch request if passed an Array, or a method name if passed a String
 *  @param {Array|Object} [params] Parameters for the method
 *  @param {String|Number} [id] Optional id. If undefined an id will be generated. If null it creates a notification request
 *  @param {Function} [callback] Request callback. If specified, executes the request rather than only returning it.
 *  @throws {TypeError} Invalid parameters
 *  @return {Object} JSON-RPC 1.0 or 2.0 compatible request
 */
ClientBrowser.prototype.request = function(method, params, id, callback) {
  var self = this;
  var request = null;

  // is this a batch request?
  var isBatch = isArray(method) && isFunction(params);

  if (this.options.version === 1 && isBatch) {
    throw new TypeError('JSON-RPC 1.0 does not support batching');
  }

  // is this a raw request?
  var isRaw = !isBatch && method && isObject(method) && isFunction(params);

  if(isBatch || isRaw) {
    callback = params;
    request = method;
  } else {
    if(isFunction(id)) {
      callback = id;
      // specifically undefined because "null" is a notification request
      id = undefined;
    }

    var hasCallback = isFunction(callback);

    try {
      request = generateRequest(method, params, id, {
        generator: this.options.generator,
        version: this.options.version
      });
    } catch(err) {
      if(hasCallback) {
        return callback(err);
      }
      throw err;
    }

    // no callback means we should just return a raw request
    if(!hasCallback) {
      return request;
    }

  }

  var message;
  try {
    message = JSON.stringify(request, this.options.replacer);
  } catch(err) {
    return callback(err);
  }

  this.callServer(message, function(err, response) {
    self._parseResponse(err, response, callback);
  });

  // always return the raw request
  return request;
};

/**
 * Parses a response from a server
 * @param {Object} err Error to pass on that is unrelated to the actual response
 * @param {String} responseText JSON-RPC 1.0 or 2.0 response
 * @param {Function} callback Callback that will receive different arguments depending on the amount of parameters
 * @private
 */
ClientBrowser.prototype._parseResponse = function(err, responseText, callback) {
  if(err) {
    callback(err);
    return;
  }

  if(!responseText) {
    // empty response text, assume that is correct because it could be a
    // notification which jayson does not give any body for
    return callback();
  }

  var response;
  try {
    response = JSON.parse(responseText, this.options.reviver);
  } catch(err) {
    return callback(err);
  }

  if(callback.length === 3) {
    // if callback length is 3, we split callback arguments on error and response

    // is batch response?
    if(isArray(response)) {

      // neccesary to split strictly on validity according to spec here
      var isError = function(res) { return !isUndefined(res.error); };

      return callback(null, response.filter(isError), response.filter(negate(isError)));
    
    } else {

      // split regardless of validity
      return callback(null, response.error, response.result);
    
    }
  
  }

  callback(null, response);
};


/***/ }),

/***/ "../../node_modules/jayson/lib/generateRequest.js":
/*!********************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/jayson/lib/generateRequest.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isString = __webpack_require__(/*! lodash/isString */ "../../node_modules/lodash/isString.js");
var isUndefined = __webpack_require__(/*! lodash/isUndefined */ "../../node_modules/lodash/isUndefined.js");
var isObject = __webpack_require__(/*! lodash/isObject */ "../../node_modules/lodash/isObject.js");
var isArray = __webpack_require__(/*! lodash/isArray */ "../../node_modules/lodash/isArray.js");
var isFunction = __webpack_require__(/*! lodash/isFunction */ "../../node_modules/lodash/isFunction.js");
var uuid = __webpack_require__(/*! uuid/v4 */ "../../node_modules/uuid/v4.js");

/**
 *  Generates a JSON-RPC 1.0 or 2.0 request
 *  @param {String} method Name of method to call
 *  @param {Array|Object} params Array of parameters passed to the method as specified, or an object of parameter names and corresponding value
 *  @param {String|Number|null} [id] Request ID can be a string, number, null for explicit notification or left out for automatic generation
 *  @param {Object} [options]
 *  @param {Number} [options.version=2] JSON-RPC version to use (1 or 2)
 *  @param {Function} [options.generator] Passed the request, and the options object and is expected to return a request ID
 *  @throws {TypeError} If any of the parameters are invalid
 *  @return {Object} A JSON-RPC 1.0 or 2.0 request
 */
module.exports = function(method, params, id, options) {
  if(!isString(method)) {
    throw new TypeError(method + ' must be a string');
  }

  options = options || {};

  var request = {
    method: method
  };

  // assume that we are doing a 2.0 request unless specified differently
  if(isUndefined(options.version) || options.version !== 1) {
    request.jsonrpc = '2.0';
  }

  if(params) {

    // params given, but invalid?
    if(!isObject(params) && !isArray(params)) {
      throw new TypeError(params + ' must be an object, array or omitted');
    }

    request.params = params;

  }

  // if id was left out, generate one (null means explicit notification)
  if(typeof(id) === 'undefined') {
    var generator = isFunction(options.generator) ? options.generator : function() { return uuid(); };
    request.id = generator(request, options);
  } else {
    request.id = id;
  }

  return request;
};


/***/ }),

/***/ "../../node_modules/lodash/_Symbol.js":
/*!********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_Symbol.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "../../node_modules/lodash/_apply.js":
/*!*******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_apply.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ "../../node_modules/lodash/_arrayLikeKeys.js":
/*!***************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_arrayLikeKeys.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "../../node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "../../node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../../node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "../../node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "../../node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "../../node_modules/lodash/_assignValue.js":
/*!*************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_assignValue.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "../../node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "../../node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "../../node_modules/lodash/_baseAssignValue.js":
/*!*****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_baseAssignValue.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "../../node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "../../node_modules/lodash/_baseGetTag.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_baseGetTag.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "../../node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "../../node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsArguments.js":
/*!*****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_baseIsArguments.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsNative.js":
/*!**************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_baseIsNative.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "../../node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "../../node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../../node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsTypedArray.js":
/*!******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_baseIsTypedArray.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../../node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "../../node_modules/lodash/_baseKeysIn.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_baseKeysIn.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "../../node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "../../node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "../../node_modules/lodash/_baseRest.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_baseRest.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(/*! ./identity */ "../../node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "../../node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "../../node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ "../../node_modules/lodash/_baseSetToString.js":
/*!*****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_baseSetToString.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(/*! ./constant */ "../../node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "../../node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "../../node_modules/lodash/identity.js");

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ "../../node_modules/lodash/_baseTimes.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_baseTimes.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "../../node_modules/lodash/_baseUnary.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_baseUnary.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "../../node_modules/lodash/_copyObject.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_copyObject.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "../../node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "../../node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "../../node_modules/lodash/_coreJsData.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_coreJsData.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "../../node_modules/lodash/_createAssigner.js":
/*!****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_createAssigner.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(/*! ./_baseRest */ "../../node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "../../node_modules/lodash/_isIterateeCall.js");

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),

/***/ "../../node_modules/lodash/_defineProperty.js":
/*!****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_defineProperty.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "../../node_modules/lodash/_freeGlobal.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_freeGlobal.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/lodash/_getNative.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_getNative.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "../../node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "../../node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "../../node_modules/lodash/_getRawTag.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_getRawTag.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "../../node_modules/lodash/_getValue.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_getValue.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "../../node_modules/lodash/_isIndex.js":
/*!*********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_isIndex.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "../../node_modules/lodash/_isIterateeCall.js":
/*!****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_isIterateeCall.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "../../node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../../node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "../../node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js");

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ "../../node_modules/lodash/_isMasked.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_isMasked.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "../../node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "../../node_modules/lodash/_isPrototype.js":
/*!*************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_isPrototype.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "../../node_modules/lodash/_nativeKeysIn.js":
/*!**************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_nativeKeysIn.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "../../node_modules/lodash/_nodeUtil.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_nodeUtil.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../../node_modules/lodash/_objectToString.js":
/*!****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_objectToString.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "../../node_modules/lodash/_overRest.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_overRest.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(/*! ./_apply */ "../../node_modules/lodash/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ "../../node_modules/lodash/_root.js":
/*!******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_root.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "../../node_modules/lodash/_setToString.js":
/*!*************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_setToString.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "../../node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "../../node_modules/lodash/_shortOut.js");

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ "../../node_modules/lodash/_shortOut.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_shortOut.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ "../../node_modules/lodash/_toSource.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_toSource.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "../../node_modules/lodash/assignIn.js":
/*!*********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/assignIn.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../../node_modules/lodash/_copyObject.js"),
    createAssigner = __webpack_require__(/*! ./_createAssigner */ "../../node_modules/lodash/_createAssigner.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../../node_modules/lodash/keysIn.js");

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assign
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 */
var assignIn = createAssigner(function(object, source) {
  copyObject(source, keysIn(source), object);
});

module.exports = assignIn;


/***/ }),

/***/ "../../node_modules/lodash/constant.js":
/*!*********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/constant.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ "../../node_modules/lodash/eq.js":
/*!***************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/eq.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "../../node_modules/lodash/extend.js":
/*!*******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/extend.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assignIn */ "../../node_modules/lodash/assignIn.js");


/***/ }),

/***/ "../../node_modules/lodash/identity.js":
/*!*********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/identity.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "../../node_modules/lodash/isArguments.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isArguments.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "../../node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "../../node_modules/lodash/isArray.js":
/*!********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isArray.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "../../node_modules/lodash/isArrayLike.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isArrayLike.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "../../node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../../node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "../../node_modules/lodash/isBuffer.js":
/*!*********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isBuffer.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "../../node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../../node_modules/lodash/isFunction.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isFunction.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "../../node_modules/lodash/isLength.js":
/*!*********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isLength.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "../../node_modules/lodash/isObject.js":
/*!*********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isObject.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "../../node_modules/lodash/isObjectLike.js":
/*!*************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isObjectLike.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "../../node_modules/lodash/isString.js":
/*!*********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isString.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../node_modules/lodash/isArray.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),

/***/ "../../node_modules/lodash/isTypedArray.js":
/*!*************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isTypedArray.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "../../node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "../../node_modules/lodash/isUndefined.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/isUndefined.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;


/***/ }),

/***/ "../../node_modules/lodash/keysIn.js":
/*!*******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/keysIn.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "../../node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "../../node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../../node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "../../node_modules/lodash/negate.js":
/*!*******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/negate.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 *
 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
 * // => [1, 3, 5]
 */
function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0: return !predicate.call(this);
      case 1: return !predicate.call(this, args[0]);
      case 2: return !predicate.call(this, args[0], args[1]);
      case 3: return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}

module.exports = negate;


/***/ }),

/***/ "../../node_modules/lodash/stubFalse.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/stubFalse.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "../../node_modules/node-fetch/browser.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/node-fetch/browser.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
exports.default = global.fetch.bind(global);

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;

/***/ }),

/***/ "../../node_modules/uuid/lib/bytesToUuid.js":
/*!**************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/uuid/lib/bytesToUuid.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "../../node_modules/uuid/lib/rng-browser.js":
/*!**************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/uuid/lib/rng-browser.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "../../node_modules/uuid/v4.js":
/*!*************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/uuid/v4.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "../../node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../../node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../../node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Client: __webpack_require__(/*! ./src/Client */ "./src/Client.js"),
  Executor: __webpack_require__(/*! ./src/Executor */ "./src/Executor.js"),
  Caller: __webpack_require__(/*! ./src/Caller */ "./src/Caller.js"),
  Actions: __webpack_require__(/*! ./src/Actions */ "./src/Actions/index.js"),
  Errors: __webpack_require__(/*! ./src/Errors */ "./src/Errors/index.js"),
  Types: __webpack_require__(/*! ./src/Types */ "./src/Types/index.js")
};

/***/ }),

/***/ "./src/Actions/BaseAction.js":
/*!***********************************!*\
  !*** ./src/Actions/BaseAction.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const P_PARAMS = Symbol('params');
const P_METHOD = Symbol('method');
const P_EXECUTOR = Symbol('executor');
/**
 * A basic action that holds the rpc method and its parameters.
 */

class BaseAction {
  /**
     * Constructor.
     *
     * @param {String} method
     * @param {Object} params
     * @param {Executor} executor
     */
  constructor(method, params, executor) {
    this[P_METHOD] = method;
    this[P_PARAMS] = params;
    this[P_EXECUTOR] = executor;
  }
  /**
     * Gets the params for the rpc call.
     *
   * @returns {Object}
     */


  get params() {
    return this[P_PARAMS];
  }
  /**
   * Changes a single param of the params object.
   *
   * @param {String} name
   * @param {*} value
   * @returns {BaseAction}
   */


  changeParam(name, value) {
    this[P_PARAMS][name] = value;
    return this;
  }
  /**
     * Gets the method.
     *
     * @returns {*}
     */


  get method() {
    return this[P_METHOD];
  }
  /**
     * Executes the current action and returns the raw result.
     *
     * @returns {Promise}
     */


  async execute() {
    return this[P_EXECUTOR].execute(this[P_METHOD], this[P_PARAMS]);
  }
  /**
   * Executes the current action and transforms the result to an array
   *  of the defined type.
   *
   *  @param {Object} destinationType
   * @returns {Promise}
   */


  async executeTransformArray(destinationType) {
    return this[P_EXECUTOR].executeTransformArray(this[P_METHOD], this[P_PARAMS], destinationType);
  }
  /**
     * Executes the current action and transforms the result to an object
     *  of the defined type.
     *
     *  @param {Object} destinationType
     * @returns {Promise}
     */


  async executeTransformItem(destinationType) {
    return this[P_EXECUTOR].executeTransformItem(this[P_METHOD], this[P_PARAMS], destinationType);
  }
  /**
     * Gets a flag indicating whether the current action is valid.
     *
     * @returns {boolean}
     */


  isValid() {
    return true;
  }

}

module.exports = BaseAction;

/***/ }),

/***/ "./src/Actions/OperationAction.js":
/*!****************************************!*\
  !*** ./src/Actions/OperationAction.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BaseAction = __webpack_require__(/*! ./BaseAction */ "./src/Actions/BaseAction.js");

const Currency = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Currency;
/**
 * An object that holds infos about an operation action. It extends the
 * BaseAction functionality by methods which are useful for operations.
 */


class OperationAction extends BaseAction {
  /**
     * Constructor
     *
     * @param {String} method
     * @param {Object} params
     * @param {Executor} executor
     */
  constructor(method, params, executor) {
    super(method, params, executor);
    this.params.fee = new Currency(0);
    this.params.payload = '';
    this.params.payload_method = 'none';
  }
  /**
     * Sets the payload of the action.
     *
     * @param {String|BC} payload
     * @param {String} payloadMethod
     * @param {String} password
     * @returns {OperationAction}
     */


  withPayload(payload, payloadMethod = 'none', password = null) {
    this.params.payload = payload;
    this.params.payload_method = payloadMethod;

    if (password !== null) {
      this.params.pwd = password;
    }

    return this;
  }
  /**
     * Sets the fee.
     *
     * @param {Number|Currency} fee
     * @returns {OperationAction}
     */


  withFee(fee) {
    this.fee = new Currency(fee);
    return this;
  }
  /**
     * Gets a flag indicating whether the current action is valid.
     *
     * @returns {boolean}
     */


  isValid() {
    return super.isValid();
  }

}

module.exports = OperationAction;

/***/ }),

/***/ "./src/Actions/PagedAction.js":
/*!************************************!*\
  !*** ./src/Actions/PagedAction.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BaseAction = __webpack_require__(/*! ./BaseAction */ "./src/Actions/BaseAction.js");
/**
 * Whenever a remote endpoint has paging possibilities, this action will be
 * returned.
 */


class PagedAction extends BaseAction {
  /**
     * Constructor.
     *
     * @param {String} method
     * @param {Object} params
     * @param {Executor} executor
     */
  constructor(method, params, executor) {
    super(method, params, executor);
    this.changeParam('start', 0);
    this.changeParam('max', 100);
  }

  set start(start) {
    this.changeParam('start', start);
    return this;
  }

  set max(max) {
    this.changeParam('max', max);
    return this;
  }
  /**
   * Executes the current action and returns the raw result.
   *
   * @returns {Promise}
   */


  async executeAll() {
    let all = [];
    await this.executeAllReport(data => data.forEach(item => all.push(item)));
    return all;
  }
  /**
   * Executes the current action and returns the raw result.
   *
   * @returns {Promise}
   */


  async executeAllReport(reporter) {
    let result = [];

    do {
      result = await this.execute();
      reporter(result);
      this.changeParam('start', this.params.start + this.params.max);
    } while (result.length > 0 && result.length === this.params.max);
  }
  /**
   * Executes the current action and transforms the result to an array
   *  of the defined type.
   *
   *  @param {Object} destinationType
   * @returns {Promise}
   */


  async executeAllTransformArray(destinationType) {
    let all = [];
    await this.executeAllTransformArrayReport(destinationType, data => data.forEach(item => all.push(item)));
    return all;
  }
  /**
   * Executes the current action and transforms the result to an array
   *  of the defined type.
   *
   * @param {Object} destinationType
   * @param {Function} reporter
   * @returns {Promise}
   */


  async executeAllTransformArrayReport(destinationType, reporter) {
    let result = [];

    do {
      result = await this.executeTransformArray(destinationType);
      reporter(result);
      this.changeParam('start', this.params.start + this.params.max);
    } while (result.length > 0 && result.length === this.params.max);
  }
  /**
     * Gets a flag indicating whether the current action is valid.
     *
     * @returns {boolean}
     */


  isValid() {
    return true;
  }

}

module.exports = PagedAction;

/***/ }),

/***/ "./src/Actions/SignOperationAction.js":
/*!********************************************!*\
  !*** ./src/Actions/SignOperationAction.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const RawOperations = __webpack_require__(/*! ../Types/RawOperations */ "./src/Types/RawOperations.js");

const OperationAction = __webpack_require__(/*! ./OperationAction */ "./src/Actions/OperationAction.js");
/**
 * This object derives from an operation action and extends the functionality
 * by methods shared by cold wallet signing operations.
 */


class SignOperationAction extends OperationAction {
  /**
     * Constructor.
     *
     * @param {String} method
     * @param {Object} params
     * @param {Executor} executor
     */
  constructor(method, params, executor) {
    super(method, params, executor);
    this.params.last_n_operation = null;
    this.params.rawoperations = null;
  }
  /**
     * Sets the last n operation value.
     *
     * @param {Number} lastNOperation
     * @return {SignOperationAction}
     */


  withLastNOperation(lastNOperation) {
    this.params.last_n_operation = lastNOperation;
    return this;
  }
  /**
     * Sets the raw operations instance of a previous result.
     *
     * @param {RawOperations|BC|String} rawoperations
     * @return {SignOperationAction}
     */


  withRawOperations(rawoperations) {
    this.params.rawoperations = new RawOperations(rawoperations);
  }

  isValid() {
    return super.isValid() && this.params.last_n_operation !== null;
  }

}

module.exports = SignOperationAction;

/***/ }),

/***/ "./src/Actions/index.js":
/*!******************************!*\
  !*** ./src/Actions/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  BaseAction: __webpack_require__(/*! ./BaseAction */ "./src/Actions/BaseAction.js"),
  OperationAction: __webpack_require__(/*! ./OperationAction */ "./src/Actions/OperationAction.js"),
  PagedAction: __webpack_require__(/*! ./PagedAction */ "./src/Actions/PagedAction.js"),
  SignOperationAction: __webpack_require__(/*! ./SignOperationAction */ "./src/Actions/SignOperationAction.js")
};

/***/ }),

/***/ "./src/Caller.js":
/*!***********************!*\
  !*** ./src/Caller.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const jaysonBrowserClient = __webpack_require__(/*! jayson/lib/client/browser */ "../../node_modules/jayson/lib/client/browser.js");

const fetch = __webpack_require__(/*! node-fetch */ "../../node_modules/node-fetch/browser.js");

const ConnectionError = __webpack_require__(/*! ./Errors/ConnectionError */ "./src/Errors/ConnectionError.js");

const ResultError = __webpack_require__(/*! ./Errors/ResultError */ "./src/Errors/ResultError.js");

const P_CLIENT = Symbol('client');
/**
 * A caller object that can call JSON-RPC methods.
 */

class Caller {
  /**
     * Creates a new caller instance.
     *
     * @param {String} host
     */
  constructor(host) {
    this[P_CLIENT] = jaysonBrowserClient((request, callback) => {
      const options = {
        method: 'POST',
        body: request,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      return fetch(host, options).then(res => res.text()).then(text => {
        callback(null, text);
      }).catch(err => {
        callback(err);
      });
    });
  }
  /**
     * Calls the given method with the given params and returns a promise.
     *
     * @param {String}method
     * @param {Object} params
     * @returns {Promise<any>}
     */


  call(method, params) {
    return new Promise((resolve, reject) => {
      this[P_CLIENT].request(method, params, (err, error, result) => {
        if (err !== null || error !== undefined || result === undefined) {
          if (err !== null && err.constructor.name === 'FetchError') {
            return reject(new ConnectionError(err));
          }

          return reject(new ResultError(error.code, error.message));
        }

        return resolve(result);
      });
    });
  }

}

module.exports = Caller;

/***/ }),

/***/ "./src/Client.js":
/*!***********************!*\
  !*** ./src/Client.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Executor = __webpack_require__(/*! ./Executor */ "./src/Executor.js");

const RPCCaller = __webpack_require__(/*! ./Caller */ "./src/Caller.js");

const BaseAction = __webpack_require__(/*! ./Actions/BaseAction */ "./src/Actions/BaseAction.js");

const PagedAction = __webpack_require__(/*! ./Actions/PagedAction */ "./src/Actions/PagedAction.js");

const OperationAction = __webpack_require__(/*! ./Actions/OperationAction */ "./src/Actions/OperationAction.js");

const SignOperationAction = __webpack_require__(/*! ./Actions/SignOperationAction */ "./src/Actions/SignOperationAction.js");

const AccountName = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountName;

const AccountNumber = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountNumber;

const P_EXECUTOR = Symbol('executor');
/**
 * A simple rpc client that will prepare an action that can be executed against
 * a node.
 */

class Client {
  /**
     * Returns a standard instance pointing to the given rpc host node.
     *
     * @param {String} rpcHostAddress
     * @returns {Client}
     */
  static factory(rpcHostAddress) {
    return new Client(new Executor(new RPCCaller(rpcHostAddress)));
  }
  /**
     * Constructor
     *
     * @param {Executor} executor
     */


  constructor(executor) {
    this[P_EXECUTOR] = executor;
  }
  /**
     * Adds one or more nodes to connect to.
     *
     * @param {String[]} nodes
     * @returns {BaseAction}
     */


  addNode(...nodes) {
    return new BaseAction('addnode', {
      nodes: nodes.join(');')
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets an account.
     *
     * @param {Account|AccountNumber|Number|String} account
     * @returns {BaseAction}
     */


  getAccount(account) {
    return new BaseAction('getaccount', {
      account: new AccountNumber(account)
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets a list of all accounts known by the remote node and
     * filtered by the given params.
     *
     * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} publicKey
     * @returns {BaseAction}
     */


  getWalletAccounts(publicKey = null) {
    return new PagedAction('getwalletaccounts', {
      pubkey: publicKey
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets the number of all accounts known by the remote node and
     * filtered by the given params.
     *
     * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} publicKey
     * @returns {BaseAction}
     */


  getWalletAccountsCount(publicKey = null) {
    return new BaseAction('getwalletaccountscount', {
      pubkey: publicKey
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets a list of all wallet public keys.
     *
     * @returns {BaseAction}
     */


  getWalletPublicKeys() {
    return new PagedAction('getwalletpubkeys', {}, this[P_EXECUTOR]);
  }
  /**
     * Gets the information about a single wallets public key.
     *
     * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} publicKey
     * @returns {BaseAction}
     */


  getWalletPublicKey(publicKey) {
    return new BaseAction('getwalletpubkey', {
      pubkey: publicKey
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets the balance of the wallet with the given keys or all keys.
     *
     * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} publicKey
     * @returns {BaseAction}
     */


  getWalletCoins(publicKey = null) {
    return new BaseAction('getwalletcoins', {
      pubkey: publicKey
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets a block by the given block number.
     *
     * @param {Block|Number} block
     * @returns {BaseAction}
     */


  getBlock(block) {
    return new BaseAction('getblock', {
      block
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets a list of blocks.
     *
     * @param {Number} last
     * @param {Number} start
     * @param {Number} end
     * @returns {BaseAction}
     */


  getBlocks({
    last = null,
    start = null,
    end = null
  }) {
    return new BaseAction('getblocks', {
      last,
      start,
      end
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets the number of known blocks.
     *
     * @returns {BaseAction}
     */


  getBlockCount() {
    return new BaseAction('getblockcount', {}, this[P_EXECUTOR]);
  }
  /**
     * Gets the operation in the given block at the given position.
     *
     * @param {Block||Number} block
     * @param {Number} opBlock
     * @returns {BaseAction}
     */


  getBlockOperation(block, opBlock) {
    return new BaseAction('getblockoperation', {
      block,
      opblock: opBlock
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets all operations of the given block.
     *
     * @param {Block|Number} block
     * @returns {PagedAction}
     */


  getBlockOperations(block) {
    return new PagedAction('getblockoperations', {
      block
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets the operations of an account.
     *
     * @param {Account|AccountNumber|Number|String} account
     * @param {Number} depth
     * @returns {PagedAction}
     */


  getAccountOperations(account, depth = 100) {
    return new PagedAction('getaccountoperations', {
      account: new AccountNumber(account),
      depth
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets the pending operations.
     *
     * @returns {PagedAction}
     */


  getPendings() {
    return new PagedAction('getpendings', {}, this[P_EXECUTOR]);
  }
  /**
     * Gets the number of pending operations.
     *
     * @returns {BaseAction}
     */


  getPendingsCount() {
    return new BaseAction('getpendingscount', {}, this[P_EXECUTOR]);
  }
  /**
     * Gets the operation identified by the given ophash.
     *
     * @param {String|BC|OperationHash} opHash
     * @returns {BaseAction}
     */


  findOperation(opHash) {
    return new BaseAction('findoperation', {
      ophash: opHash
    }, this[P_EXECUTOR]);
  }

  findAccounts({
    name = null,
    type = null,
    onlyAccountsForSale = null,
    exact = null,
    minBalance = null,
    maxBalance = null,
    publicKey = null
  }) {
    return new PagedAction('findaccounts', {
      name: name !== null ? new AccountName(name) : name,
      type,
      listed: onlyAccountsForSale,
      exact,
      min_balance: minBalance,
      max_balance: maxBalance,
      pubkey: publicKey
    }, this[P_EXECUTOR]);
  }
  /**
     * Creates a new transaction.
     *
     * @param {Account|AccountNumber|Number|String} sender
     * @param {Account|AccountNumber|Number|String} target
     * @param {Currency} amount
     * @returns {OperationAction}
     */


  sendTo(sender, target, amount) {
    return new OperationAction('sendto', {
      sender: new AccountNumber(sender),
      target: new AccountNumber(target),
      amount
    }, this[P_EXECUTOR]);
  }
  /**
     * Changes the key of an account.
     *
     * @param {Account|AccountNumber|Number|String} account
     * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} newPublicKey
     * @returns {OperationAction}
     */


  changeKey(account, newPublicKey) {
    return new OperationAction('changekey', {
      account: new AccountNumber(account),
      new_pubkey: newPublicKey
    }, this[P_EXECUTOR]);
  }
  /**
     * Lists an account for sale.
     *
     * @param {Account|AccountNumber|Number|String} accountTarget
     * @param {Account|AccountNumber|Number|String} accountSigner
     * @param {Currency} price
     * @param {Account|AccountNumber|Number|String} sellerAccount
     * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} newPublicKey
     * @returns {OperationAction}
     */


  listAccountForSale(accountTarget, accountSigner, price, sellerAccount, newPublicKey = null) {
    return new OperationAction('listaccountforsale', {
      account_target: new AccountNumber(accountTarget),
      account_signer: new AccountNumber(accountSigner),
      price,
      seller_account: new AccountNumber(sellerAccount),
      new_pubkey: newPublicKey
    }, this[P_EXECUTOR]);
  }
  /**
     * Lists an account for sale.
     *
     * @param {Account|AccountNumber|Number|String} accountTarget
     * @param {Account|AccountNumber|Number|String} accountSigner
     * @returns {OperationAction}
     */


  delistAccountForSale(accountTarget, accountSigner) {
    return new OperationAction('delistaccountforsale', {
      account_target: new AccountNumber(accountTarget),
      account_signer: new AccountNumber(accountSigner)
    }, this[P_EXECUTOR]);
  }
  /**
     * Buys an account
     *
     * @param {Account|AccountNumber|Number|String} buyerAccount
     * @param {Account|AccountNumber|Number|String} accountToPurchase
     * @param {Currency|Number} price
     * @param {Account|AccountNumber|Number|String} sellerAccount
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} newPublicKey
     * @param {Currency|Number} amount
     * @returns {OperationAction}
     */


  buyAccount(buyerAccount, accountToPurchase, price = null, sellerAccount = null, newPublicKey = null, amount) {
    return new OperationAction('buyaccount', {
      buyer_account: new AccountNumber(buyerAccount),
      account_to_purchase: new AccountNumber(accountToPurchase),
      price,
      seller_account: sellerAccount !== null ? new AccountNumber(sellerAccount) : sellerAccount,
      new_pubkey: newPublicKey,
      amount
    }, this[P_EXECUTOR]);
  }
  /**
   * Changes the info of an account.
   *
     * @param {Account|AccountNumber|Number|String} accountTarget
     * @param {Account|AccountNumber|Number|String} accountSigner
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} newPublicKey
     * @param {String} newName
     * @param {Number} newType
     * @returns {OperationAction}
     */


  changeAccountInfo(accountTarget, accountSigner, newPublicKey = null, newName = null, newType = null) {
    return new OperationAction('changeaccountinfo', {
      account_target: new AccountNumber(accountTarget),
      account_signer: new AccountNumber(accountSigner),
      new_pubkey: newPublicKey,
      new_name: newName !== null ? new AccountName(newName) : newName,
      new_type: newType
    }, this[P_EXECUTOR]);
  }
  /**
     * Gets the operation infos of the given raw operations string.
   *
     * @param {String|BC} rawOperations
     * @returns {BaseAction}
     */


  operationsInfo(rawOperations) {
    return new BaseAction('operationsinfo', {
      rawoperations: rawOperations
    }, this[P_EXECUTOR]);
  }
  /**
     * Executes the given raw operations
   * @param {String|BC} rawOperations
     * @returns {BaseAction}
     */


  executeOperations(rawOperations) {
    return new BaseAction('executeoperations', {
      rawoperations: rawOperations
    }, this[P_EXECUTOR]);
  }
  /**
     * Signs a changeaccount info
     *
     * @param {Account|AccountNumber|Number|String} account_target
     * @param {Account|AccountNumber|Number|String} account_signer
     * @param {PublicKey|WalletPublicKey|BC|String} new_enc_pubkey
     * @param {String} new_b58_pubkey
     * @param {String} new_name
     * @param {Number} new_type
     * @param {Currency} fee
     * @param {BC|String} payload
     * @param {String} payload_method
     * @param {String} pwd
     * @returns {Promise<any>}
     */


  signChangeAccountInfo(accountTarget, accountSigner, signerPublicKey, newPublicKey, newName = null, newType = null) {
    return new SignOperationAction('signchangeaccountinfo', {
      account_target: new AccountNumber(accountTarget),
      account_signer: new AccountNumber(accountSigner),
      new_pubkey: newPublicKey,
      new_name: newName !== null ? new AccountName(newName) : newName,
      new_type: newType,
      signer_pubkey: signerPublicKey
    }, this[P_EXECUTOR]);
  }
  /**
     *
     * @param sender
     * @param target
     * @param senderPublicKey
     * @param targetPublicKey
     * @param amount
     * @returns {SignOperationAction}
     */


  signSendTo(sender, target, senderPublicKey, targetPublicKey, amount) {
    return new SignOperationAction('signsendto', {
      sender: new AccountNumber(sender),
      target: new AccountNumber(target),
      sender_pubkey: senderPublicKey,
      target_pubkey: targetPublicKey,
      amount
    }, this[P_EXECUTOR]);
  }
  /**
     *
     * @param account
     * @param oldPublicKey
     * @param newPublicKey
     * @returns {SignOperationAction}
     */


  signChangeKey(account, oldPublicKey, newPublicKey) {
    return new SignOperationAction('signchangekey', {
      account: new AccountNumber(account),
      old_pubkey: oldPublicKey,
      new_pubkey: newPublicKey
    }, this[P_EXECUTOR]);
  }
  /**
     *
     * @param accountTarget
     * @param accountSigner
     * @param price
     * @param sellerAccount
     * @param newPublicKey
     * @param lockedUntilBlock
     * @param signerPublicKey
     * @returns {SignOperationAction}
     */


  signListAccountForSale(accountTarget, accountSigner, price, sellerAccount, newPublicKey, lockedUntilBlock, signerPublicKey) {
    return new SignOperationAction('signlistaccountforsale', {
      account_target: new AccountNumber(accountTarget),
      account_signer: new AccountNumber(accountSigner),
      price,
      seller_account: new AccountNumber(sellerAccount),
      new_pubkey: newPublicKey,
      locked_until_block: lockedUntilBlock,
      signer_pubkey: signerPublicKey
    }, this[P_EXECUTOR]);
  }
  /**
   * Gets the status of the remote node.
   *
   * @returns {BaseAction}
   */


  nodeStatus() {
    return new BaseAction('nodestatus', {}, this[P_EXECUTOR]);
  }
  /**
   * Remotely decodes the given public key.
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} publicKey
   * @returns {BaseAction}
   */


  decodePubKey(publicKey) {
    return new BaseAction('decodepubkey', {
      pubkey: publicKey
    }, this[P_EXECUTOR]);
  }

  payloadDecrypt(payload, passwords = []) {
    return new BaseAction('payloaddecrypt', {
      payload: payload,
      pwds: passwords
    }, this[P_EXECUTOR]);
  }
  /*
  importpubkey
  decodeophash
  findnoperation
  findnoperations
  changekeys
  signdelistaccountforsale
  signbuyaccount
  signmessage
  verifysign
  operationsdelete
  multioperationaddoperation
  multioperationsignoffline
  multioperationsignonline
  encodepubkey
  payloadencrypt
  getconnections
  addnewkey
  lock
  unlock
  setwalletpassword
  stopnode
  startnode
  cleanblacklist
  node_ip_stats
   */


}

module.exports = Client;

/***/ }),

/***/ "./src/Errors/ConnectionError.js":
/*!***************************************!*\
  !*** ./src/Errors/ConnectionError.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const P_ORIGINAL = Symbol('original');
const P_MESSAGE = Symbol('message');

class ConnectionError {
  constructor(originalFetchError) {
    this[P_ORIGINAL] = originalFetchError;
    this[P_MESSAGE] = originalFetchError.message;
  }

  get original() {
    return this[P_ORIGINAL];
  }

  get message() {
    return this[P_MESSAGE];
  }

}

module.exports = ConnectionError;

/***/ }),

/***/ "./src/Errors/ResultError.js":
/*!***********************************!*\
  !*** ./src/Errors/ResultError.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

const P_CODE = Symbol('code');
const P_MESSAGE = Symbol('message');

class ResultError {
  constructor(code, message) {
    this[P_CODE] = code;
    this[P_MESSAGE] = message;
  }

  get code() {
    return this[P_CODE];
  }

  get message() {
    return this[P_MESSAGE];
  }

}

module.exports = ResultError;

/***/ }),

/***/ "./src/Errors/index.js":
/*!*****************************!*\
  !*** ./src/Errors/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  ConnectionError: __webpack_require__(/*! ./ConnectionError */ "./src/Errors/ConnectionError.js"),
  ResultError: __webpack_require__(/*! ./ResultError */ "./src/Errors/ResultError.js")
};

/***/ }),

/***/ "./src/Executor.js":
/*!*************************!*\
  !*** ./src/Executor.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const P_CALLER = Symbol('caller');

const AccountNumber = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountName;

const OperationHash = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.OperationHash;

const PublicKey = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Keys.PublicKey;

const KeyPair = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Keys.KeyPair;

const Currency = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Currency;

const BC = __webpack_require__(/*! @sbx/common */ "@sbx/common").BC;

const Block = __webpack_require__(/*! ./Types/Block */ "./src/Types/Block.js");

const WalletPublicKey = __webpack_require__(/*! ./Types/WalletPublicKey */ "./src/Types/WalletPublicKey.js");

const Account = __webpack_require__(/*! ./Types/Account */ "./src/Types/Account.js");
/**
 * Simple function that transforms the values of an object to make them usable
 * in rpc calls.
 *
 * @param {Object} params
 * @returns {Object}
 */


function transformRpcParams(params) {
  const newParams = {};
  Object.keys(params).forEach(field => {
    const item = params[field]; // we weill delete fields that are null

    if (item === null) {} else if (field.indexOf('pubkey') !== -1) {
      // correct the field name..
      let newField = field.replace('pubkey', 'enc_pubkey'); // and set the value

      if (item instanceof BC) {
        newParams[newField] = item.toHex();
      } else if (item instanceof PublicKey) {
        newParams[newField] = item.encode().toHex();
      } else if (item instanceof WalletPublicKey) {
        newParams[newField] = item.publicKey.encode().toHex();
      } else if (item instanceof KeyPair) {
        newParams[newField] = item.publicKey.encode().toHex();
      } else {
        newField = newField.replace('enc_pubkey', 'b58_pubkey');
        newParams[newField] = item.toString();
      }
    } else if (field === 'payload' && !(item instanceof BC)) {
      newParams[field] = BC.fromString(item).toHex();
    } else if (field === 'max' || field === 'start' || field === 'end' || field === 'depth') {
      newParams[field] = parseInt(item, 10);
    } else if ((field === 'fee' || field === 'amount' || field === 'price') && !(params[field] instanceof Currency)) {
      newParams[field] = new Currency(item);

      if (newParams[field].isVague()) {
        throw new Error('Currency value has more that 4 decimals, you need ' + 'to round the value by yourself. We will not round automagically.');
      } else {
        newParams[field] = newParams[field].toStringOpt();
      }
    } else if (typeof item === 'boolean') {
      newParams[field] = item;
    } else if (item instanceof BC) {
      newParams[field] = item.toHex();
    } else if (item instanceof OperationHash) {
      newParams[field] = item.encode().toHex();
    } else if (item instanceof Account) {
      newParams[field] = item.account.account; // NICE!!!!! :-D
    } else if (item instanceof AccountNumber) {
      newParams[field] = item.account;
    } else if (item instanceof AccountName) {
      newParams[field] = item.toString();
    } else if (item instanceof Block) {
      newParams[field] = item.block;
    } else if (item instanceof Currency) {
      if (item.isVague()) {
        throw new Error('Currency value has more that 4 decimals, you need ' + 'to round the value by yourself. We will not round automagically.');
      }

      newParams[field] = item.toStringOpt();
    } else if (typeof item === 'number') {
      newParams[field] = item;
    } else {
      newParams[field] = item.toString();
    }
  });
  return newParams;
}
/**
 * This class will execute an rpc call and returns a promise.
 */


class Executor {
  /**
     * Constructor
     *
     * @param {Caller} caller
     */
  constructor(caller) {
    this[P_CALLER] = caller;
  }
  /**
   * Calls the given method with the given params and returns a promise that
   * itself will transform the returned value and resolve the promise.
   *
   * @param {String} method
   * @param {Object} params
   * @param {Function} transformCallback
   * @returns {Promise<any>}
   */


  async execute(method, params, transformCallback = r => r) {
    return new Promise((resolve, reject) => {
      this[P_CALLER].call(method, transformRpcParams(params)).then(response => resolve(transformCallback(response))).catch(error => reject(error));
    });
  }
  /**
   * Calls the given method with the given params and returns a promise that
   * itself will transform the returned value and resolve the promise.
   *
   * @param {Object} action
   * @param {Function} transformCallback
   * @returns {Promise<any>}
   */


  async executeAll(action, transformCallback = r => r) {
    const all = [];
    let result = [];

    do {
      result = await this.execute(action.method, action.params, transformCallback);
      result.forEach(item => all.push(item));
      action.changeParam('start', action.params.start + action.params.max);
    } while (result.length > 0 && result.length === action.params.max);

    return all;
  }
  /**
     * Calls the rpc method with the given parameters and returns a promise that
     * resolves with an array of objects of the given Destination type.
     *
     * @param {String} method
     * @param {Object} params
     * @param {*} DestinationType
     * @returns {Promise<any>}
     */


  async executeTransformArray(method, params, DestinationType) {
    return this.execute(method, params, r => r.map(ri => new DestinationType(ri)));
  }
  /**
     * Calls the rpc method with the given parameters and returns a promise that
     * resolves with an object of the given Destination type.
     *
     * @param {String} method
     * @param {Object} params
     * @param {*} DestinationType
     * @returns {Promise<any>}
     */


  async executeTransformItem(method, params, DestinationType) {
    return this.execute(method, params, r => {
      return new DestinationType(r);
    });
  }

}

module.exports = Executor;

/***/ }),

/***/ "./src/Types/Abstract.js":
/*!*******************************!*\
  !*** ./src/Types/Abstract.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const P_INITIALIZATION_DATA = Symbol('__initialization_data');
/**
 * Abstract class for RPC response objects.
 */

class Abstract {
  /**
     * Constructor.
     *
     * @param {Object} initializationData
     */
  constructor(initializationData) {
    if (new.target === Abstract) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }

    this[P_INITIALIZATION_DATA] = initializationData;
  }
  /**
     * Gets the initialization data. This should normally not be used at all but
     * in case there are new fields which are not implemented in the library yet,
     * the user will still have access to it.
     *
     * @returns {Object}
     */


  get __initializationData() {
    return this[P_INITIALIZATION_DATA];
  }

}

module.exports = Abstract;

/***/ }),

/***/ "./src/Types/Account.js":
/*!******************************!*\
  !*** ./src/Types/Account.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountName;

const BC = __webpack_require__(/*! @sbx/common */ "@sbx/common").BC;

const PublicKey = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Keys.PublicKey;

const Currency = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Currency;

const P_ACCOUNT = Symbol('account');
const P_ENC_PUBKEY = Symbol('enc_pubkey');
const P_BALANCE = Symbol('balance');
const P_N_OPERATION = Symbol('n_operation');
const P_UPDATED_B = Symbol('updated_b');
const P_STATE = Symbol('state');
const P_NAME = Symbol('name');
const P_TYPE = Symbol('type');
const P_LOCKED_UNTIL_BLOCK = Symbol('locked_until_block');
const P_PRICE = Symbol('price');
const P_SELLER_ACCOUNT = Symbol('seller_account');
const P_PRIVATE_SALE = Symbol('private_sale');
const P_NEW_ENC_PUBKEY = Symbol('new_enc_pubkey');
/**
 * Represents an account.
 */

class Account extends Abstract {
  /**
   * The state of an account when it is listed for sale.
   *
   * @returns {string}
   */
  static get STATE_LISTED() {
    return 'listed';
  }
  /**
   * The state of an account when it is not listed.
   *
   * @returns {string}
   */


  static get STATE_NORMAL() {
    return 'normal';
  }
  /**
   * Constructor
   *
   * @param {Object} data
   */


  constructor(data) {
    super(data);
    this[P_ACCOUNT] = new AccountNumber(data.account);
    this[P_ENC_PUBKEY] = PublicKey.decode(BC.fromHex(data.enc_pubkey));
    this[P_BALANCE] = new Currency(data.balance);
    this[P_N_OPERATION] = parseInt(data.n_operation, 10);
    this[P_UPDATED_B] = parseInt(data.updated_b, 10);

    if (data.state !== Account.STATE_NORMAL && data.state !== Account.STATE_LISTED) {
      throw new Error('Invalid account state.');
    }

    this[P_STATE] = data.state;
    this[P_NAME] = new AccountName(data.name);
    this[P_TYPE] = data.type;
    this[P_LOCKED_UNTIL_BLOCK] = null;

    if (data.locked_until_block !== undefined) {
      this[P_LOCKED_UNTIL_BLOCK] = parseInt(data.locked_until_block, 10);
    } // when not listed


    this[P_PRICE] = null;
    this[P_SELLER_ACCOUNT] = null;
    this[P_PRIVATE_SALE] = null;
    this[P_NEW_ENC_PUBKEY] = null;

    if (this[P_STATE] === Account.STATE_LISTED) {
      this[P_PRICE] = new Currency(data.price);
      this[P_SELLER_ACCOUNT] = new AccountNumber(data.seller_account);
      this[P_PRIVATE_SALE] = data.private_sale;

      if (data.new_enc_pubkey !== '000000000000' && data.new_enc_pubkey !== undefined) {
        this[P_NEW_ENC_PUBKEY] = PublicKey.decode(BC.fromHex(data.new_enc_pubkey));
      }
    }
  }
  /**
   * Gets the account number of the account.
   *
   * @returns {AccountNumber}
   */


  get account() {
    return this[P_ACCOUNT];
  }
  /**
   * Gets the public key of the account.
   *
   * @returns {PublicKey}
   */


  get publicKey() {
    return this[P_ENC_PUBKEY];
  }
  /**
   * Gets the balance of the account.
   *
   * @returns {Currency}
   */


  get balance() {
    return this[P_BALANCE];
  }
  /**
   * Gets the number of operations of this account.
   *
   * @returns {Number}
   */


  get nOperation() {
    return this[P_N_OPERATION];
  }
  /**
   * Gets the block number when the account was last updated.
   *
   * @returns {Number}
   */


  get updatedB() {
    return this[P_UPDATED_B];
  }
  /**
   * Gets the state of the account (normal, listed).
   *
   * @returns {String}
   */


  get state() {
    return this[P_STATE];
  }
  /**
   * Gets the name of the account.
   *
   * @returns {AccountName}
   */


  get name() {
    return this[P_NAME];
  }
  /**
   * Gets the type of the account.
   *
   * @returns {Number}
   */


  get type() {
    return this[P_TYPE];
  }
  /**
   * Gets the block number until the account is locked when it's listed for
   * sale.
   *
   * @returns {Number|null}
   */


  get lockedUntilBlock() {
    return this[P_LOCKED_UNTIL_BLOCK];
  }
  /**
   * Gets the price of the account in case its listed.
   *
   * @returns {Currency|null}
   */


  get price() {
    return this[P_PRICE];
  }
  /**
   * Gets the account of the seller in case the account is listed for sale.
   *
   * @returns {AccountNumber|null}
   */


  get sellerAccount() {
    return this[P_SELLER_ACCOUNT];
  }
  /**
   * Gets a flag indicating whether the account is for sale. Attention:
   * null and false = not for sale.
   *
   * @returns {boolean}
   */


  get privateSale() {
    return !!this[P_PRIVATE_SALE];
  }
  /**
   * Gets the new public key in case of a escrow.
   *
   * @returns {PublicKey|null}
   */


  get newPublicKey() {
    return this[P_NEW_ENC_PUBKEY];
  }
  /**
   * Gets a value indicating whether the account is for sale.
   *
   * @returns {boolean}
   */


  isForSale() {
    return this[P_STATE] === Account.STATE_LISTED;
  }

}

module.exports = Account;

/***/ }),

/***/ "./src/Types/Block.js":
/*!****************************!*\
  !*** ./src/Types/Block.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BigNumber = __webpack_require__(/*! bignumber.js */ "../../node_modules/bignumber.js/bignumber.js");

const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const PublicKey = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Keys.PublicKey;

const Currency = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Currency;

const AccountNumber = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountNumber;

const BC = __webpack_require__(/*! @sbx/common */ "@sbx/common").BC;

const P_BLOCK = Symbol('block');
const P_ENC_PUBKEY = Symbol('enc_pubkey');
const P_REWARD = Symbol('reward');
const P_FEE = Symbol('fee');
const P_VER = Symbol('ver');
const P_VER_A = Symbol('ver_a');
const P_TIMESTAMP = Symbol('timestamp');
const P_TARGET = Symbol('target');
const P_NONCE = Symbol('nonce');
const P_PAYLOAD = Symbol('payload');
const P_SBH = Symbol('sbh');
const P_OPH = Symbol('oph');
const P_POW = Symbol('pow');
const P_HASHRATEKHS = Symbol('hashratekhs');
const P_MATURATION = Symbol('maturation');
const P_OPERATIONS = Symbol('operations');
/**
 * Represents a block.
 */

class Block extends Abstract {
  /**
   * Creates a new instance of the Block class.
   *
   * @param {Object} data
   */
  constructor(data) {
    super(data);
    this[P_BLOCK] = parseInt(data.block, 10);
    this[P_ENC_PUBKEY] = PublicKey.decode(BC.fromHex(data.enc_pubkey));
    this[P_REWARD] = new Currency(data.reward);
    this[P_FEE] = new Currency(data.fee);
    this[P_VER] = parseInt(data.ver, 10);
    this[P_VER_A] = parseInt(data.ver_a, 10);
    this[P_TIMESTAMP] = parseInt(data.timestamp, 10);
    this[P_TARGET] = new BigNumber(data.target.toString());
    this[P_NONCE] = new BigNumber(data.nonce.toString());
    this[P_PAYLOAD] = BC.fromString(data.payload);
    this[P_SBH] = BC.fromHex(data.sbh);
    this[P_OPH] = BC.fromHex(data.oph);
    this[P_POW] = BC.fromHex(data.pow);
    this[P_HASHRATEKHS] = new BigNumber(data.hashratekhs.toString());
    this[P_MATURATION] = parseInt(data.maturation, 10);
    this[P_OPERATIONS] = null;

    if (data.operations !== undefined) {
      this[P_OPERATIONS] = parseInt(data.operations, 10);
    }
  }
  /**
   * Gets the number of a block.
   *
   * @returns {Number}
   */


  get block() {
    return this[P_BLOCK];
  }
  /**
   * Gets the public key of the miner of the block.
   *
   * @returns {PublicKey}
   */


  get publicKey() {
    return this[P_ENC_PUBKEY];
  }
  /**
   * Gets the reward.
   *
   * @returns {Currency}
   */


  get reward() {
    return this[P_REWARD];
  }
  /**
   * Gets the collective fee awarded to the miner.
   *
   * @returns {Currency}
   */


  get fee() {
    return this[P_FEE];
  }
  /**
   * Gets the version of the protocol.
   *
   * @returns {Number}
   */


  get ver() {
    return this[P_VER];
  }
  /**
   * Gets the protocol version of the miner.
   *
   * @returns {Number}
   */


  get verA() {
    return this[P_VER_A];
  }
  /**
   * Gets the UTC timestamp of the block.
   *
   * @returns {Number}
   */


  get timestamp() {
    return this[P_TIMESTAMP];
  }
  /**
   * Gets the used target.
   *
   * @returns {BigNumber}
   */


  get target() {
    return this[P_TARGET];
  }
  /**
   * Gets the calculated nonce.
   *
   * @returns {BigNumber}
   */


  get nonce() {
    return this[P_NONCE];
  }
  /**
   * Gets the payload of the miner.
   *
   * @returns {BC}
   */


  get payload() {
    return this[P_PAYLOAD];
  }
  /**
   * Gets the safebox hash.
   *
   * @returns {BC}
   */


  get sbh() {
    return this[P_SBH];
  }
  /**
   * Gets the operation hash.
   *
   * @returns {BC}
   */


  get oph() {
    return this[P_OPH];
  }
  /**
   * Gets the POW.
   *
   * @returns {BC}
   */


  get pow() {
    return this[P_POW];
  }
  /**
   * Gets the hashrate in kh/s.
   *
   * @returns {BigNumber}
   */


  get hashratekhs() {
    return this[P_HASHRATEKHS];
  }
  /**
   * Gets the age of the block in terms of blocks.
   *
   * @returns {Number}
   */


  get maturation() {
    return this[P_MATURATION];
  }
  /**
   * Gets the number of operations in the block.
   *
   * @returns {Number}
   */


  get operations() {
    return this[P_OPERATIONS];
  }
  /**
   * Gets the list of accounts created.
   *
   * @returns {AccountNumber[]}
   */


  get createdAccounts() {
    return [new AccountNumber(this[P_BLOCK] * 5), new AccountNumber(this[P_BLOCK] * 5 + 1), new AccountNumber(this[P_BLOCK] * 5 + 2), new AccountNumber(this[P_BLOCK] * 5 + 3), new AccountNumber(this[P_BLOCK] * 5 + 4)];
  }

}

module.exports = Block;

/***/ }),

/***/ "./src/Types/Changer.js":
/*!******************************!*\
  !*** ./src/Types/Changer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountName;

const Currency = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Currency;

const PublicKey = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Keys.PublicKey;

const BC = __webpack_require__(/*! @sbx/common */ "@sbx/common").BC;

const P_ACCOUNT = Symbol('account');
const P_N_OPERATION = Symbol('nOperation');
const P_NEW_ENC_PUBKEY = Symbol('newPublicKey');
const P_NEW_NAME = Symbol('new_name');
const P_NEW_TYPE = Symbol('new_type');
const P_SELLER_ACCOUNT = Symbol('sellerAccount');
const P_ACCOUNT_PRICE = Symbol('account_price');
const P_LOCKED_UNTIL_BLOCK = Symbol('lockedUntilBlock');
const P_FEE = Symbol('fee');
/**
 * Represents a Changer in an operation.
 */

class Changer extends Abstract {
  /**
   * Creates a new instance of the Changer class.
   *
   * @param {Object} data
   */
  constructor(data) {
    super(data);
    this[P_ACCOUNT] = new AccountNumber(data.account);
    this[P_N_OPERATION] = null;

    if (data.n_operation !== undefined) {
      this[P_N_OPERATION] = parseInt(data.n_operation, 10);
    }

    this[P_NEW_ENC_PUBKEY] = null;

    if (data.new_enc_pubkey !== undefined) {
      this[P_NEW_ENC_PUBKEY] = PublicKey.decode(BC.fromHex(data.new_enc_pubkey));
    }

    this[P_NEW_NAME] = null;

    if (data.new_name !== undefined) {
      this[P_NEW_NAME] = new AccountName(data.new_name);
    }

    this[P_NEW_TYPE] = null;

    if (data.new_type !== undefined) {
      this[P_NEW_TYPE] = data.new_type;
    }

    this[P_SELLER_ACCOUNT] = null;

    if (data.seller_account !== undefined) {
      this[P_SELLER_ACCOUNT] = new AccountNumber(data.seller_account);
    }

    this[P_ACCOUNT_PRICE] = null;

    if (data.account_price !== undefined) {
      this[P_ACCOUNT_PRICE] = new Currency(data.account_price);
    }

    this[P_LOCKED_UNTIL_BLOCK] = null;

    if (data.locked_until_block !== undefined) {
      this[P_LOCKED_UNTIL_BLOCK] = parseInt(data.locked_until_block, 10);
    }

    this[P_FEE] = new Currency(0);

    if (data.fee !== undefined) {
      this[P_FEE] = new Currency(data.fee);
    }
  }
  /**
   * Gets the changed account.
   *
   * @returns {AccountNumber}
   */


  get account() {
    return this[P_ACCOUNT];
  }
  /**
   * Gets the n op of the account.
   *
   * @returns {Number}
   */


  get nOperation() {
    return this[P_N_OPERATION];
  }
  /**
   * Gets the new public key.
   *
   * @returns {PublicKey|null}
   */


  get newPublicKey() {
    return this[P_NEW_ENC_PUBKEY];
  }
  /**
   * Gets the new name.
   *
   * @returns {String|null}
   */


  get newName() {
    return this[P_NEW_NAME];
  }
  /**
   * Gets the new type.
   *
   * @returns {Number|null}
   */


  get newType() {
    return this[P_NEW_TYPE];
  }
  /**
   * Gets the seller account.
   *
   * @returns {AccountNumber|null}
   */


  get sellerAccount() {
    return this[P_SELLER_ACCOUNT];
  }
  /**
   * Gets the sales price of the account.
   *
   * @returns {Currency|null}
   */


  get accountPrice() {
    return this[P_ACCOUNT_PRICE];
  }
  /**
   * Gets the block number until the account is blocked.
   *
   * @returns {Number|null}
   */


  get lockedUntilBlock() {
    return this[P_LOCKED_UNTIL_BLOCK];
  }
  /**
   * Gets the fee for the change operation.
   *
   * @returns {Currency|null}
   */


  get fee() {
    return this[P_FEE];
  }

}

module.exports = Changer;

/***/ }),

/***/ "./src/Types/NetProtocol.js":
/*!**********************************!*\
  !*** ./src/Types/NetProtocol.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const P_VER = Symbol('ver');
const P_VER_A = Symbol('verA');
/**
 * Holds information about a nodes version.
 */

class NetProtocol extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  constructor(data) {
    super(data);
    this[P_VER] = parseInt(data.ver, 10);
    this[P_VER_A] = parseInt(data.ver_a, 10);
  }
  /**
     * Gets the wallets protocol version.
     *
     * @returns {Number}
     */


  get ver() {
    return this[P_VER];
  }
  /**
     * Gets the miners protocol version.
     *
     * @returns {Number}
     */


  get verA() {
    return this[P_VER_A];
  }

}

module.exports = NetProtocol;

/***/ }),

/***/ "./src/Types/NetStats.js":
/*!*******************************!*\
  !*** ./src/Types/NetStats.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const P_BRECEIVED = Symbol('breceived');
const P_SERVERS_T = Symbol('servers_t');
const P_TSERVERS = Symbol('tservers');
const P_TOTAL = Symbol('total');
const P_BSEND = Symbol('bsend');
const P_SERVERS = Symbol('servers');
const P_CLIENTS = Symbol('clients');
const P_ACTIVE = Symbol('active');
const P_TCLIENTS = Symbol('tclients');
/**
 * Class that holds netstats of a node server.
 */

class NetStats extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  constructor(data) {
    super(data);
    this[P_BRECEIVED] = parseInt(data.breceived, 10);
    this[P_SERVERS_T] = parseInt(data.servers_t, 10);
    this[P_TSERVERS] = parseInt(data.tservers, 10);
    this[P_TOTAL] = parseInt(data.total, 10);
    this[P_BSEND] = parseInt(data.bsend, 10);
    this[P_SERVERS] = parseInt(data.servers, 10);
    this[P_CLIENTS] = parseInt(data.clients, 10);
    this[P_ACTIVE] = parseInt(data.active, 10);
    this[P_TCLIENTS] = parseInt(data.tclients, 10);
  }
  /**
     * Gets the received bytes.
     *
     * @returns {Number}
     */


  get breceived() {
    return this[P_BRECEIVED];
  }
  /**
     * Gets the number of server connections
     *
     * @returns {Number}
     */


  get serversT() {
    return this[P_SERVERS_T];
  }
  /**
     * Gets the number of server connections.
     *
     * @returns {Number}
     */


  get tservers() {
    return this[P_TSERVERS];
  }
  /**
     * Gets the number of total connections.
     *
     * @returns {Number}
     */


  get total() {
    return this[P_TOTAL];
  }
  /**
     * Gets the number of bytes sent.
     *
     * @returns {Number}
     */


  get bsend() {
    return this[P_BSEND];
  }
  /**
     * Gets the number of servers that responded.
     *
     * @returns {Number}
     */


  get servers() {
    return this[P_SERVERS];
  }
  /**
     * Gets the number of client connections.
     *
     * @returns {Number}
     */


  get clients() {
    return this[P_CLIENTS];
  }
  /**
     * Gets the number of active connections.
     *
     * @returns {Number}
     */


  get active() {
    return this[P_ACTIVE];
  }
  /**
     * Gets the number of total client connections.
     *
     * @returns {Number}
     */


  get tclients() {
    return this[P_TCLIENTS];
  }

}

module.exports = NetStats;

/***/ }),

/***/ "./src/Types/NodeServer.js":
/*!*********************************!*\
  !*** ./src/Types/NodeServer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const P_PORT = Symbol('port');
const P_LASTCON = Symbol('lastcon');
const P_ATTEMPTS = Symbol('attempts');
const P_IP = Symbol('ip');
/**
 * Holds information about a single node server connection.
 */

class NodeServer extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  constructor(data) {
    super(data);
    this[P_PORT] = parseInt(data.port, 10);
    this[P_LASTCON] = parseInt(data.lastcon, 10);
    this[P_ATTEMPTS] = parseInt(data.attempts, 10);
    this[P_IP] = data.ip;
  }
  /**
     * Gets the port of the server.
     *
     * @returns {Number}
     */


  get port() {
    return this[P_PORT];
  }
  /**
     * Gets the timestamp of the last connection.
     *
     * @returns {Number}
     */


  get lastcon() {
    return this[P_LASTCON];
  }
  /**
     * Gets the number of connection attempts.
     *
     * @returns {Number}
     */


  get attempts() {
    return this[P_ATTEMPTS];
  }
  /**
     * Gets the IP of the node.
     *
     * @returns {String}
     */


  get ip() {
    return this[P_IP];
  }

}

module.exports = NodeServer;

/***/ }),

/***/ "./src/Types/NodeStatus.js":
/*!*********************************!*\
  !*** ./src/Types/NodeStatus.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const BC = __webpack_require__(/*! @sbx/common */ "@sbx/common").BC;

const NetProtocol = __webpack_require__(/*! ./NetProtocol */ "./src/Types/NetProtocol.js");

const NetStats = __webpack_require__(/*! ./NetStats */ "./src/Types/NetStats.js");

const NodeServer = __webpack_require__(/*! ./NodeServer */ "./src/Types/NodeServer.js");

const P_READY = Symbol('ready');
const P_READY_S = Symbol('ready_s');
const P_STATUS_S = Symbol('status_s');
const P_PORT = Symbol('port');
const P_LOCKED = Symbol('locked');
const P_TIMESTAMP = Symbol('timestamp');
const P_BLOCKS = Symbol('blocks');
const P_NODESERVERS = Symbol('nodeservers');
const P_NETSTATS = Symbol('netstats');
const P_VERSION = Symbol('version');
const P_NETPROTOCOL = Symbol('netprotocol');
const P_SBH = Symbol('sbh');
const P_POW = Symbol('pow');
const P_OPENSSL = Symbol('openssl');

class NodeStatus extends Abstract {
  constructor(data) {
    super(data);
    this[P_READY] = !!data.ready;
    this[P_READY_S] = data.ready_s;
    this[P_STATUS_S] = data.status_s;
    this[P_PORT] = parseInt(data.port, 10);
    this[P_LOCKED] = !!data.locked;
    this[P_TIMESTAMP] = parseInt(data.timestamp, 10);
    this[P_BLOCKS] = parseInt(data.blocks, 10);
    this[P_VERSION] = data.version;
    this[P_SBH] = BC.fromHex(data.sbh);
    this[P_POW] = BC.fromHex(data.pow);
    this[P_OPENSSL] = BC.fromHex(data.openssl);
    this[P_NETPROTOCOL] = new NetProtocol(data.netprotocol);
    this[P_NETSTATS] = new NetStats(data.netstats);
    this[P_NODESERVERS] = data.nodeservers.map(ns => new NodeServer(ns));
  }
  /**
     * Gets a flag indicating whether the node is ready.
     *
     * @returns {Boolean}
     */


  get ready() {
    return this[P_READY];
  }
  /**
     * Gets a string explaining the ready status.
     *
     * @returns {String}
     */


  get readyS() {
    return this[P_READY_S];
  }
  /**
     * Gets a string defining the status of the node.
     *
     * @returns {String}
     */


  get statusS() {
    return this[P_STATUS_S];
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


  get locked() {
    return this[P_LOCKED];
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


  get blocks() {
    return this[P_BLOCKS];
  }
  /**
     * Gets the list of nodeservers.
     *
     * @returns {NodeServer[]}
     */


  get nodeservers() {
    return this[P_NODESERVERS];
  }
  /**
     * Gets the netstats
     *
     * @returns {NetStats}
     */


  get netstats() {
    return this[P_NETSTATS];
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


  get netprotocol() {
    return this[P_NETPROTOCOL];
  }
  /**
     * Gets the last safebox hash.
     *
     * @returns {BC}
     */


  get sbh() {
    return this[P_SBH];
  }
  /**
     * Gets the last known POW.
     *
     * @returns {BC}
     */


  get pow() {
    return this[P_POW];
  }
  /**
     * Gets the openssl info.
     *
     * @returns {BC}
     */


  get openssl() {
    return this[P_OPENSSL];
  }

}

module.exports = NodeStatus;

/***/ }),

/***/ "./src/Types/Operation.js":
/*!********************************!*\
  !*** ./src/Types/Operation.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountNumber;

const BC = __webpack_require__(/*! @sbx/common */ "@sbx/common").BC;

const Currency = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Currency;

const OperationHash = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.OperationHash;

const Sender = __webpack_require__(/*! ./Sender */ "./src/Types/Sender.js");

const Receiver = __webpack_require__(/*! ./Receiver */ "./src/Types/Receiver.js");

const Changer = __webpack_require__(/*! ./Changer */ "./src/Types/Changer.js");

const P_VALID = Symbol('valid');
const P_ERRORS = Symbol('errors');
const P_BLOCK = Symbol('block');
const P_TIME = Symbol('time');
const P_OPBLOCK = Symbol('opblock');
const P_PAYLOAD = Symbol('payload');
const P_MATURATION = Symbol('maturation');
const P_OPTYPE = Symbol('optype');
const P_ACCOUNT = Symbol('account');
const P_OPTXT = Symbol('optxt');
const P_AMOUNT = Symbol('amount');
const P_FEE = Symbol('fee');
const P_BALANCE = Symbol('balance');
const P_OPHASH = Symbol('ophash');
const P_OLD_OPHASH = Symbol('old_ophash');
const P_SUBTYPE = Symbol('subtype');
const P_SIGNER_ACCOUNT = Symbol('signer_account');
const P_CHANGERS = Symbol('changers');
const P_SENDERS = Symbol('senders');
const P_RECEIVERS = Symbol('receivers');
/**
 * A class thats holds the information about an operation.
 */

class Operation extends Abstract {
  // The available optypes
  static get BLOCKCHAIN_REWARD() {
    return 0;
  }

  static get TRANSACTION() {
    return 1;
  }

  static get CHANGE_KEY() {
    return 2;
  }

  static get RECOVER_FUNDS() {
    return 3;
  }

  static get LIST_FOR_SALE() {
    return 4;
  }

  static get DELIST() {
    return 5;
  }

  static get BUY() {
    return 6;
  }

  static get CHANGE_KEY_ACCOUNT() {
    return 7;
  }

  static get CHANGE_ACCOUNT_INFO() {
    return 8;
  }

  static get MULTI_OPERATION() {
    return 9;
  }

  static get DATA() {
    return 10;
  }
  /**
   * Creates a new Operation instance from an rpc response.
   *
   * @param {Object} data
   */


  constructor(data) {
    super(data);
    this[P_VALID] = true;

    if (data.valid !== undefined) {
      this[P_VALID] = !!data.valid;
    }

    this[P_ERRORS] = null;

    if (data.errors !== undefined) {
      this[P_ERRORS] = data.errors;
    }

    if (data.payload !== undefined) {
      this[P_PAYLOAD] = BC.fromHex(data.payload);
    } else {
      this[P_PAYLOAD] = BC.fromHex('');
    }

    this[P_BLOCK] = parseInt(data.block, 10);
    this[P_TIME] = parseInt(data.time, 10);
    this[P_OPBLOCK] = parseInt(data.opblock, 10);
    this[P_MATURATION] = 0; // pending

    if (data.maturation !== null) {
      this[P_MATURATION] = parseInt(data.maturation, 10);
    }

    this[P_OPTYPE] = parseInt(data.optype, 10); // multi-op

    this[P_ACCOUNT] = null;

    if (data.account !== undefined) {
      this[P_ACCOUNT] = new AccountNumber(data.account);
    }

    this[P_OPTXT] = data.optxt;
    this[P_AMOUNT] = new Currency(data.amount);
    this[P_FEE] = new Currency(data.fee);
    this[P_BALANCE] = null;

    if (data.balance !== undefined) {
      this[P_BALANCE] = new Currency(data.balance);
    }

    this[P_OPHASH] = null;

    if (data.ophash !== undefined) {
      this[P_OPHASH] = BC.fromHex(data.ophash);

      if (this[P_OPTYPE] !== Operation.BLOCKCHAIN_REWARD) {
        this[P_OPHASH] = OperationHash.decode(BC.fromHex(data.ophash));
      }
    }

    this[P_OLD_OPHASH] = null;

    if (data.old_ophash !== undefined) {
      this[P_OLD_OPHASH] = BC.fromHex(data.old_ophash);
    }

    this[P_SUBTYPE] = data.subtype;
    this[P_SIGNER_ACCOUNT] = null;

    if (data.signer_account !== undefined) {
      this[P_SIGNER_ACCOUNT] = new AccountNumber(data.signer_account);
    } // eslint-disable-next-line no-multi-assign


    this[P_SENDERS] = [];
    this[P_RECEIVERS] = [];
    this[P_CHANGERS] = []; // loop given data and initialize objects

    data.senders.forEach(s => this[P_SENDERS].push(new Sender(s)));
    data.receivers.forEach(r => this[P_RECEIVERS].push(new Receiver(r)));
    data.changers.forEach(c => this[P_CHANGERS].push(new Changer(c)));
  }
  /**
   * Gets an indicator whether the operation was valid.
   *
   * @returns {Boolean}
   */


  get valid() {
    return this[P_VALID];
  }
  /**
   * If the operation is invalid you'll get the error message.
   *
   * @returns {String|null}
   */


  get errors() {
    return this[P_ERRORS];
  }
  /**
   * Gets the block that is associated with the operation.
   *
   * @returns {Number}
   */


  get block() {
    return this[P_BLOCK];
  }
  /**
   * Gets the time of the operation.
   *
   * @returns {Number}
   */


  get time() {
    return this[P_TIME];
  }
  /**
   * Gets the position inside a block.
   *
   * @returns {Number}
   */


  get opblock() {
    return this[P_OPBLOCK];
  }
  /**
   * Gets the age in blocks of the operation.
   *
   * @returns {Number}
   */


  get maturation() {
    return this[P_MATURATION];
  }
  /**
   * Gets the type of the operation.
   *
   * @returns {Number}
   */


  get opType() {
    return this[P_OPTYPE];
  }
  /**
   * Gets the account.
   *
   * @returns {AccountNumber}
   */


  get account() {
    return this[P_ACCOUNT];
  }
  /**
   * Gets a textual representation of the operation.
   *
   * @returns {String}
   */


  get opTxt() {
    return this[P_OPTXT];
  }
  /**
   * Gets the amount.
   *
   * @returns {Currency}
   */


  get amount() {
    return this[P_AMOUNT];
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
   * Gets the balance of the account.
   *
   * @returns {Number}
   */


  get balance() {
    return this[P_BALANCE];
  }
  /**
   * Gets the operation hash.
   *
   * @returns {OperationHash}
   */


  get opHash() {
    return this[P_OPHASH];
  }
  /**
   * Gets the <= V2 operation Hash.
   *
   * @returns {BC|null}
   */


  get oldOpHash() {
    return this[P_OLD_OPHASH];
  }
  /**
   * Gets the subtype.
   *
   * @returns {String}
   */


  get subtype() {
    return this[P_SUBTYPE];
  }
  /**
   * Gets the signer account number.
   *
   * @returns {AccountNumber|null}
   */


  get signerAccount() {
    return this[P_SIGNER_ACCOUNT];
  }
  /**
   * Gets the payload.
   *
   * @returns {BC}
   */


  get payload() {
    return this[P_PAYLOAD];
  }
  /**
   * Gets the list of changers.
   *
   * @returns {Changer[]}
   */


  get changers() {
    return this[P_CHANGERS];
  }
  /**
   * Gets the list of senders.
   *
   * @returns {Sender[]}
   */


  get senders() {
    return this[P_SENDERS];
  }
  /**
   * Gets the list of receivers.
   *
   * @returns {Receiver[]}
   */


  get receivers() {
    return this[P_RECEIVERS];
  }
  /**
   * Gets a value indicating whether the operation is a BLOCKCHAIN_REWARD operation.
   *
   * @returns {boolean}
   */


  isBlockchainReward() {
    return this[P_OPTYPE] === Operation.BLOCKCHAIN_REWARD;
  }
  /**
   * Gets a value indicating whether the operation is a TRANSACTION operation.
   *
   * @returns {boolean}
   */


  isTransaction() {
    return this[P_OPTYPE] === Operation.TRANSACTION;
  }
  /**
   * Gets a value indicating whether the operation is a CHANGE_KEY operation.
   *
   * @returns {boolean}
   */


  isChangeKey() {
    return this[P_OPTYPE] === Operation.CHANGE_KEY;
  }
  /**
   * Gets a value indicating whether the operation is a RECOVER_FUNDS operation.
   *
   * @returns {boolean}
   */


  isRecoverFunds() {
    return this[P_OPTYPE] === Operation.RECOVER_FUNDS;
  }
  /**
   * Gets a value indicating whether the operation is a LIST_FOR_SALE operation.
   *
   * @returns {boolean}
   */


  isListForSale() {
    return this[P_OPTYPE] === Operation.LIST_FOR_SALE;
  }
  /**
   * Gets a value indicating whether the operation is a DELIST operation.
   *
   * @returns {boolean}
   */


  isDelist() {
    return this[P_OPTYPE] === Operation.DELIST;
  }
  /**
   * Gets a value indicating whether the operation is a BUY operation.
   *
   * @returns {boolean}
   */


  isBuy() {
    return this[P_OPTYPE] === Operation.BUY;
  }
  /**
   * Gets a value indicating whether the operation is a CHANGE_KEY_ACCOUNT operation.
   *
   * @returns {boolean}
   */


  isChangeKeyAccount() {
    return this[P_OPTYPE] === Operation.CHANGE_KEY_ACCOUNT;
  }
  /**
   * Gets a value indicating whether the operation is a CHANGE_ACCOUNT_INFO operation.
   *
   * @returns {boolean}
   */


  isChangeAccountInfo() {
    return this[P_OPTYPE] === Operation.CHANGE_ACCOUNT_INFO;
  }
  /**
   * Gets a value indicating whether the operation is a MULTI_OPERATION operation.
   *
   * @returns {boolean}
   */


  isMultiOperation() {
    return this[P_OPTYPE] === Operation.MULTI_OPERATION;
  }
  /**
   * Gets a value indicating whether the operation is a DATA operation.
   *
   * @returns {boolean}
   */


  isData() {
    return this[P_OPTYPE] === Operation.DATA;
  }
  /**
   * Gets a value indicating whether the op is pending.
   *
   * @returns {boolean}
   */


  isPending() {
    return this[P_BLOCK] === 0;
  }
  /**
   * Gets a value indicating whether the operation was not executed because of
   * fees.
   *
   * @returns {boolean}
   */


  isZeroFeeError() {
    return this.valid === false && this[P_ERRORS].indexOf('zero fee operations per block') > -1;
  }

}

module.exports = Operation;

/***/ }),

/***/ "./src/Types/RawOperations.js":
/*!************************************!*\
  !*** ./src/Types/RawOperations.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Currency = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Currency;

const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const BC = __webpack_require__(/*! @sbx/common */ "@sbx/common").BC;

const P_OPERATIONS = Symbol('operations');
const P_AMOUNT = Symbol('amount');
const P_FEE = Symbol('fee');
const P_RAWOPERATIONS = Symbol('rawoperations');

class RawOperations extends Abstract {
  constructor(data) {
    super(data);
    this[P_OPERATIONS] = parseInt(data.operations, 10);
    this[P_AMOUNT] = new Currency(data.amount);
    this[P_FEE] = new Currency(data.fee);
    this[P_RAWOPERATIONS] = BC.fromHex(data.rawoperations);
  }
  /**
     * Gets the number of operations in this object.
     *
     * @returns {Number}
     */


  get operations() {
    return this[P_OPERATIONS];
  }
  /**
     * Gets the accumulated amount of all operations.
     *
     * @returns {Currency}
     */


  get amount() {
    return this[P_AMOUNT];
  }
  /**
     * Gets the accumulated amount of all operations.
     *
     * @returns {Currency}
     */


  get fee() {
    return this[P_FEE];
  }
  /**
     * Gets the raw operations info.
     *
     * @returns {BC}
     */


  get rawoperations() {
    return this[P_RAWOPERATIONS];
  }

}

module.exports = RawOperations;

/***/ }),

/***/ "./src/Types/Receiver.js":
/*!*******************************!*\
  !*** ./src/Types/Receiver.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountNumber;

const Currency = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Currency;

const BC = __webpack_require__(/*! @sbx/common */ "@sbx/common").BC;

const P_ACCOUNT = Symbol('account');
const P_AMOUNT = Symbol('amount');
const P_PAYLOAD = Symbol('payload');
/**
 * Represents a receiver in an operation.
 */

class Receiver extends Abstract {
  /**
   * Creates a new instance of the Receiver class.
   *
   * @param {Object} data
   */
  constructor(data) {
    super(data);
    this[P_ACCOUNT] = new AccountNumber(data.account);
    this[P_AMOUNT] = new Currency(data.amount);
    this[P_PAYLOAD] = BC.fromHex(data.payload);
  }
  /**
   * Gets the account of the receiver.
   *
   * @returns {AccountNumber}
   */


  get account() {
    return this[P_ACCOUNT];
  }
  /**
   * Gets the amount.
   *
   * @returns {Currency}
   */


  get amount() {
    return this[P_AMOUNT];
  }
  /**
   * Gets the payload.
   *
   * @returns {BC}
   */


  get payload() {
    return this[P_PAYLOAD];
  }

}

module.exports = Receiver;

/***/ }),

/***/ "./src/Types/Sender.js":
/*!*****************************!*\
  !*** ./src/Types/Sender.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.AccountNumber;

const Currency = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Currency;

const BC = __webpack_require__(/*! @sbx/common */ "@sbx/common").BC;

const P_ACCOUNT = Symbol('account');
const P_AMOUNT = Symbol('amount');
const P_PAYLOAD = Symbol('payload');
const P_N_OPERATION = Symbol('nOperation');
/**
 * Represents a sender in an operation.
 */

class Sender extends Abstract {
  /**
   * Creates a new instance of the Sender class.
   *
   * @param {Object} data
   */
  constructor(data) {
    super(data);
    this[P_N_OPERATION] = parseInt(data.n_operation, 10);
    this[P_ACCOUNT] = new AccountNumber(data.account);
    this[P_AMOUNT] = new Currency(data.amount);
    this[P_PAYLOAD] = BC.fromHex(data.payload);
  }
  /**
   * Gets the n operation of thwe sender.
   *
   * @returns {Number}
   */


  get nOperation() {
    return this[P_N_OPERATION];
  }
  /**
   * Gets the account of the sender.
   *
   * @returns {AccountNumber}
   */


  get account() {
    return this[P_ACCOUNT];
  }
  /**
   * Gets the amount.
   *
   * @returns {Currency}
   */


  get amount() {
    return this[P_AMOUNT];
  }
  /**
   * Gets the payload.
   *
   * @returns {BC}
   */


  get payload() {
    return this[P_PAYLOAD];
  }

}

module.exports = Sender;

/***/ }),

/***/ "./src/Types/WalletPublicKey.js":
/*!**************************************!*\
  !*** ./src/Types/WalletPublicKey.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const BC = __webpack_require__(/*! @sbx/common */ "@sbx/common").BC;

const Curve = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Keys.Curve;

const PublicKey = __webpack_require__(/*! @sbx/common */ "@sbx/common").Types.Keys.PublicKey;

const P_NAME = Symbol('block');
const P_ENC_PUBKEY = Symbol('publicKey');
const P_CAN_USE = Symbol('can_user');
const P_B58_PUBKEY = Symbol('b58_pubkey');
const P_EC_NID = Symbol('ec_nid');
const P_X = Symbol('x');
const P_Y = Symbol('y');
/**
 * Holds information about a public key in the wallet (fetched via rpc).
 */

class WalletPublicKey extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  constructor(data) {
    super(data);
    this[P_NAME] = data.name;
    this[P_ENC_PUBKEY] = PublicKey.decode(BC.fromHex(data.publicKey));
    this[P_CAN_USE] = !!data.can_use;
    this[P_B58_PUBKEY] = null;
    this[P_EC_NID] = null;
    this[P_X] = null;
    this[P_Y] = null;

    if (data.b58_pubkey !== undefined) {
      this[P_B58_PUBKEY] = data.b58_pubkey;
    }

    if (data.ec_nid !== undefined) {
      this[P_EC_NID] = new Curve(parseInt(data.ec_nid, 10));
    }

    if (data.x !== undefined) {
      this[P_X] = BC.fromHex(data.x);
    }

    if (data.y !== undefined) {
      this[P_Y] = BC.fromHex(data.y);
    }
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
    return this[P_ENC_PUBKEY];
  }
  /**
     * Gets a flag indicating whether the key can be used.
     *
     * @returns {Boolean}
     */


  get canUse() {
    return this[P_CAN_USE];
  }
  /**
     * Gets the base58 public key if returned by the node.
     *
     * @returns {String|null}
     */


  get base58PublicKey() {
    return this[P_B58_PUBKEY];
  }
  /**
     * Gets the used curve if returned by the node.
     *
     * @returns {Curve|null}
     */


  get ecNid() {
    return this[P_EC_NID];
  }
  /**
     * Gets the X value of the key if returned by the node.
     *
     * @returns {BC|null}
     */


  get x() {
    return this[P_X];
  }
  /**
     * Gets the Y value of the key if returned by the node.
     *
     * @returns {BC|null}
     */


  get y() {
    return this[P_Y];
  }

}

module.exports = WalletPublicKey;

/***/ }),

/***/ "./src/Types/index.js":
/*!****************************!*\
  !*** ./src/Types/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Account: __webpack_require__(/*! ./Account */ "./src/Types/Account.js"),
  Block: __webpack_require__(/*! ./Block */ "./src/Types/Block.js"),
  NodeStatus: __webpack_require__(/*! ./NodeStatus */ "./src/Types/NodeStatus.js"),
  NetStats: __webpack_require__(/*! ./NetStats */ "./src/Types/NetStats.js"),
  NetProtocol: __webpack_require__(/*! ./NetProtocol */ "./src/Types/NetProtocol.js"),
  NodeServer: __webpack_require__(/*! ./NodeServer */ "./src/Types/NodeServer.js"),
  Operation: __webpack_require__(/*! ./Operation */ "./src/Types/Operation.js"),
  Changer: __webpack_require__(/*! ./Changer */ "./src/Types/Changer.js"),
  Receiver: __webpack_require__(/*! ./Receiver */ "./src/Types/Receiver.js"),
  Sender: __webpack_require__(/*! ./Sender */ "./src/Types/Sender.js"),
  RawOperations: __webpack_require__(/*! ./RawOperations */ "./src/Types/RawOperations.js"),
  WalletPublicKey: __webpack_require__(/*! ./WalletPublicKey */ "./src/Types/WalletPublicKey.js")
};

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ben/Code/crypto/pascalcoin/untitled/packages/json-rpc/index.js */"./index.js");


/***/ }),

/***/ "@sbx/common":
/*!******************************!*\
  !*** external "@sbx/common" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__sbx_common__;

/***/ })

/******/ });
});
//# sourceMappingURL=json-rpc.light.js.map