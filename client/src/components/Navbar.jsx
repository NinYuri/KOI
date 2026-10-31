import { FiClock, FiPhone, FiMail } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import logo from '../assets/Logo.webp';
import './Navbar.css';

const links = [
    { id: 'inicio', label: 'INICIO' },
    { id: 'menu', label: 'MENÚ' },
    { id: 'nosotros', label: 'NOSOTROS' },
    { id: 'login', label: 'INICIAR SESIÓN' }
];

function Navbar() {
    const [activeLink, setActiveLink] = useState('inicio');
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const lastY = useRef(0);
    const headerRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            if(open) return;
            const y = window.scrollY;
            const diff = y - lastY.current;
            if(Math.abs(diff) < 8) return;
            setHidden(y > 120 && diff > 0);
            lastY.current = y;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [open]);

    // Block scroll
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);
 
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        const onResize = () => window.innerWidth > 768 && setOpen(false);
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    useEffect(() => {
        if(!open) return;

        const onClickOutside = (e) => {
            if(headerRef.current && !headerRef.current.contains(e.target))
                setOpen(false);
        };

        document.addEventListener('pointerdown', onClickOutside);
        return () => document.removeEventListener('pointerdown', onClickOutside);
    }, [open]);

    // Close when selecting an option
    const handleLinkClick = (id) => {
        setActiveLink(id);
        setOpen(false);
    };

    return (
        <header
            ref={headerRef} 
            className={`site-header ${hidden ? 'site-header--hidden' : ''}`}
        >

            <div className="topbar">
                <div className="topbar-container">
                    <span className="topbar-item topbar-hours">
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

                    <button
                        type="button"
                        className={`navbar-toggle ${open ? 'is-open' : ''}`}
                        onClick={() => setOpen(!open)}
                        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={open}
                        aria-controls="navbar-menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav id="navbar-menu" className={`navbar-menu ${open ? 'is-open' : ''}`}>
                        {links.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={() => handleLinkClick(link.id)}
                                className={activeLink === link.id ? 'link-active' : ''}
                            >
                                {link.label}
                            </a>  
                        ))}                        
                    </nav>
                </div>
            </div>

            <div
                className={`navbar-overlay ${open ? 'is-open' : ''}`}
                onClick={() => setOpen(false)}
                aria-hidden="true"
            />
        </header>
    )
}

export default Navbar;