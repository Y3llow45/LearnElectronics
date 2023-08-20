import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <nav className="navbar">
            <section className="navbar-dashboard">
                <div className="first-bar">
                    <Link to="/" className="dashboard-link">Dashboard</Link>
                    <Link to="/lessons" className="nav-link">Lessons</Link>
                </div>
            </section>
            <section className="navbar-buttons">
                <div className="second-bar">
                    <Link to="/add-lessons" className="btn btn-primary">Add Lessons</Link>
                    <Link to="/profile" className="btn btn-secondary">Profile</Link>
                    <Link to="/login" className="btn btn-login">Log In</Link>
                    <Link to="/signup" className="btn btn-signup">Sign Up</Link>
                </div>
            </section>
        </nav>
    );
}

export default Header;
