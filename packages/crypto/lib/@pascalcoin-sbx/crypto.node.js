(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@pascalcoin-sbx/crypto", [], factory);
	else if(typeof exports === 'object')
		exports["@pascalcoin-sbx/crypto"] = factory();
	else
		root["@pascalcoin-sbx/crypto"] = factory();
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

/***/ "../../node_modules/brorand/index.js":
/*!*******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/brorand/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var r;

module.exports = function rand(len) {
  if (!r)
    r = new Rand(null);

  return r.generate(len);
};

function Rand(rand) {
  this.rand = rand;
}
module.exports.Rand = Rand;

Rand.prototype.generate = function generate(len) {
  return this._rand(len);
};

// Emulate crypto API using randy
Rand.prototype._rand = function _rand(n) {
  if (this.rand.getBytes)
    return this.rand.getBytes(n);

  var res = new Uint8Array(n);
  for (var i = 0; i < res.length; i++)
    res[i] = this.rand.getByte();
  return res;
};

if (typeof self === 'object') {
  if (self.crypto && self.crypto.getRandomValues) {
    // Modern browsers
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.crypto.getRandomValues(arr);
      return arr;
    };
  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
    // IE
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.msCrypto.getRandomValues(arr);
      return arr;
    };

  // Safari's WebWorkers do not have `crypto`
  } else if (typeof window === 'object') {
    // Old junk
    Rand.prototype._rand = function() {
      throw new Error('Not implemented yet');
    };
  }
} else {
  // Node.js or Web worker with no crypto support
  try {
    var crypto = __webpack_require__(/*! crypto */ "crypto");
    if (typeof crypto.randomBytes !== 'function')
      throw new Error('Not supported');

    Rand.prototype._rand = function _rand(n) {
      return crypto.randomBytes(n);
    };
  } catch (e) {
  }
}


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

/***/ "../../node_modules/crypto-js/core.js":
/*!********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/crypto-js/core.js ***!
  \********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),

/***/ "../../node_modules/crypto-js/enc-hex.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/crypto-js/enc-hex.js ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));

/***/ }),

/***/ "../../node_modules/crypto-js/hmac-md5.js":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/crypto-js/hmac-md5.js ***!
  \************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./md5 */ "../../node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./hmac */ "../../node_modules/crypto-js/hmac.js"));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS.HmacMD5;

}));

/***/ }),

/***/ "../../node_modules/crypto-js/hmac.js":
/*!********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/crypto-js/hmac.js ***!
  \********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));

/***/ }),

/***/ "../../node_modules/crypto-js/md5.js":
/*!*******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/crypto-js/md5.js ***!
  \*******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic.js":
/*!***************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elliptic = exports;

elliptic.version = __webpack_require__(/*! ../package.json */ "../../node_modules/elliptic/package.json").version;
elliptic.utils = __webpack_require__(/*! ./elliptic/utils */ "../../node_modules/elliptic/lib/elliptic/utils.js");
elliptic.rand = __webpack_require__(/*! brorand */ "../../node_modules/brorand/index.js");
elliptic.curve = __webpack_require__(/*! ./elliptic/curve */ "../../node_modules/elliptic/lib/elliptic/curve/index.js");
elliptic.curves = __webpack_require__(/*! ./elliptic/curves */ "../../node_modules/elliptic/lib/elliptic/curves.js");

// Protocols
elliptic.ec = __webpack_require__(/*! ./elliptic/ec */ "../../node_modules/elliptic/lib/elliptic/ec/index.js");
elliptic.eddsa = __webpack_require__(/*! ./elliptic/eddsa */ "../../node_modules/elliptic/lib/elliptic/eddsa/index.js");


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/curve/base.js":
/*!**************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/curve/base.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");
var elliptic = __webpack_require__(/*! ../../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var getNAF = utils.getNAF;
var getJSF = utils.getJSF;
var assert = utils.assert;

function BaseCurve(type, conf) {
  this.type = type;
  this.p = new BN(conf.p, 16);

  // Use Montgomery, when there is no fast reduction for the prime
  this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);

  // Useful for many curves
  this.zero = new BN(0).toRed(this.red);
  this.one = new BN(1).toRed(this.red);
  this.two = new BN(2).toRed(this.red);

  // Curve configuration, optional
  this.n = conf.n && new BN(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

  // Temporary arrays
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);

  // Generalized Greg Maxwell's trick
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
module.exports = BaseCurve;

BaseCurve.prototype.point = function point() {
  throw new Error('Not implemented');
};

BaseCurve.prototype.validate = function validate() {
  throw new Error('Not implemented');
};

BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
  assert(p.precomputed);
  var doubles = p._getDoubles();

  var naf = getNAF(k, 1);
  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
  I /= 3;

  // Translate into more windowed form
  var repr = [];
  for (var j = 0; j < naf.length; j += doubles.step) {
    var nafW = 0;
    for (var k = j + doubles.step - 1; k >= j; k--)
      nafW = (nafW << 1) + naf[k];
    repr.push(nafW);
  }

  var a = this.jpoint(null, null, null);
  var b = this.jpoint(null, null, null);
  for (var i = I; i > 0; i--) {
    for (var j = 0; j < repr.length; j++) {
      var nafW = repr[j];
      if (nafW === i)
        b = b.mixedAdd(doubles.points[j]);
      else if (nafW === -i)
        b = b.mixedAdd(doubles.points[j].neg());
    }
    a = a.add(b);
  }
  return a.toP();
};

BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
  var w = 4;

  // Precompute window
  var nafPoints = p._getNAFPoints(w);
  w = nafPoints.wnd;
  var wnd = nafPoints.points;

  // Get NAF form
  var naf = getNAF(k, w);

  // Add `this`*(N+1) for every w-NAF index
  var acc = this.jpoint(null, null, null);
  for (var i = naf.length - 1; i >= 0; i--) {
    // Count zeroes
    for (var k = 0; i >= 0 && naf[i] === 0; i--)
      k++;
    if (i >= 0)
      k++;
    acc = acc.dblp(k);

    if (i < 0)
      break;
    var z = naf[i];
    assert(z !== 0);
    if (p.type === 'affine') {
      // J +- P
      if (z > 0)
        acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
      else
        acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
    } else {
      // J +- J
      if (z > 0)
        acc = acc.add(wnd[(z - 1) >> 1]);
      else
        acc = acc.add(wnd[(-z - 1) >> 1].neg());
    }
  }
  return p.type === 'affine' ? acc.toP() : acc;
};

BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
                                                       points,
                                                       coeffs,
                                                       len,
                                                       jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3;

  // Fill all arrays
  var max = 0;
  for (var i = 0; i < len; i++) {
    var p = points[i];
    var nafPoints = p._getNAFPoints(defW);
    wndWidth[i] = nafPoints.wnd;
    wnd[i] = nafPoints.points;
  }

  // Comb small window NAFs
  for (var i = len - 1; i >= 1; i -= 2) {
    var a = i - 1;
    var b = i;
    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
      naf[a] = getNAF(coeffs[a], wndWidth[a]);
      naf[b] = getNAF(coeffs[b], wndWidth[b]);
      max = Math.max(naf[a].length, max);
      max = Math.max(naf[b].length, max);
      continue;
    }

    var comb = [
      points[a], /* 1 */
      null, /* 3 */
      null, /* 5 */
      points[b] /* 7 */
    ];

    // Try to avoid Projective points, if possible
    if (points[a].y.cmp(points[b].y) === 0) {
      comb[1] = points[a].add(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].add(points[b].neg());
    } else {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    }

    var index = [
      -3, /* -1 -1 */
      -1, /* -1 0 */
      -5, /* -1 1 */
      -7, /* 0 -1 */
      0, /* 0 0 */
      7, /* 0 1 */
      5, /* 1 -1 */
      1, /* 1 0 */
      3  /* 1 1 */
    ];

    var jsf = getJSF(coeffs[a], coeffs[b]);
    max = Math.max(jsf[0].length, max);
    naf[a] = new Array(max);
    naf[b] = new Array(max);
    for (var j = 0; j < max; j++) {
      var ja = jsf[0][j] | 0;
      var jb = jsf[1][j] | 0;

      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
      naf[b][j] = 0;
      wnd[a] = comb;
    }
  }

  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;
  for (var i = max; i >= 0; i--) {
    var k = 0;

    while (i >= 0) {
      var zero = true;
      for (var j = 0; j < len; j++) {
        tmp[j] = naf[j][i] | 0;
        if (tmp[j] !== 0)
          zero = false;
      }
      if (!zero)
        break;
      k++;
      i--;
    }
    if (i >= 0)
      k++;
    acc = acc.dblp(k);
    if (i < 0)
      break;

    for (var j = 0; j < len; j++) {
      var z = tmp[j];
      var p;
      if (z === 0)
        continue;
      else if (z > 0)
        p = wnd[j][(z - 1) >> 1];
      else if (z < 0)
        p = wnd[j][(-z - 1) >> 1].neg();

      if (p.type === 'affine')
        acc = acc.mixedAdd(p);
      else
        acc = acc.add(p);
    }
  }
  // Zeroify references
  for (var i = 0; i < len; i++)
    wnd[i] = null;

  if (jacobianResult)
    return acc;
  else
    return acc.toP();
};

function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}
BaseCurve.BasePoint = BasePoint;

BasePoint.prototype.eq = function eq(/*other*/) {
  throw new Error('Not implemented');
};

BasePoint.prototype.validate = function validate() {
  return this.curve.validate(this);
};

BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils.toArray(bytes, enc);

  var len = this.p.byteLength();

  // uncompressed, hybrid-odd, hybrid-even
  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
      bytes.length - 1 === 2 * len) {
    if (bytes[0] === 0x06)
      assert(bytes[bytes.length - 1] % 2 === 0);
    else if (bytes[0] === 0x07)
      assert(bytes[bytes.length - 1] % 2 === 1);

    var res =  this.point(bytes.slice(1, 1 + len),
                          bytes.slice(1 + len, 1 + 2 * len));

    return res;
  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
              bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
  }
  throw new Error('Unknown point format');
};

BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};

BasePoint.prototype._encode = function _encode(compact) {
  var len = this.curve.p.byteLength();
  var x = this.getX().toArray('be', len);

  if (compact)
    return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

  return [ 0x04 ].concat(x, this.getY().toArray('be', len)) ;
};

BasePoint.prototype.encode = function encode(enc, compact) {
  return utils.encode(this._encode(compact), enc);
};

BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed)
    return this;

  var precomputed = {
    doubles: null,
    naf: null,
    beta: null
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;

  return this;
};

BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
  if (!this.precomputed)
    return false;

  var doubles = this.precomputed.doubles;
  if (!doubles)
    return false;

  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
};

BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;

  var doubles = [ this ];
  var acc = this;
  for (var i = 0; i < power; i += step) {
    for (var j = 0; j < step; j++)
      acc = acc.dbl();
    doubles.push(acc);
  }
  return {
    step: step,
    points: doubles
  };
};

BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;

  var res = [ this ];
  var max = (1 << wnd) - 1;
  var dbl = max === 1 ? null : this.dbl();
  for (var i = 1; i < max; i++)
    res[i] = res[i - 1].add(dbl);
  return {
    wnd: wnd,
    points: res
  };
};

BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};

BasePoint.prototype.dblp = function dblp(k) {
  var r = this;
  for (var i = 0; i < k; i++)
    r = r.dbl();
  return r;
};


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/curve/edwards.js":
/*!*****************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/curve/edwards.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = __webpack_require__(/*! ../curve */ "../../node_modules/elliptic/lib/elliptic/curve/index.js");
var elliptic = __webpack_require__(/*! ../../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");
var BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");
var inherits = __webpack_require__(/*! inherits */ "../../node_modules/inherits/inherits.js");
var Base = curve.base;

var assert = elliptic.utils.assert;

function EdwardsCurve(conf) {
  // NOTE: Important as we are creating point in Base.call()
  this.twisted = (conf.a | 0) !== 1;
  this.mOneA = this.twisted && (conf.a | 0) === -1;
  this.extended = this.mOneA;

  Base.call(this, 'edwards', conf);

  this.a = new BN(conf.a, 16).umod(this.red.m);
  this.a = this.a.toRed(this.red);
  this.c = new BN(conf.c, 16).toRed(this.red);
  this.c2 = this.c.redSqr();
  this.d = new BN(conf.d, 16).toRed(this.red);
  this.dd = this.d.redAdd(this.d);

  assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
  this.oneC = (conf.c | 0) === 1;
}
inherits(EdwardsCurve, Base);
module.exports = EdwardsCurve;

EdwardsCurve.prototype._mulA = function _mulA(num) {
  if (this.mOneA)
    return num.redNeg();
  else
    return this.a.redMul(num);
};

EdwardsCurve.prototype._mulC = function _mulC(num) {
  if (this.oneC)
    return num;
  else
    return this.c.redMul(num);
};

// Just for compatibility with Short curve
EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
  return this.point(x, y, z, t);
};

EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var x2 = x.redSqr();
  var rhs = this.c2.redSub(this.a.redMul(x2));
  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

  var y2 = rhs.redMul(lhs.redInvm());
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
  y = new BN(y, 16);
  if (!y.red)
    y = y.toRed(this.red);

  // x^2 = (y^2 - c^2) / (c^2 d y^2 - a)
  var y2 = y.redSqr();
  var lhs = y2.redSub(this.c2);
  var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
  var x2 = lhs.redMul(rhs.redInvm());

  if (x2.cmp(this.zero) === 0) {
    if (odd)
      throw new Error('invalid point');
    else
      return this.point(this.zero, y);
  }

  var x = x2.redSqrt();
  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  if (x.fromRed().isOdd() !== odd)
    x = x.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.validate = function validate(point) {
  if (point.isInfinity())
    return true;

  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
  point.normalize();

  var x2 = point.x.redSqr();
  var y2 = point.y.redSqr();
  var lhs = x2.redMul(this.a).redAdd(y2);
  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

  return lhs.cmp(rhs) === 0;
};

function Point(curve, x, y, z, t) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && y === null && z === null) {
    this.x = this.curve.zero;
    this.y = this.curve.one;
    this.z = this.curve.one;
    this.t = this.curve.zero;
    this.zOne = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = z ? new BN(z, 16) : this.curve.one;
    this.t = t && new BN(t, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
    if (this.t && !this.t.red)
      this.t = this.t.toRed(this.curve.red);
    this.zOne = this.z === this.curve.one;

    // Use extended coordinates
    if (this.curve.extended && !this.t) {
      this.t = this.x.redMul(this.y);
      if (!this.zOne)
        this.t = this.t.redMul(this.z.redInvm());
    }
  }
}
inherits(Point, Base.BasePoint);

EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

