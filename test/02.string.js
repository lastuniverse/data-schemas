const chai = require('chai');
const expect  = chai.expect;
const assert  = chai.assert;
const should  = chai.should;


const DS = require('../index.js');

describe("проверяем работу схемы для string", function() {


  describe("проверяем работу ключа type", function() {
    const schema = new DS( "string", { type: "string"});
    it("на входе схемы параметр типа string", function() {
      assert.equal( schema.validate("aaa"), true);
    });

    it("на входе схемы параметр типа number", function() {
      assert.equal( schema.validate(123), false);
    });

    it("на входе схемы параметр типа boolean", function() {
      assert.equal( schema.validate(true), false);
    });

    it("на входе схемы параметр типа array", function() {
      assert.equal( schema.validate([]), false);
    });

    it("на входе схемы параметр типа object", function() {
      assert.equal( schema.validate({}), false);
    });
  });



  describe("проверяем работу ключа length === 3", function() {
    const schema = new DS( "string", { type: "string", length: 3});
    it("на входе схемы \"aaa\"", function() {
      assert.equal( schema.validate("aaa"), true);
    });

    it("на входе схемы \"aa\"", function() {
      assert.equal( schema.validate("aa"), false);
    });

    it("на входе схемы \"aaaa\"", function() {
      assert.equal( schema.validate("aaaa"), false);
    });
  });



  describe("проверяем работу ключа min === 3", function() {
    const schema = new DS( "string", { type: "string", min: 3});
    it("на входе схемы \"aaa\"", function() {
      assert.equal( schema.validate("aaa"), true);
    });

    it("на входе схемы \"aa\"", function() {
      assert.equal( schema.validate("aa"), false);
    });

    it("на входе схемы \"aaaa\"", function() {
      assert.equal( schema.validate("aaaa"), true);
    });
  });



  describe("проверяем работу ключа max === 3", function() {
    const schema = new DS( "string", { type: "string", max: 3});
    it("на входе схемы \"aaa\"", function() {
      assert.equal( schema.validate("aaa"), true);
    });

    it("на входе схемы \"aa\"", function() {
      assert.equal( schema.validate("aa"), true);
    });

    it("на входе схемы \"aaaa\"", function() {
      assert.equal( schema.validate("aaaa"), false);
    });
  });



  describe("проверяем работу ключа regex === /^\w{3}$/", function() {
    const schema = new DS( "string", { type: "string", regex: /^\w{3}$/});
    it("на входе схемы \"aaa\"", function() {
      assert.equal( schema.validate("aaa"), true);
    });

    it("на входе схемы \"aa\"", function() {
      assert.equal( schema.validate("aa"), false);
    });

    it("на входе схемы \"aaaa\"", function() {
      assert.equal( schema.validate("aaaa"), false);
    });
  });


});