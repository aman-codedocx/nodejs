module.exports = function(app){
    const geocode = require('./geocode')
    const forecast = require('./forecast')

    app.get('', (req, res) => {
        res.render('home', {
            home_active: 'current-menu-item'
        })
    })

    app.get('/news', (req, res) => {
        res.render('news', {
            news_active: 'current-menu-item'
        })
    })

    app.get('/live-cameras', (req, res) => {
        res.render('live-cameras', {
            live_active: 'current-menu-item'
        })
    })

    app.get('/photos', (req, res) => {
        res.render('photos', {
            photo_active: 'current-menu-item'
        })
    })

    app.get('/contact', (req, res) => {
        res.render('contact', {
            contact_active: 'current-menu-item'
        })
    })

    app.get('/weather',(req,res) => {
  
        if(!req.query.city) {
            return res.send('Please enter a city name')
        }

        geocode(req.query.city, (error, result) => {
            if(error) {
                return res.send(error)
            } else if(result.error) {
                return res.send(result)
            } else {                
                forecast(result.result[0], result.result[1], (forecast_error, weather) => {
                    if(forecast_error) {
                        return res.send(forecast_error)
                    } else {
                        res.send({weather})
                    }
                })
            }
        })

    })

}