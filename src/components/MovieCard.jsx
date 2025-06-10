import '../MovieCard.css'
import PlaceHolderImg from '../assets/movie-img-placeholder.png';

const MovieCard = () => {
  return (
    <div className="movie-card">
        <img src={PlaceHolderImg}/>
        <p>Movie Title</p>
        <p>Rating: XX</p>
    </div>
  )
}

export default MovieCard;