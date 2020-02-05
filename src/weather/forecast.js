const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/30fec7fa06a0cf3fd5d495c2758e3e84/'+lat+','+long

    request({url, json: true}, (error, body) => {
        var obj = {}
        if(error) {
            obj.error = res.send(error)
        } else {
            obj.data = body
        }
        callback(undefined, obj)
    })

}

module.exports = forecast