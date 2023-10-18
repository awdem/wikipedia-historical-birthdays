const Scraper = require('./Scraper');
const Database = require('./Database');


const main = async () => {
	const scraper = new Scraper
	start_url = 'https://en.wikipedia.org/wiki/January_1';
	console.log('beginning scrape...');
	await scraper.scrape(start_url);
};

main()
	.then(() => {
		console.log('All tasks completed successfully.');
		process.exit(0);
	})
	.catch((error) => {
		console.error('An error occurred:', error);
		process.exit(1);
	});

