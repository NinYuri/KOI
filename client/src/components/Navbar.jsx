import { FiClock, FiPhone, FiMail } from 'react-icons/fi';
import logo from '../assets/Logo.webp';
import './Navbar.css';

function Navbar() {
    return (
        <header className="site-header">

            <div className="topbar">
                <div className="topbar-container">
                    <span className="topbar-item">
                        <FiClock /> Horario: Lunes - Viernes 8:00 a.m. a 10:00 p.m.
                    </span>

                    <div className="topbar-contact">
                        <span className="topbar-item">
                            <FiPhone /> (555) 123 4578
                        </span>
                        <span className="topbar-item">
                            <FiMail /> koisushiroom@gmail.com
                        </span>
                    </div>
                </div>
            </div>

            <div className="navbar">
                <div className="navbar-container">
                    <a href="/" className="navbar-brand">
                        <img src={logo} alt="KOI Logo"/>
                    </a>

                    <nav className="navbar-menu">
                        <a href="#" className="link-active">INICIO</a>
                        <a href="#">MENÚ</a>
                        <a href="#">NOSOTROS</a>
                        <a href="#">CONTACTO</a>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar;