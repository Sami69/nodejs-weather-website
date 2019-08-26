const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/77faf5bb21d2edbf37ce769ae5904620/'+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) +'?units=si&lang=fr';
    console.log('url: '+ url)

    request ({ url, json: true }, (error,{ body }) => {
        if (error) {
            callback('Impossible to de se conncter aux services meteorologique!', undefined);
        } else if (body.error) {
            callback('Localisation introuvable!', undefined);
        } else {
            const data = body;
            const summary = body.daily.summary;
            const temperature = body.currently.temperature;
            const precipProbability = body.daily.data[0].precipProbability;
            const temperatureLow = body.daily.data[0].temperatureLow;
            const temperatureMax = body.daily.data[0].temperatureMax;
            console.log('---data: ' + JSON.stringify(body.daily.data[0]))

            callback(undefined, {
                summary,
                temperature,
                temperatureLow,
                temperatureMax,
                precipProbability
            });
        }    
    });
};


module.exports = forecast;