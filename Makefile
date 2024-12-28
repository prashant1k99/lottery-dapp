build:
	anchor build
	anchor keys sync
	rm -rf tests/fixtures
	mkdir tests/fixtures/
	cp target/deploy/*.so tests/fixtures/
	find app/ -type f ! -name 'index.ts' -delete
	cp target/types/* app/
	cp target/idl/*.json app/
