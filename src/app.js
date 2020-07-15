import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const patrtialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(patrtialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {title: "Weather app", name: 'Bohdan'})
})

app.get('/about', (req, res) => {
    res.render('about', {title: "About me", name: 'Bohdan'})
})

app.get('/help', (req, res) => {
    res.render('help', {title: "Help page", name: 'Bohdan'})
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                error: undefined,
                forecast: forecastData,
                address: address,
                location
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "Article doesnt exist",
        name: "Bohdan",
        title: "404 error"    
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "Page doesnt exist",
        name: "Bohdan",
        title: "404 error"    
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})