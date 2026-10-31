import { useState, useRef, useLayoutEffect } from 'react';
import DishCard from '../components/DishCard.jsx';
import doodle from '../assets/FirstDoodle.webp';
import springRolls from '../assets/SpringRolls.png';
import './Menu.css';

const categories = ['Entradas', 'Rolls', 'Nigiri', 'Combos', 'Postres', 'Bebidas'];
const dishes = [
    {
        id: 1,
        image: springRolls,
        name: 'Spring Rolls',
        description: 'Rollitos crujientes rellenos de camarón y vegetales salteados.',
        price: 75,
    },
    {
        id: 2,
        image: springRolls,
        name: 'Spring Rolls',
        description: 'Rollitos crujientes rellenos de camarón y vegetales salteados.',
        price: 75,
    },
    {
        id: 3,
        image: springRolls,
        name: 'Spring Rolls',
        description: 'Rollitos crujientes rellenos de camarón y vegetales salteados.',
        price: 75,
    },
    {
        id: 4,
        image: springRolls,
        name: 'Spring Rolls',
        description: 'Rollitos crujientes rellenos de camarón y vegetales salteados.',
        price: 75,
    },
    {
        id: 5,
        image: springRolls,
        name: 'Spring Rolls',
        description: 'Rollitos crujientes rellenos de camarón y vegetales salteados.',
        price: 75,
    },
]

function Menu() {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState(null);
    const [activePill, setActivePill] = useState({ left: 0, width: 0 });
    const [hoverPill, setHoverPill] = useState({ left: 0, width: 0 });
    const optionRefs = useRef([]);

    const measure = (i) => {
        const el = optionRefs.current[i];
        return el ? { left: el.offsetLeft, width: el.offsetWidth } : null;
    };

    useLayoutEffect(() => {
        const update = () => {
            const a = measure(active);
            const h = measure(hovered ?? active);
            if (a) setActivePill(a);
            if (h) setHoverPill(h);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [active, hovered]);

    const handleSelect = (i) => {
        setActive(i);
        optionRefs.current[i]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        });
    };

    const isHovering = hovered !== null && hovered !== active;

    return (
        <section className="menu-section section">
            <img className="doodle left" src={doodle} alt="Sushi Doodle" />
            <img className="doodle right" src={doodle} alt="Sushi Doodle" />

            <h1 className="section-name">Nuestro <span>Menú</span></h1>
            <p className="section-description">Explora nuestros rolls, nigiri y creaciones especiales. Encuentra tu próximo favorito.</p>
        
            <div 
                className="categories" 
                onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(null)}
            >
                {/* Hover Pill */}
                <span
                    className={`pill pill-hover ${isHovering ? 'visible' : ''}`}
                    style={{ left: hoverPill.left, width: hoverPill.width }}
                />

                {/* Active Pill */}
                <span
                    className="pill pill-active"
                    style={{ left: activePill.left, width: activePill.width }}
                />

                {categories.map((name, i) => (
                    <button
                        key={name}
                        type="button"
                        ref={(el) => (optionRefs.current[i] = el)}
                        className={`option ${active === i ? 'active' : ''}`}
                        onClick={() => handleSelect(i)}
                        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
                    >
                        <p data-text={name}>{name}</p>
                    </button>
                ))}
            </div>

            <div className="dishes-grid">
                {dishes.map((dish) => (
                    <DishCard key={dish.id} {...dish} />
                ))}
            </div>

            <div className="more-dishes">
                <p data-text="Más">Más</p>
                <svg
                    className="more-arrow-svg"
                    viewBox="0 0 150 50"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    className="more-arrow-path"
                    d="M5 8 L75 38 L145 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    />
                </svg>
            </div>
        </section>
    )
}

export default Menu;