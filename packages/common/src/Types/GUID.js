const BC = require('./../BC');
const MipherRandom = require('mipher').Random;

const P_PART_1 = Symbol('part_1');
const P_PART_2 = Symbol('part_2');
const P_PART_3 = Symbol('part_3');
const P_PART_4 = Symbol('part_4');
const P_PART_5 = Symbol('part_5');

/**
 * Holds a guid.
 */
class GUID {
  constructor(guid) {
    if (guid instanceof GUID) {
      this[P_PART_1] = guid.part1;
      this[P_PART_2] = guid.part2;
      this[P_PART_3] = guid.part3;
      this[P_PART_4] = guid.part4;
      this[P_PART_5] = guid.part5;
    } else if (guid instanceof BC) {
      this[P_PART_1] = guid.slice(0, 4);
      this[P_PART_2] = guid.slice(4, 6);
      this[P_PART_3] = guid.slice(6, 8);
      this[P_PART_4] = guid.slice(8, 10);
      this[P_PART_5] = guid.slice(10, 16);
    } else {
      if (guid.indexOf('-') > -1) {
        let splitted = guid.split('-');

        try {
          this[P_PART_1] = BC.fromHex(splitted[0]);
        } catch (e) {
          throw new Error(`Invalid GUID (part1): ${splitted[0]} -- ${e.message}`);
        }
        try {
          this[P_PART_2] = BC.fromHex(splitted[1]);
        } catch (e) {
          throw new Error(`Invalid GUID (part2): ${splitted[1]} -- ${e.message}`);
        }
        try {
          this[P_PART_3] = BC.fromHex(splitted[2]);
        } catch (e) {
          throw new Error(`Invalid GUID (part1): ${splitted[2]} -- ${e.message}`);
        }
        try {
          this[P_PART_4] = BC.fromHex(splitted[3]);
        } catch (e) {
          throw new Error(`Invalid GUID (part1): ${splitted[3]} -- ${e.message}`);
        }
        try {
          this[P_PART_5] = BC.fromHex(splitted[4]);
        } catch (e) {
          throw new Error(`Invalid GUID (part1): ${splitted[4]} -- ${e.message}`);
        }
      } else {
        this[P_PART_1] = BC.fromHex(guid.substring(0, 8));
        this[P_PART_2] = BC.fromHex(guid.substring(8, 12));
        this[P_PART_3] = BC.fromHex(guid.substring(12, 16));
        this[P_PART_4] = BC.fromHex(guid.substring(16, 20));
        this[P_PART_5] = BC.fromHex(guid.substring(20, 32));
      }
    }

    if (this[P_PART_1].length !== 4) {
      throw new Error('Invalid GUID (part1)');
    }

    if (this[P_PART_2].length !== 2) {
      throw new Error('Invalid GUID (part2)');
    }
    if (this[P_PART_3].length !== 2) {
      throw new Error('Invalid GUID (part3)');
    }
    if (this[P_PART_4].length !== 2) {
      throw new Error('Invalid GUID (part4)');
    }
    if (this[P_PART_5].length !== 6) {
      throw new Error('Invalid GUID (part5)');
    }
  }

  /**
   * Gets part position 1 of the guid.
   *
   * @return {BC}
   */
  get part1() {
    return this[P_PART_1];
  }

  /**
   * Gets part position 2 of the guid.
   *
   * @return {BC}
   */
  get part2() {
    return this[P_PART_2];
  }

  /**
   * Gets part position 3 of the guid.
   *
   * @return {BC}
   */
  get part3() {
    return this[P_PART_3];
  }

  /**
   * Gets part position 4 of the guid.
   *
   * @return {BC}
   */
  get part4() {
    return this[P_PART_4];
  }

  /**
   * Gets part position 5 of the guid.
   *
   * @return {BC}
   */
  get part5() {
    return this[P_PART_5];
  }

  /**
   * Gets the string represenation of a guid.
   *
   * @return {string}
   */
  toString() {
    return [
      this[P_PART_1],
      this[P_PART_2],
      this[P_PART_3],
      this[P_PART_4],
      this[P_PART_5]
    ].map(p => p.toHex()).join('-');
  }

  toBC() {
    return BC.concat(this[P_PART_1], this[P_PART_2], this[P_PART_3], this[P_PART_4], this[P_PART_5]);
  }

  /**
   * Generates a new V4 GUID.
   *
   * @return {GUID}
   */
  static generate() {
    const randomGenerator = new MipherRandom();
    const uuid = new BC(Buffer.from(randomGenerator.get(16)));

    randomGenerator.stop();

    return new GUID(uuid);
  }
}

module.exports = GUID;