EdwardsCurve.prototype.point = function point(x, y, z, t) {
  return new Point(this, x, y, z, t);
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1], obj[2]);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.x.cmpn(0) === 0 &&
    (this.y.cmp(this.z) === 0 ||
    (this.zOne && this.y.cmp(this.curve.c) === 0));
};

Point.prototype._extDbl = function _extDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #doubling-dbl-2008-hwcd
  // 4M + 4S

  // A = X1^2
  var a = this.x.redSqr();
  // B = Y1^2
  var b = this.y.redSqr();
  // C = 2 * Z1^2
  var c = this.z.redSqr();
  c = c.redIAdd(c);
  // D = a * A
  var d = this.curve._mulA(a);
  // E = (X1 + Y1)^2 - A - B
  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
  // G = D + B
  var g = d.redAdd(b);
  // F = G - C
  var f = g.redSub(c);
  // H = D - B
  var h = d.redSub(b);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projDbl = function _projDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #doubling-dbl-2008-bbjlp
  //     #doubling-dbl-2007-bl
  // and others
  // Generally 3M + 4S or 2M + 4S

  // B = (X1 + Y1)^2
  var b = this.x.redAdd(this.y).redSqr();
  // C = X1^2
  var c = this.x.redSqr();
  // D = Y1^2
  var d = this.y.redSqr();

  var nx;
  var ny;
  var nz;
  if (this.curve.twisted) {
    // E = a * C
    var e = this.curve._mulA(c);
    // F = E + D
    var f = e.redAdd(d);
    if (this.zOne) {
      // X3 = (B - C - D) * (F - 2)
      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F^2 - 2 * F
      nz = f.redSqr().redSub(f).redSub(f);
    } else {
      // H = Z1^2
      var h = this.z.redSqr();
      // J = F - 2 * H
      var j = f.redSub(h).redISub(h);
      // X3 = (B-C-D)*J
      nx = b.redSub(c).redISub(d).redMul(j);
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F * J
      nz = f.redMul(j);
    }
  } else {
    // E = C + D
    var e = c.redAdd(d);
    // H = (c * Z1)^2
    var h = this.curve._mulC(this.z).redSqr();
    // J = E - 2 * H
    var j = e.redSub(h).redSub(h);
    // X3 = c * (B - E) * J
    nx = this.curve._mulC(b.redISub(e)).redMul(j);
    // Y3 = c * E * (C - D)
    ny = this.curve._mulC(e).redMul(c.redISub(d));
    // Z3 = E * J
    nz = e.redMul(j);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  // Double in extended coordinates
  if (this.curve.extended)
    return this._extDbl();
  else
    return this._projDbl();
};

Point.prototype._extAdd = function _extAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #addition-add-2008-hwcd-3
  // 8M

  // A = (Y1 - X1) * (Y2 - X2)
  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
  // B = (Y1 + X1) * (Y2 + X2)
  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
  // C = T1 * k * T2
  var c = this.t.redMul(this.curve.dd).redMul(p.t);
  // D = Z1 * 2 * Z2
  var d = this.z.redMul(p.z.redAdd(p.z));
  // E = B - A
  var e = b.redSub(a);
  // F = D - C
  var f = d.redSub(c);
  // G = D + C
  var g = d.redAdd(c);
  // H = B + A
  var h = b.redAdd(a);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projAdd = function _projAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #addition-add-2008-bbjlp
  //     #addition-add-2007-bl
  // 10M + 1S

  // A = Z1 * Z2
  var a = this.z.redMul(p.z);
  // B = A^2
  var b = a.redSqr();
  // C = X1 * X2
  var c = this.x.redMul(p.x);
  // D = Y1 * Y2
  var d = this.y.redMul(p.y);
  // E = d * C * D
  var e = this.curve.d.redMul(c).redMul(d);
  // F = B - E
  var f = b.redSub(e);
  // G = B + E
  var g = b.redAdd(e);
  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
  var nx = a.redMul(f).redMul(tmp);
  var ny;
  var nz;
  if (this.curve.twisted) {
    // Y3 = A * G * (D - a * C)
    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
    // Z3 = F * G
    nz = f.redMul(g);
  } else {
    // Y3 = A * G * (D - C)
    ny = a.redMul(g).redMul(d.redSub(c));
    // Z3 = c * F * G
    nz = this.curve._mulC(f).redMul(g);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.add = function add(p) {
  if (this.isInfinity())
    return p;
  if (p.isInfinity())
    return this;

  if (this.curve.extended)
    return this._extAdd(p);
  else
    return this._projAdd(p);
};

Point.prototype.mul = function mul(k) {
  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
};

Point.prototype.normalize = function normalize() {
  if (this.zOne)
    return this;

  // Normalize coordinates
  var zi = this.z.redInvm();
  this.x = this.x.redMul(zi);
  this.y = this.y.redMul(zi);
  if (this.t)
    this.t = this.t.redMul(zi);
  this.z = this.curve.one;
  this.zOne = true;
  return this;
};

Point.prototype.neg = function neg() {
  return this.curve.point(this.x.redNeg(),
                          this.y,
                          this.z,
                          this.t && this.t.redNeg());
};

Point.prototype.getX = function getX() {
  this.normalize();
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  this.normalize();
  return this.y.fromRed();
};

Point.prototype.eq = function eq(other) {
  return this === other ||
         this.getX().cmp(other.getX()) === 0 &&
         this.getY().cmp(other.getY()) === 0;
};

Point.prototype.eqXToP = function eqXToP(x) {
  var rx = x.toRed(this.curve.red).redMul(this.z);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(this.z);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};

// Compatibility with BaseCurve
Point.prototype.toP = Point.prototype.normalize;
Point.prototype.mixedAdd = Point.prototype.add;


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/curve/index.js":
/*!***************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/curve/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = exports;

curve.base = __webpack_require__(/*! ./base */ "../../node_modules/elliptic/lib/elliptic/curve/base.js");
curve.short = __webpack_require__(/*! ./short */ "../../node_modules/elliptic/lib/elliptic/curve/short.js");
curve.mont = __webpack_require__(/*! ./mont */ "../../node_modules/elliptic/lib/elliptic/curve/mont.js");
curve.edwards = __webpack_require__(/*! ./edwards */ "../../node_modules/elliptic/lib/elliptic/curve/edwards.js");


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/curve/mont.js":
/*!**************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/curve/mont.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = __webpack_require__(/*! ../curve */ "../../node_modules/elliptic/lib/elliptic/curve/index.js");
var BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");
var inherits = __webpack_require__(/*! inherits */ "../../node_modules/inherits/inherits.js");
var Base = curve.base;

var elliptic = __webpack_require__(/*! ../../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;

function MontCurve(conf) {
  Base.call(this, 'mont', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.i4 = new BN(4).toRed(this.red).redInvm();
  this.two = new BN(2).toRed(this.red);
  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
inherits(MontCurve, Base);
module.exports = MontCurve;

MontCurve.prototype.validate = function validate(point) {
  var x = point.normalize().x;
  var x2 = x.redSqr();
  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
  var y = rhs.redSqrt();

  return y.redSqr().cmp(rhs) === 0;
};

function Point(curve, x, z) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && z === null) {
    this.x = this.curve.one;
    this.z = this.curve.zero;
  } else {
    this.x = new BN(x, 16);
    this.z = new BN(z, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
  }
}
inherits(Point, Base.BasePoint);

MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  return this.point(utils.toArray(bytes, enc), 1);
};

MontCurve.prototype.point = function point(x, z) {
  return new Point(this, x, z);
};

MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

Point.prototype.precompute = function precompute() {
  // No-op
};

Point.prototype._encode = function _encode() {
  return this.getX().toArray('be', this.curve.p.byteLength());
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1] || curve.one);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};

Point.prototype.dbl = function dbl() {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
  // 2M + 2S + 4A

  // A = X1 + Z1
  var a = this.x.redAdd(this.z);
  // AA = A^2
  var aa = a.redSqr();
  // B = X1 - Z1
  var b = this.x.redSub(this.z);
  // BB = B^2
  var bb = b.redSqr();
  // C = AA - BB
  var c = aa.redSub(bb);
  // X3 = AA * BB
  var nx = aa.redMul(bb);
  // Z3 = C * (BB + A24 * C)
  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
  return this.curve.point(nx, nz);
};

Point.prototype.add = function add() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.diffAdd = function diffAdd(p, diff) {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
  // 4M + 2S + 6A

  // A = X2 + Z2
  var a = this.x.redAdd(this.z);
  // B = X2 - Z2
  var b = this.x.redSub(this.z);
  // C = X3 + Z3
  var c = p.x.redAdd(p.z);
  // D = X3 - Z3
  var d = p.x.redSub(p.z);
  // DA = D * A
  var da = d.redMul(a);
  // CB = C * B
  var cb = c.redMul(b);
  // X5 = Z1 * (DA + CB)^2
  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
  // Z5 = X1 * (DA - CB)^2
  var nz = diff.x.redMul(da.redISub(cb).redSqr());
  return this.curve.point(nx, nz);
};

Point.prototype.mul = function mul(k) {
  var t = k.clone();
  var a = this; // (N / 2) * Q + Q
  var b = this.curve.point(null, null); // (N / 2) * Q
  var c = this; // Q

  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
    bits.push(t.andln(1));

  for (var i = bits.length - 1; i >= 0; i--) {
    if (bits[i] === 0) {
      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
      a = a.diffAdd(b, c);
      // N * Q = 2 * ((N / 2) * Q + Q))
      b = b.dbl();
    } else {
      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
      b = a.diffAdd(b, c);
      // N * Q + Q = 2 * ((N / 2) * Q + Q)
      a = a.dbl();
    }
  }
  return b;
};

Point.prototype.mulAdd = function mulAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.jumlAdd = function jumlAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.eq = function eq(other) {
  return this.getX().cmp(other.getX()) === 0;
};

Point.prototype.normalize = function normalize() {
  this.x = this.x.redMul(this.z.redInvm());
  this.z = this.curve.one;
  return this;
};

Point.prototype.getX = function getX() {
  // Normalize coordinates
  this.normalize();

  return this.x.fromRed();
};


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/curve/short.js":
/*!***************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/curve/short.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = __webpack_require__(/*! ../curve */ "../../node_modules/elliptic/lib/elliptic/curve/index.js");
var elliptic = __webpack_require__(/*! ../../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");
var BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");
var inherits = __webpack_require__(/*! inherits */ "../../node_modules/inherits/inherits.js");
var Base = curve.base;

var assert = elliptic.utils.assert;

function ShortCurve(conf) {
  Base.call(this, 'short', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();

  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

  // If the curve is endomorphic, precalculate beta and lambda
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
inherits(ShortCurve, Base);
module.exports = ShortCurve;

ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  // No efficient endomorphism
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
    return;

  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
  var beta;
  var lambda;
  if (conf.beta) {
    beta = new BN(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p);
    // Choose the smallest beta
    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }
  if (conf.lambda) {
    lambda = new BN(conf.lambda, 16);
  } else {
    // Choose the lambda that is matching selected beta
    var lambdas = this._getEndoRoots(this.n);
    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  }

  // Get basis vectors, used for balanced length-two representation
  var basis;
  if (conf.basis) {
    basis = conf.basis.map(function(vec) {
      return {
        a: new BN(vec.a, 16),
        b: new BN(vec.b, 16)
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }

  return {
    beta: beta,
    lambda: lambda,
    basis: basis
  };
};

ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  // Find roots of for x^2 + x + 1 in F
  // Root = (-1 +- Sqrt(-3)) / 2
  //
  var red = num === this.p ? this.red : BN.mont(num);
  var tinv = new BN(2).toRed(red).redInvm();
  var ntinv = tinv.redNeg();

  var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);

  var l1 = ntinv.redAdd(s).fromRed();
  var l2 = ntinv.redSub(s).fromRed();
  return [ l1, l2 ];
};

ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  // aprxSqrt >= sqrt(this.n)
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

  // 3.74
  // Run EGCD, until r(L + 1) < aprxSqrt
  var u = lambda;
  var v = this.n.clone();
  var x1 = new BN(1);
  var y1 = new BN(0);
  var x2 = new BN(0);
  var y2 = new BN(1);

  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
  var a0;
  var b0;
  // First vector
  var a1;
  var b1;
  // Second vector
  var a2;
  var b2;

  var prevR;
  var i = 0;
  var r;
  var x;
  while (u.cmpn(0) !== 0) {
    var q = v.div(u);
    r = v.sub(q.mul(u));
    x = x2.sub(q.mul(x1));
    var y = y2.sub(q.mul(y1));

    if (!a1 && r.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r.neg();
      b1 = x;
    } else if (a1 && ++i === 2) {
      break;
    }
    prevR = r;

    v = u;
    u = r;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
  }
  a2 = r.neg();
  b2 = x;

  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a2.sqr().add(b2.sqr());
  if (len2.cmp(len1) >= 0) {
    a2 = a0;
    b2 = b0;
  }

  // Normalize signs
  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }
  if (a2.negative) {
    a2 = a2.neg();
    b2 = b2.neg();
  }

  return [
    { a: a1, b: b1 },
    { a: a2, b: b2 }
  ];
};

ShortCurve.prototype._endoSplit = function _endoSplit(k) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v2 = basis[1];

  var c1 = v2.b.mul(k).divRound(this.n);
  var c2 = v1.b.neg().mul(k).divRound(this.n);

  var p1 = c1.mul(v1.a);
  var p2 = c2.mul(v2.a);
  var q1 = c1.mul(v1.b);
  var q2 = c2.mul(v2.b);

  // Calculate answer
  var k1 = k.sub(p1).sub(p2);
  var k2 = q1.add(q2).neg();
  return { k1: k1, k2: k2 };
};

ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  // XXX Is there any way to tell if the number is odd without converting it
  // to non-red form?
  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

ShortCurve.prototype.validate = function validate(point) {
  if (point.inf)
    return true;

  var x = point.x;
  var y = point.y;

  var ax = this.a.redMul(x);
  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
  return y.redSqr().redISub(rhs).cmpn(0) === 0;
};

ShortCurve.prototype._endoWnafMulAdd =
    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
  var npoints = this._endoWnafT1;
  var ncoeffs = this._endoWnafT2;
  for (var i = 0; i < points.length; i++) {
    var split = this._endoSplit(coeffs[i]);
    var p = points[i];
    var beta = p._getBeta();

    if (split.k1.negative) {
      split.k1.ineg();
      p = p.neg(true);
    }
    if (split.k2.negative) {
      split.k2.ineg();
      beta = beta.neg(true);
    }

    npoints[i * 2] = p;
    npoints[i * 2 + 1] = beta;
    ncoeffs[i * 2] = split.k1;
    ncoeffs[i * 2 + 1] = split.k2;
  }
  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

  // Clean-up references to points and coefficients
  for (var j = 0; j < i * 2; j++) {
    npoints[j] = null;
    ncoeffs[j] = null;
  }
  return res;
};

