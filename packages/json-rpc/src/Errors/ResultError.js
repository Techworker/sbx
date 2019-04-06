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
