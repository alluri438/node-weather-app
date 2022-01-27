const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6cd2f8666f367517fa741520236ee28c&query=${latitude},${longitude}`;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('weather app is unavailable',undefined)
        }
        else if (body.error) {
            callback(body.error.info,undefined)
        }
        else {
            callback(undefined,'Weather Feels like in your current location' + ' ' + body.current.feelslike + ' degree')
        }
    })
}

module.exports = forecast;