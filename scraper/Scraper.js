const axios = require('axios');
const Parser = require('./Parser');
const Database = require('./Database')
const { load } =  require('cheerio')

class Scraper {

	constructor() {
		this.parser = new Parser;
		this.db = new Database();
		this.day = 26
		this.month = 8
	};

	delayRate(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	async scrape(url) {
		console.log("Now scraping: " + url)
		let resp = await axios.get(url);
		await this.delayRate(1200);
	
		let respHTML = resp.data;
		const $ = load(respHTML);
	
		const scrapedData = this.parser.parse($)
		await this.db.saveRecords(scrapedData);
		console.log("Records saved for: " + url);

		let daysInMonth = $(`#mw-content-text > div.mw-parser-output > div.navbox > table > tbody > tr:nth-child(${this.month + 2}) > td > div > ul`).children('li').length
		this.day += 1;
	
		if (this.day > daysInMonth) {
			this.month += 1;
			this.day = 1
		}
	
		if ( this.month < 13 ) {
			let nextHref = $(`#mw-content-text > div.mw-parser-output > div.navbox > table > tbody > tr:nth-child(${this.month + 2}) > td > div > ul > li:nth-child(${this.day}) > a`).attr('href');
			let nextUrl = 'https://en.wikipedia.org' + nextHref
			
			await this.scrape(nextUrl)
		}

		console.log('scrape complete');
	}
}

module.exports = Scraper;
