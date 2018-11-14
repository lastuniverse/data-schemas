const chai = require('chai');
const expect  = chai.expect;
const assert  = chai.assert;
const should  = chai.should;


const DS = require('../index.js');

describe("проверяем метод create", function() {

  it("создаем схему для string", function() {
    const schema = new DS( "string", { type: "string"});
    assert.equal( schema.validate("aaa"), true);
  });

  it("создаем схему для number", function() {
    const schema = new DS( "number", { type: "number"});
    assert.equal( schema.validate(123), true);
  });

  it("создаем схему для boolean", function() {
    const schema = new DS( "boolean", { type: "boolean"} );
    assert.equal( schema.validate(true), true);
  });

  it("создаем схему для array", function() {
    const schema = new DS( "array", { type: "array"} );
    assert.equal( schema.validate([]), true);
  });

  it("создаем схему для object", function() {
    const schema = new DS( "object", { type: "object"} );
    assert.equal( schema.validate({}), true);
  });

});