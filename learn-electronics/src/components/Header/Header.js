import { NavLink } from 'react-router-dom';
import './Header.css';
import userAvatar from '../../assets/userAvatar.png';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
    const { username } = useAuth();
    return (
        <div className='nav-bar'>
            <div className='left-div'>
                <h2 className='nav-h2-first'>Learn</h2>
                <h3 className="animate-charcter">Electronics</h3>
            </div>
            <div className='nav-link-menu'>
                <NavLink  to='/' className='nav-link'>Home</NavLink >
                <NavLink  to='/lessons' className='nav-link'>Lessons</NavLink >
                <NavLink  to='/add' className='nav-link'>Add lessons</NavLink >
                <NavLink  to='/signup' className='nav-link'>Sign up</NavLink >
            </div>
            <div className='right-div'>
                <div className='nav-user'>
                    {username ? (
                        <h3 className='nav-user-wellcome'>Welcome, {username}!</h3>
                    ) : (
                        <h3 className='nav-user-wellcome'>Welcome, Guest</h3>
                    )}
                </div>
                <button htmlFor="menu-toggle" className="menu-icon">&#9776;</button>
                <img className='nav-user-avatar' src={userAvatar} alt='UA' height='35px'/>
            </div>
        </div>
    );
}

export default Header;


//htmlFor="menu-toggle" className="menu-icon"
/*{isAuthenticated
                    ? <h3>Welcome, {username}!</h3>
                    : <h3>Welcome, Guest</h3>
                } */

/*<button className="hide-nav-bar"></button>
            <input type="checkbox" id="menu-toggle"></input>
            <label for="menu-toggle" id="menu-icon">&#9776;</label>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/lessons" className="nav-link">Lessons</Link>
            <Link to="/add-lessons" className="nav-link">Add Lessons</Link> */

/* */

/*<div className='myHeader'>
            <header>
		        <div className="container">
		        	<h2>LearnElectronics</h2>
		        	<nav>
		        		<Link to="#">Home</Link>
		        		<Link to="#">Lessons</Link>
		        		<Link to="#">Circuits</Link>
		        		<Link to="#">Add </Link>
		        	</nav>
		        	<button className="hamburger">
		        		<div className="bar"></div>
		        	</button>
		        </div>
	        </header>
	        <nav className="mobile-nav">
		        <Link to="/home">Home</Link>
		        <Link to="#">Services</Link>
		        <Link to="#">Projects</Link>
		        <Link to="#">Contact</Link>
	        </nav>
        </div> */