var path = require('path');
var fs = require('fs');
var spawn = require('child_process').spawn;
var debug = require('debug')('csv-table');
var util = require('util');
var chalk = require('chalk');
var dataInFileLocation = 'test/case/data-in.csv';
var dataOutFileLocation = path.resolve(__dirname, 'case/data-out.txt');
var dataOut = fs.readFileSync(dataOutFileLocation, 'utf-8').trim();
var csvParser = require('../');

/*function cliTestHandler(test) {
  debug('cli handler');
  var binPath = path.resolve(__dirname, '../bin/csv-table');
  var cliParser = spawn('node', [
    binPath, '-c',
    'case/data-in.csv'
  ], { cwd: __dirname });

  function outDataHandler(data) {
    debug('data handler');
    data = data.toString().trim(); 
    data = chalk.stripColor(data);

    test.equal(data, dataOut, 'should be equal a CSV data table');
  }
  cliParser.stdout.on('data', outDataHandler);

  function errorDataHandler(data) {
    debug('error data handler');
    console.log(data.toString()); 
  }
  cliParser.stderr.on('data', errorDataHandler);

  cliParser.on('close', test.done);
}
exports.cliTest = cliTestHandler;*/

function apiTestHandler(test) {
  debug('api test handler');

  /*function outDataHandler(data) {
    debug('data handler');
    data = data.toString().trim(); 
    data = chalk.stripColor(data);

    test.equal(data, dataOut, 'should be equal a CSV data table');
  }
  process.stdout.on('data', outDataHandler);*/

  function csvParserHandler(table) {
    debug('csv parser handler');
    table.show();
    test.done();
  }
  csvParser(dataInFileLocation, { columns: true }, csvParserHandler);
}
exports.apiTest = apiTestHandler;
