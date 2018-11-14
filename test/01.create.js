const chai = require('chai');
const expect  = chai.expect;
const assert  = chai.assert;
const should  = chai.should;


const DS = require('../index.js');

describe("проверяем метод create", function() {

  it("создаем схему для string", function() {
    assert.equal( DS.schema( "string", { type: "string"})("aaa"), true);
  });

  it("создаем схему для number", function() {
    assert.equal( DS.schema( "number", { type: "number"})(123), true);
  });

  it("создаем схему для boolean", function() {
    assert.equal( DS.schema( "boolean", { type: "boolean"})(true), true);
  });

  it("создаем схему для array", function() {
    assert.equal( DS.schema( "array", { type: "array"})([]), true);
  });

  it("создаем схему для object", function() {
    assert.equal( DS.schema( "object", { type: "object"})({}), true);
  });

});