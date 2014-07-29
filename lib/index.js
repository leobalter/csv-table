var fs = require('fs');
var parse = require('csv-parse');
var path = require('path');
var util = require('util');
var jsonTable = require('json-table');
var debug = require('debug')('csv-table');

function csvParserHandler(fileLocation, options, fn) {
  debug('csv parser handler');
  var err = null;
  var fileData = null;

  fileLocation = (path.resolve(process.cwd(), fileLocation)) || '';
  fileData = fs.readFileSync(fileLocation);
  options = options || {};
  options.columns = options.columns || true;
  options.delimiter = options.delimiter || ';';
  fn = fn || function callbackHandler(err) {};

  function jsonTableHandler(table) {
    debug('json table handler');
    fn(err, table); 
  }

  function parseHandler(err, data) {
    debug('parse handler');
    if (err) {
      fn(err, null);
    }
    new jsonTable(data, jsonTableHandler);
  }
  parse(fileData, options, parseHandler);
}
module.exports = exports = csvParserHandler;
