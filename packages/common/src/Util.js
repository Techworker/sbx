class Util {

  /**
   * https://github.com/MauroJr/escape-regex/blob/master/index.js
   *
   * @param {String} string
   * @returns {string}
   */
  static escapeRegex(string) {
    return ('' + string).replace(/([?!${}*:()|=^[\]\/\\.+])/g, '\\$1');
  }

  static promiseWhile(data, condition, action) {
    let whilst = (data) => {
      return condition(data) ?
        action(data).then(whilst) :
        Promise.resolve(data);
    };

    return whilst(data);
  };

  // https://stackoverflow.com/questions/46479169/check-if-value-is-a-symbol-in-javascript
  static isSymbol(x) {
    return typeof x === 'symbol' ||
        typeof x === 'object' && Object.prototype.toString.call(x) === '[object Symbol]';
  }
}

module.exports = Util;
