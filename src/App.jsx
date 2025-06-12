import { useState, useEffect } from 'react'
import MovieList from './components/MovieList'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchForm from './components/SearchForm'
import SortForm from './components/SortForm'
import { sortMovieData } from './utils/utils';
import './App.css'



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
  // const [numPages, setNumPages] = useState(1);

  //decided to have num pages state for each movie list so that if user chooses to load more for one, they aren't affecting the other list
  const [numPagesNowPlayingList, setNumPagesNowPlayingList] = useState(1);
  const [numPagesSearchResultsList, setNumPagesSearchResultsList] = useState(1);
  


  useEffect(() => {
    fetchNowPlayingData();
  }, []);

  useEffect(() => {
    fetchNowPlayingData();
  }, [numPagesNowPlayingList]);

  useEffect(() => {
    fetchSearchedData();
  }, [numPagesSearchResultsList]);

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
    if (searchIsComplete) {
      fetchSearchedData();
    }
  }, [searchIsComplete]);

  //search and sort forms
  const handleSearchQueryChange = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  }

  const handleSearchQuerySubmit = (newSearchQuery) => {
    if (newSearchQuery === '') {
      setSearchResultsList([]);
      setSearchIsComplete(false);
      setToggleValue('now playing');
    } else {
      // setSearchQuery(newSearchQuery); //MAY BE ABLE TO DELETE THIS LINE OF CODE
      setSearchIsComplete(true);
      setToggleValue('searched');
    }
  }

  const handleSortRequest = (selectedOption) => {
    console.log("user selected: " + selectedOption);
    setSortRequest(selectedOption);
  }

  //data fetching
  async function fetchNowPlayingData (){

        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${numPagesNowPlayingList}`;


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

      const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${numPagesSearchResultsList}`;


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
      setSearchResultsList(updatedMovies)
    }
  }


  const addPageNowPlaying = async () => {
        setNumPagesNowPlayingList(numPagesNowPlayingList => numPagesNowPlayingList + 1);
  }

  const addPageSearchList = async () => {
        setNumPagesSearchResultsList(numPagesSearchResultsList => numPagesSearchResultsList + 1);
  }

  return (
    <div className="App">
      <Header/>
      <section className="search-sort-area">
        <SearchForm searchQuery={searchQuery} onSearchChange={handleSearchQueryChange} onSubmitSearch={handleSearchQuerySubmit}/>
        <SortForm onSelectChange={handleSortRequest}/>
      </section>
      <button className={toggleValue === 'now playing'? "selected toggleBtn":"toggleBtn"} onClick={() => {
        setToggleValue('now playing');
      }}>Now playing</button>
      <button className={toggleValue === 'searched'? "selected toggleBtn":"toggleBtn"} onClick={() => {
        setToggleValue('searched');
      }}>Search Results</button>
      <MovieList movies={toggleValue === 'now playing'? nowPlayingList: searchResultsList}/>
      <button className="loadMoreBtn" onClick={toggleValue === 'now playing'? addPageNowPlaying: addPageSearchList} title="Load More">Load More</button>
      <Footer />
    </div>
  )
}

export default App;
