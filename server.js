const config = require("./config")
const app = require('./app.js');

const db = require("./db/db")
const port = config.port
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

process.on('uncaughtException', err => console.log('uncaught exception', err));
process.on('unhandledRejection', error =>
	console.log('unhandled rejection', error)
);
