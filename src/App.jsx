import { useState, useEffect } from 'react'
import MovieList from './components/MovieList'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchForm from './components/SearchForm'
import SortForm from './components/SortForm'
import { sortMovieData } from './utils/utils';
import './App.css'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`
  }
};


const App = () => {
  //state necessary for search and sort forms
  const [searchQuery, setSearchQuery] = useState('');
  const [searchIsComplete, setSearchIsComplete] = useState(false);
  const [sortRequest, setSortRequest] = useState('');

  //state necessary for movie lists
    //toggleValue controls what list is visible to the user: now playing movies or results from their search
  const [toggleValue, setToggleValue] = useState('now playing');
  const [nowPlayingList, setNowPlayingList] = useState([]);
  const [searchResultsList, setSearchResultsList] = useState([]);

  //state variables necessary for load more functionality
    //decided to have num pages state for each movie list so that if user chooses to load more for one, they aren't affecting the other list
  const [numPagesNowPlayingList, setNumPagesNowPlayingList] = useState(1);
  const [numPagesSearchResultsList, setNumPagesSearchResultsList] = useState(1);
    //need state to keep track of if the user loaded all search results - they shouldn't be able to load more and should be notified of this
  const [limitReachedSearchResults, setLimitReachedSearchResults] = useState(false);
  const [resultsNotif, setResultsNotif] = useState('');

  

  //need to fetch data when user loads more - i.e increases the number of pages shown
  useEffect(() => {
    fetchNowPlayingData();
  }, [numPagesNowPlayingList]);

  useEffect(() => {
    fetchSearchedData();
  }, [numPagesSearchResultsList]);

  //when sort request is submitted, call sortMovies
  useEffect(() => {
    if (toggleValue === 'now playing') {
      sortMovies(nowPlayingList);
    } else if (toggleValue === 'searched') {
      sortMovies(searchResultsList);
    }
  }, [sortRequest]);
    
  //searchIsComplete changes when "search" or "clear" are clicked
  useEffect(() => {
    //we only want to fetch data if "search" was selected
    if (searchIsComplete) {
      setNumPagesSearchResultsList(1);
      setLimitReachedSearchResults(false);
      fetchSearchedData();
    }
  }, [searchIsComplete]);

  //callbacks for search and sort forms

  //updates search query string state as it is changed
  const handleSearchQueryChange = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  }

  //*
  const handleSearchQuerySubmit = (newSearchQuery) => {
    if (newSearchQuery === '') {
      //nothing was searched for
      setSearchResultsList([]);
      setSearchIsComplete(false);
      setLimitReachedSearchResults(true);
      setResultsNotif('Please search for a movie to see results here!');

      setToggleValue('now playing'); //show now playing movies instead
    } else {
      //there is a search query
      setSearchIsComplete(true);
      setToggleValue('searched');
    }
  }

  const handleSortRequest = (selectedOption) => {
    setSortRequest(selectedOption);
  }

  const fetchNowPlayingData = async() => {

        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${numPagesNowPlayingList}`;

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


  const fetchSearchedData = async() => {

      const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${numPagesSearchResultsList}`;

      try {
          const response = await fetch(url, options);
          if (!response.ok) {
              throw new Error(`Failed to fetch movie data: \nResponse status: ${response.status}`)
          }
          const jsonData = await response.json();

          //if we have gotten all possible results...
          if (jsonData.results.length == 0) {
            setLimitReachedSearchResults(true);
            if (numPagesSearchResultsList > 1) {
              setResultsNotif('No more results!');
            } else if (numPagesSearchResultsList == 1) {
              //this is true when the search results screen is clicked on, but nothing was searched for
              setResultsNotif('Please search for a movie to see results here!');
            }
          }
                
          setSearchResultsList([...searchResultsList, ...jsonData.results]);
                        
      } catch (error) {
          console.error(error.message);
      }
  }

  const sortMovies = (movieList) => {
    if (toggleValue === 'now playing') {
      const updatedMovies = sortMovieData(sortRequest, movieList);
      setNowPlayingList(updatedMovies)
    } else if (toggleValue === 'searched') {
      const updatedMovies = sortMovieData(sortRequest, movieList);
      setSearchResultsList(updatedMovies)
    }
  }


  //these two are triggered on "load more" button click

  const addPageNowPlaying = () => {
        setNumPagesNowPlayingList(numPagesNowPlayingList => numPagesNowPlayingList + 1);
  }

  const addPageSearchList = () => {
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
      <section id="content-area">
        <MovieList movies={toggleValue === 'now playing'? nowPlayingList: searchResultsList}/>
        <button className={limitReachedSearchResults && toggleValue === 'searched'?"loadMoreBtn hidden":"loadMoreBtn"} onClick={toggleValue === 'now playing'? addPageNowPlaying: addPageSearchList} title="Load More">Load More</button>
        <p className="notif-para" hidden={(toggleValue === 'now playing' || !limitReachedSearchResults)?true:false}>{resultsNotif}</p>
      </section>
      <Footer />
    </div>
  )
}

export default App;
