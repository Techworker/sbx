const Operation = require('@sbx/json-rpc').Types.Operation;

module.exports = {
  OPTYPE: function (value) {
    if (value === 'ALL') {
      return -1;
    }

    return Operation[value];
  }
};
