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

module.exports = {
  get_all_surveys,
}
