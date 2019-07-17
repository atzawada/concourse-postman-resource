#! /usr/bin/env node

let response = {
  "version": { "ref": "Success" },
  "metadata": [
    { "name": "success", "value": "4" },
    { "name": "failure", "value": "1" },
    { "name": "error", "value": "2" }
  ]
};

console.log(JSON.stringify(response));