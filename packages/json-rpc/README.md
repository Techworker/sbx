# SBX JSON-RPC library

A sub package of [sbx](http://www.github.com/techworker/sbx)

This is the JSON-RPC communication library of for the SBX family that provides
access to remote endpoints related to the [PascalCoin](https://www.pascalcoin.org) 
BlockChain project.

## Installation

`npm install @sbx/json-rpc`

## Usage

This library implements all JSON-RPC functionalities of PascalCoin. It provides
full featured objects you can use to better work with the responses.

See [the RPC docs](docs/rpc.md) for more info.

### Creating a Client instance

To start requesting a node you need to create a new client instance.

```js
const sbxRpc = require('@pascalcoin-sbx/json-rpc');

// create an rpc client for a local wallet
const rpcClient = sbxRpc.Client.factory('http://127.0.0.1:4003');
```

The resulting `rpcClient` variable can now be used to execute requests against
the node.

## Actions

Each rpc method in the client object returns a specific action type that 
itself has functionality to finetune the call before it gets send to the node 
and returns data.

The execution will return a promise, the successful callback will have a 
single parameter which is an array.

The array consists of 2 values:
 - Index 0: The raw returned result.
 - Index 1: A method to transform the raw result in a rich object. It is not
   not always necessary to work with rich objects as transformation takes some time, 
   so you can choose when to do the transformation.

There are 4 different action types returned by the client calls.

### BaseAction

A simple action type that has no finetuning, since you already provided all 
tunable parameters in the call to the method itself.
 
For example the `getAccount` method returns a `BaseAction`. `getAccount` 
expects a single parameter (the account number), nothing else. So there is
nothing else to finetune.

A `BaseAction` only has one method to execute a call: `execute`. This method 
will return a promise.

**Example:**

```js
const sbxRpc = require('@pascalcoin-sbx/json-rpc');
const rpcClient = sbxRpc.Client.factory('http://127.0.0.1:4003');

rpcClient.getAccount({account: 123, depth: 1000000})
  .execute()
  .then(([accountObj, transform]) => {
    console.log(accountObj); // raw
    console.log(transform(accountObj)); // rich object
  });
```

### PagedAction

A `PagedAction` is returned whenever there is a possibility to page results.

It has the following options to finetune a call:

 - `action.start` - sets the start offset
 - `action.max` - sets the maximum number of results that are returned.

A `PagedAction` has 3 methods to execute the call to the API: 

#### execute 

This method will execute the action based on the given parameters.

**Example**
```js
// ...
let action = rpcClient.getAccountOperations({account: 123, depth: 1000000});
action.start = 50; // offset
action.max = 10; // limit

action.execute()
  .then(([operations, transform]) => {
    console.log(operations); // raw
    console.log(operations.map(op => transform(op)));
  });
```
 
#### executeAll

This method will try to fetch all data and dynamically increments the 
`action.start` value. This method can be useful, but with a lot of data
it will take some time and eat a lot of resources. The result is an 
array with all found data.

**Example**
```js
// ...
let action = rpcClient.getAccountOperations({account: 123, depth: 1000000});

// fine tune paging and startpoint (optional)
action.start = 50; // offset
action.max = 10; // limit

action.executeAll()
  .then(([operations, transform]) => {
    // ALL operations for account
    console.log(operations); // raw
    console.log(operations.map(op => transform(op)));
  });
```

#### executeAllReport

This method will try to fetch all data and dynamically increments the 
`action.start` value. Executing this method lets you be a bit more reactive,
as you can set a callback function that gets called, whenever a chunk of data
was loaded in a single call.

**Example**

```js
// ...
let action = rpcClient.getAccountOperations({account: 123, depth: 1000000});

// fine tune paging and startpoint (optional)
action.start = 50; // offset
action.max = 10; // limit

let countAll = [];
action.executeAllReport(([chunkedOperations, transform]) => {
  // raw array
  console.log(chunkedOperations); 
  // array of rich objects
  console.log(chunkedOperations.map(op => transform(op)));
  // example, increment a counter to report progress for example
  countAll += chunkedOperations.length;
}).then(() => {
  console.log(`${countAll} operations found and reported, finished`);
});
```

Executing `PagedAction`s that will try to return all data can burn down
the node when there are too many requests executed without letting the
node rest a bit.

There are several parameters to the `executeAll` and `executeAllReport`
methods to control this behaviour:

1. `restEach` If this parameter is given, it will rest after it executed
   a remote call equaling the value.
2. `restSeconds` In combination with `restEach`, this value determines the
   number of seconds to rest.
2. `restCallback` In combination with `restEach`, this callback is called
   whenever the action rests.

```js
// ...
let action = rpcClient.getAccountOperations({account: 123, depth: 1000000});

// fine tune paging and startpoint (optional)
action.start = 50; // offset
action.max = 10; // limit

let countAll = [];
// start execution and let it rest for 30 seconds after number of 
// calls % 10 === 0. Report to console. 
action.executeAllReport(([chunkedOperations, transform]) => {
  // raw array
  console.log(chunkedOperations); 
  // array of rich objects
  console.log(chunkedOperations.map(op => transform(op)));
  // example, increment a counter to report progress for example
  countAll += chunkedOperations.length;
}, 10, 30, () => console.log('resting..')).then(() => {
  console.log(`${countAll} operations found and reported, finished`);
});
```

It is also possible to implement your own method to fence the concurrency,
e.g. with PQueue. Have a look at the factory method `sbxRpc.Client.factory` 
and factory your own functionality.

### OperationAction

This action will give you some finetuning about common tasks when remotely
executing operations.

An `OperationAction` only has one method to execute a call: `execute`. This method 
will return a promise.

The action has the following options to finetune a call:

`action.withPayload()`

Sets the payload, the payload method and either the password to encrypt 
the payload or the public key. This call is optional, the default payload 
will be empty.

`action.withFee()`

Sets the fee used for the operation. Default is no fee. This call is 
optional, the default fee is 0.

`action.withMinFee`

Sets the fee to the available minimum fee. This call is optional, the 
default fee is 0.

```js
// ...
let action = rpcClient.sendTo({sender: 123, target: 456, amount: 0.00015});
action.withFee(0.0001); // 1 molina fee
// or..
action.withMinFee(); // 1 molina fee

// no encryption
action.withPayload('techworker');
// payload with password encryption
action.withPayload('techworker', 'pwd', 'test123'); 
// payload with public key encryption (@pascalcoin-sbx/common.Types.Keys.PublicKey)
action.withPayload('techworker', 'pubkey', null, publicKey);

// execute
action.execute(([operation, transform]) => {
  // validate if operation is good
  let richOperation = transform(operation);
  if(richOperation.valid) {
    console.log('All fine..');
  } else {
    console.log('Something went wrong.');
  }
});
```

### SignOperationAction

This action will be returned whenever the call is a signing operation.

An `SignOperationAction` only has one method to execute a call: `execute`. This 
method will return a promise.

The action has the following options to finetune a call:

`action.withLastNOperation()`

This call is mandatory. It sets the last NOperation of the account.  

`action.withRawOperations()`

This call is optional. When signing multiple operations, you can set
the previous sign result and the new one will be appended.

**Example**

```js
// ...
let action = rpcClient.signSendTo({sender: 123, target: 456, senderPubkey: X, targetPubkey: y, amount: 0.0001});
action.withFee(0.0001); // 1 molina fee
// or..
action.withMinFee(); // 1 molina fee

// no encryption
action.withPayload('techworker');
// payload with password encryption
action.withPayload('techworker', 'pwd', 'test123'); 
// payload with public key encryption (@pascalcoin-sbx/common.Types.Keys.PublicKey)
action.withPayload('techworker', 'pubkey', null, publicKey);

// set last n_operation
action.withLastNOperation(1);

// set raw ops from previous call results
action.withRawOperations('');

// execute
action.execute(([operation, transform]) => {
  // validate if operation is good
  let richOperation = transform(operation);
  if(richOperation.valid) {
    console.log('All fine..');
  } else {
    console.log('Something went wrong.');
  }
});
```

## CookBook

You can use `Promise.all` to wait for multiple calls:

```js
// ...
let actions = [];
for(let account = 1; account < 5; account++) {
  let action = rpcClient.getAccount({account});
  actions.push(action.execute());
}
Promise.all(actions).then(([...result]) => {
  result.forEach(([accountObj, transform]) => {
    console.log(accountObj);
    console.log(transform(accountObj));
  });
});
```
