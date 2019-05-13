const Coding = require('@pascalcoin-sbx/common').Coding;

const numbers = {

}



for(let i = 0; i < 257; i++) {
  new Coding.Core.Int8().encodeToBytes(i).toHex();
}
