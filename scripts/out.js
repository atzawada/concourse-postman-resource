#! /usr/bin/env node

var stdin = process.stdin;
var stdout = process.stdout;
var params;

const getStdin = require("get-stdin");
const spawn = require("child_process");

(async() => {
    params = JSON.parse(await getStdin());
    //console.log(params);
})();

process.stderr.write("hello");

const newman = spawn("newman", ["run", "../test/test_data_file.json"]);

newman.stdout.on('data', (data) => {
    process.stderr.write(`stdout: ${data}`);
});

let response = {
    "version": { "ref": "61cebf" },
    "metadata": [
      { "name": "commit", "value": "61cebf" },
      { "name": "author", "value": "Hulk Hogan" }
    ]
  };

console.log(JSON.stringify(response));