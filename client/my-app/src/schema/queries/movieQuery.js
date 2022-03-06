import { gql } from '@apollo/client'

export const GET_MOVIES = gql `
    query getMovies {
        movies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const GET_MOVIE = gql `
    query getMovie ($_id: ID){
        movie(_id: $_id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`