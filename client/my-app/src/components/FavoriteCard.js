import React from 'react'

function FavoriteCard({favorite}) {
    return (
        <div className="col-10" style={{margin: "15px"}}>
            <div className="card" style={{height: "225px"}}>
                <div className="row">
                    <div className="col-7" style={{paddingRight: "0"}}>
                        <img className="card-img-top" src={favorite.poster_path} height="220" width="130" alt="Card image cap" />
                    </div>
                    <div className="col-5" style={{paddingLeft: "10px", paddingTop: "0", overflow: "scroll"}}>
                        <div className="card-body text-left" style={{paddingTop: "10px"}}>
                            <h1 className="card-title">{favorite.title}</h1>
                            <i>Genres: {favorite.tags}</i><br/>
                            <i>Rating: {favorite.popularity}</i><br/>
                            <i>Overview: {favorite.overview}</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavoriteCard