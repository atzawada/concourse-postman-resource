#! /usr/bin/env node

var stdin = process.stdin;
var stdout = process.stdout;
var params;

const getStdin = require("get-stdin");

(async() => {
    params = JSON.parse(await getStdin());
    //console.log(params);
})();

params["script"];

let response = {
    "version": { "ref": "61cebf" },
    "metadata": [
      { "name": "commit", "value": "61cebf" },
      { "name": "author", "value": "Hulk Hogan" }
    ]
  };

console.log(JSON.stringify(response));