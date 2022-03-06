import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'

const GET_MOVIE = gql `
    query getMovie($_id: ID){
        getMovie(_id: $_id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`
 
const EDIT_MOVIE = gql `
    mutation editMovie($_id: String, $title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        editMovie(movie: {$_id: String, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags}) {
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

function EditForm() {
    const idParams = useParams()
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { _id: idParams._id }
    })

    // if(loading) return <p>page is loading..</p>
    // if(error) return <p>error...{JSON.stringify(error)}</p>

    const [editMovie] = useMutation(EDIT_MOVIE, {
        variables: { _id: idParams._id, title, overview, poster_path, popularity, tags }
    })

    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPosterPath] = useState('')
    const [popularity, setPopularity] = useState('')
    const [tags, setTags] = useState([])

    const movie = data.movie

    function handleTitle(e) {
        setTitle(e.target.value)
    }

    function handleOverview(e) {
        setOverview(e.target.value)
    }

    function handlePosterPath(e) {
        setPosterPath(e.target.value)
    }

    function handlePopularity(e) {
        setPopularity(e.target.value)
    }

    function handleTags(e) {
        setTags(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        // editMovie({variables: title, overview, poster_path, popularity, tags})
    }

    return (
        <form className="text-center border border-light p-5" onSubmit={handleSubmit}>
            <p>{movie}</p>
            <p className="h4 mb-4">Edit movie</p>
            <label>Title</label> 
            <input value={title} className="form-control mb-4" onChange={handleTitle}/>  
            <label>Overview</label>   
            <input value={overview} className="form-control mb-4" onChange={handleOverview}/>
            <label>Poster path</label>
            <input value={poster_path} className="form-control mb-4" onChange={handlePosterPath}/>
            <label>Popularity</label>
            <input value={popularity} className="form-control mb-4" onChange={handlePopularity}/>
            <label>Tags</label>
            <input value={tags} className="form-control mb-4" onChange={handleTags}/>
            <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Submit</button>
        </form>
    )
}

export default EditForm