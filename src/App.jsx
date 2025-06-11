import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import SortForm from './components/SortForm'
import { sortMovieData } from './utils/utils';


const App = () => {
  //search and sort forms
  const [searchQuery, setSearchQuery] = useState('');
  const [searchIsComplete, setSearchIsComplete] = useState(false);
  // const [toggleValue, setToggleValue] = useState('now playing');
  const [sortRequest, setSortRequest] = useState('');

  //data fetching
  const [toggleValue, setToggleValue] = useState('now playing');
  const [nowPlayingList, setNowPlayingList] = useState([]);
  const [searchResultsList, setSearchResultsList] = useState([]);
  const [numPages, setNumPages] = useState(1);
  


  useEffect(() => {
    fetchNowPlayingData();
  }, []);

  useEffect(() => {
    fetchNowPlayingData();
  }, [numPages]);

  useEffect(() => {
    console.log('inside sort use effect')
    if (toggleValue === 'now playing') {
      console.log('inside sort use effect | now playing')
      sortMovies(nowPlayingList);
    } else if (toggleValue === 'searched') {
      console.log('inside sort use effect | searched')
      sortMovies(searchResultsList);
    }
  }, [sortRequest]);
    

  useEffect(() => {
    fetchSearchedData();
  }, [searchIsComplete]);

  //search and sort forms
  const handleSearchQueryChange = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  }

  const handleSearchQuerySubmit = (newSearchQuery) => {
    // setSearchQuery(newSearchQuery); //MAY BE ABLE TO DELETE THIS LINE OF CODE
    setSearchIsComplete(true);
    setToggleValue('searched');
  }

  const handleSortRequest = (selectedOption) => {
    console.log("user selected: " + selectedOption);
    setSortRequest(selectedOption);
  }

  //data fetching
  async function fetchNowPlayingData (){

        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${numPages}`;


        const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`
            }
        };


        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Failed to fetch movie data: \nResponse status: ${response.status}`)
            }
            const jsonData = await response.json();
                
            setNowPlayingList([...nowPlayingList, ...jsonData.results]);
                        
        } catch (error) {
            console.error(error.message);
        }
    }


  async function fetchSearchedData (){

      const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${numPages}`;


      const options = {
              method: 'GET',
              headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`
          }
      };


      try {
          const response = await fetch(url, options);
          if (!response.ok) {
              throw new Error(`Failed to fetch movie data: \nResponse status: ${response.status}`)
          }
          const jsonData = await response.json();
          // if (sortRequest !== '') {
          //     const sortedData = sortMovieData(sortRequest, jsonData.results);
          // }
                
          setSearchResultsList([...searchResultsList, ...jsonData.results]);
                        
      } catch (error) {
          console.error(error.message);
      }
  }

  const sortMovies = (movieList) => {
    console.log('start sort movies', movieList)
    if (toggleValue === 'now playing') {
      console.log('start sort movies | now playing')
      const updatedMovies = sortMovieData(sortRequest, movieList);
      setNowPlayingList(updatedMovies)
    } else if (toggleValue === 'searched') {
      console.log('start sort movies | searched')
      const updatedMovies = sortMovieData(sortRequest, movieList);
      setSearchResultsList('searched', updatedMovies)
    }
  }

  const addPage = async () => {
        setNumPages(numPages => numPages + 1);
    }

  return (
    <div className="App">
      <Header/>
      <SearchForm searchQuery={searchQuery} onSearchChange={handleSearchQueryChange} onSubmitSearch={handleSearchQuerySubmit}/>
      <SortForm onSelectChange={handleSortRequest}/>
      <button onClick={() => {
        setToggleValue('now playing');
      }}>Now playing</button>
      <button onClick={() => {
        setToggleValue('searched');
      }}>Search Results</button>
      <MovieList movies={toggleValue === 'now playing'? nowPlayingList: searchResultsList}/>
      <button onClick={addPage} title="Load More">Load More</button>

    </div>
  )
}

export default App;
