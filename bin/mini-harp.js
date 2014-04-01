#!/usr/local/bin/node

var argv = require('minimist')(process.argv.slice(2))
  , miniHarp = require("../index.js")
  , port = argv.port ? argv.port : 4000
  , path = argv['_'][0] ? argv['_'][0] : process.cwd();

console.log('Starting mini-harp on http://localhost:' + port);
miniHarp(path).listen(port);


