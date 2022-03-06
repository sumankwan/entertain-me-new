const { db, ObjectId } = require('../config/config.js')
const Tv = db.collection('tv')

class tvModel {
    static find() {
        return Tv.find().toArray()
    }

    static create(newTv) {
        return Tv.insertOne(newTv)
    }

    static update(id, data) {
        return Tv.updateOne({ _id: ObjectId(id) }, {$set: data})
    }

    static delete(id) {
        return Tv.deleteOne({ _id: ObjectId(id) })
    }
}

module.exports = {tvModel}