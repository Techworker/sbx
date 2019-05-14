/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class AbstractSpec {
  constructor() {
    if (new.target === AbstractSpec) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
  }

  static get type() {
    throw new Error('type getter not implemented');
  }

  static parse(payload) {
    throw new Error('parse not implemented');
  }

  serialize() {
    throw new Error('serialize not implemented');
  }
}

module.exports = AbstractSpec;
