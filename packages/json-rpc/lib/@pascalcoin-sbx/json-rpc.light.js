(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@pascalcoin-sbx/common"));
	else if(typeof define === 'function' && define.amd)
		define("@pascalcoin-sbx/json-rpc", ["@pascalcoin-sbx/common"], factory);
	else if(typeof exports === 'object')
		exports["@pascalcoin-sbx/json-rpc"] = factory(require("@pascalcoin-sbx/common"));
	else
		root["@pascalcoin-sbx/json-rpc"] = factory(root["@pascalcoin-sbx/common"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__pascalcoin_sbx_common__) {
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

/***/ "../../node_modules/bn.js/lib/bn.js":
/*!******************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/bn.js/lib/bn.js ***!
  \******************************************************************************/
/*! no static exports found */
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
    Buffer = __webpack_require__(/*! buffer */ 1).Buffer;
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
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BaseAction = __webpack_require__(/*! ./BaseAction */ "./src/Actions/BaseAction.js");

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;
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


  async executeAll() {
    let all = [];
    let transformCallback = null;
    await this.executeAllReport(([data, transform]) => {
      if (transformCallback === null) {
        transformCallback = transform;
      }

      data.forEach(item => all.push(item));
    });
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
      let c = reporter(result); // being able to stop execution

      if (c === false) {
        return;
      }

      reports++;
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

const Account = __webpack_require__(/*! ./Types/Account */ "./src/Types/Account.js");

const Block = __webpack_require__(/*! ./Types/Block */ "./src/Types/Block.js");

const SignedMessage = __webpack_require__(/*! ./Types/SignedMessage */ "./src/Types/SignedMessage.js");

const RawOperations = __webpack_require__(/*! ./Types/RawOperations */ "./src/Types/RawOperations.js");

const NodeStatus = __webpack_require__(/*! ./Types/NodeStatus */ "./src/Types/NodeStatus.js");

const Operation = __webpack_require__(/*! ./Types/Operation */ "./src/Types/Operation.js");

const Sender = __webpack_require__(/*! ./Types/Sender */ "./src/Types/Sender.js");

const Receiver = __webpack_require__(/*! ./Types/Receiver */ "./src/Types/Receiver.js");

const Changer = __webpack_require__(/*! ./Types/Changer */ "./src/Types/Changer.js");

const Connection = __webpack_require__(/*! ./Types/Connection */ "./src/Types/Connection.js");

const WalletPublicKey = __webpack_require__(/*! ./Types/WalletPublicKey */ "./src/Types/WalletPublicKey.js");

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountName;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const OperationHash = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.OperationHash;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

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
    }, this[P_EXECUTOR], Operation, false);
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
    }, this[P_EXECUTOR], Operation, false);
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
    }, this[P_EXECUTOR], Operation, false);
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
    }, this[P_EXECUTOR], Operation, false);
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
    }, this[P_EXECUTOR], Operation, false);
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
    }, this[P_EXECUTOR], Operation, false);
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
   * @param {RawOperations} rawoperations
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
    }, this[P_EXECUTOR], RawOperations, false);
  }
  /**
   * Gets the information about the given operation
   *
   * @param {RawOperations} rawoperations
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
   * @param {RawOperations} rawoperations
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
   *
   * @returns {BaseAction}
   */


  payloadEncrypt({
    payload,
    payloadMethod,
    pwd = null
  }) {
    return new BaseAction('payloadencrypt', {
      payload,
      payload_method: payloadMethod,
      pwd
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
   * @param {RawOperations} rawoperations
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
    }, this[P_EXECUTOR], RawOperations, true);
  }
  /**
   * Signs the given rawoperations
   *
   * @param {RawOperations} rawoperations
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
   * @param {RawOperations} rawoperations
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

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountName;

const OperationHash = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.OperationHash;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const KeyPair = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.KeyPair;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

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
    } else if (item.constructor.name === 'Array') {
      if (item.length > 0) {
        newParams[field] = item;
      }
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

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountName;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const PublicKeyCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding.Pascal.Keys.PublicKey;

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
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const BN = __webpack_require__(/*! bn.js */ "../../node_modules/bn.js/lib/bn.js");

const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const PublicKeyCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding.Pascal.Keys.PublicKey;

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
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountName;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const PublicKeyCoder = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Coding.Pascal.Keys.PublicKey;

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

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

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

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const OperationHash = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.OperationHash;

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
const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

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

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

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

const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const Currency = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Currency;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

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
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

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
      this[P_PUBKEY] = PublicKey.decode(BC.fromHex(data.enc_pubkey));
    } else {
      this[P_PUBKEY] = PublicKey.fromBase58(data.b58_pubkey);
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
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Abstract = __webpack_require__(/*! ./Abstract */ "./src/Types/Abstract.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const Curve = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.Curve;

const PublicKey = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.Keys.PublicKey;

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

/***/ 1:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "@pascalcoin-sbx/common":
/*!*****************************************!*\
  !*** external "@pascalcoin-sbx/common" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__pascalcoin_sbx_common__;

/***/ })

/******/ });
});
//# sourceMappingURL=json-rpc.light.js.map