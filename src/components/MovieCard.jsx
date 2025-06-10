import '../MovieCard.css'
import PlaceHolderImg from '../assets/movie-img-placeholder.png';

const MovieCard = ({title}) => {
  console.log(title);
  return (
    <div className="movie-card">
        <img src={PlaceHolderImg}/>
        <p>{title}</p>
        {/* <p>{rating}</p> */}
    </div>
  )
}

export default MovieCard;