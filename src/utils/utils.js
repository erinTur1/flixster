//Helper functions

const parseMovieData = (movieData) => {
    return (
        {
            movieId: movieData.id,
            movieTitle: movieData.title,
            movieImg: movieData.poster_path,
            movieRating: movieData.vote_average,
            movieOverview: movieData.overview,
            movieReleaseDate: movieData.release_date,
        }
    )
    
}

const sortMovieData = (sortParam, movies) => {
    let tempMovies = [...movies]
    if (sortParam === "title") {
        //sort A-Z
        tempMovies.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
        });
    } else if (sortParam === "release") {
        //sort release date most recent to oldest
        tempMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortParam === "vote-avg") {
        //sort vote average highest to lowest
        tempMovies.sort((a, b) => b.vote_average - a.vote_average );
    }
    return tempMovies;
}


export {parseMovieData, sortMovieData};
