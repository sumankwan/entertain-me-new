const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class tvController{
    static async find(req, res, next) {
        try {
            const tv = JSON.parse(await redis.get('tv'))
            if(tv.length) {
                res.status(200).json(tv)
            } else {
                const { data } = await axios({
                    url: 'http://localhost:5002/tv',
                    method: 'get'
                })
                res.status(200).json(data)
                redis.set('tv', JSON.stringify(data))
            }
        } catch (err) {
            res.send(err)
        }
    }

    static async create(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body
        try {
            const { data } = await axios({
                url: 'http://localhost:5002/tv',
                method: 'post',
                data: { title, overview, poster_path, popularity, tags }
            })
            if(data) {
                const tv = JSON.parse(await redis.get('tv'))
                if(tv.length) {
                    tv.push(data)
                    redis.set('tv', JSON.stringify(tv))
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
                url: `http://localhost:5002/tv/${ObjectId}`,
                method: 'put',
                data: { title, overview, poster_path, popularity, tags }
            })
            if(data == 'success') {
                const tv = JSON.parse(await redis.get('tv'))
                if(tv.length) {
                    for (let i = 0; i < tv.length; i++) {
                        if(tv[i]._id == ObjectId) {
                            console.log(i);
                            if(title) {
                                tv[i].title = title
                            }
                            if(overview) {
                                tv[i].overview = overview
                            }
                            if(poster_path) {
                                tv[i].poster_path = poster_path
                            }
                            if(popularity) {
                                tv[i].popularity = popularity
                            }
                            if(tags) {
                                tv[i].tags = tags
                            }
                        }
                    }
                    redis.set('tv', JSON.stringify(tv))
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
                url: `http://localhost:5002/tv/${ObjectId}`,
                method: 'delete',
            })
            if(data == 'success') {
                const tv = JSON.parse(await redis.get('tv'))
                if(tv.length) {
                    for (let i = 0; i < tv.length; i++) {
                        if(tv[i]._id == ObjectId) {
                            tv.splice(i, 1)
                        }
                    }
                    redis.set('tv', JSON.stringify(tv))
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

module.exports = tvController