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
