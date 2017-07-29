const request = require('request');
const yargs = require('yargs');

const { getWeather } = require('./weather/weather');
const { geocodeAddress } = require('./geocode/geocode');

const argv = yargs
	.options({
		address: {
			demand:   true,
			alias:    'a',
			describe: 'address for which to fetch the whether',
			string:   true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

	geocodeAddress(argv.address, (error, results) => {
		if(error) {
			return console.log(error);
		}
		getWeather(results.latitude, results.longitude, (err, data) => {
			if (err) {
				return console.log(err);
			}
			console.log(`The temperature is ${data.temp}; it feels like ${data.appTemp}.`);
		});
	});

