const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define path variables for express setup
const publicDirPath = path.join(__dirname, '../public');
const viewPaths = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')
// setup handlebar engine and views location
app.set('views', viewPaths);
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)
// static directory to serve static files
app.use(express.static(path.join(publicDirPath)))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Praveen Alluri'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Praveen Alluri'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'helpful text page',
        name: 'Praveen Alluri',
        title: 'help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            "error": "please provide the address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastResponse) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastResponse,
                name: 'Praveen Alluri',
        title: 'help'

            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Praveen Alluri',
        message: 'NO HELP PAGE FOUND!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Praveen Alluri',
        message: 'NO PAGE FOUND!'
    })
})
app.listen(port, () => {
    console.log('server started on port ' + port)
})