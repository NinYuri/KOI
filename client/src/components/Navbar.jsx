import { FiClock, FiPhone, FiMail } from 'react-icons/fi';
import { useState } from 'react';
import logo from '../assets/Logo.webp';
import './Navbar.css';

function Navbar() {
    const [activeLink, setActiveLink] = useState('inicio');

    const links = [
        { id: 'inicio', label: 'INICIO' },
        { id: 'menu', label: 'MENÚ' },
        { id: 'nosotros', label: 'NOSOTROS' },
        { id: 'login', label: 'INICIAR SESIÓN' }
    ];

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
                        {links.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={() => setActiveLink(link.id)}
                                className={activeLink === link.id ? 'link-active' : ''}
                            >
                                {link.label}
                            </a>  
                        ))}                        
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar;