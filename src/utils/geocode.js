const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGFtaWVuMTk3MCIsImEiOiJjanl1eW14ZmIwajJmM2Ntcmp4cWs5ZTVmIn0.RZkHu4ba2yMRzSHFjgH9Gw';
    request({url: url, json: true}, (error, { body }) => {
        if (error) { 
            callback('Impossible d\'atteindre les services de locaslisations!', undefined);
        } else if (body.features.length === 0) {
            callback('Impossible de se conncter a la localisation. Veuillez essayer une autre localisation!', undefined);
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;

            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }

    });    
};

module.exports = geocode;