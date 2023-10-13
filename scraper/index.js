const Scraper = require('./Scraper');
const Database = require('./Database');


const main = async () => {
	const db = new Database
	const scraper = new Scraper
	start_url = 'https://en.wikipedia.org/wiki/January_1';
	console.log('Connecting to database');
	await db.connect();
	console.log('Connection successful');
	console.log('beginning scrape...');
	const data = await scraper.scrape(start_url);
	console.log('scrape complete');
	console.log(data)
	console.log('Inserting records into database...')
	await db.createRecords(data);
	console.log('Record creation complete')
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

