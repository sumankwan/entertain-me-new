import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { GET_MOVIES, GET_MOVIE } from '../schema/queries/movieQuery'
import { EDIT_MOVIE } from '../schema/mutations/movieMutation'
import Loading from '../components/Loading'

function EditForm() {
    const idParams = useParams()
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPosterPath] = useState('')
    const [popularity, setPopularity] = useState('')
    const [tags, setTags] = useState([])
    let history = useHistory();
    // const { loading, error, data: data1 } = useQuery(GET_MOVIE, {
    //     variables: { _id: idParams._id }
    // })

    const [getMovie, { data, loading, error }] = useLazyQuery(
        GET_MOVIE, { variables: { _id: idParams._id }}
    );
    
    let isMounted = true;
    useEffect(() => {
        if (isMounted) {
            getMovie()
        }
        return () => {
            isMounted = false;
        };
    }, []);

    let movie = [] 
    if(data) {
        movie = data.movie
    }

    const [editMovie, { loading: mutationLoading, error: mutationError, data: data2 }] = useMutation(EDIT_MOVIE, {
        refetchQueries: [{ query: GET_MOVIES }], awaitRefetchQueries: true
    })

    useEffect(() => {
        if(!loading && !error) {
            setTitle(movie.title)
            setOverview(movie.overview)
            setPosterPath(movie.poster_path)
            setPopularity(movie.popularity)
            setTags(movie.tags)
        }
    }, [movie])

    if(loading || mutationLoading) return <Loading/>
    if(error || mutationError) return <p>error...{JSON.stringify(error)}</p>

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

    async function handleSubmit(e) {
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

        editMovie({variables: { _id: idParams._id, title, overview, poster_path, popularity: pop, tags: container }})
        history.push('/')
    }

    return (
        <form className="text-center border border-light p-5" onSubmit={handleSubmit}>
            <p className="h4 mb-4">Edit movie</p>
            <label>Title</label> 
            <input value={title || ""} className="form-control mb-4" onChange={handleTitle}/>  
            <label>Overview</label>   
            <input value={overview || ""} className="form-control mb-4" onChange={handleOverview}/>
            <label>Poster path</label>
            <input value={poster_path || ""} className="form-control mb-4" onChange={handlePosterPath}/>
            <label>Popularity</label>
            <input value={popularity || ""} className="form-control mb-4" onChange={handlePopularity}/>
            <label>Tags</label>
            <input value={tags || ""} className="form-control mb-4" onChange={handleTags}/>
            <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Submit</button>
        </form>
    )
}

export default EditForm