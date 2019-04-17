const Operation = require('@pascalcoin-sbx/json-rpc').Types.Operation;

module.exports = {
  OPTYPE: function (value) {
    if (value === 'ALL') {
      return -1;
    }

    return Operation[value];
  },
  SUBTYPE: function (value) {
    if (value === 'ALL') {
      return -1;
    }

    return Operation['SUBTYPE_' + value];
  }
};
