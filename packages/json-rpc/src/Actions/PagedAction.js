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
   * @param {*} DestinationType
   * @param {Boolean} returnsArray
   */
  constructor(method, params, executor, DestinationType, returnsArray) {
    super(method, params, executor, DestinationType, returnsArray);
    this.changeParam('start', 0);
    this.changeParam('max', 100);
  }

  withStart(start) {
    this.start = start;
    return this;
  }

  set start(start) {
    this.changeParam('start', start);
    return this;
  }

  withMax(max) {
    this.max = max;
    return this;
  }

  set max(max) {
    this.changeParam('max', max);
    return this;
  }

  /**
   * Executes the current action and returns all results.
   *
   * @returns {Promise}
   */
  async executeAll(restEach = -1, restSeconds = -1, restCallback = null, report = null) {
    let all = [];
    let transformCallback = null;

    await this.executeAllReport(([data, transform]) => {
      if (transformCallback === null) {
        transformCallback = transform;
      }
      data.forEach(item => all.push(item));
      if (report !== null) {
        report(all.length);
      }
    }, restEach, restSeconds, restCallback);
    return [all, transformCallback];
  }

  /**
   * Executes the current action and reports the results of each step to the
   * given reporter.
   *
   * @returns {Promise}
   */
  async executeAllReport(reporter, restEach = -1, restSeconds = -1, restCallback = null) {
    let result = [];
    var reports = 0;

    do {
      if (restEach > -1 && reports > 0 && reports % restEach === 0) {
        if (restCallback !== null) {
          restCallback();
        }
        await (async () => {
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve();
            }, restSeconds * 1000);
          });
        })();
      }

      result = await this.execute();
      if (result[0].length > 0) {
        let c = reporter(result);
        // being able to stop execution

        if (c === false) {
          return;
        }
        reports++;
      }

      this.changeParam('start', this.params.start + this.params.max);
    } while (result[0].length > 0 && result[0].length === this.params.max);
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
