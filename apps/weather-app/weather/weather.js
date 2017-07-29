const DARK_SKY_KEY = '6ae52a2717d6ac4b23cb2e8d13e3d1c6';
const request = require('request');

const getWeather = (lat, lng, callback) => {
	request(
		{
			url: `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat}, ${lng}`,
			json: true
		}, (err, res, body) => {
			if (err) {
				return callback('Unable to connect to forecast service.');
			}
			if (res.statusCode >= 400) {
				return callback('Unable to fetch weather');
			}
			return callback(null, {
				temp: body.currently.temperature,
				appTemp: body.currently.apparentTemperature
			});
		});
}


module.exports = {
	getWeather
};