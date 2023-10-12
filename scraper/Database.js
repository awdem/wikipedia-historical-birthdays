const { Pool } = require("pg");
const { connect_timeout } = require("pg/lib/defaults");

class Database {
	constructor() {
		this.db = new Pool({
			user: "temp",
			host: "localhost",
			database: "temp",
			password: "temp",
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
}



module.exports = Database;