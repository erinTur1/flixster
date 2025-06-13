import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons'; 
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'; 

// import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { parseMovieData } from '../utils/utils';
import '../styles/MovieCard.css'


const MovieCard = ({data, displayModal, handleHeartClick, handleEyeClick, ind, isPrevLiked, isPrevWatched, currList}) => {

  let prevHeartState = false; //DELETE?

  const [isFavorited, setIsFavorited] = useState(isPrevLiked);
  const [isWatched, setIsWatched] = useState(isPrevWatched);

  //MovieCard is passed an object of movie details for each movie, parse so we only get the desired details
  const parsedData = data ? parseMovieData(data) : [];

  //callback function that is triggered when a MovieCard is clicked
  const handleDisplayModal = () => {
    //calls displayModal located in MovieList.jsx and passes only the id of the movie
    displayModal(parsedData.movieId);
  }

  const handleFavoriteClick = () => {
    handleHeartClick(currList, ind);
    if (!isFavorited ) {
      setIsFavorited(true);
      prevHeartState = true;
    } else {
      setIsFavorited(false);
      prevHeartState = false;
    }
  }

  const handleWatchClick = () => {
    handleEyeClick(currList, ind);
    if (!isWatched ) {
      setIsWatched(true);
    } else {
      setIsWatched(false);
    }
  }

  return (
    <div className="movie-card" onClick={handleDisplayModal}>
        <img src={"https://image.tmdb.org/t/p/w500" + parsedData.movieImg} alt={"poster image of " + parsedData.movieTitle}/>
        <section className="movie-card-info">
          <p>{parsedData.movieTitle}</p>
          <p>Vote average: {parsedData.movieRating}</p>
          <FontAwesomeIcon className="heart-icon" icon={isFavorited?filledHeart:emptyHeart} onClick={(event) => {
            event.stopPropagation();
            handleFavoriteClick();
          }}/>
          <FontAwesomeIcon className="watch-icon" icon={isWatched?faEye:faEyeSlash} onClick={(event) => {
            event.stopPropagation();
            handleWatchClick();
          }}/>
        </section>
    </div>
  )
}

export default MovieCard;