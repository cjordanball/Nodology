const request = require('request');

let geocodeAddress = (address) => {
	const encodedAddress = encodeURIComponent(address);

	return new Promise((resolve, reject) => {
		request(
		{
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
			json: true
		}, (err, res, body) => {
			if (err) {
				return reject('Unable to connect to Google servers.');
			}
			if (body.status === 'ZERO_RESULTS') {
				return reject('Unable to find that address.');
			}
				resolve({
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
				});

		})
	});

};

geocodeAddress('00000xxx').then((location) => {
	console.log(JSON.stringify(location, null, 2));
}, (error) => {
	console.log('Err: ', error);
});
