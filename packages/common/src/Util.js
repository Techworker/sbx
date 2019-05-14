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
}

module.exports = Util;
