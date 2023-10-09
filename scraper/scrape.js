const axios = require('axios');
const parse = require('./parse');
const { load } =  require('cheerio')


let month = 1
let day = 1

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

scrape = async (url) => {
	let resp = await axios.get(url);
	await sleep(1000);

	let resp_html = resp.data;
	const $ = load(resp_html);

	parse($);

	let daysInMonth = $(`#mw-content-text > div.mw-parser-output > div.navbox > table > tbody > tr:nth-child(${month + 2}) > td > div > ul`).children('li').length
	day += 1;

	if (day >= daysInMonth) {
		month += 1;
		day = 1
	}

	console.log(day);
	console.log(month);

	if ( month < 13 ) {
		let next_href = $(`#mw-content-text > div.mw-parser-output > div.navbox > table > tbody > tr:nth-child(${month + 2}) > td > div > ul > li:nth-child(${day}) > a`).attr('href');
		let next_url = 'https://en.wikipedia.org' + next_href
		
		console.log(next_url)
		scrape(next_url)
	} else {
		console.log('scrape complete')
		return
	}

}

scrape('https://en.wikipedia.org/wiki/January_1')

module.exports = scrape;