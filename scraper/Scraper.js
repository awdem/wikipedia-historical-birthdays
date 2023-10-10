const axios = require('axios');
const Parser = require('./Parser');
const { load } =  require('cheerio')

class Scraper {

	constructor() {
		this.parser = new Parser;
		this.day = 1
		this.month = 1
	};

	delayRate(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	async scrape(url) {
		let resp = await axios.get(url);
		await this.delayRate(1200);
	
		let respHTML = resp.data;
		const $ = load(respHTML);
	
		this.parser.parse($);
	
		let daysInMonth = $(`#mw-content-text > div.mw-parser-output > div.navbox > table > tbody > tr:nth-child(${this.month + 2}) > td > div > ul`).children('li').length
		this.day += 1;
	
		if (this.day > daysInMonth) {
			this.month += 1;
			this.day = 1
		}
	
		// console.log(this.day);
		// console.log(this.month);
	
		if ( this.month < 13 ) {
			let nextHref = $(`#mw-content-text > div.mw-parser-output > div.navbox > table > tbody > tr:nth-child(${this.month + 2}) > td > div > ul > li:nth-child(${this.day}) > a`).attr('href');
			let nextUrl = 'https://en.wikipedia.org' + nextHref
			
			// console.log(nextUrl)
			this.scrape(nextUrl)
		} else {
			console.log('scrape complete')
			return
		}
	}
}

module.exports = Scraper;