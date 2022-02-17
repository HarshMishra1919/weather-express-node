const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1IjoiaGFyc2htaXNocmEiLCJhIjoiY2t6bzNxN3Z6MzU2MDJubzB2NmFsOGs1cCJ9._Tq0V26RrrPc1AjquTY3fQ&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback(
                'unable to find location! Please try another search!',
                undefined
            );
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
