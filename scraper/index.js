const Scraper = require('./Scraper');
const Database = require('./Database');

start_url = 'https://en.wikipedia.org/wiki/January_1';

db = new Database
db.connect();

// scraper = new Scraper
// scraper.scrape(start_url)