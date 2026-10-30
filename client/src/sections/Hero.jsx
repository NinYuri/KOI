import backgroundImage from '../assets/HeroBack.webp';
import './Hero.css';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="first-title">El <em>arte</em> del sushi</span>
                        <span className="second-title">en cada <em>detalle</em></span>
                    </h1>

                    <p className="hero-description">
                        Rolls irresistibles, ingredientes frescos y combinaciones hechas para disfrutar.
                    </p>

                    <a href="#menu" className="hero-button">Explorar menú</a>
                </div>

                <div className="hero-image">
                    <img src={backgroundImage} alt="Hero Background"/>
                </div>
            </div>
        </section>
    )
}

export default Hero;