import { useState } from 'react'
import '../styles/SearchForm.css';

const SearchForm = ({searchRequest, onSearchChange, onSubmitSearch}) => {

    const[isSearchDisabled, setIsSearchDisabled] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        //need to know if "search" or "clear" was clicked
        let submitEvent = event.nativeEvent.submitter.getAttribute("name"); 
        if (submitEvent === "search") {
            const formData = new FormData(event.target);
            const newSearchQuery = formData.get('movie-title');
            //callback in App.jsx that will trigger a search with the query
            onSubmitSearch(newSearchQuery);

            setIsSearchDisabled(true);
        } else if (submitEvent === "clear") {
            onSubmitSearch('');
            event.target.reset();

            setIsSearchDisabled(false);
        }
    }

    //called when text is changed as user is typing
    const handleSearchChange = (event) => {
        //call onSearchChange in App.jsx that will alter the searchRequest state variable while it changes
            //this is necessary to keep the form as a controlled component
        onSearchChange(event.target.value); 
    }

    return (
        <div className="search-form" onSubmit={handleSubmit}>
            <p>{isSearchDisabled&&"Please click \"clear\" for a new search!"}</p>
            <form>
                <input disabled={isSearchDisabled?true:false} type="text" id="title" name="movie-title" placeholder="Search for movies" onChange={handleSearchChange} value={searchRequest}/>
                <input type="submit" name="search" value="Search" />
                <input type="submit" name="clear" value="Clear" />
            </form>
       </div>
    )
}

export default SearchForm;