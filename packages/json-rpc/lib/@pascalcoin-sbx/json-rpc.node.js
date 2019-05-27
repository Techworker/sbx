(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@pascalcoin-sbx/json-rpc", [], factory);
	else if(typeof exports === 'object')
		exports["@pascalcoin-sbx/json-rpc"] = factory();
	else
		root["@pascalcoin-sbx/json-rpc"] = factory();
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

/***/ "../../node_modules/base-x/index.js":
/*!******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/base-x/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.

const Buffer = __webpack_require__(/*! safe-buffer */ "../../node_modules/safe-buffer/index.js").Buffer

module.exports = function base (ALPHABET) {
  if (ALPHABET.length >= 255) throw new TypeError('Alphabet too long')

  const BASE_MAP = new Uint8Array(256)
  BASE_MAP.fill(255)

  for (let i = 0; i < ALPHABET.length; i++) {
    const x = ALPHABET.charAt(i)
    const xc = x.charCodeAt(0)

    if (BASE_MAP[xc] !== 255) throw new TypeError(x + ' is ambiguous')
    BASE_MAP[xc] = i
  }

  const BASE = ALPHABET.length
  const LEADER = ALPHABET.charAt(0)
  const FACTOR = Math.log(BASE) / Math.log(256) // log(BASE) / log(256), rounded up
  const iFACTOR = Math.log(256) / Math.log(BASE) // log(256) / log(BASE), rounded up

  function encode (source) {
    if (!Buffer.isBuffer(source)) throw new TypeError('Expected Buffer')
    if (source.length === 0) return ''

    // Skip & count leading zeroes.
    let zeroes = 0
    let length = 0
    let pbegin = 0
    const pend = source.length

    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++
      zeroes++
    }

    // Allocate enough space in big-endian base58 representation.
    const size = ((pend - pbegin) * iFACTOR + 1) >>> 0
    const b58 = new Uint8Array(size)

    // Process the bytes.
    while (pbegin !== pend) {
      let carry = source[pbegin]

      // Apply "b58 = b58 * 256 + ch".
      let i = 0
      for (let it = size - 1; (carry !== 0 || i < length) && (it !== -1); it--, i++) {
        carry += (256 * b58[it]) >>> 0
        b58[it] = (carry % BASE) >>> 0
        carry = (carry / BASE) >>> 0
      }

      if (carry !== 0) throw new Error('Non-zero carry')
      length = i
      pbegin++
    }

    // Skip leading zeroes in base58 result.
    let it = size - length
    while (it !== size && b58[it] === 0) {
      it++
    }

    // Translate the result into a string.
    let str = LEADER.repeat(zeroes)
    for (; it < size; ++it) str += ALPHABET.charAt(b58[it])

    return str
  }

  function decodeUnsafe (source) {
    if (typeof source !== 'string') throw new TypeError('Expected String')
    if (source.length === 0) return Buffer.alloc(0)

    let psz = 0

    // Skip leading spaces.
    if (source[psz] === ' ') return

    // Skip and count leading '1's.
    let zeroes = 0
    let length = 0
    while (source[psz] === LEADER) {
      zeroes++
      psz++
    }

    // Allocate enough space in big-endian base256 representation.
    const size = (((source.length - psz) * FACTOR) + 1) >>> 0 // log(58) / log(256), rounded up.
    const b256 = new Uint8Array(size)

    // Process the characters.
    while (source[psz]) {
      // Decode character
      let carry = BASE_MAP[source.charCodeAt(psz)]

      // Invalid character
      if (carry === 255) return

      let i = 0
      for (let it = size - 1; (carry !== 0 || i < length) && (it !== -1); it--, i++) {
        carry += (BASE * b256[it]) >>> 0
        b256[it] = (carry % 256) >>> 0
        carry = (carry / 256) >>> 0
      }

      if (carry !== 0) throw new Error('Non-zero carry')
      length = i
      psz++
    }

    // Skip trailing spaces.
    if (source[psz] === ' ') return

    // Skip leading zeroes in b256.
    let it = size - length
    while (it !== size && b256[it] === 0) {
      it++
    }

    const vch = Buffer.allocUnsafe(zeroes + (size - it))
    vch.fill(0x00, 0, zeroes)

    let j = zeroes
    while (it !== size) {
      vch[j++] = b256[it++]
    }

    return vch
  }

  function decode (string) {
    const buffer = decodeUnsafe(string)
    if (buffer) return buffer

    throw new Error('Non-base' + BASE + ' character')
  }

  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}


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

var basex = __webpack_require__(/*! base-x */ "../../node_modules/base-x/index.js")
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

module.exports = basex(ALPHABET)


/***/ }),

/***/ "../../node_modules/jayson/lib/client/browser.js":
/*!*******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/jayson/lib/client/browser.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
/***/ (function(module, exports) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;


/***/ }),

/***/ "../../node_modules/lodash/_getNative.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/_getNative.js ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assignIn */ "../../node_modules/lodash/assignIn.js");


/***/ }),

/***/ "../../node_modules/lodash/identity.js":
/*!*********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/lodash/identity.js ***!
  \*********************************************************************************/
/*! no static exports found */
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
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

/***/ "../../node_modules/node-fetch/lib/index.mjs":
/*!***************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/node-fetch/lib/index.mjs ***!
  \***************************************************************************************/
/*! exports provided: default, Headers, Request, Response, FetchError */
/*! all exports used */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchError", function() { return FetchError; });
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stream */ "stream");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! https */ "https");
/* harmony import */ var zlib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zlib */ "zlib");






// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = stream__WEBPACK_IMPORTED_MODULE_0__.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = stream__WEBPACK_IMPORTED_MODULE_0__.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof stream__WEBPACK_IMPORTED_MODULE_0__) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof stream__WEBPACK_IMPORTED_MODULE_0__) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof stream__WEBPACK_IMPORTED_MODULE_0__)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof stream__WEBPACK_IMPORTED_MODULE_0__ && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof stream__WEBPACK_IMPORTED_MODULE_0__) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http__WEBPACK_IMPORTED_MODULE_1__.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = url__WEBPACK_IMPORTED_MODULE_2__.parse;
const format_url = url__WEBPACK_IMPORTED_MODULE_2__.format;

const streamDestructionSupported = 'destroy' in stream__WEBPACK_IMPORTED_MODULE_0__.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof stream__WEBPACK_IMPORTED_MODULE_0__.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = stream__WEBPACK_IMPORTED_MODULE_0__.PassThrough;
const resolve_url = url__WEBPACK_IMPORTED_MODULE_2__.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https__WEBPACK_IMPORTED_MODULE_3__ : http__WEBPACK_IMPORTED_MODULE_1__).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof stream__WEBPACK_IMPORTED_MODULE_0__.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib__WEBPACK_IMPORTED_MODULE_4__.Z_SYNC_FLUSH,
				finishFlush: zlib__WEBPACK_IMPORTED_MODULE_4__.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib__WEBPACK_IMPORTED_MODULE_4__.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib__WEBPACK_IMPORTED_MODULE_4__.createInflate());
					} else {
						body = body.pipe(zlib__WEBPACK_IMPORTED_MODULE_4__.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib__WEBPACK_IMPORTED_MODULE_4__.createBrotliDecompress === 'function') {
				body = body.pipe(zlib__WEBPACK_IMPORTED_MODULE_4__.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

/* harmony default export */ __webpack_exports__["default"] = (fetch);



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

/***/ "../../node_modules/uuid/lib/bytesToUuid.js":
/*!**************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/uuid/lib/bytesToUuid.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
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

/***/ "../../node_modules/uuid/lib/rng.js":
/*!******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/uuid/lib/rng.js ***!
  \******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var crypto = __webpack_require__(/*! crypto */ "crypto");

module.exports = function nodeRNG() {
  return crypto.randomBytes(16);
};


/***/ }),

/***/ "../../node_modules/uuid/v4.js":
/*!*************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/uuid/v4.js ***!
  \*************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "../../node_modules/uuid/lib/rng.js");
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

/***/ "../common/index.js":
/*!**************************!*\
  !*** ../common/index.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Base58: __webpack_require__(/*! ./src/Base58 */ "../common/src/Base58.js"),
  BC: __webpack_require__(/*! ./src/BC */ "../common/src/BC.js"),
  Endian: __webpack_require__(/*! ./src/Endian */ "../common/src/Endian.js"),
  PascalCoinInfo: __webpack_require__(/*! ./src/PascalCoinInfo */ "../common/src/PascalCoinInfo.js"),
  Sha: __webpack_require__(/*! ./src/Sha */ "../common/src/Sha.js"),
  Util: __webpack_require__(/*! ./src/Util */ "../common/src/Util.js"),
  Types: __webpack_require__(/*! ./src/Types */ "../common/src/Types/index.js"),
  Coding: __webpack_require__(/*! ./src/Coding */ "../common/src/Coding/index.js")
};

/***/ }),

/***/ "../common/src/BC.js":
/*!***************************!*\
  !*** ../common/src/BC.js ***!
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
const Endian = __webpack_require__(/*! ./Endian */ "../common/src/Endian.js");

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
     * Gets the binary presentation of the hexa string.
     *
     * @returns {string}
     */


  toBinary() {
    return this[P_BUFFER].toString('binary');
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
  /**
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

/***/ "../common/src/Base58.js":
/*!*******************************!*\
  !*** ../common/src/Base58.js ***!
  \*******************************/
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

const BC = __webpack_require__(/*! ./BC */ "../common/src/BC.js");
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

/***/ "../common/src/Coding/AbstractType.js":
/*!********************************************!*\
  !*** ../common/src/Coding/AbstractType.js ***!
  \********************************************/
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
const P_DESCRIPTION = Symbol('description');
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

}

module.exports = AbstractType;

/***/ }),

