run-simple-form:
	exampleFolder=simple-form node ./node_modules/webpack-dev-server/bin/webpack-dev-server --port 3000 --host 0.0.0.0 --config webpack.config.dev.js --hot --progress --inline

run-form-with-custom-input:
	exampleFolder=form-with-custom-input node ./node_modules/webpack-dev-server/bin/webpack-dev-server --port 3000 --host 0.0.0.0 --config webpack.config.dev.js --hot --progress --inline

#
# Project bundle
bundle-project:
	# IMPORTANT --bail will ensure that the process exits with an error code
	# causing any other command consuming this to fail if there is an error bundling.
	node ./node_modules/webpack/bin/webpack --config webpack.config.prod.js -p --progress --bail

lint:
	./node_modules/.bin/eslint ./app
