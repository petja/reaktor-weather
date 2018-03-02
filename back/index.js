const express = require('express')
const path = require('path')
const app = express()

const {PORT} = require('../config')

const Observation = require('./model/Observation')

app.use(
    express.static(path.join(__dirname, '../front/dist'))
)

app.get('/api/summary', (req, res) => {
    Observation.getSummary().then(summary => {
        res.json(summary)
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/dist/index.html'))
})


app.listen(PORT, () => console.log(`Duck app listening on port ${PORT}!`))
