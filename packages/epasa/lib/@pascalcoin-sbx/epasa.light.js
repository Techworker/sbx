(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@pascalcoin-sbx/common"));
	else if(typeof define === 'function' && define.amd)
		define("@pascalcoin-sbx/epasa", ["@pascalcoin-sbx/common"], factory);
	else if(typeof exports === 'object')
		exports["@pascalcoin-sbx/epasa"] = factory(require("@pascalcoin-sbx/common"));
	else
		root["@pascalcoin-sbx/epasa"] = factory(root["@pascalcoin-sbx/common"]);
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

/***/ "../../node_modules/murmur-hash/index.js":
/*!***********************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/murmur-hash/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

module.exports =  {
  v3: __webpack_require__(/*! ./lib/v3 */ "../../node_modules/murmur-hash/lib/v3/index.js")
};

// -- Test Code ---------------------------------------------------------
if (__webpack_require__.c[__webpack_require__.s] === module) {
  (function () {
    console.log(module.exports.v3);
  })();
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../../node_modules/murmur-hash/lib/v3/index.js":
/*!******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/murmur-hash/lib/v3/index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./murmur */ "../../node_modules/murmur-hash/lib/v3/murmur.js");


/***/ }),

/***/ "../../node_modules/murmur-hash/lib/v3/murmur.js":
/*!*******************************************************************************************!*\
  !*** /home/ben/Code/crypto/pascalcoin/untitled/node_modules/murmur-hash/lib/v3/murmur.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// +----------------------------------------------------------------------+
// | murmurHash3.js v2.1.2 (http://github.com/karanlyons/murmurHash.js)   |
// | A javascript implementation of MurmurHash3's x86 hashing algorithms. |
// |----------------------------------------------------------------------|
// | Copyright (c) 2012 Karan Lyons                                       |
// | Freely distributable under the MIT license.                          |
// +----------------------------------------------------------------------+


;(function (root, undefined) {
  'use strict';

  // Create a local object that'll be exported or referenced globally.
  var library = {
    'version': '2.1.2',
    'x86': {},
    'x64': {}
  };




  // PRIVATE FUNCTIONS
  // -----------------

  function _x86Multiply(m, n) {
    //
    // Given two 32bit ints, returns the two multiplied together as a
    // 32bit int.
    //

    return ((m & 0xffff) * n) + ((((m >>> 16) * n) & 0xffff) << 16);
  }


  function _x86Rotl(m, n) {
    //
    // Given a 32bit int and an int representing a number of bit positions,
    // returns the 32bit int rotated left by that number of positions.
    //

    return (m << n) | (m >>> (32 - n));
  }


  function _x86Fmix(h) {
    //
    // Given a block, returns murmurHash3's final x86 mix of that block.
    //

    h ^= h >>> 16;
    h  = _x86Multiply(h, 0x85ebca6b);
    h ^= h >>> 13;
    h  = _x86Multiply(h, 0xc2b2ae35);
    h ^= h >>> 16;

    return h;
  }


  function _x64Add(m, n) {
    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // added together as a 64bit int (as an array of two 32bit ints).
    //

    m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
    n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
    var o = [0, 0, 0, 0];

    o[3] += m[3] + n[3];
    o[2] += o[3] >>> 16;
    o[3] &= 0xffff;

    o[2] += m[2] + n[2];
    o[1] += o[2] >>> 16;
    o[2] &= 0xffff;

    o[1] += m[1] + n[1];
    o[0] += o[1] >>> 16;
    o[1] &= 0xffff;

    o[0] += m[0] + n[0];
    o[0] &= 0xffff;

    return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
  }


  function _x64Multiply(m, n) {
    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // multiplied together as a 64bit int (as an array of two 32bit ints).
    //

    m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
    n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
    var o = [0, 0, 0, 0];

    o[3] += m[3] * n[3];
    o[2] += o[3] >>> 16;
    o[3] &= 0xffff;

    o[2] += m[2] * n[3];
    o[1] += o[2] >>> 16;
    o[2] &= 0xffff;

    o[2] += m[3] * n[2];
    o[1] += o[2] >>> 16;
    o[2] &= 0xffff;

    o[1] += m[1] * n[3];
    o[0] += o[1] >>> 16;
    o[1] &= 0xffff;

    o[1] += m[2] * n[2];
    o[0] += o[1] >>> 16;
    o[1] &= 0xffff;

    o[1] += m[3] * n[1];
    o[0] += o[1] >>> 16;
    o[1] &= 0xffff;

    o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0]);
    o[0] &= 0xffff;

    return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
  }


  function _x64Rotl(m, n) {
    //
    // Given a 64bit int (as an array of two 32bit ints) and an int
    // representing a number of bit positions, returns the 64bit int (as an
    // array of two 32bit ints) rotated left by that number of positions.
    //

    n %= 64;

    if (n === 32) {
      return [m[1], m[0]];
    }

    else if (n < 32) {
      return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))];
    }

    else {
      n -= 32;
      return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))];
    }
  }


  function _x64LeftShift(m, n) {
    //
    // Given a 64bit int (as an array of two 32bit ints) and an int
    // representing a number of bit positions, returns the 64bit int (as an
    // array of two 32bit ints) shifted left by that number of positions.
    //

    n %= 64;

    if (n === 0) {
      return m;
    }

    else if (n < 32) {
      return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n];
    }

    else {
      return [m[1] << (n - 32), 0];
    }
  }


  function _x64Xor(m, n) {
    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // xored together as a 64bit int (as an array of two 32bit ints).
    //

    return [m[0] ^ n[0], m[1] ^ n[1]];
  }


  function _x64Fmix(h) {
    //
    // Given a block, returns murmurHash3's final x64 mix of that block.
    // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
    // only place where we need to right shift 64bit ints.)
    //

    h = _x64Xor(h, [0, h[0] >>> 1]);
    h = _x64Multiply(h, [0xff51afd7, 0xed558ccd]);
    h = _x64Xor(h, [0, h[0] >>> 1]);
    h = _x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
    h = _x64Xor(h, [0, h[0] >>> 1]);

    return h;
  }




  // PUBLIC FUNCTIONS
  // ----------------

  library.x86.hash32 = function (key, seed) {
    //
    // Given a string and an optional seed as an int, returns a 32 bit hash
    // using the x86 flavor of MurmurHash3, as an unsigned int.
    //

    key = key || '';
    seed = seed || 0;

    var remainder = key.length % 4;
    var bytes = key.length - remainder;

    var h1 = seed;

    var k1 = 0;

    var c1 = 0xcc9e2d51;
    var c2 = 0x1b873593;

    for (var i = 0; i < bytes; i = i + 4) {
      k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24);

      k1 = _x86Multiply(k1, c1);
      k1 = _x86Rotl(k1, 15);
      k1 = _x86Multiply(k1, c2);

      h1 ^= k1;
      h1 = _x86Rotl(h1, 13);
      h1 = _x86Multiply(h1, 5) + 0xe6546b64;
    }

    k1 = 0;

    switch (remainder) {
      case 3:
        k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;

      case 2:
        k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;

      case 1:
        k1 ^= (key.charCodeAt(i) & 0xff);
        k1 = _x86Multiply(k1, c1);
        k1 = _x86Rotl(k1, 15);
        k1 = _x86Multiply(k1, c2);
        h1 ^= k1;
    }

    h1 ^= key.length;
    h1 = _x86Fmix(h1);

    return h1 >>> 0;
  };


  library.x86.hash128 = function (key, seed) {
    //
    // Given a string and an optional seed as an int, returns a 128 bit
    // hash using the x86 flavor of MurmurHash3, as an unsigned hex.
    //

    key = key || '';
    seed = seed || 0;

    var remainder = key.length % 16;
    var bytes = key.length - remainder;

    var h1 = seed;
    var h2 = seed;
    var h3 = seed;
    var h4 = seed;

    var k1 = 0;
    var k2 = 0;
    var k3 = 0;
    var k4 = 0;

    var c1 = 0x239b961b;
    var c2 = 0xab0e9789;
    var c3 = 0x38b34ae5;
    var c4 = 0xa1e38b93;

    for (var i = 0; i < bytes; i = i + 16) {
      k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24);
      k2 = ((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24);
      k3 = ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i + 9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24);
      k4 = ((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24);

      k1 = _x86Multiply(k1, c1);
      k1 = _x86Rotl(k1, 15);
      k1 = _x86Multiply(k1, c2);
      h1 ^= k1;

      h1 = _x86Rotl(h1, 19);
      h1 += h2;
      h1 = _x86Multiply(h1, 5) + 0x561ccd1b;

      k2 = _x86Multiply(k2, c2);
      k2 = _x86Rotl(k2, 16);
      k2 = _x86Multiply(k2, c3);
      h2 ^= k2;

      h2 = _x86Rotl(h2, 17);
      h2 += h3;
      h2 = _x86Multiply(h2, 5) + 0x0bcaa747;

      k3 = _x86Multiply(k3, c3);
      k3 = _x86Rotl(k3, 17);
      k3 = _x86Multiply(k3, c4);
      h3 ^= k3;

      h3 = _x86Rotl(h3, 15);
      h3 += h4;
      h3 = _x86Multiply(h3, 5) + 0x96cd1c35;

      k4 = _x86Multiply(k4, c4);
      k4 = _x86Rotl(k4, 18);
      k4 = _x86Multiply(k4, c1);
      h4 ^= k4;

      h4 = _x86Rotl(h4, 13);
      h4 += h1;
      h4 = _x86Multiply(h4, 5) + 0x32ac3b17;
    }

    k1 = 0;
    k2 = 0;
    k3 = 0;
    k4 = 0;

    switch (remainder) {
      case 15:
        k4 ^= key.charCodeAt(i + 14) << 16;

      case 14:
        k4 ^= key.charCodeAt(i + 13) << 8;

      case 13:
        k4 ^= key.charCodeAt(i + 12);
        k4 = _x86Multiply(k4, c4);
        k4 = _x86Rotl(k4, 18);
        k4 = _x86Multiply(k4, c1);
        h4 ^= k4;

      case 12:
        k3 ^= key.charCodeAt(i + 11) << 24;

      case 11:
        k3 ^= key.charCodeAt(i + 10) << 16;

      case 10:
        k3 ^= key.charCodeAt(i + 9) << 8;

      case 9:
        k3 ^= key.charCodeAt(i + 8);
        k3 = _x86Multiply(k3, c3);
        k3 = _x86Rotl(k3, 17);
        k3 = _x86Multiply(k3, c4);
        h3 ^= k3;

      case 8:
        k2 ^= key.charCodeAt(i + 7) << 24;

      case 7:
        k2 ^= key.charCodeAt(i + 6) << 16;

      case 6:
        k2 ^= key.charCodeAt(i + 5) << 8;

      case 5:
        k2 ^= key.charCodeAt(i + 4);
        k2 = _x86Multiply(k2, c2);
        k2 = _x86Rotl(k2, 16);
        k2 = _x86Multiply(k2, c3);
        h2 ^= k2;

      case 4:
        k1 ^= key.charCodeAt(i + 3) << 24;

      case 3:
        k1 ^= key.charCodeAt(i + 2) << 16;

      case 2:
        k1 ^= key.charCodeAt(i + 1) << 8;

      case 1:
        k1 ^= key.charCodeAt(i);
        k1 = _x86Multiply(k1, c1);
        k1 = _x86Rotl(k1, 15);
        k1 = _x86Multiply(k1, c2);
        h1 ^= k1;
    }

    h1 ^= key.length;
    h2 ^= key.length;
    h3 ^= key.length;
    h4 ^= key.length;

    h1 += h2;
    h1 += h3;
    h1 += h4;
    h2 += h1;
    h3 += h1;
    h4 += h1;

    h1 = _x86Fmix(h1);
    h2 = _x86Fmix(h2);
    h3 = _x86Fmix(h3);
    h4 = _x86Fmix(h4);

    h1 += h2;
    h1 += h3;
    h1 += h4;
    h2 += h1;
    h3 += h1;
    h4 += h1;

    return ("00000000" + (h1 >>> 0).toString(16)).slice(-8) + ("00000000" + (h2 >>> 0).toString(16)).slice(-8) + ("00000000" + (h3 >>> 0).toString(16)).slice(-8) + ("00000000" + (h4 >>> 0).toString(16)).slice(-8);
  };


  library.x64.hash128 = function (key, seed) {
    //
    // Given a string and an optional seed as an int, returns a 128 bit
    // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
    //

    key = key || '';
    seed = seed || 0;

    var remainder = key.length % 16;
    var bytes = key.length - remainder;

    var h1 = [0, seed];
    var h2 = [0, seed];

    var k1 = [0, 0];
    var k2 = [0, 0];

    var c1 = [0x87c37b91, 0x114253d5];
    var c2 = [0x4cf5ad43, 0x2745937f];

    for (var i = 0; i < bytes; i = i + 16) {
      k1 = [((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24), ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24)];
      k2 = [((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24), ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i + 9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24)];

      k1 = _x64Multiply(k1, c1);
      k1 = _x64Rotl(k1, 31);
      k1 = _x64Multiply(k1, c2);
      h1 = _x64Xor(h1, k1);

      h1 = _x64Rotl(h1, 27);
      h1 = _x64Add(h1, h2);
      h1 = _x64Add(_x64Multiply(h1, [0, 5]), [0, 0x52dce729]);

      k2 = _x64Multiply(k2, c2);
      k2 = _x64Rotl(k2, 33);
      k2 = _x64Multiply(k2, c1);
      h2 = _x64Xor(h2, k2);

      h2 = _x64Rotl(h2, 31);
      h2 = _x64Add(h2, h1);
      h2 = _x64Add(_x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
    }

    k1 = [0, 0];
    k2 = [0, 0];

    switch(remainder) {
      case 15:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 14)], 48));

      case 14:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 13)], 40));

      case 13:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 12)], 32));

      case 12:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 11)], 24));

      case 11:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 10)], 16));

      case 10:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 9)], 8));

      case 9:
        k2 = _x64Xor(k2, [0, key.charCodeAt(i + 8)]);
        k2 = _x64Multiply(k2, c2);
        k2 = _x64Rotl(k2, 33);
        k2 = _x64Multiply(k2, c1);
        h2 = _x64Xor(h2, k2);

      case 8:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 7)], 56));

      case 7:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 6)], 48));

      case 6:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 5)], 40));

      case 5:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 4)], 32));

      case 4:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 3)], 24));

      case 3:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 2)], 16));

      case 2:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 1)], 8));

      case 1:
        k1 = _x64Xor(k1, [0, key.charCodeAt(i)]);
        k1 = _x64Multiply(k1, c1);
        k1 = _x64Rotl(k1, 31);
        k1 = _x64Multiply(k1, c2);
        h1 = _x64Xor(h1, k1);
    }

    h1 = _x64Xor(h1, [0, key.length]);
    h2 = _x64Xor(h2, [0, key.length]);

    h1 = _x64Add(h1, h2);
    h2 = _x64Add(h2, h1);

    h1 = _x64Fmix(h1);
    h2 = _x64Fmix(h2);

    h1 = _x64Add(h1, h2);
    h2 = _x64Add(h2, h1);

    return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
  };




  // INITIALIZATION
  // --------------

  // Export murmurHash3 for CommonJS, either as an AMD module or just as part
  // of the global object.
  if (true) {
    if ( true && module.exports) {
      exports = module.exports = library;
    }

    exports.murmurHash3 = library;
  }

  else {}
})(this);


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
  Parser: __webpack_require__(/*! ./src/Parser */ "./src/Parser.js"),
  EPasa: __webpack_require__(/*! ./src/EPasa */ "./src/EPasa.js"),
  Types: {
    Ascii: __webpack_require__(/*! ./src/Types/Ascii */ "./src/Types/Ascii.js"),
    Base58: __webpack_require__(/*! ./src/Types/Base58 */ "./src/Types/Base58.js")
  }
};

