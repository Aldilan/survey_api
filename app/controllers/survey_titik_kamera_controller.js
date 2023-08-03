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

const update_survey_titik_kamera = (req, res) => {
  const survey_titik_kamera_id = req.body.survey_titik_kamera_id
  const { judul_titik, foto_titik } = req.body
  survey_titik_kamera_service.update_survey_titik_kamera(
    survey_titik_kamera_id,
    { judul_titik, foto_titik },
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
        .json({ id: survey_titik_kamera_id, judul_titik, foto_titik })
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
  create_survey_titik_kamera,
  update_survey_titik_kamera,
  delete_survey_titik_kamera,
}
