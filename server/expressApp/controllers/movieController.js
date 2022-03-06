const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class movieController{
    static async find(req, res, next) {
        try {
            const movies = JSON.parse(await redis.get('movies'))
            if(movies.length) {
                res.status(200).json(movies)
            } else {
                const { data } = await axios({
                    url: 'http://localhost:5001/movies',
                    method: 'get'
                })
                res.status(200).json(data)
                redis.set('movies', JSON.stringify(data))
            }
        } catch (err) {
            res.send(err)
        }
    }

    static async create(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body

        try {
            const { data } = await axios({
                url: 'http://localhost:5001/movies',
                method: 'post',
                data: { title, overview, poster_path, popularity, tags }
            })
            if(data) {
                const movies = JSON.parse(await redis.get('movies'))
                if(movies.length) {
                    movies.push(data)
                    redis.set('movies', JSON.stringify(movies))
                    res.status(200).json(data)
                } else {
                    res.status(200).json(data)
                }
            }
        } catch (err) {
            res.send(err)
        }
    }

    static async update(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body
        const ObjectId = req.params.ObjectId

        try {
            const { data } = await axios({
                url: `http://localhost:5001/movies/${ObjectId}`,
                method: 'put',
                data: { title, overview, poster_path, popularity, tags }
            })
            if(data == 'success') {
                const movies = JSON.parse(await redis.get('movies'))
                if(movies.length) {
                    for (let i = 0; i < movies.length; i++) {
                        if(movies[i]._id == ObjectId) {
                            if(title) {
                                movies[i].title = title
                            }
                            if(overview) {
                                movies[i].overview = overview
                            }
                            if(poster_path) {
                                movies[i].poster_path = poster_path
                            }
                            if(popularity) {
                                movies[i].popularity = popularity
                            }
                            if(tags) {
                                movies[i].tags = tags
                            }
                        }
                    }
                    redis.set('movies', JSON.stringify(movies))
                    res.status(200).json(data)
                } else {
                    res.status(200).json(data)
                }
            }
        } catch (err) {
            res.send(err)
        }
    }

    static async delete(req, res, next) {
        const ObjectId = req.params.ObjectId

        try {
            const { data } = await axios({
                url: `http://localhost:5001/movies/${ObjectId}`,
                method: 'delete',
            })
            if(data == 'success') {
                const movies = JSON.parse(await redis.get('movies'))
                if(movies.length) {
                    for (let i = 0; i < movies.length; i++) {
                        if(movies[i]._id == ObjectId) {
                            movies.splice(i, 1)
                        }
                    }
                    redis.set('movies', JSON.stringify(movies))
                    res.status(200).json(data)
                } else {
                    res.status(200).json(data)
                }
            }
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = movieController