/***/ }),

/***/ "./src/EPasa.js":
/*!**********************!*\
  !*** ./src/EPasa.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const AccountNumber = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountNumber;

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountName;

const MurmurHash3 = __webpack_require__(/*! murmur-hash */ "../../node_modules/murmur-hash/index.js").v3;

const Ascii = __webpack_require__(/*! ./Types/Ascii */ "./src/Types/Ascii.js");

const Base58 = __webpack_require__(/*! ./Types/Base58 */ "./src/Types/Base58.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

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
   * Payload encryption and encoding method not specified.
   *
   * @returns {number}
   */
  static get NON_DETERMISTIC() {
    return 0;
  }
  /**
   * Unencrypted, public payload.
   *
   * @returns {number}
   */


  static get ENC_PUBLIC() {
    return 1;
  }
  /**
   * ECIES encrypted using recipient accounts public key.
   *
   * @returns {number}
   */


  static get ENC_RECEIVER() {
    return 2;
  }
  /**
   * ECIES encrypted using sender accounts public key.
   *
   * @returns {number}
   */


  static get ENC_SENDER() {
    return 4;
  }
  /**
   * AES encrypted using pwd param
   *
   * @returns {number}
   */


  static get ENC_PASSWORD() {
    return 8;
  }
  /**
   * Payload data encoded in ASCII
   *
   * @returns {number}
   */


  static get FORMAT_ASCII() {
    return 16;
  }
  /**
   * Payload data encoded in HEX
   *
   * @returns {number}
   */


  static get FORMAT_HEX() {
    return 32;
  }
  /**
   * Payload data encoded in Base58
   *
   * @returns {number}
   */


  static get FORMAT_BASE58() {
    return 64;
  }
  /**
   * E-PASA addressed by account name (not number).
   *
   * @returns {number}
   */


  static get ADDRESSED_BY_NAME() {
    return 128;
  }
  /**
   * The max payload length for PUBLIC payloads in ASCII form.
   *
   * @returns {number}
   */


  static get MAX_PUBLIC_ASCII() {
    return 255;
  }
  /**
   * The max payload length for ECIES payloads in ASCII form.
   *
   * @returns {number}
   */


  static get MAX_ECIES_ASCII() {
    return 144;
  }
  /**
   * The max payload length for AES payloads in ASCII form.
   *
   * @returns {number}
   */


  static get MAX_AES_ASCII() {
    return 223;
  }
  /**
   * The max payload length for PUBLIC payloads in HEX form.
   *
   * @returns {number}
   */


  static get MAX_PUBLIC_HEX() {
    return 510;
  }
  /**
   * The max payload length for ECIES payloads in HEX form.
   *
   * @returns {number}
   */


  static get MAX_ECIES_HEX() {
    return 288;
  }
  /**
   * The max payload length for AES payloads in HEX form.
   *
   * @returns {number}
   */


  static get MAX_AES_HEX() {
    return 446;
  }
  /**
   * The max payload length for PUBLIC payloads in BASE58 form.
   *
   * @returns {number}
   */


  static get MAX_PUBLIC_BASE58() {
    return 348;
  }
  /**
   * The max payload length for ECIES payloads in BASE58 form.
   *
   * @returns {number}
   */


  static get MAX_ECIES_BASE58() {
    return 196;
  }
  /**
   * The max payload length for AES payloads in BASE58 form.
   *
   * @returns {number}
   */


  static get MAX_AES_BASE58() {
    return 304;
  }
  /**
   * Constructor.
   */


  constructor() {
    this[P_PAYLOAD_TYPE] = EPasa.NON_DETERMISTIC;
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
    return this.isFormatBase58() || this.isFormatAscii() || this.isFormatHex();
  }
  /**
   * Gets a value indicating whether the epasa has an encryption assigned.
   */


  hasEncryption() {
    return this.isEncryptionPublic() || this.isEncryptionPassword() || this.isEncryptionSender() || this.isEncryptionReceiver();
  }
  /**
   * Gets a value indicating the the payload format is base58.
   *
   * @returns {boolean}
   */


  isFormatBase58() {
    return (this[P_PAYLOAD_TYPE] & EPasa.FORMAT_BASE58) === EPasa.FORMAT_BASE58;
  }
  /**
   * Gets a value indicating the the payload format is base58.
   *
   * @returns {boolean}
   */


  isFormatAscii() {
    return (this[P_PAYLOAD_TYPE] & EPasa.FORMAT_ASCII) === EPasa.FORMAT_ASCII;
  }
  /**
   * Gets a value indicating the the payload format is base58.
   *
   * @returns {boolean}
   */


  isFormatHex() {
    return (this[P_PAYLOAD_TYPE] & EPasa.FORMAT_HEX) === EPasa.FORMAT_HEX;
  }
  /**
   * Gets a value indicating that the encryption method is the receivers public key.
   *
   * @returns {boolean}
   */


  isEncryptionReceiver() {
    return (this[P_PAYLOAD_TYPE] & EPasa.ENC_RECEIVER) === EPasa.ENC_RECEIVER;
  }
  /**
   * Gets a value indicating that the encryption method is the senders public key.
   *
   * @returns {boolean}
   */


  isEncryptionSender() {
    return (this[P_PAYLOAD_TYPE] & EPasa.ENC_SENDER) === EPasa.ENC_SENDER;
  }
  /**
   * Gets a value indicating that the encryption method is aes.
   *
   * @returns {boolean}
   */


  isEncryptionPassword() {
    return (this[P_PAYLOAD_TYPE] & EPasa.ENC_PASSWORD) === EPasa.ENC_PASSWORD;
  }
  /**
   * Gets a value indicating that there is no encryption (public payloads).
   *
   * @returns {boolean}
   */


  isEncryptionPublic() {
    return (this[P_PAYLOAD_TYPE] & EPasa.ENC_PUBLIC) === EPasa.ENC_PUBLIC;
  }
  /**
   * Gets a value indicating that the encryption method is not set.
   *
   * @returns {boolean}
   */


  isNonDetermistic() {
    return (this[P_PAYLOAD_TYPE] & EPasa.NON_DETERMISTIC) === EPasa.NON_DETERMISTIC;
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
    this[P_PAYLOAD_TYPE] |= EPasa.ADDRESSED_BY_NAME;
  }
  /**
   * Sets the payload.
   *
   * @param {BC} payload
   */


  set payload(payload) {
    if (!this.hasFormat()) {
      this.format = EPasa.FORMAT_ASCII;
    }

    if ((!this.hasFormat() || !this.hasEncryption()) && payload.toString() !== '') {
      throw new Error('EPasa payloads can only be set when the encryption and format is defined.');
    }

    if (!(payload instanceof BC)) {
      if (this.isFormatHex()) {
        payload = BC.fromHex(payload);
      } else {
        payload = BC.fromString(payload);
      }
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

    if (payloadCompare.length > EPasa[`MAX_${maxIdent}_${typeIdent}`]) {
      throw new Error(`Invalid payload length ${payloadCompare.length} for ${maxIdent}_${typeIdent}. 
        Max is ${EPasa[`MAX_${maxIdent}_${typeIdent}`]}`);
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
    if (encryption === EPasa.ENC_PASSWORD && this[P_PASSWORD] === undefined) {
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
    }; // determine and validate account info

    if ((this[P_PAYLOAD_TYPE] & EPasa.ADDRESSED_BY_NAME) === EPasa.ADDRESSED_BY_NAME) {
      data.account = this[P_ACCOUNT_NAME].toStringEscaped();
    } else {
      data.account = this[P_ACCOUNT_NUMBER].toString();
    } // if there is a payload, we need to format it


    if (this[P_PAYLOAD] !== undefined) {
      if ((this[P_PAYLOAD_TYPE] & EPasa.FORMAT_HEX) === EPasa.FORMAT_HEX) {
        data.payload = `0x${this[P_PAYLOAD].toHex().toLowerCase()}`;
      } else if ((this[P_PAYLOAD_TYPE] & EPasa.FORMAT_BASE58) === EPasa.FORMAT_BASE58) {
        data.payload = new Base58(this[P_PAYLOAD].toString()).toString();
      } else if ((this[P_PAYLOAD_TYPE] & EPasa.FORMAT_ASCII) === EPasa.FORMAT_ASCII) {
        let asciiPayload = new Ascii(this[P_PAYLOAD].toString()).toStringEscaped();

        if (asciiPayload.length > 0) {
          data.payload = `"${asciiPayload}"`;
        }
      } // now we need to determine the wanted encryption of the payload.


      if ((this[P_PAYLOAD_TYPE] & EPasa.ENC_PUBLIC) === EPasa.ENC_PUBLIC) {
        data.enc_marker_start = '[';
        data.enc_marker_end = ']';
      } else if ((this[P_PAYLOAD_TYPE] & EPasa.ENC_RECEIVER) === EPasa.ENC_RECEIVER) {
        data.enc_marker_start = '(';
        data.enc_marker_end = ')';
      } else if ((this[P_PAYLOAD_TYPE] & EPasa.ENC_SENDER) === EPasa.ENC_SENDER) {
        data.enc_marker_start = '<';
        data.enc_marker_end = '>';
      } else if ((this[P_PAYLOAD_TYPE] & EPasa.ENC_PASSWORD) === EPasa.ENC_PASSWORD) {
        data.enc_marker_start = '{';
        data.enc_marker_end = '}'; // append password

        let password = new Ascii(this[P_PASSWORD]);
        data.payload += `:${password.toStringEscaped()}`;
      }
    } else {
      // no payload, no marker
      data.payload = '';
      data.enc_marker_start = '';
      data.enc_marker_end = '';
    } // combine collected data


    let epasa = `${data.account}${data.enc_marker_start}${data.payload}${data.enc_marker_end}`; // no checksum

    if (omitChecksum) {
      return epasa;
    } // calculate the checksum


    return `${epasa}:${EPasa.calculateChecksum(epasa)}`;
  }
  /**
   * Calculates the checksum of the epasa.
   *
   * @param {String} ePasaString
   * @returns {string}
   */


  static calculateChecksum(ePasaString) {
    return BC.fromInt(MurmurHash3.x86.hash32(ePasaString) % 65536).switchEndian().toHex(true);
  }

}

module.exports = EPasa;

/***/ }),

