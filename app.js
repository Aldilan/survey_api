const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.use('/api', require('./app/routes/survey_route'))
app.use('/api', require('./app/routes/survey_titik_kamera_route'))

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

module.exports = app