function Point(curve, x, y, isRed) {
  Base.BasePoint.call(this, curve, 'affine');
  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    // Force redgomery representation when loading from JSON
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
inherits(Point, Base.BasePoint);

ShortCurve.prototype.point = function point(x, y, isRed) {
  return new Point(this, x, y, isRed);
};

ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
  return Point.fromJSON(this, obj, red);
};

Point.prototype._getBeta = function _getBeta() {
  if (!this.curve.endo)
    return;

  var pre = this.precomputed;
  if (pre && pre.beta)
    return pre.beta;

  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
  if (pre) {
    var curve = this.curve;
    var endoMul = function(p) {
      return curve.point(p.x.redMul(curve.endo.beta), p.y);
    };
    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul)
      }
    };
  }
  return beta;
};

Point.prototype.toJSON = function toJSON() {
  if (!this.precomputed)
    return [ this.x, this.y ];

  return [ this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  } ];
};

Point.fromJSON = function fromJSON(curve, obj, red) {
  if (typeof obj === 'string')
    obj = JSON.parse(obj);
  var res = curve.point(obj[0], obj[1], red);
  if (!obj[2])
    return res;

  function obj2point(obj) {
    return curve.point(obj[0], obj[1], red);
  }

  var pre = obj[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [ res ].concat(pre.doubles.points.map(obj2point))
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [ res ].concat(pre.naf.points.map(obj2point))
    }
  };
  return res;
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  return this.inf;
};

Point.prototype.add = function add(p) {
  // O + P = P
  if (this.inf)
    return p;

  // P + O = P
  if (p.inf)
    return this;

  // P + P = 2P
  if (this.eq(p))
    return this.dbl();

  // P + (-P) = O
  if (this.neg().eq(p))
    return this.curve.point(null, null);

  // P + Q = O
  if (this.x.cmp(p.x) === 0)
    return this.curve.point(null, null);

  var c = this.y.redSub(p.y);
  if (c.cmpn(0) !== 0)
    c = c.redMul(this.x.redSub(p.x).redInvm());
  var nx = c.redSqr().redISub(this.x).redISub(p.x);
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.dbl = function dbl() {
  if (this.inf)
    return this;

  // 2P = O
  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0)
    return this.curve.point(null, null);

  var a = this.curve.a;

  var x2 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.getX = function getX() {
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  return this.y.fromRed();
};

Point.prototype.mul = function mul(k) {
  k = new BN(k, 16);

  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else if (this.curve.endo)
    return this.curve._endoWnafMulAdd([ this ], [ k ]);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs, true);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};

Point.prototype.eq = function eq(p) {
  return this === p ||
         this.inf === p.inf &&
             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
};

Point.prototype.neg = function neg(_precompute) {
  if (this.inf)
    return this;

  var res = this.curve.point(this.x, this.y.redNeg());
  if (_precompute && this.precomputed) {
    var pre = this.precomputed;
    var negate = function(p) {
      return p.neg();
    };
    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate)
      }
    };
  }
  return res;
};

Point.prototype.toJ = function toJ() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);

  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};

function JPoint(curve, x, y, z) {
  Base.BasePoint.call(this, curve, 'jacobian');
  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new BN(0);
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = new BN(z, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);

  this.zOne = this.z === this.curve.one;
}
inherits(JPoint, Base.BasePoint);

ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
  return new JPoint(this, x, y, z);
};

JPoint.prototype.toP = function toP() {
  if (this.isInfinity())
    return this.curve.point(null, null);

  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);

  return this.curve.point(ax, ay);
};

JPoint.prototype.neg = function neg() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};

JPoint.prototype.add = function add(p) {
  // O + P = P
  if (this.isInfinity())
    return p;

  // P + O = P
  if (p.isInfinity())
    return this;

  // 12M + 4S + 7A
  var pz2 = p.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u2 = p.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p.z));
  var s2 = p.y.redMul(z2.redMul(this.z));

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p.z).redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mixedAdd = function mixedAdd(p) {
  // O + P = P
  if (this.isInfinity())
    return p.toJ();

  // P + O = P
  if (p.isInfinity())
    return this;

  // 8M + 3S + 7A
  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u2 = p.x.redMul(z2);
  var s1 = this.y;
  var s2 = p.y.redMul(z2).redMul(this.z);

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.dblp = function dblp(pow) {
  if (pow === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!pow)
    return this.dbl();

  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;
    for (var i = 0; i < pow; i++)
      r = r.dbl();
    return r;
  }

  // 1M + 2S + 1A + N * (4S + 5M + 8A)
  // N = 1 => 6M + 6S + 9A
  var a = this.curve.a;
  var tinv = this.curve.tinv;

  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  // Reuse results
  var jyd = jy.redAdd(jy);
  for (var i = 0; i < pow; i++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

    var t1 = jx.redMul(jyd2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var dny = c.redMul(t2);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i + 1 < pow)
      jz4 = jz4.redMul(jyd4);

    jx = nx;
    jz = nz;
    jyd = dny;
  }

  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};

JPoint.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  if (this.curve.zeroA)
    return this._zeroDbl();
  else if (this.curve.threeA)
    return this._threeDbl();
  else
    return this._dbl();
};

JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 14A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a; a = 0
    var m = xx.redAdd(xx).redIAdd(xx);
    // T = M ^ 2 - 2*S
    var t = m.redSqr().redISub(s).redISub(s);

    // 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);

    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2*Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-dbl-2009-l
    // 2M + 5S + 13A

    // A = X1^2
    var a = this.x.redSqr();
    // B = Y1^2
    var b = this.y.redSqr();
    // C = B^2
    var c = b.redSqr();
    // D = 2 * ((X1 + B)^2 - A - C)
    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
    d = d.redIAdd(d);
    // E = 3 * A
    var e = a.redAdd(a).redIAdd(a);
    // F = E^2
    var f = e.redSqr();

    // 8 * C
    var c8 = c.redIAdd(c);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8);

    // X3 = F - 2 * D
    nx = f.redISub(d).redISub(d);
    // Y3 = E * (D - X3) - 8 * C
    ny = e.redMul(d.redISub(nx)).redISub(c8);
    // Z3 = 2 * Y1 * Z1
    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 15A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a
    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
    // T = M^2 - 2 * S
    var t = m.redSqr().redISub(s).redISub(s);
    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2 * Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
    // 3M + 5S

    // delta = Z1^2
    var delta = this.z.redSqr();
    // gamma = Y1^2
    var gamma = this.y.redSqr();
    // beta = X1 * gamma
    var beta = this.x.redMul(gamma);
    // alpha = 3 * (X1 - delta) * (X1 + delta)
    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha);
    // X3 = alpha^2 - 8 * beta
    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8);
    // Z3 = (Y1 + Z1)^2 - gamma - delta
    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._dbl = function _dbl() {
  var a = this.curve.a;

  // 4M + 6S + 10A
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();

  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c.redSqr().redISub(t1.redAdd(t1));
  var t2 = t1.redISub(nx);

  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c.redMul(t2).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);

  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
  // 5M + 10S + ...

  // XX = X1^2
  var xx = this.x.redSqr();
  // YY = Y1^2
  var yy = this.y.redSqr();
  // ZZ = Z1^2
  var zz = this.z.redSqr();
  // YYYY = YY^2
  var yyyy = yy.redSqr();
  // M = 3 * XX + a * ZZ2; a = 0
  var m = xx.redAdd(xx).redIAdd(xx);
  // MM = M^2
  var mm = m.redSqr();
  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e = e.redIAdd(e);
  e = e.redAdd(e).redIAdd(e);
  e = e.redISub(mm);
  // EE = E^2
  var ee = e.redSqr();
  // T = 16*YYYY
  var t = yyyy.redIAdd(yyyy);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  // U = (M + E)^2 - MM - EE - T
  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
  // X3 = 4 * (X1 * EE - 4 * YY * U)
  var yyu4 = yy.redMul(u);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx);
  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  // Z3 = (Z1 + E)^2 - ZZ - EE
  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mul = function mul(k, kbase) {
  k = new BN(k, kbase);

  return this.curve._wnafMul(this, k);
};

JPoint.prototype.eq = function eq(p) {
  if (p.type === 'affine')
    return this.eq(p.toJ());

  if (this === p)
    return true;

  // x1 * z2^2 == x2 * z1^2
  var z2 = this.z.redSqr();
  var pz2 = p.z.redSqr();
  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
    return false;

  // y1 * z2^3 == y2 * z1^3
  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p.z);
  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
};

JPoint.prototype.eqXToP = function eqXToP(x) {
  var zs = this.z.redSqr();
  var rx = x.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(zs);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};

JPoint.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC JPoint Infinity>';
  return '<EC JPoint x: ' + this.x.toString(16, 2) +
      ' y: ' + this.y.toString(16, 2) +
      ' z: ' + this.z.toString(16, 2) + '>';
};

JPoint.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/curves.js":
/*!**********************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/curves.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curves = exports;

var hash = __webpack_require__(/*! hash.js */ "../../node_modules/hash.js/lib/hash.js");
var elliptic = __webpack_require__(/*! ../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");

var assert = elliptic.utils.assert;

function PresetCurve(options) {
  if (options.type === 'short')
    this.curve = new elliptic.curve.short(options);
  else if (options.type === 'edwards')
    this.curve = new elliptic.curve.edwards(options);
  else
    this.curve = new elliptic.curve.mont(options);
  this.g = this.curve.g;
  this.n = this.curve.n;
  this.hash = options.hash;

  assert(this.g.validate(), 'Invalid curve');
  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
}
curves.PresetCurve = PresetCurve;

function defineCurve(name, options) {
  Object.defineProperty(curves, name, {
    configurable: true,
    enumerable: true,
    get: function() {
      var curve = new PresetCurve(options);
      Object.defineProperty(curves, name, {
        configurable: true,
        enumerable: true,
        value: curve
      });
      return curve;
    }
  });
}

defineCurve('p192', {
  type: 'short',
  prime: 'p192',
  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
  hash: hash.sha256,
  gRed: false,
  g: [
    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
  ]
});

defineCurve('p224', {
  type: 'short',
  prime: 'p224',
  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
  hash: hash.sha256,
  gRed: false,
  g: [
    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
  ]
});

defineCurve('p256', {
  type: 'short',
  prime: null,
  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
  hash: hash.sha256,
  gRed: false,
  g: [
    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
  ]
});

defineCurve('p384', {
  type: 'short',
  prime: null,
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 ffffffff',
  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 fffffffc',
  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
  hash: hash.sha384,
  gRed: false,
  g: [
    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
    '5502f25d bf55296c 3a545e38 72760ab7',
    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
  ]
});

defineCurve('p521', {
  type: 'short',
  prime: null,
  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff',
  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff fffffffc',
  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
  hash: hash.sha512,
  gRed: false,
  g: [
    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
    '3fad0761 353c7086 a272c240 88be9476 9fd16650'
  ]
});

defineCurve('curve25519', {
  type: 'mont',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '76d06',
  b: '1',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '9'
  ]
});

defineCurve('ed25519', {
  type: 'edwards',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '-1',
  c: '1',
  // -121665 * (121666^(-1)) (mod P)
  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

    // 4/5
    '6666666666666666666666666666666666666666666666666666666666666658'
  ]
});

var pre;
try {
  pre = __webpack_require__(/*! ./precomputed/secp256k1 */ "../../node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js");
} catch (e) {
  pre = undefined;
}

defineCurve('secp256k1', {
  type: 'short',
  prime: 'k256',
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
  a: '0',
  b: '7',
  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
  h: '1',
  hash: hash.sha256,

  // Precomputed endomorphism
  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
  basis: [
    {
      a: '3086d221a7d46bcde86c90e49284eb15',
      b: '-e4437ed6010e88286f547fa90abfe4c3'
    },
    {
      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
      b: '3086d221a7d46bcde86c90e49284eb15'
    }
  ],

  gRed: false,
  g: [
    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
    pre
  ]
});


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/ec/index.js":
/*!************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/ec/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");
var HmacDRBG = __webpack_require__(/*! hmac-drbg */ "../../node_modules/hmac-drbg/lib/hmac-drbg.js");
var elliptic = __webpack_require__(/*! ../../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;

var KeyPair = __webpack_require__(/*! ./key */ "../../node_modules/elliptic/lib/elliptic/ec/key.js");
var Signature = __webpack_require__(/*! ./signature */ "../../node_modules/elliptic/lib/elliptic/ec/signature.js");

function EC(options) {
  if (!(this instanceof EC))
    return new EC(options);

  // Shortcut `elliptic.ec(curve-name)`
  if (typeof options === 'string') {
    assert(elliptic.curves.hasOwnProperty(options), 'Unknown curve ' + options);

    options = elliptic.curves[options];
  }

  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
  if (options instanceof elliptic.curves.PresetCurve)
    options = { curve: options };

  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;

  // Point on curve
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);

  // Hash for function for DRBG
  this.hash = options.hash || options.curve.hash;
}
module.exports = EC;

EC.prototype.keyPair = function keyPair(options) {
  return new KeyPair(this, options);
};

EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
  return KeyPair.fromPrivate(this, priv, enc);
};

EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
  return KeyPair.fromPublic(this, pub, enc);
};

EC.prototype.genKeyPair = function genKeyPair(options) {
  if (!options)
    options = {};

  // Instantiate Hmac_DRBG
  var drbg = new HmacDRBG({
    hash: this.hash,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8',
    entropy: options.entropy || elliptic.rand(this.hash.hmacStrength),
    entropyEnc: options.entropy && options.entropyEnc || 'utf8',
    nonce: this.n.toArray()
  });

  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new BN(2));
  do {
    var priv = new BN(drbg.generate(bytes));
    if (priv.cmp(ns2) > 0)
      continue;

    priv.iaddn(1);
    return this.keyFromPrivate(priv);
  } while (true);
};

EC.prototype._truncateToN = function truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0)
    msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0)
    return msg.sub(this.n);
  else
    return msg;
};

EC.prototype.sign = function sign(msg, key, enc, options) {
  if (typeof enc === 'object') {
    options = enc;
    enc = null;
  }
  if (!options)
    options = {};

  key = this.keyFromPrivate(key, enc);
  msg = this._truncateToN(new BN(msg, 16));

  // Zero-extend key to provide enough entropy
  var bytes = this.n.byteLength();
  var bkey = key.getPrivate().toArray('be', bytes);

  // Zero-extend nonce to have the same byte size as N
  var nonce = msg.toArray('be', bytes);

  // Instantiate Hmac_DRBG
  var drbg = new HmacDRBG({
    hash: this.hash,
    entropy: bkey,
    nonce: nonce,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8'
  });

  // Number of bytes to generate
  var ns1 = this.n.sub(new BN(1));

  for (var iter = 0; true; iter++) {
    var k = options.k ?
        options.k(iter) :
        new BN(drbg.generate(this.n.byteLength()));
    k = this._truncateToN(k, true);
    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
      continue;

    var kp = this.g.mul(k);
    if (kp.isInfinity())
      continue;

    var kpX = kp.getX();
    var r = kpX.umod(this.n);
    if (r.cmpn(0) === 0)
      continue;

    var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
    s = s.umod(this.n);
    if (s.cmpn(0) === 0)
      continue;

    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
                        (kpX.cmp(r) !== 0 ? 2 : 0);

    // Use complement of `s`, if it is > `n / 2`
    if (options.canonical && s.cmp(this.nh) > 0) {
      s = this.n.sub(s);
      recoveryParam ^= 1;
    }

    return new Signature({ r: r, s: s, recoveryParam: recoveryParam });
  }
};

