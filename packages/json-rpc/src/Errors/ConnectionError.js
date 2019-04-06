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
