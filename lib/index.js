var fs, parse, parseOptions, path;

fs = require( "fs" );
parse = require( "csv-parse" );
path = require( "path" );

module.exports = function( csvFile, options, callback ) {
	var parser;

	// Setting defaults
	options = options || {};
	options.columns = !!options.columns;
	options.delimiter = options.delimiter || ";";

	parser = parse( options, function( err, data ) {
		var json_tb = require( "json-table" ),
			tbData;

		tbData = new json_tb( data, function() {
			// ...
		});

		if ( typeof callback === "function" ) {
			callback( tbData.table.toString(), tbData.table );
		} else {
			console.log( tbData.table.toString() );
		}
	});

	fs.createReadStream( path.resolve( csvFile ) ).pipe( parser );
};
