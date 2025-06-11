import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import SortForm from './components/SortForm'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [toggleValue, setToggleValue] = useState('now playing');

  const handleSearchQueryChange = (newSearchQuery) => {
    // console.log("function1 ", newSearchQuery);
    setSearchQuery(newSearchQuery);
    //toggle to search
    // setToggleValue('searched');
    //call fetch for searched title
  }

  const handleSearchQuerySubmit = (newSearchQuery) => {
    setSearchQuery(newSearchQuery); //MAY BE ABLE TO DELETE THIS LINE OF CODE
    setToggleValue('searched');
  }

  return (
    <div className="App">
      <Header/>
      <SearchForm searchQuery1={searchQuery} onSearchChange={handleSearchQueryChange} onSubmitSearch={handleSearchQuerySubmit}/>
      <SortForm />
      <button onClick={() => {
        setToggleValue('now playing');
      }}>Now playing</button>
      <button onClick={() => {
            setToggleValue('searched');
        }}>Search Results</button>
      <MovieList searchQuery1={searchQuery} currDisplay={toggleValue}/>
    </div>
  )
}

export default App;
