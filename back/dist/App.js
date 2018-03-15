'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const { PORT } = require('../../config');

const Observation = require('./model/Observation');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../front/dist')));

// List existing observations
app.get('/api/observations', (req, res) => {
    const cities = (req.query.cities || '').split(',');
    const page = parseInt(req.query.page || 0);

    Observation.getList(cities, page).then(summary => {
        res.json(summary);
    });
});

// Create new observation
app.post('/api/observations', (req, res) => {
    Observation.create({
        city: req.body.city,
        temperature: req.body.temperature
    }).then(done => {
        res.status(204).end();
    });
});

// Get data for Recharts diagram on front page
app.get('/api/chart', (req, res) => {
    const cities = (req.query.cities || '').split(',');

    Observation.getChartData(cities).then(chartData => {
        res.json(chartData);
    });
});

// List cities
app.get('/api/cities', (req, res) => {
    Observation.getCities().then(cities => {
        res.json(cities);
    }).catch(() => res.status(500).end('Error'));
});

// List cities with their latest observation and
// min/max temperatures from last 24 hours
app.get('/api/summary', (req, res) => {
    Observation.getSummary().then(summary => {
        res.json(summary);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../front/dist/index.html'));
});

app.use(function (err, req, res, next) {
    if (!err) return;
    console.error(err.stack);
    res.status(500).end(err.message);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));