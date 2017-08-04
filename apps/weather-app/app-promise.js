const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

const DARK_SKY_KEY = '6ae52a2717d6ac4b23cb2e8d13e3d1c6';

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

	const encodedAddress = encodeURIComponent(argv.address);
	const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

	axios.get(geocodeURL).then((response) => {
		if (response.data.status === 'ZERO_RESULTS') {
			throw new Error('Unable to find that address');
		}
		let lat = response.data.results[0].geometry.location.lat;
		let lng = response.data.results[0].geometry.location.lng;
		const weatherURL = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat}, ${lng}`;
		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherURL);
	})
		.then()

		.catch((err) => {
		if (err.code === 'ENOTFOUND') {
			console.log('Unable to connect to API servers.');
		} else {
			console.log(err.message);
		}

	});