EC.prototype.verify = function verify(msg, signature, key, enc) {
  msg = this._truncateToN(new BN(msg, 16));
  key = this.keyFromPublic(key, enc);
  signature = new Signature(signature, 'hex');

  // Perform primitive values validation
  var r = signature.r;
  var s = signature.s;
  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
    return false;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
    return false;

  // Validate signature
  var sinv = s.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u2 = sinv.mul(r).umod(this.n);

  if (!this.curve._maxwellTrick) {
    var p = this.g.mulAdd(u1, key.getPublic(), u2);
    if (p.isInfinity())
      return false;

    return p.getX().umod(this.n).cmp(r) === 0;
  }

  // NOTE: Greg Maxwell's trick, inspired by:
  // https://git.io/vad3K

  var p = this.g.jmulAdd(u1, key.getPublic(), u2);
  if (p.isInfinity())
    return false;

  // Compare `p.x` of Jacobian point with `r`,
  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
  // inverse of `p.z^2`
  return p.eqXToP(r);
};

EC.prototype.recoverPubKey = function(msg, signature, j, enc) {
  assert((3 & j) === j, 'The recovery param is more than two bits');
  signature = new Signature(signature, enc);

  var n = this.n;
  var e = new BN(msg);
  var r = signature.r;
  var s = signature.s;

  // A set LSB signifies that the y-coordinate is odd
  var isYOdd = j & 1;
  var isSecondKey = j >> 1;
  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    throw new Error('Unable to find sencond key candinate');

  // 1.1. Let x = r + jn.
  if (isSecondKey)
    r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
  else
    r = this.curve.pointFromX(r, isYOdd);

  var rInv = signature.r.invm(n);
  var s1 = n.sub(e).mul(rInv).umod(n);
  var s2 = s.mul(rInv).umod(n);

  // 1.6.1 Compute Q = r^-1 (sR -  eG)
  //               Q = r^-1 (sR + -eG)
  return this.g.mulAdd(s1, r, s2);
};

EC.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
  signature = new Signature(signature, enc);
  if (signature.recoveryParam !== null)
    return signature.recoveryParam;

  for (var i = 0; i < 4; i++) {
    var Qprime;
    try {
      Qprime = this.recoverPubKey(e, signature, i);
    } catch (e) {
      continue;
    }

    if (Qprime.eq(Q))
      return i;
  }
  throw new Error('Unable to find valid recovery factor');
};


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/ec/key.js":
/*!**********************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/ec/key.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");
var elliptic = __webpack_require__(/*! ../../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;

function KeyPair(ec, options) {
  this.ec = ec;
  this.priv = null;
  this.pub = null;

  // KeyPair(ec, { priv: ..., pub: ... })
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
module.exports = KeyPair;

KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
  if (pub instanceof KeyPair)
    return pub;

  return new KeyPair(ec, {
    pub: pub,
    pubEnc: enc
  });
};

KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
  if (priv instanceof KeyPair)
    return priv;

  return new KeyPair(ec, {
    priv: priv,
    privEnc: enc
  });
};

KeyPair.prototype.validate = function validate() {
  var pub = this.getPublic();

  if (pub.isInfinity())
    return { result: false, reason: 'Invalid public key' };
  if (!pub.validate())
    return { result: false, reason: 'Public key is not a point' };
  if (!pub.mul(this.ec.curve.n).isInfinity())
    return { result: false, reason: 'Public key * N != O' };

  return { result: true, reason: null };
};

KeyPair.prototype.getPublic = function getPublic(compact, enc) {
  // compact is optional argument
  if (typeof compact === 'string') {
    enc = compact;
    compact = null;
  }

  if (!this.pub)
    this.pub = this.ec.g.mul(this.priv);

  if (!enc)
    return this.pub;

  return this.pub.encode(enc, compact);
};

KeyPair.prototype.getPrivate = function getPrivate(enc) {
  if (enc === 'hex')
    return this.priv.toString(16, 2);
  else
    return this.priv;
};

KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
  this.priv = new BN(key, enc || 16);

  // Ensure that the priv won't be bigger than n, otherwise we may fail
  // in fixed multiplication method
  this.priv = this.priv.umod(this.ec.curve.n);
};

KeyPair.prototype._importPublic = function _importPublic(key, enc) {
  if (key.x || key.y) {
    // Montgomery points only have an `x` coordinate.
    // Weierstrass/Edwards points on the other hand have both `x` and
    // `y` coordinates.
    if (this.ec.curve.type === 'mont') {
      assert(key.x, 'Need x coordinate');
    } else if (this.ec.curve.type === 'short' ||
               this.ec.curve.type === 'edwards') {
      assert(key.x && key.y, 'Need both x and y coordinate');
    }
    this.pub = this.ec.curve.point(key.x, key.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(key, enc);
};

// ECDH
KeyPair.prototype.derive = function derive(pub) {
  return pub.mul(this.priv).getX();
};

// ECDSA
KeyPair.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};

KeyPair.prototype.verify = function verify(msg, signature) {
  return this.ec.verify(msg, signature, this);
};

KeyPair.prototype.inspect = function inspect() {
  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
};


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/ec/signature.js":
/*!****************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/ec/signature.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");

var elliptic = __webpack_require__(/*! ../../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;

function Signature(options, enc) {
  if (options instanceof Signature)
    return options;

  if (this._importDER(options, enc))
    return;

  assert(options.r && options.s, 'Signature without r or s');
  this.r = new BN(options.r, 16);
  this.s = new BN(options.s, 16);
  if (options.recoveryParam === undefined)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
module.exports = Signature;

function Position() {
  this.place = 0;
}

function getLength(buf, p) {
  var initial = buf[p.place++];
  if (!(initial & 0x80)) {
    return initial;
  }
  var octetLen = initial & 0xf;
  var val = 0;
  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf[off];
  }
  p.place = off;
  return val;
}

function rmPadding(buf) {
  var i = 0;
  var len = buf.length - 1;
  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
    i++;
  }
  if (i === 0) {
    return buf;
  }
  return buf.slice(i);
}

Signature.prototype._importDER = function _importDER(data, enc) {
  data = utils.toArray(data, enc);
  var p = new Position();
  if (data[p.place++] !== 0x30) {
    return false;
  }
  var len = getLength(data, p);
  if ((len + p.place) !== data.length) {
    return false;
  }
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var rlen = getLength(data, p);
  var r = data.slice(p.place, rlen + p.place);
  p.place += rlen;
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var slen = getLength(data, p);
  if (data.length !== slen + p.place) {
    return false;
  }
  var s = data.slice(p.place, slen + p.place);
  if (r[0] === 0 && (r[1] & 0x80)) {
    r = r.slice(1);
  }
  if (s[0] === 0 && (s[1] & 0x80)) {
    s = s.slice(1);
  }

  this.r = new BN(r);
  this.s = new BN(s);
  this.recoveryParam = null;

  return true;
};

function constructLength(arr, len) {
  if (len < 0x80) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 0x80);
  while (--octets) {
    arr.push((len >>> (octets << 3)) & 0xff);
  }
  arr.push(len);
}

Signature.prototype.toDER = function toDER(enc) {
  var r = this.r.toArray();
  var s = this.s.toArray();

  // Pad values
  if (r[0] & 0x80)
    r = [ 0 ].concat(r);
  // Pad values
  if (s[0] & 0x80)
    s = [ 0 ].concat(s);

  r = rmPadding(r);
  s = rmPadding(s);

  while (!s[0] && !(s[1] & 0x80)) {
    s = s.slice(1);
  }
  var arr = [ 0x02 ];
  constructLength(arr, r.length);
  arr = arr.concat(r);
  arr.push(0x02);
  constructLength(arr, s.length);
  var backHalf = arr.concat(s);
  var res = [ 0x30 ];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils.encode(res, enc);
};


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/eddsa/index.js":
/*!***************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/eddsa/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__(/*! hash.js */ "../../node_modules/hash.js/lib/hash.js");
var elliptic = __webpack_require__(/*! ../../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var KeyPair = __webpack_require__(/*! ./key */ "../../node_modules/elliptic/lib/elliptic/eddsa/key.js");
var Signature = __webpack_require__(/*! ./signature */ "../../node_modules/elliptic/lib/elliptic/eddsa/signature.js");

function EDDSA(curve) {
  assert(curve === 'ed25519', 'only tested with ed25519 so far');

  if (!(this instanceof EDDSA))
    return new EDDSA(curve);

  var curve = elliptic.curves[curve].curve;
  this.curve = curve;
  this.g = curve.g;
  this.g.precompute(curve.n.bitLength() + 1);

  this.pointClass = curve.point().constructor;
  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
  this.hash = hash.sha512;
}

module.exports = EDDSA;

/**
* @param {Array|String} message - message bytes
* @param {Array|String|KeyPair} secret - secret bytes or a keypair
* @returns {Signature} - signature
*/
EDDSA.prototype.sign = function sign(message, secret) {
  message = parseBytes(message);
  var key = this.keyFromSecret(secret);
  var r = this.hashInt(key.messagePrefix(), message);
  var R = this.g.mul(r);
  var Rencoded = this.encodePoint(R);
  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
               .mul(key.priv());
  var S = r.add(s_).umod(this.curve.n);
  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
};

/**
* @param {Array} message - message bytes
* @param {Array|String|Signature} sig - sig bytes
* @param {Array|String|Point|KeyPair} pub - public key
* @returns {Boolean} - true if public key matches sig of message
*/
EDDSA.prototype.verify = function verify(message, sig, pub) {
  message = parseBytes(message);
  sig = this.makeSignature(sig);
  var key = this.keyFromPublic(pub);
  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
  var SG = this.g.mul(sig.S());
  var RplusAh = sig.R().add(key.pub().mul(h));
  return RplusAh.eq(SG);
};

EDDSA.prototype.hashInt = function hashInt() {
  var hash = this.hash();
  for (var i = 0; i < arguments.length; i++)
    hash.update(arguments[i]);
  return utils.intFromLE(hash.digest()).umod(this.curve.n);
};

EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
  return KeyPair.fromPublic(this, pub);
};

EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
  return KeyPair.fromSecret(this, secret);
};

EDDSA.prototype.makeSignature = function makeSignature(sig) {
  if (sig instanceof Signature)
    return sig;
  return new Signature(this, sig);
};

/**
* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
*
* EDDSA defines methods for encoding and decoding points and integers. These are
* helper convenience methods, that pass along to utility functions implied
* parameters.
*
*/
EDDSA.prototype.encodePoint = function encodePoint(point) {
  var enc = point.getY().toArray('le', this.encodingLength);
  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
  return enc;
};

EDDSA.prototype.decodePoint = function decodePoint(bytes) {
  bytes = utils.parseBytes(bytes);

  var lastIx = bytes.length - 1;
  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

  var y = utils.intFromLE(normed);
  return this.curve.pointFromY(y, xIsOdd);
};

EDDSA.prototype.encodeInt = function encodeInt(num) {
  return num.toArray('le', this.encodingLength);
};

EDDSA.prototype.decodeInt = function decodeInt(bytes) {
  return utils.intFromLE(bytes);
};

EDDSA.prototype.isPoint = function isPoint(val) {
  return val instanceof this.pointClass;
};


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/eddsa/key.js":
/*!*************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/eddsa/key.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elliptic = __webpack_require__(/*! ../../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var cachedProperty = utils.cachedProperty;

/**
* @param {EDDSA} eddsa - instance
* @param {Object} params - public/private key parameters
*
* @param {Array<Byte>} [params.secret] - secret seed bytes
* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
*
*/
function KeyPair(eddsa, params) {
  this.eddsa = eddsa;
  this._secret = parseBytes(params.secret);
  if (eddsa.isPoint(params.pub))
    this._pub = params.pub;
  else
    this._pubBytes = parseBytes(params.pub);
}

KeyPair.fromPublic = function fromPublic(eddsa, pub) {
  if (pub instanceof KeyPair)
    return pub;
  return new KeyPair(eddsa, { pub: pub });
};

KeyPair.fromSecret = function fromSecret(eddsa, secret) {
  if (secret instanceof KeyPair)
    return secret;
  return new KeyPair(eddsa, { secret: secret });
};

KeyPair.prototype.secret = function secret() {
  return this._secret;
};

cachedProperty(KeyPair, 'pubBytes', function pubBytes() {
  return this.eddsa.encodePoint(this.pub());
});

cachedProperty(KeyPair, 'pub', function pub() {
  if (this._pubBytes)
    return this.eddsa.decodePoint(this._pubBytes);
  return this.eddsa.g.mul(this.priv());
});

cachedProperty(KeyPair, 'privBytes', function privBytes() {
  var eddsa = this.eddsa;
  var hash = this.hash();
  var lastIx = eddsa.encodingLength - 1;

  var a = hash.slice(0, eddsa.encodingLength);
  a[0] &= 248;
  a[lastIx] &= 127;
  a[lastIx] |= 64;

  return a;
});

cachedProperty(KeyPair, 'priv', function priv() {
  return this.eddsa.decodeInt(this.privBytes());
});

cachedProperty(KeyPair, 'hash', function hash() {
  return this.eddsa.hash().update(this.secret()).digest();
});

cachedProperty(KeyPair, 'messagePrefix', function messagePrefix() {
  return this.hash().slice(this.eddsa.encodingLength);
});

KeyPair.prototype.sign = function sign(message) {
  assert(this._secret, 'KeyPair can only verify');
  return this.eddsa.sign(message, this);
};

KeyPair.prototype.verify = function verify(message, sig) {
  return this.eddsa.verify(message, sig, this);
};

KeyPair.prototype.getSecret = function getSecret(enc) {
  assert(this._secret, 'KeyPair is public only');
  return utils.encode(this.secret(), enc);
};

KeyPair.prototype.getPublic = function getPublic(enc) {
  return utils.encode(this.pubBytes(), enc);
};

module.exports = KeyPair;


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/eddsa/signature.js":
/*!*******************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/eddsa/signature.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");
var elliptic = __webpack_require__(/*! ../../elliptic */ "../../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;
var cachedProperty = utils.cachedProperty;
var parseBytes = utils.parseBytes;

