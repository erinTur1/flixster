import { useState } from 'react';
//below import is for random key generation - api has repeated movies in its database, so when react elements are rendered, non-unique keys results in errors
import { v4 as uuidv4 } from 'uuid'; 
import MovieCard from './MovieCard';
import Modal from './Modal';
import '../styles/MovieList.css';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`
  }
};

const MovieList = ({ movies }) => {

    //Note: MovieList handles fetching for specific modal data and it contains the callback functions for changing the visibility of the modal

    //State for modal visibility and data
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(<></>);

    /*Need the movie's id for another two api calls. One call is necessary to get more details about the movie for the modal, and the other is 
    necessary to get the trailer id for an embedded youtube video*/
    const fetchModalData = async (movie_id) => {

        //For movie details
        const urlDetails = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;

        //For movie trailer
        const urlTrailer = `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`;

        try {
            const responseDetails = await fetch(urlDetails, options); 
            if (!responseDetails.ok) {
                throw new Error(`Failed to fetch movie data: \nResponse status: ${response.status}`)
            }
            const jsonDataDetails = await responseDetails.json();

            const responseTrailer = await fetch(urlTrailer, options); 
            if (!responseTrailer.ok) {
                throw new Error(`Failed to fetch movie data: \nResponse status: ${response.status}`)
            }
            const jsonDataTrailer = await responseTrailer.json();

            //null checking
            if (jsonDataDetails !== null && jsonDataTrailer.results.length !== 0 ) {
                //means we got proper data from both calls

                /*Note: the api call for getting a trailer id returns an array of objects, each with a 'type' property.
                We need the object with type "Trailer", so we NEED to iterate through all to find this.*/
                const trailerKey = jsonDataTrailer.results.find((videoForm) => videoForm.type === "Trailer").key;
                return {...jsonDataDetails, key: trailerKey};
            } else if (jsonDataDetails !== null) {
                //no movie trailer
                return jsonDataDetails;
            } else {
                //no data was fetched
                return {};
            }
                
        } catch (error) {
            console.error(error.message);
        }   

    }

    //called when a MovieCard is clicked
    const openModal = async (movieCardId) => {

        //fetch more movie details, using the movie's id
        const fetchedModalData = await fetchModalData(movieCardId);

        if (fetchModalData == {}) { //i.e no data was fetched
            setModalData(<p>Sorry, detailed data could not be fetched!</p>)
        } else {

            setModalData(
                <>
                    <p>{fetchedModalData?.title}</p>
                    <section className='modal-content-visuals'>
                        <img src={"https://image.tmdb.org/t/p/w500" + fetchedModalData?.poster_path} alt={"poster image of " + fetchedModalData?.title}/>
                        <iframe src={`https://www.youtube.com/embed/${fetchedModalData?.key}`}/>
                    </section>
                    <p>{fetchedModalData?.overview}</p>
                    <p>Release date: {fetchedModalData?.release_date}</p>
                    <p>Runtime: {fetchedModalData?.runtime} minutes</p>
                    <p>Genres:</p>
                    {fetchedModalData?.genres.map((genre) => {
                        return <span>{genre.name},</span>
                    })}
                </>
            );
        }
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
                        key={uuidv4()}
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