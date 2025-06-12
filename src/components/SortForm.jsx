import '../styles/SortForm.css';

const SortForm = ({ onSelectChange }) => {

    const handleSelect = (event) => {
        //callback in App.jsx that will trigger a movie list sort
        onSelectChange(event.target.value);
    }
    return (
        <div className="sort-form">
            <select name="sort-by" id="sort-input" defaultValue="" onChange={handleSelect}>
                <option disabled value="">Sort by...</option>
                <option value="title">Title (A-Z)</option>
                <option value="release">Release Date (most recent to oldest)</option>
                <option value="vote-avg">Vote Average (highest to lowest)</option>
            </select>
       </div>
    )
}

export default SortForm;