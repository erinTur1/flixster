import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Modal from './Modal';
import '../styles/MovieList.css';

const MovieList = ({ movies }) => {
    //for modal
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(<></>);

    async function fetchModalData (movie_id){

        const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;


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

            return jsonData;
                
        } catch (error) {
            console.error(error.message);
        }
    }


    //For modal
    const openModal = async (movieCardData) => {

        const modalData = await fetchModalData(movieCardData.id);
        console.log(modalData);

        setModalData(
            <>
                <p>{modalData.title}</p>
                <img src={"https://image.tmdb.org/t/p/w500" + modalData.poster_path}/>
                <p>{modalData.overview}</p>
                <p>Release date: {modalData.release_date}</p>
                <p>Runtime: {modalData.runtime} minutes</p>
                <p>Genres:</p>
                {modalData.genres.map((genre) => {
                    return <span>{genre.name},</span>
                })}
            </>
        );
        // setModalDataId(movieCardData.id);
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }
    //

    return (
        <>
        <>
        <div className="movie-list-container">
            {movies.map((movie) => {
                return (
                    <MovieCard 
                        displayModal={openModal}
                        key={movie?.id}
                        data={movie}
                    />
                );
            })}
        </div>
        </>
        <Modal isVisible={isModalVisible} onClose={closeModal}> 
            {modalData}
        </Modal>
        </>
    )

}

export default MovieList;