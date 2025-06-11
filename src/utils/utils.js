const parseMovieData = (movieData) => {
    return (
        {
            movieTitle: movieData.title,
            movieImg: movieData.poster_path,
            movieRating: movieData.vote_average,
            movieOverview: movieData.overview,
            movieReleaseDate: movieData.release_date,
        }
    )
    
}

const sortMovieData = (sortParam, movies) => {
    console.log(movies);
    if (sortParam === "title") {
        movies.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
        });
    } else if (sortParam === "release") {

        //NEED TO FIX
        movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    } else if (sortParam === "vote-avg") {
        movies.sort((a, b) => a.vote_average - b.vote_average );
    } else {
        //IMPROVE - EDGE CASE
        console.log("no valid sort parameter");
    }
}


export {parseMovieData, sortMovieData};