/***/ "../common/src/Coding/CompositeType.js":
/*!*********************************************!*\
  !*** ../common/src/Coding/CompositeType.js ***!
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
const BC = __webpack_require__(/*! ./../BC */ "../common/src/BC.js");

const AbstractType = __webpack_require__(/*! ./AbstractType */ "../common/src/Coding/AbstractType.js");

const P_SUBTYPES = Symbol('subtypes');
const P_SIZE_ENCODED = Symbol('size_encoded');
/**
 * A Type that itself is made up of multiple other (sub-)types.
 */

class CompositeType extends AbstractType {
  /**
   * Constructor
   */
  constructor(id) {
    super(id || 'composite_type');
    super.description('A type that itself is made up of multiple other types.');
    this[P_SUBTYPES] = [];
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

    const obj = {};
    let offset = 0;
    bc = BC.from(bc);
    this.subTypes.forEach(subType => {
      obj[subType.id] = subType.decodeFromBytes(bc.slice(offset), options, obj);
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
    let bc = BC.empty();
    this.subTypes.forEach((subType, idx) => {
      let subTypeValue;

      if (subType.hasFixedValue) {
        subTypeValue = subType.fixedValue;
      } else {
        subTypeValue = Array.isArray(objOrArray) ? objOrArray[idx] : objOrArray[subType.id];
      } // we will use the first available


      bc = bc.append(subType.encodeToBytes(subTypeValue, objOrArray));
    });
    this[P_SIZE_ENCODED] = bc.length;
    return bc;
  }

}

module.exports = CompositeType;

/***/ }),

/***/ "../common/src/Coding/Core/AbstractInt.js":
/*!************************************************!*\
  !*** ../common/src/Coding/Core/AbstractInt.js ***!
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
const AbstractType = __webpack_require__(/*! ./../AbstractType */ "../common/src/Coding/AbstractType.js");

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

/***/ "../common/src/Coding/Core/BytesFixedLength.js":
/*!*****************************************************!*\
  !*** ../common/src/Coding/Core/BytesFixedLength.js ***!
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
const AbstractType = __webpack_require__(/*! ./../AbstractType */ "../common/src/Coding/AbstractType.js");

const BC = __webpack_require__(/*! ./../../BC */ "../common/src/BC.js");

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
    value = BC.from(value);
    return value.slice(0, this[P_SIZE]);
  }

}

module.exports = BytesFixedLength;

/***/ }),

/***/ "../common/src/Coding/Core/BytesWithLength.js":
/*!****************************************************!*\
  !*** ../common/src/Coding/Core/BytesWithLength.js ***!
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
const AbstractType = __webpack_require__(/*! ./../AbstractType */ "../common/src/Coding/AbstractType.js");

const Int8 = __webpack_require__(/*! ./Int8 */ "../common/src/Coding/Core/Int8.js");

const Int16 = __webpack_require__(/*! ./Int16 */ "../common/src/Coding/Core/Int16.js");

const Int32 = __webpack_require__(/*! ./Int32 */ "../common/src/Coding/Core/Int32.js");

const BytesWithoutLength = __webpack_require__(/*! ./BytesWithoutLength */ "../common/src/Coding/Core/BytesWithoutLength.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "../common/src/Endian.js");

const BC = __webpack_require__(/*! ./../../BC */ "../common/src/BC.js");

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
    value = BC.from(value);
    this[P_SIZE_ENCODED] = value.length + this[P_LENGTH_FIELD].encodedSize;
    let bc = this[P_LENGTH_FIELD].encodeToBytes(this[P_SIZE_ENCODED] - this[P_LENGTH_FIELD].encodedSize);
    return bc.append(this[P_BYTES_FIELD].encodeToBytes(value));
  }

  get lengthField() {
    return this[P_LENGTH_FIELD];
  }

}

module.exports = BytesWithLength;

/***/ }),

/***/ "../common/src/Coding/Core/BytesWithoutLength.js":
/*!*******************************************************!*\
  !*** ../common/src/Coding/Core/BytesWithoutLength.js ***!
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
const AbstractType = __webpack_require__(/*! ./../AbstractType */ "../common/src/Coding/AbstractType.js");

const BC = __webpack_require__(/*! ./../../BC */ "../common/src/BC.js");

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
    let encoded = BC.from(value);
    this[P_SIZE_ENCODED] = encoded.length;
    return encoded;
  }

}

module.exports = BytesWithoutLength;

/***/ }),

/***/ "../common/src/Coding/Core/Int16.js":
/*!******************************************!*\
  !*** ../common/src/Coding/Core/Int16.js ***!
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
const AbstractInt = __webpack_require__(/*! ./AbstractInt */ "../common/src/Coding/Core/AbstractInt.js");

const BC = __webpack_require__(/*! ./../../BC */ "../common/src/BC.js");
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
    return BC.fromInt16(value, this.unsigned, this.endian);
  }

}

module.exports = Int16;

/***/ }),

/***/ "../common/src/Coding/Core/Int32.js":
/*!******************************************!*\
  !*** ../common/src/Coding/Core/Int32.js ***!
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
const AbstractInt = __webpack_require__(/*! ./AbstractInt */ "../common/src/Coding/Core/AbstractInt.js");

const BC = __webpack_require__(/*! ./../../BC */ "../common/src/BC.js");
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
    return BC.fromInt32(value, this.unsigned, this.endian);
  }

}

module.exports = Int32;

/***/ }),

/***/ "../common/src/Coding/Core/Int64.js":
/*!******************************************!*\
  !*** ../common/src/Coding/Core/Int64.js ***!
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
const AbstractInt = __webpack_require__(/*! ./AbstractInt */ "../common/src/Coding/Core/AbstractInt.js");

const BC = __webpack_require__(/*! ./../../BC */ "../common/src/BC.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "../common/src/Endian.js");

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
    value = validate64Bit(this.unsigned, value);

    if (!this.unsigned) {
      value = value.toTwos(64);
    }

    return BC.from(value.toBuffer(this.endian.toLowerCase(), this.encodedSize));
  }

}

module.exports = Int64;

/***/ }),

/***/ "../common/src/Coding/Core/Int8.js":
/*!*****************************************!*\
  !*** ../common/src/Coding/Core/Int8.js ***!
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
const AbstractInt = __webpack_require__(/*! ./AbstractInt */ "../common/src/Coding/Core/AbstractInt.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "../common/src/Endian.js");

const BC = __webpack_require__(/*! ./../../BC */ "../common/src/BC.js");
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
    return BC.fromInt8(value, this.unsigned);
  }

}

module.exports = Int8;

/***/ }),

/***/ "../common/src/Coding/Core/StringWithLength.js":
/*!*****************************************************!*\
  !*** ../common/src/Coding/Core/StringWithLength.js ***!
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
const BC = __webpack_require__(/*! ./../../BC */ "../common/src/BC.js");

const AbstractType = __webpack_require__(/*! ./../AbstractType */ "../common/src/Coding/AbstractType.js");

const Int8 = __webpack_require__(/*! ./Int8 */ "../common/src/Coding/Core/Int8.js");

const Int16 = __webpack_require__(/*! ./Int16 */ "../common/src/Coding/Core/Int16.js");

const Int32 = __webpack_require__(/*! ./Int32 */ "../common/src/Coding/Core/Int32.js");

const StringWithoutLength = __webpack_require__(/*! ./StringWithoutLength */ "../common/src/Coding/Core/StringWithoutLength.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "../common/src/Endian.js");

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_HAS_LEADING_ZB = Symbol('has_leading_zerobyte');
const P_LENGTH_FIELD = Symbol('length_field');
const P_STRING_FIELD = Symbol('bytes_field');
/**
 * A field type to write dynamic strings (prepends the length).
 */

class StringWithLength extends AbstractType {
  constructor(id, byteSize = 1, lengthId = 'length', lengthDesc = null, endian = Endian.LITTLE_ENDIAN, hasLeadingZeroByte = false) {
    super(id || `bytes_size${byteSize * 8}`);
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
    this[P_SIZE_ENCODED] = value.length;
    let bc = this[P_LENGTH_FIELD].encodeToBytes(this[P_SIZE_ENCODED]);

    if (this[P_HAS_LEADING_ZB]) {
      bc = bc.append('00');
    }

    return bc.append(this[P_STRING_FIELD].encodeToBytes(value));
  }

}

module.exports = StringWithLength;

/***/ }),

/***/ "../common/src/Coding/Core/StringWithoutLength.js":
/*!********************************************************!*\
  !*** ../common/src/Coding/Core/StringWithoutLength.js ***!
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
const AbstractType = __webpack_require__(/*! ./../AbstractType */ "../common/src/Coding/AbstractType.js");

const BC = __webpack_require__(/*! ./../../BC */ "../common/src/BC.js");

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
    let encoded = BC.from(value, 'string');
    this[P_SIZE_ENCODED] = encoded.length;
    return encoded;
  }

}

module.exports = StringWithoutLength;

/***/ }),

/***/ "../common/src/Coding/Decissive.js":
/*!*****************************************!*\
  !*** ../common/src/Coding/Decissive.js ***!
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
const CompositeType = __webpack_require__(/*! ./CompositeType */ "../common/src/Coding/CompositeType.js");

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_SUBTYPE_RESOLVER = Symbol('subtype_resolver');
const P_MARKER_FIELD = Symbol('marker_field');
/**
 * A Type that itself is made up of multiple other types. The types are selected dynamically
 * depending on the given resolver.
 */

class Decissive extends CompositeType {
  /**
   * Constructor
   */
  constructor(id, markerField, subTypeResolver) {
    super(id || 'decissive');
    super.description('A type that itself has many sub types but only some are triggere based on a marker.');
    this[P_SUBTYPE_RESOLVER] = subTypeResolver;
    this[P_MARKER_FIELD] = markerField;
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
    let subType = this[P_SUBTYPE_RESOLVER](all[this[P_MARKER_FIELD]]);
    let bc = subType.encodeToBytes(objOrArray);
    this[P_SIZE_ENCODED] = bc.length;
    return bc;
  }

}

