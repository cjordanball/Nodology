const request = require('request');

const geocodeAddress = (address, callback) => {
	const encodedAddress = encodeURIComponent(address);

	request(
		{
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
			json: true
		}, (err, res, body) => {
			if (err) {
				return callback('Unable to connect to Google servers.');
			}
			if (body.status === 'ZERO_RESULTS') {
				return callback('Unable to find that address.');
			}
			return callback(null, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		})
};

module.exports = {
	geocodeAddress
};