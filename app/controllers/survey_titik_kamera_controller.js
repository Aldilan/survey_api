const survey_titik_kamera_service = require('../services/survey_titik_kamera_service')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public') // Ganti dengan path ke direktori penyimpanan foto
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  },
})

// Membuat middleware multer untuk meng-handle foto
const upload = multer({ storage: storage }).single('foto_titik')

const get_all_surveys_titik_kamera = (req, res) => {
  survey_titik_kamera_service.get_all_surveys_titik_kamera(
    (error, survey_titik_kamera) => {
      if (error) {
        console.error('Error getting surveys titik kamera:', error.message)
        res.status(500).json({ error: 'Failed to get surveys titik kamera' })
        return
      }
      res.status(200).json(survey_titik_kamera)
    }
  )
}

const get_detail_surveys_titik_kamera = (req, res) => {
  const survey_id = req.body.survey_id
  survey_titik_kamera_service.get_detail_surveys_titik_kamera(
    survey_id,
    (error, surverys) => {
      if (error) {
        console.error('Error getting surveys:', error.message)
        res.status(500).json({ error: 'Failed to get surveys' })
        return
      }
      res.status(200).json(surverys)
    }
  )
}

const create_survey_titik_kamera = (req, res) => {
  const { id_survey, judul_titik } = req.body

  // Dapatkan nama file foto setelah diupload
  const foto_titik = req.file.filename

  survey_titik_kamera_service.create_survey_titik_kamera(
    { id_survey, judul_titik, foto_titik },
    (error, survey_titik_kamera_id) => {
      if (error) {
        console.error('Error creating survey titik kamera', error.message)
        res.status(500).json({ error: 'Failed to create survey' })
        return
      }
      res.status(201).json({
        id: survey_titik_kamera_id,
        id_survey,
        judul_titik,
        foto_titik,
      })
    }
  )
}

const update_survey_titik_kamera = (req, res) => {
  const id_survey_titik_kamera = req.body.id_survey_titik_kamera
  const { id_survey, judul_titik } = req.body

  // Dapatkan nama file foto setelah diupload
  const foto_titik = req.file.filename
  survey_titik_kamera_service.update_survey_titik_kamera(
    id_survey_titik_kamera,
    { id_survey, judul_titik, foto_titik },
    (error, success) => {
      if (error) {
        console.error('Error updating survey titik kamera:', error.message)
        res.status(500).json({ error: 'Failed to update survey titik kamera' })
        return
      }
      if (!success) {
        res.status(404).json({ error: 'Survey not found' })
      }
      res
        .status(200)
        .json({ id: id_survey_titik_kamera, judul_titik, foto_titik })
    }
  )
}

const delete_survey_titik_kamera = (req, res) => {
  const survey_titik_kamera_id = req.body.survey_titik_kamera_id
  survey_titik_kamera_service.delete_survey_titik_kamera(
    survey_titik_kamera_id,
    (error, success) => {
      if (error) {
        console.error('Error deleting survey titik kamera:', error.message)
      }
      if (!success) {
        res.status(404).json({ error: 'Survey titik kamera not found' })
      }
      res.status(204).end()
    }
  )
}

module.exports = {
  get_all_surveys_titik_kamera,
  get_detail_surveys_titik_kamera,
  create_survey_titik_kamera,
  update_survey_titik_kamera,
  delete_survey_titik_kamera,
}
