const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class entertainMeController {
    static async getAll(req, res, next) {
        let container = {}
        try {
            const movies = JSON.parse(await redis.get('movies'))
            if(movies) {
                container.movies = movies
            } else {
                const { data } = await axios({
                    url: 'http://localhost:5001/movies',
                    method: 'get'
                })
                container.movies = data
                redis.set('movies', JSON.stringify(data))
            }
        } catch (err) {
            res.send(err)
        }

        try {
            const tv = JSON.parse(await redis.get('tv'))
            if(tv.length) {
                container.tv = tv
            } else {
                const { data } = await axios({
                    url: 'http://localhost:5002/tv',
                    method: 'get'
                })
                container.tv = data
                redis.set('tv', JSON.stringify(data))
            }
        } catch (err) {
            res.send(err)
        }

        res.status(200).json(container)
    }
}

module.exports = entertainMeController