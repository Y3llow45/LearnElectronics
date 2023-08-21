import { Link } from 'react-router-dom';
import './Header.css';

//To Do: Hover efect on 'Electronics' text. Hover e => l,e,c glow in color: hsl(185, 62%, 45%);
function Header() {
    return (
        <div>
        <div className='nav-bar curved'>
            <h2 className='nav-h2-first'>Learn</h2><h2 className='nav-h2-second'>Electronics</h2> 
            <div className='nav-link-menu'>
                <Link to='/' className='nav-link'>Home</Link>
                <Link to='/lessons' className='nav-link'>Lessons</Link>
                <Link to='/add' className='nav-link'>Add Lessons</Link>
                <Link to='/signup' className='nav-link'>Sign up</Link>
            </div>
            <div className='nav-user'>
                <h3>Hello, anonymous!</h3>
            </div>
            <label htmlFor="menu-toggle" id="menu-icon">&#9776;</label>
        </div>
        <svg viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="1" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,32C1120,21,1280,11,1360,5.3L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
        </div>
    );
}

export default Header;

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