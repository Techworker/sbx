const chai = require('chai');
const CSVSerializer = require('@pascalcoin-sbx/data-spec').Serializer.CSV;

chai.expect();
const expect = chai.expect;

describe('Serializer.CSV', () => {
  it('can serialize an object to a CSV string with different delimiters', () => {
    const obj = {a: 'b', c: 'd'};
    const csvComma = new CSVSerializer(',');
    expect(csvComma.serialize(obj)).to.be.equal('"b","d"');
    const csvSemi = new CSVSerializer(';');
    expect(csvSemi.serialize(obj)).to.be.equal('"b";"d"');
  });
  it('can serialize an object to a CSV string with different enclosures', () => {
    const obj = {a: 'b', c: 'd'};
    const csvSingle = new CSVSerializer(',', "'");
    expect(csvSingle.serialize(obj)).to.be.equal("'b','d'");
    const csvDouble= new CSVSerializer(',', '"');
    expect(csvDouble.serialize(obj)).to.be.equal('"b","d"');
  });
  it('can serialize an object to a CSV string with escaped enclosures', () => {
    const obj1 = {a: '"b"', c: 'd'};
    const csv1 = new CSVSerializer();
    expect(csv1.serialize(obj1)).to.be.equal('"\\"b\\"","d"');
    const obj2 = {a: '@b@', c: 'd'};
    const csv2 = new CSVSerializer(',', '@');
    expect(csv2.serialize(obj2)).to.be.equal('@\\@b\\@@,@d@');
  });
  it('can serialize an object to a CSV string with custom escape', () => {
    const obj1 = {a: '"b"', c: 'd'};
    const csv1 = new CSVSerializer(',', '"', 'test');
    expect(csv1.serialize(obj1)).to.be.equal('"test"btest"","d"');
  });

  it('can serialize an object with keys', () => {
    const obj = {a: 'b', c: 'd'};
    const csv = new CSVSerializer();
    expect(csv.serialize(obj, true, ':')).to.be.equal('"a:b","c:d"');
  });
  it('can deserialize an object with keys', () => {
    const csv = new CSVSerializer();
    const res = csv.deserialize('"a:b","c:d"', true, ':');
    expect(res.a).to.be.equal('b');
    expect(res.c).to.be.equal('d');
  });

});
