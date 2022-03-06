import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import MovieHome from './pages/MovieHome'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import AddForm from './pages/AddForm'
import EditForm from './pages/EditForm'
import TvHome from './pages/TvHome'
import Favorite from './pages/Favorite'
import client from './config/config'

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route exact path='/'>
              <MovieHome></MovieHome>
            </Route>
            <Route path='/add-form'>
              <AddForm></AddForm>
            </Route>
            <Route path='/edit-form/:_id'>
              <EditForm></EditForm>
            </Route>
            <Route path='/tv'>
              <TvHome></TvHome>
            </Route>
            <Route path='/favorites'>
              <Favorite></Favorite>
            </Route>
          </Switch>
        </Router>   
      </div>
    </ApolloProvider>
  );
}

export default App;