module.exports = Decissive;

/***/ }),

/***/ "../common/src/Coding/Pascal/AccountName.js":
/*!**************************************************!*\
  !*** ../common/src/Coding/Pascal/AccountName.js ***!
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
const AccountNameType = __webpack_require__(/*! ./../../Types/AccountName */ "../common/src/Types/AccountName.js");

const StringWithLength = __webpack_require__(/*! ../Core/StringWithLength */ "../common/src/Coding/Core/StringWithLength.js");
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
    super(id || 'account_name', byteSize);
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
    return super.encodeToBytes(value.toString());
  }

}

module.exports = AccountName;

/***/ }),

/***/ "../common/src/Coding/Pascal/AccountNumber.js":
/*!****************************************************!*\
  !*** ../common/src/Coding/Pascal/AccountNumber.js ***!
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
const AccountNumberType = __webpack_require__(/*! ./../../Types/AccountNumber */ "../common/src/Types/AccountNumber.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "../common/src/Endian.js");

const Int32 = __webpack_require__(/*! ./../Core/Int32 */ "../common/src/Coding/Core/Int32.js");
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
    return super.encodeToBytes(value.account);
  }

}

module.exports = AccountNumber;

/***/ }),

/***/ "../common/src/Coding/Pascal/Currency.js":
/*!***********************************************!*\
  !*** ../common/src/Coding/Pascal/Currency.js ***!
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
const Int64 = __webpack_require__(/*! ./../Core/Int64 */ "../common/src/Coding/Core/Int64.js");

const CurrencyType = __webpack_require__(/*! ./../../Types/Currency */ "../common/src/Types/Currency.js");

const Endian = __webpack_require__(/*! ./../../Endian */ "../common/src/Endian.js");
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
    return super.encodeToBytes(value.bn);
  }

}

module.exports = Currency;

/***/ }),

/***/ "../common/src/Coding/Pascal/Keys/Curve.js":
/*!*************************************************!*\
  !*** ../common/src/Coding/Pascal/Keys/Curve.js ***!
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
const CurveType = __webpack_require__(/*! ./../../../Types/Keys/Curve */ "../common/src/Types/Keys/Curve.js");

const Endian = __webpack_require__(/*! ./../../../Endian */ "../common/src/Endian.js");

const Int16 = __webpack_require__(/*! ./../../Core/Int16 */ "../common/src/Coding/Core/Int16.js");
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
    return super.encodeToBytes(value.id);
  }

}

module.exports = Curve;

/***/ }),

/***/ "../common/src/Coding/Pascal/Keys/PrivateKey.js":
/*!******************************************************!*\
  !*** ../common/src/Coding/Pascal/Keys/PrivateKey.js ***!
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
const Curve = __webpack_require__(/*! ./Curve */ "../common/src/Coding/Pascal/Keys/Curve.js");

const BytesWithLength = __webpack_require__(/*! ../../Core/BytesWithLength */ "../common/src/Coding/Core/BytesWithLength.js");

const CompositeType = __webpack_require__(/*! ../../CompositeType */ "../common/src/Coding/CompositeType.js");

const PrivateKeyType = __webpack_require__(/*! ./../../../../src/Types/Keys/PrivateKey */ "../common/src/Types/Keys/PrivateKey.js");
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
    return super.encodeToBytes(value);
  }

}

module.exports = PrivateKey;

/***/ }),

/***/ "../common/src/Coding/Pascal/Keys/PublicKey.js":
/*!*****************************************************!*\
  !*** ../common/src/Coding/Pascal/Keys/PublicKey.js ***!
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
const Curve = __webpack_require__(/*! ./Curve */ "../common/src/Coding/Pascal/Keys/Curve.js");

const BytesWithLength = __webpack_require__(/*! ../../Core/BytesWithLength */ "../common/src/Coding/Core/BytesWithLength.js");

const BytesWithoutLength = __webpack_require__(/*! ../../Core/BytesWithoutLength */ "../common/src/Coding/Core/BytesWithoutLength.js");

const CompositeType = __webpack_require__(/*! ../../CompositeType */ "../common/src/Coding/CompositeType.js");

const BC = __webpack_require__(/*! ../../../BC */ "../common/src/BC.js");

const Sha = __webpack_require__(/*! ../../../Sha */ "../common/src/Sha.js");

const Base58 = __webpack_require__(/*! ../../../Base58 */ "../common/src/Base58.js");

const PublicKeyType = __webpack_require__(/*! ./../../../../src/Types/Keys/PublicKey */ "../common/src/Types/Keys/PublicKey.js");
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
      this.addSubType(new BytesWithoutLength('x').description('The X value of the public key.'));
      this.addSubType(new BytesWithoutLength('y'));
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

/***/ "../common/src/Coding/Pascal/NOperation.js":
/*!*************************************************!*\
  !*** ../common/src/Coding/Pascal/NOperation.js ***!
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
const Endian = __webpack_require__(/*! ./../../Endian */ "../common/src/Endian.js");

const Int32 = __webpack_require__(/*! ./../Core/Int32 */ "../common/src/Coding/Core/Int32.js");
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

/***/ "../common/src/Coding/Pascal/OpType.js":
/*!*********************************************!*\
  !*** ../common/src/Coding/Pascal/OpType.js ***!
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
const Endian = __webpack_require__(/*! ./../../Endian */ "../common/src/Endian.js");

const AbstractType = __webpack_require__(/*! ./../AbstractType */ "../common/src/Coding/AbstractType.js");

const Int8 = __webpack_require__(/*! ./../Core/Int8 */ "../common/src/Coding/Core/Int8.js");

const Int16 = __webpack_require__(/*! ./../Core/Int16 */ "../common/src/Coding/Core/Int16.js");

const Int32 = __webpack_require__(/*! ./../Core/Int32 */ "../common/src/Coding/Core/Int32.js");

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
    return this[P_INT_TYPE].encodeToBytes(value);
  }

  get intType() {
    return this[P_INT_TYPE];
  }

}

module.exports = OpType;

/***/ }),

/***/ "../common/src/Coding/Pascal/OperationHash.js":
/*!****************************************************!*\
  !*** ../common/src/Coding/Pascal/OperationHash.js ***!
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
const Endian = __webpack_require__(/*! ./../../Endian */ "../common/src/Endian.js");

const CompositeType = __webpack_require__(/*! ./../CompositeType */ "../common/src/Coding/CompositeType.js");

const Int32 = __webpack_require__(/*! ./../Core/Int32 */ "../common/src/Coding/Core/Int32.js");

const AccountNumber = __webpack_require__(/*! ./AccountNumber */ "../common/src/Coding/Pascal/AccountNumber.js");

const BytesWithFixedLength = __webpack_require__(/*! ./../Core/BytesFixedLength */ "../common/src/Coding/Core/BytesFixedLength.js");

const NOperation = __webpack_require__(/*! ./NOperation */ "../common/src/Coding/Pascal/NOperation.js");

const OperationHashType = __webpack_require__(/*! ./../../Types/OperationHash */ "../common/src/Types/OperationHash.js");
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
    return super.encodeToBytes(value);
  }

}

module.exports = OperationHash;

/***/ }),

/***/ "../common/src/Coding/Repeating.js":
/*!*****************************************!*\
  !*** ../common/src/Coding/Repeating.js ***!
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
const BC = __webpack_require__(/*! ./../BC */ "../common/src/BC.js");

const AbstractType = __webpack_require__(/*! ./AbstractType */ "../common/src/Coding/AbstractType.js");

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

  get repeatingType() {
    return this[P_TYPE];
  }

}

module.exports = Repeating;

/***/ }),

/***/ "../common/src/Coding/index.js":
/*!*************************************!*\
  !*** ../common/src/Coding/index.js ***!
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
module.exports = {
  AbstractType: __webpack_require__(/*! ./AbstractType */ "../common/src/Coding/AbstractType.js"),
  CompositeType: __webpack_require__(/*! ./CompositeType */ "../common/src/Coding/CompositeType.js"),
  Repeating: __webpack_require__(/*! ./Repeating */ "../common/src/Coding/Repeating.js"),
  Decissive: __webpack_require__(/*! ./Decissive */ "../common/src/Coding/Decissive.js"),
  Core: {
    AbstractInt: __webpack_require__(/*! ./Core/AbstractInt */ "../common/src/Coding/Core/AbstractInt.js"),
    Int8: __webpack_require__(/*! ./Core/Int8 */ "../common/src/Coding/Core/Int8.js"),
    Int16: __webpack_require__(/*! ./Core/Int16 */ "../common/src/Coding/Core/Int16.js"),
    Int32: __webpack_require__(/*! ./Core/Int32 */ "../common/src/Coding/Core/Int32.js"),
    Int64: __webpack_require__(/*! ./Core/Int64 */ "../common/src/Coding/Core/Int64.js"),
    StringWithLength: __webpack_require__(/*! ./Core/StringWithLength */ "../common/src/Coding/Core/StringWithLength.js"),
    StringWithoutLength: __webpack_require__(/*! ./Core/StringWithoutLength */ "../common/src/Coding/Core/StringWithoutLength.js"),
    BytesWithLength: __webpack_require__(/*! ./Core/BytesWithLength */ "../common/src/Coding/Core/BytesWithLength.js"),
    BytesWithoutLength: __webpack_require__(/*! ./Core/BytesWithoutLength */ "../common/src/Coding/Core/BytesWithoutLength.js"),
    BytesFixedLength: __webpack_require__(/*! ./Core/BytesFixedLength */ "../common/src/Coding/Core/BytesFixedLength.js")
  },
  Pascal: {
    Keys: {
      Curve: __webpack_require__(/*! ./Pascal/Keys/Curve */ "../common/src/Coding/Pascal/Keys/Curve.js"),
      PublicKey: __webpack_require__(/*! ./Pascal/Keys/PublicKey */ "../common/src/Coding/Pascal/Keys/PublicKey.js"),
      PrivateKey: __webpack_require__(/*! ./Pascal/Keys/PrivateKey */ "../common/src/Coding/Pascal/Keys/PrivateKey.js")
    },
    AccountNumber: __webpack_require__(/*! ./Pascal/AccountNumber */ "../common/src/Coding/Pascal/AccountNumber.js"),
    AccountName: __webpack_require__(/*! ./Pascal/AccountName */ "../common/src/Coding/Pascal/AccountName.js"),
    Currency: __webpack_require__(/*! ./Pascal/Currency */ "../common/src/Coding/Pascal/Currency.js"),
    NOperation: __webpack_require__(/*! ./Pascal/NOperation */ "../common/src/Coding/Pascal/NOperation.js"),
    OpType: __webpack_require__(/*! ./Pascal/OpType */ "../common/src/Coding/Pascal/OpType.js"),
    OperationHash: __webpack_require__(/*! ./Pascal/OperationHash */ "../common/src/Coding/Pascal/OperationHash.js")
  }
};

