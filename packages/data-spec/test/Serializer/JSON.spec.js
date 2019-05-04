const chai = require('chai');
const JSONSerializer = require('@pascalcoin-sbx/data-spec').Serializer.JSON;

chai.expect();
const expect = chai.expect;

describe('Serializer.JSON', () => {
  it('can serialize something to a json string', () => {
    const obj = {a: 'b'};
    const s = new JSONSerializer();
    expect(s.serialize(obj)).to.be.equal('{"a":"b"}');
  });

  it('can serialize something to a pretty json string', () => {
    const obj = {a: 'b'};
    const s = new JSONSerializer(true);
    expect(s.serialize(obj)).to.be.equal("{\n  \"a\": \"b\"\n}");
  });

  it('can deserialize a json string', () => {
    expect(JSONSerializer.deserialize('{"a":"b"}').a).to.be.equal('b');
  });
});
