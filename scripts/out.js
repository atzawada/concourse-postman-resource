#! /usr/bin/env node

const { spawn } = require("child_process");
const readline = require('readline');
var request;
const valid_params = [ "script", "scripts", "folder", "env", "data", "globals", "iterations",
                       "bail", "silent", "no_color", "insecure", "suppress_exit_code", "ignore_redirects" ];
const tmp_location = "/tmp/build/put/";
var params = [];
var newman_params = [];

// Read JSON input from stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stderr
});

rl.on('line', (input) => {
  request = JSON.parse(input);
  console.error(input);
  run();
});

function run() {

  // Check and parse params
  params = request["params"];

  /*
  // print process.argv
  process.argv.forEach(function (val, index, array) {
    console.error(index + ': ' + val);
  });

  var path = params["script"];

  path = [ path ];

  const ls = spawn("ls", path);

  ls.stdout.on('data', (data) => {
      process.stderr.write(data);
  });
  */

  for (param in params) {
    if (!valid_params.includes(param)) {
      console.error("Invalid parameter " + param + ", bailing out.");
      process.exit(-1);
    }
  }

  if (!params.hasOwnProperty(valid_params[0]) &&  // script
      !params.hasOwnProperty(valid_params[1]) &&  // scripts
      !params.hasOwnProperty(valid_params[2])) {  // folder
    console.error("Missing required parameter, bailing out.");
    process.exit(-2);
  }

  // env
  if (params.hasOwnProperty(valid_params[3])) {
    newman_params.push("-e");
    newman_params.push(params[valid_params[3]]);
  }

  // data
  if (params.hasOwnProperty(valid_params[4])) {
    newman_params.push("-d");
    newman_params.push(params[valid_params[4]]);
  }

  // globals
  if (params.hasOwnProperty(valid_params[5])) {
    newman_params.push("-g");
    newman_params.push(params[valid_params[5]]);
  }

  // iterations
  if (params.hasOwnProperty(valid_params[6])) {
    newman_params.push("-n");
    newman_params.push(params[valid_params[6]]);
  }

  // bail
  if (params.hasOwnProperty(valid_params[7]) && params[valid_params[7]]) {
    newman_params.push("--bail");
  }

  // silent
  if (params.hasOwnProperty(valid_params[8]) && params[valid_params[8]]) {
    newman_params.push("--silent");
  }

  // no_color
  if (params.hasOwnProperty(valid_params[9]) && params[valid_params[9]]) {
    newman_params.push("--no-color");
  }

  // insecure
  if (params.hasOwnProperty(valid_params[10]) && params[valid_params[10]]) {
    newman_params.push("-k");
  }

  // suppress_exit_code
  if (params.hasOwnProperty(valid_params[11]) && params[valid_params[11]]) {
    newman_params.push("-x");
  }

  // ignore_redirects
  if (params.hasOwnProperty(valid_params[12]) && params[valid_params[12]]) {
    newman_params.push("--ignore-redirects");
  }

  console.error(newman_params);
  var run_params = ["run"];

  if (params["script"]) {
    var script_location = tmp_location + params["script"];

    run_params.push(script_location);
    run_params.push(newman_params);

    const newman = spawn("newman", run_params, { cwd: "/opt/resource" });
    
    newman.stdout.on('data', (data) => {
      process.stderr.write(data);
    });

    newman.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  
    newman.on('exit', (data) => {
      continue_to_scripts();
    });
  } else {
    continue_to_scripts();
  }
}

function continue_to_scripts() {
  // Run newman
  // const newman = spawn("newman", run_params, { cwd: "/opt/resource" });
  continue_to_folder();
}

function continue_to_folder() {
  var run_params = ["run"];

  if (params["folder"]) {
    run_params.push("--folder");
    run_params.push(tmp_location + params["folder"]);
    run_params.push(newman_params);
    
    const newman = spawn("newman", run_params, { cwd: "/opt/resource" });
    
    newman.stdout.on('data', (data) => {
      process.stderr.write(data);
    });

    newman.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  
    newman.on('exit', (data) => {
      produce_response();
    });
  } else {
      produce_response();
  }
}

function produce_response() {
  // Create response
  let response = {
    "version": { "ref": "Success" },
    "metadata": [
      { "name": "success", "value": "4" },
      { "name": "failure", "value": "1" },
      { "name": "error", "value": "2" }
    ]
  };

  console.log(JSON.stringify(response));
}
