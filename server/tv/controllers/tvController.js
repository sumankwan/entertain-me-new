const Tv = require('../models/tv').tvModel

class tvController {
    static find(req, res, next) {
        Tv.find() 
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }

    static create(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body

        Tv.create({ title, overview, poster_path, popularity, tags })
            .then(data => {
                res.status(200).json(data.ops[0])
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }

    static update(req, res, next) {
        const ObjectId = req.params.ObjectId
        const { title, overview, poster_path, popularity, tags } = req.body

        Tv.update(ObjectId, { title, overview, poster_path, popularity, tags })
            .then(data => {
                res.status(200).json('success')
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }

    static delete(req, res, next) {
        const ObjectId = req.params.ObjectId

        Tv.delete(ObjectId)
            .then(data => {
                res.status(200).json('success')
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }
}

module.exports = {tvController}