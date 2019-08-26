const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname,'..','/public')
//Expect views drictory, change it for templates
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sami Louali'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Sami Louali'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Sami Louali',
        message: 'Our company is dedicated to help you achieve your goals.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provid an adress'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({ error: error}) 
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData.summary,
                temperature: forecastData.temperature,
                temperatureLow: forecastData.temperatureLow,
                temperatureMax: forecastData.temperatureMax,
                precipProbability: forecastData.precipProbability,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provid a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404 Help article not found',
        name: 'Sami Louali',
        message: 'Help article not found.'
    })
})

app.get('/*', (req, res) => {
    res.render('404',{
        title: '404 Page not found',
        name: 'Sami Louali',
        message: 'We couldn\'t find your page. Please conatct the administrator of the site.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port + '.')
})

