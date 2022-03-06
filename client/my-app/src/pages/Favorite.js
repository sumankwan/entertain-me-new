import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import FavoriteCard from '../components/FavoriteCard'
import { GET_FAVORITES } from '../schema/queries/favoriteQuery'
import Loading from '../components/Loading'

function Favorites() {
    // const { loading, error, data } = useQuery(GET_FAVORITES)

    const [getFavorites, { data, loading, error }] = useLazyQuery(
        GET_FAVORITES
    );
    
    let isMounted = true;
    useEffect(() => {
        if (isMounted) {
            getFavorites()
        }
        return () => {
            isMounted = false;
        };
    }, []);

    let favorites = [] 
    if(data) {
        favorites = data.favorites
    }
    
    if(loading) return <Loading/>
    if(error) return <p>error...{JSON.stringify(error)}</p>

    return (
        <div className="container" style={{marginTop: "15px", marginBottom: "25px"}}>
            <div className="row" style={{marginLeft: "110px"}}>
            {
            favorites.map((favorite) => {
                return (  
                    <FavoriteCard 
                    favorite={favorite}
                        key={favorite._id}/>
                    )
                })
            }   
            </div> 
        </div>  
    )
}

export default Favorites