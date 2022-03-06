const { db, ObjectId } = require('../config/config.js')
const Movie = db.collection('movies')

class movieModel {
    static find() {
        return Movie.find().toArray()
    }

    static findOne(id) {
        return Movie.find({ _id: ObjectId(id) }).toArray()
    }

    static create(newMovie) {
        return Movie.insertOne(newMovie)
    }

    static update(id, data) {
        return Movie.updateOne({ _id: ObjectId(id) }, {$set: data})
    }

    static delete(id) {
        return Movie.deleteOne({ _id: ObjectId(id) })
    }
}

module.exports = {movieModel}