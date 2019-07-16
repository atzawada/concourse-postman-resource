#! /usr/bin/env node

const { spawn } = require("child_process");
const readline = require('readline');
var request;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stderr
});

rl.on('line', (input) => {
  request = JSON.parse(input);
  process.stderr.write(request);
});

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