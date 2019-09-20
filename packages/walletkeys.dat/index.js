const FileCoder = require('./src/FileCoder');

module.exports = {
  File: require('./src/File'),
  Key: require('./src/Key'),
  KeyCoder: require('./src/KeyCoder'),
  FileCoder,

  // functions
  decode(contents) {
    return new FileCoder().decodeFromBytes(contents);
  },

  /**
   * Encodes the given keys.
   *
   * @param data
   * @return {BC}
   */
  encode(data) {
    return new FileCoder().encodeToBytes(data);
  }
};
