const chai = require('chai');
const expect  = chai.expect;
const assert  = chai.assert;
const should  = chai.should;


const DS = require('../index.js');

describe("проверяем работу схемы для string", function() {


  describe("проверяем работу ключа type", function() {
    it("на входе схемы параметр типа string", function() {
      assert.equal( DS.schema( "string", { type: "string"})("aaa"), true);
    });

    it("на входе схемы параметр типа number", function() {
      assert.equal( DS.schema( "string", { type: "string"})(123), false);
    });

    it("на входе схемы параметр типа boolean", function() {
      assert.equal( DS.schema( "string", { type: "string"})(true), false);
    });

    it("на входе схемы параметр типа array", function() {
      assert.equal( DS.schema( "string", { type: "string"})([]), false);
    });

    it("на входе схемы параметр типа object", function() {
      assert.equal( DS.schema( "string", { type: "string"})({}), false);
    });
  });



  describe("проверяем работу ключа length === 3", function() {
    it("на входе схемы \"aaa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", length: 3})("aaa"), true);
    });

    it("на входе схемы \"aa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", length: 3})("aa"), false);
    });

    it("на входе схемы \"aaaa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", length: 3})("aaaa"), false);
    });
  });



  describe("проверяем работу ключа min === 3", function() {
    it("на входе схемы \"aaa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", min: 3})("aaa"), true);
    });

    it("на входе схемы \"aa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", min: 3})("aa"), false);
    });

    it("на входе схемы \"aaaa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", min: 3})("aaaa"), true);
    });
  });



  describe("проверяем работу ключа max === 3", function() {
    it("на входе схемы \"aaa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", max: 3})("aaa"), true);
    });

    it("на входе схемы \"aa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", max: 3})("aa"), true);
    });

    it("на входе схемы \"aaaa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", max: 3})("aaaa"), false);
    });
  });



  describe("проверяем работу ключа regex === /^\w{3}$/", function() {
    it("на входе схемы \"aaa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", regex: /^\w{3}$/})("aaa"), true);
    });

    it("на входе схемы \"aa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", regex: /^\w{3}$/})("aa"), false);
    });

    it("на входе схемы \"aaaa\"", function() {
      assert.equal( DS.schema( "string", { type: "string", regex: /^\w{3}$/})("aaaa"), false);
    });
  });


});