var path = require( "path" ),
	fs = require( "fs" ),
	chalk = require( "chalk" ),
	dataOut =
		fs.readFileSync( path.normalize( __dirname + "/data-out.txt" ) )
		.toString()
		.trim();

exports.cli = function( test ) {
	var spawn, binPath, cliParser;

	spawn = require( "child_process" ).spawn;
	binPath = path.normalize( __dirname + "./../bin/csv-table" );
	cliParser = spawn( "node", [ binPath, "-c", "data-in.csv" ], { cwd: __dirname });

	cliParser.stdout.on( "data", function( data ) {
		data = data.toString().trim();
		data = chalk.stripColor( data );

		test.equal( data, dataOut, "parsed CSV data to table" );
		test.done();
	});
};

exports.api = function( test ) {
	var parser = require( __dirname + "/../lib/index.js" );
	var jsonData = require( path.normalize( __dirname + "/data-out.json" ) );

	test.expect( 7 );

	parser( "test/data-in.csv", { columns: true }, function( data, obj ) {
		var i = 0;
		data = chalk.stripColor( data );
		test.equal( data, dataOut, "API returns the printed table" );
		test.deepEqual( obj.options.head, jsonData.options.head );

		while( obj[ i ] ) {
			test.deepEqual( obj[ i ], jsonData[ i ] );
			i++;
		}

		test.done();
	});
};
