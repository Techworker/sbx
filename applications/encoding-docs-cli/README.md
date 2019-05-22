## Types -> OperationHash

A pascalCoin operation hash
A type that itself is made up of multiple other types.

| Position | Field      | Description                                                                                                                  | Name                  |                                      |
| -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | block      | The block the operation is in.<br />4byte 32bit int value                                                                    | Int32                 | unsigned: true<br />endian: LE<br /> |
| 2        | account    | The account number that signed the operation.<br />An account number<br />4byte 32bit int value                              | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 3        | nOperation | The n_operation value of the account with the current operation.<br />Accounts n_operation value.<br />4byte 32bit int value | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 4        | md160      | The RIPEMD160 hash of the operation data.<br />Bytes without length prepended.                                               | Bytes                 |                                      |
## Types -> PublicKey

A type that itself is made up of multiple other types.

| Position | Field    | Description                                                            | Name  |                                      |
| -------- | -------- | ---------------------------------------------------------------------- | ----- | ------------------------------------ |
| 1        | curve    | Key curve id<br />2byte 16bit int value                                | Bytes | unsigned: true<br />endian: LE<br /> |
| 2        | x_length | Length of X value<br />2byte 16bit int value                           | Int16 | unsigned: true<br />endian: LE<br /> |
| 3        | x        | The X value of the public key.<br />Bytes with variable size prepended | Bytes |                                      |
| 4        | y_length | Length of Y value<br />2byte 16bit int value                           | Int16 | unsigned: true<br />endian: LE<br /> |
| 5        | y        | The X value of the public key.<br />Bytes with variable size prepended | Bytes |                                      |
## Types -> PrivateKey

A type that itself is made up of multiple other types.

| Position | Field  | Description                                                    | Name  |                                      |
| -------- | ------ | -------------------------------------------------------------- | ----- | ------------------------------------ |
| 1        | curve  | Key curve id<br />2byte 16bit int value                        | Bytes | unsigned: true<br />endian: LE<br /> |
| 2        | length | 2byte 16bit int value                                          | Int16 | unsigned: true<br />endian: LE<br /> |
| 3        | key    | The private key value.<br />Bytes with variable size prepended | Bytes |                                      |
## Transaction signing (raw) -> RawCoder

The coder for the raw representation of a Transaction operation
A type that itself is made up of multiple other types.

| Position | Field          | Description                                                                                                           | Name                  |                                      |
| -------- | -------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | sender         | The sender account.<br />An account number<br />4byte 32bit int value                                                 | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | nOperation     | The next n_operation value of the sender.<br />Accounts n_operation value.<br />4byte 32bit int value                 | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 3        | target         | The receiving account.<br />An account number<br />4byte 32bit int value                                              | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 4        | amount         | The amount that is sent from sender to receiver.<br />A type for currency values.<br />8byte 64bit int value          | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 5        | fee            | The fee included in the operation.<br />A type for currency values.<br />8byte 64bit int value                        | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 6        | payload_length | The length of the payload<br />2byte 16bit int value                                                                  | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7        | payload        | The payload of the operation.<br />Bytes with variable size prepended                                                 | Bytes                 |                                      |
| 8        | v2_pubkey      | Empty pubkey (6 zero bytes) - previously active in <= v2.<br />A type that itself is made up of multiple other types. | CompositeType         |                                      |
| 8.1      | curve          | Key curve id<br />2byte 16bit int value                                                                               | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 8.2      | x_length       | Length of X value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 8.3      | x              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 8.4      | y_length       | Length of Y value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 8.5      | y              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 9        | r_length       | Length of r.<br />2byte 16bit int value                                                                               | Int16                 | unsigned: true<br />endian: LE<br /> |
| 10       | r              | R value of the sign operation.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 11       | s_length       | Length of s.<br />2byte 16bit int value                                                                               | Int16                 | unsigned: true<br />endian: LE<br /> |
| 12       | s              | S value of the sign operation.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
## Transaction signing (digest) -> DigestCoder

Digest encoder for a Transaction operation.
A type that itself is made up of multiple other types.

| Position | Field           | Description                                                                                                  | Name                  |                                      |
| -------- | --------------- | ------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------ |
| 1        | sender          | The sender account.<br />An account number<br />4byte 32bit int value                                        | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | nOperation      | The next n_operation value of the sender.<br />Accounts n_operation value.<br />4byte 32bit int value        | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 3        | target          | The receiving account.<br />An account number<br />4byte 32bit int value                                     | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 4        | amount          | The amount that is sent from sender to receiver.<br />A type for currency values.<br />8byte 64bit int value | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 5        | fee             | The fee included in the operation.<br />A type for currency values.<br />8byte 64bit int value               | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 6        | payload         | The payload of the operation.<br />Bytes without length prepended.                                           | Bytes                 |                                      |
| 7        | v2_pubkey_curve | Curve ID 0 - previously active in <= v2.<br />Key curve id<br />2byte 16bit int value                        | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 8        | optype          | Operation type.<br />Operation type in 8 bits                                                                | OpType (Int8)         | unsigned: true<br />endian: LE<br /> |
## Signing -> ChangeKey signing (raw)

The coder for the raw representation of a ChangeKey operation
A type that itself is made up of multiple other types.

