const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, {useUnifiedTopology: true})
const connect = async () => await client.connect()
connect()