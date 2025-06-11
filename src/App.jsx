import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import SortForm from './components/SortForm'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [toggleValue, setToggleValue] = useState('now playing');
  const [sortRequest, setSortRequest] = useState('');

  const handleSearchQueryChange = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  }

  const handleSearchQuerySubmit = (newSearchQuery) => {
    setSearchQuery(newSearchQuery); //MAY BE ABLE TO DELETE THIS LINE OF CODE
    setToggleValue('searched');
  }

  const handleSortRequest = (selectedOption) => {
    // console.log("user selected: " + selectedOption);
    setSortRequest(selectedOption);
  
  }

  return (
    <div className="App">
      <Header/>
      <SearchForm searchRequest={searchQuery} onSearchChange={handleSearchQueryChange} onSubmitSearch={handleSearchQuerySubmit}/>
      <SortForm onSelectChange={handleSortRequest}/>
      <button onClick={() => {
        setToggleValue('now playing');
      }}>Now playing</button>
      <button onClick={() => {
        setToggleValue('searched');
      }}>Search Results</button>
      <MovieList searchRequest={searchQuery} currDisplay={toggleValue} sortQuery={sortRequest}/>
    </div>
  )
}

export default App;