| Position | Field          | Description                                                                                                           | Name                  |                                      |
| -------- | -------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | signer         | The signer of the operation.<br />An account number<br />4byte 32bit int value                                        | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | nOperation     | The next n_operation value of the buyer.<br />Accounts n_operation value.<br />4byte 32bit int value                  | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 3        | fee            | The fee paid for the operation.<br />A type for currency values.<br />8byte 64bit int value                           | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 4        | payload_length | The length of the payload<br />2byte 16bit int value                                                                  | Int16                 | unsigned: true<br />endian: LE<br /> |
| 5        | payload        | The payload of the operation.<br />Bytes with variable size prepended                                                 | Bytes                 |                                      |
| 6        | v2_public_key  | Empty pubkey (6 zero bytes) - previously active in <= v2.<br />A type that itself is made up of multiple other types. | CompositeType         |                                      |
| 6.1      | curve          | Key curve id<br />2byte 16bit int value                                                                               | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 6.2      | x_length       | Length of X value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 6.3      | x              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 6.4      | y_length       | Length of Y value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 6.5      | y              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 7        | pubkey_length  | The encoded length of the following public key<br />2byte 16bit int value                                             | Int16                 | unsigned: true<br />endian: LE<br /> |
| 8        | public_key     | A type that itself is made up of multiple other types.                                                                | CompositeType         |                                      |
| 8.1      | curve          | Key curve id<br />2byte 16bit int value                                                                               | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 8.2      | x_length       | Length of X value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 8.3      | x              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 8.4      | y_length       | Length of Y value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 8.5      | y              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 10       | r_length       | Length of r.<br />2byte 16bit int value                                                                               | Int16                 | unsigned: true<br />endian: LE<br /> |
| 11       | r              | R value of the sign operation.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 12       | s_length       | Length of s.<br />2byte 16bit int value                                                                               | Int16                 | unsigned: true<br />endian: LE<br /> |
| 13       | s              | S value of the sign operation.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
## Signing -> ChangeKey signing (digest)

Digest encoder for a ChangeKey operation.
A type that itself is made up of multiple other types.

| Position | Field           | Description                                                                                       | Name                  |                                      |
| -------- | --------------- | ------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | signer          | The account that executes the operation.<br />An account number<br />4byte 32bit int value        | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | nOperation      | The next n_operation of the signer.<br />Accounts n_operation value.<br />4byte 32bit int value   | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 3        | fee             | The fee associated with the operation<br />A type for currency values.<br />8byte 64bit int value | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 4        | payload         | The payload of the operation.<br />Bytes without length prepended.                                | Bytes                 |                                      |
| 5        | v2_pubkey_curve | Curve ID 0 - previously active in <= v2.<br />Key curve id<br />2byte 16bit int value             | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 6        | newPublicKey    | The new public key of the account.<br />A type that itself is made up of multiple other types.    | CompositeType         |                                      |
| 6.1      | curve           | Key curve id<br />2byte 16bit int value                                                           | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 6.2      | x_length        | Length of X value<br />2byte 16bit int value                                                      | Int16                 | unsigned: true<br />endian: LE<br /> |
| 6.3      | x               | The X value of the public key.<br />Bytes with variable size prepended                            | Bytes                 |                                      |
| 6.4      | y_length        | Length of Y value<br />2byte 16bit int value                                                      | Int16                 | unsigned: true<br />endian: LE<br /> |
| 6.5      | y               | The X value of the public key.<br />Bytes with variable size prepended                            | Bytes                 |                                      |
| 7        | optype          | The optype as 8bit int.<br />Operation type in 8 bits                                             | OpType (Int8)         | unsigned: true<br />endian: LE<br /> |
## Signing -> ListAccountForSale signing (raw)

The coder for the raw representation of a List Account operation
A type that itself is made up of multiple other types.

| Position | Field            | Description                                                                                                           | Name                  |                                      |
| -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | signer           | The account that executes the operation.<br />An account number<br />4byte 32bit int value                            | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | target           | The account that will be listed.<br />An account number<br />4byte 32bit int value                                    | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 3        | optype           | The optype of the operation (4)<br />Operation type in 16 bits                                                        | OpType (Int16)        | unsigned: true<br />endian: LE<br /> |
| 4        | nOperation       | The next n_operation of the signer.<br />Accounts n_operation value.<br />4byte 32bit int value                       | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 5        | price            | The price of the target account.<br />A type for currency values.<br />8byte 64bit int value                          | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 6        | accountToPay     | The account where the amount goes to when the target is sold.<br />An account number<br />4byte 32bit int value       | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 7        | v2_pubkey        | Empty pubkey (6 zero bytes) - previously active in <= v2.<br />A type that itself is made up of multiple other types. | CompositeType         |                                      |
| 7.1      | curve            | Key curve id<br />2byte 16bit int value                                                                               | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 7.2      | x_length         | Length of X value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7.3      | x                | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 7.4      | y_length         | Length of Y value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7.5      | y                | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 8        | pubkey_length    | The encoded length of the following public key<br />2byte 16bit int value                                             | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9        | public_key       | A type that itself is made up of multiple other types.                                                                | CompositeType         |                                      |
| 9.1      | curve            | 2byte 16bit int value<br />Key curve id                                                                               | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 9.2      | x_length         | 2byte 16bit int value<br />Length of X value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9.3      | x                | Bytes with variable size prepended<br />The X value of the public key.                                                | Bytes                 |                                      |
| 9.4      | y_length         | 2byte 16bit int value<br />Length of Y value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9.5      | y                | Bytes with variable size prepended<br />The X value of the public key.                                                | Bytes                 |                                      |
| 11       | lockedUntilBlock | The block number until the account is locked.<br />4byte 32bit int value                                              | Int32                 | unsigned: true<br />endian: LE<br /> |
| 12       | fee              | The fee associated with the operation<br />A type for currency values.<br />8byte 64bit int value                     | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 13       | payload_length   | The length of the payload<br />2byte 16bit int value                                                                  | Int16                 | unsigned: true<br />endian: LE<br /> |
| 14       | payload          | The payload of the operation.<br />Bytes with variable size prepended                                                 | Bytes                 |                                      |
| 15       | r_length         | Length of r.<br />2byte 16bit int value                                                                               | Int16                 | unsigned: true<br />endian: LE<br /> |
| 16       | r                | R value of the sign operation.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 17       | s_length         | Length of s.<br />2byte 16bit int value                                                                               | Int16                 | unsigned: true<br />endian: LE<br /> |
| 18       | s                | S value of the sign operation.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
## Signing -> ListAccountForSale signing (digest)

