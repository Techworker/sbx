const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;

module.exports = {
  parameters: [
    {
      type: 'select',
      name: 'curve',
      message: 'Pick a curve',
      choices: [Curve.CN_SECP256K1, Curve.CN_P384, Curve.CN_P521, Curve.CN_SECT283K1]
    },
    {
      type: 'password',
      name: 'password',
      message: 'Pick a password for the private key'
    }
  ],
  handler: (responses) => {
    console.log(responses);
  }
};
