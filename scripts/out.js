#! /usr/bin/env node

var stdin = process.stdin;
var stdout = process.stdout;
var params;

const getStdin = require("get-stdin");
const { spawn } = require("child_process");

(async() => {
    params = JSON.parse(await getStdin());
    //console.log(params);
})();

const newman = spawn("newman", ["run", "./test/test.json"], { cwd: "/opt/resource" });

newman.stdout.on('data', (data) => {
    process.stderr.write(data);
});

newman.stderr.on('data', (data) => {
  process.stderr.write(data);
});

let response = {
    "version": { "ref": "61cebf" },
    "metadata": [
      { "name": "commit", "value": "61cebf" },
      { "name": "author", "value": "Hulk Hogan" }
    ]
};

newman.on('exit', (data) => {
  console.log(JSON.stringify(response));
});