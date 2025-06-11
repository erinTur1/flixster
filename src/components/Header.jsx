import '../styles/Header.css';
import SearchForm from './SearchForm';
import SortForm from './SortForm';

const Header = ({searchQuery, onSearchChange}) => {
    return (<header>
        {/* <SearchForm searchQuery1={searchQuery} onSearchChange1={onSearchChange}/> */}
        <div className="title-div">
            <h1>Flixster</h1>
        </div>
        {/* <SortForm /> */}
    </header>)
}

export default Header;