const request = require('request');
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWxsdXJpNTM4IiwiYSI6ImNreW9vYm54YzAyMnIzMW83NDZnMm4wMnoifQ.AVWHJI2Yk-y3iVBHEyxfMA&limit=1`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('geo location app is unavailable');
        }
        else if (response.statusCode === 401 || !response.body.features[0]) {
            callback(JSON.stringify(response.body.message), undefined);
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;