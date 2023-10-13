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
		// TODO
	}
}



module.exports = Database;