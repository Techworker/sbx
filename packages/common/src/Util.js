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
}

module.exports = Util;
