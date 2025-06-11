import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';


const MovieList = ({searchQuery1, currDisplay}) => {

    console.log(currDisplay + "-" + searchQuery1);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [numPages, setNumPages] = useState(1);
    //const [searchData, setSearchData] = useState(searchQuery1);

    
    // useEffect( () => {
    //     //setSearchData(searchQuery1);
    //     fetchData();
    // }, [currDisplay]); 

    useEffect(() => {
        fetchData(); 
    }, [numPages, currDisplay]);
    

  
    async function fetchData (){

        console.log("called fetch data " + searchQuery1);

        // let url = '';
        // if (currDisplay === 'searched') {
        //     url = `https://api.themoviedb.org/3/search/keyword?query=${searchQuery1}&page=1`;
        // } else if (currDisplay === 'now playing') {
        //     url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${numPages}`;
        // }


        const url = `https://api.themoviedb.org/3/search/keyword?query=${searchQuery1}&page=1`;
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
            console.log("data", jsonData);
            setNowPlaying([...nowPlaying, ...jsonData.results]);
        } catch (error) {
            console.error(error.message);
        }
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