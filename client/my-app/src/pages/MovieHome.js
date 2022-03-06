import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import MovieCard from '../components/MovieCard'
import { GET_MOVIES } from '../schema/queries/movieQuery'
import Loading from '../components/Loading'

function MovieHome() {
    const [getMovies, { data, loading, error }] = useLazyQuery(
        GET_MOVIES
    );
    
    let isMounted = true;
    useEffect(() => {
        if (isMounted) {
            getMovies()
        }
        return () => {
            isMounted = false;
        };
    }, []);

    let movies = [] 
    if(data) {
        movies = data.movies
    }

    if(loading) return <Loading/>
    if(error) return <p>error...{JSON.stringify(error)}</p>

    return (
        <div className="container" style={{marginTop: "15px", marginBottom: "25px"}}>
            <div className="row" style={{marginLeft: "110px"}}>
            {
            movies.map((movie) => {
                return (  
                    <MovieCard 
                        movie={movie}
                        key={movie._id}/>
                    )
                })
            }   
            </div> 
        </div>  
    )
}

export default MovieHome