/***/ }),

/***/ "../common/src/Endian.js":
/*!*******************************!*\
  !*** ../common/src/Endian.js ***!
  \*******************************/
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


  static isLittleEndian() {
    return Endian.detect() === Endian.LITTLE_ENDIAN;
  }
  /**
   * Gets a value indicating whether the system uses big endian.
   *
   * @returns {boolean}
   */


  static isBigEndian() {
    return Endian.detect() === Endian.BIG_ENDIAN;
  }

}

module.exports = Endian;

/***/ }),

/***/ "../common/src/PascalCoinInfo.js":
/*!***************************************!*\
  !*** ../common/src/PascalCoinInfo.js ***!
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
const Currency = __webpack_require__(/*! ./Types/Currency */ "../common/src/Types/Currency.js");
/**
 * Gets information about forks and features.
 */


class PascalCoinInfo {
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
    return PascalCoinInfo.PIP_0010;
  }
  /**
   * Gets a value indicating whether the given block has inflation reduction
   * activated (PIP-10).
   *
   * @param {number} block
   * @returns {boolean}
   */


  static isInflationReduction(block) {
    return block >= PascalCoinInfo.INFLATION_REDUCTION;
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
    return PascalCoinInfo.PIP_0009;
  }
  /**
   * Gets a value indicating if randomhash was active at the given block.
   *
   * @param {Number} block
   * @returns {boolean}
   */


  static isRandomHash(block) {
    return block >= PascalCoinInfo.RANDOM_HASH;
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
    return PascalCoinInfo.PIP_0011;
  }
  /**
   * Gets a value indicating whether the given block was mined with activated
   * developer award.
   *
   * @param {number} block
   * @returns {boolean}
   */


  static isDeveloperReward(block) {
    return block >= PascalCoinInfo.DEVELOPER_REWARD;
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

module.exports = PascalCoinInfo;

/***/ }),

/***/ "../common/src/Sha.js":
/*!****************************!*\
  !*** ../common/src/Sha.js ***!
  \****************************/
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

const BC = __webpack_require__(/*! ./BC */ "../common/src/BC.js");
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

/***/ "../common/src/Types/AccountName.js":
/*!******************************************!*\
  !*** ../common/src/Types/AccountName.js ***!
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
const Util = __webpack_require__(/*! ../Util */ "../common/src/Util.js");

const P_VALUE = Symbol('value'); // the list of characters to escape.

const CHARS_TO_ESCAPE = '(){}[]:"<>'.split('');
const REGEX_TO_ESCAPE = `(${CHARS_TO_ESCAPE.map(c => Util.escapeRegex(c)).join('|')})`;
const ALLOWED_ALL = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+{}[]_:"|<>,.?/~'.split('');
const ALLOWED_START = ALLOWED_ALL.slice(10);
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

/***/ "../common/src/Types/AccountNumber.js":
/*!********************************************!*\
  !*** ../common/src/Types/AccountNumber.js ***!
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
const PascalCoinInfo = __webpack_require__(/*! ../PascalCoinInfo */ "../common/src/PascalCoinInfo.js");

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
    this[P_IS_FOUNDATION_REWARD] = PascalCoinInfo.isDeveloperReward(this[P_CREATED_IN_BLOCK]) && this[P_ACCOUNT] % 5 === 4;
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

/***/ "../common/src/Types/Currency.js":
/*!***************************************!*\
  !*** ../common/src/Types/Currency.js ***!
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
   * Gets a value indicating that the current value has more decimals than
   * allowed.
   */


  isVague() {
    return this.toStringOpt(5) !== this.toStringOpt(4);
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
   * Adds the given value to the current value and returns a **new**
   * value.
   *
   * @param {Number|String|BigNumber|Currency} addValue
   * @returns {Currency}
   */


  mul(val) {
    return Currency.fromMolina(this.value.mul(new BN(val)));
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

/***/ "../common/src/Types/Keys/Curve.js":
/*!*****************************************!*\
  !*** ../common/src/Types/Keys/Curve.js ***!
  \*****************************************/
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
const ID = Symbol('id');
const NAME = Symbol('name');
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

      this[ID] = curve;
      this[NAME] = CURVES[curve];
    } else {
      if (Object.values(CURVES).indexOf(curve.toString()) === -1) {
        throw new Error(`Unknown curve: ${curve}`);
      }

      this[NAME] = curve.toString();
      this[ID] = parseInt(Object.keys(CURVES)[Object.values(CURVES).indexOf(this[NAME])], 10);
    }
  }
  /**
     * Gets the id of the curve.
     *
     * @returns {Number}
     */


  get id() {
    return this[ID];
  }
  /**
     * Gets the name of the curve.
     *
     * @returns {String}
     */


  get name() {
    return this[NAME];
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

/***/ "../common/src/Types/Keys/KeyPair.js":
/*!*******************************************!*\
  !*** ../common/src/Types/Keys/KeyPair.js ***!
  \*******************************************/
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

/***/ "../common/src/Types/Keys/PrivateKey.js":
/*!**********************************************!*\
  !*** ../common/src/Types/Keys/PrivateKey.js ***!
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
const BC = __webpack_require__(/*! ../../BC */ "../common/src/BC.js");

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

/***/ "../common/src/Types/Keys/PublicKey.js":
/*!*********************************************!*\
  !*** ../common/src/Types/Keys/PublicKey.js ***!
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
const BC = __webpack_require__(/*! ../../BC */ "../common/src/BC.js");

const Curve = __webpack_require__(/*! ./Curve */ "../common/src/Types/Keys/Curve.js");

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

/***/ "../common/src/Types/Keys/index.js":
/*!*****************************************!*\
  !*** ../common/src/Types/Keys/index.js ***!
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
module.exports = {
  Curve: __webpack_require__(/*! ./Curve */ "../common/src/Types/Keys/Curve.js"),
  PrivateKey: __webpack_require__(/*! ./PrivateKey */ "../common/src/Types/Keys/PrivateKey.js"),
  PublicKey: __webpack_require__(/*! ./PublicKey */ "../common/src/Types/Keys/PublicKey.js"),
  KeyPair: __webpack_require__(/*! ./KeyPair */ "../common/src/Types/Keys/KeyPair.js")
};

/***/ }),

/***/ "../common/src/Types/OperationHash.js":
/*!********************************************!*\
  !*** ../common/src/Types/OperationHash.js ***!
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
const BC = __webpack_require__(/*! ../BC */ "../common/src/BC.js");

const AccountNumber = __webpack_require__(/*! ./AccountNumber */ "../common/src/Types/AccountNumber.js");

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

/***/ "../common/src/Types/index.js":
/*!************************************!*\
  !*** ../common/src/Types/index.js ***!
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
module.exports = {
  AccountName: __webpack_require__(/*! ./AccountName */ "../common/src/Types/AccountName.js"),
  AccountNumber: __webpack_require__(/*! ./AccountNumber */ "../common/src/Types/AccountNumber.js"),
  Currency: __webpack_require__(/*! ./Currency */ "../common/src/Types/Currency.js"),
  OperationHash: __webpack_require__(/*! ./OperationHash */ "../common/src/Types/OperationHash.js"),
  Keys: __webpack_require__(/*! ./Keys */ "../common/src/Types/Keys/index.js")
};

/***/ }),

/***/ "../common/src/Util.js":
/*!*****************************!*\
  !*** ../common/src/Util.js ***!
  \*****************************/
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

  /* istanbul ignore next */
  static escapeRegex(string) {
    return ('' + string).replace(/([?!${}*:()|=^[\]\/\\.+])/g, '\\$1');
  }

}