Digest encoder for a List operation.
A type that itself is made up of multiple other types.

| Position | Field            | Description                                                                                                     | Name                  |                                      |
| -------- | ---------------- | --------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | signer           | The account that executes the operation.<br />An account number<br />4byte 32bit int value                      | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | target           | The account that will be listed.<br />An account number<br />4byte 32bit int value                              | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 3        | nOperation       | The next n_operation of the signer.<br />Accounts n_operation value.<br />4byte 32bit int value                 | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 4        | price            | The price of the target account.<br />A type for currency values.<br />8byte 64bit int value                    | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 5        | accountToPay     | The account where the amount goes to when the target is sold.<br />An account number<br />4byte 32bit int value | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 6        | fee              | The fee associated with the operation<br />A type for currency values.<br />8byte 64bit int value               | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 7        | payload          | The payload of the operation.<br />Single string value without length prepended.                                | StringWithoutLength   |                                      |
| 8        | v2_pubkey_curve  | Curve ID 0 - previously active in <= v2.<br />Key curve id<br />2byte 16bit int value                           | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 9        | newPublicKey     | The new public key of the buyer (private sale).<br />A type that itself is made up of multiple other types.     | CompositeType         |                                      |
| 9.1      | curve            | Key curve id<br />2byte 16bit int value                                                                         | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 9.2      | x_length         | Length of X value<br />2byte 16bit int value                                                                    | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9.3      | x                | The X value of the public key.<br />Bytes with variable size prepended                                          | Bytes                 |                                      |
| 9.4      | y_length         | Length of Y value<br />2byte 16bit int value                                                                    | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9.5      | y                | The X value of the public key.<br />Bytes with variable size prepended                                          | Bytes                 |                                      |
| 10       | lockedUntilBlock | The block number until the account is locked.<br />4byte 32bit int value                                        | Int32                 | unsigned: true<br />endian: LE<br /> |
| 11       | optype           | The optype as 8bit int.<br />Operation type in 8 bits                                                           | OpType (Int8)         | unsigned: true<br />endian: LE<br /> |
## Signing -> DeListAccountForSale signing (digest)

The coder for the raw representation of a Delist Account operation
A type that itself is made up of multiple other types.

| Position | Field          | Description                                                                                       | Name                  |                                      |
| -------- | -------------- | ------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | signer         | The account that executes the operation.<br />An account number<br />4byte 32bit int value        | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | target         | The account that will be listed.<br />An account number<br />4byte 32bit int value                | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 3        | optype         | The optype of the operation (5)<br />Operation type in 16 bits                                    | OpType (Int16)        | unsigned: true<br />endian: LE<br /> |
| 4        | nOperation     | The next n_operation of the signer.<br />Accounts n_operation value.<br />4byte 32bit int value   | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 5        | fee            | The fee associated with the operation<br />A type for currency values.<br />8byte 64bit int value | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 6        | payload_length | The length of the payload<br />2byte 16bit int value                                              | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7        | payload        | The payload of the operation.<br />Bytes with variable size prepended                             | Bytes                 |                                      |
| 8        | r_length       | Length of r.<br />2byte 16bit int value                                                           | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9        | r              | R value of the sign operation.<br />Bytes with variable size prepended                            | Bytes                 |                                      |
| 10       | s_length       | Length of s.<br />2byte 16bit int value                                                           | Int16                 | unsigned: true<br />endian: LE<br /> |
| 11       | s              | S value of the sign operation.<br />Bytes with variable size prepended                            | Bytes                 |                                      |
## Signing -> DeListAccountForSale signing (raw)

Digest encoder for a Delist operation.
A type that itself is made up of multiple other types.

