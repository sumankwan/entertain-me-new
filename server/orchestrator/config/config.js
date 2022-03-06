const { MongoClient, ObjectId, Double } = require('mongodb')
const url = 'mongodb://localhost:27017'
// const url = 'mongodb+srv://sumankuan:Hacktiv8!@cluster0.myeq3.mongodb.net/myproject?retryWrites=true&w=majority'
const client = new MongoClient(url, {useUnifiedTopology: true})
const connect = async () => await client.connect()
connect()
module.exports = {Double}