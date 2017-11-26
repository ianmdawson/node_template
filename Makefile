.PHONY: build install lint test

build:
	./node_modules/typescript/bin/tsc

install:
	npm install

lint:
	sh scripts/lint

lint-ts:
	./node_modules/tslint/bin/tslint --config "tslint.json" --project tsconfig.json

serve: build
	node server.js

test: build lint
	./node_modules/mocha/bin/mocha -R spec test/unit.js
	./node_modules/mocha/bin/mocha -R spec test/integration.js

tsc:
	./node_modules/typescript/bin/tsc