| Position | Field            | Description                                                                                                     | Name                  |                                      |
| -------- | ---------------- | --------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | signer           | The account that executes the operation.<br />An account number<br />4byte 32bit int value                      | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | target           | The account that will be de-listed.<br />An account number<br />4byte 32bit int value                           | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 3        | nOperation       | The next n_operation of the signer.<br />Accounts n_operation value.<br />4byte 32bit int value                 | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 4        | price            | The price of the target account.<br />A type for currency values.<br />8byte 64bit int value                    | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 5        | accountToPay     | The account where the amount goes to when the target is sold.<br />An account number<br />4byte 32bit int value | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 6        | fee              | The fee associated with the operation<br />A type for currency values.<br />8byte 64bit int value               | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 7        | payload          | The payload of the operation.<br />Bytes without length prepended.                                              | Bytes                 |                                      |
| 8        | v2_pubkey_curve  | Curve ID 0 - previously active in <= v2.<br />Key curve id<br />2byte 16bit int value                           | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 9        | newPublicKey     | The new public key of the buyer (private sale).<br />A type that itself is made up of multiple other types.     | CompositeType         |                                      |
| 9.1      | curve            | Key curve id<br />2byte 16bit int value                                                                         | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 9.2      | x_length         | Length of X value<br />2byte 16bit int value                                                                    | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9.3      | x                | The X value of the public key.<br />Bytes with variable size prepended                                          | Bytes                 |                                      |
| 9.4      | y_length         | Length of Y value<br />2byte 16bit int value                                                                    | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9.5      | y                | The X value of the public key.<br />Bytes with variable size prepended                                          | Bytes                 |                                      |
| 10       | lockedUntilBlock | The block number until the account is locked.<br />4byte 32bit int value                                        | Int32                 |                                      |
| 11       | optype           | The optype as 8bit int.<br />Operation type in 8 bits                                                           | OpType (Int8)         | unsigned: true<br />endian: LE<br /> |
## Signing -> BuyAccount signing (raw)

The coder for the raw representation of a BuyAccount operation
A type that itself is made up of multiple other types.

| Position | Field          | Description                                                                                                           | Name                  |                                      |
| -------- | -------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | sender         | The buyer account.<br />An account number<br />4byte 32bit int value                                                  | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | nOperation     | The next n_operation value of the buyer.<br />Accounts n_operation value.<br />4byte 32bit int value                  | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 3        | target         | The account to buy.<br />An account number<br />4byte 32bit int value                                                 | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 4        | amount         | The amount to pay for the account.<br />A type for currency values.<br />8byte 64bit int value                        | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 5        | fee            | The fee paid for the operation.<br />A type for currency values.<br />8byte 64bit int value                           | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 6        | payload_length | The length of the payload<br />2byte 16bit int value                                                                  | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7        | payload        | The payload of the operation.<br />Bytes with variable size prepended                                                 | Bytes                 |                                      |
| 8        | v2_public_key  | Empty pubkey (6 zero bytes) - previously active in <= v2.<br />A type that itself is made up of multiple other types. | CompositeType         |                                      |
| 8.1      | curve          | Key curve id<br />2byte 16bit int value                                                                               | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 8.2      | x_length       | Length of X value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 8.3      | x              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 8.4      | y_length       | Length of Y value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 8.5      | y              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 9        | type           | Fixed type for a "Buy account" transaction.<br />1byte 8bit int value                                                 | Int8                  | unsigned: true<br />                 |
| 10       | price          | The price of the account.<br />A type for currency values.<br />8byte 64bit int value                                 | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 11       | seller         | The account number of the seller.<br />An account number<br />4byte 32bit int value                                   | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 12       | newPublicKey   | The new public key that will own the account.<br />A type that itself is made up of multiple other types.             | CompositeType         |                                      |
| 12.1     | curve          | Key curve id<br />2byte 16bit int value                                                                               | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 12.2     | x_length       | Length of X value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 12.3     | x              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 12.4     | y_length       | Length of Y value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 12.5     | y              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 13       | r_length       | Length of r.<br />2byte 16bit int value                                                                               | Int16                 | unsigned: true<br />endian: LE<br /> |
| 14       | r              | R value of the sign operation.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 15       | s_length       | Length of s.<br />2byte 16bit int value                                                                               | Int16                 | unsigned: true<br />endian: LE<br /> |
| 16       | s              | S value of the sign operation.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
## Signing -> BuyAccount signing (digest)

Digest encoder for a BuyAccount operation.
A type that itself is made up of multiple other types.

| Position | Field           | Description                                                                                          | Name                  |                                      |
| -------- | --------------- | ---------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | sender          | The buyer account.<br />An account number<br />4byte 32bit int value                                 | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | nOperation      | The next n_operation value of the buyer.<br />Accounts n_operation value.<br />4byte 32bit int value | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 3        | target          | The account to buy<br />An account number<br />4byte 32bit int value                                 | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 4        | amount          | The amount paid for the account.<br />A type for currency values.<br />8byte 64bit int value         | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 5        | fee             | The fee paid for the operation.<br />A type for currency values.<br />8byte 64bit int value          | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 6        | payload         | The payload of the operation.<br />Bytes without length prepended.                                   | Bytes                 |                                      |
| 7        | v2_pubkey_curve | Curve ID 0 - previously active in <= v2.<br />Key curve id<br />2byte 16bit int value                | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 8        | price           | The price of the account to buy<br />A type for currency values.<br />8byte 64bit int value          | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 9        | seller          | The account number of the seller<br />An account number<br />4byte 32bit int value                   | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 10       | newPublicKey    | The new public key of the account.<br />A type that itself is made up of multiple other types.       | CompositeType         |                                      |
| 10.1     | curve           | Key curve id<br />2byte 16bit int value                                                              | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 10.2     | x               | The X value of the public key.<br />Bytes without length prepended.                                  | Bytes                 |                                      |
| 10.3     | y               | Bytes without length prepended.                                                                      | Bytes                 |                                      |
| 11       | optype          | The buy account optype as 8 bit int8<br />Operation type in 8 bits                                   | OpType (Int8)         | unsigned: true<br />endian: LE<br /> |
## Signing -> ChangeKeySigned signing (raw)

