const express = require('express')
const router = express.Router()
const survey_titik_kamera_controller = require('../controllers/survey_titik_kamera_controller')
const { route } = require('./survey_route')

router.get(
  '/surveys_titik_kamera',
  survey_titik_kamera_controller.get_all_surveys_titik_kamera
)
router.post(
  '/surveys_titik_kamera',
  survey_titik_kamera_controller.create_survey_titik_kamera
)
router.put(
  '/surveys_titik_kamera',
  survey_titik_kamera_controller.update_survey_titik_kamera
)
router.delete(
  '/surveys_titik_kamera',
  survey_titik_kamera_controller.delete_survey_titik_kamera
)

module.exports = router
