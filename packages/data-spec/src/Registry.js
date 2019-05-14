/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
