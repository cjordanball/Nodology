const express = require('express');
const hbs = require('hbs');

let app = express();

app.set('view engine', 'hbs');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res, next) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		CurrentYear: new Date().getFullYear(),
		welcomeMessage: "This is the end . . ."
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		CurrentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'Unable to handle request.'
	});
});

app.listen(3142, (err) => {
	if (err) {
		console.log('Oh, No!');
	}
	console.log('Up and running on port 3000!');
});