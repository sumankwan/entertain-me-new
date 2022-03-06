const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = 'myproject'
const client = new MongoClient(url, {useUnifiedTopology: true})
const connect = async () => await client.connect()
connect()
const db = client.db(dbName)
module.exports = { db, ObjectId }