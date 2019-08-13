#! /usr/bin/env node

const { spawnSync } = require("child_process");
const readline = require('readline');
const fs = require('fs');
var request;
const valid_params = [ "script", "folder", "env", "data", "globals", "iterations",
                       "bail", "silent", "insecure", "suppress_exit_code", "ignore_redirects",
                       "fail_job_on_test_failure", "dump_json_file_location", "dump_html_file_location" ];
const tmp_location = "/tmp/build/put/";
// const dump_location = "/opt/resource/out";

var params = [];
var newman_params = [];

console.error(process.argv);

// spawnSync("mkdir", [process.argv[0]], {stdio: ["ignore", process.stderr, process.stderr ] });
spawnSync("ls", ["-alrt", process.argv[0]], {stdio: ["ignore", process.stderr, process.stderr ] });

/*
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

  for (param in params) {
    if (!valid_params.includes(param)) {
      console.error("Invalid parameter " + param + ", bailing out.");
      process.exit(-1);
    }
  }

  // script
  if (!params.hasOwnProperty(valid_params[0])) {
    console.error("Missing required parameter, bailing out.");
    process.exit(-2);
  }

  // folder
  if (params.hasOwnProperty(valid_params[1])) {
    newman_params.push("--folder");
    newman_params.push(params[valid_params[1]]);
  }

  // env
  if (params.hasOwnProperty(valid_params[2])) {
    newman_params.push("-e");
    newman_params.push(params[valid_params[2]]);
  }

  // data
  if (params.hasOwnProperty(valid_params[3])) {
    newman_params.push("-d");
    newman_params.push(params[valid_params[3]]);
  }

  // globals
  if (params.hasOwnProperty(valid_params[4])) {
    newman_params.push("-g");
    newman_params.push(params[valid_params[4]]);
  }

  // iterations
  if (params.hasOwnProperty(valid_params[5])) {
    newman_params.push("-n");
    newman_params.push(params[valid_params[5]]);
  }

  // bail
  if (params.hasOwnProperty(valid_params[6]) && params[valid_params[6]]) {
    newman_params.push("--bail");
  }

  // silent
  if (params.hasOwnProperty(valid_params[7]) && params[valid_params[7]]) {
    newman_params.push("--silent");
  }

  // insecure
  if (params.hasOwnProperty(valid_params[8]) && params[valid_params[8]]) {
    newman_params.push("-k");
  }

  // suppress_exit_code
  if (params.hasOwnProperty(valid_params[9]) && params[valid_params[9]]) {
    newman_params.push("-x");
  }

  // ignore_redirects
  if (params.hasOwnProperty(valid_params[10]) && params[valid_params[10]]) {
    newman_params.push("--ignore-redirects");
  }

  console.error(newman_params);
  var run_params = ["run", "--reporters", "cli,json", "--reporter-json-export", "/opt/resource/results.json"];

  if (params["dump_html_file_location"]) {
    run_params[2] = "cli,json,html";
    run_params.push("--reporter-html-export");
    run_params.push("/opt/resource/results.html");
  }

  if (params["script"]) {
    var script_location = tmp_location + params["script"];

    run_params.push(script_location);
    run_params.concat(newman_params);

    console.error(run_params);
    const newman = spawnSync("newman", run_params, {stdio: ["ignore", process.stderr, process.stderr ] });
  }

  // Get results
  var results = fs.readFileSync("/opt/resource/results.json");

  results = JSON.parse(results);
  // console.error(results);

  var run = results["run"];
  var failures = run["failures"];

  if (params["fail_job_on_test_failure"] && failures.length > 0) {
    console.error("Run finished with errors");
    process.exit(-3);
  }

  if (params["dump_json_file_location"]) {
    dump_location = process.argv[0]; //tmp_location + params["dump_json_file_location"];
    spawnSync("cp", ["/opt/resource/results.json", dump_location], {stdio: ["ignore", process.stderr, process.stderr ] });
    console.error("JSON file has been copied to " + dump_location);
  }

  if (params["dump_html_file_location"]) {
    dump_location = process.argv[0]; //tmp_location + params["dump_html_file_location"];
    spawnSync("cp", ["/opt/resource/results.html", dump_location], {stdio: ["ignore", process.stderr, process.stderr ] });
    console.error("HTML file has been copied to " + dump_location);
  }

  spawnSync("ls", ["-alrt", process.argv[0]], {stdio: ["ignore", process.stderr, process.stderr ] });

  // Create response
  var date = new Date();
  var dateStr = date.toDateString() + " " + date.toTimeString();

  let response = {
    "version": { "ref": dateStr },
    "metadata": [
      { "name": "failures", "value": String(failures.length) }
    ]
  };

  console.log(JSON.stringify(response));
}
*/

let response = {
  "version": { "ref": "Complete" },
  "metadata": []
}; 

console.log(JSON.stringify(response));