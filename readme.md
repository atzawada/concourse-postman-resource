# Source configuration

# In
## Params
At least one required:
script - String: JSON file that contains the tests to run.
scripts - String[]: Array of json scripts to run.
folder - String: Folder of json scripts to run.

Optional:
env - String: Postman environment as json file.
data - String: Postman data file.
globals - String: Postman globals file.
iterations - Integer: Number of iterations to run.

bail - Boolean: Stops the runner when a test case fails.
silent - Boolean: Disable terminal output.
no_color - Boolean: Disable colored output.
insecure - Boolean: Disable strict SSL.
suppress_exit_code - Boolean: Continue running tests even after a failure.
ignore_redirects - Boolean: Disable automatic forwarding of 3XX responses.


# Out
This operation is a no-op.
# Check
This operation is a no-op.