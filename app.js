const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

// Konfigurasi penyimpanan file dengan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public') // Ganti dengan direktori penyimpanan file gambar
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  },
})

// Menggunakan multer sebagai middleware
const upload = multer({ storage })
app.use(upload.single('image'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/get_photo/:filename', (req, res) => {
  const filename = req.params.filename
  const photoPath = path.join(__dirname, 'public', filename)
  res.sendFile(photoPath)
})

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