module.exports = Util;

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/*! all exports used */
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
/*! all exports used */
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
const P_DESTINATION_TYPE = Symbol('destination_type');
const P_RETURNS_ARRAY = Symbol('returns_array');
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
   * @param {*} DestinationType
   * @param {Boolean} returnsArray
   */
  constructor(method, params, executor, DestinationType, returnsArray) {
    this[P_METHOD] = method;
    this[P_PARAMS] = params;
    this[P_EXECUTOR] = executor;
    this[P_DESTINATION_TYPE] = DestinationType;
    this[P_RETURNS_ARRAY] = returnsArray;
  }
  /**
   * Gets the destination type.
   *
   * @returns {*}
   */


  get destinationType() {
    return this[P_DESTINATION_TYPE];
  }
  /**
   * Gets a value indicating whether the action returns an array.
   *
   * @returns {Boolean}
   */


  get returnsArray() {
    return this[P_RETURNS_ARRAY];
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

  get destinationType() {
    return this[P_DESTINATION_TYPE];
  }

  get returnsArray() {
    return this[P_RETURNS_ARRAY];
  }
  /**
     * Executes the current action and returns the raw result.
     *
     * @returns {Promise}
     */


  async execute() {
    return this[P_EXECUTOR].execute(this);
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BaseAction = __webpack_require__(/*! ./BaseAction */ "./src/Actions/BaseAction.js");

const PascalCoinInfo = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").PascalCoinInfo;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Currency;
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
   * @param {*} DestinationType
   * @param {Boolean} returnsArray
   */
  constructor(method, params, executor, DestinationType, returnsArray) {
    super(method, params, executor, DestinationType, returnsArray);
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
   * @param {PublicKey} pubkey
     * @returns {OperationAction}
     */


  withPayload(payload, payloadMethod = 'none', password = null, pubkey = null) {
    this.params.payload = payload;
    this.params.payload_method = payloadMethod;

    if (password !== null) {
      this.params.pwd = password;
    }

    if (pubkey !== null) {
      this.params.pubkey = pubkey;
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
    this.params.fee = new Currency(fee);
    return this;
  }
  /**
   * Sets the fee to the minimum.
   *
   * @returns {OperationAction}
   */


  withMinFee(lastKnownBlock = null) {
    this.params.fee = PascalCoinInfo.MIN_FEE(lastKnownBlock);
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
/*! all exports used */
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
   * @param {*} DestinationType
   * @param {Boolean} returnsArray
   */
  constructor(method, params, executor, DestinationType, returnsArray) {
    super(method, params, executor, DestinationType, returnsArray);
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
   * Executes the current action and returns all results.
   *
   * @returns {Promise}
   */


  async executeAll(restEach = -1, restSeconds = -1, restCallback = null, report = null) {
    let all = [];
    let transformCallback = null;
    await this.executeAllReport(([data, transform]) => {
      if (transformCallback === null) {
        transformCallback = transform;
      }

      data.forEach(item => all.push(item));

      if (report !== null) {
        report(all.length);
      }
    }, restEach, restSeconds, restCallback);
    return [all, transformCallback];
  }
  /**
   * Executes the current action and reports the results of each step to the
   * given reporter.
   *
   * @returns {Promise}
   */


  async executeAllReport(reporter, restEach = -1, restSeconds = -1, restCallback = null) {
    let result = [];
    var reports = 0;

    do {
      if (restEach > -1 && reports > 0 && reports % restEach === 0) {
        if (restCallback !== null) {
          restCallback();
        }

        await (async () => {
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve();
            }, restSeconds * 1000);
          });
        })();
      }

      result = await this.execute();

      if (result[0].length > 0) {
        let c = reporter(result); // being able to stop execution

        if (c === false) {
          return;
        }

        reports++;
      }

      this.changeParam('start', this.params.start + this.params.max);
    } while (result[0].length > 0 && result[0].length === this.params.max);
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const OperationAction = __webpack_require__(/*! ./OperationAction */ "./src/Actions/OperationAction.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;
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
   * @param {*} DestinationType
   * @param {Boolean} returnsArray
   */
  constructor(method, params, executor, DestinationType, returnsArray) {
    super(method, params, executor, DestinationType, returnsArray);
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
     * @param {BC|String} rawoperations
     * @return {SignOperationAction}
     */


  withRawOperations(rawoperations) {
    this.params.rawoperations = BC.from(rawoperations);
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const jaysonBrowserClient = __webpack_require__(/*! jayson/lib/client/browser */ "../../node_modules/jayson/lib/client/browser.js");

const fetch = __webpack_require__(/*! node-fetch */ "../../node_modules/node-fetch/lib/index.mjs");

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

          if (error !== null && error !== undefined) {
            return reject(new ResultError(error.code, error.message));
          }

          if (result !== undefined) {
            return reject(new ResultError(error.code, error.message));
          }

          return resolve(result);
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
/*! all exports used */
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

const Account = __webpack_require__(/*! ./Types/Account */ "./src/Types/Account.js");

const Block = __webpack_require__(/*! ./Types/Block */ "./src/Types/Block.js");

const SignedMessage = __webpack_require__(/*! ./Types/SignedMessage */ "./src/Types/SignedMessage.js");

const NodeStatus = __webpack_require__(/*! ./Types/NodeStatus */ "./src/Types/NodeStatus.js");

const Operation = __webpack_require__(/*! ./Types/Operation */ "./src/Types/Operation.js");

const Sender = __webpack_require__(/*! ./Types/Sender */ "./src/Types/Sender.js");

const Receiver = __webpack_require__(/*! ./Types/Receiver */ "./src/Types/Receiver.js");

const Changer = __webpack_require__(/*! ./Types/Changer */ "./src/Types/Changer.js");

const Connection = __webpack_require__(/*! ./Types/Connection */ "./src/Types/Connection.js");

const WalletPublicKey = __webpack_require__(/*! ./Types/WalletPublicKey */ "./src/Types/WalletPublicKey.js");

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountName;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountNumber;

const OperationHash = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.OperationHash;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Currency;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

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
   * Adds nodes the remote node should connect to.
   *
   * @param {String[]} nodes - The list of nodes (will be transformed to a semicolon separated list)
   *
   * @returns {BaseAction}
   */


  addNode({
    nodes
  }) {
    return new BaseAction('addnode', {
      nodes: nodes.join(';')
    }, this[P_EXECUTOR], Number, false);
  }
  /**
   * Gets an account with the given account number.
   *
   * @param {AccountNumber|Number|String} account
   *
   * @returns {BaseAction}
   */


  getAccount({
    account
  }) {
    return new BaseAction('getaccount', {
      account: new AccountNumber(account)
    }, this[P_EXECUTOR], Account, false);
  }
  /**
   * Searches for accounts.
   *
   * @param {AccountName|String|null} name
   * @param {Number|null} type
   * @param {Boolean|null} onlyAccountsForSale
   * @param {Boolean|null} exact
   * @param {Currency|null} minBalance
   * @param {Currency|null} maxBalance
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {PagedAction}
   */


  findAccounts({
    name = null,
    type = null,
    onlyAccountsForSale = null,
    exact = null,
    minBalance = null,
    maxBalance = null,
    pubkey = null
  }) {
    return new PagedAction('findaccounts', {
      name: name !== null ? new AccountName(name) : name,
      type: type !== null ? parseInt(type, 10) : type,
      only_accounts_for_sale: onlyAccountsForSale,
      exact,
      min_balance: minBalance !== null ? new Currency(minBalance) : minBalance,
      max_balance: maxBalance !== null ? new Currency(maxBalance) : maxBalance,
      pubkey
    }, this[P_EXECUTOR], Account, true);
  }
  /**
   * Returns all accounts of a wallet with the given public key
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {PagedAction}
   */


  getWalletAccounts({
    pubkey = null
  }) {
    return new PagedAction('getwalletaccounts', {
      pubkey
    }, this[P_EXECUTOR], Account, true);
  }
  /**
   * Returns the number of accounts in a wallet
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {BaseAction}
   */


  getWalletAccountsCount({
    pubkey = null
  }) {
    return new BaseAction('getwalletaccountscount', {
      pubkey
    }, this[P_EXECUTOR], Number, false);
  }
  /**
   * Gets the accumulated balance of accounts in a wallet
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {BaseAction}
   */


  getWalletCoins({
    pubkey = null
  }) {
    return new BaseAction('getwalletcoins', {
      pubkey
    }, this[P_EXECUTOR], Number, false);
  }
  /**
   * Gets the list of public keys managed in a wallet
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {PagedAction}
   */


  getWalletPubKeys({
    pubkey = null
  }) {
    return new PagedAction('getwalletpubkeys', {
      pubkey
    }, this[P_EXECUTOR], WalletPublicKey, true);
  }
  /**
   * Gets the info of a public key in the wallet.
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} pubkey
   *
   * @returns {BaseAction}
   */


  getWalletPubKey({
    pubkey
  }) {
    return new BaseAction('getwalletpubkey', {
      pubkey
    }, this[P_EXECUTOR], WalletPublicKey, true);
  }
  /**
   * Imports a public key in the wallet.
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} pubkey
   * @param {String|null} name
   *
   * @returns {BaseAction}
   */


  inportPubKey({
    pubkey,
    name = null
  }) {
    return new BaseAction('importpubkey', {
      pubkey,
      name
    }, this[P_EXECUTOR], WalletPublicKey, false);
  }
  /**
   * Gets the information of a block
   *
   * @param {Number} block
   *
   * @returns {BaseAction}
   */


  getBlock({
    block
  }) {
    return new BaseAction('getblock', {
      block: block !== null ? parseInt(block, 10) : block
    }, this[P_EXECUTOR], Block, false);
  }
  /**
   * Gets a list of blocks
   *
   * @param {Number|null} last
   * @param {Number|null} start
   * @param {Number|null} end
   *
   * @returns {BaseAction}
   */


  getBlocks({
    last = null,
    start = null,
    end = null
  }) {
    return new BaseAction('getblocks', {
      last: last !== null ? parseInt(last, 10) : last,
      start: start !== null ? parseInt(start, 10) : start,
      end: end !== null ? parseInt(end, 10) : end
    }, this[P_EXECUTOR], Block, true);
  }
  /**
   * Gets the list of all blocks.
   *
   * @returns {BaseAction}
   */


  getBlockCount() {
    return new BaseAction('getblockcount', {}, this[P_EXECUTOR], Number, false);
  }
  /**
   * Gets an operation in a block
   *
   * @param {Number} block
   * @param {Number} opblock
   *
   * @returns {BaseAction}
   */


  getBlockOperation({
    block,
    opblock
  }) {
    return new BaseAction('getblockoperation', {
      block: block !== null ? parseInt(block, 10) : block,
      opblock: opblock !== null ? parseInt(opblock, 10) : opblock
    }, this[P_EXECUTOR], Operation, false);
  }
  /**
   * Get all operations in a block
   *
   * @param {Number} block
   *
   * @returns {PagedAction}
   */


  getBlockOperations({
    block
  }) {
    return new PagedAction('getblockoperations', {
      block: block !== null ? parseInt(block, 10) : block
    }, this[P_EXECUTOR], Operation, true);
  }
  /**
   * Get all operations of an account
   *
   * @param {AccountNumber|Number|String} account
   * @param {Number|null} depth
   * @param {Number|null} startblock
   *
   * @returns {PagedAction}
   */


  getAccountOperations({
    account,
    depth = null,
    startblock = null
  }) {
    return new PagedAction('getaccountoperations', {
      account: new AccountNumber(account),
      depth: depth !== null ? parseInt(depth, 10) : depth,
      startblock: startblock !== null ? parseInt(startblock, 10) : startblock
    }, this[P_EXECUTOR], Operation, true);
  }
  /**
   * Gets all pending operations
   *
   * @returns {PagedAction}
   */


  getPendings() {
    return new PagedAction('getpendings', {}, this[P_EXECUTOR], Operation, true);
  }
  /**
   * Gets the number of pending operations
   *
   * @returns {BaseAction}
   */


  getPendingsCount() {
    return new BaseAction('getpendingscount', {}, this[P_EXECUTOR], Number, false);
  }
  /**
   * Decodes the given operation hash
   *
   * @param {OperationHash} ophash
   *
   * @returns {BaseAction}
   */


  decodeOpHash({
    ophash
  }) {
    return new BaseAction('decodeophash', {
      ophash
    }, this[P_EXECUTOR], OperationHash, false);
  }
  /**
   * Searches for an operation
   *
   * @param {OperationHash|null} ophash
   *
   * @returns {BaseAction}
   */


  findOperation({
    ophash = null
  }) {
    return new BaseAction('findoperation', {
      ophash
    }, this[P_EXECUTOR], Operation, false);
  }
  /**
   * Search for an operation signed by account and with n_operation, start searching block (0=all)
   *
   * @param {AccountNumber|Number|String} account
   * @param {Number} nOperation
   * @param {Number|null} block
   *
   * @returns {BaseAction}
   */


  findNOperation({
    account,
    nOperation,
    block = null
  }) {
    return new BaseAction('findnoperation', {
      account: new AccountNumber(account),
      n_operation: nOperation !== null ? parseInt(nOperation, 10) : nOperation,
      block: block !== null ? parseInt(block, 10) : block
    }, this[P_EXECUTOR], Operation, false);
  }
  /**
   * Search for operations signed by account within an n_operation range, start searching block (0=all)
   *
   * @param {AccountNumber|Number|String} account
   * @param {Number} nOperationMin
   * @param {Number} nOperationMax
   *
   * @returns {PagedAction}
   */


  findNOperations({
    account,
    nOperationMin,
    nOperationMax
  }) {
    return new PagedAction('findnoperations', {
      account: new AccountNumber(account),
      n_operation_min: nOperationMin !== null ? parseInt(nOperationMin, 10) : nOperationMin,
      n_operation_max: nOperationMax !== null ? parseInt(nOperationMax, 10) : nOperationMax
    }, this[P_EXECUTOR], Operation, true);
  }
  /**
   * Executes a transaction operation
   *
   * @param {AccountNumber|Number|String} sender
   * @param {AccountNumber|Number|String} target
   * @param {Currency} amount
   *
   * @returns {OperationAction}
   */


  sendTo({
    sender,
    target,
    amount
  }) {
    return new OperationAction('sendto', {
      sender: new AccountNumber(sender),
      target: new AccountNumber(target),
      amount: new Currency(amount)
    }, this[P_EXECUTOR], Operation, false);
  }
  /**
   * Executes a transaction operation
   *
   * @param {AccountNumber|Number|String} sender
   * @param {AccountNumber|Number|String} target
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} senderPubkey
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} targetPubkey
   * @param {Currency} amount
   *
   * @returns {SignOperationAction}
   */


  signSendTo({
    sender,
    target,
    senderPubkey,
    targetPubkey,
    amount
  }) {
    return new SignOperationAction('signsendto', {
      sender: new AccountNumber(sender),
      target: new AccountNumber(target),
      sender_pubkey: senderPubkey,
      target_pubkey: targetPubkey,
      amount: new Currency(amount)
    }, this[P_EXECUTOR], Object, false);
  }
  /**
   * Changes the key of an account
   *
   * @param {AccountNumber|Number|String} account
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} newPubkey
   * @param {AccountNumber|Number|String|null} accountSigner
   *
   * @returns {OperationAction}
   */


  changeKey({
    account,
    newPubkey,
    accountSigner = null
  }) {
    return new OperationAction('changekey', {
      account: new AccountNumber(account),
      new_pubkey: newPubkey,
      account_signer: accountSigner !== null ? new AccountNumber(accountSigner) : accountSigner
    }, this[P_EXECUTOR], Operation, false);
  }
  /**
   * Changes the key of multiple accounts
   *
   * @param {AccountNumber[]|Number[]|String[]} accounts
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} newPubkey
   *
   * @returns {OperationAction}
   */


  changeKeys({
    accounts,
    newPubkey
  }) {
    return new OperationAction('changekeys', {
      accounts: accounts.map(acc => new AccountNumber(acc)),
      new_pubkey: newPubkey
    }, this[P_EXECUTOR], Operation, false);
  }
  /**
   * Signs a change key operation
   *
   * @param {AccountNumber|Number|String} account
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} oldPubkey
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} newPubkey
   * @param {AccountNumber|Number|String|null} accountSigner
   *
   * @returns {SignOperationAction}
   */


  signChangeKey({
    account,
    oldPubkey,
    newPubkey,
    accountSigner = null
  }) {
    return new SignOperationAction('signchangekey', {
      account: new AccountNumber(account),
      old_pubkey: oldPubkey,
      new_pubkey: newPubkey,
      account_signer: accountSigner !== null ? new AccountNumber(accountSigner) : accountSigner
    }, this[P_EXECUTOR], Object, false);
  }
  /**
   * Lists an account for sale
   *
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   * @param {AccountNumber|Number|String} sellerAccount
   * @param {Number} lockedUntilBlock
   * @param {Currency} price
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} newPubkey
   *
   * @returns {OperationAction}
   */


  listAccountForSale({
    accountSigner,
    accountTarget,
    sellerAccount,
    lockedUntilBlock,
    price,
    newPubkey = null
  }) {
    return new OperationAction('listaccountforsale', {
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget),
      seller_account: new AccountNumber(sellerAccount),
      locked_until_block: lockedUntilBlock !== null ? parseInt(lockedUntilBlock, 10) : lockedUntilBlock,
      price: new Currency(price),
      new_pubkey: newPubkey
    }, this[P_EXECUTOR], Operation, false);
  }
  /**
   * Signs a list operation
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} signerPubkey
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   * @param {AccountNumber|Number|String} sellerAccount
   * @param {Number} lockedUntilBlock
   * @param {Currency} price
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} newPubkey
   *
   * @returns {SignOperationAction}
   */


  signListAccountForSale({
    signerPubkey,
    accountSigner,
    accountTarget,
    sellerAccount,
    lockedUntilBlock,
    price,
    newPubkey = null
  }) {
    return new SignOperationAction('signlistaccountforsale', {
      signer_pubkey: signerPubkey,
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget),
      seller_account: new AccountNumber(sellerAccount),
      locked_until_block: lockedUntilBlock !== null ? parseInt(lockedUntilBlock, 10) : lockedUntilBlock,
      price: new Currency(price),
      new_pubkey: newPubkey
    }, this[P_EXECUTOR], Object, false);
  }
  /**
   * Delists an account
   *
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   *
   * @returns {OperationAction}
   */


  DelistAccountForSale({
    accountSigner,
    accountTarget
  }) {
    return new OperationAction('delistaccountforsale', {
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget)
    }, this[P_EXECUTOR], Operation, false);
  }
  /**
   * Signs a delist operation
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} signerPubkey
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   *
   * @returns {SignOperationAction}
   */


  signDelistAccountForSale({
    signerPubkey,
    accountSigner,
    accountTarget
  }) {
    return new SignOperationAction('signdelistaccountforsale', {
      signer_pubkey: signerPubkey,
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget)
    }, this[P_EXECUTOR], Object, false);
  }
  /**
   * Buys an account
   *
   * @param {AccountNumber|Number|String} buyerAccount
   * @param {AccountNumber|Number|String} accountToPurchase
   * @param {Currency|null} price
   * @param {AccountNumber|Number|String|null} sellerAccount
   *
   * @returns {OperationAction}
   */


  buyAccount({
    buyerAccount,
    accountToPurchase,
    price = null,
    sellerAccount = null
  }) {
    return new OperationAction('buyaccount', {
      buyer_account: new AccountNumber(buyerAccount),
      account_to_purchase: new AccountNumber(accountToPurchase),
      price: price !== null ? new Currency(price) : price,
      seller_account: sellerAccount !== null ? new AccountNumber(sellerAccount) : sellerAccount
    }, this[P_EXECUTOR], Operation, false);
  }
  /**
   * Signs a buy account operation
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} signerPubkey
   * @param {AccountNumber|Number|String} buyerAccount
   * @param {AccountNumber|Number|String} accountToPurchase
   * @param {Currency} price
   * @param {AccountNumber|Number|String} sellerAccount
   *
   * @returns {SignOperationAction}
   */


  signBuyAccount({
    signerPubkey,
    buyerAccount,
    accountToPurchase,
    price,
    sellerAccount
  }) {
    return new SignOperationAction('signbuyaccount', {
      signer_pubkey: signerPubkey,
      buyer_account: new AccountNumber(buyerAccount),
      account_to_purchase: new AccountNumber(accountToPurchase),
      price: new Currency(price),
      seller_account: new AccountNumber(sellerAccount)
    }, this[P_EXECUTOR], Object, false);
  }
  /**
   * Changes account infos
   *
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} newPubkey
   * @param {AccountName|String|null} newName
   * @param {Number|null} newType
   *
   * @returns {OperationAction}
   */


  changeAccountInfo({
    accountSigner,
    accountTarget,
    newPubkey = null,
    newName = null,
    newType = null
  }) {
    return new OperationAction('changeaccountinfo', {
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget),
      new_pubkey: newPubkey,
      new_name: newName !== null ? new AccountName(newName) : newName,
      new_type: newType !== null ? parseInt(newType, 10) : newType
    }, this[P_EXECUTOR], Operation, false);
  }
  /**
   * Signs a change account info operation
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} signerPubkey
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} newPubkey
   * @param {AccountName|String|null} newName
   * @param {Number|null} newType
   *
   * @returns {SignOperationAction}
   */


  signChangeAccountInfo({
    signerPubkey,
    accountSigner,
    accountTarget,
    newPubkey = null,
    newName = null,
    newType = null
  }) {
    return new SignOperationAction('signchangeaccountinfo', {
      signer_pubkey: signerPubkey,
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget),
      new_pubkey: newPubkey,
      new_name: newName !== null ? new AccountName(newName) : newName,
      new_type: newType !== null ? parseInt(newType, 10) : newType
    }, this[P_EXECUTOR], Object, false);
  }
  /**
   * Signs a message using the given public key
   *
   * @param {BC} digest
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} pubkey
   *
   * @returns {BaseAction}
   */


  signMessage({
    digest,
    pubkey
  }) {
    return new BaseAction('signmessage', {
      digest,
      pubkey
    }, this[P_EXECUTOR], SignedMessage, false);
  }
  /**
   * Verifies a signature
   *
   * @param {BC} signature
   * @param {BC} digest
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} pubkey
   *
   * @returns {BaseAction}
   */


  verifySign({
    signature,
    digest,
    pubkey
  }) {
    return new BaseAction('verifysign', {
      signature,
      digest,
      pubkey
    }, this[P_EXECUTOR], SignedMessage, false);
  }
  /**
   * Removes an operation from the given rawoperations.
   *
   * @param {BC} rawoperations
   * @param {Number} index
   *
   * @returns {BaseAction}
   */


  operationsDelete({
    rawoperations,
    index
  }) {
    return new BaseAction('operationsdelete', {
      rawoperations,
      index: index !== null ? parseInt(index, 10) : index
    }, this[P_EXECUTOR], BC, false);
  }
  /**
   * Gets the information about the given operation
   *
   * @param {BC} rawoperations
   *
   * @returns {BaseAction}
   */


  operationsInfo({
    rawoperations
  }) {
    return new BaseAction('operationsinfo', {
      rawoperations
    }, this[P_EXECUTOR], Operation, true);
  }
  /**
   * Executes the given operations
   *
   * @param {BC} rawoperations
   *
   * @returns {BaseAction}
   */


  executeOperations({
    rawoperations
  }) {
    return new BaseAction('executeoperations', {
      rawoperations
    }, this[P_EXECUTOR], Operation, true);
  }
  /**
   * Returns the current node status
   *
   * @returns {BaseAction}
   */


  nodeStatus() {
    return new BaseAction('nodestatus', {}, this[P_EXECUTOR], NodeStatus, false);
  }
  /**
   * Encodes a public key to a pascalcoin public key
   *
   * @param {BC} x
   * @param {BC} y
   * @param {Number} ecNid
   *
   * @returns {BaseAction}
   */


  encodePubKey({
    x,
    y,
    ecNid
  }) {
    return new BaseAction('encodepubkey', {
      x,
      y,
      ec_nid: ecNid !== null ? parseInt(ecNid, 10) : ecNid
    }, this[P_EXECUTOR], BC, false);
  }
  /**
   * Decodes an encoded public key.
   *
   * @param {BC} pubkey
   *
   * @returns {BaseAction}
   */


  decodePubKey({
    pubkey
  }) {
    return new BaseAction('decodepubkey', {
      pubkey
    }, this[P_EXECUTOR], Object, false);
  }
  /**
   * Encrypts a payload
   *
   * @param {BC} payload
   * @param {String} payloadMethod
   * @param {String|null} pwd
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {BaseAction}
   */


  payloadEncrypt({
    payload,
    payloadMethod,
    pwd = null,
    pubkey = null
  }) {
    return new BaseAction('payloadencrypt', {
      payload,
      payload_method: payloadMethod,
      pwd,
      pubkey
    }, this[P_EXECUTOR], BC, false);
  }
  /**
   * Decrypts a payload
   *
   * @param {BC} payload
   * @param {String[]} pwds
   *
   * @returns {BaseAction}
   */


  payloadDecrypt({
    payload,
    pwds
  }) {
    return new BaseAction('payloaddecrypt', {
      payload,
      pwds
    }, this[P_EXECUTOR], BC, false);
  }
  /**
   * Gets the connections of a node.
   *
   * @returns {BaseAction}
   */


  getConnections() {
    return new BaseAction('getconnections', {}, this[P_EXECUTOR], Connection, true);
  }
  /**
   * Generates a new key and adds it to the nodes wallet.
   *
   * @param {Number} ecNid
   * @param {String} name
   *
   * @returns {BaseAction}
   */


  addNewKey({
    ecNid,
    name
  }) {
    return new BaseAction('addnewkey', {
      ec_nid: ecNid !== null ? parseInt(ecNid, 10) : ecNid,
      name
    }, this[P_EXECUTOR], WalletPublicKey, false);
  }
  /**
   * Locks the wallet.
   *
   * @returns {BaseAction}
   */


  lock() {
    return new BaseAction('lock', {}, this[P_EXECUTOR], Boolean, false);
  }
  /**
   * Unlocks the wallet.
   *
   * @param {String} pwd
   *
   * @returns {BaseAction}
   */


  unlock({
    pwd
  }) {
    return new BaseAction('unlock', {
      pwd
    }, this[P_EXECUTOR], Boolean, false);
  }
  /**
   * Sets the wallet password.
   *
   * @param {String} pwd
   *
   * @returns {BaseAction}
   */


  setWalletPassword({
    pwd
  }) {
    return new BaseAction('setwalletpassword', {
      pwd
    }, this[P_EXECUTOR], Boolean, false);
  }
  /**
   * Stops the node.
   *
   * @returns {BaseAction}
   */


  stopNode() {
    return new BaseAction('stopnode', {}, this[P_EXECUTOR], Boolean, false);
  }
  /**
   * Starts the node.
   *
   * @returns {BaseAction}
   */


  startNode() {
    return new BaseAction('startnode', {}, this[P_EXECUTOR], Boolean, false);
  }
  /**
   * Cleans the BlackList.
   *
   * @returns {BaseAction}
   */


  cleanBlackList() {
    return new BaseAction('cleanblacklist', {}, this[P_EXECUTOR], Number, false);
  }
  /**
   * Gets IP stats
   *
   * @returns {BaseAction}
   */


  nodeIPStats() {
    return new BaseAction('node_ip_stats', {}, this[P_EXECUTOR], Object, true);
  }
  /**
   * Adds an operation to a multioperation
   *
   * @param {BC} rawoperations
   * @param {Boolean} autoNOperation
   * @param {Object[]|Sender[]} senders
   * @param {Object[]|Receiver[]} receivers
   * @param {Object[]|Changer[]} changesinfo
   *
   * @returns {BaseAction}
   */


  multiOperationAddOperation({
    rawoperations,
    autoNOperation,
    senders,
    receivers,
    changesinfo
  }) {
    return new BaseAction('multioperationaddoperation', {
      rawoperations,
      auto_n_operation: autoNOperation,
      senders: senders.map(sen => new Sender(sen)),
      receivers: receivers.map(rec => new Receiver(rec)),
      changesinfo: changesinfo.map(chng => new Changer(chng))
    }, this[P_EXECUTOR], BC, true);
  }
  /**
   * Signs the given rawoperations
   *
   * @param {BC} rawoperations
   * @param {Object} accountsAndKeys
   *
   * @returns {BaseAction}
   */


  multiOperationSignOffline({
    rawoperations,
    accountsAndKeys
  }) {
    return new BaseAction('multioperationsignoffline', {
      rawoperations,
      accounts_and_keys: accountsAndKeys
    }, this[P_EXECUTOR], Operation, true);
  }
  /**
   * Signs the given rawoperations online
   *
   * @param {BC} rawoperations
   *
   * @returns {BaseAction}
   */


  multiOperationSignOnline({
    rawoperations
  }) {
    return new BaseAction('multioperationsignonline', {
      rawoperations
    }, this[P_EXECUTOR], Operation, true);
  }

}

