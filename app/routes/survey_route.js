const express = require('express')
const router = express.Router()
const survery_controller = require('../controllers/survery_controller')

router.get('/surveys', survery_controller.get_all_surveys)
router.post('/surveys', survery_controller.create_survey)
router.put('/surveys', survery_controller.update_survey)
router.delete('/surveys', survery_controller.delete_survey)

module.exports = router