The coder for the raw representation of a ChangeKeySigned operation
A type that itself is made up of multiple other types.

| Position | Field          | Description                                                                                                           | Name                  |                                      |
| -------- | -------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | signer         | The signer of the operation.<br />An account number<br />4byte 32bit int value                                        | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | target         | The target account to be changed.<br />An account number<br />4byte 32bit int value                                   | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 3        | nOperation     | The next n_operation value of the buyer.<br />Accounts n_operation value.<br />4byte 32bit int value                  | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 4        | fee            | The fee paid for the operation.<br />A type for currency values.<br />8byte 64bit int value                           | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 5        | payload_length | The length of the payload<br />2byte 16bit int value                                                                  | Int16                 | unsigned: true<br />endian: LE<br /> |
| 6        | payload        | The payload of the operation.<br />Bytes with variable size prepended                                                 | Bytes                 |                                      |
| 7        | v2_public_key  | Empty pubkey (6 zero bytes) - previously active in <= v2.<br />A type that itself is made up of multiple other types. | CompositeType         |                                      |
| 7.1      | curve          | Key curve id<br />2byte 16bit int value                                                                               | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 7.2      | x_length       | Length of X value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7.3      | x              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 7.4      | y_length       | Length of Y value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7.5      | y              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 8        | pubkey_length  | The encoded length of the following public key<br />2byte 16bit int value                                             | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9        | public_key     | A type that itself is made up of multiple other types.                                                                | CompositeType         |                                      |
| 9.1      | curve          | Key curve id<br />2byte 16bit int value                                                                               | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 9.2      | x_length       | Length of X value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9.3      | x              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 9.4      | y_length       | Length of Y value<br />2byte 16bit int value                                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 9.5      | y              | The X value of the public key.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 11       | r_length       | Length of r.<br />2byte 16bit int value                                                                               | Int16                 | unsigned: true<br />endian: LE<br /> |
| 12       | r              | R value of the sign operation.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
| 13       | s_length       | Length of s.<br />2byte 16bit int value                                                                               | Int16                 | unsigned: true<br />endian: LE<br /> |
| 14       | s              | S value of the sign operation.<br />Bytes with variable size prepended                                                | Bytes                 |                                      |
## Signing -> ChangeKeySigned signing (digest)

Digest encoder for a ChangeKeySigned operation.
A type that itself is made up of multiple other types.

| Position | Field           | Description                                                                                       | Name                  |                                      |
| -------- | --------------- | ------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | signer          | The account that executes the operation.<br />An account number<br />4byte 32bit int value        | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | target          | The account that should be changed.<br />An account number<br />4byte 32bit int value             | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 3        | nOperation      | The next n_operation of the signer.<br />Accounts n_operation value.<br />4byte 32bit int value   | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 4        | fee             | The fee associated with the operation<br />A type for currency values.<br />8byte 64bit int value | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 5        | payload         | The payload of the operation.<br />Bytes without length prepended.                                | Bytes                 |                                      |
| 6        | v2_pubkey_curve | Curve ID 0 - previously active in <= v2.<br />Key curve id<br />2byte 16bit int value             | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 7        | newPublicKey    | The new public key of the account.<br />A type that itself is made up of multiple other types.    | CompositeType         |                                      |
| 7.1      | curve           | Key curve id<br />2byte 16bit int value                                                           | Bytes                 | unsigned: true<br />endian: LE<br /> |
| 7.2      | x_length        | Length of X value<br />2byte 16bit int value                                                      | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7.3      | x               | The X value of the public key.<br />Bytes with variable size prepended                            | Bytes                 |                                      |
| 7.4      | y_length        | Length of Y value<br />2byte 16bit int value                                                      | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7.5      | y               | The X value of the public key.<br />Bytes with variable size prepended                            | Bytes                 |                                      |
| 8        | optype          | The optype as 8bit int.<br />Operation type in 8 bits                                             | OpType (Int8)         | unsigned: true<br />endian: LE<br /> |
## Signing -> MultiOperation signing (raw)

The coder for the raw representation of a MultiOperation
A type that itself is made up of multiple other types.