module.exports = Client;

/***/ }),

/***/ "./src/Errors/ConnectionError.js":
/*!***************************************!*\
  !*** ./src/Errors/ConnectionError.js ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const P_CALLER = Symbol('caller');

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountName;

const OperationHash = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.OperationHash;

const OperationHashCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding.Pascal.OperationHash;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Keys.PublicKey;

const KeyPair = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Keys.KeyPair;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Currency;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const PublicKeyCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding.Pascal.Keys.PublicKey;

const Block = __webpack_require__(/*! ./Types/Block */ "./src/Types/Block.js");

const WalletPublicKey = __webpack_require__(/*! ./Types/WalletPublicKey */ "./src/Types/WalletPublicKey.js");

const Account = __webpack_require__(/*! ./Types/Account */ "./src/Types/Account.js");

const publicKeyCoder = new PublicKeyCoder();
const opHashCoder = new OperationHashCoder();
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
        newParams[newField] = publicKeyCoder.encodeToBytes(item).toHex();
      } else if (item instanceof WalletPublicKey) {
        newParams[newField] = publicKeyCoder.encodeToBytes(item.publicKey).toHex();
      } else if (item instanceof KeyPair) {
        newParams[newField] = publicKeyCoder.encodeToBytes(item.publicKey).toHex();
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
    } else if (field === 'senders') {
      newParams[field] = item.map(senderItem => {
        let o = {
          account: senderItem.account.account,
          amount: senderItem.amount.toStringOpt(),
          payload: senderItem.payload.toHex()
        };

        if (!isNaN(senderItem.nOperation)) {
          o.n_operation = senderItem.nOperation;
        }

        return o;
      });
    } else if (field === 'receivers') {
      newParams[field] = item.map(receiverItem => {
        return {
          account: receiverItem.account.account,
          amount: receiverItem.amount.toStringOpt(),
          payload: receiverItem.payload.toHex()
        };
      });
    } else if (field === 'changesinfo') {
      newParams[field] = item.map(changerItem => {
        let o = {
          account: changerItem.account.account
        };

        if (changerItem.newPublicKey !== null) {
          o.new_b58_pubkey = new PublicKeyCoder().encodeToBase58(changerItem.newPublicKey);
        }

        if (changerItem.newName !== null) {
          o.new_name = changerItem.newName.toString();
        }

        if (changerItem.newType !== null) {
          o.new_type = changerItem.newType;
        }

        if (!isNaN(changerItem.nOperation)) {
          o.n_operation = changerItem.nOperation;
        }

        return o;
      });
    } else if (item.constructor.name === 'Array') {
      if (item.length > 0) {
        newParams[field] = item;
      }
    } else if (item instanceof BC) {
      newParams[field] = item.toHex();
    } else if (item instanceof OperationHash) {
      newParams[field] = opHashCoder.encodeToBytes(item).toHex();
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

function transformRpcResult(value, DestinationType) {
  switch (DestinationType.name) {
    case 'Boolean':
      return !!value;

    case 'String':
      return value.toString();

    case 'Object':
      return value;

    case 'BC':
      return BC.from(value);

    default:
      return new DestinationType(value);
  }
}

;
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
   * @param {BaseAction} action
   * @param {Function|null} transformCallback
   * @returns {Promise<any>}
   */


  async execute(action, transformCallback = null) {
    transformCallback = transformCallback || this.transform(action.destinationType, action.returnsArray);
    return new Promise((resolve, reject) => {
      this[P_CALLER].call(action.method, transformRpcParams(action.params)).then(response => {
        resolve([response, transformCallback]);
      }).catch(error => {
        reject(error);
      });
    });
  }
  /**
   * Transforms a raw response value to a special type.
   *
   * @param {*} DestinationType
   * @param {Boolean} returnsArray
   * @returns {*}
   */


  transform(DestinationType, returnsArray) {
    if (returnsArray) {
      return function (value) {
        return value.map(v => transformRpcResult(v, DestinationType));
      };
    }

    return function (value) {
      return transformRpcResult(value, DestinationType);
    };
  }

}

