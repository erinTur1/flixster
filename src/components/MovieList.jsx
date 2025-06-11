import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Modal from './Modal';
import '../styles/MovieList.css';



const MovieList = ({searchQuery1, currDisplay}) => {
    // console.log(currDisplay + "-" + searchQuery1);
    // let title = null;
    const [nowPlaying, setNowPlaying] = useState([]);
    const [numPages, setNumPages] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState('');

    //const [searchData, setSearchData] = useState(searchQuery1);

    
    // useEffect( () => {
    //     //setSearchData(searchQuery1);
    //     fetchData();
    // }, [currDisplay]); 

    useEffect(() => {
        fetchData(); 
    }, [numPages, currDisplay]);

    const handleClearMoviesList = () => {
        console.log("clear");
        setNowPlaying([]);
        window.location.reload(true);
    }
    
    // if (currDisplay === 'searched') {
    //     handleClearMoviesList();
    // }
  
    async function fetchData (){

        console.log("called fetch data " + searchQuery1);

        let url = '';
        if (currDisplay === 'searched') {
            // handleClearMoviesList();
            url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery1}&include_adult=false&language=en-US&page=${numPages}`;
            // url = `https://api.themoviedb.org/3/search/keyword?query=${searchQuery1}&page=1`;
        } else if (currDisplay === 'now playing') {
            url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${numPages}`;
        }


        // const url = `https://api.themoviedb.org/3/search/keyword?query=${searchQuery1}&page=1`;
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
            console.log(jsonData.results);
            if (currDisplay === 'searched') {
                setNowPlaying([...jsonData.results]);
                // setNowPlaying([...nowPlaying, ...jsonData.results]);
            } else {
                setNowPlaying([...nowPlaying, ...jsonData.results]);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const addPage = async () => {
        setNumPages(numPages => numPages + 1);
    }

    const openModal = (title) => {
        setModalData(title);
        setModalVisible(true);
    }

    const closeModal = () => {
        console.log("hihihi");
        setModalVisible(false);
    }



    return (
        <>
        <>
        <div className="movie-list-container">
            {nowPlaying.map((movie) => {
                return (
                    <MovieCard 
                        key={movie?.id}
                        img={movie?.poster_path}
                        title={movie?.title}
                        rating={movie?.vote_average} 
                        displayModal={openModal}
                    />
                );
            })}
        </div>
        <button onClick={addPage} title="Load More">Load More</button>
        </>
        <Modal isVisible={isModalVisible} onClose={closeModal}> 
            <p>{modalData}</p>
        </Modal>
        </>
    )
};

export default MovieList;