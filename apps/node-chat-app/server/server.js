const path = require('path');
const http = require('http');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(publicPath));

const server = http.createServer(app);

server.listen(port, (err) => {
	if (err) {
		return console.log('Err: ', err);
	}
	console.log(`Up and running on port ${port}`);

});
