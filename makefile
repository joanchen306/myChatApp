all: run

run:
	DEBUG=myChatApp:* ./bin/www

compile:
	browserify . > public/js/bundle.js -d

watch:
	watchify -o public/js/bundle.js -v -d .