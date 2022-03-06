import React, { useState } from 'react'
import { favorites } from '../cache/index'

function TvCard({series}) {
    const [added, setAdded] = useState(false)

    function addToFavorite() {
        if(!added) {
            const container = favorites()
            favorites([...container, { type: 'TV series', _id: series._id, series: series.title, poster_path: series.poster_path, overview: series.overview, popularity: series.popularity, tags: series.tags }])
            setAdded(true)
        }
    }

    return (
        <div className="col-10" style={{margin: "15px"}}>
            <div className="card" style={{height: "225px"}}>
                <div className="row">
                    <div className="col-7" style={{paddingRight: "0"}}>
                        <img className="card-img-top" src={series.poster_path} height="220" width="130" alt="Card image cap" />
                    </div>
                    <div className="col-5" style={{paddingLeft: "10px", paddingTop: "0", overflow: "scroll"}}>
                        <div className="card-body text-left" style={{paddingTop: "10px"}}>
                            <h1 className="card-title">{series.title}</h1>
                            <i>Genres: {series.tags}</i><br/>
                            <i>Rating: {series.popularity}</i><br/>
                            <i>Overview: {series.overview}</i>
                            <div style={{marginTop: "15px"}}>
                                <button className="btn btn-warning btn-sm" style={{marginTop: "3px"}} onClick={addToFavorite}>Add to Favorites</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TvCard