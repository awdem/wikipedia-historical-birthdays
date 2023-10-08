const axios = require('axios');
const parse = require('parse');
const { load } =  require('cheerio')

scrape = async (url) => {
	let resp = await axios.get(url);
	let resp_html = resp.data;
	
	const $ = load(resp_html);
	parse($);

	try {
		// TODO: find next page element and recur
	} catch {
		console.log('scrape complete');
		return
	}
}


module.exports = scrape;