import logo from '../assets/flixster_logo.png';
import '../styles/Header.css';

const Header = () => {
    return (<header>
        <div className="title-div">
            <span>
                <img id="logo-img" src={logo} alt="image of logo of Flixster"/>
                <h1>Flixster</h1>
            </span>
        </div>
    </header>)
}

export default Header;