| Position | Field                | Description                                                                                                                                              | Name                           |                                                  |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------ |
| 1        | protocol             | The protocol version (3).<br />2byte 16bit int value                                                                                                     | Int16                          | unsigned: true<br />endian: LE<br />             |
| 2        | sendersCount         | The number of senders<br />2byte 16bit int value                                                                                                         | Int16                          | unsigned: true<br />endian: LE<br />             |
| 3        | senders              | Senders of the multi-operation<br />A type that itself has one repeating type that will be written / read until the limit is reached or data is empty.   | Array                          |                                                  |
| 3.1..N   | multiop_sender_raw   | The coder for the raw representation of a MultiOperation.Sender<br />A type that itself is made up of multiple other types.                              | CompositeType                  |                                                  |
| 3.1.1    | account              | The account of the operation.<br />An account number<br />4byte 32bit int value                                                                          | AccountNumber (Int32)          | unsigned: true<br />endian: LE<br />             |
| 3.1.2    | amount               | The amount sent by the sender.<br />A type for currency values.<br />8byte 64bit int value                                                               | Currency (Int64)               | unsigned: true<br />endian: LE<br />             |
| 3.1.3    | nOperation           | The next n_operation of the account.<br />Accounts n_operation value.<br />4byte 32bit int value                                                         | NOperation (Int32)             | unsigned: true<br />endian: LE<br />             |
| 3.1.4    | payload_length       | The length of the payload<br />2byte 16bit int value                                                                                                     | Int16                          | unsigned: true<br />endian: LE<br />             |
| 3.1.5    | payload              | The payload of the operation.<br />Bytes with variable size prepended                                                                                    | Bytes                          |                                                  |
| 3.1.6    | r_length             | Length of r.<br />2byte 16bit int value                                                                                                                  | Int16                          | unsigned: true<br />endian: LE<br />             |
| 3.1.7    | r                    | R value of the sign operation.<br />Bytes with variable size prepended                                                                                   | Bytes                          |                                                  |
| 3.1.8    | s_length             | Length of s.<br />2byte 16bit int value                                                                                                                  | Int16                          | unsigned: true<br />endian: LE<br />             |
| 3.1.9    | s                    | S value of the sign operation.<br />Bytes with variable size prepended                                                                                   | Bytes                          |                                                  |
| 4        | receiversCount       | The number of receivers<br />2byte 16bit int value                                                                                                       | Int16                          | unsigned: true<br />endian: LE<br />             |
| 5        | receivers            | Receivers of the multi-operation<br />A type that itself has one repeating type that will be written / read until the limit is reached or data is empty. | Array                          |                                                  |
| 5.1..N   | multiop_receiver_raw | The coder for the raw and digest representation of a MultiOperation.Receiver<br />A type that itself is made up of multiple other types.                 | CompositeType                  |                                                  |
| 5.1.1    | account              | The account of the operation.<br />An account number<br />4byte 32bit int value                                                                          | AccountNumber (Int32)          | unsigned: true<br />endian: LE<br />             |
| 5.1.2    | amount               | The amount sent by the sender.<br />A type for currency values.<br />8byte 64bit int value                                                               | Currency (Int64)               | unsigned: true<br />endian: LE<br />             |
| 5.1.3    | payload_length       | The length of the payload<br />2byte 16bit int value                                                                                                     | Int16                          | unsigned: true<br />endian: LE<br />             |
| 5.1.4    | payload              | The payload of the operation.<br />Bytes with variable size prepended                                                                                    | Bytes                          |                                                  |
| 6        | changersCount        | The number of changers<br />2byte 16bit int value                                                                                                        | Int16                          | unsigned: true<br />endian: LE<br />             |
| 7        | changers             | Changers of the multi-operation<br />A type that itself has one repeating type that will be written / read until the limit is reached or data is empty.  | Array                          |                                                  |
| 7.1..N   | multiop_changer_raw  | The coder for the raw representation of a MultiOperation.Changer<br />A type that itself is made up of multiple other types.                             | CompositeType                  |                                                  |
| 7.1.1    | account              | The account of the operation.<br />An account number<br />4byte 32bit int value                                                                          | AccountNumber (Int32)          | unsigned: true<br />endian: LE<br />             |
| 7.1.2    | nOperation           | The next n_operation of the account.<br />Accounts n_operation value.<br />4byte 32bit int value                                                         | NOperation (Int32)             | unsigned: true<br />endian: LE<br />             |
| 7.1.3    | changeType           | The change type.<br />1byte 8bit int value                                                                                                               | Int8                           | unsigned: undefined<br />                        |
| 7.1.4    | newPublicKey         | The new public key of the account.<br />A type that itself is made up of multiple other types.                                                           | CompositeType                  |                                                  |
| 7.1.4.1  | curve                | Key curve id<br />2byte 16bit int value                                                                                                                  | Bytes                          | unsigned: true<br />endian: LE<br />             |
| 7.1.4.2  | x_length             | Length of X value<br />2byte 16bit int value                                                                                                             | Int16                          | unsigned: true<br />endian: LE<br />             |
| 7.1.4.3  | x                    | The X value of the public key.<br />Bytes with variable size prepended                                                                                   | Bytes                          |                                                  |
| 7.1.4.4  | y_length             | Length of Y value<br />2byte 16bit int value                                                                                                             | Int16                          | unsigned: true<br />endian: LE<br />             |
| 7.1.4.5  | y                    | The X value of the public key.<br />Bytes with variable size prepended                                                                                   | Bytes                          |                                                  |
| 7.1.5    | newName              | The new name of the account.<br />An account name<br />String with size prepended                                                                        | AccountName (StringWithLength) |                                                  |
| 7.1.6    | newType              | The new type of the account.<br />2byte 16bit int value                                                                                                  | Int16                          | unsigned: undefined<br />endian: undefined<br /> |
| 7.1.7    | r_length             | Length of r.<br />2byte 16bit int value                                                                                                                  | Int16                          | unsigned: true<br />endian: LE<br />             |
| 7.1.8    | r                    | R value of the sign operation.<br />Bytes with variable size prepended                                                                                   | Bytes                          |                                                  |
| 7.1.9    | s_length             | Length of s.<br />2byte 16bit int value                                                                                                                  | Int16                          | unsigned: true<br />endian: LE<br />             |
| 7.1.10   | s                    | S value of the sign operation.<br />Bytes with variable size prepended                                                                                   | Bytes                          |                                                  |
## Signing -> MultiOperation signing (digest)

