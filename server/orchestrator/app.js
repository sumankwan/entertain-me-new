const { ApolloServer, gql } = require('apollo-server')
const { Double } = require('./config/config')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
    type Film {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    type Response {
        message: String
    }

    input AddUserInput {
        title: String
        overview: String
        popularity: Float
        poster_path: String
        tags: [String]
    }

    input EditUserInput {
        _id: ID
        title: String
        overview: String
        popularity: Float
        poster_path: String
        tags: [String]
    }

    type Query {
        movies: [Film]
        movie(_id: ID): Film
        tv: [Film]
    }

    type Mutation {
        addMovie(newMovie: AddUserInput) : Film
        editMovie(movie: EditUserInput) : Response
        deleteMovie(_id: ID) : Response
    }
`;

const resolvers = {
    Query: {
        movies: async () => {
            const { data } = await axios.get('http://localhost:5001/movies')
            if(data) {
                const movies = JSON.parse(await redis.get('movies'))
                if(movies.length) {
                    return movies
                } else {
                    redis.set('movies', JSON.stringify(data))
                    return data
                }
            }
        },
        movie: async (_, args) => {
            const _id = args._id
            const { data } = await axios.get(`http://localhost:5001/movies/${_id}`)
            return data[0]
        },
        tv: async () => {
            const { data } = await axios.get('http://localhost:5002/tv')
            if(data) {
                const tv = JSON.parse(await redis.get('tv'))
                if(tv.length) {
                    return tv
                } else {
                    redis.set('tv', JSON.stringify(tv))
                    return data
                }
            }
        }
    },

    Mutation: {
        addMovie: async (_, args) => {
            const { data } = await axios.post('http://localhost:5001/movies', args.newMovie)
            if(data) {
                const movies = JSON.parse(await redis.get('movies'))
                if(movies.length) {
                    movies.push(data)
                    redis.set('movies', JSON.stringify(movies))
                    return data
                } else {
                    return data
                }
            }
        },
        editMovie: async (_, args) => {
            console.log('coba edit');
            const _id = args.movie._id
            const { data } = await axios.put(`http://localhost:5001/movies/${_id}`, args.movie)
            if(data.message == 'success') {
                const movies = JSON.parse(await redis.get('movies'))
                if(movies.length) {
                    for (let i = 0; i < movies.length; i++) {
                        if(movies[i]._id == _id) {
                            movies[i].title = args.movie.title
                            movies[i].overview = args.movie.overview
                            movies[i].poster_path = args.movie.poster_path
                            movies[i].popularity = args.movie.popularity
                            movies[i].tags = args.movie.tags
                        }
                    }
                    redis.set('movies', JSON.stringify(movies))
                    return data
                } else {
                    return data
                }
            }
        },
        deleteMovie: async (_, args) => {
            const id = args._id
            const { data } = await axios.delete(`http://localhost:5001/movies/${id}`)
            if(data.message == 'success') {
                const movies = JSON.parse(await redis.get('movies'))
                if(movies.length) {
                    for (let i = 0; i < movies.length; i++) {
                        if(movies[i]._id == id) {
                            movies.splice(i, 1)
                        }
                    }
                    redis.set('movies', JSON.stringify(movies))
                    return data
                } else {
                    return data
                }
            }
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});