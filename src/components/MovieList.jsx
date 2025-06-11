import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Modal from './Modal';
import '../styles/MovieList.css';



const MovieList = ({searchQuery1, currDisplay}) => {
    const [currMoviesList, setCurrMoviesList] = useState([]);
    const [numPages, setNumPages] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(<></>);

    useEffect(() => {
        //setNowPlaying((prevArr) => []);
        fetchData(); 
    }, [numPages, currDisplay]);

    // const handleClearMoviesList = () => {
    //     setCurrMoviesList([]);
    //     window.location.reload(true);
    // }
    
    // if (currDisplay === 'searched') {
    //     handleClearMoviesList();
    // }
  
    async function fetchData (){

        let url = '';
        if (currDisplay === 'searched') {
            // handleClearMoviesList();
            url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery1}&include_adult=false&language=en-US&page=${numPages}`;
        } else if (currDisplay === 'now playing') {
            console.log("in now playing")
            url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${numPages}`;
        }


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
            // if (currDisplay === 'searched') {
            //     setNowPlaying([...jsonData.results]);
            //     // setNowPlaying([...nowPlaying, ...jsonData.results]);
            // } else {
            //     // setNowPlaying([...nowPlaying, ...jsonData.results]);
            //     setNowPlaying([...jsonData.results]);
            // }
            
            setCurrMoviesList((prevArr) => []); 
            
            setCurrMoviesList((prevArr) => [...prevArr, ...jsonData.results]);
            //setNowPlaying([...jsonData.results]);
        } catch (error) {
            console.error(error.message);
        }
    }

    const addPage = async () => {
        setNumPages(numPages => numPages + 1);
    }

    const openModal = (movieCardData) => {
        setModalData(
            <>
                <p>{movieCardData.title}</p>
                <img src={"https://image.tmdb.org/t/p/w500" + movieCardData.img}/>
                <p>{movieCardData.release_date}</p>
                <p>{movieCardData.overview}</p>
            </>
        );
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }



    return (
        <>
        <>
        <div className="movie-list-container">
            {currMoviesList.map((movie) => {
                return (
                    <MovieCard 
                        displayModal={openModal}
                        key={movie?.id}
                        data={movie}
                    />
                );
            })}
        </div>
        <button onClick={addPage} title="Load More">Load More</button>
        </>
        <Modal isVisible={isModalVisible} onClose={closeModal}> 
            {modalData}
        </Modal>
        </>
    )
};

export default MovieList;