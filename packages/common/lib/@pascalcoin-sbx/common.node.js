(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@pascalcoin-sbx/common", [], factory);
	else if(typeof exports === 'object')
		exports["@pascalcoin-sbx/common"] = factory();
	else
		root["@pascalcoin-sbx/common"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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

/***/ "../../node_modules/base-x/src/index.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/base-x/src/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
// @ts-ignore
var _Buffer = __webpack_require__(/*! safe-buffer */ "../../node_modules/safe-buffer/index.js").Buffer
function base (ALPHABET) {
  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }
  var BASE_MAP = new Uint8Array(256)
  BASE_MAP.fill(255)
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i)
    var xc = x.charCodeAt(0)
    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }
    BASE_MAP[xc] = i
  }
  var BASE = ALPHABET.length
  var LEADER = ALPHABET.charAt(0)
  var FACTOR = Math.log(BASE) / Math.log(256) // log(BASE) / log(256), rounded up
  var iFACTOR = Math.log(256) / Math.log(BASE) // log(256) / log(BASE), rounded up
  function encode (source) {
    if (!_Buffer.isBuffer(source)) { throw new TypeError('Expected Buffer') }
    if (source.length === 0) { return '' }
        // Skip & count leading zeroes.
    var zeroes = 0
    var length = 0
    var pbegin = 0
    var pend = source.length
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++
      zeroes++
    }
        // Allocate enough space in big-endian base58 representation.
    var size = ((pend - pbegin) * iFACTOR + 1) >>> 0
    var b58 = new Uint8Array(size)
        // Process the bytes.
    while (pbegin !== pend) {
      var carry = source[pbegin]
            // Apply "b58 = b58 * 256 + ch".
      var i = 0
      for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
        carry += (256 * b58[it1]) >>> 0
        b58[it1] = (carry % BASE) >>> 0
        carry = (carry / BASE) >>> 0
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i
      pbegin++
    }
        // Skip leading zeroes in base58 result.
    var it2 = size - length
    while (it2 !== size && b58[it2] === 0) {
      it2++
    }
        // Translate the result into a string.
    var str = LEADER.repeat(zeroes)
    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]) }
    return str
  }
  function decodeUnsafe (source) {
    if (typeof source !== 'string') { throw new TypeError('Expected String') }
    if (source.length === 0) { return _Buffer.alloc(0) }
    var psz = 0
        // Skip leading spaces.
    if (source[psz] === ' ') { return }
        // Skip and count leading '1's.
    var zeroes = 0
    var length = 0
    while (source[psz] === LEADER) {
      zeroes++
      psz++
    }
        // Allocate enough space in big-endian base256 representation.
    var size = (((source.length - psz) * FACTOR) + 1) >>> 0 // log(58) / log(256), rounded up.
    var b256 = new Uint8Array(size)
        // Process the characters.
    while (source[psz]) {
            // Decode character
      var carry = BASE_MAP[source.charCodeAt(psz)]
            // Invalid character
      if (carry === 255) { return }
      var i = 0
      for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
        carry += (BASE * b256[it3]) >>> 0
        b256[it3] = (carry % 256) >>> 0
        carry = (carry / 256) >>> 0
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i
      psz++
    }
        // Skip trailing spaces.
    if (source[psz] === ' ') { return }
        // Skip leading zeroes in b256.
    var it4 = size - length
    while (it4 !== size && b256[it4] === 0) {
      it4++
    }
    var vch = _Buffer.allocUnsafe(zeroes + (size - it4))
    vch.fill(0x00, 0, zeroes)
    var j = zeroes
    while (it4 !== size) {
      vch[j++] = b256[it4++]
    }
    return vch
  }
  function decode (string) {
    var buffer = decodeUnsafe(string)
    if (buffer) { return buffer }
    throw new Error('Non-base' + BASE + ' character')
  }
  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}
module.exports = base


/***/ }),

/***/ "../../node_modules/bn.js/lib/bn.js":
/*!******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/bn.js/lib/bn.js ***!
  \******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
  'use strict';

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    Buffer = __webpack_require__(/*! buffer */ "buffer").Buffer;
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
    }

    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }

    if (number[0] === '-') {
      this.negative = 1;
    }

    this.strip();

    if (endian !== 'le') return;

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };

  function parseHex (str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r <<= 4;

      // 'a' - 'f'
      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa;

      // 'A' - 'F'
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa;

      // '0' - '9'
      } else {
        r |= c & 0xf;
      }
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    // Scan 24-bit chunks and add them to the number
    var off = 0;
    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    }
    this.strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        r += c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa;

      // '0' - '9'
      } else {
        r += c;
      }
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [ 0 ];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);

    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this.strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this.strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this.strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion

  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  };

  // Returns binary-reversed representation of `x`
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;

    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }

    return rb;
  };

  // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;

      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];

          var ro = rtws[p + j + s];
          var io = itws[p + j + s];

          var rx = rtwdf_ * ro - itwdf_ * io;

          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;

          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;

          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;

          /* jshint maxdepth : false */
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];

      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;

      t = iws[i];

      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;

      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);

      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }

    // Pad with zeroes
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);

    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);

    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);

    var rmws = out.words;
    rmws.length = N;

    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);

    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);

    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) {
      // No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this.strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      r.strip();
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})( false || module, this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "../../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../../node_modules/bs58/index.js":
/*!****************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/bs58/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var basex = __webpack_require__(/*! base-x */ "../../node_modules/base-x/src/index.js")
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

module.exports = basex(ALPHABET)


/***/ }),

/***/ "../../node_modules/mipher/dist/aes.js":
/*!*********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/aes.js ***!
  \*********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2007-2018, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief AES-128/192/256 encryption (Rijndael) implementation
// This implementation is inspired by Fritz Schneider's Rijndael Reference Implementation
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
var blockmode_1 = __webpack_require__(/*! ./blockmode */ "../../node_modules/mipher/dist/blockmode.js");
var padding_1 = __webpack_require__(/*! ./padding */ "../../node_modules/mipher/dist/padding.js");
/**
 * AES class
 */
var AES = /** @class */ (function () {
    /**
     * AES ctor
     */
    function AES() {
        // defines the block size in bytes. AES uses a fixed block size of 128 bits
        this.blockSize = 16;
        this.keylen = {
            16: { rounds: 10, kc: 4 },
            24: { rounds: 12, kc: 6 },
            32: { rounds: 14, kc: 8 }
        };
        // round constants used in subkey expansion
        this.Rcon = new Uint8Array([
            0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91
        ]);
        // precomputed lookup table for the SBox
        this.S = new Uint8Array([
            99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164,
            114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226,
            235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203,
            190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245,
            188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42,
            144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109,
            141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62,
            181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223,
            140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22
        ]);
        // precomputed lookup table for the inverse SBox
        this.S5 = new Uint8Array([
            82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222,
            233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73,
            109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21,
            70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2,
            193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173,
            53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75,
            198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81,
            127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97,
            23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125
        ]);
        this.T1 = new Uint32Array([
            0xa56363c6, 0x847c7cf8, 0x997777ee, 0x8d7b7bf6, 0x0df2f2ff, 0xbd6b6bd6, 0xb16f6fde, 0x54c5c591, 0x50303060, 0x03010102, 0xa96767ce, 0x7d2b2b56, 0x19fefee7, 0x62d7d7b5, 0xe6abab4d, 0x9a7676ec,
            0x45caca8f, 0x9d82821f, 0x40c9c989, 0x877d7dfa, 0x15fafaef, 0xeb5959b2, 0xc947478e, 0x0bf0f0fb, 0xecadad41, 0x67d4d4b3, 0xfda2a25f, 0xeaafaf45, 0xbf9c9c23, 0xf7a4a453, 0x967272e4, 0x5bc0c09b,
            0xc2b7b775, 0x1cfdfde1, 0xae93933d, 0x6a26264c, 0x5a36366c, 0x413f3f7e, 0x02f7f7f5, 0x4fcccc83, 0x5c343468, 0xf4a5a551, 0x34e5e5d1, 0x08f1f1f9, 0x937171e2, 0x73d8d8ab, 0x53313162, 0x3f15152a,
            0x0c040408, 0x52c7c795, 0x65232346, 0x5ec3c39d, 0x28181830, 0xa1969637, 0x0f05050a, 0xb59a9a2f, 0x0907070e, 0x36121224, 0x9b80801b, 0x3de2e2df, 0x26ebebcd, 0x6927274e, 0xcdb2b27f, 0x9f7575ea,
            0x1b090912, 0x9e83831d, 0x742c2c58, 0x2e1a1a34, 0x2d1b1b36, 0xb26e6edc, 0xee5a5ab4, 0xfba0a05b, 0xf65252a4, 0x4d3b3b76, 0x61d6d6b7, 0xceb3b37d, 0x7b292952, 0x3ee3e3dd, 0x712f2f5e, 0x97848413,
            0xf55353a6, 0x68d1d1b9, 0x00000000, 0x2cededc1, 0x60202040, 0x1ffcfce3, 0xc8b1b179, 0xed5b5bb6, 0xbe6a6ad4, 0x46cbcb8d, 0xd9bebe67, 0x4b393972, 0xde4a4a94, 0xd44c4c98, 0xe85858b0, 0x4acfcf85,
            0x6bd0d0bb, 0x2aefefc5, 0xe5aaaa4f, 0x16fbfbed, 0xc5434386, 0xd74d4d9a, 0x55333366, 0x94858511, 0xcf45458a, 0x10f9f9e9, 0x06020204, 0x817f7ffe, 0xf05050a0, 0x443c3c78, 0xba9f9f25, 0xe3a8a84b,
            0xf35151a2, 0xfea3a35d, 0xc0404080, 0x8a8f8f05, 0xad92923f, 0xbc9d9d21, 0x48383870, 0x04f5f5f1, 0xdfbcbc63, 0xc1b6b677, 0x75dadaaf, 0x63212142, 0x30101020, 0x1affffe5, 0x0ef3f3fd, 0x6dd2d2bf,
            0x4ccdcd81, 0x140c0c18, 0x35131326, 0x2fececc3, 0xe15f5fbe, 0xa2979735, 0xcc444488, 0x3917172e, 0x57c4c493, 0xf2a7a755, 0x827e7efc, 0x473d3d7a, 0xac6464c8, 0xe75d5dba, 0x2b191932, 0x957373e6,
            0xa06060c0, 0x98818119, 0xd14f4f9e, 0x7fdcdca3, 0x66222244, 0x7e2a2a54, 0xab90903b, 0x8388880b, 0xca46468c, 0x29eeeec7, 0xd3b8b86b, 0x3c141428, 0x79dedea7, 0xe25e5ebc, 0x1d0b0b16, 0x76dbdbad,
            0x3be0e0db, 0x56323264, 0x4e3a3a74, 0x1e0a0a14, 0xdb494992, 0x0a06060c, 0x6c242448, 0xe45c5cb8, 0x5dc2c29f, 0x6ed3d3bd, 0xefacac43, 0xa66262c4, 0xa8919139, 0xa4959531, 0x37e4e4d3, 0x8b7979f2,
            0x32e7e7d5, 0x43c8c88b, 0x5937376e, 0xb76d6dda, 0x8c8d8d01, 0x64d5d5b1, 0xd24e4e9c, 0xe0a9a949, 0xb46c6cd8, 0xfa5656ac, 0x07f4f4f3, 0x25eaeacf, 0xaf6565ca, 0x8e7a7af4, 0xe9aeae47, 0x18080810,
            0xd5baba6f, 0x887878f0, 0x6f25254a, 0x722e2e5c, 0x241c1c38, 0xf1a6a657, 0xc7b4b473, 0x51c6c697, 0x23e8e8cb, 0x7cdddda1, 0x9c7474e8, 0x211f1f3e, 0xdd4b4b96, 0xdcbdbd61, 0x868b8b0d, 0x858a8a0f,
            0x907070e0, 0x423e3e7c, 0xc4b5b571, 0xaa6666cc, 0xd8484890, 0x05030306, 0x01f6f6f7, 0x120e0e1c, 0xa36161c2, 0x5f35356a, 0xf95757ae, 0xd0b9b969, 0x91868617, 0x58c1c199, 0x271d1d3a, 0xb99e9e27,
            0x38e1e1d9, 0x13f8f8eb, 0xb398982b, 0x33111122, 0xbb6969d2, 0x70d9d9a9, 0x898e8e07, 0xa7949433, 0xb69b9b2d, 0x221e1e3c, 0x92878715, 0x20e9e9c9, 0x49cece87, 0xff5555aa, 0x78282850, 0x7adfdfa5,
            0x8f8c8c03, 0xf8a1a159, 0x80898909, 0x170d0d1a, 0xdabfbf65, 0x31e6e6d7, 0xc6424284, 0xb86868d0, 0xc3414182, 0xb0999929, 0x772d2d5a, 0x110f0f1e, 0xcbb0b07b, 0xfc5454a8, 0xd6bbbb6d, 0x3a16162c
        ]);
        this.T2 = new Uint32Array([
            0x6363c6a5, 0x7c7cf884, 0x7777ee99, 0x7b7bf68d, 0xf2f2ff0d, 0x6b6bd6bd, 0x6f6fdeb1, 0xc5c59154, 0x30306050, 0x01010203, 0x6767cea9, 0x2b2b567d, 0xfefee719, 0xd7d7b562, 0xabab4de6, 0x7676ec9a,
            0xcaca8f45, 0x82821f9d, 0xc9c98940, 0x7d7dfa87, 0xfafaef15, 0x5959b2eb, 0x47478ec9, 0xf0f0fb0b, 0xadad41ec, 0xd4d4b367, 0xa2a25ffd, 0xafaf45ea, 0x9c9c23bf, 0xa4a453f7, 0x7272e496, 0xc0c09b5b,
            0xb7b775c2, 0xfdfde11c, 0x93933dae, 0x26264c6a, 0x36366c5a, 0x3f3f7e41, 0xf7f7f502, 0xcccc834f, 0x3434685c, 0xa5a551f4, 0xe5e5d134, 0xf1f1f908, 0x7171e293, 0xd8d8ab73, 0x31316253, 0x15152a3f,
            0x0404080c, 0xc7c79552, 0x23234665, 0xc3c39d5e, 0x18183028, 0x969637a1, 0x05050a0f, 0x9a9a2fb5, 0x07070e09, 0x12122436, 0x80801b9b, 0xe2e2df3d, 0xebebcd26, 0x27274e69, 0xb2b27fcd, 0x7575ea9f,
            0x0909121b, 0x83831d9e, 0x2c2c5874, 0x1a1a342e, 0x1b1b362d, 0x6e6edcb2, 0x5a5ab4ee, 0xa0a05bfb, 0x5252a4f6, 0x3b3b764d, 0xd6d6b761, 0xb3b37dce, 0x2929527b, 0xe3e3dd3e, 0x2f2f5e71, 0x84841397,
            0x5353a6f5, 0xd1d1b968, 0x00000000, 0xededc12c, 0x20204060, 0xfcfce31f, 0xb1b179c8, 0x5b5bb6ed, 0x6a6ad4be, 0xcbcb8d46, 0xbebe67d9, 0x3939724b, 0x4a4a94de, 0x4c4c98d4, 0x5858b0e8, 0xcfcf854a,
            0xd0d0bb6b, 0xefefc52a, 0xaaaa4fe5, 0xfbfbed16, 0x434386c5, 0x4d4d9ad7, 0x33336655, 0x85851194, 0x45458acf, 0xf9f9e910, 0x02020406, 0x7f7ffe81, 0x5050a0f0, 0x3c3c7844, 0x9f9f25ba, 0xa8a84be3,
            0x5151a2f3, 0xa3a35dfe, 0x404080c0, 0x8f8f058a, 0x92923fad, 0x9d9d21bc, 0x38387048, 0xf5f5f104, 0xbcbc63df, 0xb6b677c1, 0xdadaaf75, 0x21214263, 0x10102030, 0xffffe51a, 0xf3f3fd0e, 0xd2d2bf6d,
            0xcdcd814c, 0x0c0c1814, 0x13132635, 0xececc32f, 0x5f5fbee1, 0x979735a2, 0x444488cc, 0x17172e39, 0xc4c49357, 0xa7a755f2, 0x7e7efc82, 0x3d3d7a47, 0x6464c8ac, 0x5d5dbae7, 0x1919322b, 0x7373e695,
            0x6060c0a0, 0x81811998, 0x4f4f9ed1, 0xdcdca37f, 0x22224466, 0x2a2a547e, 0x90903bab, 0x88880b83, 0x46468cca, 0xeeeec729, 0xb8b86bd3, 0x1414283c, 0xdedea779, 0x5e5ebce2, 0x0b0b161d, 0xdbdbad76,
            0xe0e0db3b, 0x32326456, 0x3a3a744e, 0x0a0a141e, 0x494992db, 0x06060c0a, 0x2424486c, 0x5c5cb8e4, 0xc2c29f5d, 0xd3d3bd6e, 0xacac43ef, 0x6262c4a6, 0x919139a8, 0x959531a4, 0xe4e4d337, 0x7979f28b,
            0xe7e7d532, 0xc8c88b43, 0x37376e59, 0x6d6ddab7, 0x8d8d018c, 0xd5d5b164, 0x4e4e9cd2, 0xa9a949e0, 0x6c6cd8b4, 0x5656acfa, 0xf4f4f307, 0xeaeacf25, 0x6565caaf, 0x7a7af48e, 0xaeae47e9, 0x08081018,
            0xbaba6fd5, 0x7878f088, 0x25254a6f, 0x2e2e5c72, 0x1c1c3824, 0xa6a657f1, 0xb4b473c7, 0xc6c69751, 0xe8e8cb23, 0xdddda17c, 0x7474e89c, 0x1f1f3e21, 0x4b4b96dd, 0xbdbd61dc, 0x8b8b0d86, 0x8a8a0f85,
            0x7070e090, 0x3e3e7c42, 0xb5b571c4, 0x6666ccaa, 0x484890d8, 0x03030605, 0xf6f6f701, 0x0e0e1c12, 0x6161c2a3, 0x35356a5f, 0x5757aef9, 0xb9b969d0, 0x86861791, 0xc1c19958, 0x1d1d3a27, 0x9e9e27b9,
            0xe1e1d938, 0xf8f8eb13, 0x98982bb3, 0x11112233, 0x6969d2bb, 0xd9d9a970, 0x8e8e0789, 0x949433a7, 0x9b9b2db6, 0x1e1e3c22, 0x87871592, 0xe9e9c920, 0xcece8749, 0x5555aaff, 0x28285078, 0xdfdfa57a,
            0x8c8c038f, 0xa1a159f8, 0x89890980, 0x0d0d1a17, 0xbfbf65da, 0xe6e6d731, 0x424284c6, 0x6868d0b8, 0x414182c3, 0x999929b0, 0x2d2d5a77, 0x0f0f1e11, 0xb0b07bcb, 0x5454a8fc, 0xbbbb6dd6, 0x16162c3a
        ]);
        this.T3 = new Uint32Array([
            0x63c6a563, 0x7cf8847c, 0x77ee9977, 0x7bf68d7b, 0xf2ff0df2, 0x6bd6bd6b, 0x6fdeb16f, 0xc59154c5, 0x30605030, 0x01020301, 0x67cea967, 0x2b567d2b, 0xfee719fe, 0xd7b562d7, 0xab4de6ab, 0x76ec9a76,
            0xca8f45ca, 0x821f9d82, 0xc98940c9, 0x7dfa877d, 0xfaef15fa, 0x59b2eb59, 0x478ec947, 0xf0fb0bf0, 0xad41ecad, 0xd4b367d4, 0xa25ffda2, 0xaf45eaaf, 0x9c23bf9c, 0xa453f7a4, 0x72e49672, 0xc09b5bc0,
            0xb775c2b7, 0xfde11cfd, 0x933dae93, 0x264c6a26, 0x366c5a36, 0x3f7e413f, 0xf7f502f7, 0xcc834fcc, 0x34685c34, 0xa551f4a5, 0xe5d134e5, 0xf1f908f1, 0x71e29371, 0xd8ab73d8, 0x31625331, 0x152a3f15,
            0x04080c04, 0xc79552c7, 0x23466523, 0xc39d5ec3, 0x18302818, 0x9637a196, 0x050a0f05, 0x9a2fb59a, 0x070e0907, 0x12243612, 0x801b9b80, 0xe2df3de2, 0xebcd26eb, 0x274e6927, 0xb27fcdb2, 0x75ea9f75,
            0x09121b09, 0x831d9e83, 0x2c58742c, 0x1a342e1a, 0x1b362d1b, 0x6edcb26e, 0x5ab4ee5a, 0xa05bfba0, 0x52a4f652, 0x3b764d3b, 0xd6b761d6, 0xb37dceb3, 0x29527b29, 0xe3dd3ee3, 0x2f5e712f, 0x84139784,
            0x53a6f553, 0xd1b968d1, 0x00000000, 0xedc12ced, 0x20406020, 0xfce31ffc, 0xb179c8b1, 0x5bb6ed5b, 0x6ad4be6a, 0xcb8d46cb, 0xbe67d9be, 0x39724b39, 0x4a94de4a, 0x4c98d44c, 0x58b0e858, 0xcf854acf,
            0xd0bb6bd0, 0xefc52aef, 0xaa4fe5aa, 0xfbed16fb, 0x4386c543, 0x4d9ad74d, 0x33665533, 0x85119485, 0x458acf45, 0xf9e910f9, 0x02040602, 0x7ffe817f, 0x50a0f050, 0x3c78443c, 0x9f25ba9f, 0xa84be3a8,
            0x51a2f351, 0xa35dfea3, 0x4080c040, 0x8f058a8f, 0x923fad92, 0x9d21bc9d, 0x38704838, 0xf5f104f5, 0xbc63dfbc, 0xb677c1b6, 0xdaaf75da, 0x21426321, 0x10203010, 0xffe51aff, 0xf3fd0ef3, 0xd2bf6dd2,
            0xcd814ccd, 0x0c18140c, 0x13263513, 0xecc32fec, 0x5fbee15f, 0x9735a297, 0x4488cc44, 0x172e3917, 0xc49357c4, 0xa755f2a7, 0x7efc827e, 0x3d7a473d, 0x64c8ac64, 0x5dbae75d, 0x19322b19, 0x73e69573,
            0x60c0a060, 0x81199881, 0x4f9ed14f, 0xdca37fdc, 0x22446622, 0x2a547e2a, 0x903bab90, 0x880b8388, 0x468cca46, 0xeec729ee, 0xb86bd3b8, 0x14283c14, 0xdea779de, 0x5ebce25e, 0x0b161d0b, 0xdbad76db,
            0xe0db3be0, 0x32645632, 0x3a744e3a, 0x0a141e0a, 0x4992db49, 0x060c0a06, 0x24486c24, 0x5cb8e45c, 0xc29f5dc2, 0xd3bd6ed3, 0xac43efac, 0x62c4a662, 0x9139a891, 0x9531a495, 0xe4d337e4, 0x79f28b79,
            0xe7d532e7, 0xc88b43c8, 0x376e5937, 0x6ddab76d, 0x8d018c8d, 0xd5b164d5, 0x4e9cd24e, 0xa949e0a9, 0x6cd8b46c, 0x56acfa56, 0xf4f307f4, 0xeacf25ea, 0x65caaf65, 0x7af48e7a, 0xae47e9ae, 0x08101808,
            0xba6fd5ba, 0x78f08878, 0x254a6f25, 0x2e5c722e, 0x1c38241c, 0xa657f1a6, 0xb473c7b4, 0xc69751c6, 0xe8cb23e8, 0xdda17cdd, 0x74e89c74, 0x1f3e211f, 0x4b96dd4b, 0xbd61dcbd, 0x8b0d868b, 0x8a0f858a,
            0x70e09070, 0x3e7c423e, 0xb571c4b5, 0x66ccaa66, 0x4890d848, 0x03060503, 0xf6f701f6, 0x0e1c120e, 0x61c2a361, 0x356a5f35, 0x57aef957, 0xb969d0b9, 0x86179186, 0xc19958c1, 0x1d3a271d, 0x9e27b99e,
            0xe1d938e1, 0xf8eb13f8, 0x982bb398, 0x11223311, 0x69d2bb69, 0xd9a970d9, 0x8e07898e, 0x9433a794, 0x9b2db69b, 0x1e3c221e, 0x87159287, 0xe9c920e9, 0xce8749ce, 0x55aaff55, 0x28507828, 0xdfa57adf,
            0x8c038f8c, 0xa159f8a1, 0x89098089, 0x0d1a170d, 0xbf65dabf, 0xe6d731e6, 0x4284c642, 0x68d0b868, 0x4182c341, 0x9929b099, 0x2d5a772d, 0x0f1e110f, 0xb07bcbb0, 0x54a8fc54, 0xbb6dd6bb, 0x162c3a16
        ]);
        this.T4 = new Uint32Array([
            0xc6a56363, 0xf8847c7c, 0xee997777, 0xf68d7b7b, 0xff0df2f2, 0xd6bd6b6b, 0xdeb16f6f, 0x9154c5c5, 0x60503030, 0x02030101, 0xcea96767, 0x567d2b2b, 0xe719fefe, 0xb562d7d7, 0x4de6abab, 0xec9a7676,
            0x8f45caca, 0x1f9d8282, 0x8940c9c9, 0xfa877d7d, 0xef15fafa, 0xb2eb5959, 0x8ec94747, 0xfb0bf0f0, 0x41ecadad, 0xb367d4d4, 0x5ffda2a2, 0x45eaafaf, 0x23bf9c9c, 0x53f7a4a4, 0xe4967272, 0x9b5bc0c0,
            0x75c2b7b7, 0xe11cfdfd, 0x3dae9393, 0x4c6a2626, 0x6c5a3636, 0x7e413f3f, 0xf502f7f7, 0x834fcccc, 0x685c3434, 0x51f4a5a5, 0xd134e5e5, 0xf908f1f1, 0xe2937171, 0xab73d8d8, 0x62533131, 0x2a3f1515,
            0x080c0404, 0x9552c7c7, 0x46652323, 0x9d5ec3c3, 0x30281818, 0x37a19696, 0x0a0f0505, 0x2fb59a9a, 0x0e090707, 0x24361212, 0x1b9b8080, 0xdf3de2e2, 0xcd26ebeb, 0x4e692727, 0x7fcdb2b2, 0xea9f7575,
            0x121b0909, 0x1d9e8383, 0x58742c2c, 0x342e1a1a, 0x362d1b1b, 0xdcb26e6e, 0xb4ee5a5a, 0x5bfba0a0, 0xa4f65252, 0x764d3b3b, 0xb761d6d6, 0x7dceb3b3, 0x527b2929, 0xdd3ee3e3, 0x5e712f2f, 0x13978484,
            0xa6f55353, 0xb968d1d1, 0x00000000, 0xc12ceded, 0x40602020, 0xe31ffcfc, 0x79c8b1b1, 0xb6ed5b5b, 0xd4be6a6a, 0x8d46cbcb, 0x67d9bebe, 0x724b3939, 0x94de4a4a, 0x98d44c4c, 0xb0e85858, 0x854acfcf,
            0xbb6bd0d0, 0xc52aefef, 0x4fe5aaaa, 0xed16fbfb, 0x86c54343, 0x9ad74d4d, 0x66553333, 0x11948585, 0x8acf4545, 0xe910f9f9, 0x04060202, 0xfe817f7f, 0xa0f05050, 0x78443c3c, 0x25ba9f9f, 0x4be3a8a8,
            0xa2f35151, 0x5dfea3a3, 0x80c04040, 0x058a8f8f, 0x3fad9292, 0x21bc9d9d, 0x70483838, 0xf104f5f5, 0x63dfbcbc, 0x77c1b6b6, 0xaf75dada, 0x42632121, 0x20301010, 0xe51affff, 0xfd0ef3f3, 0xbf6dd2d2,
            0x814ccdcd, 0x18140c0c, 0x26351313, 0xc32fecec, 0xbee15f5f, 0x35a29797, 0x88cc4444, 0x2e391717, 0x9357c4c4, 0x55f2a7a7, 0xfc827e7e, 0x7a473d3d, 0xc8ac6464, 0xbae75d5d, 0x322b1919, 0xe6957373,
            0xc0a06060, 0x19988181, 0x9ed14f4f, 0xa37fdcdc, 0x44662222, 0x547e2a2a, 0x3bab9090, 0x0b838888, 0x8cca4646, 0xc729eeee, 0x6bd3b8b8, 0x283c1414, 0xa779dede, 0xbce25e5e, 0x161d0b0b, 0xad76dbdb,
            0xdb3be0e0, 0x64563232, 0x744e3a3a, 0x141e0a0a, 0x92db4949, 0x0c0a0606, 0x486c2424, 0xb8e45c5c, 0x9f5dc2c2, 0xbd6ed3d3, 0x43efacac, 0xc4a66262, 0x39a89191, 0x31a49595, 0xd337e4e4, 0xf28b7979,
            0xd532e7e7, 0x8b43c8c8, 0x6e593737, 0xdab76d6d, 0x018c8d8d, 0xb164d5d5, 0x9cd24e4e, 0x49e0a9a9, 0xd8b46c6c, 0xacfa5656, 0xf307f4f4, 0xcf25eaea, 0xcaaf6565, 0xf48e7a7a, 0x47e9aeae, 0x10180808,
            0x6fd5baba, 0xf0887878, 0x4a6f2525, 0x5c722e2e, 0x38241c1c, 0x57f1a6a6, 0x73c7b4b4, 0x9751c6c6, 0xcb23e8e8, 0xa17cdddd, 0xe89c7474, 0x3e211f1f, 0x96dd4b4b, 0x61dcbdbd, 0x0d868b8b, 0x0f858a8a,
            0xe0907070, 0x7c423e3e, 0x71c4b5b5, 0xccaa6666, 0x90d84848, 0x06050303, 0xf701f6f6, 0x1c120e0e, 0xc2a36161, 0x6a5f3535, 0xaef95757, 0x69d0b9b9, 0x17918686, 0x9958c1c1, 0x3a271d1d, 0x27b99e9e,
            0xd938e1e1, 0xeb13f8f8, 0x2bb39898, 0x22331111, 0xd2bb6969, 0xa970d9d9, 0x07898e8e, 0x33a79494, 0x2db69b9b, 0x3c221e1e, 0x15928787, 0xc920e9e9, 0x8749cece, 0xaaff5555, 0x50782828, 0xa57adfdf,
            0x038f8c8c, 0x59f8a1a1, 0x09808989, 0x1a170d0d, 0x65dabfbf, 0xd731e6e6, 0x84c64242, 0xd0b86868, 0x82c34141, 0x29b09999, 0x5a772d2d, 0x1e110f0f, 0x7bcbb0b0, 0xa8fc5454, 0x6dd6bbbb, 0x2c3a1616
        ]);
        this.T5 = new Uint32Array([
            0x50a7f451, 0x5365417e, 0xc3a4171a, 0x965e273a, 0xcb6bab3b, 0xf1459d1f, 0xab58faac, 0x9303e34b, 0x55fa3020, 0xf66d76ad, 0x9176cc88, 0x254c02f5, 0xfcd7e54f, 0xd7cb2ac5, 0x80443526, 0x8fa362b5,
            0x495ab1de, 0x671bba25, 0x980eea45, 0xe1c0fe5d, 0x02752fc3, 0x12f04c81, 0xa397468d, 0xc6f9d36b, 0xe75f8f03, 0x959c9215, 0xeb7a6dbf, 0xda595295, 0x2d83bed4, 0xd3217458, 0x2969e049, 0x44c8c98e,
            0x6a89c275, 0x78798ef4, 0x6b3e5899, 0xdd71b927, 0xb64fe1be, 0x17ad88f0, 0x66ac20c9, 0xb43ace7d, 0x184adf63, 0x82311ae5, 0x60335197, 0x457f5362, 0xe07764b1, 0x84ae6bbb, 0x1ca081fe, 0x942b08f9,
            0x58684870, 0x19fd458f, 0x876cde94, 0xb7f87b52, 0x23d373ab, 0xe2024b72, 0x578f1fe3, 0x2aab5566, 0x0728ebb2, 0x03c2b52f, 0x9a7bc586, 0xa50837d3, 0xf2872830, 0xb2a5bf23, 0xba6a0302, 0x5c8216ed,
            0x2b1ccf8a, 0x92b479a7, 0xf0f207f3, 0xa1e2694e, 0xcdf4da65, 0xd5be0506, 0x1f6234d1, 0x8afea6c4, 0x9d532e34, 0xa055f3a2, 0x32e18a05, 0x75ebf6a4, 0x39ec830b, 0xaaef6040, 0x069f715e, 0x51106ebd,
            0xf98a213e, 0x3d06dd96, 0xae053edd, 0x46bde64d, 0xb58d5491, 0x055dc471, 0x6fd40604, 0xff155060, 0x24fb9819, 0x97e9bdd6, 0xcc434089, 0x779ed967, 0xbd42e8b0, 0x888b8907, 0x385b19e7, 0xdbeec879,
            0x470a7ca1, 0xe90f427c, 0xc91e84f8, 0x00000000, 0x83868009, 0x48ed2b32, 0xac70111e, 0x4e725a6c, 0xfbff0efd, 0x5638850f, 0x1ed5ae3d, 0x27392d36, 0x64d90f0a, 0x21a65c68, 0xd1545b9b, 0x3a2e3624,
            0xb1670a0c, 0x0fe75793, 0xd296eeb4, 0x9e919b1b, 0x4fc5c080, 0xa220dc61, 0x694b775a, 0x161a121c, 0x0aba93e2, 0xe52aa0c0, 0x43e0223c, 0x1d171b12, 0x0b0d090e, 0xadc78bf2, 0xb9a8b62d, 0xc8a91e14,
            0x8519f157, 0x4c0775af, 0xbbdd99ee, 0xfd607fa3, 0x9f2601f7, 0xbcf5725c, 0xc53b6644, 0x347efb5b, 0x7629438b, 0xdcc623cb, 0x68fcedb6, 0x63f1e4b8, 0xcadc31d7, 0x10856342, 0x40229713, 0x2011c684,
            0x7d244a85, 0xf83dbbd2, 0x1132f9ae, 0x6da129c7, 0x4b2f9e1d, 0xf330b2dc, 0xec52860d, 0xd0e3c177, 0x6c16b32b, 0x99b970a9, 0xfa489411, 0x2264e947, 0xc48cfca8, 0x1a3ff0a0, 0xd82c7d56, 0xef903322,
            0xc74e4987, 0xc1d138d9, 0xfea2ca8c, 0x360bd498, 0xcf81f5a6, 0x28de7aa5, 0x268eb7da, 0xa4bfad3f, 0xe49d3a2c, 0x0d927850, 0x9bcc5f6a, 0x62467e54, 0xc2138df6, 0xe8b8d890, 0x5ef7392e, 0xf5afc382,
            0xbe805d9f, 0x7c93d069, 0xa92dd56f, 0xb31225cf, 0x3b99acc8, 0xa77d1810, 0x6e639ce8, 0x7bbb3bdb, 0x097826cd, 0xf418596e, 0x01b79aec, 0xa89a4f83, 0x656e95e6, 0x7ee6ffaa, 0x08cfbc21, 0xe6e815ef,
            0xd99be7ba, 0xce366f4a, 0xd4099fea, 0xd67cb029, 0xafb2a431, 0x31233f2a, 0x3094a5c6, 0xc066a235, 0x37bc4e74, 0xa6ca82fc, 0xb0d090e0, 0x15d8a733, 0x4a9804f1, 0xf7daec41, 0x0e50cd7f, 0x2ff69117,
            0x8dd64d76, 0x4db0ef43, 0x544daacc, 0xdf0496e4, 0xe3b5d19e, 0x1b886a4c, 0xb81f2cc1, 0x7f516546, 0x04ea5e9d, 0x5d358c01, 0x737487fa, 0x2e410bfb, 0x5a1d67b3, 0x52d2db92, 0x335610e9, 0x1347d66d,
            0x8c61d79a, 0x7a0ca137, 0x8e14f859, 0x893c13eb, 0xee27a9ce, 0x35c961b7, 0xede51ce1, 0x3cb1477a, 0x59dfd29c, 0x3f73f255, 0x79ce1418, 0xbf37c773, 0xeacdf753, 0x5baafd5f, 0x146f3ddf, 0x86db4478,
            0x81f3afca, 0x3ec468b9, 0x2c342438, 0x5f40a3c2, 0x72c31d16, 0x0c25e2bc, 0x8b493c28, 0x41950dff, 0x7101a839, 0xdeb30c08, 0x9ce4b4d8, 0x90c15664, 0x6184cb7b, 0x70b632d5, 0x745c6c48, 0x4257b8d0
        ]);
        this.T6 = new Uint32Array([
            0xa7f45150, 0x65417e53, 0xa4171ac3, 0x5e273a96, 0x6bab3bcb, 0x459d1ff1, 0x58faacab, 0x03e34b93, 0xfa302055, 0x6d76adf6, 0x76cc8891, 0x4c02f525, 0xd7e54ffc, 0xcb2ac5d7, 0x44352680, 0xa362b58f,
            0x5ab1de49, 0x1bba2567, 0x0eea4598, 0xc0fe5de1, 0x752fc302, 0xf04c8112, 0x97468da3, 0xf9d36bc6, 0x5f8f03e7, 0x9c921595, 0x7a6dbfeb, 0x595295da, 0x83bed42d, 0x217458d3, 0x69e04929, 0xc8c98e44,
            0x89c2756a, 0x798ef478, 0x3e58996b, 0x71b927dd, 0x4fe1beb6, 0xad88f017, 0xac20c966, 0x3ace7db4, 0x4adf6318, 0x311ae582, 0x33519760, 0x7f536245, 0x7764b1e0, 0xae6bbb84, 0xa081fe1c, 0x2b08f994,
            0x68487058, 0xfd458f19, 0x6cde9487, 0xf87b52b7, 0xd373ab23, 0x024b72e2, 0x8f1fe357, 0xab55662a, 0x28ebb207, 0xc2b52f03, 0x7bc5869a, 0x0837d3a5, 0x872830f2, 0xa5bf23b2, 0x6a0302ba, 0x8216ed5c,
            0x1ccf8a2b, 0xb479a792, 0xf207f3f0, 0xe2694ea1, 0xf4da65cd, 0xbe0506d5, 0x6234d11f, 0xfea6c48a, 0x532e349d, 0x55f3a2a0, 0xe18a0532, 0xebf6a475, 0xec830b39, 0xef6040aa, 0x9f715e06, 0x106ebd51,
            0x8a213ef9, 0x06dd963d, 0x053eddae, 0xbde64d46, 0x8d5491b5, 0x5dc47105, 0xd406046f, 0x155060ff, 0xfb981924, 0xe9bdd697, 0x434089cc, 0x9ed96777, 0x42e8b0bd, 0x8b890788, 0x5b19e738, 0xeec879db,
            0x0a7ca147, 0x0f427ce9, 0x1e84f8c9, 0x00000000, 0x86800983, 0xed2b3248, 0x70111eac, 0x725a6c4e, 0xff0efdfb, 0x38850f56, 0xd5ae3d1e, 0x392d3627, 0xd90f0a64, 0xa65c6821, 0x545b9bd1, 0x2e36243a,
            0x670a0cb1, 0xe757930f, 0x96eeb4d2, 0x919b1b9e, 0xc5c0804f, 0x20dc61a2, 0x4b775a69, 0x1a121c16, 0xba93e20a, 0x2aa0c0e5, 0xe0223c43, 0x171b121d, 0x0d090e0b, 0xc78bf2ad, 0xa8b62db9, 0xa91e14c8,
            0x19f15785, 0x0775af4c, 0xdd99eebb, 0x607fa3fd, 0x2601f79f, 0xf5725cbc, 0x3b6644c5, 0x7efb5b34, 0x29438b76, 0xc623cbdc, 0xfcedb668, 0xf1e4b863, 0xdc31d7ca, 0x85634210, 0x22971340, 0x11c68420,
            0x244a857d, 0x3dbbd2f8, 0x32f9ae11, 0xa129c76d, 0x2f9e1d4b, 0x30b2dcf3, 0x52860dec, 0xe3c177d0, 0x16b32b6c, 0xb970a999, 0x489411fa, 0x64e94722, 0x8cfca8c4, 0x3ff0a01a, 0x2c7d56d8, 0x903322ef,
            0x4e4987c7, 0xd138d9c1, 0xa2ca8cfe, 0x0bd49836, 0x81f5a6cf, 0xde7aa528, 0x8eb7da26, 0xbfad3fa4, 0x9d3a2ce4, 0x9278500d, 0xcc5f6a9b, 0x467e5462, 0x138df6c2, 0xb8d890e8, 0xf7392e5e, 0xafc382f5,
            0x805d9fbe, 0x93d0697c, 0x2dd56fa9, 0x1225cfb3, 0x99acc83b, 0x7d1810a7, 0x639ce86e, 0xbb3bdb7b, 0x7826cd09, 0x18596ef4, 0xb79aec01, 0x9a4f83a8, 0x6e95e665, 0xe6ffaa7e, 0xcfbc2108, 0xe815efe6,
            0x9be7bad9, 0x366f4ace, 0x099fead4, 0x7cb029d6, 0xb2a431af, 0x233f2a31, 0x94a5c630, 0x66a235c0, 0xbc4e7437, 0xca82fca6, 0xd090e0b0, 0xd8a73315, 0x9804f14a, 0xdaec41f7, 0x50cd7f0e, 0xf691172f,
            0xd64d768d, 0xb0ef434d, 0x4daacc54, 0x0496e4df, 0xb5d19ee3, 0x886a4c1b, 0x1f2cc1b8, 0x5165467f, 0xea5e9d04, 0x358c015d, 0x7487fa73, 0x410bfb2e, 0x1d67b35a, 0xd2db9252, 0x5610e933, 0x47d66d13,
            0x61d79a8c, 0x0ca1377a, 0x14f8598e, 0x3c13eb89, 0x27a9ceee, 0xc961b735, 0xe51ce1ed, 0xb1477a3c, 0xdfd29c59, 0x73f2553f, 0xce141879, 0x37c773bf, 0xcdf753ea, 0xaafd5f5b, 0x6f3ddf14, 0xdb447886,
            0xf3afca81, 0xc468b93e, 0x3424382c, 0x40a3c25f, 0xc31d1672, 0x25e2bc0c, 0x493c288b, 0x950dff41, 0x01a83971, 0xb30c08de, 0xe4b4d89c, 0xc1566490, 0x84cb7b61, 0xb632d570, 0x5c6c4874, 0x57b8d042
        ]);
        this.T7 = new Uint32Array([
            0xf45150a7, 0x417e5365, 0x171ac3a4, 0x273a965e, 0xab3bcb6b, 0x9d1ff145, 0xfaacab58, 0xe34b9303, 0x302055fa, 0x76adf66d, 0xcc889176, 0x02f5254c, 0xe54ffcd7, 0x2ac5d7cb, 0x35268044, 0x62b58fa3,
            0xb1de495a, 0xba25671b, 0xea45980e, 0xfe5de1c0, 0x2fc30275, 0x4c8112f0, 0x468da397, 0xd36bc6f9, 0x8f03e75f, 0x9215959c, 0x6dbfeb7a, 0x5295da59, 0xbed42d83, 0x7458d321, 0xe0492969, 0xc98e44c8,
            0xc2756a89, 0x8ef47879, 0x58996b3e, 0xb927dd71, 0xe1beb64f, 0x88f017ad, 0x20c966ac, 0xce7db43a, 0xdf63184a, 0x1ae58231, 0x51976033, 0x5362457f, 0x64b1e077, 0x6bbb84ae, 0x81fe1ca0, 0x08f9942b,
            0x48705868, 0x458f19fd, 0xde94876c, 0x7b52b7f8, 0x73ab23d3, 0x4b72e202, 0x1fe3578f, 0x55662aab, 0xebb20728, 0xb52f03c2, 0xc5869a7b, 0x37d3a508, 0x2830f287, 0xbf23b2a5, 0x0302ba6a, 0x16ed5c82,
            0xcf8a2b1c, 0x79a792b4, 0x07f3f0f2, 0x694ea1e2, 0xda65cdf4, 0x0506d5be, 0x34d11f62, 0xa6c48afe, 0x2e349d53, 0xf3a2a055, 0x8a0532e1, 0xf6a475eb, 0x830b39ec, 0x6040aaef, 0x715e069f, 0x6ebd5110,
            0x213ef98a, 0xdd963d06, 0x3eddae05, 0xe64d46bd, 0x5491b58d, 0xc471055d, 0x06046fd4, 0x5060ff15, 0x981924fb, 0xbdd697e9, 0x4089cc43, 0xd967779e, 0xe8b0bd42, 0x8907888b, 0x19e7385b, 0xc879dbee,
            0x7ca1470a, 0x427ce90f, 0x84f8c91e, 0x00000000, 0x80098386, 0x2b3248ed, 0x111eac70, 0x5a6c4e72, 0x0efdfbff, 0x850f5638, 0xae3d1ed5, 0x2d362739, 0x0f0a64d9, 0x5c6821a6, 0x5b9bd154, 0x36243a2e,
            0x0a0cb167, 0x57930fe7, 0xeeb4d296, 0x9b1b9e91, 0xc0804fc5, 0xdc61a220, 0x775a694b, 0x121c161a, 0x93e20aba, 0xa0c0e52a, 0x223c43e0, 0x1b121d17, 0x090e0b0d, 0x8bf2adc7, 0xb62db9a8, 0x1e14c8a9,
            0xf1578519, 0x75af4c07, 0x99eebbdd, 0x7fa3fd60, 0x01f79f26, 0x725cbcf5, 0x6644c53b, 0xfb5b347e, 0x438b7629, 0x23cbdcc6, 0xedb668fc, 0xe4b863f1, 0x31d7cadc, 0x63421085, 0x97134022, 0xc6842011,
            0x4a857d24, 0xbbd2f83d, 0xf9ae1132, 0x29c76da1, 0x9e1d4b2f, 0xb2dcf330, 0x860dec52, 0xc177d0e3, 0xb32b6c16, 0x70a999b9, 0x9411fa48, 0xe9472264, 0xfca8c48c, 0xf0a01a3f, 0x7d56d82c, 0x3322ef90,
            0x4987c74e, 0x38d9c1d1, 0xca8cfea2, 0xd498360b, 0xf5a6cf81, 0x7aa528de, 0xb7da268e, 0xad3fa4bf, 0x3a2ce49d, 0x78500d92, 0x5f6a9bcc, 0x7e546246, 0x8df6c213, 0xd890e8b8, 0x392e5ef7, 0xc382f5af,
            0x5d9fbe80, 0xd0697c93, 0xd56fa92d, 0x25cfb312, 0xacc83b99, 0x1810a77d, 0x9ce86e63, 0x3bdb7bbb, 0x26cd0978, 0x596ef418, 0x9aec01b7, 0x4f83a89a, 0x95e6656e, 0xffaa7ee6, 0xbc2108cf, 0x15efe6e8,
            0xe7bad99b, 0x6f4ace36, 0x9fead409, 0xb029d67c, 0xa431afb2, 0x3f2a3123, 0xa5c63094, 0xa235c066, 0x4e7437bc, 0x82fca6ca, 0x90e0b0d0, 0xa73315d8, 0x04f14a98, 0xec41f7da, 0xcd7f0e50, 0x91172ff6,
            0x4d768dd6, 0xef434db0, 0xaacc544d, 0x96e4df04, 0xd19ee3b5, 0x6a4c1b88, 0x2cc1b81f, 0x65467f51, 0x5e9d04ea, 0x8c015d35, 0x87fa7374, 0x0bfb2e41, 0x67b35a1d, 0xdb9252d2, 0x10e93356, 0xd66d1347,
            0xd79a8c61, 0xa1377a0c, 0xf8598e14, 0x13eb893c, 0xa9ceee27, 0x61b735c9, 0x1ce1ede5, 0x477a3cb1, 0xd29c59df, 0xf2553f73, 0x141879ce, 0xc773bf37, 0xf753eacd, 0xfd5f5baa, 0x3ddf146f, 0x447886db,
            0xafca81f3, 0x68b93ec4, 0x24382c34, 0xa3c25f40, 0x1d1672c3, 0xe2bc0c25, 0x3c288b49, 0x0dff4195, 0xa8397101, 0x0c08deb3, 0xb4d89ce4, 0x566490c1, 0xcb7b6184, 0x32d570b6, 0x6c48745c, 0xb8d04257
        ]);
        this.T8 = new Uint32Array([
            0x5150a7f4, 0x7e536541, 0x1ac3a417, 0x3a965e27, 0x3bcb6bab, 0x1ff1459d, 0xacab58fa, 0x4b9303e3, 0x2055fa30, 0xadf66d76, 0x889176cc, 0xf5254c02, 0x4ffcd7e5, 0xc5d7cb2a, 0x26804435, 0xb58fa362,
            0xde495ab1, 0x25671bba, 0x45980eea, 0x5de1c0fe, 0xc302752f, 0x8112f04c, 0x8da39746, 0x6bc6f9d3, 0x03e75f8f, 0x15959c92, 0xbfeb7a6d, 0x95da5952, 0xd42d83be, 0x58d32174, 0x492969e0, 0x8e44c8c9,
            0x756a89c2, 0xf478798e, 0x996b3e58, 0x27dd71b9, 0xbeb64fe1, 0xf017ad88, 0xc966ac20, 0x7db43ace, 0x63184adf, 0xe582311a, 0x97603351, 0x62457f53, 0xb1e07764, 0xbb84ae6b, 0xfe1ca081, 0xf9942b08,
            0x70586848, 0x8f19fd45, 0x94876cde, 0x52b7f87b, 0xab23d373, 0x72e2024b, 0xe3578f1f, 0x662aab55, 0xb20728eb, 0x2f03c2b5, 0x869a7bc5, 0xd3a50837, 0x30f28728, 0x23b2a5bf, 0x02ba6a03, 0xed5c8216,
            0x8a2b1ccf, 0xa792b479, 0xf3f0f207, 0x4ea1e269, 0x65cdf4da, 0x06d5be05, 0xd11f6234, 0xc48afea6, 0x349d532e, 0xa2a055f3, 0x0532e18a, 0xa475ebf6, 0x0b39ec83, 0x40aaef60, 0x5e069f71, 0xbd51106e,
            0x3ef98a21, 0x963d06dd, 0xddae053e, 0x4d46bde6, 0x91b58d54, 0x71055dc4, 0x046fd406, 0x60ff1550, 0x1924fb98, 0xd697e9bd, 0x89cc4340, 0x67779ed9, 0xb0bd42e8, 0x07888b89, 0xe7385b19, 0x79dbeec8,
            0xa1470a7c, 0x7ce90f42, 0xf8c91e84, 0x00000000, 0x09838680, 0x3248ed2b, 0x1eac7011, 0x6c4e725a, 0xfdfbff0e, 0x0f563885, 0x3d1ed5ae, 0x3627392d, 0x0a64d90f, 0x6821a65c, 0x9bd1545b, 0x243a2e36,
            0x0cb1670a, 0x930fe757, 0xb4d296ee, 0x1b9e919b, 0x804fc5c0, 0x61a220dc, 0x5a694b77, 0x1c161a12, 0xe20aba93, 0xc0e52aa0, 0x3c43e022, 0x121d171b, 0x0e0b0d09, 0xf2adc78b, 0x2db9a8b6, 0x14c8a91e,
            0x578519f1, 0xaf4c0775, 0xeebbdd99, 0xa3fd607f, 0xf79f2601, 0x5cbcf572, 0x44c53b66, 0x5b347efb, 0x8b762943, 0xcbdcc623, 0xb668fced, 0xb863f1e4, 0xd7cadc31, 0x42108563, 0x13402297, 0x842011c6,
            0x857d244a, 0xd2f83dbb, 0xae1132f9, 0xc76da129, 0x1d4b2f9e, 0xdcf330b2, 0x0dec5286, 0x77d0e3c1, 0x2b6c16b3, 0xa999b970, 0x11fa4894, 0x472264e9, 0xa8c48cfc, 0xa01a3ff0, 0x56d82c7d, 0x22ef9033,
            0x87c74e49, 0xd9c1d138, 0x8cfea2ca, 0x98360bd4, 0xa6cf81f5, 0xa528de7a, 0xda268eb7, 0x3fa4bfad, 0x2ce49d3a, 0x500d9278, 0x6a9bcc5f, 0x5462467e, 0xf6c2138d, 0x90e8b8d8, 0x2e5ef739, 0x82f5afc3,
            0x9fbe805d, 0x697c93d0, 0x6fa92dd5, 0xcfb31225, 0xc83b99ac, 0x10a77d18, 0xe86e639c, 0xdb7bbb3b, 0xcd097826, 0x6ef41859, 0xec01b79a, 0x83a89a4f, 0xe6656e95, 0xaa7ee6ff, 0x2108cfbc, 0xefe6e815,
            0xbad99be7, 0x4ace366f, 0xead4099f, 0x29d67cb0, 0x31afb2a4, 0x2a31233f, 0xc63094a5, 0x35c066a2, 0x7437bc4e, 0xfca6ca82, 0xe0b0d090, 0x3315d8a7, 0xf14a9804, 0x41f7daec, 0x7f0e50cd, 0x172ff691,
            0x768dd64d, 0x434db0ef, 0xcc544daa, 0xe4df0496, 0x9ee3b5d1, 0x4c1b886a, 0xc1b81f2c, 0x467f5165, 0x9d04ea5e, 0x015d358c, 0xfa737487, 0xfb2e410b, 0xb35a1d67, 0x9252d2db, 0xe9335610, 0x6d1347d6,
            0x9a8c61d7, 0x377a0ca1, 0x598e14f8, 0xeb893c13, 0xceee27a9, 0xb735c961, 0xe1ede51c, 0x7a3cb147, 0x9c59dfd2, 0x553f73f2, 0x1879ce14, 0x73bf37c7, 0x53eacdf7, 0x5f5baafd, 0xdf146f3d, 0x7886db44,
            0xca81f3af, 0xb93ec468, 0x382c3424, 0xc25f40a3, 0x1672c31d, 0xbc0c25e2, 0x288b493c, 0xff41950d, 0x397101a8, 0x08deb30c, 0xd89ce4b4, 0x6490c156, 0x7b6184cb, 0xd570b632, 0x48745c6c, 0xd04257b8
        ]);
        this.U1 = new Uint32Array([
            0x00000000, 0x0b0d090e, 0x161a121c, 0x1d171b12, 0x2c342438, 0x27392d36, 0x3a2e3624, 0x31233f2a, 0x58684870, 0x5365417e, 0x4e725a6c, 0x457f5362, 0x745c6c48, 0x7f516546, 0x62467e54, 0x694b775a,
            0xb0d090e0, 0xbbdd99ee, 0xa6ca82fc, 0xadc78bf2, 0x9ce4b4d8, 0x97e9bdd6, 0x8afea6c4, 0x81f3afca, 0xe8b8d890, 0xe3b5d19e, 0xfea2ca8c, 0xf5afc382, 0xc48cfca8, 0xcf81f5a6, 0xd296eeb4, 0xd99be7ba,
            0x7bbb3bdb, 0x70b632d5, 0x6da129c7, 0x66ac20c9, 0x578f1fe3, 0x5c8216ed, 0x41950dff, 0x4a9804f1, 0x23d373ab, 0x28de7aa5, 0x35c961b7, 0x3ec468b9, 0x0fe75793, 0x04ea5e9d, 0x19fd458f, 0x12f04c81,
            0xcb6bab3b, 0xc066a235, 0xdd71b927, 0xd67cb029, 0xe75f8f03, 0xec52860d, 0xf1459d1f, 0xfa489411, 0x9303e34b, 0x980eea45, 0x8519f157, 0x8e14f859, 0xbf37c773, 0xb43ace7d, 0xa92dd56f, 0xa220dc61,
            0xf66d76ad, 0xfd607fa3, 0xe07764b1, 0xeb7a6dbf, 0xda595295, 0xd1545b9b, 0xcc434089, 0xc74e4987, 0xae053edd, 0xa50837d3, 0xb81f2cc1, 0xb31225cf, 0x82311ae5, 0x893c13eb, 0x942b08f9, 0x9f2601f7,
            0x46bde64d, 0x4db0ef43, 0x50a7f451, 0x5baafd5f, 0x6a89c275, 0x6184cb7b, 0x7c93d069, 0x779ed967, 0x1ed5ae3d, 0x15d8a733, 0x08cfbc21, 0x03c2b52f, 0x32e18a05, 0x39ec830b, 0x24fb9819, 0x2ff69117,
            0x8dd64d76, 0x86db4478, 0x9bcc5f6a, 0x90c15664, 0xa1e2694e, 0xaaef6040, 0xb7f87b52, 0xbcf5725c, 0xd5be0506, 0xdeb30c08, 0xc3a4171a, 0xc8a91e14, 0xf98a213e, 0xf2872830, 0xef903322, 0xe49d3a2c,
            0x3d06dd96, 0x360bd498, 0x2b1ccf8a, 0x2011c684, 0x1132f9ae, 0x1a3ff0a0, 0x0728ebb2, 0x0c25e2bc, 0x656e95e6, 0x6e639ce8, 0x737487fa, 0x78798ef4, 0x495ab1de, 0x4257b8d0, 0x5f40a3c2, 0x544daacc,
            0xf7daec41, 0xfcd7e54f, 0xe1c0fe5d, 0xeacdf753, 0xdbeec879, 0xd0e3c177, 0xcdf4da65, 0xc6f9d36b, 0xafb2a431, 0xa4bfad3f, 0xb9a8b62d, 0xb2a5bf23, 0x83868009, 0x888b8907, 0x959c9215, 0x9e919b1b,
            0x470a7ca1, 0x4c0775af, 0x51106ebd, 0x5a1d67b3, 0x6b3e5899, 0x60335197, 0x7d244a85, 0x7629438b, 0x1f6234d1, 0x146f3ddf, 0x097826cd, 0x02752fc3, 0x335610e9, 0x385b19e7, 0x254c02f5, 0x2e410bfb,
            0x8c61d79a, 0x876cde94, 0x9a7bc586, 0x9176cc88, 0xa055f3a2, 0xab58faac, 0xb64fe1be, 0xbd42e8b0, 0xd4099fea, 0xdf0496e4, 0xc2138df6, 0xc91e84f8, 0xf83dbbd2, 0xf330b2dc, 0xee27a9ce, 0xe52aa0c0,
            0x3cb1477a, 0x37bc4e74, 0x2aab5566, 0x21a65c68, 0x10856342, 0x1b886a4c, 0x069f715e, 0x0d927850, 0x64d90f0a, 0x6fd40604, 0x72c31d16, 0x79ce1418, 0x48ed2b32, 0x43e0223c, 0x5ef7392e, 0x55fa3020,
            0x01b79aec, 0x0aba93e2, 0x17ad88f0, 0x1ca081fe, 0x2d83bed4, 0x268eb7da, 0x3b99acc8, 0x3094a5c6, 0x59dfd29c, 0x52d2db92, 0x4fc5c080, 0x44c8c98e, 0x75ebf6a4, 0x7ee6ffaa, 0x63f1e4b8, 0x68fcedb6,
            0xb1670a0c, 0xba6a0302, 0xa77d1810, 0xac70111e, 0x9d532e34, 0x965e273a, 0x8b493c28, 0x80443526, 0xe90f427c, 0xe2024b72, 0xff155060, 0xf418596e, 0xc53b6644, 0xce366f4a, 0xd3217458, 0xd82c7d56,
            0x7a0ca137, 0x7101a839, 0x6c16b32b, 0x671bba25, 0x5638850f, 0x5d358c01, 0x40229713, 0x4b2f9e1d, 0x2264e947, 0x2969e049, 0x347efb5b, 0x3f73f255, 0x0e50cd7f, 0x055dc471, 0x184adf63, 0x1347d66d,
            0xcadc31d7, 0xc1d138d9, 0xdcc623cb, 0xd7cb2ac5, 0xe6e815ef, 0xede51ce1, 0xf0f207f3, 0xfbff0efd, 0x92b479a7, 0x99b970a9, 0x84ae6bbb, 0x8fa362b5, 0xbe805d9f, 0xb58d5491, 0xa89a4f83, 0xa397468d
        ]);
        this.U2 = new Uint32Array([
            0x00000000, 0x0d090e0b, 0x1a121c16, 0x171b121d, 0x3424382c, 0x392d3627, 0x2e36243a, 0x233f2a31, 0x68487058, 0x65417e53, 0x725a6c4e, 0x7f536245, 0x5c6c4874, 0x5165467f, 0x467e5462, 0x4b775a69,
            0xd090e0b0, 0xdd99eebb, 0xca82fca6, 0xc78bf2ad, 0xe4b4d89c, 0xe9bdd697, 0xfea6c48a, 0xf3afca81, 0xb8d890e8, 0xb5d19ee3, 0xa2ca8cfe, 0xafc382f5, 0x8cfca8c4, 0x81f5a6cf, 0x96eeb4d2, 0x9be7bad9,
            0xbb3bdb7b, 0xb632d570, 0xa129c76d, 0xac20c966, 0x8f1fe357, 0x8216ed5c, 0x950dff41, 0x9804f14a, 0xd373ab23, 0xde7aa528, 0xc961b735, 0xc468b93e, 0xe757930f, 0xea5e9d04, 0xfd458f19, 0xf04c8112,
            0x6bab3bcb, 0x66a235c0, 0x71b927dd, 0x7cb029d6, 0x5f8f03e7, 0x52860dec, 0x459d1ff1, 0x489411fa, 0x03e34b93, 0x0eea4598, 0x19f15785, 0x14f8598e, 0x37c773bf, 0x3ace7db4, 0x2dd56fa9, 0x20dc61a2,
            0x6d76adf6, 0x607fa3fd, 0x7764b1e0, 0x7a6dbfeb, 0x595295da, 0x545b9bd1, 0x434089cc, 0x4e4987c7, 0x053eddae, 0x0837d3a5, 0x1f2cc1b8, 0x1225cfb3, 0x311ae582, 0x3c13eb89, 0x2b08f994, 0x2601f79f,
            0xbde64d46, 0xb0ef434d, 0xa7f45150, 0xaafd5f5b, 0x89c2756a, 0x84cb7b61, 0x93d0697c, 0x9ed96777, 0xd5ae3d1e, 0xd8a73315, 0xcfbc2108, 0xc2b52f03, 0xe18a0532, 0xec830b39, 0xfb981924, 0xf691172f,
            0xd64d768d, 0xdb447886, 0xcc5f6a9b, 0xc1566490, 0xe2694ea1, 0xef6040aa, 0xf87b52b7, 0xf5725cbc, 0xbe0506d5, 0xb30c08de, 0xa4171ac3, 0xa91e14c8, 0x8a213ef9, 0x872830f2, 0x903322ef, 0x9d3a2ce4,
            0x06dd963d, 0x0bd49836, 0x1ccf8a2b, 0x11c68420, 0x32f9ae11, 0x3ff0a01a, 0x28ebb207, 0x25e2bc0c, 0x6e95e665, 0x639ce86e, 0x7487fa73, 0x798ef478, 0x5ab1de49, 0x57b8d042, 0x40a3c25f, 0x4daacc54,
            0xdaec41f7, 0xd7e54ffc, 0xc0fe5de1, 0xcdf753ea, 0xeec879db, 0xe3c177d0, 0xf4da65cd, 0xf9d36bc6, 0xb2a431af, 0xbfad3fa4, 0xa8b62db9, 0xa5bf23b2, 0x86800983, 0x8b890788, 0x9c921595, 0x919b1b9e,
            0x0a7ca147, 0x0775af4c, 0x106ebd51, 0x1d67b35a, 0x3e58996b, 0x33519760, 0x244a857d, 0x29438b76, 0x6234d11f, 0x6f3ddf14, 0x7826cd09, 0x752fc302, 0x5610e933, 0x5b19e738, 0x4c02f525, 0x410bfb2e,
            0x61d79a8c, 0x6cde9487, 0x7bc5869a, 0x76cc8891, 0x55f3a2a0, 0x58faacab, 0x4fe1beb6, 0x42e8b0bd, 0x099fead4, 0x0496e4df, 0x138df6c2, 0x1e84f8c9, 0x3dbbd2f8, 0x30b2dcf3, 0x27a9ceee, 0x2aa0c0e5,
            0xb1477a3c, 0xbc4e7437, 0xab55662a, 0xa65c6821, 0x85634210, 0x886a4c1b, 0x9f715e06, 0x9278500d, 0xd90f0a64, 0xd406046f, 0xc31d1672, 0xce141879, 0xed2b3248, 0xe0223c43, 0xf7392e5e, 0xfa302055,
            0xb79aec01, 0xba93e20a, 0xad88f017, 0xa081fe1c, 0x83bed42d, 0x8eb7da26, 0x99acc83b, 0x94a5c630, 0xdfd29c59, 0xd2db9252, 0xc5c0804f, 0xc8c98e44, 0xebf6a475, 0xe6ffaa7e, 0xf1e4b863, 0xfcedb668,
            0x670a0cb1, 0x6a0302ba, 0x7d1810a7, 0x70111eac, 0x532e349d, 0x5e273a96, 0x493c288b, 0x44352680, 0x0f427ce9, 0x024b72e2, 0x155060ff, 0x18596ef4, 0x3b6644c5, 0x366f4ace, 0x217458d3, 0x2c7d56d8,
            0x0ca1377a, 0x01a83971, 0x16b32b6c, 0x1bba2567, 0x38850f56, 0x358c015d, 0x22971340, 0x2f9e1d4b, 0x64e94722, 0x69e04929, 0x7efb5b34, 0x73f2553f, 0x50cd7f0e, 0x5dc47105, 0x4adf6318, 0x47d66d13,
            0xdc31d7ca, 0xd138d9c1, 0xc623cbdc, 0xcb2ac5d7, 0xe815efe6, 0xe51ce1ed, 0xf207f3f0, 0xff0efdfb, 0xb479a792, 0xb970a999, 0xae6bbb84, 0xa362b58f, 0x805d9fbe, 0x8d5491b5, 0x9a4f83a8, 0x97468da3
        ]);
        this.U3 = new Uint32Array([
            0x00000000, 0x090e0b0d, 0x121c161a, 0x1b121d17, 0x24382c34, 0x2d362739, 0x36243a2e, 0x3f2a3123, 0x48705868, 0x417e5365, 0x5a6c4e72, 0x5362457f, 0x6c48745c, 0x65467f51, 0x7e546246, 0x775a694b,
            0x90e0b0d0, 0x99eebbdd, 0x82fca6ca, 0x8bf2adc7, 0xb4d89ce4, 0xbdd697e9, 0xa6c48afe, 0xafca81f3, 0xd890e8b8, 0xd19ee3b5, 0xca8cfea2, 0xc382f5af, 0xfca8c48c, 0xf5a6cf81, 0xeeb4d296, 0xe7bad99b,
            0x3bdb7bbb, 0x32d570b6, 0x29c76da1, 0x20c966ac, 0x1fe3578f, 0x16ed5c82, 0x0dff4195, 0x04f14a98, 0x73ab23d3, 0x7aa528de, 0x61b735c9, 0x68b93ec4, 0x57930fe7, 0x5e9d04ea, 0x458f19fd, 0x4c8112f0,
            0xab3bcb6b, 0xa235c066, 0xb927dd71, 0xb029d67c, 0x8f03e75f, 0x860dec52, 0x9d1ff145, 0x9411fa48, 0xe34b9303, 0xea45980e, 0xf1578519, 0xf8598e14, 0xc773bf37, 0xce7db43a, 0xd56fa92d, 0xdc61a220,
            0x76adf66d, 0x7fa3fd60, 0x64b1e077, 0x6dbfeb7a, 0x5295da59, 0x5b9bd154, 0x4089cc43, 0x4987c74e, 0x3eddae05, 0x37d3a508, 0x2cc1b81f, 0x25cfb312, 0x1ae58231, 0x13eb893c, 0x08f9942b, 0x01f79f26,
            0xe64d46bd, 0xef434db0, 0xf45150a7, 0xfd5f5baa, 0xc2756a89, 0xcb7b6184, 0xd0697c93, 0xd967779e, 0xae3d1ed5, 0xa73315d8, 0xbc2108cf, 0xb52f03c2, 0x8a0532e1, 0x830b39ec, 0x981924fb, 0x91172ff6,
            0x4d768dd6, 0x447886db, 0x5f6a9bcc, 0x566490c1, 0x694ea1e2, 0x6040aaef, 0x7b52b7f8, 0x725cbcf5, 0x0506d5be, 0x0c08deb3, 0x171ac3a4, 0x1e14c8a9, 0x213ef98a, 0x2830f287, 0x3322ef90, 0x3a2ce49d,
            0xdd963d06, 0xd498360b, 0xcf8a2b1c, 0xc6842011, 0xf9ae1132, 0xf0a01a3f, 0xebb20728, 0xe2bc0c25, 0x95e6656e, 0x9ce86e63, 0x87fa7374, 0x8ef47879, 0xb1de495a, 0xb8d04257, 0xa3c25f40, 0xaacc544d,
            0xec41f7da, 0xe54ffcd7, 0xfe5de1c0, 0xf753eacd, 0xc879dbee, 0xc177d0e3, 0xda65cdf4, 0xd36bc6f9, 0xa431afb2, 0xad3fa4bf, 0xb62db9a8, 0xbf23b2a5, 0x80098386, 0x8907888b, 0x9215959c, 0x9b1b9e91,
            0x7ca1470a, 0x75af4c07, 0x6ebd5110, 0x67b35a1d, 0x58996b3e, 0x51976033, 0x4a857d24, 0x438b7629, 0x34d11f62, 0x3ddf146f, 0x26cd0978, 0x2fc30275, 0x10e93356, 0x19e7385b, 0x02f5254c, 0x0bfb2e41,
            0xd79a8c61, 0xde94876c, 0xc5869a7b, 0xcc889176, 0xf3a2a055, 0xfaacab58, 0xe1beb64f, 0xe8b0bd42, 0x9fead409, 0x96e4df04, 0x8df6c213, 0x84f8c91e, 0xbbd2f83d, 0xb2dcf330, 0xa9ceee27, 0xa0c0e52a,
            0x477a3cb1, 0x4e7437bc, 0x55662aab, 0x5c6821a6, 0x63421085, 0x6a4c1b88, 0x715e069f, 0x78500d92, 0x0f0a64d9, 0x06046fd4, 0x1d1672c3, 0x141879ce, 0x2b3248ed, 0x223c43e0, 0x392e5ef7, 0x302055fa,
            0x9aec01b7, 0x93e20aba, 0x88f017ad, 0x81fe1ca0, 0xbed42d83, 0xb7da268e, 0xacc83b99, 0xa5c63094, 0xd29c59df, 0xdb9252d2, 0xc0804fc5, 0xc98e44c8, 0xf6a475eb, 0xffaa7ee6, 0xe4b863f1, 0xedb668fc,
            0x0a0cb167, 0x0302ba6a, 0x1810a77d, 0x111eac70, 0x2e349d53, 0x273a965e, 0x3c288b49, 0x35268044, 0x427ce90f, 0x4b72e202, 0x5060ff15, 0x596ef418, 0x6644c53b, 0x6f4ace36, 0x7458d321, 0x7d56d82c,
            0xa1377a0c, 0xa8397101, 0xb32b6c16, 0xba25671b, 0x850f5638, 0x8c015d35, 0x97134022, 0x9e1d4b2f, 0xe9472264, 0xe0492969, 0xfb5b347e, 0xf2553f73, 0xcd7f0e50, 0xc471055d, 0xdf63184a, 0xd66d1347,
            0x31d7cadc, 0x38d9c1d1, 0x23cbdcc6, 0x2ac5d7cb, 0x15efe6e8, 0x1ce1ede5, 0x07f3f0f2, 0x0efdfbff, 0x79a792b4, 0x70a999b9, 0x6bbb84ae, 0x62b58fa3, 0x5d9fbe80, 0x5491b58d, 0x4f83a89a, 0x468da397
        ]);
        this.U4 = new Uint32Array([
            0x00000000, 0x0e0b0d09, 0x1c161a12, 0x121d171b, 0x382c3424, 0x3627392d, 0x243a2e36, 0x2a31233f, 0x70586848, 0x7e536541, 0x6c4e725a, 0x62457f53, 0x48745c6c, 0x467f5165, 0x5462467e, 0x5a694b77,
            0xe0b0d090, 0xeebbdd99, 0xfca6ca82, 0xf2adc78b, 0xd89ce4b4, 0xd697e9bd, 0xc48afea6, 0xca81f3af, 0x90e8b8d8, 0x9ee3b5d1, 0x8cfea2ca, 0x82f5afc3, 0xa8c48cfc, 0xa6cf81f5, 0xb4d296ee, 0xbad99be7,
            0xdb7bbb3b, 0xd570b632, 0xc76da129, 0xc966ac20, 0xe3578f1f, 0xed5c8216, 0xff41950d, 0xf14a9804, 0xab23d373, 0xa528de7a, 0xb735c961, 0xb93ec468, 0x930fe757, 0x9d04ea5e, 0x8f19fd45, 0x8112f04c,
            0x3bcb6bab, 0x35c066a2, 0x27dd71b9, 0x29d67cb0, 0x03e75f8f, 0x0dec5286, 0x1ff1459d, 0x11fa4894, 0x4b9303e3, 0x45980eea, 0x578519f1, 0x598e14f8, 0x73bf37c7, 0x7db43ace, 0x6fa92dd5, 0x61a220dc,
            0xadf66d76, 0xa3fd607f, 0xb1e07764, 0xbfeb7a6d, 0x95da5952, 0x9bd1545b, 0x89cc4340, 0x87c74e49, 0xddae053e, 0xd3a50837, 0xc1b81f2c, 0xcfb31225, 0xe582311a, 0xeb893c13, 0xf9942b08, 0xf79f2601,
            0x4d46bde6, 0x434db0ef, 0x5150a7f4, 0x5f5baafd, 0x756a89c2, 0x7b6184cb, 0x697c93d0, 0x67779ed9, 0x3d1ed5ae, 0x3315d8a7, 0x2108cfbc, 0x2f03c2b5, 0x0532e18a, 0x0b39ec83, 0x1924fb98, 0x172ff691,
            0x768dd64d, 0x7886db44, 0x6a9bcc5f, 0x6490c156, 0x4ea1e269, 0x40aaef60, 0x52b7f87b, 0x5cbcf572, 0x06d5be05, 0x08deb30c, 0x1ac3a417, 0x14c8a91e, 0x3ef98a21, 0x30f28728, 0x22ef9033, 0x2ce49d3a,
            0x963d06dd, 0x98360bd4, 0x8a2b1ccf, 0x842011c6, 0xae1132f9, 0xa01a3ff0, 0xb20728eb, 0xbc0c25e2, 0xe6656e95, 0xe86e639c, 0xfa737487, 0xf478798e, 0xde495ab1, 0xd04257b8, 0xc25f40a3, 0xcc544daa,
            0x41f7daec, 0x4ffcd7e5, 0x5de1c0fe, 0x53eacdf7, 0x79dbeec8, 0x77d0e3c1, 0x65cdf4da, 0x6bc6f9d3, 0x31afb2a4, 0x3fa4bfad, 0x2db9a8b6, 0x23b2a5bf, 0x09838680, 0x07888b89, 0x15959c92, 0x1b9e919b,
            0xa1470a7c, 0xaf4c0775, 0xbd51106e, 0xb35a1d67, 0x996b3e58, 0x97603351, 0x857d244a, 0x8b762943, 0xd11f6234, 0xdf146f3d, 0xcd097826, 0xc302752f, 0xe9335610, 0xe7385b19, 0xf5254c02, 0xfb2e410b,
            0x9a8c61d7, 0x94876cde, 0x869a7bc5, 0x889176cc, 0xa2a055f3, 0xacab58fa, 0xbeb64fe1, 0xb0bd42e8, 0xead4099f, 0xe4df0496, 0xf6c2138d, 0xf8c91e84, 0xd2f83dbb, 0xdcf330b2, 0xceee27a9, 0xc0e52aa0,
            0x7a3cb147, 0x7437bc4e, 0x662aab55, 0x6821a65c, 0x42108563, 0x4c1b886a, 0x5e069f71, 0x500d9278, 0x0a64d90f, 0x046fd406, 0x1672c31d, 0x1879ce14, 0x3248ed2b, 0x3c43e022, 0x2e5ef739, 0x2055fa30,
            0xec01b79a, 0xe20aba93, 0xf017ad88, 0xfe1ca081, 0xd42d83be, 0xda268eb7, 0xc83b99ac, 0xc63094a5, 0x9c59dfd2, 0x9252d2db, 0x804fc5c0, 0x8e44c8c9, 0xa475ebf6, 0xaa7ee6ff, 0xb863f1e4, 0xb668fced,
            0x0cb1670a, 0x02ba6a03, 0x10a77d18, 0x1eac7011, 0x349d532e, 0x3a965e27, 0x288b493c, 0x26804435, 0x7ce90f42, 0x72e2024b, 0x60ff1550, 0x6ef41859, 0x44c53b66, 0x4ace366f, 0x58d32174, 0x56d82c7d,
            0x377a0ca1, 0x397101a8, 0x2b6c16b3, 0x25671bba, 0x0f563885, 0x015d358c, 0x13402297, 0x1d4b2f9e, 0x472264e9, 0x492969e0, 0x5b347efb, 0x553f73f2, 0x7f0e50cd, 0x71055dc4, 0x63184adf, 0x6d1347d6,
            0xd7cadc31, 0xd9c1d138, 0xcbdcc623, 0xc5d7cb2a, 0xefe6e815, 0xe1ede51c, 0xf3f0f207, 0xfdfbff0e, 0xa792b479, 0xa999b970, 0xbb84ae6b, 0xb58fa362, 0x9fbe805d, 0x91b58d54, 0x83a89a4f, 0x8da39746
        ]);
    }
    AES.prototype.B0 = function (x) {
        return x & 0xff;
    };
    AES.prototype.B1 = function (x) {
        return (x >>> 8) & 0xff;
    };
    AES.prototype.B2 = function (x) {
        return (x >>> 16) & 0xff;
    };
    AES.prototype.B3 = function (x) {
        return (x >>> 24) & 0xff;
    };
    AES.prototype.F1 = function (x0, x1, x2, x3) {
        return (this.B1(this.T1[(x0) & 0xff])) |
            (this.B1(this.T1[(x1 >>> 8) & 0xff]) << 8) |
            (this.B1(this.T1[(x2 >>> 16) & 0xff]) << 16) |
            (this.B1(this.T1[(x3 >>> 24) & 0xff]) << 24);
    };
    AES.prototype.packBytes = function (octets) {
        var b = new Uint32Array(octets.length / 4);
        for (var i = 0, j = 0, len = octets.length; j < len; j += 4) {
            b[i++] = octets[j] | (octets[j + 1] << 8) | (octets[j + 2] << 16) | (octets[j + 3] << 24);
        }
        return b;
    };
    AES.prototype.unpackBytes = function (packed) {
        var r = new Uint8Array(packed.length * 4);
        for (var i = 0, j = 0, len = packed.length; j < len; j++) {
            r[i++] = this.B0(packed[j]);
            r[i++] = this.B1(packed[j]);
            r[i++] = this.B2(packed[j]);
            r[i++] = this.B3(packed[j]);
        }
        return r;
    };
    /**
     * \param {String} key given as array of bytes
     * \return {Object} .rounds and .keySched
     */
    AES.prototype.keyExpansion = function (key) {
        var rounds = this.keylen[key.length].rounds;
        var kc = this.keylen[key.length].kc;
        var maxkc = 8;
        var maxrk = 14;
        var keySched = [];
        var k = new Uint32Array(key.length);
        var tk = new Uint32Array(kc);
        var rconpointer = 0;
        var i, j, r, t;
        for (i = 0; i < maxrk + 1; i++) {
            keySched[i] = new Uint32Array(4);
        }
        for (i = 0, j = 0; j < key.length; j++, i += 4) {
            k[j] = key[i] | (key[i + 1] << 8) | (key[i + 2] << 16) | (key[i + 3] << 24);
        }
        for (j = kc - 1; j >= 0; j--) {
            tk[j] = k[j];
        }
        r = t = 0;
        for (j = 0; (j < kc) && (r < rounds + 1);) {
            for (; (j < kc) && (t < 4); j++, t++) {
                keySched[r][t] = tk[j];
            }
            if (t === 4) {
                r++;
                t = 0;
            }
        }
        while (r < rounds + 1) {
            var temp = tk[kc - 1];
            tk[0] ^= this.S[this.B1(temp)] | (this.S[this.B2(temp)] << 8) | (this.S[this.B3(temp)] << 16) | (this.S[this.B0(temp)] << 24);
            tk[0] ^= this.Rcon[rconpointer++];
            if (kc !== maxkc) {
                for (j = 1; j < kc; j++) {
                    tk[j] ^= tk[j - 1];
                }
            }
            else {
                for (j = 1; j < kc / 2; j++) {
                    tk[j] ^= tk[j - 1];
                }
                temp = tk[kc / 2 - 1];
                tk[kc / 2] ^= this.S[this.B0(temp)] | (this.S[this.B1(temp)] << 8) | (this.S[this.B2(temp)] << 16) | (this.S[this.B3(temp)] << 24);
                for (j = kc / 2 + 1; j < kc; j++) {
                    tk[j] ^= tk[j - 1];
                }
            }
            for (j = 0; (j < kc) && (r < rounds + 1);) {
                for (; (j < kc) && (t < 4); j++, t++) {
                    keySched[r][t] = tk[j];
                }
                if (t === 4) {
                    r++;
                    t = 0;
                }
            }
        }
        return { rk: keySched, rounds: rounds };
    };
    /**
     * @param {Array} key
     * @return {Object} rk and rounds
     */
    AES.prototype.prepare_decryption = function (key) {
        var r, w = 0;
        var maxrk = 14;
        var rk2 = [];
        var ctx = this.keyExpansion(key);
        var rounds = ctx.rounds;
        for (r = 0; r < maxrk + 1; r++) {
            rk2[r] = new Uint32Array(4);
            rk2[r][0] = ctx.rk[r][0];
            rk2[r][1] = ctx.rk[r][1];
            rk2[r][2] = ctx.rk[r][2];
            rk2[r][3] = ctx.rk[r][3];
        }
        for (r = 1; r < rounds; r++) {
            w = rk2[r][0];
            rk2[r][0] = this.U1[this.B0(w)] ^ this.U2[this.B1(w)] ^ this.U3[this.B2(w)] ^ this.U4[this.B3(w)];
            w = rk2[r][1];
            rk2[r][1] = this.U1[this.B0(w)] ^ this.U2[this.B1(w)] ^ this.U3[this.B2(w)] ^ this.U4[this.B3(w)];
            w = rk2[r][2];
            rk2[r][2] = this.U1[this.B0(w)] ^ this.U2[this.B1(w)] ^ this.U3[this.B2(w)] ^ this.U4[this.B3(w)];
            w = rk2[r][3];
            rk2[r][3] = this.U1[this.B0(w)] ^ this.U2[this.B1(w)] ^ this.U3[this.B2(w)] ^ this.U4[this.B3(w)];
        }
        return { rk: rk2, rounds: rounds };
    };
    /**
     * AES block encryption
     * @param {Uint8Array} key Key
     * @param {Uint8Array} pt The plaintext
     * @return {Uint8Array} Ciphertext
     */
    AES.prototype.encrypt = function (key, pt) {
        var r, t0, t1, t2, t3;
        var ctx = this.keyExpansion(key);
        var b = this.packBytes(pt);
        var rounds = ctx.rounds;
        var b0 = b[0];
        var b1 = b[1];
        var b2 = b[2];
        var b3 = b[3];
        for (r = 0; r < rounds - 1; r++) {
            t0 = b0 ^ ctx.rk[r][0];
            t1 = b1 ^ ctx.rk[r][1];
            t2 = b2 ^ ctx.rk[r][2];
            t3 = b3 ^ ctx.rk[r][3];
            b0 = this.T1[t0 & 0xFF] ^ this.T2[(t1 >>> 8) & 0xFF] ^ this.T3[(t2 >>> 16) & 0xFF] ^ this.T4[t3 >>> 24];
            b1 = this.T1[t1 & 0xFF] ^ this.T2[(t2 >>> 8) & 0xFF] ^ this.T3[(t3 >>> 16) & 0xFF] ^ this.T4[t0 >>> 24];
            b2 = this.T1[t2 & 0xFF] ^ this.T2[(t3 >>> 8) & 0xFF] ^ this.T3[(t0 >>> 16) & 0xFF] ^ this.T4[t1 >>> 24];
            b3 = this.T1[t3 & 0xFF] ^ this.T2[(t0 >>> 8) & 0xFF] ^ this.T3[(t1 >>> 16) & 0xFF] ^ this.T4[t2 >>> 24];
        }
        // last round is special
        r = rounds - 1;
        t0 = b0 ^ ctx.rk[r][0];
        t1 = b1 ^ ctx.rk[r][1];
        t2 = b2 ^ ctx.rk[r][2];
        t3 = b3 ^ ctx.rk[r][3];
        b[0] = this.F1(t0, t1, t2, t3) ^ ctx.rk[rounds][0];
        b[1] = this.F1(t1, t2, t3, t0) ^ ctx.rk[rounds][1];
        b[2] = this.F1(t2, t3, t0, t1) ^ ctx.rk[rounds][2];
        b[3] = this.F1(t3, t0, t1, t2) ^ ctx.rk[rounds][3];
        // security clear
        t0 = t1 = t2 = t3 = 0;
        for (var r_1 = 0; r_1 < ctx.rk.length; r_1++) {
            base_1.Util.clear(ctx.rk[r_1]);
        }
        return this.unpackBytes(b);
    };
    /**
     * AES block decryption
     * @param {Uint8Array} key Key
     * @param {Uint8Array} ct The ciphertext
     * @return {Uint8Array} Plaintext
     */
    AES.prototype.decrypt = function (key, ct) {
        var t0, t1, t2, t3;
        var ctx = this.prepare_decryption(key);
        var b = this.packBytes(ct);
        for (var r = ctx.rounds; r > 1; r--) {
            t0 = b[0] ^ ctx.rk[r][0];
            t1 = b[1] ^ ctx.rk[r][1];
            t2 = b[2] ^ ctx.rk[r][2];
            t3 = b[3] ^ ctx.rk[r][3];
            b[0] = this.T5[this.B0(t0)] ^ this.T6[this.B1(t3)] ^ this.T7[this.B2(t2)] ^ this.T8[this.B3(t1)];
            b[1] = this.T5[this.B0(t1)] ^ this.T6[this.B1(t0)] ^ this.T7[this.B2(t3)] ^ this.T8[this.B3(t2)];
            b[2] = this.T5[this.B0(t2)] ^ this.T6[this.B1(t1)] ^ this.T7[this.B2(t0)] ^ this.T8[this.B3(t3)];
            b[3] = this.T5[this.B0(t3)] ^ this.T6[this.B1(t2)] ^ this.T7[this.B2(t1)] ^ this.T8[this.B3(t0)];
        }
        // last round is special
        t0 = b[0] ^ ctx.rk[1][0];
        t1 = b[1] ^ ctx.rk[1][1];
        t2 = b[2] ^ ctx.rk[1][2];
        t3 = b[3] ^ ctx.rk[1][3];
        b[0] = this.S5[this.B0(t0)] | (this.S5[this.B1(t3)] << 8) | (this.S5[this.B2(t2)] << 16) | (this.S5[this.B3(t1)] << 24);
        b[1] = this.S5[this.B0(t1)] | (this.S5[this.B1(t0)] << 8) | (this.S5[this.B2(t3)] << 16) | (this.S5[this.B3(t2)] << 24);
        b[2] = this.S5[this.B0(t2)] | (this.S5[this.B1(t1)] << 8) | (this.S5[this.B2(t0)] << 16) | (this.S5[this.B3(t3)] << 24);
        b[3] = this.S5[this.B0(t3)] | (this.S5[this.B1(t2)] << 8) | (this.S5[this.B2(t1)] << 16) | (this.S5[this.B3(t0)] << 24);
        b[0] ^= ctx.rk[0][0];
        b[1] ^= ctx.rk[0][1];
        b[2] ^= ctx.rk[0][2];
        b[3] ^= ctx.rk[0][3];
        // security clear
        t0 = t1 = t2 = t3 = 0;
        for (var r = 0; r < ctx.rk.length; r++) {
            base_1.Util.clear(ctx.rk[r]);
        }
        return this.unpackBytes(b);
    };
    /**
     * Performs a quick selftest
     * @return {Boolean} True if successful
     */
    AES.prototype.selftest = function () {
        var tv_CBC_PKCS7 = [
            {
                key: '06a9214036b8a15b512e03d534120006',
                iv: '3dafba429d9eb430b422da802c9fac41',
                pt: '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f',
                ct: '714373e9991e8a58f79efa62b46f7652fbfa5de596b93acaafbdb2412311ac13e365c4170a4166dd1b95cfde3a21f6b2'
            },
            {
                key: '0x6c3ea0477630ce21a2ce334aa746c2cd',
                iv: '0xc782dc4c098c66cbd9cd27d825682c81',
                pt: 'a0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedf',
                ct: '90d0d1d8340ef5e8b9922f3c173ea1066632c5fec470be3935b5bfaeef033a0dd50a459d5c70fc8417540ae43cc507339b0085a268528f2d1de93cf65e96037685ebf5a6bcc81b70f132aba9b782ea99'
            }
        ];
        var aes = new AES_CBC_PKCS7();
        var res = true;
        for (var i = 0; i < tv_CBC_PKCS7.length; i++) {
            var key = base_1.Convert.hex2bin(tv_CBC_PKCS7[i].key);
            var pt = base_1.Convert.hex2bin(tv_CBC_PKCS7[i].pt);
            var ct = base_1.Convert.hex2bin(tv_CBC_PKCS7[i].ct);
            var iv = base_1.Convert.hex2bin(tv_CBC_PKCS7[i].iv);
            var ct2 = aes.encrypt(key, pt, iv);
            res = res && base_1.Util.compare(ct2, ct);
            var pt2 = aes.decrypt(key, ct, iv);
            res = res && base_1.Util.compare(pt2, pt);
        }
        return res;
    };
    return AES;
}());
exports.AES = AES;
///////////////////////////////////////////////////////////////////////////////
var AES_CBC = /** @class */ (function () {
    function AES_CBC() {
        this.cipher = new AES();
        this.blockmode = new blockmode_1.CBC(this.cipher);
    }
    AES_CBC.prototype.encrypt = function (key, pt, iv) {
        return this.blockmode.encrypt(key, pt, iv);
    };
    AES_CBC.prototype.decrypt = function (key, ct, iv) {
        return this.blockmode.decrypt(key, ct, iv);
    };
    return AES_CBC;
}());
exports.AES_CBC = AES_CBC;
var AES_CTR = /** @class */ (function () {
    function AES_CTR() {
        this.cipher = new AES();
        this.blockmode = new blockmode_1.CTR(this.cipher);
    }
    AES_CTR.prototype.encrypt = function (key, pt, iv) {
        return this.blockmode.encrypt(key, pt, iv);
    };
    AES_CTR.prototype.decrypt = function (key, ct, iv) {
        return this.blockmode.decrypt(key, ct, iv);
    };
    return AES_CTR;
}());
exports.AES_CTR = AES_CTR;
var AES_CBC_PKCS7 = /** @class */ (function () {
    function AES_CBC_PKCS7() {
        this.cipher = new AES_CBC();
        this.padding = new padding_1.PKCS7();
    }
    AES_CBC_PKCS7.prototype.encrypt = function (key, pt, iv) {
        return this.cipher.encrypt(key, this.padding.pad(pt, this.cipher.cipher.blockSize), iv);
    };
    AES_CBC_PKCS7.prototype.decrypt = function (key, ct, iv) {
        return this.padding.strip(this.cipher.decrypt(key, ct, iv));
    };
    return AES_CBC_PKCS7;
}());
exports.AES_CBC_PKCS7 = AES_CBC_PKCS7;
var AES_CTR_PKCS7 = /** @class */ (function () {
    function AES_CTR_PKCS7() {
        this.cipher = new AES_CTR();
        this.padding = new padding_1.PKCS7();
    }
    AES_CTR_PKCS7.prototype.encrypt = function (key, pt, iv) {
        return this.cipher.encrypt(key, this.padding.pad(pt, this.cipher.cipher.blockSize), iv);
    };
    AES_CTR_PKCS7.prototype.decrypt = function (key, ct, iv) {
        return this.padding.strip(this.cipher.decrypt(key, ct, iv));
    };
    return AES_CTR_PKCS7;
}());
exports.AES_CTR_PKCS7 = AES_CTR_PKCS7;


/***/ }),

/***/ "../../node_modules/mipher/dist/base.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/base.js ***!
  \**********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2018, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief mipher interface, convert and util functions
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
///////////////////////////////////////////////////////////////////////////////
// V E R S I O N
exports.version = '1.1.4';
///////////////////////////////////////////////////////////////////////////////
// C O N V E R T E R
var Convert;
(function (Convert) {
    /**
     * Convert a string (UTF-8 encoded) to a byte array
     * @param {String} str UTF-8 encoded string
     * @return {Uint8Array} Byte array
     */
    function str2bin(str) {
        str = str.replace(/\r\n/g, '\n');
        var bin = new Uint8Array(str.length * 3), p = 0;
        for (var i = 0, len = str.length; i < len; i++) {
            var c = str.charCodeAt(i);
            if (c < 128) {
                bin[p++] = c;
            }
            else if (c < 2048) {
                bin[p++] = (c >>> 6) | 192;
                bin[p++] = (c & 63) | 128;
            }
            else {
                bin[p++] = (c >>> 12) | 224;
                bin[p++] = ((c >>> 6) & 63) | 128;
                bin[p++] = (c & 63) | 128;
            }
        }
        return bin.subarray(0, p);
    }
    Convert.str2bin = str2bin;
    /**
     * Convert a hex string to byte array
     * @param {String} hex Hex string
     * @return {Uint8Array} Byte array
     */
    function hex2bin(hex) {
        if (hex.indexOf('0x') === 0 || hex.indexOf('0X') === 0) {
            hex = hex.substr(2);
        }
        if (hex.length % 2) {
            hex += '0';
        }
        var bin = new Uint8Array(hex.length >>> 1);
        for (var i = 0, len = hex.length >>> 1; i < len; i++) {
            bin[i] = parseInt(hex.substr(i << 1, 2), 16);
        }
        return bin;
    }
    Convert.hex2bin = hex2bin;
    /**
     * Convert a 32 bit integer number to a 4 byte array, LSB is first
     * @param {Number} integer Integer number
     * @return {Uint8Array} bin 4 byte array
     */
    function int2bin(integer) {
        var bin = new Uint8Array(4);
        bin[0] = (integer) & 0xff;
        bin[1] = (integer >>> 8) & 0xff;
        bin[2] = (integer >>> 16) & 0xff;
        bin[3] = (integer >>> 24) & 0xff;
        return bin;
    }
    Convert.int2bin = int2bin;
    /**
     * Convert a number to a 8 byte array, LSB is first
     * @param {Number} value Long number
     * @return {Uint8Array} bin 8 byte array
     */
    function number2bin(value) {
        var bin = new Uint8Array(8);
        if (Math.floor(value) === value) {
            var TWO_PWR_32 = 4294967296;
            var lo = (value % TWO_PWR_32) | 0, hi = (value / TWO_PWR_32) | 0;
            if (value < 0) {
                lo = ~(-value % TWO_PWR_32) | 0, hi = ~(-value / TWO_PWR_32) | 0;
                lo = (lo + 1) & 0xffffffff;
                if (!lo)
                    hi++;
            }
            var i = 0;
            bin[i++] = (lo & 0xff);
            bin[i++] = (lo >>> 8) & 0xff;
            bin[i++] = (lo >>> 16) & 0xff;
            bin[i++] = (lo >>> 24) & 0xff;
            bin[i++] = (hi & 0xff);
            bin[i++] = (hi >>> 8) & 0xff;
            bin[i++] = (hi >>> 16) & 0xff;
            bin[i] = (hi >>> 24) & 0xff;
        }
        else {
            var f = new Float64Array([value]);
            var d = new Uint8Array(f.buffer);
            bin.set(d);
        }
        return bin;
    }
    Convert.number2bin = number2bin;
    /**
     * Convert a base64/base64url string to a byte array
     * @param {String} base64 Base64/Base64url encoded string
     * @return {Uint8Array} Byte array or undefined if error
     */
    function base642bin(base64) {
        // remove base64url encoding
        base64 = base64.replace(/-/g, '+').replace(/_/g, '/').replace(/%3d/g, '=');
        // length must be multiple of 4
        if (base64.length % 4 !== 0)
            return;
        var strlen = base64.length / 4 * 3;
        if (base64.charAt(base64.length - 1) === '=')
            strlen--;
        if (base64.charAt(base64.length - 2) === '=')
            strlen--;
        if (typeof atob !== 'undefined') {
            return new Uint8Array(atob(base64).split('').map(function (c) { return c.charCodeAt(0); }));
        }
        else {
            // atob not available
            var decodingTable = new Int8Array([
                -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, 62, -1, 62, -1, 63,
                52, 53, 54, 55, 56, 57, 58, 59,
                60, 61, -1, -1, -1, -2, -1, -1,
                -1, 0, 1, 2, 3, 4, 5, 6,
                7, 8, 9, 10, 11, 12, 13, 14,
                15, 16, 17, 18, 19, 20, 21, 22,
                23, 24, 25, -1, -1, -1, -1, 63,
                -1, 26, 27, 28, 29, 30, 31, 32,
                33, 34, 35, 36, 37, 38, 39, 40,
                41, 42, 43, 44, 45, 46, 47, 48,
                49, 50, 51, -1, -1, -1, -1, -1 // x y z .  . . . .
            ]);
            var p = 0, bin = new Uint8Array(strlen);
            for (var i = 0, len = base64.length; i < len;) {
                var sextet_a = base64.charAt(i) === '=' || base64.charCodeAt(i) > 'z'.charCodeAt(0) ? 0 : decodingTable[base64.charCodeAt(i)];
                i++;
                var sextet_b = base64.charAt(i) === '=' || base64.charCodeAt(i) > 'z'.charCodeAt(0) ? 0 : decodingTable[base64.charCodeAt(i)];
                i++;
                var sextet_c = base64.charAt(i) === '=' || base64.charCodeAt(i) > 'z'.charCodeAt(0) ? 0 : decodingTable[base64.charCodeAt(i)];
                i++;
                var sextet_d = base64.charAt(i) === '=' || base64.charCodeAt(i) > 'z'.charCodeAt(0) ? 0 : decodingTable[base64.charCodeAt(i)];
                i++;
                var triple = (sextet_a << 18) +
                    (sextet_b << 12) +
                    (sextet_c << 6) +
                    (sextet_d);
                if (base64.charAt(i - 3) !== '=')
                    bin[p++] = (triple >>> 16) & 0xff;
                if (base64.charAt(i - 2) !== '=')
                    bin[p++] = (triple >>> 8) & 0xff;
                if (base64.charAt(i - 1) !== '=')
                    bin[p++] = (triple) & 0xff;
            }
            return bin;
        }
    }
    Convert.base642bin = base642bin;
    /**
     * Convert a byte array to hex string
     * @param {Uint8Array} bin The input byte array
     * @param {Boolean} uppercase True for upper case hex numbers
     * @return {String} Hex sting
     */
    function bin2hex(bin, uppercase) {
        if (uppercase === void 0) { uppercase = false; }
        var hex = uppercase ? '0123456789ABCDEF' : '0123456789abcdef';
        var str = '';
        for (var i = 0, len = bin.length; i < len; i++) {
            str += hex.charAt((bin[i] >>> 4) & 0x0f) + hex.charAt(bin[i] & 0x0f);
            // str += bin[i].toString(16);
        }
        return str;
    }
    Convert.bin2hex = bin2hex;
    /**
     * Convert a byte array to string (UTF-8 dedode)
     * @param {Uint8Array} bin UTF-8 text given as array of bytes
     * @return {String} UTF-8 Text string
     */
    function bin2str(bin) {
        var str = '', len = bin.length, i = 0, c, c2, c3;
        while (i < len) {
            c = bin[i];
            if (c < 128) {
                str += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = bin[i + 1];
                str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = bin[i + 1];
                c3 = bin[i + 2];
                str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return str;
    }
    Convert.bin2str = bin2str;
    /**
     * Convert a byte value array in a long value array
     * @param {Uint8Array} bin Array of bytes
     * @return {Uint32Array} bin values in long format
     */
    function bin2longbin(bin) {
        var longbin = new Uint32Array(bin.length >>> 2);
        for (var i = 0, len = bin.length; i < len; i++) {
            longbin[i >>> 2] |= (bin[i] << ((i % 4) << 3));
        }
        return longbin;
    }
    Convert.bin2longbin = bin2longbin;
    /**
     * Convert a 8 byte (int64) array into a number
     * @param {Uint8Array} bin Array of 8 bytes (int64), LSB is [0], MSB is [7]
     * @return {Number} int64 value as number
     */
    function bin2number(bin) {
        var TWO_PWR_32 = 4294967296;
        var i = 0;
        var lo = bin[i++] | bin[i++] << 8 | bin[i++] << 16 | bin[i++] << 24;
        var hi = bin[i++] | bin[i++] << 8 | bin[i++] << 16 | bin[i] << 24;
        return hi * TWO_PWR_32 + ((lo >= 0) ? lo : TWO_PWR_32 + lo);
    }
    Convert.bin2number = bin2number;
    /**
     * Convert byte array to base64/base64url string
     * @param {Uint8Array} bin Array of bytes
     * @param {Boolean} url True if the string should be URL encoded (base64url encoding)
     * @return {String} Base64 encoded string
     */
    function bin2base64(bin, url) {
        if (url === void 0) { url = false; }
        if (typeof btoa !== 'undefined') {
            return url ? btoa(String.fromCharCode.apply(null, bin)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '%3d') :
                btoa(String.fromCharCode.apply(null, bin));
        }
        else {
            // btoa not available
            var base64 = '', encodingTable = url ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_' :
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            for (var i = 0, len = bin.length; i < len;) {
                var octet_a = i < bin.length ? bin[i] : 0;
                i++;
                var octet_b = i < bin.length ? bin[i] : 0;
                i++;
                var octet_c = i < bin.length ? bin[i] : 0;
                i++;
                var triple = (octet_a << 0x10) + (octet_b << 0x08) + octet_c;
                base64 += encodingTable.charAt((triple >>> 18) & 0x3F);
                base64 += encodingTable.charAt((triple >>> 12) & 0x3F);
                base64 += (i < bin.length + 2) ? encodingTable.charAt((triple >>> 6) & 0x3F) : (url ? '%3d' : '=');
                base64 += (i < bin.length + 1) ? encodingTable.charAt((triple >>> 0) & 0x3F) : (url ? '%3d' : '=');
            }
            return base64;
        }
    }
    Convert.bin2base64 = bin2base64;
})(Convert = exports.Convert || (exports.Convert = {}));
///////////////////////////////////////////////////////////////////////////////
// U T I L S
var Util;
(function (Util) {
    /**
     * Time constant comparison of two arrays
     * @param {Uint8Array} lh First array of bytes
     * @param {Uint8Array} rh Second array of bytes
     * @return {Boolean} True if the arrays are equal (length and content), false otherwise
     */
    function compare(lh, rh) {
        if (lh.length !== rh.length) {
            // abort
            return false;
        }
        var i, d = 0, len = lh.length;
        for (i = 0; i < len; i++) {
            d |= lh[i] ^ rh[i];
        }
        return d === 0;
    }
    Util.compare = compare;
    /**
     * Clear an array
     * @param {Uint8Array | Uint16Array | Uint32Array} Array to clear
     */
    function clear(data) {
        data.fill(0);
    }
    Util.clear = clear;
    /**
     * XOR two arrays and return the result array
     * @param {Uint8Array} lh First array of bytes
     * @param {Uint8Array} rh Second array of bytes
     * @return {Uint8Array} XORed result array
     */
    function xor(lh, rh) {
        return lh.map(function (val, ind) { return val ^ rh[ind]; });
    }
    Util.xor = xor;
    /**
     * Concat two arrays and returns a new result array
     * @param {Uint8Array} lh First array of bytes
     * @param {Uint8Array} rh Second array of bytes
     * @return {Uint8Array} Concatenated result array
     */
    function concat(lh, rh) {
        var x = new Uint8Array(lh.length + rh.length);
        x.set(lh, 0);
        x.set(rh, lh.length);
        return x;
    }
    Util.concat = concat;
    /**
     * Returns true if LITTLE endian is detected
     * @return {Boolean} True for LE, false for BE
     */
    function litteendian() {
        return (new Uint32Array((new Uint8Array([1, 2, 3, 4])).buffer))[0] === 0x04030201;
    }
    Util.litteendian = litteendian;
})(Util = exports.Util || (exports.Util = {}));


/***/ }),

/***/ "../../node_modules/mipher/dist/blockmode.js":
/*!***************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/blockmode.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief block cipher modes implementation
// usage: var aes = new mipher.blockmode(new mipher.rijndael())
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var ECB = /** @class */ (function () {
    /**
     * ECB ctor
     * @param {Object} blockcipher The block cipher algorithm to use
     */
    function ECB(blockcipher) {
        this.blockcipher = blockcipher;
    }
    /**
     * ECB mode encryption
     * This mode just passes the input to the output - unsecure, use just for testing!
     * iv is unused
     */
    ECB.prototype.encrypt = function (key, pt, iv) {
        return this.blockcipher.encrypt(key, pt);
    };
    /**
     * ECB mode decryption
     * This mode just passes the input to the output - unsecure, use just for testing!
     * iv is unused
     */
    ECB.prototype.decrypt = function (key, ct, iv) {
        return this.blockcipher.decrypt(key, ct);
    };
    return ECB;
}());
exports.ECB = ECB;
//////////////////////////////////////////////////////////////////////////
var CBC = /** @class */ (function () {
    /**
     * CBC ctor
     * @param {Object} blockcipher The block cipher algorithm to use
     */
    function CBC(blockcipher) {
        this.blockcipher = blockcipher;
    }
    /**
     * CBC mode encryption
     */
    CBC.prototype.encrypt = function (key, pt, iv) {
        var bs = this.blockcipher.blockSize, ct = new Uint8Array(pt.length), et = new Uint8Array(bs);
        // process first block
        for (var f = 0; f < bs; f++) {
            et[f] = pt[f] ^ (iv[f] || 0);
        }
        ct.set(this.blockcipher.encrypt(key, et), 0);
        // process the other blocks
        for (var b = 1, len = pt.length / bs; b < len; b++) {
            for (var i = 0; i < bs; i++) {
                et[i] = pt[i + (b * bs)] ^ ct[i + ((b - 1) * bs)];
            }
            ct.set(this.blockcipher.encrypt(key, et), b * bs);
        }
        return ct;
    };
    /**
     * CBC mode decryption
     */
    CBC.prototype.decrypt = function (key, ct, iv) {
        var bs = this.blockcipher.blockSize, pt = new Uint8Array(ct.length);
        // process first block
        pt.set(this.blockcipher.decrypt(key, ct.subarray(0, bs)), 0);
        for (var i = 0, len = bs; i < len; i++) {
            pt[i] = pt[i] ^ (iv[i] || 0);
        }
        // process other blocks
        for (var b = 1, l = ct.length / bs; b < l; b++) {
            pt.set(this.blockcipher.decrypt(key, ct.subarray(b * bs, (b + 1) * bs)), b * bs);
            for (var i = 0; i < bs; i++) {
                pt[i + (b * bs)] = pt[i + (b * bs)] ^ ct[i + ((b - 1) * bs)];
            }
        }
        return pt;
    };
    return CBC;
}());
exports.CBC = CBC;
//////////////////////////////////////////////////////////////////////////
var CTR = /** @class */ (function () {
    /**
     * CTR ctor
     * @param {Object} blockcipher The block cipher algorithm to use
     */
    function CTR(blockcipher) {
        this.blockcipher = blockcipher;
        // init counter
        this.ctr = new Uint8Array(this.blockcipher.blockSize);
    }
    /**
     * CTR mode encryption
     */
    CTR.prototype.encrypt = function (key, pt, iv) {
        var bs = this.blockcipher.blockSize, ct = new Uint8Array(pt.length);
        this.ctr.set(iv || this.ctr);
        // process blocks
        for (var b = 0, len = pt.length / bs; b < len; b++) {
            ct.set(this.blockcipher.encrypt(key, this.ctr), b * bs);
            for (var i = 0; i < bs; i++) {
                ct[i + (b * bs)] ^= pt[i + (b * bs)];
            }
            // increment the counter
            this.ctr[0]++;
            for (var i = 0; i < bs - 1; i++) {
                if (this.ctr[i] === 0) {
                    this.ctr[i + 1]++;
                }
                else
                    break;
            }
        }
        return ct;
    };
    /**
     * CTR mode decryption
     */
    CTR.prototype.decrypt = function (key, ct, iv) {
        var bs = this.blockcipher.blockSize, pt = new Uint8Array(ct.length);
        this.ctr.set(iv || this.ctr);
        // process blocks
        for (var b = 0, len = ct.length / bs; b < len; b++) {
            pt.set(this.blockcipher.encrypt(key, this.ctr), b * bs);
            for (var i = 0; i < bs; i++) {
                pt[i + (b * bs)] ^= ct[i + (b * bs)];
            }
            // increment the counter
            this.ctr[0]++;
            for (var i = 0; i < bs - 1; i++) {
                if (this.ctr[i] === 0) {
                    this.ctr[i + 1]++;
                }
                else
                    break;
            }
        }
        return pt;
    };
    return CTR;
}());
exports.CTR = CTR;


/***/ }),

/***/ "../../node_modules/mipher/dist/chacha20.js":
/*!**************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/chacha20.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2016, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief chacha20 stream cipher implementation
// This implementation is derived from chacha.c
// See for details: http://cr.yp.to/chacha.html
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ChaCha20 class
 */
var ChaCha20 = /** @class */ (function () {
    /**
     * ctor
     */
    function ChaCha20() {
        this.keySize = 32; // 256 bit key
        this.nonceSize = 8; //  64 bit nonce
    }
    /**
     * Init, private function
      * @param {Array} key The secret key as byte array (32 byte)
      * @param {Array} nonce The nonce (IV) as byte array (8 byte)
      * @param {Number} counter Optional counter init value, 0 is default
      * @return {ChaCha20} this
     */
    ChaCha20.prototype.init = function (key, nonce, counter) {
        if (counter === void 0) { counter = 0; }
        this.input = new Uint32Array(16);
        this.input[0] = 0x61707865; // constant "expand 32-byte k"
        this.input[1] = 0x3320646e;
        this.input[2] = 0x79622d32;
        this.input[3] = 0x6b206574;
        this.input[4] = this.U8TO32_LITTLE(key, 0); // key
        this.input[5] = this.U8TO32_LITTLE(key, 4);
        this.input[6] = this.U8TO32_LITTLE(key, 8);
        this.input[7] = this.U8TO32_LITTLE(key, 12);
        this.input[8] = this.U8TO32_LITTLE(key, 16);
        this.input[9] = this.U8TO32_LITTLE(key, 20);
        this.input[10] = this.U8TO32_LITTLE(key, 24);
        this.input[11] = this.U8TO32_LITTLE(key, 28);
        this.input[12] = counter & 0xffffffff; // counter, (chacha20 is like a block cipher in CTR mode)
        this.input[13] = 0;
        this.input[14] = this.U8TO32_LITTLE(nonce, 0); // nonce
        this.input[15] = this.U8TO32_LITTLE(nonce, 4);
        return this;
    };
    ChaCha20.prototype.U8TO32_LITTLE = function (x, i) {
        return x[i] | (x[i + 1] << 8) | (x[i + 2] << 16) | (x[i + 3] << 24);
    };
    ChaCha20.prototype.U32TO8_LITTLE = function (x, i, u) {
        x[i] = u & 0xff;
        u >>>= 8;
        x[i + 1] = u & 0xff;
        u >>>= 8;
        x[i + 2] = u & 0xff;
        u >>>= 8;
        x[i + 3] = u & 0xff;
    };
    ChaCha20.prototype.ROTATE = function (v, c) {
        return (v << c) | (v >>> (32 - c));
    };
    ChaCha20.prototype.QUARTERROUND = function (x, a, b, c, d) {
        x[a] += x[b];
        x[d] = this.ROTATE(x[d] ^ x[a], 16);
        x[c] += x[d];
        x[b] = this.ROTATE(x[b] ^ x[c], 12);
        x[a] += x[b];
        x[d] = this.ROTATE(x[d] ^ x[a], 8);
        x[c] += x[d];
        x[b] = this.ROTATE(x[b] ^ x[c], 7);
    };
    ChaCha20.prototype.stream = function (src, dst, len) {
        var s = new Uint32Array(16), buf = new Uint8Array(64);
        var i = 0, dpos = 0, spos = 0;
        while (len > 0) {
            for (i = 16; i--;) {
                s[i] = this.input[i];
            }
            for (i = 0; i < 10; ++i) {
                this.QUARTERROUND(s, 0, 4, 8, 12);
                this.QUARTERROUND(s, 1, 5, 9, 13);
                this.QUARTERROUND(s, 2, 6, 10, 14);
                this.QUARTERROUND(s, 3, 7, 11, 15);
                this.QUARTERROUND(s, 0, 5, 10, 15);
                this.QUARTERROUND(s, 1, 6, 11, 12);
                this.QUARTERROUND(s, 2, 7, 8, 13);
                this.QUARTERROUND(s, 3, 4, 9, 14);
            }
            for (i = 0; i < 16; ++i) {
                s[i] += this.input[i];
            }
            for (i = 0; i < 16; ++i) {
                this.U32TO8_LITTLE(buf, 4 * i, s[i]);
            }
            // inc 64 bit counter
            if (++this.input[12] === 0) {
                this.input[13]++;
            }
            if (len <= 64) {
                for (i = len; i--;) {
                    dst[i + dpos] = src[i + spos] ^ buf[i];
                }
                return;
            }
            for (i = 64; i--;) {
                dst[i + dpos] = src[i + spos] ^ buf[i];
            }
            len -= 64;
            spos += 64;
            dpos += 64;
        }
    };
    /**
     * Encrypt a byte array, native chacha20 function
     * @param {Uint8Array} key The secret key as byte array (32 byte)
     * @param {Uint8Array} pt Plaintext as byte array
     * @param {Uint8Array} iv The nonce (IV) as byte array (8 byte)
     * @param {Number} cnt Optional counter init value, 0 is default
     * @return {Uint8Array} ct Ciphertext as byte array
     */
    ChaCha20.prototype.encrypt = function (key, pt, iv, cnt) {
        if (cnt === void 0) { cnt = 0; }
        var ct = new Uint8Array(pt.length);
        this.init(key, iv, cnt).stream(pt, ct, pt.length);
        return ct;
    };
    /**
     * Decrypt a byte array, native chacha20 function
     * @param {Uint8Array} key The secret key as byte array
     * @param {Uint8Array} ct Ciphertext as byte array
     * @param {Uint8Array} iv The nonce (IV) as byte array
     * @param {Number} cnt Optional counter init value, 0 is default
     * @return {Uint8Array} pt Plaintext as byte array
     */
    ChaCha20.prototype.decrypt = function (key, ct, iv, cnt) {
        if (cnt === void 0) { cnt = 0; }
        var pt = new Uint8Array(ct.length);
        this.init(key, iv, cnt).stream(ct, pt, ct.length);
        return pt;
    };
    /**
     * Performs a quick selftest
     * @return {Boolean} True if successful
     */
    ChaCha20.prototype.selftest = function () {
        return true;
    };
    return ChaCha20;
}());
exports.ChaCha20 = ChaCha20;


/***/ }),

/***/ "../../node_modules/mipher/dist/hmac.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/hmac.js ***!
  \**********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief HMAC implementation
//        Generates a HMAC value
//
///////////////////////////////////////////////////////////////////////////////
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
var padding_1 = __webpack_require__(/*! ./padding */ "../../node_modules/mipher/dist/padding.js");
var sha1_1 = __webpack_require__(/*! ./sha1 */ "../../node_modules/mipher/dist/sha1.js");
var sha256_1 = __webpack_require__(/*! ./sha256 */ "../../node_modules/mipher/dist/sha256.js");
var sha512_1 = __webpack_require__(/*! ./sha512 */ "../../node_modules/mipher/dist/sha512.js");
/**
 * HMAC class
 */
var HMAC = /** @class */ (function () {
    /**
     * ctor
     * @param {Hash} hasher Hashing function
     */
    function HMAC(hasher) {
        this.hasher = hasher;
        this.hashSize = hasher.hashSize;
        this.B = this.hashSize <= 32 ? 64 : 128; // according to RFC4868
        this.iPad = 0x36;
        this.oPad = 0x5c;
    }
    /**
     * Init the HMAC
     * @param {Uint8Array} key The key
     */
    HMAC.prototype.init = function (key) {
        // process the key
        var _key = new Uint8Array(key);
        if (_key.length > this.B) {
            // keys longer than blocksize are shortened
            this.hasher.init();
            _key = this.hasher.digest(key);
        }
        _key = (new padding_1.ZeroPadding()).pad(_key, this.B);
        // setup the key pads
        this.iKeyPad = new Uint8Array(this.B);
        this.oKeyPad = new Uint8Array(this.B);
        for (var i = 0; i < this.B; ++i) {
            this.iKeyPad[i] = this.iPad ^ _key[i];
            this.oKeyPad[i] = this.oPad ^ _key[i];
        }
        // security: delete the key
        base_1.Util.clear(_key);
        // initial hash
        this.hasher.init();
        this.hasher.update(this.iKeyPad);
        return this;
    };
    /**
     * Update the HMAC with additional message data
     * @param {Uint8Array} msg Additional message data
     * @return {HMAC} this object
     */
    HMAC.prototype.update = function (msg) {
        msg = msg || new Uint8Array(0);
        this.hasher.update(msg);
        return this;
    };
    /**
     * Finalize the HMAC with additional message data
     * @param {Uint8Array} msg Additional message data
     * @return {Uint8Array} HMAC (Hash-based Message Authentication Code)
     */
    HMAC.prototype.digest = function (msg) {
        msg = msg || new Uint8Array(0);
        var sum1 = this.hasher.digest(msg); // get sum 1
        this.hasher.init();
        return this.hasher.update(this.oKeyPad).digest(sum1);
    };
    /**
     * All in one step
     * @param {Uint8Array} key Key
     * @param {Uint8Array} msg Message data
     * @return {Uint8Array} Hash as byte array
     */
    HMAC.prototype.hash = function (key, msg) {
        return this.init(key).digest(msg);
    };
    /**
     * Performs a quick selftest
     * @return {Boolean} True if successful
     */
    HMAC.prototype.selftest = function () {
        return false;
    };
    return HMAC;
}());
exports.HMAC = HMAC;
///////////////////////////////////////////////////////////////////////////////
var HMAC_SHA1 = /** @class */ (function (_super) {
    __extends(HMAC_SHA1, _super);
    function HMAC_SHA1() {
        return _super.call(this, new sha1_1.SHA1()) || this;
    }
    return HMAC_SHA1;
}(HMAC));
exports.HMAC_SHA1 = HMAC_SHA1;
var HMAC_SHA256 = /** @class */ (function (_super) {
    __extends(HMAC_SHA256, _super);
    function HMAC_SHA256() {
        return _super.call(this, new sha256_1.SHA256()) || this;
    }
    return HMAC_SHA256;
}(HMAC));
exports.HMAC_SHA256 = HMAC_SHA256;
var HMAC_SHA512 = /** @class */ (function (_super) {
    __extends(HMAC_SHA512, _super);
    function HMAC_SHA512() {
        return _super.call(this, new sha512_1.SHA512()) || this;
    }
    return HMAC_SHA512;
}(HMAC));
exports.HMAC_SHA512 = HMAC_SHA512;


/***/ }),

/***/ "../../node_modules/mipher/dist/index.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2018, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief mipher module exports
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
exports.Convert = base_1.Convert;
exports.Util = base_1.Util;
exports.version = base_1.version;
var blockmode_1 = __webpack_require__(/*! ./blockmode */ "../../node_modules/mipher/dist/blockmode.js");
exports.CBC = blockmode_1.CBC;
exports.CTR = blockmode_1.CTR;
exports.ECB = blockmode_1.ECB;
var aes_1 = __webpack_require__(/*! ./aes */ "../../node_modules/mipher/dist/aes.js");
exports.AES = aes_1.AES;
exports.AES_CBC = aes_1.AES_CBC;
exports.AES_CTR = aes_1.AES_CTR;
exports.AES_CBC_PKCS7 = aes_1.AES_CBC_PKCS7;
exports.AES_CTR_PKCS7 = aes_1.AES_CTR_PKCS7;
var serpent_1 = __webpack_require__(/*! ./serpent */ "../../node_modules/mipher/dist/serpent.js");
exports.Serpent = serpent_1.Serpent;
exports.Serpent_CBC = serpent_1.Serpent_CBC;
exports.Serpent_CTR = serpent_1.Serpent_CTR;
exports.Serpent_CBC_PKCS7 = serpent_1.Serpent_CBC_PKCS7;
exports.Serpent_CTR_PKCS7 = serpent_1.Serpent_CTR_PKCS7;
var chacha20_1 = __webpack_require__(/*! ./chacha20 */ "../../node_modules/mipher/dist/chacha20.js");
exports.ChaCha20 = chacha20_1.ChaCha20;
var x25519_1 = __webpack_require__(/*! ./x25519 */ "../../node_modules/mipher/dist/x25519.js");
exports.Curve25519 = x25519_1.Curve25519;
exports.Ed25519 = x25519_1.Ed25519;
var pbkdf2_1 = __webpack_require__(/*! ./pbkdf2 */ "../../node_modules/mipher/dist/pbkdf2.js");
exports.PBKDF2 = pbkdf2_1.PBKDF2;
var hmac_1 = __webpack_require__(/*! ./hmac */ "../../node_modules/mipher/dist/hmac.js");
exports.HMAC = hmac_1.HMAC;
exports.HMAC_SHA1 = hmac_1.HMAC_SHA1;
exports.HMAC_SHA256 = hmac_1.HMAC_SHA256;
exports.HMAC_SHA512 = hmac_1.HMAC_SHA512;
var sha1_1 = __webpack_require__(/*! ./sha1 */ "../../node_modules/mipher/dist/sha1.js");
exports.SHA1 = sha1_1.SHA1;
var sha256_1 = __webpack_require__(/*! ./sha256 */ "../../node_modules/mipher/dist/sha256.js");
exports.SHA256 = sha256_1.SHA256;
var sha512_1 = __webpack_require__(/*! ./sha512 */ "../../node_modules/mipher/dist/sha512.js");
exports.SHA512 = sha512_1.SHA512;
var sha3_1 = __webpack_require__(/*! ./sha3 */ "../../node_modules/mipher/dist/sha3.js");
exports.Keccak = sha3_1.Keccak;
exports.Keccak_256 = sha3_1.Keccak_256;
exports.Keccak_384 = sha3_1.Keccak_384;
exports.Keccak_512 = sha3_1.Keccak_512;
exports.SHA3_256 = sha3_1.SHA3_256;
exports.SHA3_384 = sha3_1.SHA3_384;
exports.SHA3_512 = sha3_1.SHA3_512;
exports.SHAKE128 = sha3_1.SHAKE128;
exports.SHAKE256 = sha3_1.SHAKE256;
var uuid_1 = __webpack_require__(/*! ./uuid */ "../../node_modules/mipher/dist/uuid.js");
exports.UUID = uuid_1.UUID;
var random_1 = __webpack_require__(/*! ./random */ "../../node_modules/mipher/dist/random.js");
exports.Random = random_1.Random;


/***/ }),

/***/ "../../node_modules/mipher/dist/padding.js":
/*!*************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/padding.js ***!
  \*************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2016, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief padding modes implementation
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var PKCS7 = /** @class */ (function () {
    function PKCS7() {
    }
    /**
     * PKCS#7 padding function. Pads bytes to given text until text is multiple of blocksize is met
     * @param {Uint8Array} bin Byte array where the bytes are padded
     * @param {Number} blocksize The blocksize in bytes of the text to which the text should be padded
     * @return {Uint8Array} Padded byte array
     */
    PKCS7.prototype.pad = function (bin, blocksize) {
        var len = bin.length % blocksize ? blocksize - (bin.length % blocksize) : blocksize;
        var out = new Uint8Array(bin.length + len);
        out.set(bin, 0);
        for (var i = bin.length, l = bin.length + len; i < l; ++i) {
            out[i] = len;
        }
        return out;
    };
    /**
     * PKCS#7 stripping function. Strips bytes of the given text
     * @param {Uint8Array} bin Byte array where the bytes are stripped
     * @return {Uint8Array} Stripped byte array
     */
    PKCS7.prototype.strip = function (bin) {
        return bin.subarray(0, bin.length - bin[bin.length - 1]);
    };
    return PKCS7;
}());
exports.PKCS7 = PKCS7;
///////////////////////////////////////////////////////////////////////////////
var PKCS5 = /** @class */ (function () {
    /**
     * PKCS#5 ctor
     */
    function PKCS5() {
        this.pkcs7 = new PKCS7();
    }
    /**
     * PKCS#5 padding function. Pads bytes to given text until text is multiple of 8
     * @param {Uint8Array} bin Byte array where the bytes are padded
     * @return {Uint8Array} Padded byte array
     */
    PKCS5.prototype.pad = function (bin) {
        return this.pkcs7.pad(bin, 8);
    };
    /**
     * PKCS#5 stripping function. Strips bytes of the given text
     * @param {Uint8Array} bin Byte array where the bytes are stripped
     * @return {Uint8Array} Stripped byte array
     */
    PKCS5.prototype.strip = function (bin) {
        return this.pkcs7.strip(bin);
    };
    return PKCS5;
}());
exports.PKCS5 = PKCS5;
///////////////////////////////////////////////////////////////////////////////
var ZeroPadding = /** @class */ (function () {
    function ZeroPadding() {
    }
    /**
     * Pads zero bytes to the given array until the length is a multiple of blocksize
     * @param {Uint8Array} bin The text where the zero bytes are padded
     * @param {Number} blocksize The blocksize to which the array should be padded
     * @return {Uint8Array} Padded byte array
     */
    ZeroPadding.prototype.pad = function (bin, blocksize) {
        if (bin.length % blocksize === 0)
            return;
        var out = new Uint8Array(blocksize);
        out.set(bin, 0);
        return out;
    };
    /**
     * Zero stripping function. Just a dummy
     * @param {Array} bin Byte array where the bytes are stripped
     */
    ZeroPadding.prototype.strip = function (bin) {
        return bin;
    };
    return ZeroPadding;
}());
exports.ZeroPadding = ZeroPadding;


/***/ }),

/***/ "../../node_modules/mipher/dist/pbkdf2.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/pbkdf2.js ***!
  \************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2016, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief PBKDF2 implementation
//        Password-Based Key Derivation Function 2, takes a hash/HMAC function and
//        generates a derived, streched password key due to iteration rounds.
//        At least a minimum of 10000 rounds are recommended!
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
var sha256_1 = __webpack_require__(/*! ./sha256 */ "../../node_modules/mipher/dist/sha256.js");
var hmac_1 = __webpack_require__(/*! ./hmac */ "../../node_modules/mipher/dist/hmac.js");
/**
 * PBKDF2 class
 */
var PBKDF2 = /** @class */ (function () {
    /**
     * ctor
     * @param {KeyedHash} hmac HMAC function like HMAC-SHA1 or HMAC-SHA256
     * @param {Number} rounds Optional, number of iterations, defaults to 10000
     */
    function PBKDF2(hmac, rounds) {
        if (rounds === void 0) { rounds = 10000; }
        this.hmac = hmac;
        this.rounds = rounds;
    }
    /**
     * Generate derived key
     * @param {Uint8Array} password The password
     * @param {Uint8Array} salt The salt
     * @param {Number} length Optional, the derived key length (dkLen), defaults to the half of the HMAC block size
     * @return {Uint8Array} The derived key as byte array
     */
    PBKDF2.prototype.hash = function (password, salt, length) {
        var u, ui;
        length = length || (this.hmac.hashSize >>> 1);
        var out = new Uint8Array(length);
        for (var k = 1, len = Math.ceil(length / this.hmac.hashSize); k <= len; k++) {
            u = ui = this.hmac.init(password).update(salt).digest(new Uint8Array([(k >>> 24) & 0xFF, (k >>> 16) & 0xFF, (k >>> 8) & 0xFF, k & 0xFF]));
            for (var i = 1; i < this.rounds; i++) {
                ui = this.hmac.hash(password, ui);
                for (var j = 0; j < ui.length; j++) {
                    u[j] ^= ui[j];
                }
            }
            // append data
            out.set(u.subarray(0, k * this.hmac.hashSize < length ? this.hmac.hashSize : length - (k - 1) * this.hmac.hashSize), (k - 1) * this.hmac.hashSize);
        }
        return out;
    };
    /**
     * Performs a quick selftest
     * @return {Boolean} True if successful
     */
    PBKDF2.prototype.selftest = function () {
        var tv = {
            key: 'password',
            salt: 'salt',
            c: 2,
            sha256: 'ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43'
        };
        var pbkdf2_sha256 = new PBKDF2(new hmac_1.HMAC(new sha256_1.SHA256()), tv.c);
        var key = base_1.Convert.str2bin(tv.key);
        var salt = base_1.Convert.str2bin(tv.salt);
        var mac = pbkdf2_sha256.hash(key, salt, base_1.Convert.hex2bin(tv.sha256).length);
        return base_1.Convert.bin2hex(mac) === tv.sha256;
    };
    return PBKDF2;
}());
exports.PBKDF2 = PBKDF2;


/***/ }),

/***/ "../../node_modules/mipher/dist/random.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/random.js ***!
  \************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2018, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief Bruce Schneier's FORTUNA random generator implementation
//        Some inspiration was taken from the random.js module of sjcl
// usage: let rand = new Random();
//        let val = rand.get(32);
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
var aes_1 = __webpack_require__(/*! ./aes */ "../../node_modules/mipher/dist/aes.js");
var sha256_1 = __webpack_require__(/*! ./sha256 */ "../../node_modules/mipher/dist/sha256.js");
/**
 * FORTUNA random class
 */
var Random = /** @class */ (function () {
    /**
     * ctor
     * @param {Number} numPools Number of pools used for entropy acquisition. Defaults to 32 pools, use 16 on limited entropy sources
     * @param {Uint8Array} entropy Optional array of any length with initial (true) random data (the more the better)
     */
    function Random(numPools, entropy) {
        if (numPools === void 0) { numPools = 32; }
        // constants
        this.NUM_POOLS = numPools; // number of pools used for entropy acquisition. Defaults to 32 pools, use 16 on limited entropy sources
        this.RESEED_LIMIT = 64; // reseed trigger level
        this.MILLISECONDS_PER_RESEED = 10000; // reseed force after milliseconds
        this.gen = new aes_1.AES();
        this.genKey = new Uint8Array(32);
        this.genCnt = new Uint8Array(16);
        this.poolData = []; // SHA objects
        this.poolEntropy = []; // entropy of the according pool
        this.robin = { kbd: 0, mouse: 0, scroll: 0, touch: 0, motion: 0, time: 0, rnd: 0, dom: 0 };
        this.entropy_level = 0; // actual generator entropy
        this.eventId = 0;
        this.reseedCnt = 0;
        this.lastReseed = 0; // time of last reseed
        this.active = false; // genarator / collectors status
        // create the data pools
        for (var i = 0; i < this.NUM_POOLS; i++) {
            this.poolData.push(new sha256_1.SHA256());
            this.poolEntropy.push(0);
        }
        this.init(entropy);
    }
    /**
     * Start the generator (public wrapper for init())
     * Normally start/stop is not necessary, init() is called from ctor
     */
    Random.prototype.start = function () {
        this.init();
    };
    /**
     * Stop the generator
     * Normally stopping is not necessary
     */
    Random.prototype.stop = function () {
        this.stopCollectors();
    };
    /**
     * Return the actual generator entropy (number of available random bytes)
     * @return {Number} Number of available random bytes
     */
    Random.prototype.getEntropy = function () {
        return Math.floor(this.entropy_level / 8);
    };
    /**
     * Add external given entropy
     * @param {Uint8Array} entropy Random bytes to be added to the entropy pools
     */
    Random.prototype.addEntropy = function (entropy) {
        this.addRandomEvent(entropy, this.robin.rnd, entropy.length * 8);
    };
    ///////////////////////////////////////////////////////////////////////////////
    // G E N E R A T O R
    /**
     * Init/start the module (called by ctor as 'autostart')
     * @param {Uint8Array} entropy Optional array of any length of (true) random bytes to be added to the entropy pools
     */
    Random.prototype.init = function (entropy) {
        // pool init
        var i;
        for (i = 0; i < this.NUM_POOLS; i++) {
            this.poolData[i].init();
        }
        // explicit generator init
        for (i = 0; i < 32; i++) {
            this.genKey[i] = 0;
        } // 32 byte key for AES256
        for (i = 0; i < 16; i++) {
            this.genCnt[i] = 0;
        } // 16 byte counter
        this.robin.kbd = this.robin.mouse = this.robin.scroll = this.robin.touch = this.robin.motion = this.robin.time = this.robin.rnd = this.robin.dom = 0;
        this.reseedCnt = 0;
        this.lastReseed = 0;
        // try to get an initial seed, use crypto.random instead of a seed file
        for (i = 0; i < this.NUM_POOLS * 4; i++) {
            this.collectorCryptoRandom();
        }
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            this.addRandomEvent(base_1.Convert.str2bin(performance.now().toString()), this.robin.time, 2);
        }
        if (typeof process !== 'undefined' && typeof process.hrtime === 'function') {
            this.addRandomEvent(base_1.Convert.str2bin(process.hrtime()[0].toString() + process.hrtime()[1].toString()), this.robin.time, 2);
        }
        // add some entropy from DOM
        this.collectorDom();
        // extra entropy
        if (entropy) {
            this.addRandomEvent(entropy, this.robin.rnd, entropy.length * 8); // add given entropy
        }
        this.startCollectors();
    };
    /**
     * Reseed the generator with the given byte array
     */
    Random.prototype.reseed = function (seed) {
        // compute a new 32 byte key
        this.genKey = (new sha256_1.SHA256()).update(this.genKey).digest(seed);
        // increment the 16 byte counter to make it nonzero and mark the generator as seeded
        this.genCnt[0]++;
        for (var i = 0; i < 15; i++) {
            if (this.genCnt[i] === 0) {
                this.genCnt[i + 1]++;
            }
            else
                break;
        }
        this.lastReseed = (new Date()).valueOf();
    };
    /**
     * Internal function to generates a number of (16 byte) blocks of random output
     * @param {Number} blocks Number of blocks to generate
     */
    Random.prototype.generateBlocks = function (blocks) {
        var r = new Uint8Array(blocks * 16);
        for (var i = 0; i < blocks; i++) {
            r.set(this.gen.encrypt(this.genKey, this.genCnt), i * 16);
            // increment the 16 byte counter
            this.genCnt[0]++;
            for (var c = 0; c < 15; c++) {
                if (this.genCnt[c] === 0) {
                    this.genCnt[c + 1]++;
                }
                else
                    break;
            }
        }
        return r;
    };
    /**
     * Internal function to get random data bytes
     */
    Random.prototype.pseudoRandomData = function (length) {
        var r = new Uint8Array(length);
        // compute the output
        r.set(this.generateBlocks((length >>> 4) + 1).subarray(0, length));
        // generate two more blocks to get a new key
        this.genKey = this.generateBlocks(2);
        return r;
    };
    ///////////////////////////////////////////////////////////////////////////////
    // A C C U M U L A T O R
    /**
     * Get random data bytes
     * @param {Number} length Number of bytes to generate
     * @return {Uint8Array} Byte array of crypto secure random values or undefined, if generator is not ready
     */
    Random.prototype.get = function (length) {
        if ((this.poolEntropy[0] >= this.RESEED_LIMIT) && (this.lastReseed + this.MILLISECONDS_PER_RESEED < (new Date()).valueOf())) {
            // we need to reseed
            this.reseedCnt = ++this.reseedCnt & 0xffffffff;
            var s = new Uint8Array(0), strength = 0;
            for (var i = 0; i < this.NUM_POOLS; i++) {
                if ((1 << i) & this.reseedCnt) {
                    s = base_1.Util.concat(s, this.poolData[i].digest());
                    strength += this.poolEntropy[i];
                    this.poolData[i].init();
                    this.poolEntropy[i] = 0;
                }
            }
            // how strong was this reseed?
            this.entropy_level -= strength;
            // got the data, now do the reseed
            this.reseed(s);
        }
        if (!this.active || this.reseedCnt === 0) {
            return; // error, prng not running or not seeded yet, return undefined
        }
        else {
            return this.pseudoRandomData(length);
        }
    };
    ///////////////////////////////////////////////////////////////////////////////
    // C O L L E C T O R S
    /**
     * Start the built-in entropy collectors
     */
    Random.prototype.startCollectors = function () {
        if (this.active) {
            return;
        }
        if (typeof window !== 'undefined' && window.addEventListener) {
            window.addEventListener('click', this.collectorClick.bind(this), true);
            window.addEventListener('keydown', this.collectorKeyboard.bind(this), true);
            window.addEventListener('scroll', this.collectorScroll.bind(this), true);
            window.addEventListener('mousemove', this.throttle(this.collectorMouse, 50, this), true);
            window.addEventListener('devicemotion', this.throttle(this.collectorMotion, 100, this), true);
            window.addEventListener('deviceorientation', this.collectorMotion.bind(this), true);
            window.addEventListener('orientationchange', this.collectorMotion.bind(this), true);
            window.addEventListener('touchmove', this.throttle(this.collectorTouch, 50, this), true);
            window.addEventListener('touchstart', this.collectorTouch.bind(this), true);
            window.addEventListener('touchend', this.collectorTouch.bind(this), true);
            window.addEventListener('load', this.collectorTime.bind(this), true);
        }
        else if (typeof document !== 'undefined' && document.addEventListener) {
            document.addEventListener('click', this.collectorClick.bind(this), true);
            document.addEventListener('keydown', this.collectorKeyboard.bind(this), true);
            document.addEventListener('mousemove', this.throttle(this.collectorMouse, 50, this), true);
        }
        // start timer, add additional crypto random from system source every 3 sec
        this.timer = setInterval(this.collectorCryptoRandom.bind(this), 3000);
        this.active = true;
    };
    /**
     * Stop the built-in entropy collectors
     */
    Random.prototype.stopCollectors = function () {
        if (!this.active) {
            return;
        }
        if (typeof window !== 'undefined' && window.addEventListener) {
            window.removeEventListener('click', this.collectorClick, true);
            window.removeEventListener('keydown', this.collectorKeyboard, true);
            window.removeEventListener('scroll', this.collectorScroll, true);
            window.removeEventListener('mousemove', this.collectorMouse, true);
            window.removeEventListener('devicemotion', this.collectorMotion, true);
            window.removeEventListener('deviceorientation', this.collectorMotion, true);
            window.removeEventListener('orientationchange', this.collectorMotion, true);
            window.removeEventListener('touchmove', this.collectorTouch, true);
            window.removeEventListener('touchstart', this.collectorTouch, true);
            window.removeEventListener('touchend', this.collectorTouch, true);
            window.removeEventListener('load', this.collectorTime, true);
        }
        else if (typeof document !== 'undefined' && document.addEventListener) {
            document.removeEventListener('click', this.collectorClick, true);
            document.removeEventListener('keydown', this.collectorKeyboard, true);
            document.removeEventListener('mousemove', this.collectorMouse, true);
        }
        // stop timer
        clearInterval(this.timer);
        this.active = false;
    };
    /**
     * In case of an event burst (eg. motion events), this executes the given fn once every threshold
     * @param {Function} fn Function to be throttled
     * @param {number} threshold Threshold in [ms]
     * @param {Object} scope Optional scope, defaults to 'this'
     * @returns {Function} Resulting function
     */
    Random.prototype.throttle = function (fn, threshold, scope) {
        var last, deferTimer;
        return function () {
            var context = scope || this;
            var now = +new Date, args = arguments;
            if (last && now < last + threshold) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            }
            else {
                last = now;
                fn.apply(context, args);
            }
        };
    };
    /**
     * Add entropy data to pool
     * @param data {Uint8Array} Entropy data to add
     * @param pool_idx {Number} Pool index number to add the entropy data to
     * @param entropy {Number} Added entropy data quality in bits
     */
    Random.prototype.addRandomEvent = function (data, pool_idx, entropy) {
        if (entropy === void 0) { entropy = 1; }
        this.poolEntropy[pool_idx] += entropy;
        this.entropy_level += entropy;
        this.poolData[pool_idx].update(base_1.Convert.int2bin(this.eventId++)).update(data);
    };
    Random.prototype.collectorKeyboard = function (ev) {
        this.addRandomEvent(new Uint8Array([base_1.Convert.str2bin(ev.key || ev.char)[0] || ev.keyCode, (ev.timeStamp || 0) & 0xFF]), this.robin.kbd, 1);
        this.robin.kbd = ++this.robin.kbd % this.NUM_POOLS;
        this.collectorTime();
    };
    Random.prototype.collectorMouse = function (ev) {
        var x = ev.x || ev.clientX || ev.offsetX || 0, y = ev.y || ev.clientY || ev.offsetY || 0;
        this.addRandomEvent(new Uint8Array([x >>> 8, x & 0xff, y >>> 8, y & 0xff]), this.robin.mouse, 2);
        this.robin.mouse = ++this.robin.mouse % this.NUM_POOLS;
    };
    Random.prototype.collectorClick = function (ev) {
        var x = ev.x || ev.clientX || ev.offsetX || 0, y = ev.y || ev.clientY || ev.offsetY || 0;
        this.addRandomEvent(new Uint8Array([x >>> 8, x & 0xff, y >>> 8, y & 0xff]), this.robin.mouse, 2);
        this.robin.mouse = ++this.robin.mouse % this.NUM_POOLS;
        this.collectorTime();
    };
    Random.prototype.collectorTouch = function (ev) {
        var touch = ev.touches[0] || ev.changedTouches[0];
        var x = touch.pageX || touch.clientX || 0, y = touch.pageY || touch.clientY || 0;
        this.addRandomEvent(new Uint8Array([x >>> 8, x & 0xff, y >>> 8, y & 0xff]), this.robin.touch, 2);
        this.robin.touch = ++this.robin.touch % this.NUM_POOLS;
        this.collectorTime();
    };
    Random.prototype.collectorScroll = function (ev) {
        var x = window.pageXOffset || window.scrollX, y = window.pageYOffset || window.scrollY;
        this.addRandomEvent(new Uint8Array([x >>> 8, x & 0xff, y >>> 8, y & 0xff]), this.robin.scroll, 1);
        this.robin.scroll = ++this.robin.scroll % this.NUM_POOLS;
    };
    Random.prototype.collectorMotion = function (ev) {
        if (typeof ev !== 'undefined' && typeof ev.accelerationIncludingGravity !== 'undefined') {
            var x = ev.accelerationIncludingGravity.x || 0, y = ev.accelerationIncludingGravity.y || 0, z = ev.accelerationIncludingGravity.z || 0;
            this.addRandomEvent(new Uint8Array([(x * 100) & 0xff, (y * 100) & 0xff, (z * 100) & 0xff]), this.robin.motion, 3);
        }
        if (typeof ev !== 'undefined' && typeof ev.alpha === 'number' && typeof ev.beta === 'number' && typeof ev.gamma === 'number') {
            this.addRandomEvent(base_1.Convert.str2bin(ev.alpha.toString() + ev.beta.toString() + ev.gamma.toString()), this.robin.motion, 3);
        }
        if (typeof window !== 'undefined' && typeof window.orientation !== 'undefined') {
            this.addRandomEvent(base_1.Convert.str2bin(window.orientation.toString()), this.robin.motion, 1);
        }
        this.robin.motion = ++this.robin.motion % this.NUM_POOLS;
    };
    Random.prototype.collectorTime = function () {
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            this.addRandomEvent(base_1.Convert.str2bin(performance.now().toString()), this.robin.time, 2);
        }
        else {
            this.addRandomEvent(base_1.Convert.number2bin(Date.now()), this.robin.time, 2);
        }
        this.robin.time = ++this.robin.time % this.NUM_POOLS;
    };
    Random.prototype.collectorDom = function () {
        if (typeof document !== 'undefined' && document.documentElement) {
            this.addRandomEvent((new sha256_1.SHA256()).hash(base_1.Convert.str2bin(document.documentElement.innerHTML)), this.robin.dom, 2);
            this.robin.dom = ++this.robin.dom % this.NUM_POOLS;
        }
    };
    Random.prototype.collectorCryptoRandom = function () {
        // check if running in nodeish env
        if (typeof process !== 'undefined' && typeof process.pid === 'number') {
            // running on node
            try {
                var crypto_1 = __webpack_require__(/*! crypto */ "crypto");
                var rnd = crypto_1.randomBytes(128);
                this.addRandomEvent(rnd, this.robin.rnd, 1024);
                this.robin.rnd = ++this.robin.rnd % this.NUM_POOLS;
            }
            catch (e) { }
        }
        if (typeof window !== 'undefined' && window.crypto && typeof window.crypto.getRandomValues === 'function') {
            // running in browser env
            try {
                var rnd = new Uint8Array(128);
                window.crypto.getRandomValues(rnd);
                this.addRandomEvent(rnd, this.robin.rnd, 1024);
                this.robin.rnd = ++this.robin.rnd % this.NUM_POOLS;
            }
            catch (e) { }
        }
    };
    return Random;
}());
exports.Random = Random;


/***/ }),

/***/ "../../node_modules/mipher/dist/serpent.js":
/*!*************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/serpent.js ***!
  \*************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2016, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief Serpent blockcipher implementation
// Specification can befound here: http://www.cl.cam.ac.uk/~rja14/serpent.html
// There are discussions about the correct output format, because there are NESSIE
// testvectors around. This implementation uses the ORIGINAL Serpent format from the
// AES submission and is fully tested against the AES submission package vectors.
//
// Serpent has a block size of 128 bits and supports a key size of 128, 192 or 256 bits
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var blockmode_1 = __webpack_require__(/*! ./blockmode */ "../../node_modules/mipher/dist/blockmode.js");
var padding_1 = __webpack_require__(/*! ./padding */ "../../node_modules/mipher/dist/padding.js");
/**
 * Serpent class
 */
var Serpent = /** @class */ (function () {
    /**
     * Serpent ctor
     */
    function Serpent() {
        this.blockSize = 16; // Serpent has a fixed block size of 16 bytes
        this.wMax = 0xffffffff;
        this.rotW = function (w, n) {
            return (w << n | w >>> (32 - n)) & this.wMax;
        };
        this.getW = function (a, i) {
            return a[i] | a[i + 1] << 8 | a[i + 2] << 16 | a[i + 3] << 24;
        };
        this.setW = function (a, i, w) {
            a[i] = w & 0xff;
            a[i + 1] = (w >>> 8) & 0xff;
            a[i + 2] = (w >>> 16) & 0xff;
            a[i + 3] = (w >>> 24) & 0xff;
        };
        this.setWInv = function (a, i, w) {
            a[i] = (w >>> 24) & 0xff;
            a[i + 1] = (w >>> 16) & 0xff;
            a[i + 2] = (w >>> 8) & 0xff;
            a[i + 3] = w & 0xff;
        };
        this.keyIt = function (a, b, c, d, i, r) {
            this.key[i] = r[b] = this.rotW(this.key[a] ^ r[b] ^ r[c] ^ r[d] ^ 0x9e3779b9 ^ i, 11);
        };
        this.keyLoad = function (a, b, c, d, i, r) {
            r[a] = this.key[i];
            r[b] = this.key[i + 1];
            r[c] = this.key[i + 2];
            r[d] = this.key[i + 3];
        };
        this.keyStore = function (a, b, c, d, i, r) {
            this.key[i] = r[a];
            this.key[i + 1] = r[b];
            this.key[i + 2] = r[c];
            this.key[i + 3] = r[d];
        };
        this.S = [
            function (r, x0, x1, x2, x3, x4) {
                r[x4] = r[x3];
                r[x3] |= r[x0];
                r[x0] ^= r[x4];
                r[x4] ^= r[x2];
                r[x4] = ~r[x4];
                r[x3] ^= r[x1];
                r[x1] &= r[x0];
                r[x1] ^= r[x4];
                r[x2] ^= r[x0];
                r[x0] ^= r[x3];
                r[x4] |= r[x0];
                r[x0] ^= r[x2];
                r[x2] &= r[x1];
                r[x3] ^= r[x2];
                r[x1] = ~r[x1];
                r[x2] ^= r[x4];
                r[x1] ^= r[x2];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x4] = r[x1];
                r[x1] ^= r[x0];
                r[x0] ^= r[x3];
                r[x3] = ~r[x3];
                r[x4] &= r[x1];
                r[x0] |= r[x1];
                r[x3] ^= r[x2];
                r[x0] ^= r[x3];
                r[x1] ^= r[x3];
                r[x3] ^= r[x4];
                r[x1] |= r[x4];
                r[x4] ^= r[x2];
                r[x2] &= r[x0];
                r[x2] ^= r[x1];
                r[x1] |= r[x0];
                r[x0] = ~r[x0];
                r[x0] ^= r[x2];
                r[x4] ^= r[x1];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x3] = ~r[x3];
                r[x1] ^= r[x0];
                r[x4] = r[x0];
                r[x0] &= r[x2];
                r[x0] ^= r[x3];
                r[x3] |= r[x4];
                r[x2] ^= r[x1];
                r[x3] ^= r[x1];
                r[x1] &= r[x0];
                r[x0] ^= r[x2];
                r[x2] &= r[x3];
                r[x3] |= r[x1];
                r[x0] = ~r[x0];
                r[x3] ^= r[x0];
                r[x4] ^= r[x0];
                r[x0] ^= r[x2];
                r[x1] |= r[x2];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x4] = r[x1];
                r[x1] ^= r[x3];
                r[x3] |= r[x0];
                r[x4] &= r[x0];
                r[x0] ^= r[x2];
                r[x2] ^= r[x1];
                r[x1] &= r[x3];
                r[x2] ^= r[x3];
                r[x0] |= r[x4];
                r[x4] ^= r[x3];
                r[x1] ^= r[x0];
                r[x0] &= r[x3];
                r[x3] &= r[x4];
                r[x3] ^= r[x2];
                r[x4] |= r[x1];
                r[x2] &= r[x1];
                r[x4] ^= r[x3];
                r[x0] ^= r[x3];
                r[x3] ^= r[x2];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x4] = r[x3];
                r[x3] &= r[x0];
                r[x0] ^= r[x4];
                r[x3] ^= r[x2];
                r[x2] |= r[x4];
                r[x0] ^= r[x1];
                r[x4] ^= r[x3];
                r[x2] |= r[x0];
                r[x2] ^= r[x1];
                r[x1] &= r[x0];
                r[x1] ^= r[x4];
                r[x4] &= r[x2];
                r[x2] ^= r[x3];
                r[x4] ^= r[x0];
                r[x3] |= r[x1];
                r[x1] = ~r[x1];
                r[x3] ^= r[x0];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x4] = r[x1];
                r[x1] |= r[x0];
                r[x2] ^= r[x1];
                r[x3] = ~r[x3];
                r[x4] ^= r[x0];
                r[x0] ^= r[x2];
                r[x1] &= r[x4];
                r[x4] |= r[x3];
                r[x4] ^= r[x0];
                r[x0] &= r[x3];
                r[x1] ^= r[x3];
                r[x3] ^= r[x2];
                r[x0] ^= r[x1];
                r[x2] &= r[x4];
                r[x1] ^= r[x2];
                r[x2] &= r[x0];
                r[x3] ^= r[x2];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x4] = r[x1];
                r[x3] ^= r[x0];
                r[x1] ^= r[x2];
                r[x2] ^= r[x0];
                r[x0] &= r[x3];
                r[x1] |= r[x3];
                r[x4] = ~r[x4];
                r[x0] ^= r[x1];
                r[x1] ^= r[x2];
                r[x3] ^= r[x4];
                r[x4] ^= r[x0];
                r[x2] &= r[x0];
                r[x4] ^= r[x1];
                r[x2] ^= r[x3];
                r[x3] &= r[x1];
                r[x3] ^= r[x0];
                r[x1] ^= r[x2];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x1] = ~r[x1];
                r[x4] = r[x1];
                r[x0] = ~r[x0];
                r[x1] &= r[x2];
                r[x1] ^= r[x3];
                r[x3] |= r[x4];
                r[x4] ^= r[x2];
                r[x2] ^= r[x3];
                r[x3] ^= r[x0];
                r[x0] |= r[x1];
                r[x2] &= r[x0];
                r[x0] ^= r[x4];
                r[x4] ^= r[x3];
                r[x3] &= r[x0];
                r[x4] ^= r[x1];
                r[x2] ^= r[x4];
                r[x3] ^= r[x1];
                r[x4] |= r[x0];
                r[x4] ^= r[x1];
            }
        ];
        this.SI = [
            function (r, x0, x1, x2, x3, x4) {
                r[x4] = r[x3];
                r[x1] ^= r[x0];
                r[x3] |= r[x1];
                r[x4] ^= r[x1];
                r[x0] = ~r[x0];
                r[x2] ^= r[x3];
                r[x3] ^= r[x0];
                r[x0] &= r[x1];
                r[x0] ^= r[x2];
                r[x2] &= r[x3];
                r[x3] ^= r[x4];
                r[x2] ^= r[x3];
                r[x1] ^= r[x3];
                r[x3] &= r[x0];
                r[x1] ^= r[x0];
                r[x0] ^= r[x2];
                r[x4] ^= r[x3];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x1] ^= r[x3];
                r[x4] = r[x0];
                r[x0] ^= r[x2];
                r[x2] = ~r[x2];
                r[x4] |= r[x1];
                r[x4] ^= r[x3];
                r[x3] &= r[x1];
                r[x1] ^= r[x2];
                r[x2] &= r[x4];
                r[x4] ^= r[x1];
                r[x1] |= r[x3];
                r[x3] ^= r[x0];
                r[x2] ^= r[x0];
                r[x0] |= r[x4];
                r[x2] ^= r[x4];
                r[x1] ^= r[x0];
                r[x4] ^= r[x1];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x2] ^= r[x1];
                r[x4] = r[x3];
                r[x3] = ~r[x3];
                r[x3] |= r[x2];
                r[x2] ^= r[x4];
                r[x4] ^= r[x0];
                r[x3] ^= r[x1];
                r[x1] |= r[x2];
                r[x2] ^= r[x0];
                r[x1] ^= r[x4];
                r[x4] |= r[x3];
                r[x2] ^= r[x3];
                r[x4] ^= r[x2];
                r[x2] &= r[x1];
                r[x2] ^= r[x3];
                r[x3] ^= r[x4];
                r[x4] ^= r[x0];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x2] ^= r[x1];
                r[x4] = r[x1];
                r[x1] &= r[x2];
                r[x1] ^= r[x0];
                r[x0] |= r[x4];
                r[x4] ^= r[x3];
                r[x0] ^= r[x3];
                r[x3] |= r[x1];
                r[x1] ^= r[x2];
                r[x1] ^= r[x3];
                r[x0] ^= r[x2];
                r[x2] ^= r[x3];
                r[x3] &= r[x1];
                r[x1] ^= r[x0];
                r[x0] &= r[x2];
                r[x4] ^= r[x3];
                r[x3] ^= r[x0];
                r[x0] ^= r[x1];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x2] ^= r[x3];
                r[x4] = r[x0];
                r[x0] &= r[x1];
                r[x0] ^= r[x2];
                r[x2] |= r[x3];
                r[x4] = ~r[x4];
                r[x1] ^= r[x0];
                r[x0] ^= r[x2];
                r[x2] &= r[x4];
                r[x2] ^= r[x0];
                r[x0] |= r[x4];
                r[x0] ^= r[x3];
                r[x3] &= r[x2];
                r[x4] ^= r[x3];
                r[x3] ^= r[x1];
                r[x1] &= r[x0];
                r[x4] ^= r[x1];
                r[x0] ^= r[x3];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x4] = r[x1];
                r[x1] |= r[x2];
                r[x2] ^= r[x4];
                r[x1] ^= r[x3];
                r[x3] &= r[x4];
                r[x2] ^= r[x3];
                r[x3] |= r[x0];
                r[x0] = ~r[x0];
                r[x3] ^= r[x2];
                r[x2] |= r[x0];
                r[x4] ^= r[x1];
                r[x2] ^= r[x4];
                r[x4] &= r[x0];
                r[x0] ^= r[x1];
                r[x1] ^= r[x3];
                r[x0] &= r[x2];
                r[x2] ^= r[x3];
                r[x0] ^= r[x2];
                r[x2] ^= r[x4];
                r[x4] ^= r[x3];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x0] ^= r[x2];
                r[x4] = r[x0];
                r[x0] &= r[x3];
                r[x2] ^= r[x3];
                r[x0] ^= r[x2];
                r[x3] ^= r[x1];
                r[x2] |= r[x4];
                r[x2] ^= r[x3];
                r[x3] &= r[x0];
                r[x0] = ~r[x0];
                r[x3] ^= r[x1];
                r[x1] &= r[x2];
                r[x4] ^= r[x0];
                r[x3] ^= r[x4];
                r[x4] ^= r[x2];
                r[x0] ^= r[x1];
                r[x2] ^= r[x0];
            },
            function (r, x0, x1, x2, x3, x4) {
                r[x4] = r[x3];
                r[x3] &= r[x0];
                r[x0] ^= r[x2];
                r[x2] |= r[x4];
                r[x4] ^= r[x1];
                r[x0] = ~r[x0];
                r[x1] |= r[x3];
                r[x4] ^= r[x0];
                r[x0] &= r[x2];
                r[x0] ^= r[x1];
                r[x1] &= r[x2];
                r[x3] ^= r[x2];
                r[x4] ^= r[x3];
                r[x2] &= r[x3];
                r[x3] |= r[x0];
                r[x1] ^= r[x4];
                r[x3] ^= r[x4];
                r[x4] &= r[x0];
                r[x4] ^= r[x2];
            }
        ];
    }
    /**
     * Init the cipher, private function
     * @param {Uint8Array} key The key. The key size can be 128, 192 or 256 bits
     */
    Serpent.prototype.init = function (key) {
        var i, j, m, n, len;
        var KC = new Uint32Array([7788, 63716, 84032, 7891, 78949, 25146, 28835, 67288, 84032, 40055, 7361, 1940, 77639, 27525, 24193, 75702,
            7361, 35413, 83150, 82383, 58619, 48468, 18242, 66861, 83150, 69667, 7788, 31552, 40054, 23222, 52496, 57565, 7788, 63716]);
        this.key = new Uint32Array(132);
        this.key[key.length] = 1;
        // reverse
        for (i = 0, len = key.length; i < len; i++) {
            this.key[i] = key[len - i - 1];
        }
        for (i = 0; i < 8; i++) {
            this.key[i] = (this.key[4 * i] & 0xff) | (this.key[4 * i + 1] & 0xff) << 8 | (this.key[4 * i + 2] & 0xff) << 16 | (this.key[4 * i + 3] & 0xff) << 24;
        }
        var r = [this.key[3], this.key[4], this.key[5], this.key[6], this.key[7]];
        i = 0;
        j = 0;
        while (this.keyIt(j++, 0, 4, 2, i++, r), this.keyIt(j++, 1, 0, 3, i++, r), i < 132) {
            this.keyIt(j++, 2, 1, 4, i++, r);
            if (i === 8) {
                j = 0;
            }
            this.keyIt(j++, 3, 2, 0, i++, r);
            this.keyIt(j++, 4, 3, 1, i++, r);
        }
        i = 128;
        j = 3;
        n = 0;
        while (m = KC[n++], this.S[j++ % 8](r, m % 5, m % 7, m % 11, m % 13, m % 17), m = KC[n], this.keyStore(m % 5, m % 7, m % 11, m % 13, i, r), i > 0) {
            i -= 4;
            this.keyLoad(m % 5, m % 7, m % 11, m % 13, i, r);
        }
    };
    Serpent.prototype.K = function (r, a, b, c, d, i) {
        r[a] ^= this.key[4 * i];
        r[b] ^= this.key[4 * i + 1];
        r[c] ^= this.key[4 * i + 2];
        r[d] ^= this.key[4 * i + 3];
    };
    Serpent.prototype.LK = function (r, a, b, c, d, e, i) {
        r[a] = this.rotW(r[a], 13);
        r[c] = this.rotW(r[c], 3);
        r[b] ^= r[a];
        r[e] = (r[a] << 3) & this.wMax;
        r[d] ^= r[c];
        r[b] ^= r[c];
        r[b] = this.rotW(r[b], 1);
        r[d] ^= r[e];
        r[d] = this.rotW(r[d], 7);
        r[e] = r[b];
        r[a] ^= r[b];
        r[e] = (r[e] << 7) & this.wMax;
        r[c] ^= r[d];
        r[a] ^= r[d];
        r[c] ^= r[e];
        r[d] ^= this.key[4 * i + 3];
        r[b] ^= this.key[4 * i + 1];
        r[a] = this.rotW(r[a], 5);
        r[c] = this.rotW(r[c], 22);
        r[a] ^= this.key[4 * i + 0];
        r[c] ^= this.key[4 * i + 2];
    };
    Serpent.prototype.KL = function (r, a, b, c, d, e, i) {
        r[a] ^= this.key[4 * i + 0];
        r[b] ^= this.key[4 * i + 1];
        r[c] ^= this.key[4 * i + 2];
        r[d] ^= this.key[4 * i + 3];
        r[a] = this.rotW(r[a], 27);
        r[c] = this.rotW(r[c], 10);
        r[e] = r[b];
        r[c] ^= r[d];
        r[a] ^= r[d];
        r[e] = (r[e] << 7) & this.wMax;
        r[a] ^= r[b];
        r[b] = this.rotW(r[b], 31);
        r[c] ^= r[e];
        r[d] = this.rotW(r[d], 25);
        r[e] = (r[a] << 3) & this.wMax;
        r[b] ^= r[a];
        r[d] ^= r[e];
        r[a] = this.rotW(r[a], 19);
        r[b] ^= r[c];
        r[d] ^= r[c];
        r[c] = this.rotW(r[c], 29);
    };
    /**
     * Serpent block encryption
     * @param {Uint8Array} key Key
     * @param {Uint8Array} pt The plaintext
     * @return {Uint8Array} Ciphertext
     */
    Serpent.prototype.encrypt = function (key, pt) {
        this.init(key);
        var EC = new Uint32Array([44255, 61867, 45034, 52496, 73087, 56255, 43827, 41448, 18242, 1939, 18581, 56255, 64584, 31097, 26469,
            77728, 77639, 4216, 64585, 31097, 66861, 78949, 58006, 59943, 49676, 78950, 5512, 78949, 27525, 52496, 18670, 76143]);
        var blk = new Uint8Array(pt.length);
        // reverse
        for (var i = 0, len = pt.length; i < len; i++) {
            blk[i] = pt[len - i - 1];
        }
        var r = [this.getW(blk, 0), this.getW(blk, 4), this.getW(blk, 8), this.getW(blk, 12)];
        this.K(r, 0, 1, 2, 3, 0);
        var n = 0, m = EC[0];
        while (this.S[n % 8](r, m % 5, m % 7, m % 11, m % 13, m % 17), n < 31) {
            m = EC[++n];
            this.LK(r, m % 5, m % 7, m % 11, m % 13, m % 17, n);
        }
        this.K(r, 0, 1, 2, 3, 32);
        var ct = new Uint8Array(pt.length);
        this.setWInv(ct, 0, r[3]);
        this.setWInv(ct, 4, r[2]);
        this.setWInv(ct, 8, r[1]);
        this.setWInv(ct, 12, r[0]);
        return ct;
    };
    /**
     * Serpent block decryption
     * @param {Uint8Array} key Key
     * @param {Uint8Array} ct The ciphertext
     * @return {Uint8Array} Plaintext
     */
    Serpent.prototype.decrypt = function (key, ct) {
        this.init(key);
        var DC = new Uint32Array([44255, 60896, 28835, 1837, 1057, 4216, 18242, 77301, 47399, 53992, 1939, 1940, 66420, 39172, 78950,
            45917, 82383, 7450, 67288, 26469, 83149, 57565, 66419, 47400, 58006, 44254, 18581, 18228, 33048, 45034, 66508, 7449]);
        var blk = new Uint8Array(ct.length);
        // reverse
        for (var i = 0, len = ct.length; i < len; i++) {
            blk[i] = ct[len - i - 1];
        }
        var r = [this.getW(blk, 0), this.getW(blk, 4), this.getW(blk, 8), this.getW(blk, 12)];
        this.K(r, 0, 1, 2, 3, 32);
        var n = 0, m = DC[0];
        while (this.SI[7 - n % 8](r, m % 5, m % 7, m % 11, m % 13, m % 17), n < 31) {
            m = DC[++n];
            this.KL(r, m % 5, m % 7, m % 11, m % 13, m % 17, 32 - n);
        }
        this.K(r, 2, 3, 1, 4, 0);
        var pt = new Uint8Array(ct.length);
        this.setWInv(pt, 0, r[4]);
        this.setWInv(pt, 4, r[1]);
        this.setWInv(pt, 8, r[3]);
        this.setWInv(pt, 12, r[2]);
        return pt;
    };
    /**
     * Performs a quick selftest
     * @return {Boolean} True if successful
     */
    Serpent.prototype.selftest = function () {
        var tv_CBC_PKCS7 = [
            {
                key: '06a9214036b8a15b512e03d534120006',
                iv: '3dafba429d9eb430b422da802c9fac41',
                pt: '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f',
                ct: '714373e9991e8a58f79efa62b46f7652fbfa5de596b93acaafbdb2412311ac13e365c4170a4166dd1b95cfde3a21f6b2'
            },
            {
                key: '0x6c3ea0477630ce21a2ce334aa746c2cd',
                iv: '0xc782dc4c098c66cbd9cd27d825682c81',
                pt: 'a0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedf',
                ct: '90d0d1d8340ef5e8b9922f3c173ea1066632c5fec470be3935b5bfaeef033a0dd50a459d5c70fc8417540ae43cc507339b0085a268528f2d1de93cf65e96037685ebf5a6bcc81b70f132aba9b782ea99'
            }
        ];
        var aes = new Serpent();
        var res = true;
        /*
            for (let i = 0; i < tv_CBC_PKCS7.length; i++) {
              let key = Convert.hex2bin(tv_CBC_PKCS7[i].key);
              let pt = Convert.hex2bin(tv_CBC_PKCS7[i].pt);
              let ct = Convert.hex2bin(tv_CBC_PKCS7[i].ct);
              let iv = Convert.hex2bin(tv_CBC_PKCS7[i].iv);
              let ct2 = aes.encrypt(key, pt, iv);
              res = res && Util.compare(ct2, ct);
              let pt2 = aes.decrypt(key, ct, iv);
              res = res && Util.compare(pt2, pt);
            }
        */
        return res;
    };
    return Serpent;
}());
exports.Serpent = Serpent;
///////////////////////////////////////////////////////////////////////////////
var Serpent_CBC = /** @class */ (function () {
    function Serpent_CBC() {
        this.cipher = new Serpent();
        this.blockmode = new blockmode_1.CBC(this.cipher);
    }
    Serpent_CBC.prototype.encrypt = function (key, pt, iv) {
        return this.blockmode.encrypt(key, pt, iv);
    };
    Serpent_CBC.prototype.decrypt = function (key, ct, iv) {
        return this.blockmode.decrypt(key, ct, iv);
    };
    Serpent_CBC.prototype.selftest = function () {
        return this.cipher.selftest();
    };
    return Serpent_CBC;
}());
exports.Serpent_CBC = Serpent_CBC;
var Serpent_CTR = /** @class */ (function () {
    function Serpent_CTR() {
        this.cipher = new Serpent();
        this.blockmode = new blockmode_1.CTR(this.cipher);
    }
    Serpent_CTR.prototype.encrypt = function (key, pt, iv) {
        return this.blockmode.encrypt(key, pt, iv);
    };
    Serpent_CTR.prototype.decrypt = function (key, ct, iv) {
        return this.blockmode.decrypt(key, ct, iv);
    };
    Serpent_CTR.prototype.selftest = function () {
        return this.cipher.selftest();
    };
    return Serpent_CTR;
}());
exports.Serpent_CTR = Serpent_CTR;
var Serpent_CBC_PKCS7 = /** @class */ (function () {
    function Serpent_CBC_PKCS7() {
        this.cipher = new Serpent_CBC();
        this.padding = new padding_1.PKCS7();
    }
    Serpent_CBC_PKCS7.prototype.encrypt = function (key, pt, iv) {
        return this.cipher.encrypt(key, this.padding.pad(pt, this.cipher.cipher.blockSize), iv);
    };
    Serpent_CBC_PKCS7.prototype.decrypt = function (key, ct, iv) {
        return this.padding.strip(this.cipher.decrypt(key, ct, iv));
    };
    Serpent_CBC_PKCS7.prototype.selftest = function () {
        return this.cipher.selftest();
    };
    return Serpent_CBC_PKCS7;
}());
exports.Serpent_CBC_PKCS7 = Serpent_CBC_PKCS7;
var Serpent_CTR_PKCS7 = /** @class */ (function () {
    function Serpent_CTR_PKCS7() {
        this.cipher = new Serpent_CTR();
        this.padding = new padding_1.PKCS7();
    }
    Serpent_CTR_PKCS7.prototype.encrypt = function (key, pt, iv) {
        return this.cipher.encrypt(key, this.padding.pad(pt, this.cipher.cipher.blockSize), iv);
    };
    Serpent_CTR_PKCS7.prototype.decrypt = function (key, ct, iv) {
        return this.padding.strip(this.cipher.decrypt(key, ct, iv));
    };
    Serpent_CTR_PKCS7.prototype.selftest = function () {
        return this.cipher.selftest();
    };
    return Serpent_CTR_PKCS7;
}());
exports.Serpent_CTR_PKCS7 = Serpent_CTR_PKCS7;


/***/ }),

/***/ "../../node_modules/mipher/dist/sha1.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/sha1.js ***!
  \**********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2016, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief SHA1 implementation
//        Generates a 20 byte (160 bit) hash value
//        CAUTION: SHA1 is meant to be broken, consider using a more secure hash
//                 like SHA512 or better SHA3
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
/**
 * SHA1 class
 */
var SHA1 = /** @class */ (function () {
    /**
     * SHA1 ctor
     */
    function SHA1() {
        this.hashSize = 20;
        this.buffer = new Uint8Array(64);
        this.K = new Uint32Array([0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6]);
        // circular left-shift operator
        this.S = function (n, x) { return (x << n) | (x >>> 32 - n); };
        this.F = function (t, b, c, d) {
            if (t <= 19) {
                return (b & c) | (~b & d);
            }
            else if (t <= 39) {
                return b ^ c ^ d;
            }
            else if (t <= 59) {
                return (b & c) | (b & d) | (c & d);
            }
            else if (t <= 79) {
                return b ^ c ^ d;
            }
        };
        this.init();
    }
    /**
     * Init the hash
     * @return {SHA1} this
     */
    SHA1.prototype.init = function () {
        this.H = new Uint32Array([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
        this.bufferIndex = 0;
        this.count = new Uint32Array(2);
        base_1.Util.clear(this.buffer);
        return this;
    };
    /**
     * Perform one transformation cycle
     */
    SHA1.prototype.transform = function () {
        var h = this.H, a = h[0], b = h[1], c = h[2], d = h[3], e = h[4];
        // convert byte buffer to words
        var w = new Uint32Array(80);
        for (var i = 0; i < 16; i++) {
            w[i] = (this.buffer[(i << 2) + 3]) | (this.buffer[(i << 2) + 2] << 8) | (this.buffer[(i << 2) + 1] << 16) | (this.buffer[i << 2] << 24);
        }
        for (var t = 0; t < 80; t++) {
            if (t >= 16) {
                w[t] = this.S(1, w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]);
            }
            var tmp = (this.S(5, a) + this.F(t, b, c, d) + e + w[t] + this.K[Math.floor(t / 20)]) | 0;
            e = d;
            d = c;
            c = this.S(30, b);
            b = a;
            a = tmp;
        }
        h[0] = (h[0] + a) | 0;
        h[1] = (h[1] + b) | 0;
        h[2] = (h[2] + c) | 0;
        h[3] = (h[3] + d) | 0;
        h[4] = (h[4] + e) | 0;
    };
    /**
     * Update the hash with additional message data
     * @param {Uint8Array} msg Additional message data as byte array
     * @return {SHA1} this
     */
    SHA1.prototype.update = function (msg) {
        msg = msg || new Uint8Array(0);
        // process the msg as many times as possible, the rest is stored in the buffer
        // message is processed in 512 bit (64 byte chunks)
        for (var i = 0; i < msg.length; i++) {
            this.buffer[this.bufferIndex++] = msg[i];
            if (this.bufferIndex === 64) {
                this.transform();
                this.bufferIndex = 0;
            }
        }
        // counter update (number of message bits)
        var c = this.count;
        if ((c[0] += (msg.length << 3)) < (msg.length << 3)) {
            c[1]++;
        }
        c[1] += (msg.length >>> 29);
        return this;
    };
    /**
     * Finalize the hash with additional message data
     * @param {Uint8Array} msg Additional message data as byte array
     * @return {Uint8Array} Hash as 20 byte array
     */
    SHA1.prototype.digest = function (msg) {
        this.update(msg);
        // append '1'
        var b = this.buffer, idx = this.bufferIndex;
        b[idx++] = 0x80;
        // zeropad up to byte pos 56
        while (idx !== 56) {
            if (idx === 64) {
                this.transform();
                idx = 0;
            }
            b[idx++] = 0;
        }
        // append length in bits
        var c = this.count;
        b[56] = (c[1] >>> 24) & 0xff;
        b[57] = (c[1] >>> 16) & 0xff;
        b[58] = (c[1] >>> 8) & 0xff;
        b[59] = (c[1] >>> 0) & 0xff;
        b[60] = (c[0] >>> 24) & 0xff;
        b[61] = (c[0] >>> 16) & 0xff;
        b[62] = (c[0] >>> 8) & 0xff;
        b[63] = (c[0] >>> 0) & 0xff;
        this.transform();
        // return the hash as byte array (20 bytes)
        var hash = new Uint8Array(20);
        for (var i = 0; i < 5; i++) {
            hash[(i << 2) + 0] = (this.H[i] >>> 24) & 0xff;
            hash[(i << 2) + 1] = (this.H[i] >>> 16) & 0xff;
            hash[(i << 2) + 2] = (this.H[i] >>> 8) & 0xff;
            hash[(i << 2) + 3] = (this.H[i] >>> 0) & 0xff;
        }
        // clear internal states and prepare for new hash
        this.init();
        return hash;
    };
    /**
     * All in one step
     * @param {Uint8Array} msg Additional message data
     * @return {Uint8Array} Hash as 20 byte array
     */
    SHA1.prototype.hash = function (msg) {
        return this.init().digest(msg);
    };
    /**
     * Performs a quick selftest
     * @return {Boolean} True if successful
     */
    SHA1.prototype.selftest = function () {
        var cumulative = new SHA1(), sha = new SHA1();
        var toBeHashed = '', hash;
        for (var i = 0; i < 10; i++) {
            for (var n = 100 * i; n < 100 * (i + 1); n++) {
                hash = base_1.Convert.bin2hex(sha.hash(base_1.Convert.str2bin(toBeHashed)));
                cumulative.update(base_1.Convert.str2bin(hash));
                toBeHashed = (hash.substring(0, 2) + toBeHashed).substring(0, n + 1);
            }
        }
        hash = base_1.Convert.bin2hex(cumulative.digest());
        return hash === '00665a042bac62281f2f3666c3565dd005d364dc';
    };
    return SHA1;
}());
exports.SHA1 = SHA1;


/***/ }),

/***/ "../../node_modules/mipher/dist/sha256.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/sha256.js ***!
  \************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2018, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief SHA256 implementation
//        Generates a 32 byte hash value
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
/**
 * SHA256 class
 */
var SHA256 = /** @class */ (function () {
    /**
     * SHA256 ctor
     */
    function SHA256() {
        this.hashSize = 32;
        this.buffer = new Uint8Array(64);
        this.K = new Uint32Array([
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ]);
        this.init();
    }
    /**
     * Init the hash
     * @return {SHA256} this
     */
    SHA256.prototype.init = function () {
        this.H = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
        this.bufferIndex = 0;
        this.count = new Uint32Array(2);
        base_1.Util.clear(this.buffer);
        return this;
    };
    /**
     * Perform one transformation cycle
     */
    SHA256.prototype.transform = function () {
        var h = this.H, h0 = h[0], h1 = h[1], h2 = h[2], h3 = h[3], h4 = h[4], h5 = h[5], h6 = h[6], h7 = h[7];
        // convert byte buffer into w[0..15]
        var i, w = new Uint32Array(16);
        for (i = 0; i < 16; i++) {
            w[i] = (this.buffer[(i << 2) + 3]) |
                (this.buffer[(i << 2) + 2] << 8) |
                (this.buffer[(i << 2) + 1] << 16) |
                (this.buffer[(i << 2)] << 24);
        }
        for (i = 0; i < 64; i++) {
            var tmp = void 0;
            if (i < 16) {
                tmp = w[i];
            }
            else {
                var a = w[(i + 1) & 15];
                var b = w[(i + 14) & 15];
                tmp = w[i & 15] = ((a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i & 15] + w[(i + 9) & 15]) | 0;
            }
            tmp = (tmp + h7 + (h4 >>> 6 ^ h4 >>> 11 ^ h4 >>> 25 ^ h4 << 26 ^ h4 << 21 ^ h4 << 7) + (h6 ^ h4 & (h5 ^ h6)) + this.K[i]) | 0;
            h7 = h6;
            h6 = h5;
            h5 = h4;
            h4 = h3 + tmp;
            h3 = h2;
            h2 = h1;
            h1 = h0;
            h0 = (tmp + ((h1 & h2) ^ (h3 & (h1 ^ h2))) + (h1 >>> 2 ^ h1 >>> 13 ^ h1 >>> 22 ^ h1 << 30 ^ h1 << 19 ^ h1 << 10)) | 0;
        }
        h[0] = (h[0] + h0) | 0;
        h[1] = (h[1] + h1) | 0;
        h[2] = (h[2] + h2) | 0;
        h[3] = (h[3] + h3) | 0;
        h[4] = (h[4] + h4) | 0;
        h[5] = (h[5] + h5) | 0;
        h[6] = (h[6] + h6) | 0;
        h[7] = (h[7] + h7) | 0;
    };
    /**
     * Update the hash with additional message data
     * @param {Array} msg Additional message data as byte array
     * @return {SHA256} this
     */
    SHA256.prototype.update = function (msg) {
        msg = msg || new Uint8Array(0);
        // process the msg as many times as possible, the rest is stored in the buffer
        // message is processed in 512 bit (64 byte chunks)
        for (var i = 0, len = msg.length; i < len; i++) {
            this.buffer[this.bufferIndex++] = msg[i];
            if (this.bufferIndex === 64) {
                this.transform();
                this.bufferIndex = 0;
            }
        }
        // counter update (number of message bits)
        var c = this.count;
        if ((c[0] += (msg.length << 3)) < (msg.length << 3)) {
            c[1]++;
        }
        c[1] += (msg.length >>> 29);
        return this;
    };
    /**
     * Finalize the hash with additional message data
     * @param {Uint8Array} msg Additional message data as byte array
     * @return {Uint8Array} Hash as 32 byte array
     */
    SHA256.prototype.digest = function (msg) {
        this.update(msg);
        // append '1'
        var b = this.buffer, idx = this.bufferIndex;
        b[idx++] = 0x80;
        // zeropad up to byte pos 56
        while (idx !== 56) {
            if (idx === 64) {
                this.transform();
                idx = 0;
            }
            b[idx++] = 0;
        }
        // append length in bits
        var c = this.count;
        b[56] = (c[1] >>> 24) & 0xff;
        b[57] = (c[1] >>> 16) & 0xff;
        b[58] = (c[1] >>> 8) & 0xff;
        b[59] = (c[1] >>> 0) & 0xff;
        b[60] = (c[0] >>> 24) & 0xff;
        b[61] = (c[0] >>> 16) & 0xff;
        b[62] = (c[0] >>> 8) & 0xff;
        b[63] = (c[0] >>> 0) & 0xff;
        this.transform();
        // return the hash as byte array
        var hash = new Uint8Array(32), i;
        for (i = 0; i < 8; i++) {
            hash[(i << 2) + 0] = (this.H[i] >>> 24) & 0xff;
            hash[(i << 2) + 1] = (this.H[i] >>> 16) & 0xff;
            hash[(i << 2) + 2] = (this.H[i] >>> 8) & 0xff;
            hash[(i << 2) + 3] = (this.H[i] >>> 0) & 0xff;
        }
        // clear internal states and prepare for new hash
        this.init();
        return hash;
    };
    /**
     * All in one step
     * @param {Uint8Array} msg Message data as byte array
     * @return {Uint8Array} Hash as 32 byte array
     */
    SHA256.prototype.hash = function (msg) {
        return this.init().digest(msg);
    };
    /**
     * Performs a quick selftest
     * @return {Boolean} True if successful
     */
    SHA256.prototype.selftest = function () {
        var cumulative = new SHA256(), sha = new SHA256();
        var toBeHashed = '', hash, i, n;
        for (i = 0; i < 10; i++) {
            for (n = 100 * i; n < 100 * (i + 1); n++) {
                hash = base_1.Convert.bin2hex(sha.hash(base_1.Convert.str2bin(toBeHashed)));
                cumulative.update(base_1.Convert.str2bin(hash));
                toBeHashed = (hash.substring(0, 2) + toBeHashed).substring(0, n + 1);
            }
        }
        hash = base_1.Convert.bin2hex(cumulative.digest());
        return hash === 'f305c76d5d457ddf04f1927166f5e13429407049a5c5f29021916321fcdcd8b4';
    };
    return SHA256;
}());
exports.SHA256 = SHA256;


/***/ }),

/***/ "../../node_modules/mipher/dist/sha3.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/sha3.js ***!
  \**********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2018, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief SHA3 (the final NIST version) implementation
//        Generates a KECCAK, SHA3 or SHAKE hash value
//
///////////////////////////////////////////////////////////////////////////////
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
/**
 * Keccak class
 */
var Keccak = /** @class */ (function () {
    /**
     * Keccak ctor
     * @param {Number} bits Capacity
     * @param {Number} padding Padding value, 1 for Keccak, 6 for SHA3 and 31 for SHAKE
     * @param {Number} length Optional length of the output hash in bits. If not given bits is taken as default.
     */
    function Keccak(bits, padding, length) {
        this.padding = padding;
        this.hashSize = (length || bits) / 8;
        this.blockCount = (1600 - bits * 2) / 32;
        this.byteCount = this.blockCount * 4;
        this.s = new Uint32Array(50); // s is the state: 5 x 5 array of 64-bit words, here 50 x 32 bit
        this.buffer = new Uint8Array(this.byteCount); // message byte buffer
        this.RC = new Uint32Array([
            1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
            0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
            2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
            2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
            2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648
        ]);
        this.init();
    }
    /**
     * Init the hash
     * @return {Keccak} this
     */
    Keccak.prototype.init = function () {
        // init state array
        for (var i = 0; i < 50; i++) {
            this.s[i] = 0;
        }
        base_1.Util.clear(this.buffer);
        this.bufferIndex = 0;
        return this;
    };
    /**
     * Update the hash with additional message data
     * @param {Uint8Array} msg Additional message data as byte array
     * @return {Keccak} this
     */
    Keccak.prototype.update = function (msg) {
        msg = msg || new Uint8Array(0);
        // process the msg as many times as possible, the rest is stored in the buffer
        // message is processed in byteCount chunk sizes
        for (var i = 0, len = msg.length; i < len; i++) {
            this.buffer[this.bufferIndex++] = msg[i];
            if (this.bufferIndex === this.byteCount) {
                this.keccakf();
                this.bufferIndex = 0;
            }
        }
        return this;
    };
    /**
     * Finalize the hash with additional message data
     * @param {Uint8Array} msg Additional message data as byte array
     * @return {Uint8Array} Hash as byte array
     */
    Keccak.prototype.digest = function (msg) {
        this.update(msg);
        // append: 1-0xxx1 (Keccak), 011-0xxx1 (SHA3), 11111-0xxx1 (SHAKE)
        var b = this.buffer, idx = this.bufferIndex;
        b[idx++] = this.padding;
        // zeropad up to byte blockCount
        while (idx < this.byteCount) {
            b[idx++] = 0;
        }
        b[this.byteCount - 1] |= 0x80;
        this.keccakf();
        // return the hash as byte array
        var hash = new Uint8Array(this.hashSize);
        for (var i = 0; i < this.hashSize / 4; i++) {
            hash[(i << 2) + 0] = (this.s[i] >>> 0) & 0xff;
            hash[(i << 2) + 1] = (this.s[i] >>> 8) & 0xff;
            hash[(i << 2) + 2] = (this.s[i] >>> 16) & 0xff;
            hash[(i << 2) + 3] = (this.s[i] >>> 24) & 0xff;
        }
        // clear internal states and prepare for new hash
        this.init();
        return hash;
    };
    /**
     * All in one step
     * @param {Uint8Array} msg Additional message data
     * @return {Uint8Array} Hash as byte array
     */
    Keccak.prototype.hash = function (msg) {
        return this.init().digest(msg);
    };
    /**
     * Absorb function
     * @private
     */
    Keccak.prototype.keccakf = function () {
        var s = this.s, b = new Uint32Array(50);
        var b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
        // convert byte buffer to words and absorb it
        for (var i = 0; i < this.blockCount; i++) {
            s[i] ^= ((this.buffer[(i << 2) + 0]) | (this.buffer[(i << 2) + 1] << 8) | (this.buffer[(i << 2) + 2] << 16) | (this.buffer[(i << 2) + 3] << 24));
        }
        // transform
        var c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, h, l;
        for (var n = 0; n < 48; n += 2) {
            c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
            c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
            c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
            c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
            c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
            c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
            c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
            c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
            c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
            c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
            h = c8 ^ ((c2 << 1) | (c3 >>> 31));
            l = c9 ^ ((c3 << 1) | (c2 >>> 31));
            s[0] ^= h;
            s[1] ^= l;
            s[10] ^= h;
            s[11] ^= l;
            s[20] ^= h;
            s[21] ^= l;
            s[30] ^= h;
            s[31] ^= l;
            s[40] ^= h;
            s[41] ^= l;
            h = c0 ^ ((c4 << 1) | (c5 >>> 31));
            l = c1 ^ ((c5 << 1) | (c4 >>> 31));
            s[2] ^= h;
            s[3] ^= l;
            s[12] ^= h;
            s[13] ^= l;
            s[22] ^= h;
            s[23] ^= l;
            s[32] ^= h;
            s[33] ^= l;
            s[42] ^= h;
            s[43] ^= l;
            h = c2 ^ ((c6 << 1) | (c7 >>> 31));
            l = c3 ^ ((c7 << 1) | (c6 >>> 31));
            s[4] ^= h;
            s[5] ^= l;
            s[14] ^= h;
            s[15] ^= l;
            s[24] ^= h;
            s[25] ^= l;
            s[34] ^= h;
            s[35] ^= l;
            s[44] ^= h;
            s[45] ^= l;
            h = c4 ^ ((c8 << 1) | (c9 >>> 31));
            l = c5 ^ ((c9 << 1) | (c8 >>> 31));
            s[6] ^= h;
            s[7] ^= l;
            s[16] ^= h;
            s[17] ^= l;
            s[26] ^= h;
            s[27] ^= l;
            s[36] ^= h;
            s[37] ^= l;
            s[46] ^= h;
            s[47] ^= l;
            h = c6 ^ ((c0 << 1) | (c1 >>> 31));
            l = c7 ^ ((c1 << 1) | (c0 >>> 31));
            s[8] ^= h;
            s[9] ^= l;
            s[18] ^= h;
            s[19] ^= l;
            s[28] ^= h;
            s[29] ^= l;
            s[38] ^= h;
            s[39] ^= l;
            s[48] ^= h;
            s[49] ^= l;
            b0 = s[0];
            b1 = s[1];
            b32 = (s[11] << 4) | (s[10] >>> 28);
            b33 = (s[10] << 4) | (s[11] >>> 28);
            b14 = (s[20] << 3) | (s[21] >>> 29);
            b15 = (s[21] << 3) | (s[20] >>> 29);
            b46 = (s[31] << 9) | (s[30] >>> 23);
            b47 = (s[30] << 9) | (s[31] >>> 23);
            b28 = (s[40] << 18) | (s[41] >>> 14);
            b29 = (s[41] << 18) | (s[40] >>> 14);
            b20 = (s[2] << 1) | (s[3] >>> 31);
            b21 = (s[3] << 1) | (s[2] >>> 31);
            b2 = (s[13] << 12) | (s[12] >>> 20);
            b3 = (s[12] << 12) | (s[13] >>> 20);
            b34 = (s[22] << 10) | (s[23] >>> 22);
            b35 = (s[23] << 10) | (s[22] >>> 22);
            b16 = (s[33] << 13) | (s[32] >>> 19);
            b17 = (s[32] << 13) | (s[33] >>> 19);
            b48 = (s[42] << 2) | (s[43] >>> 30);
            b49 = (s[43] << 2) | (s[42] >>> 30);
            b40 = (s[5] << 30) | (s[4] >>> 2);
            b41 = (s[4] << 30) | (s[5] >>> 2);
            b22 = (s[14] << 6) | (s[15] >>> 26);
            b23 = (s[15] << 6) | (s[14] >>> 26);
            b4 = (s[25] << 11) | (s[24] >>> 21);
            b5 = (s[24] << 11) | (s[25] >>> 21);
            b36 = (s[34] << 15) | (s[35] >>> 17);
            b37 = (s[35] << 15) | (s[34] >>> 17);
            b18 = (s[45] << 29) | (s[44] >>> 3);
            b19 = (s[44] << 29) | (s[45] >>> 3);
            b10 = (s[6] << 28) | (s[7] >>> 4);
            b11 = (s[7] << 28) | (s[6] >>> 4);
            b42 = (s[17] << 23) | (s[16] >>> 9);
            b43 = (s[16] << 23) | (s[17] >>> 9);
            b24 = (s[26] << 25) | (s[27] >>> 7);
            b25 = (s[27] << 25) | (s[26] >>> 7);
            b6 = (s[36] << 21) | (s[37] >>> 11);
            b7 = (s[37] << 21) | (s[36] >>> 11);
            b38 = (s[47] << 24) | (s[46] >>> 8);
            b39 = (s[46] << 24) | (s[47] >>> 8);
            b30 = (s[8] << 27) | (s[9] >>> 5);
            b31 = (s[9] << 27) | (s[8] >>> 5);
            b12 = (s[18] << 20) | (s[19] >>> 12);
            b13 = (s[19] << 20) | (s[18] >>> 12);
            b44 = (s[29] << 7) | (s[28] >>> 25);
            b45 = (s[28] << 7) | (s[29] >>> 25);
            b26 = (s[38] << 8) | (s[39] >>> 24);
            b27 = (s[39] << 8) | (s[38] >>> 24);
            b8 = (s[48] << 14) | (s[49] >>> 18);
            b9 = (s[49] << 14) | (s[48] >>> 18);
            s[0] = b0 ^ (~b2 & b4);
            s[1] = b1 ^ (~b3 & b5);
            s[10] = b10 ^ (~b12 & b14);
            s[11] = b11 ^ (~b13 & b15);
            s[20] = b20 ^ (~b22 & b24);
            s[21] = b21 ^ (~b23 & b25);
            s[30] = b30 ^ (~b32 & b34);
            s[31] = b31 ^ (~b33 & b35);
            s[40] = b40 ^ (~b42 & b44);
            s[41] = b41 ^ (~b43 & b45);
            s[2] = b2 ^ (~b4 & b6);
            s[3] = b3 ^ (~b5 & b7);
            s[12] = b12 ^ (~b14 & b16);
            s[13] = b13 ^ (~b15 & b17);
            s[22] = b22 ^ (~b24 & b26);
            s[23] = b23 ^ (~b25 & b27);
            s[32] = b32 ^ (~b34 & b36);
            s[33] = b33 ^ (~b35 & b37);
            s[42] = b42 ^ (~b44 & b46);
            s[43] = b43 ^ (~b45 & b47);
            s[4] = b4 ^ (~b6 & b8);
            s[5] = b5 ^ (~b7 & b9);
            s[14] = b14 ^ (~b16 & b18);
            s[15] = b15 ^ (~b17 & b19);
            s[24] = b24 ^ (~b26 & b28);
            s[25] = b25 ^ (~b27 & b29);
            s[34] = b34 ^ (~b36 & b38);
            s[35] = b35 ^ (~b37 & b39);
            s[44] = b44 ^ (~b46 & b48);
            s[45] = b45 ^ (~b47 & b49);
            s[6] = b6 ^ (~b8 & b0);
            s[7] = b7 ^ (~b9 & b1);
            s[16] = b16 ^ (~b18 & b10);
            s[17] = b17 ^ (~b19 & b11);
            s[26] = b26 ^ (~b28 & b20);
            s[27] = b27 ^ (~b29 & b21);
            s[36] = b36 ^ (~b38 & b30);
            s[37] = b37 ^ (~b39 & b31);
            s[46] = b46 ^ (~b48 & b40);
            s[47] = b47 ^ (~b49 & b41);
            s[8] = b8 ^ (~b0 & b2);
            s[9] = b9 ^ (~b1 & b3);
            s[18] = b18 ^ (~b10 & b12);
            s[19] = b19 ^ (~b11 & b13);
            s[28] = b28 ^ (~b20 & b22);
            s[29] = b29 ^ (~b21 & b23);
            s[38] = b38 ^ (~b30 & b32);
            s[39] = b39 ^ (~b31 & b33);
            s[48] = b48 ^ (~b40 & b42);
            s[49] = b49 ^ (~b41 & b43);
            s[0] ^= this.RC[n];
            s[1] ^= this.RC[n + 1];
        }
    };
    /**
     * Performs a quick selftest
     * @return {Boolean} True if successful
     */
    Keccak.prototype.selftest = function () {
        var cumulative = new SHA3_256(), sha = new SHA3_256();
        var toBeHashed = '', hash, i, n;
        for (i = 0; i < 10; i++) {
            for (n = 100 * i; n < 100 * (i + 1); n++) {
                hash = base_1.Convert.bin2hex(sha.hash(base_1.Convert.str2bin(toBeHashed)));
                cumulative.update(base_1.Convert.str2bin(hash));
                toBeHashed = (hash.substring(0, 2) + toBeHashed).substring(0, n + 1);
            }
        }
        hash = base_1.Convert.bin2hex(cumulative.digest());
        return hash === 'fd4998c647300d4b65c0a9d4795f6c2fbc76a0b644b1b0605c4c21f555b67bef';
    };
    return Keccak;
}());
exports.Keccak = Keccak;
///////////////////////////////////////////////////////////////////////////////
/**
 * Keccak-256 class
 */
var Keccak_256 = /** @class */ (function (_super) {
    __extends(Keccak_256, _super);
    function Keccak_256() {
        return _super.call(this, 256, 1) || this;
    }
    return Keccak_256;
}(Keccak));
exports.Keccak_256 = Keccak_256;
/**
 * Keccak-384 class
 */
var Keccak_384 = /** @class */ (function (_super) {
    __extends(Keccak_384, _super);
    function Keccak_384() {
        return _super.call(this, 384, 1) || this;
    }
    return Keccak_384;
}(Keccak));
exports.Keccak_384 = Keccak_384;
/**
 * SHA3-512 class
 */
var Keccak_512 = /** @class */ (function (_super) {
    __extends(Keccak_512, _super);
    function Keccak_512() {
        return _super.call(this, 512, 1) || this;
    }
    return Keccak_512;
}(Keccak));
exports.Keccak_512 = Keccak_512;
/**
 * SHA3-256 class
 */
var SHA3_256 = /** @class */ (function (_super) {
    __extends(SHA3_256, _super);
    function SHA3_256() {
        return _super.call(this, 256, 6) || this;
    }
    return SHA3_256;
}(Keccak));
exports.SHA3_256 = SHA3_256;
/**
 * SHA3-384 class
 */
var SHA3_384 = /** @class */ (function (_super) {
    __extends(SHA3_384, _super);
    function SHA3_384() {
        return _super.call(this, 384, 6) || this;
    }
    return SHA3_384;
}(Keccak));
exports.SHA3_384 = SHA3_384;
/**
 * SHA3-512 class
 */
var SHA3_512 = /** @class */ (function (_super) {
    __extends(SHA3_512, _super);
    function SHA3_512() {
        return _super.call(this, 512, 6) || this;
    }
    return SHA3_512;
}(Keccak));
exports.SHA3_512 = SHA3_512;
/**
 * SHAKE128 class
 */
var SHAKE128 = /** @class */ (function (_super) {
    __extends(SHAKE128, _super);
    function SHAKE128(length) {
        return _super.call(this, 128, 31, length) || this;
    }
    return SHAKE128;
}(Keccak));
exports.SHAKE128 = SHAKE128;
/**
 * SHAKE256 class
 */
var SHAKE256 = /** @class */ (function (_super) {
    __extends(SHAKE256, _super);
    function SHAKE256(length) {
        return _super.call(this, 256, 31, length) || this;
    }
    return SHAKE256;
}(Keccak));
exports.SHAKE256 = SHAKE256;


/***/ }),

/***/ "../../node_modules/mipher/dist/sha512.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/sha512.js ***!
  \************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2018, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief SHA512 implementation
//        Generates a 64 byte (512 bit) hash value
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
/**
 * SHA512 class
 */
var SHA512 = /** @class */ (function () {
    /**
     * SHA512 ctor
     */
    function SHA512() {
        this.hashSize = 64;
        this.buffer = new Uint8Array(128); // 128 byte array
        this.K = new Uint32Array([
            0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
            0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
            0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
            0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
            0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
            0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
            0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
            0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
            0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
            0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
            0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
            0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
            0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
            0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
            0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
            0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
            0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
            0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
            0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
            0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
        ]);
        this.init();
    }
    /**
     * Init the hash
     * @return {Object} this
     */
    SHA512.prototype.init = function () {
        this.H = new Uint32Array([0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372, 0xfe94f82b, 0xa54ff53a, 0x5f1d36f1,
            0x510e527f, 0xade682d1, 0x9b05688c, 0x2b3e6c1f, 0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19, 0x137e2179]);
        this.bufferIndex = 0;
        this.count = new Uint32Array(2);
        base_1.Util.clear(this.buffer);
        return this;
    };
    /**
     * Perform one transformation cycle
     */
    SHA512.prototype.transform = function () {
        var h = this.H, h0h = h[0], h0l = h[1], h1h = h[2], h1l = h[3], h2h = h[4], h2l = h[5], h3h = h[6], h3l = h[7], h4h = h[8], h4l = h[9], h5h = h[10], h5l = h[11], h6h = h[12], h6l = h[13], h7h = h[14], h7l = h[15];
        var ah = h0h, al = h0l, bh = h1h, bl = h1l, ch = h2h, cl = h2l, dh = h3h, dl = h3l, eh = h4h, el = h4l, fh = h5h, fl = h5l, gh = h6h, gl = h6l, hh = h7h, hl = h7l;
        // convert byte buffer into w[0..31]
        var i, w = new Uint32Array(160);
        for (i = 0; i < 32; i++) {
            w[i] = (this.buffer[(i << 2) + 3]) |
                (this.buffer[(i << 2) + 2] << 8) |
                (this.buffer[(i << 2) + 1] << 16) |
                (this.buffer[(i << 2)] << 24);
        }
        // fill w[32..159]
        var gamma0xl, gamma0xh, gamma0l, gamma0h, gamma1xl, gamma1xh, gamma1l, gamma1h, wrl, wrh, wr7l, wr7h, wr16l, wr16h;
        for (i = 16; i < 80; i++) {
            // Gamma0
            gamma0xh = w[(i - 15) * 2];
            gamma0xl = w[(i - 15) * 2 + 1];
            gamma0h = ((gamma0xl << 31) | (gamma0xh >>> 1)) ^
                ((gamma0xl << 24) | (gamma0xh >>> 8)) ^
                ((gamma0xh >>> 7));
            gamma0l = ((gamma0xh << 31) | (gamma0xl >>> 1)) ^
                ((gamma0xh << 24) | (gamma0xl >>> 8)) ^
                ((gamma0xh << 25) | (gamma0xl >>> 7));
            // Gamma1
            gamma1xh = w[(i - 2) * 2];
            gamma1xl = w[(i - 2) * 2 + 1];
            gamma1h = ((gamma1xl << 13) | (gamma1xh >>> 19)) ^
                ((gamma1xh << 3) | (gamma1xl >>> 29)) ^
                ((gamma1xh >>> 6));
            gamma1l = ((gamma1xh << 13) | (gamma1xl >>> 19)) ^
                ((gamma1xl << 3) | (gamma1xh >>> 29)) ^
                ((gamma1xh << 26) | (gamma1xl >>> 6));
            // shortcuts
            wr7h = w[(i - 7) * 2],
                wr7l = w[(i - 7) * 2 + 1],
                wr16h = w[(i - 16) * 2],
                wr16l = w[(i - 16) * 2 + 1];
            // W(round) = gamma0 + W(round - 7) + gamma1 + W(round - 16)
            wrl = gamma0l + wr7l;
            wrh = gamma0h + wr7h + ((wrl >>> 0) < (gamma0l >>> 0) ? 1 : 0);
            wrl += gamma1l;
            wrh += gamma1h + ((wrl >>> 0) < (gamma1l >>> 0) ? 1 : 0);
            wrl += wr16l;
            wrh += wr16h + ((wrl >>> 0) < (wr16l >>> 0) ? 1 : 0);
            // store
            w[i * 2] = wrh;
            w[i * 2 + 1] = wrl;
        }
        // compress
        var chl, chh, majl, majh, sig0l, sig0h, sig1l, sig1h, krl, krh, t1l, t1h, t2l, t2h;
        for (i = 0; i < 80; i++) {
            // Ch
            chh = (eh & fh) ^ (~eh & gh);
            chl = (el & fl) ^ (~el & gl);
            // Maj
            majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
            majl = (al & bl) ^ (al & cl) ^ (bl & cl);
            // Sigma0
            sig0h = ((al << 4) | (ah >>> 28)) ^ ((ah << 30) | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
            sig0l = ((ah << 4) | (al >>> 28)) ^ ((al << 30) | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
            // Sigma1
            sig1h = ((el << 18) | (eh >>> 14)) ^ ((el << 14) | (eh >>> 18)) ^ ((eh << 23) | (el >>> 9));
            sig1l = ((eh << 18) | (el >>> 14)) ^ ((eh << 14) | (el >>> 18)) ^ ((el << 23) | (eh >>> 9));
            // K(round)
            krh = this.K[i * 2];
            krl = this.K[i * 2 + 1];
            // t1 = h + sigma1 + ch + K(round) + W(round)
            t1l = hl + sig1l;
            t1h = hh + sig1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
            t1l += chl;
            t1h += chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
            t1l += krl;
            t1h += krh + ((t1l >>> 0) < (krl >>> 0) ? 1 : 0);
            t1l = t1l + w[i * 2 + 1];
            t1h += w[i * 2] + ((t1l >>> 0) < (w[i * 2 + 1] >>> 0) ? 1 : 0);
            // t2 = sigma0 + maj
            t2l = sig0l + majl;
            t2h = sig0h + majh + ((t2l >>> 0) < (sig0l >>> 0) ? 1 : 0);
            // update working variables
            hh = gh;
            hl = gl;
            gh = fh;
            gl = fl;
            fh = eh;
            fl = el;
            el = (dl + t1l) | 0;
            eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
            dh = ch;
            dl = cl;
            ch = bh;
            cl = bl;
            bh = ah;
            bl = al;
            al = (t1l + t2l) | 0;
            ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
        }
        // intermediate hash
        h0l = h[1] = (h0l + al) | 0;
        h[0] = (h0h + ah + ((h0l >>> 0) < (al >>> 0) ? 1 : 0)) | 0;
        h1l = h[3] = (h1l + bl) | 0;
        h[2] = (h1h + bh + ((h1l >>> 0) < (bl >>> 0) ? 1 : 0)) | 0;
        h2l = h[5] = (h2l + cl) | 0;
        h[4] = (h2h + ch + ((h2l >>> 0) < (cl >>> 0) ? 1 : 0)) | 0;
        h3l = h[7] = (h3l + dl) | 0;
        h[6] = (h3h + dh + ((h3l >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
        h4l = h[9] = (h4l + el) | 0;
        h[8] = (h4h + eh + ((h4l >>> 0) < (el >>> 0) ? 1 : 0)) | 0;
        h5l = h[11] = (h5l + fl) | 0;
        h[10] = (h5h + fh + ((h5l >>> 0) < (fl >>> 0) ? 1 : 0)) | 0;
        h6l = h[13] = (h6l + gl) | 0;
        h[12] = (h6h + gh + ((h6l >>> 0) < (gl >>> 0) ? 1 : 0)) | 0;
        h7l = h[15] = (h7l + hl) | 0;
        h[14] = (h7h + hh + ((h7l >>> 0) < (hl >>> 0) ? 1 : 0)) | 0;
    };
    /**
     * Update the hash with additional message data
     * @param {Uint8Array} msg Additional message data as byte array
     * @return {SHA512} this
     */
    SHA512.prototype.update = function (msg) {
        msg = msg || new Uint8Array(0);
        // process the msg as many times as possible, the rest is stored in the buffer
        // message is processed in 1024 bit (128 byte chunks)
        for (var i = 0; i < msg.length; i++) {
            this.buffer[this.bufferIndex++] = msg[i];
            if (this.bufferIndex === 128) {
                this.transform();
                this.bufferIndex = 0;
            }
        }
        // counter update (number of message bits)
        var c = this.count;
        if ((c[0] += (msg.length << 3)) < (msg.length << 3)) {
            c[1]++;
        }
        c[1] += (msg.length >>> 29);
        return this;
    };
    /**
     * Finalize the hash with additional message data
     * @param {Uint8Array} msg Additional message data as byte array
     * @return {Uint8Array} Hash as 64 byte array
     */
    SHA512.prototype.digest = function (msg) {
        this.update(msg);
        // append '1'
        var b = this.buffer, idx = this.bufferIndex;
        b[idx++] = 0x80;
        // zeropad up to byte pos 112
        while (idx !== 112) {
            if (idx === 128) {
                this.transform();
                idx = 0;
            }
            b[idx++] = 0;
        }
        // append length in bits
        var c = this.count;
        b[112] = b[113] = b[114] = b[115] = b[116] = b[117] = b[118] = b[119] = 0;
        b[120] = (c[1] >>> 24) & 0xff;
        b[121] = (c[1] >>> 16) & 0xff;
        b[122] = (c[1] >>> 8) & 0xff;
        b[123] = (c[1] >>> 0) & 0xff;
        b[124] = (c[0] >>> 24) & 0xff;
        b[125] = (c[0] >>> 16) & 0xff;
        b[126] = (c[0] >>> 8) & 0xff;
        b[127] = (c[0] >>> 0) & 0xff;
        this.transform();
        // return the hash as byte array
        var i, hash = new Uint8Array(64);
        for (i = 0; i < 16; i++) {
            hash[(i << 2) + 0] = (this.H[i] >>> 24) & 0xff;
            hash[(i << 2) + 1] = (this.H[i] >>> 16) & 0xff;
            hash[(i << 2) + 2] = (this.H[i] >>> 8) & 0xff;
            hash[(i << 2) + 3] = (this.H[i]) & 0xff;
        }
        // clear internal states and prepare for new hash
        this.init();
        return hash;
    };
    /**
     * All in one step
     * @param {Uint8Array} msg Additional message data
     * @return {Uint8Array} Hash as 64 byte array
     */
    SHA512.prototype.hash = function (msg) {
        return this.init().digest(msg);
    };
    /**
     * Performs a quick selftest
     * @return {Boolean} True if successful
     */
    SHA512.prototype.selftest = function () {
        var cumulative = new SHA512(), sha = new SHA512();
        var toBeHashed = '', hash;
        for (var i = 0; i < 10; i++) {
            for (var n = 100 * i; n < 100 * (i + 1); n++) {
                hash = base_1.Convert.bin2hex(sha.hash(base_1.Convert.str2bin(toBeHashed)));
                cumulative.update(base_1.Convert.str2bin(hash));
                toBeHashed = (hash.substring(0, 2) + toBeHashed).substring(0, n + 1);
            }
        }
        hash = base_1.Convert.bin2hex(cumulative.digest());
        return hash === '602923787640dd6d77a99b101c379577a4054df2d61f39c74172cafa2d9f5b26a11b40b7ba4cdc87e84a4ab91b85391cb3e1c0200f3e3d5e317486aae7bebbf3';
    };
    return SHA512;
}());
exports.SHA512 = SHA512;


/***/ }),

/***/ "../../node_modules/mipher/dist/uuid.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/uuid.js ***!
  \**********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief UUID generation after RFC 4122
//        Generates 128 bit UUIDs as V1 (time based) or V4 (random based)
//        https://tools.ietf.org/html/rfc4122
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
/**
 * UUID class
 */
var UUID = /** @class */ (function () {
    /**
     * UUID ctor
     */
    function UUID() {
        this.msec = 0;
        this.nsec = 0;
        this.clockseq = null;
    }
    /**
     * Create a time based V1 UUID
     * @param {Uint8Array} node 6 byte array of unique node identifier like the MAC address or TRUE random data
     * @param {Uint8Array} clockseq Optional 2 byte array of random data for clockseq init
     * @return {Uint8Array} UUID as 16 byte typed array or 'undefined' if error
     */
    UUID.prototype.v1 = function (node, clockseq) {
        var msec, nsec;
        if (typeof performance !== 'undefined' && performance.timing && typeof performance.now === 'function') {
            msec = performance.timing.navigationStart + performance.now();
            nsec = Math.floor((msec % 1) * 10000); // unit is [100 ns] now
            msec = Math.floor(msec);
        }
        else {
            msec = Date.now();
            nsec = 0;
        }
        // convert from unix epoch to Gregorian epoch
        msec += 12219292800000;
        // increment nsec if time is equal to last created value
        if (msec === this.msec && nsec === this.nsec) {
            nsec++;
        }
        // bump clockseq on clock regression
        if (this.clockseq === null) {
            // init clockseq
            var cs = clockseq || base_1.Convert.str2bin(Math.random().toString());
            this.clockseq = (cs[0] | 0) + (cs[1] << 8);
        }
        var dt = (msec - this.msec) + (nsec - this.nsec) / 10000;
        if (dt < 0) {
            this.clockseq = (this.clockseq + 1) & 0x3fff;
            if (msec > this.msec) {
                nsec = 0; // reset nsec if clock regresses
            }
        }
        this.msec = msec;
        this.nsec = nsec;
        var uuid = new Uint8Array(16), i = 0;
        // time_low
        var tl = ((msec & 0xfffffff) * 10000 + nsec) % 0x100000000;
        uuid[i++] = (tl >>> 24) & 0xff;
        uuid[i++] = (tl >>> 16) & 0xff;
        uuid[i++] = (tl >>> 8) & 0xff;
        uuid[i++] = (tl) & 0xff;
        // time_mid
        var tmh = (msec / 0x100000000 * 10000) & 0xfffffff;
        uuid[i++] = (tmh >>> 8) & 0xff;
        uuid[i++] = (tmh) & 0xff;
        // time_high_and_version
        uuid[i++] = (tmh >>> 24) & 0x0f | 0x10; // version is 'V1'
        uuid[i++] = (tmh >>> 16) & 0xff;
        // clock_seq_hi_and_reserved
        uuid[i++] = (this.clockseq >>> 8) & 0x3f | 0x80;
        // clock_seq_low
        uuid[i++] = this.clockseq & 0xff;
        // node (48 bit)
        if (node.length !== 6)
            return;
        for (var n = 0; n < 6; n++) {
            uuid[i++] = node[n];
        }
        return uuid;
    };
    /**
     * Create a random based V4 UUID
     * @param {Uint8Array} rand 16 byte array of TRUE random data
     * @return {Uint8Array} UUID as 16 byte typed array or 'undefined' if error
     */
    UUID.prototype.v4 = function (rand) {
        if (rand.length !== 16)
            return;
        var uuid = new Uint8Array(rand);
        // set bits for version and clock_seq_hi_and_reserved
        uuid[6] = (uuid[6] & 0x0f) | 0x40; // version is 'V4'
        uuid[8] = (uuid[8] & 0x3f) | 0x80;
        return uuid;
    };
    /**
     * Convert an UUID to string format like 550e8400-e29b-11d4-a716-446655440000
     * @param {Uint8Array} uuid 16 byte UUID as byte array
     * @return {String} UUID as string
     */
    UUID.prototype.toString = function (uuid) {
        if (uuid.length !== 16)
            return 'UUID format error';
        var i = 0, b2h = base_1.Convert.bin2hex;
        return b2h(uuid.subarray(i, ++i)) + b2h(uuid.subarray(i, ++i)) +
            b2h(uuid.subarray(i, ++i)) + b2h(uuid.subarray(i, ++i)) + '-' +
            b2h(uuid.subarray(i, ++i)) + b2h(uuid.subarray(i, ++i)) + '-' +
            b2h(uuid.subarray(i, ++i)) + b2h(uuid.subarray(i, ++i)) + '-' +
            b2h(uuid.subarray(i, ++i)) + b2h(uuid.subarray(i, ++i)) + '-' +
            b2h(uuid.subarray(i, ++i)) + b2h(uuid.subarray(i, ++i)) +
            b2h(uuid.subarray(i, ++i)) + b2h(uuid.subarray(i, ++i)) +
            b2h(uuid.subarray(i, ++i)) + b2h(uuid.subarray(i, ++i));
    };
    return UUID;
}());
exports.UUID = UUID;


/***/ }),

/***/ "../../node_modules/mipher/dist/x25519.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/mipher/dist/x25519.js ***!
  \************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
// \author (c) Marco Paland (marco@paland.com)
//             2015-2018, PALANDesign Hannover, Germany
//
// \license The MIT License (MIT)
//
// This file is part of the mipher crypto library.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// \brief curve25519 (scalarmult and ed25519) implementation
//
// inspired by:
// https://github.com/rev22/curve255js
// https://github.com/meganz/jodid25519
//
// test vectors partially taken from:
// https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03
//
// additional documentation:
// https://blog.mozilla.org/warner/2011/11/29/ed25519-keys
// http://csrc.nist.gov/groups/ST/ecc-workshop-2015/presentations/session6-chou-tung.pdf
//
///////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "../../node_modules/mipher/dist/base.js");
var sha512_1 = __webpack_require__(/*! ./sha512 */ "../../node_modules/mipher/dist/sha512.js");
/**
 * Curve25519 class
 */
var Curve25519 = /** @class */ (function () {
    /**
     * Curve25519 ctor
     */
    function Curve25519() {
        this.gf0 = this.gf();
        this.gf1 = this.gf([1]);
        this._9 = new Uint8Array(32);
        this._9[0] = 9;
        this._121665 = this.gf([0xdb41, 1]);
        this.D = this.gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]);
        this.D2 = this.gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]);
        this.I = this.gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);
    }
    Curve25519.prototype.gf = function (init) {
        var r = new Int32Array(16);
        if (init) {
            for (var i = 0; i < init.length; i++) {
                r[i] = init[i];
            }
        }
        return r;
    };
    Curve25519.prototype.A = function (o, a, b) {
        // using 'for' loop is faster as 'map' in 2018-01
        for (var i = 0; i < 16; i++) {
            o[i] = a[i] + b[i];
        }
    };
    Curve25519.prototype.Z = function (o, a, b) {
        // using 'for' loop is faster as 'map' in 2018-01
        for (var i = 0; i < 16; i++) {
            o[i] = a[i] - b[i];
        }
    };
    Curve25519.prototype.M = function (o, a, b) {
        // performance: using discrete vars instead of an array and
        // avoidance of 'for' loops here increases performance by factor 3
        var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        v = a[0];
        t0 += v * b0;
        t1 += v * b1;
        t2 += v * b2;
        t3 += v * b3;
        t4 += v * b4;
        t5 += v * b5;
        t6 += v * b6;
        t7 += v * b7;
        t8 += v * b8;
        t9 += v * b9;
        t10 += v * b10;
        t11 += v * b11;
        t12 += v * b12;
        t13 += v * b13;
        t14 += v * b14;
        t15 += v * b15;
        v = a[1];
        t1 += v * b0;
        t2 += v * b1;
        t3 += v * b2;
        t4 += v * b3;
        t5 += v * b4;
        t6 += v * b5;
        t7 += v * b6;
        t8 += v * b7;
        t9 += v * b8;
        t10 += v * b9;
        t11 += v * b10;
        t12 += v * b11;
        t13 += v * b12;
        t14 += v * b13;
        t15 += v * b14;
        t16 += v * b15;
        v = a[2];
        t2 += v * b0;
        t3 += v * b1;
        t4 += v * b2;
        t5 += v * b3;
        t6 += v * b4;
        t7 += v * b5;
        t8 += v * b6;
        t9 += v * b7;
        t10 += v * b8;
        t11 += v * b9;
        t12 += v * b10;
        t13 += v * b11;
        t14 += v * b12;
        t15 += v * b13;
        t16 += v * b14;
        t17 += v * b15;
        v = a[3];
        t3 += v * b0;
        t4 += v * b1;
        t5 += v * b2;
        t6 += v * b3;
        t7 += v * b4;
        t8 += v * b5;
        t9 += v * b6;
        t10 += v * b7;
        t11 += v * b8;
        t12 += v * b9;
        t13 += v * b10;
        t14 += v * b11;
        t15 += v * b12;
        t16 += v * b13;
        t17 += v * b14;
        t18 += v * b15;
        v = a[4];
        t4 += v * b0;
        t5 += v * b1;
        t6 += v * b2;
        t7 += v * b3;
        t8 += v * b4;
        t9 += v * b5;
        t10 += v * b6;
        t11 += v * b7;
        t12 += v * b8;
        t13 += v * b9;
        t14 += v * b10;
        t15 += v * b11;
        t16 += v * b12;
        t17 += v * b13;
        t18 += v * b14;
        t19 += v * b15;
        v = a[5];
        t5 += v * b0;
        t6 += v * b1;
        t7 += v * b2;
        t8 += v * b3;
        t9 += v * b4;
        t10 += v * b5;
        t11 += v * b6;
        t12 += v * b7;
        t13 += v * b8;
        t14 += v * b9;
        t15 += v * b10;
        t16 += v * b11;
        t17 += v * b12;
        t18 += v * b13;
        t19 += v * b14;
        t20 += v * b15;
        v = a[6];
        t6 += v * b0;
        t7 += v * b1;
        t8 += v * b2;
        t9 += v * b3;
        t10 += v * b4;
        t11 += v * b5;
        t12 += v * b6;
        t13 += v * b7;
        t14 += v * b8;
        t15 += v * b9;
        t16 += v * b10;
        t17 += v * b11;
        t18 += v * b12;
        t19 += v * b13;
        t20 += v * b14;
        t21 += v * b15;
        v = a[7];
        t7 += v * b0;
        t8 += v * b1;
        t9 += v * b2;
        t10 += v * b3;
        t11 += v * b4;
        t12 += v * b5;
        t13 += v * b6;
        t14 += v * b7;
        t15 += v * b8;
        t16 += v * b9;
        t17 += v * b10;
        t18 += v * b11;
        t19 += v * b12;
        t20 += v * b13;
        t21 += v * b14;
        t22 += v * b15;
        v = a[8];
        t8 += v * b0;
        t9 += v * b1;
        t10 += v * b2;
        t11 += v * b3;
        t12 += v * b4;
        t13 += v * b5;
        t14 += v * b6;
        t15 += v * b7;
        t16 += v * b8;
        t17 += v * b9;
        t18 += v * b10;
        t19 += v * b11;
        t20 += v * b12;
        t21 += v * b13;
        t22 += v * b14;
        t23 += v * b15;
        v = a[9];
        t9 += v * b0;
        t10 += v * b1;
        t11 += v * b2;
        t12 += v * b3;
        t13 += v * b4;
        t14 += v * b5;
        t15 += v * b6;
        t16 += v * b7;
        t17 += v * b8;
        t18 += v * b9;
        t19 += v * b10;
        t20 += v * b11;
        t21 += v * b12;
        t22 += v * b13;
        t23 += v * b14;
        t24 += v * b15;
        v = a[10];
        t10 += v * b0;
        t11 += v * b1;
        t12 += v * b2;
        t13 += v * b3;
        t14 += v * b4;
        t15 += v * b5;
        t16 += v * b6;
        t17 += v * b7;
        t18 += v * b8;
        t19 += v * b9;
        t20 += v * b10;
        t21 += v * b11;
        t22 += v * b12;
        t23 += v * b13;
        t24 += v * b14;
        t25 += v * b15;
        v = a[11];
        t11 += v * b0;
        t12 += v * b1;
        t13 += v * b2;
        t14 += v * b3;
        t15 += v * b4;
        t16 += v * b5;
        t17 += v * b6;
        t18 += v * b7;
        t19 += v * b8;
        t20 += v * b9;
        t21 += v * b10;
        t22 += v * b11;
        t23 += v * b12;
        t24 += v * b13;
        t25 += v * b14;
        t26 += v * b15;
        v = a[12];
        t12 += v * b0;
        t13 += v * b1;
        t14 += v * b2;
        t15 += v * b3;
        t16 += v * b4;
        t17 += v * b5;
        t18 += v * b6;
        t19 += v * b7;
        t20 += v * b8;
        t21 += v * b9;
        t22 += v * b10;
        t23 += v * b11;
        t24 += v * b12;
        t25 += v * b13;
        t26 += v * b14;
        t27 += v * b15;
        v = a[13];
        t13 += v * b0;
        t14 += v * b1;
        t15 += v * b2;
        t16 += v * b3;
        t17 += v * b4;
        t18 += v * b5;
        t19 += v * b6;
        t20 += v * b7;
        t21 += v * b8;
        t22 += v * b9;
        t23 += v * b10;
        t24 += v * b11;
        t25 += v * b12;
        t26 += v * b13;
        t27 += v * b14;
        t28 += v * b15;
        v = a[14];
        t14 += v * b0;
        t15 += v * b1;
        t16 += v * b2;
        t17 += v * b3;
        t18 += v * b4;
        t19 += v * b5;
        t20 += v * b6;
        t21 += v * b7;
        t22 += v * b8;
        t23 += v * b9;
        t24 += v * b10;
        t25 += v * b11;
        t26 += v * b12;
        t27 += v * b13;
        t28 += v * b14;
        t29 += v * b15;
        v = a[15];
        t15 += v * b0;
        t16 += v * b1;
        t17 += v * b2;
        t18 += v * b3;
        t19 += v * b4;
        t20 += v * b5;
        t21 += v * b6;
        t22 += v * b7;
        t23 += v * b8;
        t24 += v * b9;
        t25 += v * b10;
        t26 += v * b11;
        t27 += v * b12;
        t28 += v * b13;
        t29 += v * b14;
        t30 += v * b15;
        t0 += 38 * t16;
        t1 += 38 * t17;
        t2 += 38 * t18;
        t3 += 38 * t19;
        t4 += 38 * t20;
        t5 += 38 * t21;
        t6 += 38 * t22;
        t7 += 38 * t23;
        t8 += 38 * t24;
        t9 += 38 * t25;
        t10 += 38 * t26;
        t11 += 38 * t27;
        t12 += 38 * t28;
        t13 += 38 * t29;
        t14 += 38 * t30;
        // t15 left as it is
        // first car
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536; // values may by negative, so no shifts here
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        // second car
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        o[0] = t0;
        o[1] = t1;
        o[2] = t2;
        o[3] = t3;
        o[4] = t4;
        o[5] = t5;
        o[6] = t6;
        o[7] = t7;
        o[8] = t8;
        o[9] = t9;
        o[10] = t10;
        o[11] = t11;
        o[12] = t12;
        o[13] = t13;
        o[14] = t14;
        o[15] = t15;
    };
    Curve25519.prototype.S = function (o, a) {
        this.M(o, a, a);
    };
    Curve25519.prototype.add = function (p, q) {
        var a = this.gf(), b = this.gf(), c = this.gf(), d = this.gf(), e = this.gf(), f = this.gf(), g = this.gf(), h = this.gf(), t = this.gf();
        this.Z(a, p[1], p[0]);
        this.Z(t, q[1], q[0]);
        this.M(a, a, t);
        this.A(b, p[0], p[1]);
        this.A(t, q[0], q[1]);
        this.M(b, b, t);
        this.M(c, p[3], q[3]);
        this.M(c, c, this.D2);
        this.M(d, p[2], q[2]);
        this.A(d, d, d);
        this.Z(e, b, a);
        this.Z(f, d, c);
        this.A(g, d, c);
        this.A(h, b, a);
        this.M(p[0], e, f);
        this.M(p[1], h, g);
        this.M(p[2], g, f);
        this.M(p[3], e, h);
    };
    Curve25519.prototype.set25519 = function (r, a) {
        for (var i = 0; i < 16; i++) {
            r[i] = a[i];
        }
    };
    Curve25519.prototype.car25519 = function (o) {
        var i, v, c = 1;
        for (i = 0; i < 16; i++) {
            v = o[i] + c + 65535;
            c = Math.floor(v / 65536);
            o[i] = v - c * 65536;
        }
        o[0] += c - 1 + 37 * (c - 1);
    };
    Curve25519.prototype.sel25519 = function (p, q, b) {
        // b is 0 or 1
        var i, t, c = ~(b - 1);
        for (i = 0; i < 16; i++) {
            t = c & (p[i] ^ q[i]);
            p[i] ^= t;
            q[i] ^= t;
        }
    };
    Curve25519.prototype.inv25519 = function (o, i) {
        var a, c = this.gf();
        for (a = 0; a < 16; a++) {
            c[a] = i[a];
        }
        for (a = 253; a >= 0; a--) {
            this.S(c, c);
            if (a !== 2 && a !== 4) {
                this.M(c, c, i);
            }
        }
        for (a = 0; a < 16; a++) {
            o[a] = c[a];
        }
    };
    Curve25519.prototype.neq25519 = function (a, b) {
        var c = new Uint8Array(32), d = new Uint8Array(32);
        this.pack25519(c, a);
        this.pack25519(d, b);
        return !base_1.Util.compare(c, d);
    };
    Curve25519.prototype.par25519 = function (a) {
        var d = new Uint8Array(32);
        this.pack25519(d, a);
        return d[0] & 1;
    };
    Curve25519.prototype.pow2523 = function (o, i) {
        var a, c = this.gf();
        for (a = 0; a < 16; a++)
            c[a] = i[a];
        for (a = 250; a >= 0; a--) {
            this.S(c, c);
            if (a !== 1)
                this.M(c, c, i);
        }
        for (a = 0; a < 16; a++)
            o[a] = c[a];
    };
    Curve25519.prototype.cswap = function (p, q, b) {
        for (var i = 0; i < 4; i++) {
            this.sel25519(p[i], q[i], b);
        }
    };
    Curve25519.prototype.pack25519 = function (o, n) {
        var i, m = this.gf(), t = this.gf();
        for (i = 0; i < 16; i++) {
            t[i] = n[i];
        }
        this.car25519(t);
        this.car25519(t);
        this.car25519(t);
        for (var j = 0; j < 2; j++) {
            m[0] = t[0] - 0xffed;
            for (i = 1; i < 15; i++) {
                m[i] = t[i] - 0xffff - ((m[i - 1] >>> 16) & 1);
                m[i - 1] &= 0xffff;
            }
            m[15] = t[15] - 0x7fff - ((m[14] >>> 16) & 1);
            var b = (m[15] >>> 16) & 1;
            m[14] &= 0xffff;
            this.sel25519(t, m, 1 - b);
        }
        for (i = 0; i < 16; i++) {
            o[2 * i] = t[i] & 0xff;
            o[2 * i + 1] = t[i] >>> 8;
        }
    };
    Curve25519.prototype.unpack25519 = function (o, n) {
        for (var i = 0; i < 16; i++) {
            o[i] = n[2 * i] + (n[2 * i + 1] << 8);
        }
        o[15] &= 0x7fff;
    };
    Curve25519.prototype.unpackNeg = function (r, p) {
        var t = this.gf(), chk = this.gf(), num = this.gf(), den = this.gf(), den2 = this.gf(), den4 = this.gf(), den6 = this.gf();
        this.set25519(r[2], this.gf1);
        this.unpack25519(r[1], p);
        this.S(num, r[1]);
        this.M(den, num, this.D);
        this.Z(num, num, r[2]);
        this.A(den, r[2], den);
        this.S(den2, den);
        this.S(den4, den2);
        this.M(den6, den4, den2);
        this.M(t, den6, num);
        this.M(t, t, den);
        this.pow2523(t, t);
        this.M(t, t, num);
        this.M(t, t, den);
        this.M(t, t, den);
        this.M(r[0], t, den);
        this.S(chk, r[0]);
        this.M(chk, chk, den);
        if (this.neq25519(chk, num))
            this.M(r[0], r[0], this.I);
        this.S(chk, r[0]);
        this.M(chk, chk, den);
        if (this.neq25519(chk, num)) {
            return -1;
        }
        if (this.par25519(r[0]) === (p[31] >>> 7))
            this.Z(r[0], this.gf0, r[0]);
        this.M(r[3], r[0], r[1]);
        return 0;
    };
    /**
     * Internal scalar mult function
     * @param q Result
     * @param s Secret key
     * @param p Public key
     */
    Curve25519.prototype.crypto_scalarmult = function (q, s, p) {
        var x = new Int32Array(80), r, i;
        var a = this.gf(), b = this.gf(), c = this.gf(), d = this.gf(), e = this.gf(), f = this.gf();
        this.unpack25519(x, p);
        for (i = 0; i < 16; i++) {
            b[i] = x[i];
            d[i] = a[i] = c[i] = 0;
        }
        a[0] = d[0] = 1;
        for (i = 254; i >= 0; --i) {
            r = (s[i >>> 3] >>> (i & 7)) & 1;
            this.sel25519(a, b, r);
            this.sel25519(c, d, r);
            this.A(e, a, c);
            this.Z(a, a, c);
            this.A(c, b, d);
            this.Z(b, b, d);
            this.S(d, e);
            this.S(f, a);
            this.M(a, c, a);
            this.M(c, b, e);
            this.A(e, a, c);
            this.Z(a, a, c);
            this.S(b, a);
            this.Z(c, d, f);
            this.M(a, c, this._121665);
            this.A(a, a, d);
            this.M(c, c, a);
            this.M(a, d, f);
            this.M(d, b, x);
            this.S(b, e);
            this.sel25519(a, b, r);
            this.sel25519(c, d, r);
        }
        for (i = 0; i < 16; i++) {
            x[i + 16] = a[i];
            x[i + 32] = c[i];
            x[i + 48] = b[i];
            x[i + 64] = d[i];
        }
        var x32 = x.subarray(32);
        var x16 = x.subarray(16);
        this.inv25519(x32, x32);
        this.M(x16, x16, x32);
        this.pack25519(q, x16);
    };
    /**
     * Generate the common key as the produkt of sk1 * pk2
     * @param {Uint8Array} sk A 32 byte secret key of pair 1
     * @param {Uint8Array} pk A 32 byte public key of pair 2
     * @return {Uint8Array} sk * pk
     */
    Curve25519.prototype.scalarMult = function (sk, pk) {
        var q = new Uint8Array(32);
        this.crypto_scalarmult(q, sk, pk);
        return q;
    };
    /**
     * Generate a curve 25519 keypair
     * @param {Uint8Array} seed A 32 byte cryptographic secure random array. This is basically the secret key
     * @param {Object} Returns sk (Secret key) and pk (Public key) as 32 byte typed arrays
     */
    Curve25519.prototype.generateKeys = function (seed) {
        var sk = seed.slice();
        var pk = new Uint8Array(32);
        if (sk.length !== 32) {
            return;
        }
        // harden the secret key by clearing bit 0, 1, 2, 255 and setting bit 254
        // clearing the lower 3 bits of the secret key ensures that is it a multiple of 8
        sk[0] &= 0xf8;
        sk[31] &= 0x7f;
        sk[31] |= 0x40;
        this.crypto_scalarmult(pk, sk, this._9);
        return { sk: sk, pk: pk };
    };
    /**
     * Performs a quick selftest
     * @param {Boolean} Returns true if selftest passed
     */
    Curve25519.prototype.selftest = function () {
        var key = [
            {
                sk: '77076d0a7318a57d3c16c17251b26645df4c2f87ebc0992ab177fba51db92c2a',
                pk: '8520f0098930a754748b7ddcb43ef75a0dbf3a0d26381af4eba4a98eaa9b4e6a'
            },
            {
                sk: '5dab087e624a8a4b79e17f8b83800ee66f3bb1292618b6fd1c2f8b27ff88e0eb',
                pk: 'de9edb7d7b7dc1b4d35b61c2ece435373f8343c85b78674dadfc7e146f882b4f'
            }
        ];
        var mul = [
            {
                sk: '0300000000000000000000000000000000000000000000000000000000000000',
                pk: '0900000000000000000000000000000000000000000000000000000000000000',
                sp: '123c71fbaf030ac059081c62674e82f864ba1bc2914d5345e6ab576d1abc121c'
            },
            {
                sk: '847c4978577d530dcb491d58bcc9cba87f9e075e6e02c003f27aee503cecb641',
                pk: '57faa45404f10f1e4733047eca8f2f3001c12aa859e40d74cf59afaabe441d45',
                sp: 'b3c49b94dcc349ba05ca13521e19d1b93fc472f1545bbf9bdf7ec7b442be4a2c'
            }
        ];
        // key generation
        var sk, pk, sp;
        for (var i = 0, len = key.length; i < len; i++) {
            sk = base_1.Convert.hex2bin(key[i].sk);
            pk = base_1.Convert.hex2bin(key[i].pk);
            if (!base_1.Util.compare(this.generateKeys(sk).pk, pk))
                return false;
        }
        // scalar multiplication
        for (var i = 0, len = mul.length; i < len; i++) {
            sk = base_1.Convert.hex2bin(mul[i].sk);
            pk = base_1.Convert.hex2bin(mul[i].pk);
            sp = base_1.Convert.hex2bin(mul[i].sp);
            if (!base_1.Util.compare(this.scalarMult(sk, pk), sp))
                return false;
        }
        return true;
    };
    return Curve25519;
}());
exports.Curve25519 = Curve25519;
///////////////////////////////////////////////////////////////////////////////
// E D 2 5 5 1 9
/**
 * Ed25519 class
 */
var Ed25519 = /** @class */ (function () {
    /**
     * Ed25519 ctor
     */
    function Ed25519() {
        this.curve = new Curve25519();
        this.sha512 = new sha512_1.SHA512();
        this.X = this.curve.gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]);
        this.Y = this.curve.gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]);
        this.L = new Uint8Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);
    }
    Ed25519.prototype.pack = function (r, p) {
        var CURVE = this.curve;
        var tx = CURVE.gf(), ty = CURVE.gf(), zi = CURVE.gf();
        CURVE.inv25519(zi, p[2]);
        CURVE.M(tx, p[0], zi);
        CURVE.M(ty, p[1], zi);
        CURVE.pack25519(r, ty);
        r[31] ^= CURVE.par25519(tx) << 7;
    };
    Ed25519.prototype.modL = function (r, x) {
        var carry, i, j, k;
        for (i = 63; i >= 32; --i) {
            carry = 0;
            for (j = i - 32, k = i - 12; j < k; ++j) {
                x[j] += carry - 16 * x[i] * this.L[j - (i - 32)];
                carry = (x[j] + 128) >> 8; // caution: NO >>> here, carry is needed!!!
                x[j] -= carry * 256;
            }
            x[j] += carry;
            x[i] = 0;
        }
        carry = 0;
        for (j = 0; j < 32; j++) {
            x[j] += carry - (x[31] >> 4) * this.L[j]; // caution: NO >>> here, carry is needed!!!
            carry = x[j] >> 8; // caution: NO >>> here, carry is needed!!!
            x[j] &= 255;
        }
        for (j = 0; j < 32; j++)
            x[j] -= carry * this.L[j];
        for (i = 0; i < 32; i++) {
            x[i + 1] += x[i] >>> 8;
            r[i] = x[i] & 0xff;
        }
    };
    Ed25519.prototype.reduce = function (r) {
        var i, x = new Uint32Array(64);
        for (i = 0; i < 64; i++) {
            x[i] = r[i];
        }
        this.modL(r, x);
    };
    Ed25519.prototype.scalarmult = function (p, q, s) {
        var CURVE = this.curve;
        CURVE.set25519(p[0], CURVE.gf0);
        CURVE.set25519(p[1], CURVE.gf1);
        CURVE.set25519(p[2], CURVE.gf1);
        CURVE.set25519(p[3], CURVE.gf0);
        for (var i = 255; i >= 0; --i) {
            var b = (s[(i / 8) | 0] >>> (i & 7)) & 1;
            CURVE.cswap(p, q, b);
            CURVE.add(q, p);
            CURVE.add(p, p);
            CURVE.cswap(p, q, b);
        }
    };
    Ed25519.prototype.scalarbase = function (p, s) {
        var CURVE = this.curve;
        var q = [CURVE.gf(), CURVE.gf(), CURVE.gf(), CURVE.gf()];
        CURVE.set25519(q[0], this.X);
        CURVE.set25519(q[1], this.Y);
        CURVE.set25519(q[2], CURVE.gf1);
        CURVE.M(q[3], this.X, this.Y);
        this.scalarmult(p, q, s);
    };
    /**
     * Generate an ed25519 keypair
     * Some implementations represent the secret key as a combination of sk and pk. mipher just uses the sk itself.
     * @param {Uint8Array} seed A 32 byte cryptographic secure random array. This is basically the secret key
     * @param {Object} Returns sk (Secret key) and pk (Public key) as 32 byte typed arrays
     */
    Ed25519.prototype.generateKeys = function (seed) {
        var sk = seed.slice();
        var pk = new Uint8Array(32);
        if (sk.length !== 32) {
            return;
        }
        var p = [this.curve.gf(), this.curve.gf(), this.curve.gf(), this.curve.gf()];
        var h = this.sha512.hash(sk).subarray(0, 32);
        // harden the secret key by clearing bit 0, 1, 2, 255 and setting bit 254
        // clearing the lower 3 bits of the secret key ensures that is it a multiple of 8
        h[0] &= 0xf8;
        h[31] &= 0x7f;
        h[31] |= 0x40;
        this.scalarbase(p, h);
        this.pack(pk, p);
        return { sk: sk, pk: pk };
    };
    /**
     * Generate a message signature
     * @param {Uint8Array} msg Message to be signed as byte array
     * @param {Uint8Array} sk Secret key as 32 byte array
     * @param {Uint8Array} pk Public key as 32 byte array
     * @param {Uint8Array} Returns the signature as 64 byte typed array
     */
    Ed25519.prototype.sign = function (msg, sk, pk) {
        var CURVE = this.curve;
        var p = [CURVE.gf(), CURVE.gf(), CURVE.gf(), CURVE.gf()];
        var h = this.sha512.hash(sk);
        if (sk.length !== 32)
            return;
        if (pk.length !== 32)
            return;
        h[0] &= 0xf8;
        h[31] &= 0x7f;
        h[31] |= 0x40;
        // compute r = SHA512(h[32-63] || M)
        var s = new Uint8Array(64);
        var r = this.sha512.init().update(h.subarray(32)).digest(msg);
        this.reduce(r);
        this.scalarbase(p, r);
        this.pack(s, p);
        // compute k = SHA512(R || A || M)
        var k = this.sha512.init().update(s.subarray(0, 32)).update(pk).digest(msg);
        this.reduce(k);
        // compute s = (r + k a) mod q
        var x = new Uint32Array(64), i, j;
        for (i = 0; i < 32; i++)
            x[i] = r[i];
        for (i = 0; i < 32; i++) {
            for (j = 0; j < 32; j++) {
                x[i + j] += k[i] * h[j];
            }
        }
        this.modL(s.subarray(32), x);
        return s;
    };
    /**
     * Verify a message signature
     * @param {Uint8Array} msg Message to be signed as byte array
     * @param {Uint8Array} pk Public key as 32 byte array
     * @param {Uint8Array} sig Signature as 64 byte array
     * @param {Boolean} Returns true if signature is valid
     */
    Ed25519.prototype.verify = function (msg, pk, sig) {
        var CURVE = this.curve;
        var p = [CURVE.gf(), CURVE.gf(), CURVE.gf(), CURVE.gf()], q = [CURVE.gf(), CURVE.gf(), CURVE.gf(), CURVE.gf()];
        if (sig.length !== 64)
            return false;
        if (pk.length !== 32)
            return false;
        if (CURVE.unpackNeg(q, pk))
            return false;
        // compute k = SHA512(R || A || M)
        var k = this.sha512.init().update(sig.subarray(0, 32)).update(pk).digest(msg);
        this.reduce(k);
        this.scalarmult(p, q, k);
        var t = new Uint8Array(32);
        this.scalarbase(q, sig.subarray(32));
        CURVE.add(p, q);
        this.pack(t, p);
        return base_1.Util.compare(sig.subarray(0, 32), t);
    };
    /**
     * Performs a quick selftest
     * @param {Boolean} Returns true if selftest passed
     */
    Ed25519.prototype.selftest = function () {
        var v = [
            { sk: '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
                pk: 'd75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a',
                m: '',
                s: 'e5564300c360ac729086e2cc806e828a84877f1eb8e5d974d873e065224901555fb8821590a33bacc61e39701cf9b46bd25bf5f0595bbe24655141438e7a100b' },
            { sk: '4ccd089b28ff96da9db6c346ec114e0f5b8a319f35aba624da8cf6ed4fb8a6fb',
                pk: '3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c',
                m: '72',
                s: '92a009a9f0d4cab8720e820b5f642540a2b27b5416503f8fb3762223ebdb69da085ac1e43e15996e458f3613d0f11d8c387b2eaeb4302aeeb00d291612bb0c00' },
            { sk: '5b5a619f8ce1c66d7ce26e5a2ae7b0c04febcd346d286c929e19d0d5973bfef9',
                pk: '6fe83693d011d111131c4f3fbaaa40a9d3d76b30012ff73bb0e39ec27ab18257',
                m: '5a8d9d0a22357e6655f9c785',
                s: '0f9ad9793033a2fa06614b277d37381e6d94f65ac2a5a94558d09ed6ce922258c1a567952e863ac94297aec3c0d0c8ddf71084e504860bb6ba27449b55adc40e' }
        ];
        for (var i = 0; i < v.length; i++) {
            var sk = base_1.Convert.hex2bin(v[i].sk), pk = base_1.Convert.hex2bin(v[i].pk), m = base_1.Convert.hex2bin(v[i].m), s = base_1.Convert.hex2bin(v[i].s);
            // sign test
            if (!base_1.Util.compare(this.sign(m, sk, pk), s))
                return false;
            // verify test
            if (!this.verify(m, pk, s))
                return false;
            s[i % 64] ^= 0x01;
            if (this.verify(m, pk, s))
                return false;
        }
        return true;
    };
    return Ed25519;
}());
exports.Ed25519 = Ed25519;


/***/ }),

/***/ "../../node_modules/safe-buffer/index.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/safe-buffer/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "buffer")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "../../node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

const Types = __webpack_require__(/*! ./src/Types */ "./src/Types/index.js");

const Objects = __webpack_require__(/*! ./src/Objects */ "./src/Objects/index.js");

const Coding = __webpack_require__(/*! ./src/Coding */ "./src/Coding/index.js");

module.exports = {
  Base58: __webpack_require__(/*! ./src/Base58 */ "./src/Base58.js"),
  BC: __webpack_require__(/*! ./src/BC */ "./src/BC.js"),
  Endian: __webpack_require__(/*! ./src/Endian */ "./src/Endian.js"),
  PascalInfo: __webpack_require__(/*! ./src/PascalInfo */ "./src/PascalInfo.js"),
  Sha: __webpack_require__(/*! ./src/Sha */ "./src/Sha.js"),
  Util: __webpack_require__(/*! ./src/Util */ "./src/Util.js"),
  Types,
  Coding,
  Objects,

  accountNumber(accountNumber) {
    return new Types.AccountNumber(accountNumber);
  },

  accountName(accountName) {
    return new Types.AccountName(accountName);
  },

  currency(value) {
    return new Types.Currency();
  },

  opHash(opHash) {
    return new Types.OperationHash();
  },

  curve(curve) {
    return new Types.Curve(curve);
  },

  keyPair(privateKey, publicKey) {
    return new Types.KeyPair(privateKey, publicKey);
  },

  privateKey(privateKey) {
    return new Types.PrivateKey(privateKey);
  },

  encodePublicKey(publicKey) {
    return new Coding.Pascal.Keys.PublicKey().encodeToBytes(publicKey);
  },

  encodePublicKeyBase58(publicKey) {
    return new Coding.Pascal.Keys.PublicKey().encodeToBase58(publicKey);
  },

  decodePublicKey(publicKey) {
    return new Coding.Pascal.Keys.PublicKey().decodeFromBytes(publicKey);
  },

  decodePublicKeyBase58(publicKey) {
    return new Coding.Pascal.Keys.PublicKey().decodeFromBase58(publicKey);
  },

  encodePrivateKey(privateKey) {
    return new Coding.Pascal.Keys.PrivateKey().encodeToBytes(privateKey);
  }

};

/***/ }),

/***/ "./src/BC.js":
/*!*******************!*\
  !*** ./src/BC.js ***!
  \*******************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Endian = __webpack_require__(/*! ./Endian */ "./src/Endian.js");

const P_BUFFER = Symbol('buffer');
/**
 * A BC value as defined in PascalCoin. In essence its a wrapper for
 * a buffer.
 */

class BC {
  /**
     * Constructor
     *
   * @param {Buffer|Uint8Array} buffer
     */
  constructor(buffer) {
    this[P_BUFFER] = Buffer.from(buffer);
  }
  /**
   * Gets a BC instance from the given value. If a string it expects it to be
   * in hex format.
   *
   * This method it called everywhere, so we make sure that
   *
   * @param {Buffer|Uint8Array|BC|String} data
   * @param {String} stringType
   * @returns {BC}
   */


  static from(data, stringType = 'hex') {
    if (data instanceof BC) {
      return data;
    } else if (data instanceof Buffer) {
      return new BC(data);
    } else if (data instanceof Uint8Array) {
      return new BC(data);
    }

    if (stringType === 'hex') {
      try {
        return BC.fromHex(data);
      } catch (e) {
        return BC.fromString(data);
      }
    }

    return BC.fromString(data);
  }
  /**
   * Gets an empty BC.
   *
   * @returns {BC}
   */


  static empty() {
    return BC.from([]);
  }
  /**
     * Creates a new BC instance from the given hex string.
     *
   * @param {string} hex
   * @param {Boolean} strict
     * @returns {BC}
     */


  static fromHex(hex, strict = true) {
    if (hex instanceof BC) {
      return hex;
    }

    if (hex.length % 2 === 1) {
      if (strict) {
        throw new Error('Invalid hex - number of nibbles need to be divideable by 2');
      } else {
        hex = `0${hex}`; // eslint-disable-line no-param-reassign
      }
    }

    if (hex.length > 0 && /^[0-9a-fA-F]+$/.test(hex) === false) {
      throw new Error('Invalid hex');
    }

    return new BC(Buffer.from(hex, 'hex'));
  }
  /**
     * Creates a new BC instance from the given string.
     *
     * @param {string} str
     * @returns {BC}
     */


  static fromString(str) {
    if (str instanceof BC) {
      return str;
    } // TODO: UTF8?


    return new BC(Buffer.from(str, 'utf8'));
  }
  /**
     * Gets a new BC from an integer.
     *
     * @param {Number} int
     * @param {Number} nBytes
     * @returns {BC}
     */


  static fromInt(int, nBytes = null) {
    let hex = parseInt(int, 10).toString(16);
    const instance = BC.fromHex(hex, false);

    if (nBytes !== null && instance.length < nBytes) {
      return instance.prepend(BC.fromHex('00'.repeat(nBytes - instance.length)));
    }

    return instance;
  }
  /**
     * Gets the BC as a string.
     *
     * @returns {string}
     * // TODO: UTF8?
     */


  toString() {
    return this[P_BUFFER].toString('utf8');
  }
  /**
   * Gets the BC as hex.
   *
   * @returns {string}
   */


  toHex(lowerCase = false) {
    if (lowerCase) {
      return this[P_BUFFER].toString('hex').toLowerCase();
    }

    return this[P_BUFFER].toString('hex').toUpperCase();
  }
  /**
     * Gets the integer value of the BC.
     *
     * @return {Number}
     */


  toInt() {
    return parseInt(this.toHex(), 16);
  }
  /**
     * Gets the length of BC bytes.
     *
     * @returns {number}
     */


  get length() {
    return this[P_BUFFER].length;
  }
  /**
     * Gets the length of the parsed BC (the bytes).
     *
     * @returns {number}
     */


  get hexLength() {
    return this.length * 2;
  }
  /**
     * Gets a copy of the current buffer.
     *
     * @returns {Buffer}
     */


  get buffer() {
    return Buffer.from(this[P_BUFFER].toString('hex'), 'hex');
  }
  /**
     * Returns a sub-BC defined by the start and end position.
     *
     * @param {Number}start
     * @param {Number} end
     * @returns {BC}
     */


  slice(start, end = null) {
    if (end === null) {
      return new BC(this[P_BUFFER].slice(start));
    }

    return new BC(this[P_BUFFER].slice(start, end));
  }
  /**
     * Concatenates one or more BC instances and returns a new instance.
     *
     * @param {...BC} bytes
     * @returns {BC}
     */


  static concat(...bytes) {
    return BC.fromHex(bytes.reduce((prev, curr) => {
      if (prev instanceof Object) {
        return `${prev.toHex()}${curr.toHex()}`;
      }

      return `${prev}${curr.toHex()}`;
    }));
  }
  /**
   * Appends a single BC instance to the current BC and
   * returns a new instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bytes
   * @returns {BC}
   */


  append(bytes) {
    return BC.concat(this, BC.from(bytes));
  }
  /**
     * Appends a single BC instance to the current BC and
     * returns a new instance.
     *
     * @param {BC|Buffer|Uint8Array|String} bytes
     * @returns {BC}
     */


  prepend(bytes) {
    return BC.concat(BC.from(bytes), this);
  }
  /**
   * Gets a value indicating the current bc equals the given bc.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @returns {boolean}
   */


  equals(bc) {
    return Buffer.compare(BC.from(bc).buffer, this.buffer) === 0;
  }
  /**
   * Reads an 8 bit integer value from the bc from the given offset.
   *
   * @param {Number} offset
   * @param {Boolean} unsigned
   * @returns {Number}
   */


  readInt8(offset, unsigned = true) {
    return this[P_BUFFER][unsigned ? 'readUInt8' : 'readInt8'](offset);
  }
  /**
   * Reads a 16 bit integer value from the bc from the given offset.
   *
   * @param {Number} offset
   * @param {Boolean} unsigned
   * @param {String} endian
   * @returns {Number}
   */


  readInt16(offset, unsigned = true, endian = Endian.detect()) {
    const method = `read${unsigned ? 'U' : ''}Int16${endian}`;
    return this[P_BUFFER][method](offset);
  }
  /**
   * Reads a 32 bit integer value from the bc from the given offset.
   *
   * @param {Number} offset
   * @param {Boolean} unsigned
   * @param {String} endian
   * @returns {Number}
   */


  readInt32(offset, unsigned = true, endian = Endian.detect()) {
    const method = `read${unsigned ? 'U' : ''}Int32${endian}`;
    return this[P_BUFFER][method](offset);
  }
  /**
   * Creates an 8 bit integer BC.
   *
   * @param {Number} value
   * @param {Boolean} unsigned
   * @returns {BC}
   */


  static fromInt8(value, unsigned = true) {
    const method = `write${unsigned ? 'U' : ''}Int8`;
    const buf = Buffer.allocUnsafe(1);
    buf[method](value);
    return new BC(buf);
  }
  /**
   * Creates a 16 bit integer BC.
   *
   * @param {Number} value
   * @param {Boolean} unsigned
   * @param {String} endian
   * @returns {BC}
   */


  static fromInt16(value, unsigned = true, endian = Endian.detect()) {
    const method = `write${unsigned ? 'U' : ''}Int16${endian}`;
    const buf = Buffer.allocUnsafe(2);
    buf[method](value);
    return new BC(buf);
  }
  /**
   * Creates a 32 bit integer BC.
   *
   * @param {Number} value
   * @param {Boolean} unsigned
   * @param {String} endian
   * @returns {BC}
   */


  static fromInt32(value, unsigned = true, endian = Endian.detect()) {
    const method = `write${unsigned ? 'U' : ''}Int32${endian}`;
    const buf = Buffer.allocUnsafe(4);
    buf[method](value);
    return new BC(buf);
  }
  /*
   * Small helper to split a byte collection.
   *
   * @param {Number} size
   * @return {BC[]}
   */


  split(size) {
    let pos = 0;
    let splitted = [];

    for (; pos < this.length; pos += size) {
      splitted.push(this.slice(pos, pos + size));
    }

    return splitted;
  }

}

module.exports = BC;

/***/ }),

/***/ "./src/Base58.js":
/*!***********************!*\
  !*** ./src/Base58.js ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


const bs58 = __webpack_require__(/*! bs58 */ "../../node_modules/bs58/index.js");

const BC = __webpack_require__(/*! ./BC */ "./src/BC.js");
/**
 * Contains methods to convert stuff to various formats.
 */


class Base58 {
  /**
     * Gets the base58 representation of the given buffer.
     *
     * @param {BC|Buffer|Uint8Array|String} data
     * @returns {String}
     */
  static encode(data) {
    return bs58.encode(BC.from(data).buffer);
  }
  /**
   * Decodes a Base58 encoded string.
   *
   * @param {String} str
   * @returns {BC}
   */


  static decode(str) {
    return new BC(bs58.decode(str));
  }

}

module.exports = Base58;

/***/ }),

/***/ "./src/Coding/AbstractType.js":
/*!************************************!*\
  !*** ./src/Coding/AbstractType.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const P_ID = Symbol('id');
const P_FIXED_VALUE = Symbol('fixed_value');
const P_HAS_FIXED_VALUE = Symbol('has_fixed_value');
const P_DEFAULT_VALUE = Symbol('default_value');
const P_DEFAULT_VALUE_CALLBACK = Symbol('default_value_callback');
const P_HAS_DEFAULT_VALUE = Symbol('has_default_value');
const P_DESCRIPTION = Symbol('description');
const P_TARGET_FIELD_NAME = Symbol('target_field_name');
const P_HAS_TARGET_FIELD_NAME = Symbol('has_target_field_name');
const P_VALUE_DETERMINED = Symbol('value_determined');
/**
 * Abstract field type to encode and decode values. Abstracts encodeToBytes and decodeFromBytes as
 * basic implementations but in fact it can be anything.
 */

class AbstractType {
  /**
   * Constructor.
   *
   * @param {string|null} id
   */
  constructor(id = null) {
    this[P_ID] = id;
    this[P_HAS_FIXED_VALUE] = false;
    this[P_HAS_TARGET_FIELD_NAME] = false;
    this[P_HAS_DEFAULT_VALUE] = false;
    this[P_VALUE_DETERMINED] = false;
  }
  /**
   * Gets the field ident.
   *
   * @returns {String}
   */


  get id() {
    return this[P_ID];
  }
  /**
   * Gets a value indicating whether the field type has a fixed value.
   *
   * @returns {Boolean}
   */


  get hasFixedValue() {
    return this[P_HAS_FIXED_VALUE];
  }
  /**
   * Gets the fixed value.
   *
   * @returns {*}
   */


  get fixedValue() {
    return this[P_FIXED_VALUE];
  }
  /**
   * Gets a value indicating whether the field has a different target field name.
   *
   * @returns {Boolean}
   */


  get hasTargetFieldName() {
    return this[P_HAS_TARGET_FIELD_NAME];
  }
  /**
   * Gets the target field name.
   *
   * @returns {string}
   */


  get targetFieldName() {
    return this[P_TARGET_FIELD_NAME];
  }
  /**
   * Gets a value indicating whether there is a default value.
   *
   * @return {Boolean}
   */


  get hasDefaultValue() {
    return this[P_HAS_DEFAULT_VALUE];
  }
  /**
   * Gets the callable to evaluate the default value.
   *
   * @return {Function}
   */


  get defaultValueCallable() {
    return this[P_DEFAULT_VALUE_CALLBACK];
  }
  /**
   * Gets the default value.
   *
   * @return {*}
   */


  get defaultValue() {
    return this[P_DEFAULT_VALUE];
  }
  /**
   * Gets the encoded size of the type.
   *
   * @return {Number}
   */


  get encodedSize() {
    throw new Error('Encoded size getter not implemented');
  }
  /**
   * Decodes a value using the rules defined in the method from the given bytes.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {*}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    throw new Error('Missing implementation for decodeFromBytes.');
  }
  /**
   * Returns the encoded bytes for the given value.
   *
   * @param {*} value
   * @return {*}
   */


  encodeToBytes(value) {
    throw new Error('Missing implementation for encodeToBytes.');
  }
  /**
   * Sets a fixed value.
   *
   * @param {*} value
   * @returns {AbstractType}
   */


  withFixedValue(value) {
    this[P_FIXED_VALUE] = value;
    this[P_HAS_FIXED_VALUE] = true;
    return this;
  }
  /**
   * Sets the default value that is evaluated with the callable.
   *
   * @param {*} defaultValue
   * @param {Function} callable
   * @return {AbstractType}
   */


  withDefaultValue(defaultValue, callable) {
    this[P_DEFAULT_VALUE] = defaultValue;
    this[P_DEFAULT_VALUE_CALLBACK] = callable;
    this[P_HAS_DEFAULT_VALUE] = true;
    return this;
  }
  /**
   * Sets a fixed value.
   *
   * @param {string} targetFieldName
   * @returns {AbstractType}
   */


  withTargetFieldName(targetFieldName) {
    this[P_TARGET_FIELD_NAME] = targetFieldName;
    this[P_HAS_TARGET_FIELD_NAME] = true;
    return this;
  }
  /**
   * Sets the description and returns the type or gets the description itself.
   *
   * @param {String} description
   * @returns {AbstractType|String}
   */


  description(description = null) {
    if (description === null) {
      return this[P_DESCRIPTION];
    }

    if (this[P_DESCRIPTION] === undefined) {
      this[P_DESCRIPTION] = [];
    }

    this[P_DESCRIPTION].push(description);
    return this;
  }
  /**
   * Gets a value indicating whether the type can be decoded. It is
   * not possible in some circumstances.
   *
   * @return {boolean}
   */


  get canDecode() {
    return true;
  }
  /**
   * Determines the value to be encoded in case there are defaults.
   *
   * @param {*} value
   * @return {*}
   */


  determineValue(value) {
    if (this[P_VALUE_DETERMINED] === true) {
      return value;
    }

    this[P_VALUE_DETERMINED] = true;

    if (this[P_HAS_DEFAULT_VALUE] === true && this[P_DEFAULT_VALUE_CALLBACK](value) === true) {
      return this[P_DEFAULT_VALUE];
    }

    if (this[P_HAS_FIXED_VALUE] === true) {
      return this[P_FIXED_VALUE];
    }

    return value;
  }

  throwEncodeValueTypeError(value, expectedType) {
    throw new Error(`Invalid value for ${this.constructor.name}.encodeToBytes(), ` + `expected ${expectedType} - id: ${this.id}, given value: ${value}`);
  }

}

module.exports = AbstractType;

/***/ }),

/***/ "./src/Coding/CompositeType.js":
/*!*************************************!*\
  !*** ./src/Coding/CompositeType.js ***!
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
const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const AbstractType = __webpack_require__(/*! ./AbstractType */ "./src/Coding/AbstractType.js");

const P_SUBTYPES = Symbol('subtypes');
const P_SIZE_ENCODED = Symbol('size_encoded');
const P_FLATTEN = Symbol('flatten');
/**
 * A Type that itself is made up of multiple other (sub-)types.
 */

class CompositeType extends AbstractType {
  /**
   * Constructor
   */
  constructor(id, flatten = false, canDecode = true) {
    super(id || 'composite_type');
    super.description('A type that itself is made up of multiple other types.');
    this[P_SUBTYPES] = [];
    this[P_FLATTEN] = flatten;
  }
  /**
   * Gets all subtypes.
   *
   * @returns {Array}
   */


  get subTypes() {
    return this[P_SUBTYPES];
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }
  /**
   * Adds a new field (type) definition.
   *
   * @param {AbstractType} field
   */


  addSubType(field) {
    this[P_SUBTYPES].push(field);
    return this;
  }
  /**
   * Decodes the given bytes into an object.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {*}
   */


  decodeFromBytes(bc, options = {
    toArray: false
  }, all = null) {
    if (this.canDecode === false) {
      throw new Error('This type cannot be decoded.');
    }

    let obj = {};
    let offset = 0;
    bc = BC.from(bc);
    this.subTypes.forEach(subType => {
      const fieldName = subType.hasTargetFieldName ? subType.targetFieldName : subType.id;
      const decoded = subType.decodeFromBytes(bc.slice(offset), options, obj);

      if (subType.constructor.name === 'Decissive' && subType.flatten) {
        obj = Object.assign(obj, decoded);
      } else {
        obj[fieldName] = decoded;
      }

      offset += subType.encodedSize;
    });
    this[P_SIZE_ENCODED] = offset;
    return options.toArray ? Object.values(obj) : obj;
  }
  /**
   * Encodes the given object to a list of bytes.
   *
   * @param {Object|Array|*} objOrArray
   * @returns {BC}
   */


  encodeToBytes(objOrArray) {
    objOrArray = this.determineValue(objOrArray);
    let bc = BC.empty();
    this.subTypes.forEach((subType, idx) => {
      let subTypeValue; // decissive can return null for a subtype

      if (subType === null) {
        return;
      }

      if (subType.constructor.name === 'Decissive' && subType.flatten) {
        subTypeValue = objOrArray;
      } else {
        subTypeValue = Array.isArray(objOrArray) ? objOrArray[idx] : objOrArray[subType.hasTargetFieldName ? subType.targetFieldName : subType.id];
      } // we will use the first available
      // decissive can return null to skip a value


      bc = bc.append(subType.encodeToBytes(subTypeValue, objOrArray));
    });
    this[P_SIZE_ENCODED] = bc.length;
    return bc;
  }
  /**
   * Gets a value indicating whether the value should be flattened.
   *
   * @return {bool}
   */


  get flatten() {
    return this[P_FLATTEN];
  }

}

module.exports = CompositeType;

/***/ }),

/***/ "./src/Coding/Core/AbstractInt.js":
/*!****************************************!*\
  !*** ./src/Coding/Core/AbstractInt.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const AbstractType = __webpack_require__(/*! ./../AbstractType */ "./src/Coding/AbstractType.js");

const P_ENDIAN = Symbol('endian');
const P_UNSIGNED = Symbol('unsigned');
/**
 * Abstract integer field type.
 */

class AbstractInt extends AbstractType {
  /**
   * Constructor
   *
   * @param {String} id
   * @param {Boolean} unsigned
   * @param {String} endian
   */
  constructor(id, unsigned, endian) {
    super(id);
    this[P_UNSIGNED] = unsigned;
    this[P_ENDIAN] = endian;
  }
  /**
   * Gets the endianness.
   *
   * @returns {String}
   */


  get endian() {
    return this[P_ENDIAN];
  }
  /**
   * Gets a value indicating whether the value is an unsigned integer.
   *
   * @returns {Boolean}
   */


  get unsigned() {
    return this[P_UNSIGNED];
  }

}

module.exports = AbstractInt;

/***/ }),

/***/ "./src/Coding/Core/BytesFixedLength.js":
/*!*********************************************!*\
  !*** ./src/Coding/Core/BytesFixedLength.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const AbstractType = __webpack_require__(/*! ./../AbstractType */ "./src/Coding/AbstractType.js");

const BC = __webpack_require__(/*! ./../../BC */ "./src/BC.js");

const P_SIZE = Symbol('size');
/**
 * A field type to encode and decode bytes with a fixed length.
 */

class BytesFixedLength extends AbstractType {
  /**
   * Constructor
   *
   * @param {String} id
   * @param {Number} length
   */
  constructor(id, length) {
    super(id || 'bytes_fixed_length_' + length);
    this.description('Bytes with a fixed length of ' + length);
    this[P_SIZE] = length;
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return this[P_SIZE];
  }
  /**
   * Returns the values of the given bc in the configured length.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {BC}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return BC.from(bc).slice(0, this[P_SIZE]);
  }
  /**
   * Encodes the given value to a collection of bytes.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @returns {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    value = BC.from(value);
    return value.slice(0, this[P_SIZE]);
  }

}

module.exports = BytesFixedLength;

/***/ }),

/***/ "./src/Coding/Core/BytesWithLength.js":
/*!********************************************!*\
  !*** ./src/Coding/Core/BytesWithLength.js ***!
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
const AbstractType = __webpack_require__(/*! ./../AbstractType */ "./src/Coding/AbstractType.js");

const Int8 = __webpack_require__(/*! ./Int8 */ "./src/Coding/Core/Int8.js");

const Int16 = __webpack_require__(/*! ./Int16 */ "./src/Coding/Core/Int16.js");

const Int32 = __webpack_require__(/*! ./Int32 */ "./src/Coding/Core/Int32.js");

const BytesWithoutLength = __webpack_require__(/*! ./BytesWithoutLength */ "./src/Coding/Core/BytesWithoutLength.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "./src/Endian.js");

const BC = __webpack_require__(/*! ./../../BC */ "./src/BC.js");

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_LENGTH_FIELD = Symbol('length_field');
const P_BYTES_FIELD = Symbol('bytes_field');
const P_HAS_LEADING_ZB = Symbol('has_leading_zerobyte');
/**
 * A field type to write dynamic content in form of bytes (prepends the length).
 */

class BytesWithLength extends AbstractType {
  /**
   * Constructor
   *
   * @param {string} id
   * @param {Number} byteSize
   */
  constructor(id, byteSize = 1, lengthId = 'length', lengthDesc = null, endian = Endian.LITTLE_ENDIAN, hasLeadingZeroByte = false) {
    super(id || `bytes_with_length_${byteSize * 8}`);
    this.description('Bytes with variable size prepended');
    this[P_BYTES_FIELD] = new BytesWithoutLength('value');
    this[P_HAS_LEADING_ZB] = hasLeadingZeroByte;

    switch (byteSize) {
      case 1:
        this[P_LENGTH_FIELD] = new Int8(lengthId, true);
        break;

      case 2:
        this[P_LENGTH_FIELD] = new Int16(lengthId, true, endian);
        break;

      case 4:
        this[P_LENGTH_FIELD] = new Int32(lengthId, true, endian);
        break;

      default:
        throw new Error('ByteSize must be either 1, 2 or 4');
    }

    if (lengthDesc !== null) {
      this[P_LENGTH_FIELD].description(lengthDesc);
    }
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }
  /**
   * Decodes the string value from the given bytes
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {BC}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    this[P_SIZE_ENCODED] = this[P_LENGTH_FIELD].encodedSize + this[P_LENGTH_FIELD].decodeFromBytes(BC.from(bc)) + +this[P_HAS_LEADING_ZB];
    return this[P_BYTES_FIELD].decodeFromBytes(bc.slice(this[P_LENGTH_FIELD].encodedSize + +this[P_HAS_LEADING_ZB], this[P_SIZE_ENCODED]));
  }
  /**
   * Encodes the given value.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @returns {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    value = BC.from(value);
    this[P_SIZE_ENCODED] = value.length + this[P_LENGTH_FIELD].encodedSize;
    let bc = this[P_LENGTH_FIELD].encodeToBytes(this[P_SIZE_ENCODED] - this[P_LENGTH_FIELD].encodedSize);

    if (this[P_HAS_LEADING_ZB]) {
      bc = bc.append(BC.from('00'));
    }

    return bc.append(this[P_BYTES_FIELD].encodeToBytes(value));
  }

  get lengthField() {
    return this[P_LENGTH_FIELD];
  }

}

module.exports = BytesWithLength;

/***/ }),

/***/ "./src/Coding/Core/BytesWithoutLength.js":
/*!***********************************************!*\
  !*** ./src/Coding/Core/BytesWithoutLength.js ***!
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
const AbstractType = __webpack_require__(/*! ./../AbstractType */ "./src/Coding/AbstractType.js");

const BC = __webpack_require__(/*! ./../../BC */ "./src/BC.js");

const P_SIZE_ENCODED = Symbol('size_encoded');
/**
 * A field type to write bytes without prepending the length. This cannot be decoded in some circumstances.
 */

class BytesWithoutLength extends AbstractType {
  /**
   * Constructor
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'bytes_without_length');
    this.description('Bytes without length prepended.');
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }
  /**
   * In fact this does nothing other than updating the internal size.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {BC}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    this[P_SIZE_ENCODED] = bc.length;
    return bc;
  }
  /**
   * Encodes the given value to a collection of bytes.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @returns {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    let encoded = BC.from(value);
    this[P_SIZE_ENCODED] = encoded.length;
    return encoded;
  }

}

module.exports = BytesWithoutLength;

/***/ }),

/***/ "./src/Coding/Core/Int16.js":
/*!**********************************!*\
  !*** ./src/Coding/Core/Int16.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const AbstractInt = __webpack_require__(/*! ./AbstractInt */ "./src/Coding/Core/AbstractInt.js");

const BC = __webpack_require__(/*! ./../../BC */ "./src/BC.js");

const Util = __webpack_require__(/*! ./../../Util */ "./src/Util.js");
/**
 * Field type for a 16bit int value.
 */


class Int16 extends AbstractInt {
  /**
   * Constructor.
   *
   * @param {String} id
   * @param {Boolean} unsigned
   * @param {String} endian
   */
  constructor(id, unsigned, endian) {
    super(id || 'int16', unsigned, endian);
    this.description('2byte 16bit int value');
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return 2;
  }
  /**
   * Decodes the int16 value from the given bytes.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {Number|*}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return BC.from(bc).readInt16(0, this.unsigned, this.endian);
  }
  /**
   * Encodes the given Int16 value to a byte sequence.
   *
   * @param {Number} value
   * @returns {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);

    if (!Util.isNumber(value)) {
      this.throwEncodeValueTypeError(value, 'Number');
    }

    return BC.fromInt16(value, this.unsigned, this.endian);
  }

}

module.exports = Int16;

/***/ }),

/***/ "./src/Coding/Core/Int32.js":
/*!**********************************!*\
  !*** ./src/Coding/Core/Int32.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const AbstractInt = __webpack_require__(/*! ./AbstractInt */ "./src/Coding/Core/AbstractInt.js");

const BC = __webpack_require__(/*! ./../../BC */ "./src/BC.js");

const Util = __webpack_require__(/*! ./../../Util */ "./src/Util.js");
/**
 * Field type for 32bit int values.
 */


class Int32 extends AbstractInt {
  /**
   * Constructor
   *
   * @param {String} id
   * @param {Boolean} unsigned
   * @param {String} endian
   */
  constructor(id, unsigned, endian) {
    super(id || 'int32', unsigned, endian);
    this.description('4byte 32bit int value');
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return 4;
  }
  /**
   * Reads the given int32 value.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {Number|*}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return BC.from(bc).readInt32(0, this.unsigned, this.endian);
  }
  /**
   * Appends the given Int32 value.
   *
   * @param {Number} value
   * @returns {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);

    if (!Util.isNumber(value)) {
      this.throwEncodeValueTypeError(value, 'Number');
    }

    return BC.fromInt32(value, this.unsigned, this.endian);
  }

}

module.exports = Int32;

/***/ }),

/***/ "./src/Coding/Core/Int64.js":
/*!**********************************!*\
  !*** ./src/Coding/Core/Int64.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const AbstractInt = __webpack_require__(/*! ./AbstractInt */ "./src/Coding/Core/AbstractInt.js");

const BC = __webpack_require__(/*! ./../../BC */ "./src/BC.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "./src/Endian.js");

const BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");

function validate64Bit(isUnsigned, value) {
  if (isUnsigned) {
    if (value.isNeg()) {
      throw new Error('64bit value is negative. Only signed allowed.');
    } else if (value.gt(new BN('18446744073709551615'))) {
      throw new Error('Invalid unsigned 64 bit value.');
    }
  } else if (!isUnsigned) {
    if (value.gt(new BN('9223372036854775807')) || value.lt(new BN('-9223372036854775808'))) {
      throw new Error('Invalid signed 64 bit value.');
    }
  }

  return value;
}
/**
 * Field type for 64bit int values using BN.js.
 */


class Int64 extends AbstractInt {
  /**
   * Constructor
   *
   * @param {String} id
   * @param {Boolean} unsigned
   * @param {String} endian
   */
  constructor(id, unsigned = true, endian = Endian.LITTLE_ENDIAN) {
    super(id || 'int64', unsigned, endian);
    this.description('8byte 64bit int value');
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return 8;
  }
  /**
   * Reads the pascal currency value from the given BC.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {BN}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    let value = new BN(BC.from(bc).slice(0, this.encodedSize).buffer, 10, this.endian.toLowerCase());

    if (!this.unsigned) {
      value = value.fromTwos(64);
    }

    return validate64Bit(this.unsigned, value);
  }
  /**
   * Appends the given currency value to the given BC.
   *
   * @param {BN} value
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    value = new BN(value);
    value = validate64Bit(this.unsigned, value);

    if (!this.unsigned) {
      value = value.toTwos(64);
    }

    return BC.from(value.toBuffer(this.endian.toLowerCase(), this.encodedSize));
  }

}

module.exports = Int64;

/***/ }),

/***/ "./src/Coding/Core/Int8.js":
/*!*********************************!*\
  !*** ./src/Coding/Core/Int8.js ***!
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
const AbstractInt = __webpack_require__(/*! ./AbstractInt */ "./src/Coding/Core/AbstractInt.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "./src/Endian.js");

const BC = __webpack_require__(/*! ./../../BC */ "./src/BC.js");

const Util = __webpack_require__(/*! ./../../Util */ "./src/Util.js");
/**
 * Fields type for an 8Bit int value.
 */


class Int8 extends AbstractInt {
  /**
   * Constructor.
   *
   * @param {String} id
   * @param {Boolean} unsigned
   */
  constructor(id, unsigned) {
    super(id || 'int8', unsigned, Endian.LITTLE_ENDIAN);
    this.description('1byte 8bit int value');
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return 1;
  }
  /**
   * Reads the int8 value from the given bytes.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {Number|*}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return BC.from(bc).readInt8(0, this.unsigned);
  }
  /**
   * Encodes the given int8 value.
   *
   * @param {Number} value
   * @returns {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);

    if (!Util.isNumber(value)) {
      this.throwEncodeValueTypeError(value, 'Number');
    }

    return BC.fromInt8(value, this.unsigned);
  }

}

module.exports = Int8;

/***/ }),

/***/ "./src/Coding/Core/StringWithLength.js":
/*!*********************************************!*\
  !*** ./src/Coding/Core/StringWithLength.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BC = __webpack_require__(/*! ./../../BC */ "./src/BC.js");

const AbstractType = __webpack_require__(/*! ./../AbstractType */ "./src/Coding/AbstractType.js");

const Int8 = __webpack_require__(/*! ./Int8 */ "./src/Coding/Core/Int8.js");

const Int16 = __webpack_require__(/*! ./Int16 */ "./src/Coding/Core/Int16.js");

const Int32 = __webpack_require__(/*! ./Int32 */ "./src/Coding/Core/Int32.js");

const StringWithoutLength = __webpack_require__(/*! ./StringWithoutLength */ "./src/Coding/Core/StringWithoutLength.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "./src/Endian.js");

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_HAS_LEADING_ZB = Symbol('has_leading_zerobyte');
const P_LENGTH_FIELD = Symbol('length_field');
const P_STRING_FIELD = Symbol('bytes_field');
/**
 * A field type to write dynamic strings (prepends the length).
 */

class StringWithLength extends AbstractType {
  constructor(id, byteSize = 1, lengthId = 'length', lengthDesc = null, endian = Endian.LITTLE_ENDIAN, hasLeadingZeroByte = false) {
    super(id || `string_size${byteSize * 8}`);
    this.description('String with size prepended');
    this[P_STRING_FIELD] = new StringWithoutLength('value');
    this[P_HAS_LEADING_ZB] = hasLeadingZeroByte;

    switch (byteSize) {
      case 1:
        this[P_LENGTH_FIELD] = new Int8(lengthId, true);
        break;

      case 2:
        this[P_LENGTH_FIELD] = new Int16(lengthId, true, endian);
        break;

      case 4:
        this[P_LENGTH_FIELD] = new Int32(lengthId, true, endian);
        break;

      default:
        throw new Error('ByteSize must be either 1, 2 or 4');
    }

    if (lengthDesc !== null) {
      this[P_LENGTH_FIELD].description(lengthDesc);
    }
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }
  /**
   * Decodes the string value from the given bytes
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {String}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    this[P_SIZE_ENCODED] = this[P_LENGTH_FIELD].encodedSize + this[P_LENGTH_FIELD].decodeFromBytes(BC.from(bc)) + +this[P_HAS_LEADING_ZB];
    return this[P_STRING_FIELD].decodeFromBytes(bc.slice(this[P_LENGTH_FIELD].encodedSize + +this[P_HAS_LEADING_ZB], this[P_SIZE_ENCODED]));
  }
  /**
   * Encodes the given value.
   *
   * @param {String} value
   * @returns {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    this[P_SIZE_ENCODED] = value.length;
    let bc = this[P_LENGTH_FIELD].encodeToBytes(this[P_SIZE_ENCODED]);
    this[P_SIZE_ENCODED] += this.lengthField.encodedSize;

    if (this[P_HAS_LEADING_ZB]) {
      bc = bc.append('00');
    }

    return bc.append(this[P_STRING_FIELD].encodeToBytes(value));
  }

  get lengthField() {
    return this[P_LENGTH_FIELD];
  }

}

module.exports = StringWithLength;

/***/ }),

/***/ "./src/Coding/Core/StringWithoutLength.js":
/*!************************************************!*\
  !*** ./src/Coding/Core/StringWithoutLength.js ***!
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
const AbstractType = __webpack_require__(/*! ./../AbstractType */ "./src/Coding/AbstractType.js");

const BC = __webpack_require__(/*! ./../../BC */ "./src/BC.js");

const Util = __webpack_require__(/*! ./../../Util */ "./src/Util.js");

const P_SIZE_ENCODED = Symbol('size_encoded');
/**
 * A field type to write dynamic strings without prepending the length.
 */

class StringWithoutLength extends AbstractType {
  /**
   * Constructor
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'string_without_length');
    this.description('Single string value without length prepended.');
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }
  /**
   * Decodes the string value from the given bytes
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {String}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return BC.from(bc).toString();
  }
  /**
   * Encodes the given value.
   *
   * @param {String} value
   * @returns {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);

    if (!Util.isString(value)) {
      this.throwEncodeValueTypeError(value, 'String');
    }

    let encoded = BC.from(value, 'string');
    this[P_SIZE_ENCODED] = encoded.length;
    return encoded;
  }

}

module.exports = StringWithoutLength;

/***/ }),

/***/ "./src/Coding/Decissive.js":
/*!*********************************!*\
  !*** ./src/Coding/Decissive.js ***!
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
const CompositeType = __webpack_require__(/*! ./CompositeType */ "./src/Coding/CompositeType.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_SUBTYPE_RESOLVER = Symbol('subtype_resolver');
const P_MARKER_FIELD = Symbol('marker_field');
const P_FLATTEN = Symbol('flatten');
/**
 * A Type that itself is made up of multiple other types. The types are selected dynamically
 * depending on the given resolver.
 */

class Decissive extends CompositeType {
  /**
   * Constructor
   */
  constructor(id, markerField, subTypeResolver, flatten = false) {
    super(id || 'decissive');
    super.description('A type that itself has many sub types but only some are triggere based on a marker.');
    this[P_SUBTYPE_RESOLVER] = subTypeResolver;
    this[P_MARKER_FIELD] = markerField;
    this[P_FLATTEN] = flatten;
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }
  /**
   * Decodes the given bytes into an object.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {Object}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    let subType = this[P_SUBTYPE_RESOLVER](all[this[P_MARKER_FIELD]]);
    this[P_SIZE_ENCODED] = subType.encodedSize;
    return subType.decodeFromBytes(bc, options, all);
  }
  /**
   * Encodes the given object to a list of bytes.
   *
   * @param {Object|Array} objOrArray
   * @returns {BC}
   */


  encodeToBytes(objOrArray, all) {
    objOrArray = this.determineValue(objOrArray);
    let subType = this[P_SUBTYPE_RESOLVER](all[this[P_MARKER_FIELD]]);

    if (subType === null) {
      return BC.empty();
    }

    let bc = subType.encodeToBytes(objOrArray);
    this[P_SIZE_ENCODED] = bc.length;
    return bc;
  }
  /**
   * Gets a value indicating whether the value should be flattened.
   *
   * @return {bool}
   */


  get flatten() {
    return this[P_FLATTEN];
  }

}

module.exports = Decissive;

/***/ }),

/***/ "./src/Coding/Pascal/AccountName.js":
/*!******************************************!*\
  !*** ./src/Coding/Pascal/AccountName.js ***!
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
const AccountNameType = __webpack_require__(/*! ./../../Types/AccountName */ "./src/Types/AccountName.js");

const StringWithLength = __webpack_require__(/*! ../Core/StringWithLength */ "./src/Coding/Core/StringWithLength.js");
/**
 * A pascal related type that can de/encode an account name.
 */


class AccountName extends StringWithLength {
  /**
   * Constructor
   *
   * @param {String} id
   */
  constructor(id = null, byteSize = 2) {
    super(id || `account_name_${byteSize * 8}`, byteSize);
    this.description('An account name');
  }
  /**
   * Reads a value and returns a new PascalCoin AccountNumber instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {AccountNameType}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return new AccountNameType(super.decodeFromBytes(bc));
  }
  /**
   *
   * Appends the given pascalcoin account number to the BC.
   *
   * @param {AccountNameType} value
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(new AccountNameType(value).toString());
  }

}

module.exports = AccountName;

/***/ }),

/***/ "./src/Coding/Pascal/AccountNumber.js":
/*!********************************************!*\
  !*** ./src/Coding/Pascal/AccountNumber.js ***!
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
const AccountNumberType = __webpack_require__(/*! ./../../Types/AccountNumber */ "./src/Types/AccountNumber.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "./src/Endian.js");

const Int32 = __webpack_require__(/*! ./../Core/Int32 */ "./src/Coding/Core/Int32.js");
/**
 * A special Int32 type that can handle account number.
 */


class AccountNumber extends Int32 {
  /**
   * Constructor
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'account', true, Endian.LITTLE_ENDIAN);
    this.description('An account number');
  }
  /**
   * Reads a value and returns a new PascalCoin AccountNumber instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {AccountNumberType}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return new AccountNumberType(super.decodeFromBytes(bc));
  }
  /**
   *
   * Appends the given pascalcoin account number to the BC.
   *
   * @param {AccountNumberType} value
   * @return {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(new AccountNumberType(value).account);
  }

}

module.exports = AccountNumber;

/***/ }),

/***/ "./src/Coding/Pascal/Currency.js":
/*!***************************************!*\
  !*** ./src/Coding/Pascal/Currency.js ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Int64 = __webpack_require__(/*! ./../Core/Int64 */ "./src/Coding/Core/Int64.js");

const CurrencyType = __webpack_require__(/*! ./../../Types/Currency */ "./src/Types/Currency.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "./src/Endian.js");
/**
 * A special Int64 type that can handle pascalcoin currencies.
 */


class Currency extends Int64 {
  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null, unsigned = true, endian = Endian.LITTLE_ENDIAN) {
    super(id || 'currency', unsigned, endian);
    this.description('A type for currency values.');
  }
  /**
   * Reads the pascal currency value from the given BC.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {CurrencyType}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return CurrencyType.fromMolina(super.decodeFromBytes(bc));
  }
  /**
   * Appends the given currency value to the given BC.
   *
   * @param {CurrencyType} value
   * @return {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(new CurrencyType(value).bn);
  }

}

module.exports = Currency;

/***/ }),

/***/ "./src/Coding/Pascal/GUID.js":
/*!***********************************!*\
  !*** ./src/Coding/Pascal/GUID.js ***!
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
const GUIDType = __webpack_require__(/*! ./../../Types/GUID */ "./src/Types/GUID.js");

const BytesFixedLength = __webpack_require__(/*! ../Core/BytesFixedLength */ "./src/Coding/Core/BytesFixedLength.js");
/**
 * A pascal related type that can de/encode an account name.
 */


class GUID extends BytesFixedLength {
  /**
   * Constructor
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'guid', 16);
    this.description('A GUID');
  }
  /**
   * Reads a value and returns a new PascalCoin AccountNumber instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {AccountNameType}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return new GUIDType(super.decodeFromBytes(bc));
  }
  /**
   *
   * Appends the given GUID.
   *
   * @param {GUIDType} value
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(new GUIDType(value).toBC());
  }

}

module.exports = GUID;

/***/ }),

/***/ "./src/Coding/Pascal/Keys/Curve.js":
/*!*****************************************!*\
  !*** ./src/Coding/Pascal/Keys/Curve.js ***!
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
const CurveType = __webpack_require__(/*! ./../../../Types/Keys/Curve */ "./src/Types/Keys/Curve.js");

const Endian = __webpack_require__(/*! ./../../../Endian */ "./src/Endian.js");

const Int16 = __webpack_require__(/*! ./../../Core/Int16 */ "./src/Coding/Core/Int16.js");
/**
 * A special pascal type that can en/decode a curve id.
 */


class Curve extends Int16 {
  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'curve', true, Endian.LITTLE_ENDIAN);
    this.description('Key curve id');
  }
  /**
   * Reads the pascal currency value from the given BC.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {CurveType}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return new CurveType(super.decodeFromBytes(bc));
  }
  /**
   * Appends the given currency value to the given BC.
   *
   * @param {CurveType} value
   * @return {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(new CurveType(value).id);
  }

}

module.exports = Curve;

/***/ }),

/***/ "./src/Coding/Pascal/Keys/PrivateKey.js":
/*!**********************************************!*\
  !*** ./src/Coding/Pascal/Keys/PrivateKey.js ***!
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
const Curve = __webpack_require__(/*! ./Curve */ "./src/Coding/Pascal/Keys/Curve.js");

const BytesWithLength = __webpack_require__(/*! ../../Core/BytesWithLength */ "./src/Coding/Core/BytesWithLength.js");

const CompositeType = __webpack_require__(/*! ../../CompositeType */ "./src/Coding/CompositeType.js");

const PrivateKeyType = __webpack_require__(/*! ./../../../../src/Types/Keys/PrivateKey */ "./src/Types/Keys/PrivateKey.js");
/**
 * A coder for a private key.
 */


class PrivateKey extends CompositeType {
  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'private_key');
    this.addSubType(new Curve('curve'));
    this.addSubType(new BytesWithLength('key', 2).description('The private key value.'));
  }
  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {PrivateKeyType}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    return new PrivateKeyType(decoded.key, decoded.curve);
  }
  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {PrivateKeyType} value
   * @returns {PrivateKeyType}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(value);
  }

}

module.exports = PrivateKey;

/***/ }),

/***/ "./src/Coding/Pascal/Keys/PublicKey.js":
/*!*********************************************!*\
  !*** ./src/Coding/Pascal/Keys/PublicKey.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Curve = __webpack_require__(/*! ./Curve */ "./src/Coding/Pascal/Keys/Curve.js");

const BytesWithLength = __webpack_require__(/*! ../../Core/BytesWithLength */ "./src/Coding/Core/BytesWithLength.js");

const BytesFixedLength = __webpack_require__(/*! ../../Core/BytesFixedLength */ "./src/Coding/Core/BytesFixedLength.js");

const BytesWithoutLength = __webpack_require__(/*! ../../Core/BytesWithoutLength */ "./src/Coding/Core/BytesWithoutLength.js");

const Decissive = __webpack_require__(/*! ../../Decissive */ "./src/Coding/Decissive.js");

const CompositeType = __webpack_require__(/*! ../../CompositeType */ "./src/Coding/CompositeType.js");

const BC = __webpack_require__(/*! ../../../BC */ "./src/BC.js");

const Sha = __webpack_require__(/*! ../../../Sha */ "./src/Sha.js");

const Base58 = __webpack_require__(/*! ../../../Base58 */ "./src/Base58.js");

const PublicKeyType = __webpack_require__(/*! ./../../../../src/Types/Keys/PublicKey */ "./src/Types/Keys/PublicKey.js");
/**
 * A Public Key value.
 */


class PublicKey extends CompositeType {
  /**
   * Constructor.
   *
   * @param {String} id
   * @param {Boolean} omitXYLenghts
   */
  constructor(id = null, omitXYLenghts = false) {
    super(id || 'public_key');
    this.addSubType(new Curve('curve')); // oh come on..

    if (omitXYLenghts) {
      this.addSubType(new Decissive('x', 'curve', curve => {
        return new BytesFixedLength('x', curve.xylPublicKey('x'));
      }));
      this.addSubType(new Decissive('y', 'curve', curve => {
        return new BytesFixedLength('y', curve.xylPublicKey('y'));
      }));
    } else {
      this.addSubType(new BytesWithLength('x', 2, 'x_length', 'Length of X value').description('The X value of the public key.'));
      this.addSubType(new BytesWithLength('y', 2, 'y_length', 'Length of Y value').description('The X value of the public key.'));
    }
  }
  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {PublicKeyType}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    return new PublicKeyType(decoded.x, decoded.y, decoded.curve);
  }
  /**
   * Gets the base58 representation of a public key.
   *
   * @returns {String}
   */


  encodeToBase58(publicKey) {
    const prefix = BC.fromHex('01');
    const encoded = this.encodeToBytes(publicKey);
    const aux = Sha.sha256(encoded);
    const suffix = aux.slice(0, 4);
    const raw = BC.concat(prefix, encoded, suffix);
    return Base58.encode(raw);
  }
  /**
   * Gets a public key instance from the given base58 string.
   *
   * @param {String} base58
   * @returns {PublicKey}
   */


  decodeFromBase58(base58) {
    const decoded = Base58.decode(base58);
    return this.decodeFromBytes(decoded.slice(1, -4));
  }

}

module.exports = PublicKey;

/***/ }),

/***/ "./src/Coding/Pascal/NOperation.js":
/*!*****************************************!*\
  !*** ./src/Coding/Pascal/NOperation.js ***!
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
const Endian = __webpack_require__(/*! ./../../Endian */ "./src/Endian.js");

const Int32 = __webpack_require__(/*! ./../Core/Int32 */ "./src/Coding/Core/Int32.js");
/**
 * Simple wrapper for an unsigned Int32 value (used for the n_operation value)
 */


class NOperation extends Int32 {
  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'nOperation', true, Endian.LITTLE_ENDIAN);
    this.description('Accounts n_operation value.');
  }

}

module.exports = NOperation;

/***/ }),

/***/ "./src/Coding/Pascal/OpType.js":
/*!*************************************!*\
  !*** ./src/Coding/Pascal/OpType.js ***!
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
const Endian = __webpack_require__(/*! ./../../Endian */ "./src/Endian.js");

const AbstractType = __webpack_require__(/*! ./../AbstractType */ "./src/Coding/AbstractType.js");

const Int8 = __webpack_require__(/*! ./../Core/Int8 */ "./src/Coding/Core/Int8.js");

const Int16 = __webpack_require__(/*! ./../Core/Int16 */ "./src/Coding/Core/Int16.js");

const Int32 = __webpack_require__(/*! ./../Core/Int32 */ "./src/Coding/Core/Int32.js");

const P_INT_TYPE = Symbol('int_type');
/**
 * A special Int32 type that can handle account number.
 */

class OpType extends AbstractType {
  /**
   * Constructor
   *
   * @param {Number} byteSize
   */
  constructor(id, byteSize) {
    super(id || `optype_int${byteSize * 8}`);

    switch (byteSize) {
      case 1:
        this[P_INT_TYPE] = new Int8('OpType[Int8]', true);
        break;

      case 2:
        this[P_INT_TYPE] = new Int16('OpType[Int16]', true, Endian.LITTLE_ENDIAN);
        break;

      case 4:
        this[P_INT_TYPE] = new Int32('OpType[Int32]', true, Endian.LITTLE_ENDIAN);
        break;

      default:
        throw Error('Invalid byte size.');
    }

    this.description(`Operation type in ${byteSize * 8} bits`);
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return this[P_INT_TYPE].encodedSize;
  }
  /**
   * Decodes and returns the optype.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {Number}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    return this[P_INT_TYPE].decodeFromBytes(bc);
  }
  /**
   * Encodes the given optype to bytes.
   *
   * @param {Number} value
   * @return {*}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    return this[P_INT_TYPE].encodeToBytes(value);
  }

  get intType() {
    return this[P_INT_TYPE];
  }

}

module.exports = OpType;

/***/ }),

/***/ "./src/Coding/Pascal/OperationHash.js":
/*!********************************************!*\
  !*** ./src/Coding/Pascal/OperationHash.js ***!
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
const Endian = __webpack_require__(/*! ./../../Endian */ "./src/Endian.js");

const CompositeType = __webpack_require__(/*! ./../CompositeType */ "./src/Coding/CompositeType.js");

const Int32 = __webpack_require__(/*! ./../Core/Int32 */ "./src/Coding/Core/Int32.js");

const AccountNumber = __webpack_require__(/*! ./AccountNumber */ "./src/Coding/Pascal/AccountNumber.js");

const BytesWithFixedLength = __webpack_require__(/*! ./../Core/BytesFixedLength */ "./src/Coding/Core/BytesFixedLength.js");

const NOperation = __webpack_require__(/*! ./NOperation */ "./src/Coding/Pascal/NOperation.js");

const OperationHashType = __webpack_require__(/*! ./../../Types/OperationHash */ "./src/Types/OperationHash.js");
/**
 * Simple wrapper for an unsigned Int32 value (used for the n_operation value)
 */


class OperationHash extends CompositeType {
  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'ophash');
    this.description('A pascalCoin operation hash');
    this.addSubType(new Int32('block', true, Endian.LITTLE_ENDIAN).description('The block the operation is in.'));
    this.addSubType(new AccountNumber('account').description('The account number that signed the operation.'));
    this.addSubType(new NOperation('nOperation', 4).description('The n_operation value of the account with the current operation.'));
    this.addSubType(new BytesWithFixedLength('md160', 20).description('The RIPEMD160 hash of the operation data.'));
  }
  /**
   * Reads a value and returns a new PascalCoin AccountNumber instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {OperationHash}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    return new OperationHashType(decoded.block, decoded.account, decoded.nOperation, decoded.md160);
  }
  /**
   * Appends the given pascalcoin account number to the BC.
   *
   * @param {OperationHash} value
   * @return {BC}
   */


  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(value);
  }

}

module.exports = OperationHash;

/***/ }),

/***/ "./src/Coding/Repeating.js":
/*!*********************************!*\
  !*** ./src/Coding/Repeating.js ***!
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
const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const AbstractType = __webpack_require__(/*! ./AbstractType */ "./src/Coding/AbstractType.js");

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_REPEAT_LIMIT = Symbol('repeat_limit');
const P_REPEAT_MARKER = Symbol('repeat_marker');
const P_TYPE = Symbol('type');
/**
 * A Type that itself is made up of multiple other types.
 */

class Repeating extends AbstractType {
  /**
   * Constructor
   */
  constructor(id, type, repeatLimit = -1, repeatMarker = null) {
    super(id || 'repeating');
    super.description('A type that itself has one repeating type that will ' + 'be written / read until the limit is reached or data is empty.');
    this[P_TYPE] = type;
    this[P_REPEAT_LIMIT] = repeatLimit;
    this[P_REPEAT_MARKER] = repeatMarker;
  }
  /**
   * @inheritDoc AbstractType#encodedSize
   */


  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }
  /**
   * Decodes the given bytes into an object.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @return {Object}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    let result = [];
    let offset = 0;
    bc = BC.from(bc);
    let limit = this[P_REPEAT_MARKER] !== null ? all[this[P_REPEAT_MARKER]] : this[P_REPEAT_LIMIT];
    let counter = limit;

    while (limit > -1 && counter > 0 || limit === -1 && bc.length > offset) {
      const decoded = this[P_TYPE].decodeFromBytes(bc.slice(offset));
      result.push(decoded);
      offset += this[P_TYPE].encodedSize;
      counter--;
    }

    this[P_SIZE_ENCODED] = offset;
    return result;
  }
  /**
   * Encodes the given object to a list of bytes.
   *
   * @param {Object|Array} objOrArray
   * @returns {BC}
   */


  encodeToBytes(arr) {
    arr = this.determineValue(arr);
    let bc = BC.empty();
    arr.forEach((item, idx) => {
      if (idx >= this[P_REPEAT_LIMIT] && this[P_REPEAT_LIMIT] > -1) {
        return;
      }

      bc = bc.append(this[P_TYPE].encodeToBytes(item));
    });
    this[P_SIZE_ENCODED] = bc.length;
    return bc;
  }
  /**
   * Gets the coder used for each repeated value.
   *
   * @return {*}
   */


  get repeatingType() {
    return this[P_TYPE];
  }

}

module.exports = Repeating;

/***/ }),

/***/ "./src/Coding/index.js":
/*!*****************************!*\
  !*** ./src/Coding/index.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
module.exports = {
  AbstractType: __webpack_require__(/*! ./AbstractType */ "./src/Coding/AbstractType.js"),
  CompositeType: __webpack_require__(/*! ./CompositeType */ "./src/Coding/CompositeType.js"),
  Repeating: __webpack_require__(/*! ./Repeating */ "./src/Coding/Repeating.js"),
  Decissive: __webpack_require__(/*! ./Decissive */ "./src/Coding/Decissive.js"),
  Core: {
    AbstractInt: __webpack_require__(/*! ./Core/AbstractInt */ "./src/Coding/Core/AbstractInt.js"),
    Int8: __webpack_require__(/*! ./Core/Int8 */ "./src/Coding/Core/Int8.js"),
    Int16: __webpack_require__(/*! ./Core/Int16 */ "./src/Coding/Core/Int16.js"),
    Int32: __webpack_require__(/*! ./Core/Int32 */ "./src/Coding/Core/Int32.js"),
    Int64: __webpack_require__(/*! ./Core/Int64 */ "./src/Coding/Core/Int64.js"),
    StringWithLength: __webpack_require__(/*! ./Core/StringWithLength */ "./src/Coding/Core/StringWithLength.js"),
    StringWithoutLength: __webpack_require__(/*! ./Core/StringWithoutLength */ "./src/Coding/Core/StringWithoutLength.js"),
    BytesWithLength: __webpack_require__(/*! ./Core/BytesWithLength */ "./src/Coding/Core/BytesWithLength.js"),
    BytesWithoutLength: __webpack_require__(/*! ./Core/BytesWithoutLength */ "./src/Coding/Core/BytesWithoutLength.js"),
    BytesFixedLength: __webpack_require__(/*! ./Core/BytesFixedLength */ "./src/Coding/Core/BytesFixedLength.js")
  },
  Pascal: {
    Keys: {
      Curve: __webpack_require__(/*! ./Pascal/Keys/Curve */ "./src/Coding/Pascal/Keys/Curve.js"),
      PublicKey: __webpack_require__(/*! ./Pascal/Keys/PublicKey */ "./src/Coding/Pascal/Keys/PublicKey.js"),
      PrivateKey: __webpack_require__(/*! ./Pascal/Keys/PrivateKey */ "./src/Coding/Pascal/Keys/PrivateKey.js")
    },
    AccountNumber: __webpack_require__(/*! ./Pascal/AccountNumber */ "./src/Coding/Pascal/AccountNumber.js"),
    AccountName: __webpack_require__(/*! ./Pascal/AccountName */ "./src/Coding/Pascal/AccountName.js"),
    Currency: __webpack_require__(/*! ./Pascal/Currency */ "./src/Coding/Pascal/Currency.js"),
    NOperation: __webpack_require__(/*! ./Pascal/NOperation */ "./src/Coding/Pascal/NOperation.js"),
    OpType: __webpack_require__(/*! ./Pascal/OpType */ "./src/Coding/Pascal/OpType.js"),
    OperationHash: __webpack_require__(/*! ./Pascal/OperationHash */ "./src/Coding/Pascal/OperationHash.js"),
    GUID: __webpack_require__(/*! ./Pascal/GUID */ "./src/Coding/Pascal/GUID.js")
  }
};

/***/ }),

/***/ "./src/Endian.js":
/*!***********************!*\
  !*** ./src/Endian.js ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
let detected = null;

class Endian {
  /**
   * Gets the identifier for big endian.
   *
   * @returns {string}
   * @constructor
   */
  static get BIG_ENDIAN() {
    return 'BE';
  }
  /**
   * Gets the identifier for big endian.
   *
   * @returns {string}
   * @constructor
   */


  static get LITTLE_ENDIAN() {
    return 'LE';
  }
  /**
   * Detects the systems endianness.
   *
   * @returns {string}
   */

  /* istanbul ignore next: unable to test */


  static detect() {
    if (detected === null) {
      const b = new ArrayBuffer(4);
      const a = new Uint32Array(b);
      const c = new Uint8Array(b);
      a[0] = 0xdeadbeef;

      if (c[0] === 0xef) {
        detected = Endian.LITTLE_ENDIAN;
      }

      if (c[0] === 0xde) {
        detected = Endian.BIG_ENDIAN;
      }
    }

    return detected;
  }
  /**
   * Gets a value indicating whether the system uses little endian.
   *
   * @returns {boolean}
   */

  /* istanbul ignore next: unable to test */


  static isLittleEndian() {
    return Endian.detect() === Endian.LITTLE_ENDIAN;
  }
  /**
   * Gets a value indicating whether the system uses big endian.
   *
   * @returns {boolean}
   */

  /* istanbul ignore next: unable to test */


  static isBigEndian() {
    return Endian.detect() === Endian.BIG_ENDIAN;
  }

}

module.exports = Endian;

/***/ }),

/***/ "./src/Objects/Abstract.js":
/*!*********************************!*\
  !*** ./src/Objects/Abstract.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
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

  mapInitializationDataWithProperties(props) {
    let mapped = {};
    props.forEach(prop => {
      if (this[P_INITIALIZATION_DATA][prop.description] !== undefined) {
        mapped[prop] = this[P_INITIALIZATION_DATA][prop.description];
      }
    });
    return mapped;
  }

}

module.exports = Abstract;

/***/ }),

/***/ "./src/Objects/Account.js":
/*!********************************!*\
  !*** ./src/Objects/Account.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const AccountNumber = __webpack_require__(/*! ./../Types/AccountNumber */ "./src/Types/AccountNumber.js");

const AccountName = __webpack_require__(/*! ./../Types/AccountName */ "./src/Types/AccountName.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const Currency = __webpack_require__(/*! ./../Types/Currency */ "./src/Types/Currency.js");

const PublicKeyCoder = __webpack_require__(/*! ./../Coding/Pascal/Keys/PublicKey */ "./src/Coding/Pascal/Keys/PublicKey.js");

const pkCoder = new PublicKeyCoder();
const P_ACCOUNT_NUMBER = Symbol('account');
const P_PUBLIC_KEY = Symbol('enc_pubkey');
const P_BALANCE = Symbol('balance_s');
const P_N_OPERATION = Symbol('n_operation');
const P_UPDATED_IN_BLOCK_NUMBER = Symbol('updated_b');
const P_STATE = Symbol('state');
const P_NAME = Symbol('name');
const P_TYPE = Symbol('type');
const P_LOCKED_UNTIL_BLOCK_NUMBER = Symbol('locked_until_block');
const P_PRICE = Symbol('price_s');
const P_SELLER_ACCOUNT_NUMBER = Symbol('seller_account');
const P_IS_PRIVATE_SALE = Symbol('private_sale');
const P_NEW_PUBLIC_KEY = Symbol('new_enc_pubkey'); // v5

const P_DATA = Symbol('data');
const P_SEAL = Symbol('seal');
const P_HASHED_SECRET = Symbol('hashed_secret');
const P_AMOUNT_TO_SWAP = Symbol('amount_to_swap_s');
const P_RECEIVER_SWAP_ACCOUNT_NUMBER = Symbol('receiver_swap_account');
const ALL_PROPS = [P_ACCOUNT_NUMBER, P_PUBLIC_KEY, P_BALANCE, P_N_OPERATION, P_UPDATED_IN_BLOCK_NUMBER, P_STATE, P_NAME, P_TYPE, P_LOCKED_UNTIL_BLOCK_NUMBER, P_PRICE, P_SELLER_ACCOUNT_NUMBER, P_IS_PRIVATE_SALE, P_NEW_PUBLIC_KEY, P_DATA, P_SEAL, P_HASHED_SECRET, P_AMOUNT_TO_SWAP, P_RECEIVER_SWAP_ACCOUNT_NUMBER];
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
   * Coin swap state
   *
   * @returns {string}
   */


  static get STATE_COIN_SWAP() {
    return 'coin_swap';
  }
  /**
   * TODO
   *
   * @returns {string}
   */


  static get STATE_ACCOUNT_SWAP() {
    return 'account_swap';
  }
  /**
   * Constructor
   *
   * @param {Object} data
   */


  static createFromObject(data) {
    let account = new this(data);
    const mappedData = account.mapInitializationDataWithProperties(ALL_PROPS);
    account[P_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_ACCOUNT_NUMBER]);
    account[P_PUBLIC_KEY] = pkCoder.decodeFromBytes(BC.fromHex(mappedData[P_PUBLIC_KEY]));
    account[P_BALANCE] = new Currency(mappedData[P_BALANCE]);
    account[P_N_OPERATION] = parseInt(mappedData[P_N_OPERATION], 10);
    account[P_UPDATED_IN_BLOCK_NUMBER] = parseInt(mappedData[P_UPDATED_IN_BLOCK_NUMBER], 10);
    account[P_SEAL] = null;

    if (mappedData[P_SEAL] !== undefined) {
      account[P_SEAL] = BC.fromHex(mappedData[P_SEAL]);
    }

    account[P_DATA] = null;

    if (mappedData[P_DATA] !== undefined) {
      account[P_DATA] = BC.fromHex(mappedData[P_DATA]);
    }

    const state = mappedData[P_STATE];

    if (state !== Account.STATE_NORMAL && state !== Account.STATE_LISTED && state !== Account.STATE_ACCOUNT_SWAP && state !== Account.STATE_COIN_SWAP) {
      throw new Error('Invalid account state.');
    }

    account[P_STATE] = state;
    account[P_NAME] = new AccountName(mappedData[P_NAME]);
    account[P_TYPE] = mappedData[P_TYPE];
    account[P_LOCKED_UNTIL_BLOCK_NUMBER] = null;

    if (mappedData[P_LOCKED_UNTIL_BLOCK_NUMBER] !== undefined) {
      account[P_LOCKED_UNTIL_BLOCK_NUMBER] = parseInt(mappedData[P_LOCKED_UNTIL_BLOCK_NUMBER], 10);
    }

    account[P_PRICE] = null;

    if (mappedData[P_PRICE] !== undefined) {
      account[P_PRICE] = new Currency(mappedData[P_PRICE]);
    }

    account[P_SELLER_ACCOUNT_NUMBER] = null;

    if (mappedData[P_SELLER_ACCOUNT_NUMBER] !== undefined) {
      account[P_SELLER_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_SELLER_ACCOUNT_NUMBER]);
    }

    account[P_IS_PRIVATE_SALE] = false;

    if (mappedData[P_IS_PRIVATE_SALE] !== undefined) {
      account[P_IS_PRIVATE_SALE] = mappedData[P_IS_PRIVATE_SALE];
    }

    account[P_NEW_PUBLIC_KEY] = null;

    if (mappedData[P_NEW_PUBLIC_KEY] !== undefined && mappedData[P_NEW_PUBLIC_KEY] !== '000000000000') {
      account[P_NEW_PUBLIC_KEY] = pkCoder.decodeFromBytes(BC.fromHex(mappedData[P_NEW_PUBLIC_KEY]));
    }

    account[P_HASHED_SECRET] = null;

    if (mappedData[P_HASHED_SECRET] !== undefined) {
      account[P_HASHED_SECRET] = BC.fromHex(mappedData[P_HASHED_SECRET]);
    }

    account[P_AMOUNT_TO_SWAP] = null;

    if (mappedData[P_AMOUNT_TO_SWAP] !== undefined) {
      account[P_AMOUNT_TO_SWAP] = new Currency(mappedData[P_AMOUNT_TO_SWAP]);
    }

    account[P_RECEIVER_SWAP_ACCOUNT_NUMBER] = null;

    if (mappedData[P_RECEIVER_SWAP_ACCOUNT_NUMBER] !== undefined) {
      account[P_RECEIVER_SWAP_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_RECEIVER_SWAP_ACCOUNT_NUMBER]);
    }

    return account;
  }
  /**
   * Gets the account number of the account.
   *
   * @returns {AccountNumber}
   */


  get accountNumber() {
    return this[P_ACCOUNT_NUMBER];
  }
  /**
   * Gets the public key of the account.
   *
   * @returns {PublicKey}
   */


  get publicKey() {
    return this[P_PUBLIC_KEY];
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


  get updatedInBlockNumber() {
    return this[P_UPDATED_IN_BLOCK_NUMBER];
  }
  /**
   * Gets the block number when the account was created.
   *
   * @returns {Number}
   */


  get createdInBlockNumber() {
    return Math.floor(this[P_ACCOUNT_NUMBER] / 5);
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


  get lockedUntilBlockNumber() {
    return this[P_LOCKED_UNTIL_BLOCK_NUMBER];
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


  get sellerAccountNumber() {
    return this[P_SELLER_ACCOUNT_NUMBER];
  }
  /**
   * Gets a flag indicating whether the account is for sale. Attention:
   * null and false = not for sale.
   *
   * @returns {boolean}
   */


  get isPrivateSale() {
    return !!this[P_IS_PRIVATE_SALE];
  }
  /**
   * Gets the new public key in case of a escrow.
   *
   * @returns {PublicKey|null}
   */


  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }
  /**
   * Gets the hashed secret.
   *
   * @return {BC}
   */


  get hashedSecret() {
    return this[P_HASHED_SECRET];
  }
  /**
   * Gets the account data.
   *
   * @return {BC}
   */


  get data() {
    return this[P_DATA];
  }
  /**
   * Gets the account seal.
   *
   * @return {BC}
   */


  get seal() {
    return this[P_SEAL];
  }
  /**
   *Gets the amount to be swapped.
   *
   * @return {Currency}
   */


  get amountToSwap() {
    return this[P_AMOUNT_TO_SWAP];
  }
  /**
   * Gets the coin swap receiver account.
   *
   * @return {AccountNumber}
   */


  get receiverSwapAccountNumber() {
    return this[P_RECEIVER_SWAP_ACCOUNT_NUMBER];
  }
  /**
   * Gets a value indicating whether the account is for sale.
   *
   * @returns {boolean}
   */


  isForSale() {
    return this[P_STATE] === Account.STATE_LISTED;
  }
  /**
   * Gets a value indicating whether the account is in account swap state.
   *
   * @returns {boolean}
   */


  isAccountSwap() {
    return this[P_STATE] === Account.STATE_ACCOUNT_SWAP;
  }
  /**
   * Gets a value indicating whether the account is in coin swap state.
   *
   * @returns {boolean}
   */


  isCoinSwap() {
    return this[P_STATE] === Account.STATE_COIN_SWAP;
  }

}

module.exports = Account;

/***/ }),

/***/ "./src/Objects/Block.js":
/*!******************************!*\
  !*** ./src/Objects/Block.js ***!
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
const BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");

const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const Currency = __webpack_require__(/*! ./../Types/Currency */ "./src/Types/Currency.js");

const AccountNumber = __webpack_require__(/*! ./../Types/AccountNumber */ "./src/Types/AccountNumber.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const PublicKeyCoder = __webpack_require__(/*! ./../Coding/Pascal/Keys/PublicKey */ "./src/Coding/Pascal/Keys/PublicKey.js");

const pkCoder = new PublicKeyCoder();
const P_BLOCK_NUMBER = Symbol('block');
const P_PUBLIC_KEY = Symbol('enc_pubkey');
const P_REWARD = Symbol('reward_s');
const P_FEE = Symbol('fee_s');
const P_PROTOCOl_VERSION = Symbol('ver');
const P_MINER_VERSION = Symbol('ver_a');
const P_TIMESTAMP = Symbol('timestamp');
const P_TARGET = Symbol('target');
const P_NONCE = Symbol('nonce');
const P_PAYLOAD = Symbol('payload');
const P_SAFEBOX_HASH = Symbol('sbh');
const P_OP_HASH = Symbol('oph');
const P_PROOF_OF_WORK = Symbol('pow');
const P_HASH_RATE_KHS = Symbol('hashratekhs');
const P_MATURATION = Symbol('maturation');
const P_COUNT_OPERATIONS = Symbol('operations');
const ALL_PROPS = [P_BLOCK_NUMBER, P_PUBLIC_KEY, P_REWARD, P_FEE, P_PROTOCOl_VERSION, P_MINER_VERSION, P_TIMESTAMP, P_TARGET, P_NONCE, P_PAYLOAD, P_SAFEBOX_HASH, P_OP_HASH, P_PROOF_OF_WORK, P_HASH_RATE_KHS, P_MATURATION, P_COUNT_OPERATIONS];
/**
 * Represents a block.
 */

class Block extends Abstract {
  /**
   * Creates a new instance of the Block class.
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let block = new this(data);
    let mappedData = block.mapInitializationDataWithProperties(ALL_PROPS);
    block[P_BLOCK_NUMBER] = parseInt(mappedData[P_BLOCK_NUMBER], 10);
    block[P_PUBLIC_KEY] = pkCoder.decodeFromBytes(BC.fromHex(mappedData[P_PUBLIC_KEY]));
    block[P_REWARD] = new Currency(mappedData[P_REWARD]);
    block[P_FEE] = new Currency(mappedData[P_FEE]);
    block[P_PROTOCOl_VERSION] = parseInt(mappedData[P_PROTOCOl_VERSION], 10);
    block[P_MINER_VERSION] = parseInt(mappedData[P_MINER_VERSION], 10);
    block[P_TIMESTAMP] = parseInt(mappedData[P_TIMESTAMP], 10);
    block[P_TARGET] = new BN(mappedData[P_TARGET].toString(), 10);
    block[P_NONCE] = new BN(mappedData[P_NONCE].toString(), 10);
    block[P_PAYLOAD] = mappedData[P_PAYLOAD];
    block[P_SAFEBOX_HASH] = BC.fromHex(mappedData[P_SAFEBOX_HASH]);
    block[P_OP_HASH] = BC.fromHex(mappedData[P_OP_HASH]);
    block[P_PROOF_OF_WORK] = BC.fromHex(mappedData[P_PROOF_OF_WORK]);
    block[P_HASH_RATE_KHS] = new BN(mappedData[P_HASH_RATE_KHS].toString(), 10);
    block[P_MATURATION] = parseInt(mappedData[P_MATURATION], 10);
    block[P_COUNT_OPERATIONS] = 0;

    if (data.operations !== undefined) {
      block[P_COUNT_OPERATIONS] = parseInt(mappedData[P_COUNT_OPERATIONS], 10);
    }

    return block;
  }
  /**
   * Gets the number of a block.
   *
   * @returns {Number}
   */


  get blockNumber() {
    return this[P_BLOCK_NUMBER];
  }
  /**
   * Gets the public key of the miner of the block.
   *
   * @returns {PublicKey}
   */


  get publicKey() {
    return this[P_PUBLIC_KEY];
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


  get protocolVersion() {
    return this[P_PROTOCOl_VERSION];
  }
  /**
   * Gets the protocol version of the miner.
   *
   * @returns {Number}
   */


  get minerVersion() {
    return this[P_MINER_VERSION];
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
   * @returns {String}
   */


  get payload() {
    return this[P_PAYLOAD];
  }
  /**
   * Gets the safebox hash.
   *
   * @returns {BC}
   */


  get safeboxHash() {
    return this[P_SAFEBOX_HASH];
  }
  /**
   * Gets the operation hash.
   *
   * @returns {BC}
   */


  get opHash() {
    return this[P_OP_HASH];
  }
  /**
   * Gets the POW.
   *
   * @returns {BC}
   */


  get proofOfWork() {
    return this[P_PROOF_OF_WORK];
  }
  /**
   * Gets the hashrate in kh/s.
   *
   * @returns {BigNumber}
   */


  get hashRateKhs() {
    return this[P_HASH_RATE_KHS];
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


  get countOperations() {
    return this[P_COUNT_OPERATIONS];
  }
  /**
   * Gets the list of accounts created.
   *
   * @returns {AccountNumber[]}
   */


  get createdAccounts() {
    return [new AccountNumber(this[P_BLOCK_NUMBER] * 5), new AccountNumber(this[P_BLOCK_NUMBER] * 5 + 1), new AccountNumber(this[P_BLOCK_NUMBER] * 5 + 2), new AccountNumber(this[P_BLOCK_NUMBER] * 5 + 3), new AccountNumber(this[P_BLOCK_NUMBER] * 5 + 4)];
  }

}

module.exports = Block;

/***/ }),

/***/ "./src/Objects/Changer.js":
/*!********************************!*\
  !*** ./src/Objects/Changer.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const AccountNumber = __webpack_require__(/*! ./../Types/AccountNumber */ "./src/Types/AccountNumber.js");

const AccountName = __webpack_require__(/*! ./../Types/AccountName */ "./src/Types/AccountName.js");

const Currency = __webpack_require__(/*! ./../Types/Currency */ "./src/Types/Currency.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const PublicKeyCoder = __webpack_require__(/*! ./../Coding/Pascal/Keys/PublicKey */ "./src/Coding/Pascal/Keys/PublicKey.js");

const pkCoder = new PublicKeyCoder();
const P_ACCOUNT_NUMBER = Symbol('account');
const P_N_OPERATION = Symbol('n_operation');
const P_NEW_PUBLIC_KEY = Symbol('new_enc_pubkey');
const P_NEW_NAME = Symbol('new_name');
const P_NEW_TYPE = Symbol('new_type');
const P_SELLER_ACCOUNT_NUMBER = Symbol('seller_account');
const P_ACCOUNT_PRICE = Symbol('account_price_s');
const P_LOCKED_UNTIL_BLOCK = Symbol('locked_until_block');
const P_FEE = Symbol('fee_s');
const P_CHANGES = Symbol('changes');
const P_HASHED_SECRET = Symbol('hashed_secret');
const ALL_PROPS = [P_ACCOUNT_NUMBER, P_N_OPERATION, P_NEW_PUBLIC_KEY, P_NEW_NAME, P_NEW_TYPE, P_SELLER_ACCOUNT_NUMBER, P_ACCOUNT_PRICE, P_LOCKED_UNTIL_BLOCK, P_FEE, P_CHANGES, P_HASHED_SECRET];
/**
 * Represents a Changer in an operation.
 */

class Changer extends Abstract {
  /**
   * Creates a new instance of the Changer class.
   *
   * @param {Object} mappedData
   */
  static createFromObject(data) {
    let changer = new this(data);
    let mappedData = changer.mapInitializationDataWithProperties(ALL_PROPS);
    changer[P_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_ACCOUNT_NUMBER]);
    changer[P_CHANGES] = null;

    if (mappedData[P_CHANGES] !== undefined) {
      changer[P_CHANGES] = mappedData[P_CHANGES];
    }

    changer[P_N_OPERATION] = null;

    if (mappedData[P_N_OPERATION] !== undefined) {
      changer[P_N_OPERATION] = parseInt(mappedData[P_N_OPERATION], 10);
    }

    changer[P_HASHED_SECRET] = null;

    if (mappedData[P_HASHED_SECRET] !== undefined) {
      changer[P_HASHED_SECRET] = BC.fromHex(mappedData[P_HASHED_SECRET]);
    }

    changer[P_NEW_PUBLIC_KEY] = null;

    if (mappedData[P_NEW_PUBLIC_KEY] !== undefined) {
      changer[P_NEW_PUBLIC_KEY] = pkCoder.decodeFromBytes(BC.fromHex(mappedData[P_NEW_PUBLIC_KEY]));
    }

    changer[P_NEW_NAME] = null;

    if (mappedData[P_NEW_NAME] !== undefined) {
      changer[P_NEW_NAME] = new AccountName(mappedData[P_NEW_NAME]);
    }

    changer[P_NEW_TYPE] = null;

    if (mappedData[P_NEW_TYPE] !== undefined) {
      changer[P_NEW_TYPE] = mappedData[P_NEW_TYPE];
    }

    changer[P_SELLER_ACCOUNT_NUMBER] = null;

    if (mappedData[P_SELLER_ACCOUNT_NUMBER] !== undefined) {
      changer[P_SELLER_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_SELLER_ACCOUNT_NUMBER]);
    }

    changer[P_ACCOUNT_PRICE] = new Currency(0);

    if (mappedData[P_ACCOUNT_PRICE] !== undefined) {
      changer[P_ACCOUNT_PRICE] = new Currency(mappedData[P_ACCOUNT_PRICE]);
    }

    changer[P_LOCKED_UNTIL_BLOCK] = null;

    if (mappedData[P_LOCKED_UNTIL_BLOCK] !== undefined) {
      changer[P_LOCKED_UNTIL_BLOCK] = parseInt(mappedData[P_LOCKED_UNTIL_BLOCK], 10);
    }

    changer[P_FEE] = new Currency(0);

    if (mappedData[P_FEE] !== undefined) {
      changer[P_FEE] = new Currency(mappedData[P_FEE]);
    }

    return changer;
  }
  /**
   * Gets the changed account.
   *
   * @returns {AccountNumber}
   */


  get accountNumber() {
    return this[P_ACCOUNT_NUMBER];
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
    return this[P_NEW_PUBLIC_KEY];
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


  get sellerAccountNumber() {
    return this[P_SELLER_ACCOUNT_NUMBER];
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
  /**
   * Gets the changes identifier.
   *
   * @return {String}
   */


  get changes() {
    return this[P_CHANGES];
  }
  /**
   * Gets the hashedSecret
   *
   * @return {BC}
   */


  get hashedSecret() {
    return this[P_HASHED_SECRET];
  }

}

module.exports = Changer;

/***/ }),

/***/ "./src/Objects/Connection.js":
/*!***********************************!*\
  !*** ./src/Objects/Connection.js ***!
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
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const P_RECEIVED_BYTES = Symbol('recv');
const P_TIME_DIFF = Symbol('timediff');
const P_NET_PROTOCOL = Symbol('netver');
const P_CONNECTION_ALIVE_SECONDS = Symbol('secs');
const P_IS_SERVER = Symbol('server');
const P_IP = Symbol('ip');
const P_NET_PROTOCOL_AVAILABLE = Symbol('netver_a');
const P_SENT_BYTES = Symbol('sent');
const P_APP_VERSION = Symbol('appver');
const P_PORT = Symbol('port');
const ALL_PROPS = [P_RECEIVED_BYTES, P_TIME_DIFF, P_NET_PROTOCOL, P_CONNECTION_ALIVE_SECONDS, P_IS_SERVER, P_IP, P_NET_PROTOCOL_AVAILABLE, P_SENT_BYTES, P_APP_VERSION, P_PORT];
/**
 * Holds information about a node connection.
 */

class Connection extends Abstract {
  /**
   * Constructor
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let connection = new this(data);
    let mappedData = connection.mapInitializationDataWithProperties(ALL_PROPS);
    connection[P_RECEIVED_BYTES] = parseInt(mappedData[P_RECEIVED_BYTES], 10);
    connection[P_TIME_DIFF] = parseInt(mappedData[P_TIME_DIFF], 10);
    connection[P_NET_PROTOCOL] = parseInt(mappedData[P_NET_PROTOCOL], 10);
    connection[P_CONNECTION_ALIVE_SECONDS] = parseInt(mappedData[P_CONNECTION_ALIVE_SECONDS], 10);
    connection[P_IS_SERVER] = !!mappedData[P_IS_SERVER];
    connection[P_IP] = mappedData[P_IP];
    connection[P_NET_PROTOCOL_AVAILABLE] = parseInt(mappedData[P_NET_PROTOCOL_AVAILABLE], 10);
    connection[P_SENT_BYTES] = parseInt(mappedData[P_SENT_BYTES], 10);
    connection[P_APP_VERSION] = mappedData[P_APP_VERSION];
    connection[P_PORT] = parseInt(mappedData[P_PORT], 10);
    return connection;
  }
  /**
   * Gets the number of received bytes from the connection.
   *
   * @returns {Number}
   */


  get receivedBytes() {
    return this[P_RECEIVED_BYTES];
  }
  /**
   * Gets the time difference of the current and the remote node in seconds.
   *
   * @returns {Number}
   */


  get timeDiff() {
    return this[P_TIME_DIFF];
  }
  /**
   * Net protocol available of other node
   *
   * @returns {Number}
   */


  get netProtocol() {
    return this[P_NET_PROTOCOL];
  }
  /**
   * The duration of the connection.
   *
   * @returns {Number}
   */


  get connectionAliveSeconds() {
    return this[P_CONNECTION_ALIVE_SECONDS];
  }
  /**
   * A flag indicating whether the other node is a server node (daemon).
   * @returns {*}
   */


  get isServer() {
    return this[P_IS_SERVER];
  }
  /**
   * The IP of the remote node.
   *
   * @returns {*}
   */


  get ip() {
    return this[P_IP];
  }
  /**
   * The netprotocol version of the other node.
   *
   * @returns {*}
   */


  get netProtocolAvailable() {
    return this[P_NET_PROTOCOL_AVAILABLE];
  }
  /**
   * The bytes sent to the other node.
   *
   * @returns {*}
   */


  get sentBytes() {
    return this[P_SENT_BYTES];
  }
  /**
   * The node version.
   *
   * @returns {*}
   */


  get appVersion() {
    return this[P_APP_VERSION];
  }
  /**
   * The port of the other node.
   *
   * @returns {*}
   */


  get port() {
    return this[P_PORT];
  }

}

module.exports = Connection;

/***/ }),

/***/ "./src/Objects/NetProtocol.js":
/*!************************************!*\
  !*** ./src/Objects/NetProtocol.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const P_VERSION = Symbol('ver');
const P_VERSION_AVAILABLE = Symbol('ver_a');
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

/***/ }),

/***/ "./src/Objects/NetStats.js":
/*!*********************************!*\
  !*** ./src/Objects/NetStats.js ***!
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
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const P_BYTES_RECEIVED = Symbol('breceived');
const P_BYTES_SENT = Symbol('bsend');
const P_COUNT_ACTIVE_CONNECTIONS = Symbol('active'); // active

const P_COUNT_CLIENT_CONNECTIONS = Symbol('clients'); // clients

const P_COUNT_SERVER_CONNECTIONS_WITH_RESPONSE = Symbol('servers'); // servers

const P_COUNT_SERVER_CONNECTIONS = Symbol('servers_t'); // servers_t

const P_COUNT_TOTAL_CONNECTIONS = Symbol('total');
const P_COUNT_TOTAL_CLIENT_CONNECTIONS = Symbol('tclients');
const P_COUNT_TOTAL_SERVER_CONNECTIONS = Symbol('tservers');
const ALL_PROPS = [P_BYTES_RECEIVED, P_BYTES_SENT, P_COUNT_ACTIVE_CONNECTIONS, P_COUNT_CLIENT_CONNECTIONS, P_COUNT_SERVER_CONNECTIONS_WITH_RESPONSE, P_COUNT_SERVER_CONNECTIONS, P_COUNT_TOTAL_CONNECTIONS, P_COUNT_TOTAL_CLIENT_CONNECTIONS, P_COUNT_TOTAL_SERVER_CONNECTIONS];
/**
 * Class that holds netstats of a node server.
 */

class NetStats extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  static createFromObject(data) {
    let netStats = new this(data);
    let mappedData = netStats.mapInitializationDataWithProperties(ALL_PROPS);
    netStats[P_COUNT_ACTIVE_CONNECTIONS] = parseInt(mappedData[P_COUNT_ACTIVE_CONNECTIONS], 10);
    netStats[P_COUNT_CLIENT_CONNECTIONS] = parseInt(mappedData[P_COUNT_CLIENT_CONNECTIONS], 10);
    netStats[P_COUNT_SERVER_CONNECTIONS_WITH_RESPONSE] = parseInt(mappedData[P_COUNT_SERVER_CONNECTIONS_WITH_RESPONSE], 10);
    netStats[P_COUNT_SERVER_CONNECTIONS] = parseInt(mappedData[P_COUNT_SERVER_CONNECTIONS], 10);
    netStats[P_COUNT_TOTAL_CONNECTIONS] = parseInt(mappedData[P_COUNT_TOTAL_CONNECTIONS], 10);
    netStats[P_COUNT_TOTAL_CLIENT_CONNECTIONS] = parseInt(mappedData[P_COUNT_TOTAL_CLIENT_CONNECTIONS], 10);
    netStats[P_COUNT_TOTAL_SERVER_CONNECTIONS] = parseInt(mappedData[P_COUNT_TOTAL_SERVER_CONNECTIONS], 10);
    netStats[P_BYTES_RECEIVED] = parseInt(mappedData[P_BYTES_RECEIVED], 10);
    netStats[P_BYTES_SENT] = parseInt(mappedData[P_BYTES_SENT], 10);
    return netStats;
  }
  /**
   * Gets the received bytes.
   *
   * @returns {Number}
   */


  get bytesReceived() {
    return this[P_BYTES_RECEIVED];
  }
  /**
   * Gets the sent bytes.
   *
   * @returns {Number}
   */


  get bytesSent() {
    return this[P_BYTES_SENT];
  }

  get countActiveConnections() {
    return this[P_COUNT_ACTIVE_CONNECTIONS];
  }

  get countClientConnections() {
    return this[P_COUNT_TOTAL_CLIENT_CONNECTIONS];
  }

  get countServerConnectionsWithResponse() {
    return this[P_COUNT_SERVER_CONNECTIONS_WITH_RESPONSE];
  }

  get countServerConnections() {
    return this[P_COUNT_SERVER_CONNECTIONS];
  }

  get countTotalConnections() {
    return this[P_COUNT_TOTAL_CONNECTIONS];
  }

  get countTotalClientConnections() {
    return this[P_COUNT_TOTAL_CLIENT_CONNECTIONS];
  }

  get countTotalServerConnections() {
    return this[P_COUNT_TOTAL_SERVER_CONNECTIONS];
  }

}

module.exports = NetStats;

/***/ }),

/***/ "./src/Objects/NodeServer.js":
/*!***********************************!*\
  !*** ./src/Objects/NodeServer.js ***!
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
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const P_PORT = Symbol('port');
const P_LAST_CONNECTION_TIME = Symbol('lastcon');
const P_COUNT_ATTEMPTS = Symbol('attempts');
const P_IP = Symbol('ip');
const ALL_PROPS = [P_PORT, P_LAST_CONNECTION_TIME, P_COUNT_ATTEMPTS, P_IP];
/**
 * Holds information about a single node server connection.
 */

class NodeServer extends Abstract {
  /**
     * Constructor
     *
     * @param {Object} data
     */
  static createFromObject(data) {
    let nodeServer = new this(data);
    let mappedData = nodeServer.mapInitializationDataWithProperties(ALL_PROPS);
    nodeServer[P_PORT] = parseInt(mappedData[P_PORT], 10);
    nodeServer[P_LAST_CONNECTION_TIME] = parseInt(mappedData[P_LAST_CONNECTION_TIME], 10);
    nodeServer[P_COUNT_ATTEMPTS] = parseInt(mappedData[P_COUNT_ATTEMPTS], 10);
    nodeServer[P_IP] = mappedData[P_IP];
    return nodeServer;
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


  get lastConnectionTime() {
    return this[P_LAST_CONNECTION_TIME];
  }
  /**
     * Gets the number of connection attempts.
     *
     * @returns {Number}
     */


  get countAttempts() {
    return this[P_COUNT_ATTEMPTS];
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

/***/ "./src/Objects/NodeStatus.js":
/*!***********************************!*\
  !*** ./src/Objects/NodeStatus.js ***!
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
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const NetProtocol = __webpack_require__(/*! ./NetProtocol */ "./src/Objects/NetProtocol.js");

const NetStats = __webpack_require__(/*! ./NetStats */ "./src/Objects/NetStats.js");

const NodeServer = __webpack_require__(/*! ./NodeServer */ "./src/Objects/NodeServer.js");

const P_IS_READY = Symbol('ready');
const P_READY_STRING = Symbol('ready_s');
const P_STATUS_STRING = Symbol('status_s');
const P_PORT = Symbol('port');
const P_IS_LOCKED = Symbol('locked');
const P_TIMESTAMP = Symbol('timestamp');
const P_BLOCKS = Symbol('blocks');
const P_NODE_SERVERS = Symbol('nodeservers');
const P_NET_STATS = Symbol('netstats');
const P_VERSION = Symbol('version');
const P_NET_PROTOCOL = Symbol('netprotocol');
const P_SAFEBOX_HASH = Symbol('sbh');
const P_PROOF_OF_WORK = Symbol('pow');
const P_OPENSSL_VERSION = Symbol('openssl');
const ALL_PROPS = [P_IS_READY, P_READY_STRING, P_STATUS_STRING, P_PORT, P_IS_LOCKED, P_TIMESTAMP, P_BLOCKS, P_NODE_SERVERS, P_NET_STATS, P_VERSION, P_NET_PROTOCOL, P_SAFEBOX_HASH, P_PROOF_OF_WORK, P_OPENSSL_VERSION];

class NodeStatus extends Abstract {
  static createFromObject(data) {
    let nodeStatus = new this(data);
    let mappedData = nodeStatus.mapInitializationDataWithProperties(ALL_PROPS);
    nodeStatus[P_IS_READY] = !!mappedData[P_IS_READY];
    nodeStatus[P_READY_STRING] = mappedData[P_READY_STRING];
    nodeStatus[P_STATUS_STRING] = mappedData[P_STATUS_STRING];
    nodeStatus[P_PORT] = parseInt(mappedData[P_PORT], 10);
    nodeStatus[P_IS_LOCKED] = !!mappedData[P_IS_LOCKED];
    nodeStatus[P_TIMESTAMP] = parseInt(mappedData[P_TIMESTAMP], 10);
    nodeStatus[P_BLOCKS] = parseInt(mappedData[P_BLOCKS], 10);
    nodeStatus[P_VERSION] = mappedData[P_VERSION];
    nodeStatus[P_SAFEBOX_HASH] = BC.fromHex(mappedData[P_SAFEBOX_HASH]);
    nodeStatus[P_PROOF_OF_WORK] = BC.fromHex(mappedData[P_PROOF_OF_WORK]);
    nodeStatus[P_OPENSSL_VERSION] = BC.fromHex(mappedData[P_OPENSSL_VERSION]);
    nodeStatus[P_NET_PROTOCOL] = NetProtocol.createFromRPC(mappedData[P_NET_PROTOCOL]);
    nodeStatus[P_NET_STATS] = NetStats.createFromRPC(mappedData[P_NET_STATS]);
    nodeStatus[P_NODE_SERVERS] = mappedData[P_NODE_SERVERS].map(ns => NodeServer.createFromRPC(ns));
    return nodeStatus;
  }
  /**
     * Gets a flag indicating whether the node is ready.
     *
     * @returns {Boolean}
     */


  get isReady() {
    return this[P_IS_READY];
  }
  /**
     * Gets a string explaining the ready status.
     *
     * @returns {String}
     */


  get readyString() {
    return this[P_READY_STRING];
  }
  /**
     * Gets a string defining the status of the node.
     *
     * @returns {String}
     */


  get statusString() {
    return this[P_STATUS_STRING];
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


  get isLocked() {
    return this[P_IS_LOCKED];
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


  get nodeServers() {
    return this[P_NODE_SERVERS];
  }
  /**
     * Gets the netstats
     *
     * @returns {NetStats}
     */


  get netStats() {
    return this[P_NET_STATS];
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


  get netProtocol() {
    return this[P_NET_PROTOCOL];
  }
  /**
     * Gets the last safebox hash.
     *
     * @returns {BC}
     */


  get safeboxHash() {
    return this[P_SAFEBOX_HASH];
  }
  /**
     * Gets the last known POW.
     *
     * @returns {BC}
     */


  get proofOfWork() {
    return this[P_PROOF_OF_WORK];
  }
  /**
     * Gets the openssl info.
     *
     * @returns {BC}
     */


  get opensslVersion() {
    return this[P_OPENSSL_VERSION];
  }

}

module.exports = NodeStatus;

/***/ }),

/***/ "./src/Objects/Operation.js":
/*!**********************************!*\
  !*** ./src/Objects/Operation.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const AccountNumber = __webpack_require__(/*! ./../Types/AccountNumber */ "./src/Types/AccountNumber.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const Currency = __webpack_require__(/*! ./../Types/Currency */ "./src/Types/Currency.js");

const OperationHashCoder = __webpack_require__(/*! ./../Coding/Pascal/OperationHash */ "./src/Coding/Pascal/OperationHash.js");

const opHashCoder = new OperationHashCoder();

const Sender = __webpack_require__(/*! ./Sender */ "./src/Objects/Sender.js");

const Receiver = __webpack_require__(/*! ./Receiver */ "./src/Objects/Receiver.js");

const Changer = __webpack_require__(/*! ./Changer */ "./src/Objects/Changer.js");

const P_IS_VALID = Symbol('valid');
const P_ERRORS = Symbol('errors');
const P_BLOCK_NUMBER = Symbol('block');
const P_BLOCK_TIME = Symbol('time');
const P_OP_BLOCK = Symbol('opblock');
const P_PAYLOAD = Symbol('payload');
const P_PAYLOAD_TYPE = Symbol('payload_type');
const P_MATURATION = Symbol('maturation');
const P_OP_TYPE = Symbol('optype');
const P_ACCOUNT_NUMBER = Symbol('account');
const P_OP_DESCRIPTION = Symbol('optxt');
const P_AMOUNT = Symbol('amount_s');
const P_FEE = Symbol('fee_s');
const P_BALANCE = Symbol('balance_s');
const P_OP_HASH = Symbol('ophash');
const P_OLD_OP_HASH = Symbol('old_ophash');
const P_SUB_TYPE = Symbol('subtype');
const P_SIGNER_ACCOUNT_NUMBER = Symbol('signer_account');
const P_CHANGERS = Symbol('changers');
const P_SENDERS = Symbol('senders');
const P_RECEIVERS = Symbol('receivers');
const ALL_PROPS = [P_IS_VALID, P_ERRORS, P_BLOCK_NUMBER, P_BLOCK_TIME, P_OP_BLOCK, P_PAYLOAD, P_PAYLOAD_TYPE, P_MATURATION, P_OP_TYPE, P_ACCOUNT_NUMBER, P_OP_DESCRIPTION, P_AMOUNT, P_FEE, P_BALANCE, P_OP_HASH, P_OLD_OP_HASH, P_SUB_TYPE, P_SIGNER_ACCOUNT_NUMBER, P_CHANGERS, P_SENDERS, P_RECEIVERS];
const P_RECEIVER_CLASS = Symbol('receiver_class');
const P_SENDER_CLASS = Symbol('sender_class');
const P_CHANGER_CLASS = Symbol('changer_class');
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

  static get SUBTYPE_MINER() {
    return 1;
  }

  static get SUBTYPE_DEVELOPER() {
    return 2;
  }

  static get SUBTYPE_TX_SENDER() {
    return 11;
  }

  static get SUBTYPE_TX_RECEIVER() {
    return 12;
  }

  static get SUBTYPE_TX_BUY_BUYER() {
    return 13;
  }

  static get SUBTYPE_TX_BUY_TARGET() {
    return 14;
  }

  static get SUBTYPE_TX_BUY_SELLER() {
    return 15;
  }

  static get SUBTYPE_CHANGE_KEY() {
    return 21;
  }

  static get SUBTYPE_RECOVER() {
    return 31;
  }

  static get SUBTYPE_LIST_PUBLIC() {
    return 41;
  }

  static get SUBTYPE_LIST_PRIVATE() {
    return 42;
  }

  static get SUBTYPE_DELIST() {
    return 51;
  }

  static get SUBTYPE_BUY_BUYER() {
    return 61;
  }

  static get SUBTYPE_BUY_TARGET() {
    return 62;
  }

  static get SUBTYPE_BUY_SELLER() {
    return 63;
  }

  static get SUBTYPE_CHANGE_KEY_SIGNED() {
    return 71;
  }

  static get SUBTYPE_CHANGE_ACCOUNT_INFO() {
    return 81;
  }

  static get SUBTYPE_MULTI_GLOBAL() {
    return 91;
  }

  static get SUBTYPE_MULTI_ACCOUNT_INFO() {
    return 92;
  }

  static get SUBTYPE_DATA_GLOBAL() {
    return 101;
  }

  static get SUBTYPE_DATA_SENDER() {
    return 102;
  }

  static get SUBTYPE_DATA_SIGNER() {
    return 103;
  }

  static get SUBTYPE_DATA_RECEIVER() {
    return 104;
  }

  constructor(initializationData) {
    super(initializationData);
    this[P_RECEIVER_CLASS] = Receiver;
    this[P_SENDER_CLASS] = Sender;
    this[P_CHANGER_CLASS] = Changer;
  }
  /**
   * Sets the class used to initialize a receiver.
   *
   * @param {Function} receiverClass
   */


  set receiverClass(receiverClass) {
    this[P_RECEIVER_CLASS] = receiverClass;
  }
  /**
   * Sets the class used to initialize a sender.
   *
   * @param {Function} senderClass
   */


  set senderClass(senderClass) {
    this[P_SENDER_CLASS] = senderClass;
  }
  /**
   * Sets the class used to initialize a changer.
   *
   * @param {Function} changerClass
   */


  set changerClass(changerClass) {
    this[P_CHANGER_CLASS] = changerClass;
  }
  /**
   * Creates a new Operation instance from an rpc response.
   *
   * @param {Object} data
   */


  static createFromObject(data) {
    let operation = new this(data);
    let mappedData = operation.mapInitializationDataWithProperties(ALL_PROPS);
    operation[P_IS_VALID] = true;

    if (mappedData[P_IS_VALID] !== undefined) {
      operation[P_IS_VALID] = !!mappedData[P_IS_VALID];
    }

    operation[P_ERRORS] = null;

    if (mappedData[P_ERRORS] !== undefined) {
      operation[P_ERRORS] = mappedData[P_ERRORS];
    }

    if (mappedData[P_PAYLOAD] !== undefined) {
      operation[P_PAYLOAD] = BC.fromHex(mappedData[P_PAYLOAD]);
    } else {
      operation[P_PAYLOAD] = BC.fromHex('');
    }

    if (mappedData[P_PAYLOAD_TYPE] !== undefined) {
      operation[P_PAYLOAD_TYPE] = parseInt(mappedData[P_PAYLOAD_TYPE], 10);
    } else {
      operation[P_PAYLOAD_TYPE] = 0;
    }

    operation[P_BLOCK_NUMBER] = parseInt(mappedData[P_BLOCK_NUMBER], 10);
    operation[P_BLOCK_TIME] = parseInt(mappedData[P_BLOCK_TIME], 10);
    operation[P_OP_BLOCK] = parseInt(mappedData[P_OP_BLOCK], 10);
    operation[P_MATURATION] = 0; // pending

    if (mappedData[P_MATURATION] !== null) {
      operation[P_MATURATION] = parseInt(mappedData[P_MATURATION], 10);
    }

    operation[P_OP_TYPE] = parseInt(mappedData[P_OP_TYPE], 10); // multi-op

    operation[P_ACCOUNT_NUMBER] = null;

    if (mappedData[P_ACCOUNT_NUMBER] !== undefined) {
      operation[P_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_ACCOUNT_NUMBER]);
    }

    operation[P_OP_DESCRIPTION] = mappedData[P_OP_DESCRIPTION];
    operation[P_AMOUNT] = new Currency(mappedData[P_AMOUNT]);
    operation[P_FEE] = new Currency(mappedData[P_FEE]);
    operation[P_BALANCE] = null;

    if (mappedData[P_BALANCE] !== undefined) {
      operation[P_BALANCE] = new Currency(mappedData[P_BALANCE]);
    }

    operation[P_OP_HASH] = null;

    if (mappedData[P_OP_HASH] !== undefined) {
      operation[P_OP_HASH] = BC.fromHex(mappedData[P_OP_HASH]);

      if (operation[P_OP_TYPE] !== Operation.BLOCKCHAIN_REWARD) {
        operation[P_OP_HASH] = opHashCoder.decodeFromBytes(operation[P_OP_HASH]);
      }
    }

    operation[P_OLD_OP_HASH] = null;

    if (mappedData[P_OLD_OP_HASH] !== undefined) {
      operation[P_OLD_OP_HASH] = BC.fromHex(mappedData[P_OLD_OP_HASH]);
    }

    operation[P_SUB_TYPE] = mappedData[P_SUB_TYPE];
    operation[P_SIGNER_ACCOUNT_NUMBER] = null;

    if (mappedData[P_SIGNER_ACCOUNT_NUMBER] !== undefined) {
      operation[P_SIGNER_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_SIGNER_ACCOUNT_NUMBER]);
    } // eslint-disable-next-line no-multi-assign


    operation[P_SENDERS] = [];
    operation[P_RECEIVERS] = [];
    operation[P_CHANGERS] = []; // loop given data and initialize objects

    mappedData[P_SENDERS].forEach(s => {
      operation[P_SENDERS].push(operation[P_SENDER_CLASS].createFromRPC(s));
    });
    mappedData[P_RECEIVERS].forEach(r => {
      operation[P_RECEIVERS].push(operation[P_RECEIVER_CLASS].createFromRPC(r));
    });
    mappedData[P_CHANGERS].forEach(c => {
      operation[P_CHANGERS].push(operation[P_CHANGER_CLASS].createFromRPC(c));
    });
    return operation;
  }
  /**
   * Gets an indicator whether the operation was valid.
   *
   * @returns {Boolean}
   */


  get isValid() {
    return this[P_IS_VALID];
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


  get blockNumber() {
    return this[P_BLOCK_NUMBER];
  }
  /**
   * Gets the time of the operation.
   *
   * @returns {Number}
   */


  get blockTime() {
    return this[P_BLOCK_TIME];
  }
  /**
   * Gets the position inside a block.
   *
   * @returns {Number}
   */


  get opBlock() {
    return this[P_OP_BLOCK];
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
    return this[P_OP_TYPE];
  }
  /**
   * Gets the account.
   *
   * @returns {AccountNumber}
   */


  get accountNumber() {
    return this[P_ACCOUNT_NUMBER];
  }
  /**
   * Gets a textual representation of the operation.
   *
   * @returns {String}
   */


  get opDescription() {
    return this[P_OP_DESCRIPTION];
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
    return this[P_OP_HASH];
  }
  /**
   * Gets the <= V2 operation Hash.
   *
   * @returns {BC|null}
   */


  get oldOpHash() {
    return this[P_OLD_OP_HASH];
  }
  /**
   * Gets the subtype.
   *
   * @returns {String}
   */


  get subType() {
    return this[P_SUB_TYPE];
  }
  /**
   * Gets the signer account number.
   *
   * @returns {AccountNumber|null}
   */


  get signerAccountNumber() {
    return this[P_SIGNER_ACCOUNT_NUMBER];
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
   * Gets the payload type identifier.
   *
   * @returns {Number}
   */


  get payloadType() {
    return this[P_PAYLOAD_TYPE];
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
    return this[P_OP_TYPE] === Operation.BLOCKCHAIN_REWARD;
  }
  /**
   * Gets a value indicating whether the operation is a TRANSACTION operation.
   *
   * @returns {boolean}
   */


  isTransaction() {
    return this[P_OP_TYPE] === Operation.TRANSACTION;
  }
  /**
   * Gets a value indicating whether the operation is a CHANGE_KEY operation.
   *
   * @returns {boolean}
   */


  isChangeKey() {
    return this[P_OP_TYPE] === Operation.CHANGE_KEY;
  }
  /**
   * Gets a value indicating whether the operation is a RECOVER_FUNDS operation.
   *
   * @returns {boolean}
   */


  isRecoverFunds() {
    return this[P_OP_TYPE] === Operation.RECOVER_FUNDS;
  }
  /**
   * Gets a value indicating whether the operation is a LIST_FOR_SALE operation.
   *
   * @returns {boolean}
   */


  isListForSale() {
    return this[P_OP_TYPE] === Operation.LIST_FOR_SALE;
  }
  /**
   * Gets a value indicating whether the operation is a DELIST operation.
   *
   * @returns {boolean}
   */


  isDelist() {
    return this[P_OP_TYPE] === Operation.DELIST;
  }
  /**
   * Gets a value indicating whether the operation is a BUY operation.
   *
   * @returns {boolean}
   */


  isBuy() {
    return this[P_OP_TYPE] === Operation.BUY;
  }
  /**
   * Gets a value indicating whether the operation is a CHANGE_KEY_ACCOUNT operation.
   *
   * @returns {boolean}
   */


  isChangeKeyAccount() {
    return this[P_OP_TYPE] === Operation.CHANGE_KEY_ACCOUNT;
  }
  /**
   * Gets a value indicating whether the operation is a CHANGE_ACCOUNT_INFO operation.
   *
   * @returns {boolean}
   */


  isChangeAccountInfo() {
    return this[P_OP_TYPE] === Operation.CHANGE_ACCOUNT_INFO;
  }
  /**
   * Gets a value indicating whether the operation is a MULTI_OPERATION operation.
   *
   * @returns {boolean}
   */


  isMultiOperation() {
    return this[P_OP_TYPE] === Operation.MULTI_OPERATION;
  }
  /**
   * Gets a value indicating whether the operation is a DATA operation.
   *
   * @returns {boolean}
   */


  isData() {
    return this[P_OP_TYPE] === Operation.DATA;
  }
  /**
   * Gets a value indicating whether the op is pending.
   *
   * @returns {boolean}
   */


  isPending() {
    return this[P_BLOCK_NUMBER] === 0;
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

/***/ "./src/Objects/Receiver.js":
/*!*********************************!*\
  !*** ./src/Objects/Receiver.js ***!
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
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const AccountNumber = __webpack_require__(/*! ./../Types/AccountNumber */ "./src/Types/AccountNumber.js");

const Currency = __webpack_require__(/*! ./../Types/Currency */ "./src/Types/Currency.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const P_ACCOUNT_NUMBER = Symbol('account');
const P_AMOUNT = Symbol('amount_s');
const P_PAYLOAD = Symbol('payload');
const P_PAYLOAD_TYPE = Symbol('payload_type');
const ALL_PROPS = [P_ACCOUNT_NUMBER, P_AMOUNT, P_PAYLOAD, P_PAYLOAD_TYPE];
/**
 * Represents a receiver in an operation.
 */

class Receiver extends Abstract {
  /**
   * Creates a new instance of the Receiver class.
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let receiver = new this(data);
    let mappedData = receiver.mapInitializationDataWithProperties(ALL_PROPS);
    receiver[P_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_ACCOUNT_NUMBER]);
    receiver[P_AMOUNT] = new Currency(mappedData[P_AMOUNT]);
    receiver[P_PAYLOAD] = BC.fromHex(mappedData[P_PAYLOAD]);
    receiver[P_PAYLOAD_TYPE] = parseInt(mappedData[P_PAYLOAD_TYPE], 10);
    return receiver;
  }
  /**
   * Gets the account of the receiver.
   *
   * @returns {AccountNumber}
   */


  get accountNumber() {
    return this[P_ACCOUNT_NUMBER];
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
  /**
   * Gets the payload type identifier.
   *
   * @returns {Number}
   */


  get payloadType() {
    return this[P_PAYLOAD_TYPE];
  }

}

module.exports = Receiver;

/***/ }),

/***/ "./src/Objects/Sender.js":
/*!*******************************!*\
  !*** ./src/Objects/Sender.js ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const AccountNumber = __webpack_require__(/*! ./../Types/AccountNumber */ "./src/Types/AccountNumber.js");

const Currency = __webpack_require__(/*! ./../Types/Currency */ "./src/Types/Currency.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const P_ACCOUNT_NUMBER = Symbol('account');
const P_AMOUNT = Symbol('amount_s');
const P_PAYLOAD = Symbol('payload');
const P_PAYLOAD_TYPE = Symbol('payload_type');
const P_N_OPERATION = Symbol('n_operation');
const ALL_PROPS = [P_ACCOUNT_NUMBER, P_AMOUNT, P_PAYLOAD, P_PAYLOAD_TYPE, P_N_OPERATION];
/**
 * Represents a sender in an operation.
 */

class Sender extends Abstract {
  /**
   * Creates a new instance of the Sender class.
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let sender = new this(data);
    let mappedData = sender.mapInitializationDataWithProperties(ALL_PROPS);
    sender[P_N_OPERATION] = parseInt(mappedData[P_N_OPERATION], 10);
    sender[P_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_ACCOUNT_NUMBER]);
    sender[P_AMOUNT] = new Currency(mappedData[P_AMOUNT]);
    sender[P_PAYLOAD] = BC.fromHex(mappedData[P_PAYLOAD]);
    sender[P_PAYLOAD_TYPE] = parseInt(mappedData[P_PAYLOAD_TYPE], 10);
    return sender;
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


  get accountNumber() {
    return this[P_ACCOUNT_NUMBER];
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
  /**
   * Gets the payload type identifier.
   *
   * @returns {Number}
   */


  get payloadType() {
    return this[P_PAYLOAD_TYPE];
  }

}

module.exports = Sender;

/***/ }),

/***/ "./src/Objects/SignedMessage.js":
/*!**************************************!*\
  !*** ./src/Objects/SignedMessage.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const PublicKeyCoder = __webpack_require__(/*! ./../Coding/Pascal/Keys/PublicKey */ "./src/Coding/Pascal/Keys/PublicKey.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const P_DIGEST = Symbol('digest');
const P_PUBLIC_KEY = Symbol('enc_pubkey');
const P_SIGNATURE = Symbol('signature');
const ALL_PROPS = [P_DIGEST, P_PUBLIC_KEY, P_SIGNATURE];
/**
 * Represents a sender in an operation.
 */

class SignedMessage extends Abstract {
  /**
     * Creates a new instance of the Sender class.
     *
     * @param {Object} data
     */
  static createFromObject(data) {
    let signedMessage = new this(data);
    let mappedData = signedMessage.mapInitializationDataWithProperties(ALL_PROPS);
    signedMessage[P_DIGEST] = BC.fromHex(mappedData[P_DIGEST]);

    if (mappedData[P_PUBLIC_KEY] !== undefined) {
      signedMessage[P_PUBLIC_KEY] = new PublicKeyCoder().decodeFromBytes(BC.fromHex(mappedData[P_PUBLIC_KEY]));
    } else {
      // TODO: edge case when mapping
      signedMessage[P_PUBLIC_KEY] = new PublicKeyCoder().decodeFromBase58(data.b58_pubkey);
    }

    signedMessage[P_SIGNATURE] = BC.fromHex(mappedData[P_SIGNATURE]);
    return signedMessage;
  }
  /**
     * Gets the digest.
     *
     * @returns {BC}
     */


  get digest() {
    return this[P_DIGEST];
  }
  /**
     * Gets the public key.
     *
     * @returns {PublicKey}
     */


  get publicKey() {
    return this[P_PUBLIC_KEY];
  }
  /**
     * Gets the signature.
     *
     * @returns {BC}
     */


  get signature() {
    return this[P_SIGNATURE];
  }

}

module.exports = SignedMessage;

/***/ }),

/***/ "./src/Objects/SignedOperation.js":
/*!****************************************!*\
  !*** ./src/Objects/SignedOperation.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const Currency = __webpack_require__(/*! ./../Types/Currency */ "./src/Types/Currency.js");

const P_RAW_OPERATIONS = Symbol('rawoperations');
const P_COUNT_OPERATIONS = Symbol('operations');
const P_AMOUNT = Symbol('amount_s');
const P_FEE = Symbol('fee_s');
const ALL_PROPS = [P_RAW_OPERATIONS, P_COUNT_OPERATIONS, P_AMOUNT, P_FEE];
/**
 * Represents a signed operation.
 */

class SignedOperation extends Abstract {
  /**
   * Creates a new instance of the SignedOperation class.
   *
   * @param {Object} data
   */
  static createFromObject(data) {
    let signedOperation = new this(data);
    let mappedData = signedOperation.mapInitializationDataWithProperties(ALL_PROPS);
    signedOperation[P_RAW_OPERATIONS] = BC.fromHex(mappedData[P_RAW_OPERATIONS]);
    signedOperation[P_COUNT_OPERATIONS] = parseInt(mappedData[P_COUNT_OPERATIONS], 10);
    signedOperation[P_FEE] = new Currency(mappedData[P_FEE]);
    signedOperation[P_AMOUNT] = new Currency(mappedData[P_AMOUNT]);
    return signedOperation;
  }
  /**
   * Gets the signed raw operation(s)
   *
   * @return {BC}
   */


  get rawOperations() {
    return this[P_RAW_OPERATIONS];
  }
  /**
   * Gets the number of operations in rawoperations.
   *
   * @return {Number}
   */


  get countOperations() {
    return this[P_COUNT_OPERATIONS];
  }
  /**
   * Gets the accumulated amount.
   *
   * @return {Currency}
   */


  get amount() {
    return this[P_AMOUNT];
  }
  /**
   * Gets the accumulated fee.
   *
   * @return {Currency}
   */


  get fee() {
    return this[P_FEE];
  }

}

module.exports = SignedOperation;

/***/ }),

/***/ "./src/Objects/WalletPublicKey.js":
/*!****************************************!*\
  !*** ./src/Objects/WalletPublicKey.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Objects/Abstract.js");

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const PublicKeyCoder = __webpack_require__(/*! ./../Coding/Pascal/Keys/PublicKey */ "./src/Coding/Pascal/Keys/PublicKey.js");

const P_NAME = Symbol('name');
const P_PUBLIC_KEY = Symbol('enc_pubkey');
const P_CAN_USE = Symbol('can_use');
const ALL_PROPS = [P_NAME, P_PUBLIC_KEY, P_CAN_USE];
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

/***/ }),

/***/ "./src/Objects/index.js":
/*!******************************!*\
  !*** ./src/Objects/index.js ***!
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
module.exports = {
  Account: __webpack_require__(/*! ./Account */ "./src/Objects/Account.js"),
  Block: __webpack_require__(/*! ./Block */ "./src/Objects/Block.js"),
  Changer: __webpack_require__(/*! ./Changer */ "./src/Objects/Changer.js"),
  Connection: __webpack_require__(/*! ./Connection */ "./src/Objects/Connection.js"),
  NetProtocol: __webpack_require__(/*! ./NetProtocol */ "./src/Objects/NetProtocol.js"),
  NetStats: __webpack_require__(/*! ./NetStats */ "./src/Objects/NetStats.js"),
  NodeServer: __webpack_require__(/*! ./NodeServer */ "./src/Objects/NodeServer.js"),
  NodeStatus: __webpack_require__(/*! ./NodeStatus */ "./src/Objects/NodeStatus.js"),
  Operation: __webpack_require__(/*! ./Operation */ "./src/Objects/Operation.js"),
  Receiver: __webpack_require__(/*! ./Receiver */ "./src/Objects/Receiver.js"),
  Sender: __webpack_require__(/*! ./Sender */ "./src/Objects/Sender.js"),
  SignedMessage: __webpack_require__(/*! ./SignedMessage */ "./src/Objects/SignedMessage.js"),
  SignedOperation: __webpack_require__(/*! ./SignedOperation */ "./src/Objects/SignedOperation.js"),
  WalletPublicKey: __webpack_require__(/*! ./WalletPublicKey */ "./src/Objects/WalletPublicKey.js")
};

/***/ }),

/***/ "./src/PascalInfo.js":
/*!***************************!*\
  !*** ./src/PascalInfo.js ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Currency = __webpack_require__(/*! ./Types/Currency */ "./src/Types/Currency.js");
/**
 * Gets information about forks and features.
 */


class PascalInfo {
  /**
   * Gets the min fee.
   *
   * @param {Number|null} block
   * @returns {Currency}
   * @constructor
   */
  static MIN_FEE(block = null) {
    return Currency.fromMolina(1);
  }
  /**
   * Gets the block number when 50% inflation reduction was introduced.
   *
   * @returns {Number}
   * @constructor
   */


  static get PIP_0010() {
    return 210240;
  }
  /**
   * Gets the block number when PIP-10 was activated.
   *
   * @returns {Number}
   * @constructor
   */


  static get INFLATION_REDUCTION() {
    return PascalInfo.PIP_0010;
  }
  /**
   * Gets a value indicating whether the given block has inflation reduction
   * activated (PIP-10).
   *
   * @param {number} block
   * @returns {boolean}
   */


  static isInflationReduction(block) {
    return block >= PascalInfo.INFLATION_REDUCTION;
  }
  /**
   * Gets the block number when RandomHash was activated.
   *
   * @returns {Number}
   * @constructor
   */


  static get PIP_0009() {
    return 260000;
  }
  /**
   * Gets the block number when RandomHash was activated.
   *
   * @returns {Number}
   * @constructor
   */


  static get RANDOM_HASH() {
    return PascalInfo.PIP_0009;
  }
  /**
   * Gets a value indicating if randomhash was active at the given block.
   *
   * @param {Number} block
   * @returns {boolean}
   */


  static isRandomHash(block) {
    return block >= PascalInfo.RANDOM_HASH;
  }
  /**
   * Gets the block number when developer reward was introduced.
   *
   * @returns {Number}
   * @constructor
   */


  static get PIP_0011() {
    return 210000;
  }
  /**
   * Gets the block number when developer reward was introduced.
   *
   * @returns {Number}
   * @constructor
   */


  static get DEVELOPER_REWARD() {
    return PascalInfo.PIP_0011;
  }
  /**
   * Gets a value indicating whether the given block was mined with activated
   * developer award.
   *
   * @param {number} block
   * @returns {boolean}
   */


  static isDeveloperReward(block) {
    return block >= PascalInfo.DEVELOPER_REWARD;
  }
  /**
   * Gets the max payload length in bytes.
   *
   * @return {number}
   * @constructor
   */


  static get MAX_PAYLOAD_LENGTH() {
    return 255;
  }

}

module.exports = PascalInfo;

/***/ }),

/***/ "./src/Sha.js":
/*!********************!*\
  !*** ./src/Sha.js ***!
  \********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


const sha256 = __webpack_require__(/*! mipher/dist/sha256 */ "../../node_modules/mipher/dist/sha256.js");

const sha512 = __webpack_require__(/*! mipher/dist/sha512 */ "../../node_modules/mipher/dist/sha512.js");

const BC = __webpack_require__(/*! ./BC */ "./src/BC.js");
/**
 * Holds methods to hash.
 */


class Sha {
  /**
   * Calculates the sha256 hash from the given buffers.
   *
   * @param {...BC} buffers
   * @returns {BC}
   */
  static sha256(...buffers) {
    const hasher = new sha256.SHA256();
    buffers.forEach(buffer => hasher.update(buffer.buffer));
    return new BC(Buffer.from(hasher.digest()));
  }
  /**
   * Calculates the sha512 hash from the given buffers.
   *
   * @param {...BC} buffers
   * @returns {Buffer}
   */


  static sha512(...buffers) {
    const hasher = new sha512.SHA512();
    buffers.forEach(buffer => hasher.update(buffer.buffer));
    return new BC(Buffer.from(hasher.digest()));
  }

}

module.exports = Sha;

/***/ }),

/***/ "./src/Types/AccountName.js":
/*!**********************************!*\
  !*** ./src/Types/AccountName.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Util = __webpack_require__(/*! ../Util */ "./src/Util.js");

const P_VALUE = Symbol('value'); // the list of characters to escape.

const CHARS_TO_ESCAPE = '(){}[]:"<>'.split('');
const REGEX_TO_ESCAPE = `(${CHARS_TO_ESCAPE.map(c => Util.escapeRegex(c)).join('|')})`;
const ALLOWED_ALL = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+{}[]_:"|<>,.?/~'.split('');
const ALLOWED_START = ALLOWED_ALL.slice(10);
const MAX_LENGTH = 64;
/**
 * AccountName encoding for account names.
 */

class AccountName {
  /**
   * Constructor
   * @param {String|AccountName} value
   */
  constructor(value) {
    if (value instanceof AccountName) {
      this[P_VALUE] = value.toString();
    } else {
      this[P_VALUE] = AccountName.validate(value);
    }
  }
  /**
   * Validates a string.
   *
   * @param {String} value
   * @return {String}
     */


  static validate(value) {
    if (value.length === 0) {
      return value;
    }

    if (value.length < 3) {
      throw new Error('Invalid account name, must be at least 3 characters long.');
    }

    if (value.length > 64) {
      throw new Error('Invalid account name, can only be 64 characters max.');
    }

    for (let pos = 0; pos < value.length; pos++) {
      if (pos === 0 && ALLOWED_START.indexOf(value[pos]) === -1) {
        throw new Error(`Invalid AccountName encoding - character ${value[pos]} not allowed at position 0`);
      } else if (pos > 0 && ALLOWED_ALL.indexOf(value[pos]) === -1) {
        throw new Error(`Invalid AccountName encoding - character ${value[pos]} not allowed at position ${pos}`);
      }
    }

    return value;
  }
  /**
   * Gets the string value.
   *
   * @returns {String}
   */


  toString() {
    return this[P_VALUE];
  }
  /**
   * Gets an escaped string representation for EPasa usage.
   *
   * @returns {*}
   */


  toStringEscaped() {
    return this[P_VALUE].replace(new RegExp(REGEX_TO_ESCAPE, 'gm'), '\\$1');
  }
  /**
   * Gets a value indicating whether the current char c1 is an escape modifier
   * and the second is in the list of chars to escape.
   *
   * @param {String} c1
   * @param {String} c2
   * @returns {boolean}
   */


  static isEscape(c1, c2) {
    return c1 === '\\' && CHARS_TO_ESCAPE.indexOf(c2) > -1;
  }

}

module.exports = AccountName;

/***/ }),

/***/ "./src/Types/AccountNumber.js":
/*!************************************!*\
  !*** ./src/Types/AccountNumber.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const PascalInfo = __webpack_require__(/*! ../PascalInfo */ "./src/PascalInfo.js");

const P_ACCOUNT = Symbol('account');
const P_CHECKSUM = Symbol('checksum');
const P_CREATED_IN_BLOCK = Symbol('created_in_block');
const P_IS_FOUNDATION_REWARD = Symbol('is_foundation_reward');
/**
 * A simple type that holds an account number in a reliable way.
 */

class AccountNumber {
  /**
   * Creates a new AccountNumber instance, either from an account string
   * without checksum (which can be a number), an account string with checksum
   * or another account instance.
   *
   * @param {String|Number|AccountNumber|Account} account
   */
  constructor(account) {
    if (account instanceof AccountNumber) {
      this[P_ACCOUNT] = account[P_ACCOUNT];
      this[P_CHECKSUM] = account[P_CHECKSUM];
    } else if (typeof account === 'string') {
      const splitted = account.split('-');
      splitted.map(s => {
        if (isNaN(s) || parseInt(s, 10).toString() !== s) {
          throw new Error(`Invalid account number part: ${s}`);
        }
      });

      if (splitted.length === 2) {
        this[P_ACCOUNT] = parseInt(splitted[0], 10);
        this[P_CHECKSUM] = parseInt(splitted[1], 10);

        if (this[P_CHECKSUM] !== AccountNumber.calculateChecksum(this[P_ACCOUNT])) {
          throw new Error(`Invalid checksum for account ${this[P_ACCOUNT]}`);
        }
      } else {
        this[P_ACCOUNT] = parseInt(account, 10);
        this[P_CHECKSUM] = AccountNumber.calculateChecksum(this[P_ACCOUNT]);
      }
    } else if (typeof account === 'number') {
      this[P_ACCOUNT] = account;
      this[P_CHECKSUM] = AccountNumber.calculateChecksum(this[P_ACCOUNT]);
    } else {
      throw new Error(`Unable to parse Account: ${account.toString()}`);
    }

    this[P_CREATED_IN_BLOCK] = Math.floor(this[P_ACCOUNT] / 5);
    this[P_IS_FOUNDATION_REWARD] = PascalInfo.isDeveloperReward(this[P_CREATED_IN_BLOCK]) && this[P_ACCOUNT] % 5 === 4;
  }
  /**
   * Gets the account number.
   *
   * @returns {Number}
   */


  get account() {
    return this[P_ACCOUNT];
  }
  /**
   * Gets the checksum of the account.
   *
   * @returns {Number}
   */


  get checksum() {
    return this[P_CHECKSUM];
  }
  /**
   * Gets the block number the account was created in.
   *
   * @returns {Number}
   */


  get createdInBlock() {
    return this[P_CREATED_IN_BLOCK];
  }
  /**
   * Gets a value indicating whether the foundation got this account initially.
   *
   * @returns {Boolean}
   */


  get isFoundationReward() {
    return this[P_IS_FOUNDATION_REWARD];
  }
  /**
   * Gets the account string.
   *
   * @returns {string}
   */


  toString() {
    return `${this.account}-${this.checksum}`;
  }
  /**
   * Gets a value indicating whether the given account equals the current
   * account.
   *
   * @param {AccountNumber|String|Number} accountNumber
   * @returns {boolean}
   */


  equals(accountNumber) {
    return accountNumber !== null && this.toString() === accountNumber.toString();
  }
  /**
   * Calculates the checksum for the given account number.
   *
   * @param {Number} account
   * @returns {Number}
   */


  static calculateChecksum(account) {
    return account * 101 % 89 + 10;
  }

}

module.exports = AccountNumber;

/***/ }),

/***/ "./src/Types/Currency.js":
/*!*******************************!*\
  !*** ./src/Types/Currency.js ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");

const P_VALUE = Symbol('value');

function toFixed(x) {
  let base = new BN(10).pow(new BN(4));
  let dm = x.divmod(base);
  let mod = dm.mod.toString(10, 4);
  let m = dm.div.toString();
  let isNegative = false;

  if (x.toString().substr(0, 1) === '-') {
    if (m.substr(0, 1) === '-') {
      m = m.substr(1);
    }

    if (mod.substr(0, 1) === '-') {
      mod = mod.substr(1);
    }

    isNegative = true;
  }

  return `${isNegative ? '-' : ''}${m}.${mod}`;
}
/**
 * A simple wrapper around bignumber for the pascal currency and
 * basic math functions.
 */


class Currency {
  /**
     * Creates a new Currency instance.
     *
     * @param {Number|String|BigNumber|Currency} value
     */
  constructor(value) {
    let pasc = value;

    if (pasc instanceof Currency) {
      this[P_VALUE] = pasc.value;
      return;
    }

    if (BN.isBN(pasc)) {
      this[P_VALUE] = pasc;
      return;
    }

    pasc = pasc.toString();
    pasc = pasc.split(',').join(''); // remove commas
    // now split the '.'

    const ten = new BN(10);
    const base = ten.pow(new BN(4)); // Is it negative?

    let negative = pasc.substring(0, 1) === '-';

    if (negative) {
      pasc = pasc.substring(1);
    }

    if (pasc === '.') {
      throw new Error(`Invalid value ${pasc} cannot be converted to` + ' base unit with 4 decimals.');
    } // Split it into a whole and fractional part


    let comps = pasc.split('.');

    if (comps.length > 2) {
      throw new Error('Too many decimal points');
    }

    let whole = comps[0],
        fraction = comps[1];

    if (!whole) {
      whole = '0';
    }

    if (!fraction) {
      fraction = '0';
    }

    if (fraction.length > 4) {
      throw new Error('Too many decimal places');
    }

    while (fraction.length < 4) {
      fraction += '0';
    }

    whole = new BN(whole);
    fraction = new BN(fraction);
    let molina = whole.mul(base).add(fraction);

    if (negative) {
      molina = molina.neg();
    }

    this[P_VALUE] = new BN(molina.toString(10), 10);
  }

  static fromMolina(molina) {
    return new Currency(new BN(molina.toString()));
  }
  /**
     * Gets the BigNumber instance.
     *
     * @returns {BigNumber}
     */


  get value() {
    return this[P_VALUE];
  }
  /**
     * Gets the pascal value as a string.
     *
     * @returns {string}
     */


  toString() {
    return toFixed(this[P_VALUE]);
  }
  /**
   * Gets an optimized pascal value with less zeros as possible.
   *
   * @returns {string}
   */


  toStringOpt(decimals = 4) {
    return toFixed(this[P_VALUE]).replace(new RegExp('[0]+$'), '').replace(new RegExp('[\.]+$'), '');
  }
  /**
     * Gets the pascal value as a string.
     *
     * @returns {Number}
     */


  toMolina() {
    return this[P_VALUE].toString();
  }
  /**
   * Adds the given value to the current value and returns a **new**
   * value.
   *
   * @param {Number|String|BigNumber|Currency} addValue
   * @returns {Currency}
   */


  add(addValue) {
    return new Currency(this.value.add(new Currency(addValue).value));
  }
  /**
   * Multiplies the value.
   *
   * @param {Number|String|BigNumber|Currency} addValue
   * @returns {Currency}
   */


  mul(val) {
    return Currency.fromMolina(this.value.mul(new BN(val)));
  }
  /**
   * Divides the value.
   *
   * @param {Number|String|BigNumber|Currency} val
   * @returns {Currency}
   */


  div(val) {
    return Currency.fromMolina(this.value.div(new BN(val)));
  }
  /**
     * Subtracts the given value from the current value and returns a
     * **new** value.
     *
     * @param {Currency} subValue
     * @returns {Currency}
     */


  sub(subValue) {
    return new Currency(this.value.sub(new Currency(subValue).value));
  }
  /**
     * Gets a positive variant of the value. If the value is already
     * positive, the current instance will be returned, else a new
     * instance.
     *
     * @returns {Currency}
     */


  toPositive() {
    if (this[P_VALUE].isNeg() === true) {
      return new Currency(this[P_VALUE].neg());
    }

    return this;
  }
  /**
   * Gets a value indicating whether the given value is equal to the current
   * value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */


  eq(value) {
    return this[P_VALUE].eq(new Currency(value).value);
  }
  /**
   * Gets a value indicating whether the given value is greater than the current
   * value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */


  gt(value) {
    return this[P_VALUE].gt(new Currency(value).value);
  }
  /**
   * Gets a value indicating whether the given value is lower than the current
   * value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */


  lt(value) {
    return this[P_VALUE].lt(new Currency(value).value);
  }
  /**
   * Gets a value indicating whether the given value is lower or equal to the
   * current value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */


  lteq(value) {
    return this[P_VALUE].lte(new Currency(value).value);
  }
  /**
   * Gets a value indicating whether the given value is greater or equal to the
   * current value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */


  gteq(value) {
    return this[P_VALUE].gte(new Currency(value).value);
  }

  get bn() {
    return this[P_VALUE];
  }
  /**
     * Gets the serialized version of this instance.
     *
     * @returns {Object}
     */


  serialize() {
    return {
      pascal: this.toStringOpt(),
      molina: this.toMolina()
    };
  }

}

module.exports = Currency;

/***/ }),

/***/ "./src/Types/GUID.js":
/*!***************************!*\
  !*** ./src/Types/GUID.js ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

const BC = __webpack_require__(/*! ./../BC */ "./src/BC.js");

const MipherRandom = __webpack_require__(/*! mipher */ "../../node_modules/mipher/dist/index.js").Random;

const P_PART_1 = Symbol('part_1');
const P_PART_2 = Symbol('part_2');
const P_PART_3 = Symbol('part_3');
const P_PART_4 = Symbol('part_4');
const P_PART_5 = Symbol('part_5');
/**
 * Holds a guid.
 */

class GUID {
  constructor(guid) {
    if (guid instanceof GUID) {
      this[P_PART_1] = guid.part1;
      this[P_PART_2] = guid.part2;
      this[P_PART_3] = guid.part3;
      this[P_PART_4] = guid.part4;
      this[P_PART_5] = guid.part5;
    } else if (guid instanceof BC) {
      this[P_PART_1] = guid.slice(0, 4);
      this[P_PART_2] = guid.slice(4, 6);
      this[P_PART_3] = guid.slice(6, 8);
      this[P_PART_4] = guid.slice(8, 10);
      this[P_PART_5] = guid.slice(10, 16);
    } else {
      if (guid.indexOf('-') > -1) {
        let splitted = guid.split('-');

        try {
          this[P_PART_1] = BC.fromHex(splitted[0]);
        } catch (e) {
          throw new Error(`Invalid GUID (part1): ${splitted[0]} -- ${e.message}`);
        }

        try {
          this[P_PART_2] = BC.fromHex(splitted[1]);
        } catch (e) {
          throw new Error(`Invalid GUID (part2): ${splitted[1]} -- ${e.message}`);
        }

        try {
          this[P_PART_3] = BC.fromHex(splitted[2]);
        } catch (e) {
          throw new Error(`Invalid GUID (part1): ${splitted[2]} -- ${e.message}`);
        }

        try {
          this[P_PART_4] = BC.fromHex(splitted[3]);
        } catch (e) {
          throw new Error(`Invalid GUID (part1): ${splitted[3]} -- ${e.message}`);
        }

        try {
          this[P_PART_5] = BC.fromHex(splitted[4]);
        } catch (e) {
          throw new Error(`Invalid GUID (part1): ${splitted[4]} -- ${e.message}`);
        }
      } else {
        this[P_PART_1] = BC.fromHex(guid.substring(0, 8));
        this[P_PART_2] = BC.fromHex(guid.substring(8, 12));
        this[P_PART_3] = BC.fromHex(guid.substring(12, 16));
        this[P_PART_4] = BC.fromHex(guid.substring(16, 20));
        this[P_PART_5] = BC.fromHex(guid.substring(20, 32));
      }
    }

    if (this[P_PART_1].length !== 4) {
      throw new Error('Invalid GUID (part1)');
    }

    if (this[P_PART_2].length !== 2) {
      throw new Error('Invalid GUID (part2)');
    }

    if (this[P_PART_3].length !== 2) {
      throw new Error('Invalid GUID (part3)');
    }

    if (this[P_PART_4].length !== 2) {
      throw new Error('Invalid GUID (part4)');
    }

    if (this[P_PART_5].length !== 6) {
      throw new Error('Invalid GUID (part5)');
    }
  }
  /**
   * Gets part position 1 of the guid.
   *
   * @return {BC}
   */


  get part1() {
    return this[P_PART_1];
  }
  /**
   * Gets part position 2 of the guid.
   *
   * @return {BC}
   */


  get part2() {
    return this[P_PART_2];
  }
  /**
   * Gets part position 3 of the guid.
   *
   * @return {BC}
   */


  get part3() {
    return this[P_PART_3];
  }
  /**
   * Gets part position 4 of the guid.
   *
   * @return {BC}
   */


  get part4() {
    return this[P_PART_4];
  }
  /**
   * Gets part position 5 of the guid.
   *
   * @return {BC}
   */


  get part5() {
    return this[P_PART_5];
  }
  /**
   * Gets the string represenation of a guid.
   *
   * @return {string}
   */


  toString() {
    return [this[P_PART_1], this[P_PART_2], this[P_PART_3], this[P_PART_4], this[P_PART_5]].map(p => p.toHex()).join('-');
  }

  toBC() {
    return BC.concat(this[P_PART_1], this[P_PART_2], this[P_PART_3], this[P_PART_4], this[P_PART_5]);
  }
  /**
   * Generates a new V4 GUID.
   *
   * @return {GUID}
   */


  static generate() {
    const randomGenerator = new MipherRandom();
    const uuid = new BC(Buffer.from(randomGenerator.get(16)));
    randomGenerator.stop();
    return new GUID(uuid);
  }

}

module.exports = GUID;

/***/ }),

/***/ "./src/Types/Keys/Curve.js":
/*!*********************************!*\
  !*** ./src/Types/Keys/Curve.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * The list of available curves in pascalcoin.
 */
const CURVES = {
  0: 'empty',
  714: 'secp256k1',
  715: 'p384',
  729: 'sect283k1',
  716: 'p521'
};
const XYL_PUBKEYS = {
  714: {
    x: 32,
    y: 32
  },
  715: {
    x: 48,
    y: 48
  },
  716: {
    x: 66,
    y: 66
  },
  729: {
    x: 36,
    y: 36
  },
  0: {
    x: 0,
    y: 0
  }
};
const L_PRIVKEYS = {
  714: 32,
  715: 48,
  716: 66,
  729: 36
};
const P_ID = Symbol('id');
const P_NAME = Symbol('name');
/**
 * Simple elliptic curve representation of keys in pascalcoin.
 */

class Curve {
  /**
   * Gets the curve name of the secp256k1 curve.
   *
   * @returns {string}
   * @constructor
   */
  static get CN_SECP256K1() {
    return 'secp256k1';
  }
  /**
   * Gets the curve name of the p384 curve.
   *
   * @returns {string}
   * @constructor
   */


  static get CN_P384() {
    return 'p384';
  }
  /**
   * Gets the curve name of the sect283k1 curve.
   *
   * @returns {string}
   * @constructor
   */


  static get CN_SECT283K1() {
    return 'sect283k1';
  }
  /**
   * Gets the curve name of the p521 curve.
   *
   * @returns {string}
   * @constructor
   */


  static get CN_P521() {
    return 'p521';
  }
  /**
   * Gets the curve id of the secp256k1 curve.
   *
   * @returns {string}
   * @constructor
   */


  static get CI_SECP256K1() {
    return 714;
  }
  /**
   * Gets the curve id of the p384 curve.
   *
   * @returns {string}
   * @constructor
   */


  static get CI_P384() {
    return 715;
  }
  /**
   * Gets the curve id of the sect283k1 curve.
   *
   * @returns {string}
   * @constructor
   */


  static get CI_SECT283K1() {
    return 729;
  }
  /**
   * Gets the curve id of the p521 curve.
   *
   * @returns {Number}
   * @constructor
   */


  static get CI_P521() {
    return 716;
  }
  /**
   * Constructor
   *
   * @param {Number|String} curve
   */


  constructor(curve) {
    if (typeof curve === 'number') {
      if (CURVES[curve] === undefined) {
        throw new Error(`Unknown curve: ${curve}`);
      }

      this[P_ID] = curve;
      this[P_NAME] = CURVES[curve];
    } else if (curve instanceof Curve) {
      this[P_ID] = curve.id;
      this[P_NAME] = curve.name;
    } else {
      if (Object.values(CURVES).indexOf(curve.toString()) === -1) {
        throw new Error(`Unknown curve: ${curve}`);
      }

      this[P_NAME] = curve.toString();
      this[P_ID] = parseInt(Object.keys(CURVES)[Object.values(CURVES).indexOf(this[P_NAME])], 10);
    }
  }
  /**
     * Gets the id of the curve.
     *
     * @returns {Number}
     */


  get id() {
    return this[P_ID];
  }
  /**
     * Gets the name of the curve.
     *
     * @returns {String}
     */


  get name() {
    return this[P_NAME];
  }
  /**
     * Gets the name of the curve.
     *
     * @returns {String}
     */


  toString() {
    return this.name;
  }
  /**
     * Gets the default curve.
     *
     * @returns {Curve}
     */


  static getDefaultCurve() {
    return new Curve(Curve.CI_SECP256K1);
  }
  /**
   * Gets the length of either x and y for validation.
   *
   * @returns {array}
   */


  xylPublicKey(xOrY) {
    return XYL_PUBKEYS[this.id][xOrY];
  }
  /**
   * Gets the length of either x and y for validation.
   *
   * @returns {array}
   */


  lPrivateKey() {
    return L_PRIVKEYS[this.id];
  }
  /**
   * Gets a value indicating whether the key is supported for signing /
   * generation etc.
   *
   * @returns {boolean}
   */


  get supported() {
    return this.id !== Curve.CI_SECT283K1 && this.id !== 0;
  }

}

module.exports = Curve;

/***/ }),

/***/ "./src/Types/Keys/KeyPair.js":
/*!***********************************!*\
  !*** ./src/Types/Keys/KeyPair.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const P_PRIVATE_KEY = Symbol('private_key');
const P_PUBLIC_KEY = Symbol('public_key');
const P_CURVE = Symbol('curve');
/**
 * Represents a private and public keypair.
 */

class KeyPair {
  /**
     * Creates a new private-public keypair instance.
     *
     * @param {PrivateKey} privateKey
     * @param {PublicKey} publicKey
     */
  constructor(privateKey, publicKey) {
    this[P_CURVE] = privateKey.curve;
    this[P_PRIVATE_KEY] = privateKey;
    this[P_PUBLIC_KEY] = publicKey;

    if (privateKey.curve.id !== publicKey.curve.id) {
      throw new Error('Mixed up curves between private an public key');
    }
  }
  /**
     * Gets the private key.
     *
     * @returns {PrivateKey}
     */


  get privateKey() {
    return this[P_PRIVATE_KEY];
  }
  /**
     * Gets the public key.
     *
     * @returns {PublicKey}
     */


  get publicKey() {
    return this[P_PUBLIC_KEY];
  }
  /**
     * Gets the curve used for the keypair.
     *
     * @returns {Curve}
     */


  get curve() {
    return this[P_CURVE];
  }

}

module.exports = KeyPair;

/***/ }),

/***/ "./src/Types/Keys/PrivateKey.js":
/*!**************************************!*\
  !*** ./src/Types/Keys/PrivateKey.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BC = __webpack_require__(/*! ../../BC */ "./src/BC.js");

const P_KEY = Symbol('key');
const P_CURVE = Symbol('curve');
/**
 * Represents a public key in pascalcoin.
 */

class PrivateKey {
  /**
     * Constructor
     *
     * @param {BC|Buffer|Uint8Array|String} key
     * @param {Curve} curve
     */
  constructor(key, curve) {
    this[P_KEY] = BC.from(key);
    this[P_CURVE] = curve;
    const privateKeyLength = curve.lPrivateKey();

    if (this[P_KEY].length > privateKeyLength) {
      throw new Error(`Invalid length for curve ${curve.name} - ` + `expected <= ${privateKeyLength}, got ${this[P_KEY].length}`);
    }
  }
  /**
     * Gets the key value.
     *
     * @returns {BC}
     */


  get key() {
    return this[P_KEY];
  }
  /**
     * Gets the ec key.
     *
     * @returns {BC}
     */


  get ec() {
    return this.key;
  }
  /**
     * Gets the used curve.
     *
     * @returns {Curve}
     */


  get curve() {
    return this[P_CURVE];
  }

}

module.exports = PrivateKey;

/***/ }),

/***/ "./src/Types/Keys/PublicKey.js":
/*!*************************************!*\
  !*** ./src/Types/Keys/PublicKey.js ***!
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
const BC = __webpack_require__(/*! ../../BC */ "./src/BC.js");

const Curve = __webpack_require__(/*! ./Curve */ "./src/Types/Keys/Curve.js");

const P_X = Symbol('x');
const P_XL = Symbol('xl');
const P_Y = Symbol('y');
const P_YL = Symbol('yl');
const P_CURVE = Symbol('curve');
/**
 * Represents a public key in pascalcoin.
 */

class PublicKey {
  /**
     * Constructor
     *
     * @param {BC|Buffer|Uint8Array|String} x
     * @param {BC|Buffer|Uint8Array|String} y
     * @param {Curve} curve
     */
  constructor(x, y, curve) {
    x = BC.from(x);
    y = BC.from(y);
    this[P_X] = x;
    this[P_Y] = y;
    this[P_XL] = x.length;
    this[P_YL] = y.length;
    this[P_CURVE] = curve;

    if (this[P_XL] > curve.xylPublicKey('x') || this[P_YL] > curve.xylPublicKey('y')) {
      throw new Error(`Invalid x and/or y length for curve ${curve.name} - ` + `expected <= X${curve.xylPublicKey('x')}:Y${curve.xylPublicKey('y')}, ` + `got X${this[P_XL]}:Y${this[P_YL]}`);
    }
  }
  /**
     * Gets the X value of the key.
     *
     * @returns {BC}
     */


  get x() {
    return this[P_X];
  }
  /**
     * Gets the y value of the key.
     *
     * @returns {BC}
     */


  get y() {
    return this[P_Y];
  }
  /**
     * Gets the length of X.
     *
     * @returns {Number}
     */


  get yl() {
    return this[P_YL];
  }
  /**
     * Gets the length of Y.
     *
     * @returns {Number}
     */


  get xl() {
    return this[P_XL];
  }
  /**
     * Gets the used curve.
     *
     * @returns {Curve}
     */


  get curve() {
    return this[P_CURVE];
  }
  /**
   * Gets the ec key.
   *
   * @returns {BC}
   */


  get ec() {
    return BC.concat(this.x, this.y);
  }
  /**
   * Gets the ecdh public key.
   *
   * @returns {BC}
   */


  get ecdh() {
    if (this.curve.id === Curve.CI_P521) {
      return BC.concat(BC.fromHex('0400'), this.x, BC.fromHex('00'), this.y);
    }

    return BC.concat(BC.fromHex('04'), this.x, this.y);
  }
  /**
     * Gets an empty public key instance.
     *
     * @returns {PublicKey}
     */


  static empty() {
    return new PublicKey(BC.fromString(''), BC.fromString(''), new Curve(0));
  }

}

module.exports = PublicKey;

/***/ }),

/***/ "./src/Types/Keys/index.js":
/*!*********************************!*\
  !*** ./src/Types/Keys/index.js ***!
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
module.exports = {
  Curve: __webpack_require__(/*! ./Curve */ "./src/Types/Keys/Curve.js"),
  PrivateKey: __webpack_require__(/*! ./PrivateKey */ "./src/Types/Keys/PrivateKey.js"),
  PublicKey: __webpack_require__(/*! ./PublicKey */ "./src/Types/Keys/PublicKey.js"),
  KeyPair: __webpack_require__(/*! ./KeyPair */ "./src/Types/Keys/KeyPair.js")
};

/***/ }),

/***/ "./src/Types/OperationHash.js":
/*!************************************!*\
  !*** ./src/Types/OperationHash.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BC = __webpack_require__(/*! ../BC */ "./src/BC.js");

const AccountNumber = __webpack_require__(/*! ./AccountNumber */ "./src/Types/AccountNumber.js");

const P_BLOCK = Symbol('block');
const P_ACCOUNT = Symbol('account');
const P_N_OPERATION = Symbol('nOperation');
const P_MD160 = Symbol('md160');
/**
 * Holds information about an operation hash.
 */

class OperationHash {
  /**
   * Constructor
   *
   * @param {Number} block
   * @param {Number} account
   * @param {Number} nOperation
   * @param {BC|Buffer|Uint8Array|String} md160
   */
  constructor(block, account, nOperation, md160) {
    this[P_BLOCK] = block;
    this[P_ACCOUNT] = new AccountNumber(account);
    this[P_N_OPERATION] = nOperation;
    this[P_MD160] = BC.from(md160);

    if (this[P_MD160].length !== 20) {
      throw new Error('Invalid operation hash - md160 size !== 20 bytes.');
    }
  }
  /**
   * Gets the account that executed the operation.
   *
   * @returns {AccountNumber}
   */


  get account() {
    return this[P_ACCOUNT];
  }
  /**
   * Gets the block number.
   *
   * @returns {Number}
   */


  get block() {
    return this[P_BLOCK];
  }
  /**
   * Gets the number of operations for the executing account.
   *
   * @returns {Number}
   */


  get nOperation() {
    return this[P_N_OPERATION];
  }
  /**
   * Gets the md160 of the op.
   *
   * @returns {BC}
   */


  get md160() {
    return this[P_MD160];
  }
  /**
   * Gets a value indicating whether the given ophash equals the current ophash.
   *
   * @param opHash
   * @param ignoreBlock
   * @return {boolean}
   */


  equals(opHash, ignoreBlock = false) {
    let blockResult = true;

    if (!ignoreBlock) {
      blockResult = this.block === opHash.block;
    }

    return blockResult && this.nOperation === opHash.nOperation && this.account.account === opHash.account.account && this.md160.equals(opHash.md160);
  }

}

module.exports = OperationHash;

/***/ }),

/***/ "./src/Types/index.js":
/*!****************************!*\
  !*** ./src/Types/index.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
module.exports = {
  AccountName: __webpack_require__(/*! ./AccountName */ "./src/Types/AccountName.js"),
  AccountNumber: __webpack_require__(/*! ./AccountNumber */ "./src/Types/AccountNumber.js"),
  Currency: __webpack_require__(/*! ./Currency */ "./src/Types/Currency.js"),
  OperationHash: __webpack_require__(/*! ./OperationHash */ "./src/Types/OperationHash.js"),
  GUID: __webpack_require__(/*! ./GUID */ "./src/Types/GUID.js"),
  Keys: __webpack_require__(/*! ./Keys */ "./src/Types/Keys/index.js")
};

/***/ }),

/***/ "./src/Util.js":
/*!*********************!*\
  !*** ./src/Util.js ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
class Util {
  /**
   * https://github.com/MauroJr/escape-regex/blob/master/index.js
   * Tests are not performed.
   *
   * @param {String} string
   * @returns {string}
   */

  /* istanbul ignore next: already tested in lib */
  static escapeRegex(string) {
    return ('' + string).replace(/([?!${}*:()|=^[\]\/\\.+])/g, '\\$1');
  }
  /**
   * Gets a value indicating whether the given value is a string.
   *
   * @param {*} s
   * @return {boolean}
   */


  static isString(s) {
    return Object.prototype.toString.call(s) === '[object String]';
  }
  /**
   * Gets a value indicating whether the given value is a Number.
   *
   * @param {*} n
   * @return {boolean}
   */


  static isNumber(n) {
    return Object.prototype.toString.call(n) === '[object Number]' && isNaN(n) === false;
  }

}

module.exports = Util;

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ben/Code/crypto/pascalcoin/untitled/packages/common/index.js */"./index.js");


/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ })

/******/ });
});
//# sourceMappingURL=common.node.js.map