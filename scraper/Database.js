require('dotenv').config();
const { Pool } = require("pg");

class Database {
	constructor() {
		this.db = new Pool({
			user: '',
			host: "localhost",
			database: "wiki_birthdays_test",
			password: '',
			port: 5432,
		})
	}

	async connect() {
		try {
			await this.db.connect()
		} catch (err) {
			console.log('Error connecting to database', err);
		}
	}

	async saveRecords(scrapedData, res) {
		for (const record of scrapedData) {
			try {
				const query = "INSERT INTO birthdays (bday, name, wiki_url, bce) VALUES ($1, $2, $3, $4)"
				const result = await this.db.query(query, [record.bday, record.name, record.wikiUrl, record.BCE])
			} catch (err) {
				console.log(`Record creation failed: `, err)
			}
		};
	}
}

module.exports = Database;