module.exports = Executor;

/***/ }),

/***/ "./src/Types/Abstract.js":
/*!*******************************!*\
  !*** ./src/Types/Abstract.js ***!
  \*******************************/
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

}

module.exports = Abstract;

/***/ }),

/***/ "./src/Types/Account.js":
/*!******************************!*\
  !*** ./src/Types/Account.js ***!
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
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountName;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Currency;

const PublicKeyCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding.Pascal.Keys.PublicKey;

const pkCoder = new PublicKeyCoder();
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
    this[P_ENC_PUBKEY] = pkCoder.decodeFromBytes(BC.fromHex(data.enc_pubkey));
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
        this[P_NEW_ENC_PUBKEY] = pkCoder.decodeFromBytes(BC.fromHex(data.new_enc_pubkey));
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");

const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Currency;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountNumber;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const PublicKeyCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding.Pascal.Keys.PublicKey;

const pkCoder = new PublicKeyCoder();
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
    this[P_ENC_PUBKEY] = pkCoder.decodeFromBytes(BC.fromHex(data.enc_pubkey));
    this[P_REWARD] = new Currency(data.reward);
    this[P_FEE] = new Currency(data.fee);
    this[P_VER] = parseInt(data.ver, 10);
    this[P_VER_A] = parseInt(data.ver_a, 10);
    this[P_TIMESTAMP] = parseInt(data.timestamp, 10);
    this[P_TARGET] = new BN(data.target.toString(), 10);
    this[P_NONCE] = new BN(data.nonce.toString(), 10);
    this[P_PAYLOAD] = data.payload;
    this[P_SBH] = BC.fromHex(data.sbh);
    this[P_OPH] = BC.fromHex(data.oph);
    this[P_POW] = BC.fromHex(data.pow);
    this[P_HASHRATEKHS] = new BN(data.hashratekhs.toString(), 10);
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountName;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Currency;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const PublicKeyCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding.Pascal.Keys.PublicKey;

const pkCoder = new PublicKeyCoder();
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
      this[P_NEW_ENC_PUBKEY] = pkCoder.decodeFromBytes(BC.fromHex(data.new_enc_pubkey));
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

/***/ "./src/Types/Connection.js":
/*!*********************************!*\
  !*** ./src/Types/Connection.js ***!
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
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const P_RECV = Symbol('recv');
const P_TIMEDIFF = Symbol('timediff');
const P_NETVER_A = Symbol('nerver_a');
const P_SECS = Symbol('secs');
const P_SERVER = Symbol('server');
const P_IP = Symbol('ip');
const P_NETVER = Symbol('netver');
const P_SENT = Symbol('sent');
const P_APPVER = Symbol('appver');
const P_PORT = Symbol('port');
/**
 * Holds information about a node connection.
 */

