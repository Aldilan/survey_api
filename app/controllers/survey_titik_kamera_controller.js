const survey_titik_kamera_service = require('../services/survey_titik_kamera_service')

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

const create_survey_titik_kamera = (req, res) => {
  const { id_survey, judul_titik, foto_titik } = req.body
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

module.exports = {
  get_all_surveys_titik_kamera,
  create_survey_titik_kamera,
}
