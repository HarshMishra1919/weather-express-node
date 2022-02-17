const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const paritalsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(paritalsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Harsh Mishra',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Harsh Mishra',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'May I help you?',
        title: 'Help page',
        name: 'Harsh Mishra',
    });
});
// This is never going to run
// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1>');
// }); // to configure what a server should do when someone tries to get the resource at specific url

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(400).send({
            error: 'you must provide an address!',
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Harsh Mishra',
        errorMessage: 'Help article not found',
    });
});

// it always comes last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harsh Mishra',
        errorMessage: 'Page not found!',
    });
});
app.listen(3000, () => {
    console.log('web server started on port 3000.');
});
