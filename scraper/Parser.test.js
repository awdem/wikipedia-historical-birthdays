const { load } = require('cheerio');
const Parser = require('./Parser');
const fs = require('fs');
const exp = require('constants');

const html = fs.readFileSync('./test.html', 'utf8');
const $ = load(html);

describe('Parser', () => {
	let parser;

	beforeEach(() => {
		parser = new Parser;
	})

	it('returns an array of record objects with the names of the bday havers', () => {
		expect(parser.parse($)[0].name).toEqual('Ali al-Ridha')
		expect(parser.parse($)[4].name).toEqual('Hans von Dohnányi')
	})

	it('returns an array of record objects with the wiki url for each bday haver', () => {
		expect(parser.parse($)[0].wikiUrl).toEqual('https://en.wikipedia.org/wiki/Ali_al-Ridha')
		expect(parser.parse($)[4].wikiUrl).toEqual('https://en.wikipedia.org/wiki/Hans_von_Dohn%C3%A1nyi')
	})

	it('returns an array of record objects with the bday date for each bday haver', () => {
		expect(parser.parse($)[0].bday).toEqual('01/01/766')
		expect(parser.parse($)[4].bday).toEqual('01/01/1902')
	})

})
