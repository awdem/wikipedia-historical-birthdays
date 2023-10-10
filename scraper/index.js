const Scraper = require('./Scraper')
const saveToDatabase = require('./saveToDatabase')

start_url = 'https://en.wikipedia.org/wiki/January_1';
data = [];

scraper = new Scraper

scraper.scrape(start_url)