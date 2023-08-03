const survey_service = require('../services/survey_service')

const get_all_surveys = (req, res) => {
  survey_service.get_all_surveys((error, surverys) => {
    if (error) {
      console.error('Error getting surveys:', error.message)
      res.status(500).json({ error: 'Failed to get surveys' })
      return
    }
    res.status(200).json(surverys)
  })
}

const create_survey = (req, res) => {
  const { nama_projek, alamat, email, no_telpon, status } = req.body
  survey_service.create_survey(
    { nama_projek, alamat, email, no_telpon, status },
    (error, survey_id) => {
      if (error) {
        console.error('Error creating survey:', error.message)
        res.status(500).json({ error: 'Failed to create survey' })
        return
      }
      res
        .status(201)
        .json({ id: survey_id, nama_projek, alamat, email, no_telpon, status })
    }
  )
}

const update_survey = (req, res) => {
  const survey_id = req.body.survey_id
  const { nama_projek, alamat, email, no_telpon, status } = req.body
  survey_service.update_survey(
    survey_id,
    { nama_projek, alamat, email, no_telpon, status },
    (error, success) => {
      if (error) {
        console.error('Error updating product:', error.message)
        res.status(500).json({ error: 'Failed to update product' })
        return
      }
      if (!success) {
        res.status(404).json({ error: 'Product not found' })
      }
      res
        .status(200)
        .json({ id: survey_id, nama_projek, alamat, email, no_telpon, status })
    }
  )
}

const delete_survey = (req, res) => {
  const survey_id = req.body.survey_id
  survey_service.delete_survey(survey_id, (error, success) => {
    if (error) {
      console.error('Error deleting product:', error.message)
    }
    if (!success) {
      res.status(404).json({ error: 'Product not found' })
    }
    res.status(204).end()
  })
}

module.exports = {
  get_all_surveys,
  create_survey,
  update_survey,
  delete_survey,
}
