const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
	mongoose.connect(process.env.db_connection, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	});

	mongoose.connection.on('open', () => {
		console.log('DB connection is successful');
	});

	mongoose.connection.on('error', () => {
		console.log('Connection failed');
	});
};
