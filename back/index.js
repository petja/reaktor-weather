const express = require('express')
const path = require('path')
const app = express()

const {PORT} = require('../config')

const Observation = require('./model/Observation')

app.use(
    express.static(path.join(__dirname, '../front/dist'))
)

app.get('/api/observations', (req, res) => {
    const cities = (req.query.cities || '').split(',')
    const page = parseInt(req.query.page || 0)

    Observation.getList(cities, page).then(summary => {
        res.json(summary)
    })
})

app.get('/api/chart', (req, res) => {
    const cities = (req.query.cities || '').split(',')

    Observation.getChartData(cities).then(chartData => {
        res.json(chartData)
    })
})

app.get('/api/summary', (req, res) => {
    Observation.getSummary().then(summary => {
        res.json(summary)
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/dist/index.html'))
})


app.listen(PORT, () => console.log(`Duck app listening on port ${PORT}!`))
