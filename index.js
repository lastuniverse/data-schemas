"use strict"

const converters = {
	string: {
		string: (d)=>{ return d },
		number: (d)=>{ return ""+d },
		boolean: (d)=>{ return ""+d },
		array: (d)=>{ return JSON.stringify(d) },
		object: (d)=>{ return JSON.stringify(d) }
	},
	number: {
		string: (d)=>{ return parseFloat(d) },
		number: (d)=>{ return d },
		boolean: (d)=>{ return d?1:0 },
		array: (d)=>{ return d.length },
		object: (d)=>{ return Object.keys(d).length }
	},
	boolean: {
		string: (d)=>{ return !!d },
		number: (d)=>{ return !!d },
		boolean: (d)=>{ return d },
		array: (d)=>{ return !!d.length },
		object: (d)=>{ return !!Object.keys(d).length }
	},
	array: {
		string: (d)=>{ return [d] },
		number: (d)=>{ return [d] },
		boolean: (d)=>{ return [d] },
		array: (d)=>{ return d },
		object: (d)=>{ return [d] }
	},
	object: {
		string: (d)=>{ return {key: d} },
		number: (d)=>{ return {key: d} },
		boolean: (d)=>{ return {key: d} },
		array: (d)=>{ return {key: d} },
		object: (d)=>{ return d }
	}
};

const validators = {
	string: {
		type: (d, s)=>{ return typeof d === "string" },
		length: (d, l)=>{ return d.length === l },
		min: (d, m)=>{ return d.length >= m },
		max: (d, m)=>{ return d.length <= m },
		regex: _validateRegex
	},
	number: {
		type: (d, s)=>{ return typeof d === "number" },
		min: (d, m)=>{ return d >= m },
		max: (d, m)=>{ return d <= m },
		integer: (d, m)=>{ return !(d%1) },
		float: (d, m)=>{ return !!(d%1) }
	},	
	boolean: {
		type: (d, s)=>{ return typeof d === "boolean" }
	},	
	array: {
		type: (d, s)=>{ return typeof d === "object" && Array.isArray(d) },
		length: (d, l)=>{ return d.length === l },
		min: (d, m)=>{ return d.length >= m },
		max: (d, m)=>{ return d.length <= m },
		items:  _validateItems
	},	
	object: {
		type: (d, s)=>{ return typeof d === "object" && !Array.isArray(d) },
		instance: (d, s)=>{ return d instanceof s },
		length: (d, l)=>{ return Object.keys(d).length === l },
		min: (d, m)=>{ return Object.keys(d).length >= m },
		max: (d, m)=>{ return Object.keys(d).length <= m },
		keys:  (d, s)=>{ return true }
	}
};


const registerSchemas = {};
module.exports.schema = function ( name,	schema ) {
	if(typeof name !== "string")
		return false;
	if(typeof schema !== "object" || Array.isArray(schema) )
		return false;
	registerSchemas[name] = schema;	
	return function(data){
		//console.log("schema 01");
		return validate(data, schema);
	}
}

module.exports.validate = validate;
function validate(data, schema) {
	if( !data )
		return false;

	if( !schema || typeof schema !== "object" )
		return false;

	if( !schema.type )
		return false;

	const tests = validators[schema.type];
	if( !tests )
		return false;

	const type = typeof data;
	if( schema.converter === true ){
		data = converters[schema.type][type](data);
	}else if ( typeof schema.converter === "function" ){
		data = schema.converter(data);
	}

	return Object.keys(tests).every(key=>{
		if(!schema[key])
			return true;
		return tests[key](data, schema[key]);
	});

}

function _validateRegex( data, re ) {
	if( Array.isArray(re) )
		return re.some( item=>{ return _validateRegex(data, item) } );
	if( re instanceof RegExp )
		return data.search(re)+1;
	return false;
}

function _validateItems( data, schemas ) {
	if( Array.isArray(schemas) )
		return data.every(item=>{
			return schemas.some(schema=>{
				return validate(item, schema);
			});
		});
	if( typeof schemas === "object" )
		return data.every(item=>{
			return validate(item, schemas);
		});
	return false;
}


