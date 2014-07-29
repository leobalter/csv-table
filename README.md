# CSV-Table

[![Build Status](https://travis-ci.org/leobalter/csv-table.svg?branch=master)](https://travis-ci.org/leobalter/csv-table)

## Install

```dash
$ npm install -g csv-table
```

## CLI

```dash
$ csv-table [options] <file ...>
```

### Options

```
-h, --help                  output usage information
-V, --version               output the version number
-d, --delimiter <value>     Sets the delimiter, defaults to ';'
-c, --columns               Use CSV columns headers
-t, --trim                  trim values
-l, --ltrim                 left trim values
-r, --rtrim                 right trim values
-s, --skip                  skip empty lines
-q, --quote <value>         Quote character, defaults to '"'
-m, --comment <value>       Comment character, default is none
-e, --escape <value>        Escape character, default is '"'
-r, --rowDelimiter <value>  Row delimiter character, default is '\n'
```

## API

```js
var csvTable = require( "csv-table" );

csvTable( csv_file [, options] [, callback] );

// Example:
csvTable( "./data.csv", { columns: true }, function( table, obj ) {
	// table is the string representation of the table
	console.log( table );

	// obj is the object representation of the tablified csv
	console.log( obj );
});
```

If no callback is given, it prints the table to the console/stdout.

### Options:

With default values:

```js
{
	delimiter: ';',
	columns: false,
	trim: false,
	ltrim: false,
	rtrim: false,
	skip_empty_values: false,
	quote: '"'
	comment: '',
	escape: '"',
	rowDelimiter: '\n'
}
```

## Contributing:

Check out the [contributing](https://github.com/leobalter/csv-table/blob/master/CONTRIBUTING.md) file