class Connection extends Abstract {
  /**
   * Constructor
   *
   * @param {Object} data
   */
  constructor(data) {
    super(data);
    this[P_RECV] = parseInt(data.recv, 10);
    this[P_TIMEDIFF] = parseInt(data.timediff, 10);
    this[P_NETVER_A] = parseInt(data.netver_a, 10);
    this[P_SECS] = parseInt(data.secs, 10);
    this[P_SERVER] = !!data.server;
    this[P_IP] = data.ip;
    this[P_NETVER] = parseInt(data.netver, 10);
    this[P_SENT] = parseInt(data.sent, 10);
    this[P_APPVER] = data.appver;
    this[P_PORT] = parseInt(data.port, 10);
  }
  /**
   * Gets the number of received bytes from the connection.
   *
   * @returns {Number}
   */


  get recv() {
    return this[P_RECV];
  }
  /**
   * Gets the time difference of the current and the remote node in seconds.
   *
   * @returns {Number}
   */


  get timeDiff() {
    return this[P_TIMEDIFF];
  }
  /**
   * Net protocol available of other node
   *
   * @returns {Number}
   */


  get netVerA() {
    return this[P_NETVER_A];
  }
  /**
   * The duration of the connection.
   *
   * @returns {Number}
   */


  get secs() {
    return this[P_SECS];
  }
  /**
   * A flag indicating whether the other node is a server node (daemon).
   * @returns {*}
   */


  get server() {
    return this[P_SERVER];
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


  get netVer() {
    return this[P_NETVER];
  }
  /**
   * The bytes sent to the other node.
   *
   * @returns {*}
   */


  get sent() {
    return this[P_SENT];
  }
  /**
   * The node version.
   *
   * @returns {*}
   */


  get appVer() {
    return this[P_APPVER];
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

/***/ "./src/Types/NetProtocol.js":
/*!**********************************!*\
  !*** ./src/Types/NetProtocol.js ***!
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
/*! all exports used */
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
/*! all exports used */
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountNumber;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Currency;

const OperationHashCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding.Pascal.OperationHash;

const opHashCoder = new OperationHashCoder();

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
        this[P_OPHASH] = opHashCoder.decodeFromBytes(this[P_OPHASH]);
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


  get opBlock() {
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


  get subType() {
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

/***/ "./src/Types/Receiver.js":
/*!*******************************!*\
  !*** ./src/Types/Receiver.js ***!
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
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountNumber;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Currency;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.AccountNumber;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Currency;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

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

/***/ "./src/Types/SignedMessage.js":
/*!************************************!*\
  !*** ./src/Types/SignedMessage.js ***!
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
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const PublicKeyCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding.Pascal.Keys.PublicKey;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const P_DIGEST = Symbol('digest');
const P_PUBKEY = Symbol('public_key');
const P_SIGNATURE = Symbol('signature');
/**
 * Represents a sender in an operation.
 */

class SignedMessage extends Abstract {
  /**
     * Creates a new instance of the Sender class.
     *
     * @param {Object} data
     */
  constructor(data) {
    super(data);
    this[P_DIGEST] = BC.fromHex(data.digest);

    if (data.enc_pubkey !== undefined) {
      this[P_PUBKEY] = new PublicKeyCoder().decodeFromBytes(BC.fromHex(data.enc_pubkey));
    } else {
      this[P_PUBKEY] = new PublicKeyCoder().decodeFromBase58(data.b58_pubkey);
    }

    this[P_SIGNATURE] = BC.fromHex(data.signature);
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
    return this[P_PUBKEY];
  }
  /**
     * Gets the signature.
     *
     * @returns {BC}
     */


  get amount() {
    return this[P_SIGNATURE];
  }

}

module.exports = SignedMessage;

/***/ }),

/***/ "./src/Types/WalletPublicKey.js":
/*!**************************************!*\
  !*** ./src/Types/WalletPublicKey.js ***!
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
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const Curve = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Keys.Curve;

const PublicKeyCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding.Pascal.Keys.PublicKey;

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
    this[P_ENC_PUBKEY] = new PublicKeyCoder().decodeFromBytes(BC.fromHex(data.publicKey));
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
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
  WalletPublicKey: __webpack_require__(/*! ./WalletPublicKey */ "./src/Types/WalletPublicKey.js")
};

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ben/Code/crypto/pascalcoin/untitled/packages/json-rpc/index.js */"./index.js");


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

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
});
//# sourceMappingURL=json-rpc.node.js.map