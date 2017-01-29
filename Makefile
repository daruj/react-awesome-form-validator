run-simple-form:
	exampleFolder=simple-form node ./node_modules/webpack-dev-server/bin/webpack-dev-server --port 3000 --host 0.0.0.0 --config webpack.config.dev.js --hot --progress --inline

run-form-with-custom-input:
	exampleFolder=form-with-custom-input node ./node_modules/webpack-dev-server/bin/webpack-dev-server --port 3000 --host 0.0.0.0 --config webpack.config.dev.js --hot --progress --inline

run-form-with-reset-and-clear-values:
	exampleFolder=form-with-reset-and-clear-values node ./node_modules/webpack-dev-server/bin/webpack-dev-server --port 3000 --host 0.0.0.0 --config webpack.config.dev.js --hot --progress --inline


#
# Project bundle
bundle-project:
	# IMPORTANT --bail will ensure that the process exits with an error code
	# causing any other command consuming this to fail if there is an error bundling.
	npm run prepublish

lint:
	./node_modules/.bin/eslint ./app
