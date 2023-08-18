import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header id="site-header">
            <nav className="navbar">
                <section className="navbar-dashboard">
                    <div className="first-bar">
                        <Link to="/">Dashboard</Link>
                    </div>
                </section>
            </nav>
        </header>
    );
};

export default Header;