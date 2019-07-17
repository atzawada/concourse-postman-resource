#! /usr/bin/env node

const { spawn } = require("child_process");
const readline = require('readline');
var request;
const valid_params = [ "script", "scripts", "folder", "env", "data", "globals", "iterations",
                       "bail", "silent", "no_color", "insecure", "suppress_exit_code", "ignore_redirects" ];

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

  if (!params.includes(valid_params[0]) &&  // script
      !params.includes(valid_params[1]) &&  // scripts
      !params.includes(valid_params[2])) {  // folder
    console.error("Missing required parameter, bailing out.");
    process.exit(-2);
  }

  var newman_params = [];

  // env
  if (params.includes(valid_params[3])) {
    newman_params.push("-e");
    newman_params.push(params[valid_params[3]]);
  }

  // data
  if (params.includes(valid_params[4])) {
    newman_params.push("-d");
    newman_params.push(params[valid_params[4]]);
  }

  // globals
  if (params.includes(valid_params[5])) {
    newman_params.push("-g");
    newman_params.push(params[valid_params[5]]);
  }

  // iterations
  if (params.includes(valid_params[6])) {
    newman_params.push("-n");
    newman_params.push(params[valid_params[6]]);
  }

  // bail
  if (params.includes(valid_params[7])) {
    newman_params.push("--bail");
    newman_params.push(params[valid_params[7]]);
  }

  // silent
  if (params.includes(valid_params[8])) {
    newman_params.push("--silent");
    newman_params.push(params[valid_params[8]]);
  }

  // no_color
  if (params.includes(valid_params[9])) {
    newman_params.push("--no-color");
    newman_params.push(params[valid_params[9]]);
  }

  // insecure
  if (params.includes(valid_params[10])) {
    newman_params.push("-k");
    newman_params.push(params[valid_params[10]]);
  }

  // suppress_exit_code
  if (params.includes(valid_params[11])) {
    newman_params.push("-x");
    newman_params.push(params[valid_params[11]]);
  }

  // ignore_redirects
  if (params.includes(valid_params[12])) {
    newman_params.push("--ignore-redirects");
    newman_params.push(params[valid_params[12]]);
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