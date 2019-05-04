const P_ITEMS = [];

class Registry {
  constructor() {
    this[P_ITEMS] = {};
  }

  /**
     *
   * @param {AbstractSpec} dataSpec
   * @param {Number} type
     */
  register(dataSpec, type = null) {
    if (type === null) {
      type = dataSpec.type;
    } else {
      type = parseInt(type, 10);
    }

    if (this[P_ITEMS][type] === undefined) {
      this[P_ITEMS][type] = [];
    }

    this[P_ITEMS][type].push(dataSpec);
  }
}

module.exports = Registry;
