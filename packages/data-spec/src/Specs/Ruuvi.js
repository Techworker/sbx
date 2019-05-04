const BC = require('@pascalcoin-sbx/common').BC;
const AbstractSpec = require('./../AbstractSpec');

class Ruuvi extends AbstractSpec {
  static get type() {
    return 12;
  }

  static parse(payload) {
    return JSON.parse(BC.from(payload).toString());
  }

  serialize() {
    return JSON.stringify({a: 'B'});
  }
}

module.exports = Ruuvi;
