const scrape = require('./scrape')
const saveToDatabase = require('./saveToDatabase')

start_url = 'https://en.wikipedia.org/wiki/January_1';
data = [];

(async () => {
	await scrape(start_url);
	saveToDatabase(data);
})();
