import { gql } from '@apollo/client'

export const ADD_MOVIE = gql `
    mutation ($title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        addMovie(newMovie: {title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags}) {
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const EDIT_MOVIE = gql `
    mutation ($_id: ID, $title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        editMovie(movie: { _id: $_id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags }) {
            message
        }
    }
`

export const DELETE_MOVIE = gql `
    mutation ($_id: ID) {
        deleteMovie(_id: $_id) {
            message
        }
    }
`