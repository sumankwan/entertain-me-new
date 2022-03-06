import { gql } from '@apollo/client'

export const GET_TV = gql `
    query getTv {
        tv {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`