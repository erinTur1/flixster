import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import Header from './components/Header'

const App = () => {

  return (
    <div className="App">
      <Header />
      <MovieList />
    </div>
  )
}

export default App;
