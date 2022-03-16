const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and view location
app.set('view engine', 'hbs') 
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Allen'
    })
})

app.get('/help/', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: "Some help text",
        name: "Allen"
    })
})

app.get('/about/', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Allen'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                address: req.query.address
            })
          })
        })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "404",
        name: 'Allen',
        message: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: "404",
        name: 'Allen',
        message: "Page not found"
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})