#! /usr/bin/env node

var stdin = process.stdin;
var stdout = process.stdout;
var params;

const newman = require("newman");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stderr
});

process.stderr.write("hello");

newman.run({
    collection: require('../test/test_data_file.json'),
    reporters: 'cli'
}, function (err) {
	if (err) { throw err; }
});

let response = {
    "version": { "ref": "61cebf" },
    "metadata": [
      { "name": "commit", "value": "61cebf" },
      { "name": "author", "value": "Hulk Hogan" }
    ]
};

console.log(JSON.stringify(response));