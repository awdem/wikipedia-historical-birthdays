const { load } = require('cheerio');
const Parser = require('./Parser');
const fs = require('fs');

const html = fs.readFileSync('./test.html', 'utf8');
const $ = load(html);




describe('Parser', () => {
	xit('parses the test_html', () => {
		parser = new Parser;
		expect(parser.parse($)).toEqual(219);
	})

	
})