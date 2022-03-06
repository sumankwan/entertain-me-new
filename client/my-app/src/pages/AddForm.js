import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { GET_MOVIES } from '../schema/queries/movieQuery'
import { ADD_MOVIE } from '../schema/mutations/movieMutation'

function AddForm() {
    let history = useHistory();
    const [addMovie, { data }] = useMutation(ADD_MOVIE, {
        refetchQueries: [{ query: GET_MOVIES }], awaitRefetchQueries: true
    })

    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPosterPath] = useState('')
    const [popularity, setPopularity] = useState('')
    const [tags, setTags] = useState([])

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
        setPopularity(e.target.value * 1)
    }

    function handleTags(e) {
        setTags(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        let container = []
        if(!tags) {
            container = ['']
        } else {
            let result = tags
            let store = ''
            for (let i = 0; i < result.length; i++) {
                console.log(result.length)
                if(i == result.length - 1) {
                    store += result[i]
                    container.push(store)
                } else if(result[i] !== ',') {
                    store += result[i]
                } else {
                    container.push(store)
                    store = ''
                }
            }
        }

        let pop = 0
        if(!popularity) {
            pop = 0
        } else {
            pop = popularity
        }

        addMovie({variables: {title, overview, poster_path, popularity: pop, tags: container}})
        history.push('/')
    }

    return (
        <form className="text-center border border-light p-5" onSubmit={handleSubmit}>
            <p className="h4 mb-4">Add new movie</p>
            <label>Title</label> 
            <input value={title} className="form-control mb-4" onChange={handleTitle}/>  
            <label>Overview</label>   
            <input value={overview} className="form-control mb-4" onChange={handleOverview}/>
            <label>Poster path</label>
            <input value={poster_path} className="form-control mb-4" onChange={handlePosterPath}/>
            <label>Popularity</label>
            <input value={popularity} type="number" className="form-control mb-4" onChange={handlePopularity}/>
            <label>Tags</label>
            <input value={tags} className="form-control mb-4" onChange={handleTags}/>
            <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Submit</button>
        </form>
    )
}

export default AddForm