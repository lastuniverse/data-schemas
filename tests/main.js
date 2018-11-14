const DS = require('../index.js');

const string = DS.schema( "string", { type: "string", length: 3 });
const string_length = DS.schema( "string_length", { type: "string", length: 3 });
const string_min = DS.schema( "string_min", { type: "string", min: 3 });
const string_max = DS.schema( "string_max", { type: "string", max: 3 });
const string_regex = DS.schema( "string_regex", {	type: "string",	regex: /^\w{3}$/ });

const number = DS.schema( "number", { type: "number" });
const number_min = DS.schema( "number_min", { type: "number", min: 5 });
const number_max = DS.schema( "number_max", { type: "number", max: 5 });
const number_integer = DS.schema( "number_integer", { type: "number", integer: true });
const number_float = DS.schema( "number_float", { type: "number", float: true });

const array = DS.schema( "array", {	type: "array" });
const array_length = DS.schema( "array", {	type: "array", length: 3 });
const array_min = DS.schema( "array", {	type: "array", min: 3 });
const array_max = DS.schema( "array", {	type: "array", max: 3 });

const object = DS.schema( "object", { type: "object" });
const object_length = DS.schema( "object", { type: "object", length: 2 });
const object_min = DS.schema( "object", { type: "object", min: 2 });
const object_max = DS.schema( "object", { type: "object", max: 2 });
const object_instance = DS.schema( "object", { type: "object", instance: RegExp });

const boolean = DS.schema( "boolean", {	type: "boolean" });





const tests = [
	

	// type: number
	{
		info: "typeof \"aaa\" !== \"number\"",
		test: !number("aaa")
	},
	{
		info: "typeof 123 === \"number\"",
		test: number(123)
	},
	{
		info: "typeof [] !== \"number\"",
		test: !number([])
	},
	{
		info: "typeof {} !== \"number\"",
		test: !number({})
	},
	{
		info: "typeof true !== \"number\"",
		test: !number(true)
	},
	// type: number
	// min: 5
	{
		info: "5 >= 5 === true",
		test: number_min(5)
	},	
	{
		info: "6 >= 5 === true",
		test: number_min(6)
	},	
	{
		info: "4 >= 5 === false",
		test: !number_min(4)
	},	
	// type: number
	// max: 5
	{
		info: "5 <= 5 === true",
		test: number_max(5)
	},	
	{
		info: "4 <= 5 === true",
		test: number_max(4)
	},	
	{
		info: "6 <= 5 === false",
		test: !number_max(6)
	},
	// type: number
	// integer: true
	{
		info: "5 is integer",
		test: number_integer(5)
	},	
	{
		info: "5.5 is not integer",
		test: !number_integer(5.5)
	},	
	// type: number
	// float: true
	{
		info: "5.5 is float",
		test: number_float(5.5)
	},	
	{
		info: "5 is not float",
		test: !number_float(5)
	},			
	// type: array
	{
		info: "typeof \"aaa\" !== \"array\"",
		test: !array("aaa")
	},
	{
		info: "typeof 123 !== \"array\"",
		test: !array(123)
	},
	{
		info: "typeof [] === \"array\"",
		test: array([])
	},
	{
		info: "typeof {} !== \"array\"",
		test: !array({})
	},
	{
		info: "typeof true !== \"array\"",
		test: !array(true)
	},	
	// type: array
	// length: 3
	{
		info: "[1,2,3].length === 3",
		test: array_length([1,2,3])
	},
	{
		info: "[1,2].length !== 3",
		test: !array_length([1,2])
	},
	{
		info: "[1,2,3,4].length !== 3",
		test: !array_length([1,2,3,4])
	},
	// type: array
	// min: 3
	{
		info: "[1,2,3].length >= 3 === true",
		test: array_min([1,2,3])
	},
	{
		info: "[1,2,3,4].length >= 3 === true",
		test: array_min([1,2,3,4])
	},
	{
		info: "[1,2].length >= 3 === false",
		test: !array_min([1,2])
	},
	// type: array
	// max: 3
	{
		info: "[1,2,3].length <= 3 === true",
		test: array_max([1,2,3])
	},
	{
		info: "[1,2].length <= 3 === true",
		test: array_max([1,2])
	},
	{
		info: "[1,2,3,4].length <= 3 === false",
		test: !array_max([1,2,3,4])
	},
	// type: object
	{
		info: "typeof \"aaa\" !== \"object\"",
		test: !object("aaa")
	},
	{
		info: "typeof 123 !== \"object\"",
		test: !object(123)
	},
	{
		info: "typeof [] !== \"object\"",
		test: !object([])
	},
	{
		info: "typeof {} === \"object\"",
		test: object({})
	},	
	{
		info: "typeof true !== \"object\"",
		test: !object(true)
	},	
	// type: object
	// length: 2
	{
		info: "Object.keys({a:1,b:2}).length === 2",
		test: object_length({a:1,b:2})
	},
	{
		info: "Object.keys({a:1}).length !== 2",
		test: !object_length({a:1})
	},
	{
		info: "Object.keys({a:1,b:2,c:3}).length !== 2",
		test: !object_length({a:1,b:2,c:3})
	},
	// type: object
	// min: 2
	{
		info: "Object.keys({a:1,b:2}).length >= 2 === true",
		test: object_min({a:1,b:2})
	},
	{
		info: "Object.keys({a:1,b:2,c:3}).length >= 2 === true",
		test: object_min({a:1,b:2,c:3})
	},
	{
		info: "Object.keys({a:1}).length >= 2 === false",
		test: !object_min({a:1})
	},
	// type: object
	// max: 2
	{
		info: "Object.keys({a:1,b:2}).length <= 2 === true",
		test: object_max({a:1,b:2})
	},
	{
		info: "Object.keys({a:1}).length <= 2 === true",
		test: object_max({a:1})
	},
	{
		info: "Object.keys({a:1,b:2,c:3}).length <= 2 === false",
		test: !object_max({a:1,b:2,c:3})
	},
	// type: object
	// instance: RegExp
	{
		info: "Object /./i instanceof RegExp",
		test: object_instance(/./i)
	},
	{
		info: "Object {} not instanceof RegExp",
		test: !object_instance({})
	},
	// type: boolean
	{
		info: "typeof \"aaa\" !== \"boolean\"",
		test: !boolean("aaa")
	},
	{
		info: "typeof 123 !== \"boolean\"",
		test: !boolean(123)
	},
	{
		info: "typeof [] !== \"boolean\"",
		test: !boolean([])
	},
	{
		info: "typeof {} !== \"boolean\"",
		test: !boolean({})
	},
	{
		info: "typeof true === \"boolean\"",
		test: boolean(true)
	}

];

var allTestsOk = 0;
tests.forEach((item,index)=>{
	if(item.test){
		allTestsOk++;
	}
	console.log("TEST", index+".", item.info, "->", item.test?"Ok":"Error" );
});




