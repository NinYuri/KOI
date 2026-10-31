import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import logo from '../assets/Logo.webp'
import './Footer.css'

const links = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Menú', href: '#menu' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
]

const addresses = [
    ['Calle Jardín Sakura 128, Col. Bosques del Sol', 'Ciudad de México, México.'],
    ['86 Maple Blossom Street, Vancouver', 'Vancouver, Canadá.'],
    ['2-14 Sakura Avenue, Shibuya-ku', 'Tokio, Japón.'],
]

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-brand">
                <img src={logo} alt="KOI Sushi" />
            </div>

            <div className="footer-social">
                <a href="#" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="X"><FaXTwitter /></a>
            </div>

            <nav className="footer-nav">
                {links.map((l) => (
                    <a key={l.label} href={l.href}>{l.label}</a>
                ))}
            </nav>

            <div className="footer-contact">
                {addresses.map((a, i) => (
                    <address key={i}>
                        {a[0]}<br />{a[1]}
                    </address>
                ))}

                <div className="footer-contact-data">
                    <a href="mailto:koisushiroom@gmail.com">koisushiroom@gmail.com</a>
                    <a href="tel:+525551234578">(555) 123 4578</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer