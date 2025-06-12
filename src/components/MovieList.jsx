import { useState } from 'react';
import MovieCard from './MovieCard';
import Modal from './Modal';
import '../styles/MovieList.css';

const MovieList = ({ movies }) => {

    //Note: MovieList handles fetching for specific modal data and it contains the callback functions for changing the visibility of the modal

    //State for modal visibility and data
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(<></>);

    //Need the movie's id for another api call. Another call is necessary to get more details about the movie for the modal
    const fetchModalData = async (movie_id) => {

        const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
        
        try {
            const response = await fetch(url, ); 
            if (!response.ok) {
                throw new Error(`Failed to fetch movie data: \nResponse status: ${response.status}`)
            }
            const jsonData = await response.json();

            return jsonData;
                
        } catch (error) {
            console.error(error.message);
        }
    }

    //called when a MovieCard is clicked
    const openModal = async (movieCardId) => {

        //fetch more movie details, using the movie's id
        const fetchedModalData = await fetchModalData(movieCardId);

        setModalData(
            <>
                <p>{fetchedModalData.title}</p>
                <img src={"https://image.tmdb.org/t/p/w500" + fetchedModalData.poster_path} alt={"poster image of " + fetchedModalData.title}/>
                <p>{fetchedModalData.overview}</p>
                <p>Release date: {fetchedModalData.release_date}</p>
                <p>Runtime: {fetchedModalData.runtime} minutes</p>
                <p>Genres:</p>
                {fetchedModalData.genres.map((genre) => {
                    return <span>{genre.name},</span>
                })}
            </>
        );
        setModalVisible(true);
    }

    //called when "close" button on modal is clicked
    const closeModal = () => {
        setModalVisible(false);
    }
    

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