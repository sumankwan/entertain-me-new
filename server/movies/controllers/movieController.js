const Movie = require('../models/movie').movieModel

class movieController {
    static find(req, res, next) {
        Movie.find() 
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }

    static findOne(req, res, next) {
        Movie.findOne(req.params.ObjectId) 
            .then(data => {
                console.log(data);
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }

    static create(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body

        Movie.create({ title, overview, poster_path, popularity, tags })
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
        // Movie.update(ObjectId, { title, overview, poster_path, popularity, tags })
        Movie.update(ObjectId, { title, overview, poster_path, popularity, tags })
            .then(data => {
                res.status(200).json({message: 'success'})
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }

    static delete(req, res, next) {
        const ObjectId = req.params.ObjectId

        Movie.delete(ObjectId)
            .then(data => {
                res.status(200).json({message: 'success'})
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }
}

module.exports = {movieController}