/**
* @param {EDDSA} eddsa - eddsa instance
* @param {Array<Bytes>|Object} sig -
* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
*/
function Signature(eddsa, sig) {
  this.eddsa = eddsa;

  if (typeof sig !== 'object')
    sig = parseBytes(sig);

  if (Array.isArray(sig)) {
    sig = {
      R: sig.slice(0, eddsa.encodingLength),
      S: sig.slice(eddsa.encodingLength)
    };
  }

  assert(sig.R && sig.S, 'Signature without R or S');

  if (eddsa.isPoint(sig.R))
    this._R = sig.R;
  if (sig.S instanceof BN)
    this._S = sig.S;

  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
}

cachedProperty(Signature, 'S', function S() {
  return this.eddsa.decodeInt(this.Sencoded());
});

cachedProperty(Signature, 'R', function R() {
  return this.eddsa.decodePoint(this.Rencoded());
});

cachedProperty(Signature, 'Rencoded', function Rencoded() {
  return this.eddsa.encodePoint(this.R());
});

cachedProperty(Signature, 'Sencoded', function Sencoded() {
  return this.eddsa.encodeInt(this.S());
});

Signature.prototype.toBytes = function toBytes() {
  return this.Rencoded().concat(this.Sencoded());
};

Signature.prototype.toHex = function toHex() {
  return utils.encode(this.toBytes(), 'hex').toUpperCase();
};

module.exports = Signature;


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js":
/*!*************************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {
  doubles: {
    step: 4,
    points: [
      [
        'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
        'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
      ],
      [
        '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
        '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
      ],
      [
        '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
        'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
      ],
      [
        '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
        '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
      ],
      [
        '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
        '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
      ],
      [
        '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
        '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
      ],
      [
        'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
        '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
      ],
      [
        '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
        'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
      ],
      [
        'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
        '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
      ],
      [
        'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
        'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
      ],
      [
        'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
        '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
      ],
      [
        '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
        '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
      ],
      [
        '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
        '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
      ],
      [
        '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
        '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
      ],
      [
        '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
        '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
      ],
      [
        '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
        '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
      ],
      [
        '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
        '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
      ],
      [
        '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
        '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
      ],
      [
        '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
        'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
      ],
      [
        'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
        '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
      ],
      [
        'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
        '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
      ],
      [
        '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
        '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
      ],
      [
        '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
        '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
      ],
      [
        'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
        '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
      ],
      [
        '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
        'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
      ],
      [
        'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
        '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
      ],
      [
        'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
        'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
      ],
      [
        'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
        '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
      ],
      [
        'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
        'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
      ],
      [
        'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
        '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
      ],
      [
        '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
        'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
      ],
      [
        '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
        '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
      ],
      [
        'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
        '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
      ],
      [
        '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
        'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
      ],
      [
        'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
        '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
      ],
      [
        'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
        '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
      ],
      [
        'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
        'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
      ],
      [
        '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
        '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
      ],
      [
        '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
        '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
      ],
      [
        '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
        'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
      ],
      [
        '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
        '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
      ],
      [
        'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
        '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
      ],
      [
        '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
        '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
      ],
      [
        '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
        'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
      ],
      [
        '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
        '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
      ],
      [
        'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
        '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
      ],
      [
        '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
        'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
      ],
      [
        'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
        'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
      ],
      [
        'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
        '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
      ],
      [
        '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
        'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
      ],
      [
        '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
        'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
      ],
      [
        'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
        '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
      ],
      [
        'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
        '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
      ],
      [
        'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
        '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
      ],
      [
        '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
        'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
      ],
      [
        '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
        '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
      ],
      [
        'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
        'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
      ],
      [
        '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
        'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
      ],
      [
        '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
        '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
      ],
      [
        '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
        '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
      ],
      [
        'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
        'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
      ],
      [
        '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
        '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
      ],
      [
        '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
        '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
      ],
      [
        'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
        '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
      ],
      [
        'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
        'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
      ]
    ]
  },
  naf: {
    wnd: 7,
    points: [
      [
        'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
        '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
      ],
      [
        '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
        'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
      ],
      [
        '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
        '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
      ],
      [
        'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
        'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
      ],
      [
        '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
        'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
      ],
      [
        'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
        'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
      ],
      [
        'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
        '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
      ],
      [
        'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
        '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
      ],
      [
        '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
        '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
      ],
      [
        '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
        '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
      ],
      [
        '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
        '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
      ],
      [
        '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
        '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
      ],
      [
        'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
        'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
      ],
      [
        'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
        '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
      ],
      [
        '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
        'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
      ],
      [
        '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
        'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
      ],
      [
        '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
        '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
      ],
      [
        '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
        '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
      ],
      [
        '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
        '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
      ],
      [
        '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
        'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
      ],
      [
        'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
        'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
      ],
      [
        '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
        '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
      ],
      [
        '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
        '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
      ],
      [
        'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
        'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
      ],
      [
        '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
        '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
      ],
      [
        'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
        'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
      ],
      [
        'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
        'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
      ],
      [
        '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
        '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
      ],
      [
        '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
        '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
      ],
      [
        '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
        '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
      ],
      [
        'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
        '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
      ],
      [
        '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
        '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
      ],
      [
        'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
        '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
      ],
      [
        '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
        'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
      ],
      [
        '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
        'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
      ],
      [
        'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
        'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
      ],
      [
        '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
        '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
      ],
      [
        '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
        'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
      ],
      [
        'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
        'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
      ],
      [
        '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
        '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
      ],
      [
        '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
        'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
      ],
      [
        '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
        '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
      ],
      [
        '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
        'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
      ],
      [
        'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
        '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
      ],
      [
        '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
        '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
      ],
      [
        '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
        'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
      ],
      [
        '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
        'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
      ],
      [
        'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
        'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
      ],
      [
        'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
        'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
      ],
      [
        '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
        '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
      ],
      [
        '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
        '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
      ],
      [
        'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
        '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
      ],
      [
        'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
        'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
      ],
      [
        '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
        '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
      ],
      [
        '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
        '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
      ],
      [
        'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
        '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
      ],
      [
        '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
        '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
      ],
      [
        'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
        'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
      ],
      [
        '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
        'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
      ],
      [
        '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
        '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
      ],
      [
        'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
        '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
      ],
      [
        'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
        '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
      ],
      [
        '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
        '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
      ],
      [
        '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
        '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
      ],
      [
        '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
        'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
      ],
      [
        '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
        'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
      ],
      [
        '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
        '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
      ],
      [
        '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
        '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
      ],
      [
        '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
        '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
      ],
      [
        '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
        'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
      ],
      [
        'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
        'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
      ],
      [
        '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
        'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
      ],
      [
        'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
        '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
      ],
      [
        'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
        '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
      ],
      [
        'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
        '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
      ],
      [
        'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
        '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
      ],
      [
        '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
        'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
      ],
      [
        '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
        '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
      ],
      [
        '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
        'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
      ],
      [
        'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
        'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
      ],
      [
        'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
        '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
      ],
      [
        'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
        'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
      ],
      [
        'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
        '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
      ],
      [
        '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
        '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
      ],
      [
        'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
        '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
      ],
      [
        'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
        '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
      ],
      [
        '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
        '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
      ],
      [
        '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
        'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
      ],
      [
        'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
        '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
      ],
      [
        'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
        '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
      ],
      [
        'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
        '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
      ],
      [
        '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
        '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
      ],
      [
        'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
        'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
      ],
      [
        '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
        'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
      ],
      [
        'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
        'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
      ],
      [
        'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
        '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
      ],
      [
        '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
        'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
      ],
      [
        'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
        '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
      ],
      [
        'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
        '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
      ],
      [
        'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
        '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
      ],
      [
        '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
        'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
      ],
      [
        '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
        'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
      ],
      [
        'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
        '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
      ],
      [
        '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
        'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
      ],
      [
        '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
        '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
      ],
      [
        '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
        'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
      ],
      [
        'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
        'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
      ],
      [
        '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
        'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
      ],
      [
        '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
        '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
      ],
      [
        '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
        'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
      ],
      [
        '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
        '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
      ],
      [
        'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
        'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
      ],
      [
        '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
        '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
      ],
      [
        'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
        '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
      ],
      [
        '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
        '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
      ],
      [
        'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
        'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
      ],
      [
        'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
        '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
      ],
      [
        'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
        'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
      ],
      [
        '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
        'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
      ],
      [
        '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
        '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
      ],
      [
        '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
        'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
      ],
      [
        '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
        '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
      ],
      [
        '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
        '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
      ],
      [
        '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
        'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
      ],
      [
        '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
        '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
      ],
      [
        '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
        '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
      ],
      [
        '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
        '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
      ]
    ]
  }
};


/***/ }),

/***/ "../../node_modules/elliptic/lib/elliptic/utils.js":
/*!*********************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/lib/elliptic/utils.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = exports;
var BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");
var minAssert = __webpack_require__(/*! minimalistic-assert */ "../../node_modules/minimalistic-assert/index.js");
var minUtils = __webpack_require__(/*! minimalistic-crypto-utils */ "../../node_modules/minimalistic-crypto-utils/lib/utils.js");

utils.assert = minAssert;
utils.toArray = minUtils.toArray;
utils.zero2 = minUtils.zero2;
utils.toHex = minUtils.toHex;
utils.encode = minUtils.encode;

// Represent num in a w-NAF form
function getNAF(num, w) {
  var naf = [];
  var ws = 1 << (w + 1);
  var k = num.clone();
  while (k.cmpn(1) >= 0) {
    var z;
    if (k.isOdd()) {
      var mod = k.andln(ws - 1);
      if (mod > (ws >> 1) - 1)
        z = (ws >> 1) - mod;
      else
        z = mod;
      k.isubn(z);
    } else {
      z = 0;
    }
    naf.push(z);

    // Optimization, shift by word if possible
    var shift = (k.cmpn(0) !== 0 && k.andln(ws - 1) === 0) ? (w + 1) : 1;
    for (var i = 1; i < shift; i++)
      naf.push(0);
    k.iushrn(shift);
  }

  return naf;
}
utils.getNAF = getNAF;

// Represent k1, k2 in a Joint Sparse Form
function getJSF(k1, k2) {
  var jsf = [
    [],
    []
  ];

  k1 = k1.clone();
  k2 = k2.clone();
  var d1 = 0;
  var d2 = 0;
  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {

    // First phase
    var m14 = (k1.andln(3) + d1) & 3;
    var m24 = (k2.andln(3) + d2) & 3;
    if (m14 === 3)
      m14 = -1;
    if (m24 === 3)
      m24 = -1;
    var u1;
    if ((m14 & 1) === 0) {
      u1 = 0;
    } else {
      var m8 = (k1.andln(7) + d1) & 7;
      if ((m8 === 3 || m8 === 5) && m24 === 2)
        u1 = -m14;
      else
        u1 = m14;
    }
    jsf[0].push(u1);

    var u2;
    if ((m24 & 1) === 0) {
      u2 = 0;
    } else {
      var m8 = (k2.andln(7) + d2) & 7;
      if ((m8 === 3 || m8 === 5) && m14 === 2)
        u2 = -m24;
      else
        u2 = m24;
    }
    jsf[1].push(u2);

    // Second phase
    if (2 * d1 === u1 + 1)
      d1 = 1 - d1;
    if (2 * d2 === u2 + 1)
      d2 = 1 - d2;
    k1.iushrn(1);
    k2.iushrn(1);
  }

  return jsf;
}
utils.getJSF = getJSF;

function cachedProperty(obj, name, computer) {
  var key = '_' + name;
  obj.prototype[name] = function cachedProperty() {
    return this[key] !== undefined ? this[key] :
           this[key] = computer.call(this);
  };
}
utils.cachedProperty = cachedProperty;

function parseBytes(bytes) {
  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
                                     bytes;
}
utils.parseBytes = parseBytes;

function intFromLE(bytes) {
  return new BN(bytes, 'hex', 'le');
}
utils.intFromLE = intFromLE;



/***/ }),

/***/ "../../node_modules/elliptic/package.json":
/*!************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/elliptic/package.json ***!
  \************************************************************************************/
/*! exports provided: name, version, description, main, files, scripts, repository, keywords, author, license, bugs, homepage, devDependencies, dependencies, default */
/*! all exports used */
/***/ (function(module) {

module.exports = {"name":"elliptic","version":"6.4.1","description":"EC cryptography","main":"lib/elliptic.js","files":["lib"],"scripts":{"jscs":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","jshint":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","lint":"npm run jscs && npm run jshint","unit":"istanbul test _mocha --reporter=spec test/index.js","test":"npm run lint && npm run unit","version":"grunt dist && git add dist/"},"repository":{"type":"git","url":"git@github.com:indutny/elliptic"},"keywords":["EC","Elliptic","curve","Cryptography"],"author":"Fedor Indutny <fedor@indutny.com>","license":"MIT","bugs":{"url":"https://github.com/indutny/elliptic/issues"},"homepage":"https://github.com/indutny/elliptic","devDependencies":{"brfs":"^1.4.3","coveralls":"^2.11.3","grunt":"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2","istanbul":"^0.4.2","jscs":"^2.9.0","jshint":"^2.6.0","mocha":"^2.1.0"},"dependencies":{"bn.js":"^4.4.0","brorand":"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0","inherits":"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"}};

/***/ }),

/***/ "../../node_modules/hash.js/lib/hash.js":
/*!**********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash.js ***!
  \**********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var hash = exports;

hash.utils = __webpack_require__(/*! ./hash/utils */ "../../node_modules/hash.js/lib/hash/utils.js");
hash.common = __webpack_require__(/*! ./hash/common */ "../../node_modules/hash.js/lib/hash/common.js");
hash.sha = __webpack_require__(/*! ./hash/sha */ "../../node_modules/hash.js/lib/hash/sha.js");
hash.ripemd = __webpack_require__(/*! ./hash/ripemd */ "../../node_modules/hash.js/lib/hash/ripemd.js");
hash.hmac = __webpack_require__(/*! ./hash/hmac */ "../../node_modules/hash.js/lib/hash/hmac.js");

// Proxy hash functions to the main object
hash.sha1 = hash.sha.sha1;
hash.sha256 = hash.sha.sha256;
hash.sha224 = hash.sha.sha224;
hash.sha384 = hash.sha.sha384;
hash.sha512 = hash.sha.sha512;
hash.ripemd160 = hash.ripemd.ripemd160;


/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/common.js":
/*!*****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/common.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../../node_modules/hash.js/lib/hash/utils.js");
var assert = __webpack_require__(/*! minimalistic-assert */ "../../node_modules/minimalistic-assert/index.js");

function BlockHash() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';

  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
exports.BlockHash = BlockHash;

