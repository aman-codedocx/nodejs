const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW1hbm1laHJhIiwiYSI6ImNrMjI0ZTE4NTBpbmQzZ25ydHBkbDJqZmcifQ.76s-7SEm7_-VEASPGa6Ssw'

    request({url, json: true}, (error, response, body) => {
        var obj = {}
        if(error) {
            obj.error = 'Unable to connect location service'
        } else if(body.features == '') {
            obj.error = 'Unable to find location'
        } else {
            obj.result = body.features[0].center
        }
        callback(undefined, obj)
    })

}

module.exports = geocode