The coder for the digest representation of a MultiOperation
A type that itself is made up of multiple other types.

| Position | Field                  | Description                                                                                                                                              | Name                           |                                                  |
| -------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------ |
| 1        | protocol               | The protocol version (3).<br />2byte 16bit int value                                                                                                     | Int16                          | unsigned: undefined<br />endian: undefined<br /> |
| 2        | sendersCount           | The number of senders<br />2byte 16bit int value                                                                                                         | Int16                          | unsigned: true<br />endian: LE<br />             |
| 3        | senders                | Senders of the multi-operation<br />A type that itself has one repeating type that will be written / read until the limit is reached or data is empty.   | Array                          |                                                  |
| 3.1..N   | multiop_sender_digest  | The coder for the digest representation of a MultiOperation.Sender<br />A type that itself is made up of multiple other types.                           | CompositeType                  |                                                  |
| 3.1.1    | account                | The account of the operation.<br />An account number<br />4byte 32bit int value                                                                          | AccountNumber (Int32)          | unsigned: true<br />endian: LE<br />             |
| 3.1.2    | amount                 | The amount sent by the sender.<br />A type for currency values.<br />8byte 64bit int value                                                               | Currency (Int64)               | unsigned: true<br />endian: LE<br />             |
| 3.1.3    | nOperation             | The next n_operation of the account.<br />Accounts n_operation value.<br />4byte 32bit int value                                                         | NOperation (Int32)             | unsigned: true<br />endian: LE<br />             |
| 3.1.4    | payload_length         | The length of the payload<br />2byte 16bit int value                                                                                                     | Int16                          | unsigned: true<br />endian: LE<br />             |
| 3.1.5    | payload                | The payload of the operation.<br />Bytes with variable size prepended                                                                                    | Bytes                          |                                                  |
| 4        | receiversCount         | The number of receivers<br />2byte 16bit int value                                                                                                       | Int16                          | unsigned: true<br />endian: LE<br />             |
| 5        | receivers              | Receivers of the multi-operation<br />A type that itself has one repeating type that will be written / read until the limit is reached or data is empty. | Array                          |                                                  |
| 5.1..N   | multiop_receiver_raw   | The coder for the raw and digest representation of a MultiOperation.Receiver<br />A type that itself is made up of multiple other types.                 | CompositeType                  |                                                  |
| 5.1.1    | account                | The account of the operation.<br />An account number<br />4byte 32bit int value                                                                          | AccountNumber (Int32)          | unsigned: true<br />endian: LE<br />             |
| 5.1.2    | amount                 | The amount sent by the sender.<br />A type for currency values.<br />8byte 64bit int value                                                               | Currency (Int64)               | unsigned: true<br />endian: LE<br />             |
| 5.1.3    | payload_length         | The length of the payload<br />2byte 16bit int value                                                                                                     | Int16                          | unsigned: true<br />endian: LE<br />             |
| 5.1.4    | payload                | The payload of the operation.<br />Bytes with variable size prepended                                                                                    | Bytes                          |                                                  |
| 6        | changersCount          | The number of changers<br />2byte 16bit int value                                                                                                        | Int16                          | unsigned: true<br />endian: LE<br />             |
| 7        | changers               | Changers of the multi-operation<br />A type that itself has one repeating type that will be written / read until the limit is reached or data is empty.  | Array                          |                                                  |
| 7.1..N   | multiop_changer_digest | The coder for the digest representation of a MultiOperation.Changer<br />A type that itself is made up of multiple other types.                          | CompositeType                  |                                                  |
| 7.1.1    | account                | The account of the operation.<br />An account number<br />4byte 32bit int value                                                                          | AccountNumber (Int32)          | unsigned: true<br />endian: LE<br />             |
| 7.1.2    | nOperation             | The next n_operation of the account.<br />Accounts n_operation value.<br />4byte 32bit int value                                                         | NOperation (Int32)             | unsigned: true<br />endian: LE<br />             |
| 7.1.3    | changeType             | The change type.<br />1byte 8bit int value                                                                                                               | Int8                           | unsigned: undefined<br />                        |
| 7.1.4    | newPublicKey           | The new public key of the account.<br />A type that itself is made up of multiple other types.                                                           | CompositeType                  |                                                  |
| 7.1.4.1  | curve                  | Key curve id<br />2byte 16bit int value                                                                                                                  | Bytes                          | unsigned: true<br />endian: LE<br />             |
| 7.1.4.2  | x_length               | Length of X value<br />2byte 16bit int value                                                                                                             | Int16                          | unsigned: true<br />endian: LE<br />             |
| 7.1.4.3  | x                      | The X value of the public key.<br />Bytes with variable size prepended                                                                                   | Bytes                          |                                                  |
| 7.1.4.4  | y_length               | Length of Y value<br />2byte 16bit int value                                                                                                             | Int16                          | unsigned: true<br />endian: LE<br />             |
| 7.1.4.5  | y                      | The X value of the public key.<br />Bytes with variable size prepended                                                                                   | Bytes                          |                                                  |
| 7.1.5    | newName                | The new name of the account.<br />An account name<br />String with size prepended                                                                        | AccountName (StringWithLength) |                                                  |
| 7.1.6    | newType                | The new type of the account.<br />2byte 16bit int value                                                                                                  | Int16                          | unsigned: undefined<br />endian: undefined<br /> |
| 8        | optype                 | The optype as 8bit int.<br />Operation type in 8 bits                                                                                                    | OpType (Int8)                  | unsigned: true<br />endian: LE<br />             |
## Signing -> Data signing (raw)

