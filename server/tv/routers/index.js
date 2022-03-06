const express = require('express')
const router = express.Router()
const tvController = require('../controllers/tvController.js').tvController

router.get('/tv', tvController.find)
router.post('/tv', tvController.create)
router.put('/tv/:ObjectId', tvController.update)
router.delete('/tv/:ObjectId', tvController.delete)

module.exports = router