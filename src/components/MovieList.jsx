import { useState, useEffect } from 'react'
import '../MovieList.css';
import MovieCard from './MovieCard'


const MovieList = () => {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [numPages, setNumPages] = useState(1);

    
    useEffect(() => {
        getData(); 
    }, [numPages]);

  
    async function fetchData (){

        //from tmdb api documentation:
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
        setNowPlaying([...nowPlaying, ...data]);
    }

    const addPage = async () => {
        setNumPages(numPages => numPages + 1);
    }



    return (
        <>
        <div className="movie-list-container">
            {nowPlaying.map((movie) => {
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
        <button onClick={addPage} title="Load More">Load More</button>
        </>
    )
};

export default MovieList;