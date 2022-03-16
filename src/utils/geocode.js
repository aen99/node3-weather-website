const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnVnb25neXVhbGxlbiIsImEiOiJja3k2aWdmY2kwdjNzMndxZWkxNmo1Y3lqIn0.lGazZe4p0IzUAfDqXzGLPg'
    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to connect to location services', undefined)
        }
        else {
            const lag = body.features[0].center[1]
            const long = body.features[0].center[0]
            callback(undefined, {latitude: lag, longitude: long})
        }
    })
}
module.exports = geocode