const { ApolloServer, gql } = require('apollo-server')
const { Double } = require('./config/config')
const axios = require('axios')

const typeDefs = gql`
    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    type Query {
        getMovies: [Movie],
        updateMovie(
            _id: ID
            title: String
            overview: String
            popularity: Float
            poster_path: String
        ) : String
    }
    
    type Mutation {
        addMovie(
            _id: ID
            title: String
            overview: String
            popularity: Float
            poster_path: String
        ) : Movie
    }
`;

const resolvers = {
    Query: {
        getMovies: async () => {
            const { data } = await axios.get('http://localhost:5001/movies')
            return data
        },
        updateMovie: async (_, args) => {
            const { id } = args
        }
    },

    Mutation: {
        addMovie: async (_, args) => {
            console.log(args, 'args');
            const { data } = await axios.post('http://localhost:5001/movies', args)
            return data
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});