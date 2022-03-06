const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController.js').movieController

router.get('/movies', movieController.find)
router.get('/movies/:ObjectId', movieController.findOne)
router.post('/movies', movieController.create)
router.put('/movies/:ObjectId', movieController.update)
router.delete('/movies/:ObjectId', movieController.delete)

module.exports = router