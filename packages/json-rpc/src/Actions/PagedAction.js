/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BaseAction = require('./BaseAction');

/**
 * Whenever a remote endpoint has paging possibilities, this action will be
 * returned.
 */
class PagedAction extends BaseAction {
  /**
     * Constructor.
     *
     * @param {String} method
     * @param {Object} params
     * @param {Executor} executor
     */
  constructor(method, params, executor) {
    super(method, params, executor);
    this.changeParam('start', 0);
    this.changeParam('max', 100);
  }

  set start(start) {
    this.changeParam('start', start);
    return this;
  }

  set max(max) {
    this.changeParam('max', max);
    return this;
  }

  /**
   * Executes the current action and returns the raw result.
   *
   * @returns {Promise}
   */
  async executeAll() {
    let all = [];

    await this.executeAllReport(data => data.forEach(item => all.push(item)));
    return all;
  }

  /**
   * Executes the current action and returns the raw result.
   *
   * @returns {Promise}
   */
  async executeAllReport(reporter) {
    let result = [];

    do {
      result = await this.execute();
      reporter(result);
      this.changeParam('start', this.params.start + this.params.max);
    } while (result.length > 0 && result.length === this.params.max);
  }

  /**
   * Executes the current action and transforms the result to an array
   *  of the defined type.
   *
   *  @param {Object} destinationType
   * @returns {Promise}
   */
  async executeAllTransformArray(destinationType) {
    let all = [];

    await this.executeAllTransformArrayReport(destinationType,
      (data) => data.forEach(item => all.push(item))
    );

    return all;
  }

  /**
   * Executes the current action and transforms the result to an array
   *  of the defined type.
   *
   * @param {Object} destinationType
   * @param {Function} reporter
   * @returns {Promise}
   */
  async executeAllTransformArrayReport(destinationType, reporter) {
    let result = [];

    do {
      result = await this.executeTransformArray(destinationType);
      reporter(result);
      this.changeParam('start', this.params.start + this.params.max);
    } while (result.length > 0 && result.length === this.params.max);
  }

  /**
     * Gets a flag indicating whether the current action is valid.
     *
     * @returns {boolean}
     */
  isValid() {
    return true;
  }
}

module.exports = PagedAction;