The coder for the raw representation of a Data operation
A type that itself is made up of multiple other types.

| Position | Field          | Description                                                                                      | Name                  |                                      |
| -------- | -------------- | ------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------ |
| 1        | signer         | The account that executes the operation.<br />An account number<br />4byte 32bit int value       | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | sender         | The account that sends the operation.<br />An account number<br />4byte 32bit int value          | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 3        | target         | The account that will receive the operation.<br />An account number<br />4byte 32bit int value   | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 4        | nOperation     | The next n_operation of the signer.<br />Accounts n_operation value.<br />4byte 32bit int value  | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 5        | dataType       | The data type of the operation.<br />2byte 16bit int value                                       | Int16                 | unsigned: true<br />endian: LE<br /> |
| 6        | dataSequence   | The data sequence of the operation.<br />2byte 16bit int value                                   | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7        | amount         | The amount associated the operation.<br />A type for currency values.<br />8byte 64bit int value | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 8        | fee            | The fee associated the operation.<br />A type for currency values.<br />8byte 64bit int value    | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 9        | payload_length | The length of the payload<br />2byte 16bit int value                                             | Int16                 | unsigned: true<br />endian: LE<br /> |
| 10       | payload        | The payload of the operation.<br />Bytes with variable size prepended                            | Bytes                 |                                      |
| 11       | r_length       | Length of r.<br />2byte 16bit int value                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 12       | r              | R value of the sign operation.<br />Bytes with variable size prepended                           | Bytes                 |                                      |
| 13       | s_length       | Length of s.<br />2byte 16bit int value                                                          | Int16                 | unsigned: true<br />endian: LE<br /> |
| 14       | s              | S value of the sign operation.<br />Bytes with variable size prepended                           | Bytes                 |                                      |
## Signing -> Data signing (digest)

Digest encoder for a DATA operation.
A type that itself is made up of multiple other types.

| Position | Field          | Description                                                                                           | Name                  |                                      |
| -------- | -------------- | ----------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1        | signer         | The account that executes the operation.<br />An account number<br />4byte 32bit int value            | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 2        | sender         | The account that sends the operation.<br />An account number<br />4byte 32bit int value               | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 3        | target         | The account that will receive the operation.<br />An account number<br />4byte 32bit int value        | AccountNumber (Int32) | unsigned: true<br />endian: LE<br /> |
| 4        | nOperation     | The next n_operation of the signer.<br />Accounts n_operation value.<br />4byte 32bit int value       | NOperation (Int32)    | unsigned: true<br />endian: LE<br /> |
| 5        | dataType       | The data type of the operation.<br />2byte 16bit int value                                            | Int16                 | unsigned: true<br />endian: LE<br /> |
| 6        | dataSequence   | The data sequence of the operation.<br />2byte 16bit int value                                        | Int16                 | unsigned: true<br />endian: LE<br /> |
| 7        | amount         | The amount associated with the operation.<br />A type for currency values.<br />8byte 64bit int value | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 8        | fee            | The fee associated with the operation<br />A type for currency values.<br />8byte 64bit int value     | Currency (Int64)      | unsigned: true<br />endian: LE<br /> |
| 9        | payload_length | The length of the payload<br />2byte 16bit int value                                                  | Int16                 | unsigned: true<br />endian: LE<br /> |
| 10       | payload        | The payload of the operation.<br />Bytes with variable size prepended                                 | Bytes                 |                                      |
| 11       | optype         | The optype as 8bit int.<br />Operation type in 8 bits                                                 | OpType (Int8)         | unsigned: true<br />endian: LE<br /> |
## Collection -> Rawoperations

Coder to combine multiple operations.
A type that itself is made up of multiple other types.

| Position | Field      | Description                                                                                                                                                                                                                                                                                                                                                                       | Name           |                                      |
| -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------ |
| 1        | count      | The number of operations this message holds.<br />4byte 32bit int value                                                                                                                                                                                                                                                                                                           | Int32          | unsigned: true<br />endian: LE<br /> |
| 2        | operations | A type that itself has one repeating type that will be written / read until the limit is reached or data is empty.                                                                                                                                                                                                                                                                | Array          |                                      |
| 2.1..N   | operation  | The number of operations this message holds.<br />A type that itself is made up of multiple other types.                                                                                                                                                                                                                                                                          | CompositeType  |                                      |
| 2.1.1    | optype     | The operation type.<br />Operation type in 32 bits                                                                                                                                                                                                                                                                                                                                | OpType (Int32) | unsigned: true<br />endian: LE<br /> |
| 2.1.2    | operation  | Possible subtypes: Transaction op (raw), ChangeKey op (raw), ListAccountForSale op (raw), DeList op (raw), BuyAccount op (raw), ChangeKeySigned op (raw), ChangeAccountInfo op (raw), MultiOperation op (raw), Data op (raw)<br />A type that itself has many sub types but only some are triggere based on a marker.<br />A type that itself is made up of multiple other types. | CompositeType  |                                      |
