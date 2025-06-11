import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Modal from './Modal';
import '../styles/MovieList.css';

const MovieList = ({ movies }) => {
    //for modal
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(<></>);


    //For modal
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
        {/* <button onClick={addPage} title="Load More">Load More</button> */}
        </>
        <Modal isVisible={isModalVisible} onClose={closeModal}> 
            {modalData}
        </Modal>
        </>
    )

}

export default MovieList;