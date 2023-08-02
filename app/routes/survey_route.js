const express = require('express')
const router = express.Router()
const survery_controller = require('../controllers/survery_controller')

router.get('/surveys', survery_controller.get_all_surveys)

module.exports = router