/***/ "./src/Parser.js":
/*!***********************!*\
  !*** ./src/Parser.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const EPasa = __webpack_require__(/*! ./EPasa */ "./src/EPasa.js");

const Ascii = __webpack_require__(/*! ./Types/Ascii */ "./src/Types/Ascii.js");

const BC = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").BC;

const AccountName = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Types.AccountName;
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
      } // flag identifying an escaped character


      let escaped = false;

      if (inAccount) {
        // account names have special escaping rules
        escaped = AccountName.isEscape(ePasaString[position], ePasaString[position + 1]);
      } else if (inPayload) {
        // payload has special escaping rules
        escaped = Ascii.isEscape(ePasaString[position], ePasaString[position + 1]);
      } // increment position, if escaped increment twice to skip the escape


      position++;

      if (escaped) {
        position++;
      }

      return {
        escaped,
        char: ePasaString[position - 1],
        next: ePasaString[position]
      };
    }; // current char info in the loop


    let curr; // loop the epasa string

    while ((curr = next(state.inAccount, state.inPayload)) !== false) {
      // we are in the account, now check for an payload open identifier
      // and toggle the position
      if (state.inAccount) {
        if (curr.escaped === false && ['[', '(', '{', '<'].indexOf(curr.char) > -1) {
          state.inAccount = false;
          state.inPayload = true;
        }
      } // if we are in the payload, no encryption was determined
      // and the character is an encryption type open tag


      if (state.encryption === null && curr.escaped === false && state.inPayload && ['[', '(', '{', '<'].indexOf(curr.char) > -1) {
        if (curr.char === '[') {
          state.encryption = EPasa.ENC_PUBLIC;
        } else if (curr.char === '(') {
          state.encryption = EPasa.ENC_RECEIVER;
        } else if (curr.char === '<') {
          state.encryption = EPasa.ENC_SENDER;
        } else if (curr.char === '{') {
          state.encryption = EPasa.ENC_PASSWORD;
        }

        state.encOpen = curr.char; // we omit the character

        continue;
      } // when we are in the payload or the account and find a ":" it is an
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
        } // we ignore it then


        continue;
      } // determine the format, a " identifies ascii, 0x hex, otherwise its probably base58


      if (curr.escaped === false && curr.char === '"' && state.inPayload && state.format === null) {
        state.format = EPasa.FORMAT_ASCII;
        state.asciiOpen = true;
        continue;
      } else if (curr.escaped === false && curr.char === '0' && curr.next === 'x' && state.inPayload && state.format === null) {
        state.format = EPasa.FORMAT_HEX;
      } else if (curr.escaped === false && state.inPayload && state.format === null) {
        state.format = EPasa.FORMAT_BASE58;
      } else if (curr.escaped === false && curr.char === '"' && state.inPayload && state.format === EPasa.FORMAT_ASCII) {
        state.asciiClosed = true;
        continue;
      } // check closing encryption


      if (curr.escaped === false && state.inPayload && [']', ')', '}', '>'].indexOf(curr.char) > -1) {
        state.inPayload = false;
        state.inChecksum = true;
        state.encClosed = curr.char; // omit

        continue;
      } // append to account


      if (state.inAccount) {
        state.account += curr.char;
        continue;
      } // if (state.inPayload && curr.escaped === false && curr.char === ':') {
      //  state.inPassword = true;
      // }
      // payload


      if (state.inPayload && !state.inPassword) {
        state.payload += curr.char;
      } // password


      if (state.inPayload && state.inPassword) {
        state.password += curr.char;
      } // checksum


      if (state.inChecksum && curr.char !== ':') {
        state.checksum += curr.char;
      }
    }

    if (state.asciiOpen && !state.asciiClosed) {
      throw new Error('Invalid EPasa - missing closing ascii');
    }

    if (state.encOpen !== false && state.encClosed === false) {
      throw new Error('Invalid EPasa - missing closing encryption identifier');
    }

    if (state.encOpen === '[' && state.encClosed !== ']' || state.encOpen === '(' && state.encClosed !== ')' || state.encOpen === '<' && state.encClosed !== '>' || state.encOpen === '{' && state.encClosed !== '}') {
      throw new Error('Invalid EPasa - wrong closing encryption identifier');
    }

    if (state.inChecksum && state.checksum.length < 4 && state.checksumIdentFound) {
      throw new Error('Invalid EPasa - missing or too short checksum');
    }

    if (state.inChecksum && state.checksum.length > 4 && state.checksumIdentFound) {
      throw new Error('Invalid EPasa - missing or too long checksum');
    }

    if (state.format === EPasa.FORMAT_HEX && state.payload.substr(2).length > 0 && /^[0-9a-f]+$/.test(state.payload.substr(2)) === false) {
      throw new Error('Invalid EPasa - only lowercase hex allowed.');
    } // create a new epasa and trigger the validation


    let epasa = new EPasa();

    try {
      epasa.accountNumber = state.account;
    } catch (exAccNumber) {
      try {
        epasa.accountName = state.account;
      } catch (exAccName) {
        throw new Error(`Bad account for epasa: ${exAccNumber.message} - ${exAccName.message}`);
      }
    }

    if (state.encryption === EPasa.ENC_PASSWORD) {
      epasa.password = state.password;
    }

    if (state.format === EPasa.FORMAT_BASE58 && state.payload !== '') {
      epasa.format = state.format;
    }

    epasa.encryption = state.encryption;

    if (state.format === EPasa.FORMAT_HEX) {
      epasa.payload = BC.fromHex(state.payload.substr(2));
    } else if (state.format !== null) {
      epasa.payload = BC.fromString(state.payload);
    } // validate checksum


    if (state.checksum !== '' && EPasa.calculateChecksum(epasa.compile(true)) !== state.checksum) {
      throw new Error('Invalid checksum provided');
    }

    return epasa;
  }

}

