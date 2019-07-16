#! /usr/bin/env node

const { spawn } = require("child_process");
const readline = require('readline');
var request;
const valid_params = ["script"];

// Read JSON input from stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stderr
});

rl.on('line', (input) => {
  request = JSON.parse(input);
  process.stderr.write(input);
  run();
});

function run() {

  // Check and parse params
  var params = request["params"];
  
  for (param in params) {
    if (!valid_params.includes(param)) {
      console.error("Invalid parameter " + param + ", bailing out.");
      process.exit(-1);
    }
  }

  // Run newman
  const newman = spawn("newman", ["run", "./test/test.json"], { cwd: "/opt/resource" });

  newman.stdout.on('data', (data) => {
      process.stderr.write(data);
  });

  newman.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  // Create response
  let response = {
      "version": { "ref": "61cebf" },
      "metadata": [
        { "name": "commit", "value": "61cebf" },
        { "name": "author", "value": "Hulk Hogan" }
      ]
  };

  // Log response
  newman.on('exit', (data) => {
    console.log(JSON.stringify(response));
  });

}