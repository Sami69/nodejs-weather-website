const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=26a25ba73ffc39fd75b72db6451c2d4b&query=' +
		encodeURIComponent(latitude) +
		',' +
		encodeURIComponent(longitude) +
		'&units=m';
	//console.log('url: ' + url);

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location!', undefined);
		} else {
			const data = body;
			const meteo = body.current;
			const description = meteo.weather_descriptions[0];
			const temperature = meteo.temperature;
			const precip = meteo.precip;
			const feelslike = meteo.feelslike;

			//console.log(body.daily.data[0])

			callback(undefined, {
				description,
				temperature,
				feelslike,
				precip
			});
		}
	});
};

module.exports = forecast;
