/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = {
  Scalar: {
    AccountNumber: require('./Scalar/AccountNumber'),
    AccountName: require('./Scalar/AccountName'),
    HexaString: require('./Scalar/HexaString'),
    Currency: require('./Scalar/Currency'),
    OperationHash: require('./Scalar/OperationHash'),
    PublicKey: require('./Scalar/PublicKey')
  }
};
