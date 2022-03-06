const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')
const tvController = require('../controllers/tvController')
const entertainMeController = require('../controllers/entertainMeController')

router.get('/movies', movieController.find)
router.post('/movies', movieController.create)
router.put('/movies/:ObjectId', movieController.update)
router.delete('/movies/:ObjectId', movieController.delete)

router.get('/tv', tvController.find)
router.post('/tv', tvController.create)
router.put('/tv/:ObjectId', tvController.update)
router.delete('/tv/:ObjectId', tvController.delete)

router.get('/entertainme', entertainMeController.getAll)

module.exports = router