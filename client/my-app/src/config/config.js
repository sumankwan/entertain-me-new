import { ApolloClient, InMemoryCache } from '@apollo/client'
import { favorites } from '../cache/index'

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    favorites: {
                        read() {
                            return favorites()
                        }
                    }
                }
            }
        }
    })
})

export default client