BlockHash.prototype.update = function update(msg, enc) {
  // Convert message to array, pad it, and join into 32bit blocks
  msg = utils.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  // Enough data, try updating
  if (this.pending.length >= this._delta8) {
    msg = this.pending;

    // Process pending data in blocks
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0)
      this.pending = null;

    msg = utils.join32(msg, 0, msg.length - r, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }

  return this;
};

BlockHash.prototype.digest = function digest(enc) {
  this.update(this._pad());
  assert(this.pending === null);

  return this._digest(enc);
};

BlockHash.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - ((len + this.padLength) % bytes);
  var res = new Array(k + this.padLength);
  res[0] = 0x80;
  for (var i = 1; i < k; i++)
    res[i] = 0;

  // Append length
  len <<= 3;
  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }

  return res;
};


/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/hmac.js":
/*!***************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/hmac.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../../node_modules/hash.js/lib/hash/utils.js");
var assert = __webpack_require__(/*! minimalistic-assert */ "../../node_modules/minimalistic-assert/index.js");

function Hmac(hash, key, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash, key, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;

  this._init(utils.toArray(key, enc));
}
module.exports = Hmac;

Hmac.prototype._init = function init(key) {
  // Shorten key, if needed
  if (key.length > this.blockSize)
    key = new this.Hash().update(key).digest();
  assert(key.length <= this.blockSize);

  // Add padding to key
  for (var i = key.length; i < this.blockSize; i++)
    key.push(0);

  for (i = 0; i < key.length; i++)
    key[i] ^= 0x36;
  this.inner = new this.Hash().update(key);

  // 0x36 ^ 0x5c = 0x6a
  for (i = 0; i < key.length; i++)
    key[i] ^= 0x6a;
  this.outer = new this.Hash().update(key);
};

Hmac.prototype.update = function update(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};

Hmac.prototype.digest = function digest(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};


/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/ripemd.js":
/*!*****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/ripemd.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../../node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__(/*! ./common */ "../../node_modules/hash.js/lib/hash/common.js");

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_3 = utils.sum32_3;
var sum32_4 = utils.sum32_4;
var BlockHash = common.BlockHash;

function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();

  BlockHash.call(this);

  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
  this.endian = 'little';
}
utils.inherits(RIPEMD160, BlockHash);
exports.ripemd160 = RIPEMD160;

RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;

RIPEMD160.prototype._update = function update(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32(
      rotl32(
        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
        s[j]),
      E);
    A = E;
    E = D;
    D = rotl32(C, 10);
    C = B;
    B = T;
    T = sum32(
      rotl32(
        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
        sh[j]),
      Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3(this.h[1], C, Dh);
  this.h[1] = sum32_3(this.h[2], D, Eh);
  this.h[2] = sum32_3(this.h[3], E, Ah);
  this.h[3] = sum32_3(this.h[4], A, Bh);
  this.h[4] = sum32_3(this.h[0], B, Ch);
  this.h[0] = T;
};

RIPEMD160.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'little');
  else
    return utils.split32(this.h, 'little');
};

function f(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return (x & y) | ((~x) & z);
  else if (j <= 47)
    return (x | (~y)) ^ z;
  else if (j <= 63)
    return (x & z) | (y & (~z));
  else
    return x ^ (y | (~z));
}

function K(j) {
  if (j <= 15)
    return 0x00000000;
  else if (j <= 31)
    return 0x5a827999;
  else if (j <= 47)
    return 0x6ed9eba1;
  else if (j <= 63)
    return 0x8f1bbcdc;
  else
    return 0xa953fd4e;
}

function Kh(j) {
  if (j <= 15)
    return 0x50a28be6;
  else if (j <= 31)
    return 0x5c4dd124;
  else if (j <= 47)
    return 0x6d703ef3;
  else if (j <= 63)
    return 0x7a6d76e9;
  else
    return 0x00000000;
}

var r = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

var rh = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

var s = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

var sh = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];


/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/sha.js":
/*!**************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/sha.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.sha1 = __webpack_require__(/*! ./sha/1 */ "../../node_modules/hash.js/lib/hash/sha/1.js");
exports.sha224 = __webpack_require__(/*! ./sha/224 */ "../../node_modules/hash.js/lib/hash/sha/224.js");
exports.sha256 = __webpack_require__(/*! ./sha/256 */ "../../node_modules/hash.js/lib/hash/sha/256.js");
exports.sha384 = __webpack_require__(/*! ./sha/384 */ "../../node_modules/hash.js/lib/hash/sha/384.js");
exports.sha512 = __webpack_require__(/*! ./sha/512 */ "../../node_modules/hash.js/lib/hash/sha/512.js");


/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/sha/1.js":
/*!****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/sha/1.js ***!
  \****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../../node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__(/*! ../common */ "../../node_modules/hash.js/lib/hash/common.js");
var shaCommon = __webpack_require__(/*! ./common */ "../../node_modules/hash.js/lib/hash/sha/common.js");

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_5 = utils.sum32_5;
var ft_1 = shaCommon.ft_1;
var BlockHash = common.BlockHash;

var sha1_K = [
  0x5A827999, 0x6ED9EBA1,
  0x8F1BBCDC, 0xCA62C1D6
];

function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();

  BlockHash.call(this);
  this.h = [
    0x67452301, 0xefcdab89, 0x98badcfe,
    0x10325476, 0xc3d2e1f0 ];
  this.W = new Array(80);
}

utils.inherits(SHA1, BlockHash);
module.exports = SHA1;

SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  for(; i < W.length; i++)
    W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];

  for (i = 0; i < W.length; i++) {
    var s = ~~(i / 20);
    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};


/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/sha/224.js":
/*!******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/sha/224.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../../node_modules/hash.js/lib/hash/utils.js");
var SHA256 = __webpack_require__(/*! ./256 */ "../../node_modules/hash.js/lib/hash/sha/256.js");

function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();

  SHA256.call(this);
  this.h = [
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
}
utils.inherits(SHA224, SHA256);
module.exports = SHA224;

SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;

SHA224.prototype._digest = function digest(enc) {
  // Just truncate output
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 7), 'big');
  else
    return utils.split32(this.h.slice(0, 7), 'big');
};



/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/sha/256.js":
/*!******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/sha/256.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../../node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__(/*! ../common */ "../../node_modules/hash.js/lib/hash/common.js");
var shaCommon = __webpack_require__(/*! ./common */ "../../node_modules/hash.js/lib/hash/sha/common.js");
var assert = __webpack_require__(/*! minimalistic-assert */ "../../node_modules/minimalistic-assert/index.js");

var sum32 = utils.sum32;
var sum32_4 = utils.sum32_4;
var sum32_5 = utils.sum32_5;
var ch32 = shaCommon.ch32;
var maj32 = shaCommon.maj32;
var s0_256 = shaCommon.s0_256;
var s1_256 = shaCommon.s1_256;
var g0_256 = shaCommon.g0_256;
var g1_256 = shaCommon.g1_256;

var BlockHash = common.BlockHash;

var sha256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

function SHA256() {
  if (!(this instanceof SHA256))
    return new SHA256();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils.inherits(SHA256, BlockHash);
module.exports = SHA256;

SHA256.blockSize = 512;
SHA256.outSize = 256;
SHA256.hmacStrength = 192;
SHA256.padLength = 64;

SHA256.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];

  assert(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
    var T2 = sum32(s0_256(a), maj32(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32(T1, T2);
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
  this.h[5] = sum32(this.h[5], f);
  this.h[6] = sum32(this.h[6], g);
  this.h[7] = sum32(this.h[7], h);
};

SHA256.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};


/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/sha/384.js":
/*!******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/sha/384.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../../node_modules/hash.js/lib/hash/utils.js");

var SHA512 = __webpack_require__(/*! ./512 */ "../../node_modules/hash.js/lib/hash/sha/512.js");

function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();

  SHA512.call(this);
  this.h = [
    0xcbbb9d5d, 0xc1059ed8,
    0x629a292a, 0x367cd507,
    0x9159015a, 0x3070dd17,
    0x152fecd8, 0xf70e5939,
    0x67332667, 0xffc00b31,
    0x8eb44a87, 0x68581511,
    0xdb0c2e0d, 0x64f98fa7,
    0x47b5481d, 0xbefa4fa4 ];
}
utils.inherits(SHA384, SHA512);
module.exports = SHA384;

SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;

SHA384.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 12), 'big');
  else
    return utils.split32(this.h.slice(0, 12), 'big');
};


/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/sha/512.js":
/*!******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/sha/512.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../../node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__(/*! ../common */ "../../node_modules/hash.js/lib/hash/common.js");
var assert = __webpack_require__(/*! minimalistic-assert */ "../../node_modules/minimalistic-assert/index.js");

var rotr64_hi = utils.rotr64_hi;
var rotr64_lo = utils.rotr64_lo;
var shr64_hi = utils.shr64_hi;
var shr64_lo = utils.shr64_lo;
var sum64 = utils.sum64;
var sum64_hi = utils.sum64_hi;
var sum64_lo = utils.sum64_lo;
var sum64_4_hi = utils.sum64_4_hi;
var sum64_4_lo = utils.sum64_4_lo;
var sum64_5_hi = utils.sum64_5_hi;
var sum64_5_lo = utils.sum64_5_lo;

var BlockHash = common.BlockHash;

var sha512_K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function SHA512() {
  if (!(this instanceof SHA512))
    return new SHA512();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xf3bcc908,
    0xbb67ae85, 0x84caa73b,
    0x3c6ef372, 0xfe94f82b,
    0xa54ff53a, 0x5f1d36f1,
    0x510e527f, 0xade682d1,
    0x9b05688c, 0x2b3e6c1f,
    0x1f83d9ab, 0xfb41bd6b,
    0x5be0cd19, 0x137e2179 ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils.inherits(SHA512, BlockHash);
module.exports = SHA512;

SHA512.blockSize = 1024;
SHA512.outSize = 512;
SHA512.hmacStrength = 192;
SHA512.padLength = 128;

SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;

  // 32 x 32bit words
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];  // i - 7
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];  // i - 16
    var c3_lo = W[i - 31];

    W[i] = sum64_4_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
  }
};

SHA512.prototype._update = function _update(msg, start) {
  this._prepareBlock(msg, start);

  var W = this.W;

  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];

  assert(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];

    var T1_hi = sum64_5_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);
    var T1_lo = sum64_5_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);

    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

    hh = gh;
    hl = gl;

    gh = fh;
    gl = fl;

    fh = eh;
    fl = el;

    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);

    dh = ch;
    dl = cl;

    ch = bh;
    cl = bl;

    bh = ah;
    bl = al;

    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }

  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};

SHA512.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

function ch64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ ((~xh) & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ ((~xl) & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
  var c2_hi = shr64_hi(xh, xl, 6);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
  var c2_lo = shr64_lo(xh, xl, 6);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}


/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/sha/common.js":
/*!*********************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/sha/common.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../../node_modules/hash.js/lib/hash/utils.js");
var rotr32 = utils.rotr32;

function ft_1(s, x, y, z) {
  if (s === 0)
    return ch32(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32(x, y, z);
}
exports.ft_1 = ft_1;

function ch32(x, y, z) {
  return (x & y) ^ ((~x) & z);
}
exports.ch32 = ch32;

function maj32(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}
exports.maj32 = maj32;

function p32(x, y, z) {
  return x ^ y ^ z;
}
exports.p32 = p32;

function s0_256(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
exports.s0_256 = s0_256;

function s1_256(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
exports.s1_256 = s1_256;

function g0_256(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
}
exports.g0_256 = g0_256;

function g1_256(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
}
exports.g1_256 = g1_256;


/***/ }),

/***/ "../../node_modules/hash.js/lib/hash/utils.js":
/*!****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hash.js/lib/hash/utils.js ***!
  \****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__(/*! minimalistic-assert */ "../../node_modules/minimalistic-assert/index.js");
var inherits = __webpack_require__(/*! inherits */ "../../node_modules/inherits/inherits.js");

exports.inherits = inherits;

function isSurrogatePair(msg, i) {
  if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
    return false;
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }
  return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
}

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      // Inspired by stringToUtf8ByteArray() in closure-library by Google
      // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
      // Apache License 2.0
      // https://github.com/google/closure-library/blob/master/LICENSE
      var p = 0;
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = (c >> 6) | 192;
          res[p++] = (c & 63) | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
          res[p++] = (c >> 18) | 240;
          res[p++] = ((c >> 12) & 63) | 128;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        } else {
          res[p++] = (c >> 12) | 224;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        }
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
exports.toArray = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
exports.toHex = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
exports.htonl = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
exports.toHex32 = toHex32;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
exports.zero2 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
exports.zero8 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  assert(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
exports.join32 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
exports.split32 = split32;

function rotr32(w, b) {
  return (w >>> b) | (w << (32 - b));
}
exports.rotr32 = rotr32;

function rotl32(w, b) {
  return (w << b) | (w >>> (32 - b));
}
exports.rotl32 = rotl32;

function sum32(a, b) {
  return (a + b) >>> 0;
}
exports.sum32 = sum32;

function sum32_3(a, b, c) {
  return (a + b + c) >>> 0;
}
exports.sum32_3 = sum32_3;

function sum32_4(a, b, c, d) {
  return (a + b + c + d) >>> 0;
}
exports.sum32_4 = sum32_4;

function sum32_5(a, b, c, d, e) {
  return (a + b + c + d + e) >>> 0;
}
exports.sum32_5 = sum32_5;

function sum64(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];

  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
exports.sum64 = sum64;

function sum64_hi(ah, al, bh, bl) {
  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
exports.sum64_hi = sum64_hi;

function sum64_lo(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
exports.sum64_lo = sum64_lo;

function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
exports.sum64_4_hi = sum64_4_hi;

function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
exports.sum64_4_lo = sum64_4_lo;

function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
exports.sum64_5_hi = sum64_5_hi;

function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;

  return lo >>> 0;
}
exports.sum64_5_lo = sum64_5_lo;

function rotr64_hi(ah, al, num) {
  var r = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
}
exports.rotr64_hi = rotr64_hi;

function rotr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.rotr64_lo = rotr64_lo;

function shr64_hi(ah, al, num) {
  return ah >>> num;
}
exports.shr64_hi = shr64_hi;

function shr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.shr64_lo = shr64_lo;


/***/ }),

/***/ "../../node_modules/hmac-drbg/lib/hmac-drbg.js":
/*!*****************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/hmac-drbg/lib/hmac-drbg.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__(/*! hash.js */ "../../node_modules/hash.js/lib/hash.js");
var utils = __webpack_require__(/*! minimalistic-crypto-utils */ "../../node_modules/minimalistic-crypto-utils/lib/utils.js");
var assert = __webpack_require__(/*! minimalistic-assert */ "../../node_modules/minimalistic-assert/index.js");

