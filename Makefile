.PHONY: install test

install:
	npm install

lint:
	sh scripts/lint

test: lint
	./node_modules/mocha/bin/mocha -R spec test/unit.js
	./node_modules/mocha/bin/mocha -R spec test/integration.js
