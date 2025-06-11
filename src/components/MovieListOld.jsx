
import { sortMovieData } from '../utils/utils';

//two separate fetchData
//one useEffect for onload and one for on search submit
//maintain state for each array
//no clearing

const MovieList = ({searchRequest, sortQuery, searchCheck}) => {
    // console.log(searchCheck);
    
    

    //the problem is whenever the toggle is changed, fetchData is called again
        //we should have it called once for load, search submit, sortQuery, and load more

    //NEED TO SEPARATE LOAD MORE/NUM PAGES INCREMENT USE EFFECT!

    



    // useEffect(() => {
    //     if (searchCheck) {

    //     }
    //     fetchData(); 
    // }, [numPages, sortQuery, searchRequest, searchCheck]);

    // useEffect(() => {
        
    // }, [toggleValue]);

  
    
    // async function fetchData (){

    //     let url = '';
    //     if (toggleValue === 'searched') {
    //         url = `https://api.themoviedb.org/3/search/movie?query=${searchRequest}&include_adult=false&language=en-US&page=${numPages}`;
    //     } else if (toggleValue === 'now playing') {
    //         url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${numPages}`;
    //     }


    //     const options = {
    //             method: 'GET',
    //             headers: {
    //                 accept: 'application/json',
    //                 Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`
    //         }
    //     };


    //     try {
    //         const response = await fetch(url, options);
    //         if (!response.ok) {
    //             throw new Error(`Failed to fetch movie data: \nResponse status: ${response.status}`)
    //         }
    //         const jsonData = await response.json();
    //         if (sortQuery !== '') {
    //             const sortedData = sortMovieData(sortQuery, jsonData.results);
    //         }

    //         if (toggleValue === 'searched') {
    //             console.log("switched to searched");
    //             setSearchResultsList([...searchResultsList, ...jsonData.results]);
    //             // console.log(searchResultsList);
    //         } else if (toggleValue === 'now playing'){
    //             console.log("switched to now playing");
    //             setNowPlayingList([...nowPlayingList, ...jsonData.results]);
    //             // console.log(nowPlayingList);
    //         }
                        
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }

    const addPage = async () => {
        setNumPages(numPages => numPages + 1);
    }



    



    
};

export default MovieList;