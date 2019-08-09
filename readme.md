# Concourse Postman Resource

## Source configuration

# In
This operation is a no-op.

# Out
## Params
### Required
* `script` - String: JSON file that contains the tests to run.

### Newman Options:
* `folder` - String: Specify a single folder to run from a collection.
* `env` - String: Postman environment as json file.
* `data` - String: Postman data file.
* `globals` - String: Postman globals file.
* `iterations` - Integer: Number of iterations to run.
* `bail` - Boolean: Stops the runner when a test case fails.
* `silent` - Boolean: Disable terminal output.
* `insecure` - Boolean: Disable strict SSL.
* `suppress_exit_code` - Boolean: Continue running tests even after a failure.
* `ignore_redirects` - Boolean: Disable automatic forwarding of 3XX responses.

### Concourse Options
* `fail_job_on_test_failure` - boolean: Fails concourse job if Newman reports a failing test.
* `dump_json_file_location` - String: If set will copy the json results file into the specified directory.
* `dump_html_file_location` - String: If set will create and copy the results file into the specified directory.

# Check
This operation is a no-op.