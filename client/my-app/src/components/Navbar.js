import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-light bg-light justify-content-center" style={{marginBottom: "15px"}}>
            <Link to='/' style={{marginRight: "20px"}}>Movies</Link>
            <Link to='/add-form' style={{marginRight: "20px"}}>Add Movie</Link>
            <Link to='/tv' style={{marginRight: "20px"}}>TV Series</Link>
            <Link to='/favorites' style={{marginRight: "20px"}}>Favorites</Link>
        </nav>
    )
}

export default Navbar