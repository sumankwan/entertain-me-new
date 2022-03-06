import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { GET_MOVIES } from '../schema/queries/movieQuery'
import { DELETE_MOVIE } from '../schema/mutations/movieMutation'
import { favorites } from '../cache/index'

function MovieCard({movie}) {
    const [added, setAdded] = useState(false)

    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{ query: GET_MOVIES }], awaitRefetchQueries: true
    })

    function handleDelete() {
        deleteMovie({variables: { _id: movie._id}})
    }

    function addToFavorite() {
        if(!added) {
            const container = favorites()
            favorites([...container, { type: 'Movie', _id: movie._id, title: movie.title, poster_path: movie.poster_path, overview: movie.overview, popularity: movie.popularity, tags: movie.tags }])
            setAdded(true)
        }
    }

    return (
        <div className="col-10" style={{margin: "15px"}}>
            <div className="card" style={{height: "225px"}}>
                <div className="row">
                    <div className="col-7" style={{paddingRight: "0"}}>
                        <img className="card-img-top" src={movie.poster_path} height="220" width="130" alt="Card image cap" />
                    </div>
                    <div className="col-5" style={{paddingLeft: "10px", paddingTop: "0", overflow: "scroll"}}>
                        <div className="card-body text-left" style={{paddingTop: "10px"}}>
                            <h1 className="card-title">{movie.title}</h1>
                            <i>Genres: {movie.tags}</i><br/>
                            <i>Rating: {movie.popularity}</i><br/>
                            <i>Overview: {movie.overview}</i>
                            <div style={{marginTop: "15px"}}>
                                <button className="btn btn-warning btn-sm" style={{marginTop: "3px"}} onClick={addToFavorite}>Add to Favorites</button>
                                <div className="btn btn-primary btn-sm" style={{marginLeft: "15px", marginTop: "3px", color: "black"}}><Link className="text-light" to={`/edit-form/${movie._id}`}>Edit</Link></div>
                                <button className="btn btn-danger btn-sm" style={{marginLeft: "15px", marginTop: "3px"}} onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard