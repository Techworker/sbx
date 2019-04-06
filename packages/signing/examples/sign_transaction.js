const BC = require('@sbx/common').BC;
const Keys = require('@sbx/crypto').Keys;
const Account = require('@sbx/common').Types.Account;
const Operation = require('@sbx/json-rpc').Types.Operation;
const OperationsBuilder = require('@sbx/signing').OperationsBuilder;
const BuyOperation = require('@sbx/signing').Operations.BuyAccount;

const ConnectionError = require('@sbx/json-rpc').Errors.ConnectionError;
const ResultError = require('@sbx/json-rpc').Errors.ResultError;

const RPCClient = require('@sbx/json-rpc').Client;
const rpc = RPCClient.factory('http://127.0.0.1:4103');

let keyPair = Keys.decrypt(
  '53616C7465645F5F11EE22450CA421B1E940EC9C1A17F29E6AA9A247A973CCE6224102C9179EB48A43F93215A2E69BBC7A82CF6353B8ABF6AA3154B499474171',
  'test123'
);

function handleError(error) {
  if (error instanceof ConnectionError) {
    console.log('unable to connect');
  } else if (error instanceof ResultError) {
    console.log('result error');
  }
  console.log(error);
}

rpc.getAccount(1430880)
  .executeTransformItem(Account)
  .then((account) => {
    const op = new TxOperation(1430880, 1430881, 0.0002);
    op.withPayload(BC.fromString('test'));
    op.withMinFee();
    op.sign(keyPair, account.nOperation + 1);

    const opBuilder = new OperationsBuilder();

    opBuilder.addOperation(op);
    console.log(opBuilder.build().toHex());

    rpc.executeOperations(opBuilder.build())
      .executeTransformArray(Operation)
      .then((operations) => {
        let operationsWithErrors = operations.filter(op => !op.valid);

        if (operationsWithErrors.length > 0) {
          // handle errors
        }
        console.log(operations);
      }).catch(handleError);
  })
  .catch(handleError);