function HmacDRBG(options) {
  if (!(this instanceof HmacDRBG))
    return new HmacDRBG(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;

  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

  this._reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;

  var entropy = utils.toArray(options.entropy, options.entropyEnc || 'hex');
  var nonce = utils.toArray(options.nonce, options.nonceEnc || 'hex');
  var pers = utils.toArray(options.pers, options.persEnc || 'hex');
  assert(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
  this._init(entropy, nonce, pers);
}
module.exports = HmacDRBG;

HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
  var seed = entropy.concat(nonce).concat(pers);

  this.K = new Array(this.outLen / 8);
  this.V = new Array(this.outLen / 8);
  for (var i = 0; i < this.V.length; i++) {
    this.K[i] = 0x00;
    this.V[i] = 0x01;
  }

  this._update(seed);
  this._reseed = 1;
  this.reseedInterval = 0x1000000000000;  // 2^48
};

HmacDRBG.prototype._hmac = function hmac() {
  return new hash.hmac(this.hash, this.K);
};

HmacDRBG.prototype._update = function update(seed) {
  var kmac = this._hmac()
                 .update(this.V)
                 .update([ 0x00 ]);
  if (seed)
    kmac = kmac.update(seed);
  this.K = kmac.digest();
  this.V = this._hmac().update(this.V).digest();
  if (!seed)
    return;

  this.K = this._hmac()
               .update(this.V)
               .update([ 0x01 ])
               .update(seed)
               .digest();
  this.V = this._hmac().update(this.V).digest();
};

HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
  // Optional entropy enc
  if (typeof entropyEnc !== 'string') {
    addEnc = add;
    add = entropyEnc;
    entropyEnc = null;
  }

  entropy = utils.toArray(entropy, entropyEnc);
  add = utils.toArray(add, addEnc);

  assert(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

  this._update(entropy.concat(add || []));
  this._reseed = 1;
};

HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
  if (this._reseed > this.reseedInterval)
    throw new Error('Reseed is required');

  // Optional encoding
  if (typeof enc !== 'string') {
    addEnc = add;
    add = enc;
    enc = null;
  }

  // Optional additional data
  if (add) {
    add = utils.toArray(add, addEnc || 'hex');
    this._update(add);
  }

  var temp = [];
  while (temp.length < len) {
    this.V = this._hmac().update(this.V).digest();
    temp = temp.concat(this.V);
  }

  var res = temp.slice(0, len);
  this._update(add);
  this._reseed++;
  return utils.encode(res, enc);
};


/***/ }),

/***/ "../../node_modules/inherits/inherits.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/inherits/inherits.js ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(/*! util */ "util");
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  module.exports = __webpack_require__(/*! ./inherits_browser.js */ "../../node_modules/inherits/inherits_browser.js");
}


/***/ }),

/***/ "../../node_modules/inherits/inherits_browser.js":
/*!*******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/inherits/inherits_browser.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "../../node_modules/minimalistic-assert/index.js":
/*!*******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/minimalistic-assert/index.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = assert;

function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};


/***/ }),

/***/ "../../node_modules/minimalistic-crypto-utils/lib/utils.js":
/*!*****************************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/minimalistic-crypto-utils/lib/utils.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = exports;

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg !== 'string') {
    for (var i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
    return res;
  }
  if (enc === 'hex') {
    msg = msg.replace(/[^a-z0-9]+/ig, '');
    if (msg.length % 2 !== 0)
      msg = '0' + msg;
    for (var i = 0; i < msg.length; i += 2)
      res.push(parseInt(msg[i] + msg[i + 1], 16));
  } else {
    for (var i = 0; i < msg.length; i++) {
      var c = msg.charCodeAt(i);
      var hi = c >> 8;
      var lo = c & 0xff;
      if (hi)
        res.push(hi, lo);
      else
        res.push(lo);
    }
  }
  return res;
}
utils.toArray = toArray;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils.zero2 = zero2;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils.toHex = toHex;

utils.encode = function encode(arr, enc) {
  if (enc === 'hex')
    return toHex(arr);
  else
    return arr;
};


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
  constructor(id, byteSize = 1, lengthId = 'length', lengthDesc = null) {
    super(id || `bytes_with_length_${byteSize * 8}`);
    this.description('Bytes with variable size prepended');
    this[P_BYTES_FIELD] = new BytesWithoutLength('value');

    switch (byteSize) {
      case 1:
        this[P_LENGTH_FIELD] = new Int8(lengthId, true);
        break;

      case 2:
        this[P_LENGTH_FIELD] = new Int16(lengthId, true, Endian.LITTLE_ENDIAN);
        break;

      case 4:
        this[P_LENGTH_FIELD] = new Int32(lengthId, true, Endian.LITTLE_ENDIAN);
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
    this[P_SIZE_ENCODED] = this[P_LENGTH_FIELD].decodeFromBytes(bc) + this[P_LENGTH_FIELD].encodedSize;
    return this[P_BYTES_FIELD].decodeFromBytes(bc.slice(this[P_LENGTH_FIELD].encodedSize, this[P_SIZE_ENCODED]));
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
const P_LENGTH_FIELD = Symbol('length_field');
const P_STRING_FIELD = Symbol('bytes_field');
/**
 * A field type to write dynamic strings (prepends the length).
 */

class StringWithLength extends AbstractType {
  constructor(id, byteSize = 1) {
    super(id || `bytes_size${byteSize * 8}`);
    this.description('String with size prepended');
    this[P_STRING_FIELD] = new StringWithoutLength('value');

    switch (byteSize) {
      case 1:
        this[P_LENGTH_FIELD] = new Int8('length', true);
        break;

      case 2:
        this[P_LENGTH_FIELD] = new Int16('length', true, Endian.LITTLE_ENDIAN);
        break;

      case 4:
        this[P_LENGTH_FIELD] = new Int32('length', true, Endian.LITTLE_ENDIAN);
        break;

      default:
        throw new Error('ByteSize must be either 1, 2 or 4');
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
    this[P_SIZE_ENCODED] = this[P_LENGTH_FIELD].encodedSize + this[P_LENGTH_FIELD].decodeFromBytes(BC.from(bc));
    return this[P_STRING_FIELD].decodeFromBytes(bc.slice(this[P_LENGTH_FIELD].encodedSize, this[P_SIZE_ENCODED]));
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
  constructor(id = null) {
    super(id || 'currency', true, Endian.LITTLE_ENDIAN);
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
    this.addSubType(new BytesWithLength('key', 2));
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

const BytesWithoutLength = __webpack_require__(/*! ./../Core/BytesWithoutLength */ "../common/src/Coding/Core/BytesWithoutLength.js");

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
    this.addSubType(new Int32('block', true, Endian.LITTLE_ENDIAN));
    this.addSubType(new AccountNumber('account'));
    this.addSubType(new NOperation('nOperation', 4));
    this.addSubType(new BytesWithoutLength('md160'));
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
   * @returns {string}
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
   * Gets the ec key.
   *
   * @returns {BC}
   */


  get ecdh() {
    return BC.concat(BC.fromInt(4), this.x, this.y);
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
  Encryption: {
    Abstract: __webpack_require__(/*! ./src/Encryption/Abstract */ "./src/Encryption/Abstract.js"),
    ECDH: __webpack_require__(/*! ./src/Encryption/ECDH */ "./src/Encryption/ECDH.js"),
    AES: {
      CBCPKCS7: __webpack_require__(/*! ./src/Encryption/AES/CBCPKCS7 */ "./src/Encryption/AES/CBCPKCS7.js"),
      CBCZeroPadding: __webpack_require__(/*! ./src/Encryption/AES/CBCZeroPadding */ "./src/Encryption/AES/CBCZeroPadding.js")
    },
    Pascal: {
      KDF: __webpack_require__(/*! ./src/Encryption/Pascal/KDF */ "./src/Encryption/Pascal/KDF.js"),
      ECIES: __webpack_require__(/*! ./src/Encryption/Pascal/ECIES */ "./src/Encryption/Pascal/ECIES.js"),
      Password: __webpack_require__(/*! ./src/Encryption/Pascal/Password */ "./src/Encryption/Pascal/Password.js"),
      PrivateKey: __webpack_require__(/*! ./src/Encryption/Pascal/PrivateKey */ "./src/Encryption/Pascal/PrivateKey.js")
    }
  },
  Keys: __webpack_require__(/*! ./src/Keys */ "./src/Keys.js"),
  mipher: {
    AES_CBC_ZeroPadding: __webpack_require__(/*! ./src/mipher/AES_CBC_ZeroPadding */ "./src/mipher/AES_CBC_ZeroPadding.js")
  }
};

/***/ }),

/***/ "./src/Encryption/AES/CBCPKCS7.js":
/*!****************************************!*\
  !*** ./src/Encryption/AES/CBCPKCS7.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Encryption/Abstract.js");

const mAES = __webpack_require__(/*! mipher/dist/aes */ "../../node_modules/mipher/dist/aes.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;
/**
 * AES-CBC PKCS7 implementation.
 */


class CBCPKCS7 extends Abstract {
  /**
   * @inheritDoc Abstract#encrypt
   */
  static encrypt(value, options = {
    key: BC.empty(),
    iv: BC.empty()
  }) {
    let aes = new mAES.AES_CBC_PKCS7();
    return new BC(aes.encrypt(BC.from(options.key).buffer, BC.from(value).buffer, BC.from(options.iv).buffer));
  }
  /**
   * @inheritDoc Abstract#decrypt
   */


  static decrypt(value, options = {
    key: BC.empty(),
    iv: BC.empty()
  }) {
    let aes = new mAES.AES_CBC_PKCS7();
    return new BC(aes.decrypt(BC.from(options.key).buffer, BC.from(value).buffer, BC.from(options.iv).buffer));
  }

}

module.exports = CBCPKCS7;

/***/ }),

/***/ "./src/Encryption/AES/CBCZeroPadding.js":
/*!**********************************************!*\
  !*** ./src/Encryption/AES/CBCZeroPadding.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Encryption/Abstract.js");

const AES_CBC_ZeroPadding = __webpack_require__(/*! ./../../mipher/AES_CBC_ZeroPadding */ "./src/mipher/AES_CBC_ZeroPadding.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;
/**
 * AES-CBC Zero Padding implementation.
 */


class CBCZeroPadding extends Abstract {
  /**
   * @inheritDoc Abstract#encrypt
   */
  static encrypt(value, options = {
    key: BC.empty(),
    iv: BC.empty()
  }) {
    let aes = new AES_CBC_ZeroPadding();
    return new BC(aes.encrypt(BC.from(options.key).buffer, BC.from(value).buffer, BC.from(options.iv).buffer));
  }
  /**
   * @inheritDoc Abstract#encrypt
   */


  static decrypt(value, options = {
    key: BC.empty(),
    iv: BC.empty()
  }) {
    let aes = new AES_CBC_ZeroPadding();
    return new BC(aes.decrypt(BC.from(options.key).buffer, BC.from(value).buffer, BC.from(options.iv).buffer));
  }

}

module.exports = CBCZeroPadding;

/***/ }),

/***/ "./src/Encryption/Abstract.js":
/*!************************************!*\
  !*** ./src/Encryption/Abstract.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

class Abstract {
  /**
   * Encrypts the given value.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @param {Object} options
   * @return {BC}
   */
  static encrypt(value, options = {}) {
    throw new Error('encrypt not implemented');
  }
  /**
   * Decrypts the given bytes.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @param {Object} options
   * @return {BC}
   */


  static decrypt(value, options = {}) {
    throw new Error('decrypt not implemented');
  }

}

module.exports = Abstract;

/***/ }),

/***/ "./src/Encryption/ECDH.js":
/*!********************************!*\
  !*** ./src/Encryption/ECDH.js ***!
  \********************************/
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


const Sha = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Sha;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Keys.PublicKey;

const CBCZeroPadding = __webpack_require__(/*! ./AES/CBCZeroPadding */ "./src/Encryption/AES/CBCZeroPadding.js");

const elliptic = __webpack_require__(/*! elliptic/lib/elliptic/ec/index */ "../../node_modules/elliptic/lib/elliptic/ec/index.js");
/**
 * AES encryption / decryption for PascalCoin.
 */


class ECDH {
  /**
   * Encrypts the given data with the given public key.
   *
   * @param {BC|Buffer|Uint8Array|String} data
   * @param {PublicKey} publicKey
   * @returns {Object}
   */
  static encrypt(value, options = {
    publicKey: PublicKey.empty()
  }) {
    value = BC.from(value);
    let ecCurve = elliptic(options.publicKey.curve.name);
    let tempKey = ecCurve.genKeyPair();
    let pubkey = ecCurve.keyFromPublic(options.publicKey.ecdh.buffer);
    let sharedSecret = tempKey.derive(pubkey.getPublic());
    let secrectkey = Sha.sha512(new BC(sharedSecret.toArray()));
    let encryptedData = CBCZeroPadding.encrypt(value, {
      key: secrectkey.slice(0, 32),
      iv: new Uint8Array(16)
    });
    return {
      data: encryptedData,
      key: secrectkey.slice(32, 64),
      publicKey: new BC(tempKey.getPublic(true, 'buffer'))
    };
  }
  /**
   * Decrypts the given data.
   *
   * @param {PrivateKey} privateKey
   * @param {BC|Buffer|Uint8Array|String} publicKey
   * @param {BC|Buffer|Uint8Array|String} data
   * @returns {Object}
   */


  static decrypt(value, options = {
    privateKey: null,
    publicKey: PublicKey.empty(),
    origMsgLength: 0
  }) {
    options.publicKey = BC.from(options.publicKey);
    value = BC.from(value);
    let ecCurve = elliptic(options.privateKey.curve.name);
    let ecPrivateKey = ecCurve.keyFromPrivate(options.privateKey.key.buffer);
    let ecPublicKey = ecCurve.keyFromPublic(options.publicKey.buffer);
    let sharedSecret = ecPrivateKey.derive(ecPublicKey.getPublic());
    let secrectKey = Sha.sha512(new BC(Buffer.from(sharedSecret.toArray())));
    let decryptedData = CBCZeroPadding.decrypt(value, {
      key: secrectKey.slice(0, 32),
      iv: new Uint8Array(16)
    });
    let decryptedDataWithPaddingRemoved = decryptedData.slice(0, options.origMsgLength);
    return {
      data: decryptedDataWithPaddingRemoved,
      key: secrectKey.slice(32, 64)
    };
  }

}

module.exports = ECDH;

/***/ }),

/***/ "./src/Encryption/Pascal/ECIES.js":
/*!****************************************!*\
  !*** ./src/Encryption/Pascal/ECIES.js ***!
  \****************************************/
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


const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Encryption/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const ECDH = __webpack_require__(/*! ./../ECDH */ "./src/Encryption/ECDH.js");

const ECIESData = __webpack_require__(/*! ./ECIES/Data */ "./src/Encryption/Pascal/ECIES/Data.js");

