const axios = require('axios');
const parse = require('./parse');
const { load } =  require('cheerio')



class Scraper {

	constructor() {
		this.day = 1
		this.month = 1
	};

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	async scrape(url) {
		let resp = await axios.get(url);
		await this.sleep(1200);
	
		let resp_html = resp.data;
		const $ = load(resp_html);
	
		parse($);
	
		let daysInMonth = $(`#mw-content-text > div.mw-parser-output > div.navbox > table > tbody > tr:nth-child(${this.month + 2}) > td > div > ul`).children('li').length
		this.day += 1;
	
		if (this.day > daysInMonth) {
			this.month += 1;
			this.day = 1
		}
	
		// console.log(this.day);
		// console.log(this.month);
	
		if ( this.month < 13 ) {
			let next_href = $(`#mw-content-text > div.mw-parser-output > div.navbox > table > tbody > tr:nth-child(${this.month + 2}) > td > div > ul > li:nth-child(${this.day}) > a`).attr('href');
			let next_url = 'https://en.wikipedia.org' + next_href
			
			// console.log(next_url)
			this.scrape(next_url)
		} else {
			console.log('scrape complete')
			return
		}
	}
}



module.exports = Scraper;