module.exports = Parser;

/***/ }),

/***/ "./src/Types/Ascii.js":
/*!****************************!*\
  !*** ./src/Types/Ascii.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Util = __webpack_require__(/*! @pascalcoin-sbx/common */ "@pascalcoin-sbx/common").Util;

const P_VALUE = Symbol('value'); // the list of characters to escape.

const CHARS_TO_ESCAPE = '"():<>[\\]{}'.split('');
const REGEX_TO_ESCAPE = `(${CHARS_TO_ESCAPE.map(c => Util.escapeRegex(c)).join('|')})`;
/**
 * Small class that holds, validated and outputs an EPasa ascii string.
 */

class Ascii {
  /**
   * Constructor
   *
   * @param {String|Ascii} value
   */
  constructor(value) {
    if (value instanceof Ascii) {
      this[P_VALUE] = value.toString();
    } else {
      this[P_VALUE] = Ascii.validate(value);
    }
  }
  /**
   * Validates an ascii string.
   *
   * @param {String} value
   * @return {String}
   */


  static validate(value) {
    if (value.length === 0) {
      return value;
    }

    for (let pos = 0; pos < value.length; pos++) {
      if (value.charCodeAt(pos) < 32 || value.charCodeAt(pos) > 126) {
        throw new Error(`Invalid ascii - character ${value[pos]} not allowed at position ${pos}`);
      }
    }

    return value;
  }
  /**
   * Gets the string value itself.
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

module.exports = Ascii;

/***/ }),

/***/ "./src/Types/Base58.js":
/*!*****************************!*\
  !*** ./src/Types/Base58.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const P_VALUE = Symbol('value');
const ALLOWED = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
/**
 * Small class to initialize and validate a base58 value.
 */

class Base58 {
  /**
   * Constructor
   * @param {String|AccountName} value
   */
  constructor(value) {
    if (value instanceof Base58) {
      this[P_VALUE] = value.toString();
    } else {
      this[P_VALUE] = Base58.validate(value);
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

    for (let pos = 0; pos < value.length; pos++) {
      if (ALLOWED.indexOf(value[pos]) === -1) {
        throw new Error(`Invalid base58 - character ${value[pos]} not allowed at position ${pos}`);
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

}

module.exports = Base58;

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ben/Code/crypto/pascalcoin/untitled/packages/epasa/index.js */"./index.js");


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
//# sourceMappingURL=epasa.light.js.map