const ECIESCoding = __webpack_require__(/*! ./ECIES/Coding */ "./src/Encryption/Pascal/ECIES/Coding.js");

const CryptoJSEncHex = __webpack_require__(/*! crypto-js/enc-hex */ "../../node_modules/crypto-js/enc-hex.js");

const CryptoJSHmacMd5 = __webpack_require__(/*! crypto-js/hmac-md5 */ "../../node_modules/crypto-js/hmac-md5.js");
/**
 * A class that can en-/decrypt payloads based on a public key / private key.
 */


class ECIES extends Abstract {
  /**
   * Decrypts the given encrypted value using the given key pair.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @param {Object} options
   *
   * @return {BC|false}
   */
  static decrypt(value, options = {
    keyPair: null
  }) {
    let keyData = new ECIESCoding().decodeFromBytes(value);
    const dec = ECDH.decrypt(keyData.encryptedData, {
      privateKey: options.keyPair.privateKey,
      publicKey: keyData.publicKey,
      origMsgLength: keyData.originalDataLength
    });
    const mac = BC.fromHex(CryptoJSHmacMd5(CryptoJSEncHex.parse(keyData.encryptedData.toHex()), CryptoJSEncHex.parse(dec.key.toHex())).toString()); // var mac5 = hmac3.update(keyData.encryptedData.toString(), 'utf8').digest('hex');

    if (keyData.mac.equals(mac)) {
      return dec.data;
    }

    throw new Error('Unable to decrypt value.');
  }
  /**
   * Encrypts the given value using the given public key.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @param {Object} options
   * @return {BC}
   */


  static encrypt(value, options = {
    publicKey: null
  }) {
    value = BC.from(value);
    const enc = ECDH.encrypt(value, options); // TODO: this causes a big polyfill

    const mac = BC.fromHex(CryptoJSHmacMd5(CryptoJSEncHex.parse(enc.data.toHex()), CryptoJSEncHex.parse(enc.key.toHex())).toString());
    const originalDataLength = value.length;
    const originalDataLengthIncPadLength = originalDataLength % 16 === 0 ? 0 : 16 - originalDataLength % 16;
    let keyData = new ECIESData();
    keyData.withPublicKey(enc.publicKey);
    keyData.withMac(mac);
    keyData.withEncryptedData(enc.data);
    keyData.withOriginalDataLength(originalDataLength);
    keyData.withOriginalDataLengthIncPadLength(originalDataLengthIncPadLength);
    return new ECIESCoding().encodeToBytes(keyData);
  }

}

module.exports = ECIES;

/***/ }),

/***/ "./src/Encryption/Pascal/ECIES/Coding.js":
/*!***********************************************!*\
  !*** ./src/Encryption/Pascal/ECIES/Coding.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

const Endian = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Endian;

const CommonCoding = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding;

const CompositeType = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding.CompositeType;

const Data = __webpack_require__(/*! ./Data */ "./src/Encryption/Pascal/ECIES/Data.js");

class Coding extends CompositeType {
  constructor() {
    super('pascalcoin_ecies');
    this.description('Coding for an pascalcoin encrypted ECIES message');
    this.addSubType(new CommonCoding.Core.Int8('publicKeyLength', true));
    this.addSubType(new CommonCoding.Core.Int8('macLength', true));
    this.addSubType(new CommonCoding.Core.Int16('originalDataLength', true, Endian.LITTLE_ENDIAN));
    this.addSubType(new CommonCoding.Core.Int16('originalDataLengthIncPadLength', true, Endian.LITTLE_ENDIAN));
    this.addSubType(new CommonCoding.Decissive('publicKey', 'publicKeyLength', function (publicKeyLength) {
      return new CommonCoding.Core.BytesFixedLength('publicKey', publicKeyLength);
    }));
    this.addSubType(new CommonCoding.Decissive('mac', 'macLength', function (macLength) {
      return new CommonCoding.Core.BytesFixedLength('mac', macLength);
    }));
    this.addSubType(new CommonCoding.Core.BytesWithoutLength('encryptedData'));
  }
  /**
   *
   * @param bc
   * @param options
   * @param all
   * @return {ECIESData}
   */


  decodeFromBytes(bc, options = {}, all = null) {
    let decoded = super.decodeFromBytes(bc, options, all);
    let data = new Data();
    data.withPublicKey(decoded.publicKey);
    data.withOriginalDataLength(decoded.originalDataLength);
    data.withOriginalDataLengthIncPadLength(decoded.originalDataLengthIncPadLength);
    data.withMac(decoded.mac);
    data.withEncryptedData(decoded.encryptedData);
    return data;
  }

}

module.exports = Coding;

/***/ }),

/***/ "./src/Encryption/Pascal/ECIES/Data.js":
/*!*********************************************!*\
  !*** ./src/Encryption/Pascal/ECIES/Data.js ***!
  \*********************************************/
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

/***/ }),

/***/ "./src/Encryption/Pascal/KDF.js":
/*!**************************************!*\
  !*** ./src/Encryption/Pascal/KDF.js ***!
  \**************************************/
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


const Sha = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Sha;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;
/**
 * Key derivation function(s).
 */


class KDF {
  /**
   * Gets the key and iv for pascalcoin.
   *
   * @param {BC|Buffer|Uint8Array|String} password
   * @param {Buffer|Uint8Array|BC|String} salt
   * @returns {{iv: BC, key: BC}}
   * @constructor
   */
  static PascalCoin(password, salt = null) {
    password = BC.from(password, 'string');

    if (salt === null) {
      salt = new BC([]);
    } else {
      salt = BC.from(salt);
    } // Key = sha256 (password + salt);


    let key = Sha.sha256(password, salt); // iv = sha256 (KEY + password + salt);

    let iv = Sha.sha256(key, password, salt);
    return {
      key,
      iv
    };
  }

}

module.exports = KDF;

/***/ }),

/***/ "./src/Encryption/Pascal/Password.js":
/*!*******************************************!*\
  !*** ./src/Encryption/Pascal/Password.js ***!
  \*******************************************/
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


const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Encryption/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const mipherAES = __webpack_require__(/*! mipher/dist/aes */ "../../node_modules/mipher/dist/aes.js");

const mipherRandom = __webpack_require__(/*! mipher/dist/random */ "../../node_modules/mipher/dist/random.js");

const KDF = __webpack_require__(/*! ./KDF */ "./src/Encryption/Pascal/KDF.js");
/**
 * A class that can en-/decrypt values just the way payloads are encrypted
 * using a password in pascalcoin.
 */


class Password extends Abstract {
  /**
   * Encrypts the given value with the given password the PascalCoin way.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @param {Object} options
   * @return {BC}
   */
  static encrypt(value, options = {
    password: ''
  }) {
    value = BC.from(value);
    let aes = new mipherAES.AES_CBC_PKCS7();
    const randomGenerator = new mipherRandom.Random();
    const salt = new BC(Buffer.from(randomGenerator.get(8))); // mocha sees an open setinterval and won't exit without this change

    randomGenerator.stop();
    const keyInfo = KDF.PascalCoin(options.password, salt);
    return BC.concat(BC.fromString('Salted__'), salt, new BC(aes.encrypt(keyInfo.key.buffer, value.buffer, keyInfo.iv.buffer)));
  }
  /**
   * Decrypts the given encrypted value with the given password the
   * PascalCoin way.
   *
   * @param {Buffer|Uint8Array|BC|String} encrypted
   * @param {Object} options
   * @return {BC|false}
   */


  static decrypt(encrypted, options = {
    password: ''
  }) {
    encrypted = BC.from(encrypted);
    let aes = new mipherAES.AES_CBC_PKCS7();
    const salt = encrypted.slice(8, 16);
    const rest = encrypted.slice(16);
    const keyInfo = KDF.PascalCoin(options.password, salt);
    let result = aes.decrypt(keyInfo.key.buffer, rest.buffer, keyInfo.iv.buffer);

    if (result.length === 0) {
      throw new Error('Unable to decrypt value.');
    }

    return new BC(result);
  }

}

module.exports = Password;

/***/ }),

/***/ "./src/Encryption/Pascal/PrivateKey.js":
/*!*********************************************!*\
  !*** ./src/Encryption/Pascal/PrivateKey.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

const Abstract = __webpack_require__(/*! ./../Abstract */ "./src/Encryption/Abstract.js");

const KDF = __webpack_require__(/*! ./KDF */ "./src/Encryption/Pascal/KDF.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;

const CBCPKCS7 = __webpack_require__(/*! ./../AES/CBCPKCS7 */ "./src/Encryption/AES/CBCPKCS7.js");

const Random = __webpack_require__(/*! mipher/dist/random */ "../../node_modules/mipher/dist/random.js");

const PrivateKeyCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Coding.Pascal.Keys.PrivateKey;

const privKeyCoder = new PrivateKeyCoder();

class PrivateKey extends Abstract {
  /**
   * Creates a new keypair from the given private key.
   *
   * @param {Buffer|Uint8Array|BC|String} encryptedPrivateKey
   * @param {Buffer|Uint8Array|BC|String} password
   * @returns {KeyPair}
   */
  static decrypt(value, options = {
    password: ''
  }) {
    value = BC.from(value);
    let password = BC.from(options.password, 'string');
    let salt = value.slice(8, 16);
    let key = KDF.PascalCoin(password, salt); // decrypt

    const encData = value.slice(16);
    const privateKeyDecryptedAndEncoded = CBCPKCS7.decrypt(encData, key);
    return privKeyCoder.decodeFromBytes(privateKeyDecryptedAndEncoded);
  }
  /**
   * Creates a new keypair from the given private key.
   *
   * @param {PrivateKey} value
   * @param {Buffer|Uint8Array|BC|String} password
   * @returns {BC}
   */


  static encrypt(value, options = {
    password: ''
  }) {
    let password = BC.from(options.password, 'string');
    const privateKeyEncoded = privKeyCoder.encodeToBytes(value);
    const randomGenerator = new Random.Random();
    const salt = new BC(Buffer.from(randomGenerator.get(8))); // mocha sees an open setinterval and won't exit without this change

    randomGenerator.stop();
    const keyInfo = KDF.PascalCoin(password, salt);
    const privateKeyEncrypted = CBCPKCS7.encrypt(privateKeyEncoded, keyInfo);
    return BC.concat(BC.fromString('Salted__'), salt, privateKeyEncrypted);
  }

}

module.exports = PrivateKey;

/***/ }),

/***/ "./src/Keys.js":
/*!*********************!*\
  !*** ./src/Keys.js ***!
  \*********************/
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


const elliptic = __webpack_require__(/*! elliptic/lib/elliptic/ec/index */ "../../node_modules/elliptic/lib/elliptic/ec/index.js");

const Curve = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Keys.Curve;

const PrivateKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Keys.PrivateKey;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Keys.PublicKey;

const KeyPair = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").Types.Keys.KeyPair;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "../common/index.js").BC;
/**
 * Handles cryptographic keys.
 */


class Keys {
  /**
   * Generates a new keypair from the given curve.
   *
   * @param {Curve} curve
   * @returns {KeyPair}
   */
  static generate(curve) {
    if (curve === undefined) {
      // eslint-disable-next-line no-param-reassign
      curve = Curve.getDefaultCurve();
    } else if (!(curve instanceof Curve)) {
      // eslint-disable-next-line no-param-reassign
      curve = new Curve(curve);
    }

    if (curve.supported === false) {
      throw new Error('Unsupported curve: ' + curve.name);
    } // TODO: entropy?
    // eslint-disable-next-line new-cap


    const kp = new elliptic(curve.name).genKeyPair();
    return new KeyPair(new PrivateKey(new BC(kp.getPrivate().toArray()), curve), new PublicKey(new BC(kp.getPublic().getX().toArray()), new BC(kp.getPublic().getY().toArray()), curve));
  }
  /**
   * Creates a new keypair from the given private key.
   *
   * @param {PrivateKey} privateKey
   * @returns {KeyPair}
   */


  static fromPrivateKey(privateKey) {
    if (privateKey.curve.supported === false) {
      throw new Error('Unsupported curve: ' + privateKey.curve.name);
    }

    const kp = elliptic(privateKey.curve.name).keyFromPrivate(privateKey.key.buffer);

    if (!privateKey.key.equals(new BC(kp.getPrivate().toArray()))) {
      throw new Error('Something went wrong, the imported private key does not equal the elliptic one');
    }

    return new KeyPair(privateKey, new PublicKey(new BC(kp.getPublic().getX().toArray()), new BC(kp.getPublic().getY().toArray()), privateKey.curve));
  }
  /**
   *
   * @param keyPair
   * @param digest
   * @returns {{r: BC, s: BC}}
   */


  static sign(keyPair, digest) {
    // create an ecpair
    const ecPair = elliptic(keyPair.curve.name).keyFromPrivate(keyPair.privateKey.key.buffer);
    const signature = ecPair.sign(digest.buffer, ecPair.getPrivate('hex'), 'hex', {
      canonical: false
    }); // Verify signature

    if (ecPair.verify(digest.buffer, signature.toDER()) === false) {
      throw Error('Unable to verify the sign result.');
    }

    return {
      s: new BC(Buffer.from(signature.s.toArray())),
      r: new BC(Buffer.from(signature.r.toArray()))
    };
  }

}

module.exports = Keys;

/***/ }),

/***/ "./src/mipher/AES_CBC_ZeroPadding.js":
/*!*******************************************!*\
  !*** ./src/mipher/AES_CBC_ZeroPadding.js ***!
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
const mipherAES = __webpack_require__(/*! mipher/dist/aes */ "../../node_modules/mipher/dist/aes.js");

const mipherPadding = __webpack_require__(/*! mipher/dist/padding */ "../../node_modules/mipher/dist/padding.js");
/**
 * AES-CBC + ZeroPadding integration using the mipher library
 */


class AES_CBC_ZeroPadding {
  /**
   * Constructor
   */
  constructor() {
    this.cipher = new mipherAES.AES_CBC();
    this.padding = new mipherPadding.ZeroPadding();
  }
  /**
   * Encrypts using the given values.
   *
   * @param key
   * @param pt
   * @param iv
   * @returns {Uint8Array}
   */


  encrypt(key, pt, iv) {
    return this.cipher.encrypt(key, this.padding.pad(pt, this.cipher.cipher.blockSize), iv);
  }
  /**
   * Decrypts using the given values.
   *
   * @param key
   * @param ct
   * @param iv
   * @returns {Uint8Array}
   */


  decrypt(key, ct, iv) {
    return this.padding.strip(this.cipher.decrypt(key, ct, iv));
  }

}

module.exports = AES_CBC_ZeroPadding;

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ben/Code/crypto/pascalcoin/untitled/packages/crypto/index.js */"./index.js");


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

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
});
//# sourceMappingURL=crypto.node.js.map