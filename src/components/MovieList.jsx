import { useState, useEffect } from 'react'
import '../MovieList.css';
import MovieCard from './MovieCard'


const MovieList = () => {

    const [movieList, setMovieList] = useState([]);

    //from tmdb api documentation:
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`
        }
    };
    
    useEffect(() => {
        fetchData(); 
        // console.log('movieList: ', movieList);  
    }, []);

    useEffect(() => {
        console.log('movieList: ', movieList);
    }, [movieList]);

  
    async function fetchData (){
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const json = await response.json();
            console.log("json", json);
            setMovieList(json.results);   
            // return json.results;
        } catch (error) {
            console.error(error.message);
        }
        // fetch(url, options)
        // .then(res => res.json())
        // .then(json => {
        //     console.log('json: ', json.results);
        //     setMovieList(json.results);            
        // }) 
        // .catch(err => console.error(err));
    }

    async function getData() {
        const data = await fetchData();
        console.log(data);
        setMovieList(data);
        console.log(movieList);
    }



    return (
        <div className="movie-list-container">
            <MovieCard 
                key={movieList[0]?.id}
                img={movieList[0]?.poster_path}
                title={movieList[0]?.title}
                rating={movieList[0]?.vote_average} 
            />
        </div>
    )
};

export default MovieList;