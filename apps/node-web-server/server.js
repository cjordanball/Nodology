const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const PORT = process.env.PORT || 3142;

let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');


app.use((req, res, next) => {
	let now = new Date().toString();
	let log = (`${now}: ${req.method}: ${req.path}\n`);
	fs.appendFile('./logFile', log, (err) => {
		if(err) {
			console.log('Unable to append to log file.');
		}
		next();
	});
});

app.use((req, res) => {
	res.render('maintenance.hbs');
});

app.get('/', (req, res, next) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: "This is the end . . ."
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'Unable to handle request.'
	});
});

app.use(express.static(`${__dirname}/public`));

app.listen(PORT, (err) => {
	if (err) {
		console.log('Oh, No!');
	}
	console.log(`Up and running on port ${PORT}!`);
});