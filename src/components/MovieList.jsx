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
        getData(); 
    }, []);

  
    async function fetchData (){
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const json = await response.json();
            // setMovieList(json.results);   
            return json.results;
        } catch (error) {
            console.error(error.message);
        }
    }

    const getData = async () => {
        const data = await fetchData();
        setMovieList(data);
    }



    return (
        <div className="movie-list-container">
            {movieList.map((movie) => {
                return (
                    <MovieCard 
                        key={movie?.id}
                        img={movie?.poster_path}
                        title={movie?.title}
                        rating={movie?.vote_average} 
                    />
                );
            })}
        </div>
    )
};

export default MovieList;