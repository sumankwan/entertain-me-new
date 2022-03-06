import React from 'react'
import { useQuery } from '@apollo/client'
import TvCard from '../components/TvCard'
import { GET_TV } from '../schema/queries/tvQuery'
import Loading from '../components/Loading'

function TvHome() {
    const { loading, error, data } = useQuery(GET_TV)
    
    if(loading) return <Loading/>
    if(error) return <p>error...{JSON.stringify(error)}</p>

    const tv = data.tv

    return (
        <div className="container" style={{marginTop: "15px", marginBottom: "25px"}}>
            <div className="row" style={{marginLeft: "110px"}}>
            {
            tv.map((series) => {
                return (  
                    <TvCard 
                        series={series}
                        key={series._id}/>
                    )
                })
            }   
            </div> 
        </div>  
    )
}

export default TvHome