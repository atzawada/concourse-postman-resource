#! /usr/bin/env node

var stdin = process.stdin;
var stdout = process.stdout;
var params;

const getStdin = require("get-stdin");

(async() => {
    params = JSON.parse(await getStdin());
    console.log(params);
})();

console.log("{\"version\": {\"id\":\"3\"}}");
