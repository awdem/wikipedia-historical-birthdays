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
		expect(parser.parse($)[7].name).toEqual('Hans von Dohnányi')
	})

	it('returns an array of record objects with the wiki url for each bday haver', () => {
		expect(parser.parse($)[0].wikiUrl).toEqual('https://en.wikipedia.org/wiki/Ali_al-Ridha')
		expect(parser.parse($)[7].wikiUrl).toEqual('https://en.wikipedia.org/wiki/Hans_von_Dohn%C3%A1nyi')
	})

	it('returns an array of record objects with the bday date for each bday haver', () => {
		expect(parser.parse($)[0].bday).toEqual('0766-01-01')
		expect(parser.parse($)[7].bday).toEqual('1902-01-01')
	})

	it('correctly checks if a bday date is CE or BCE', () => {
		expect(parser.parse($)[0].BCE).toEqual(false)
		expect(parser.parse($)[1].BCE).toEqual(true)
	})

})
