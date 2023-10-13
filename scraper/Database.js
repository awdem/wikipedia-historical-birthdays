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
			console.log('Connecting to database')
			await this.db.connect()
			console.log('Connection successful')
		} catch (err) {
			console.log('Error connecting to database', err);
		}
	}

	async createRecords(data, res) {
		for (const day of data) {
			for (const record of day) {
				try {
					const query = "INSERT INTO birthdays (bday, name, wiki_url) VALUES ($1, $2, $3)"
					const result = await this.db.query(query, [record.bday, record.name, record.wikiUrl])
					console.log(`Created record for ${record.name}`)
				} catch (err) {
					console.log(`Record creation failed: `, err)
				}
			};
		};
	}
}	

module.exports = Database;
