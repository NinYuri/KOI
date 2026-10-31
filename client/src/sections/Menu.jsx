import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import DishCard from '../components/DishCard.jsx';
import doodle from '../assets/FirstDoodle.webp';
import './Menu.css';

const categories = ['Entradas', 'Rolls', 'Nigiri', 'Combos', 'Postres', 'Bebidas'];

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function Menu() {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState(null);
    const [activePill, setActivePill] = useState({ left: 0, width: 0 });
    const [hoverPill, setHoverPill] = useState({ left: 0, width: 0 });

    const [dishes, setDishes] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    useEffect(() => {
        const controller = new AbortController();

        const fetchDishes = async () => {
            setLoading(true);
            setError('');

            try {
                const category = categories[active];

                const params = new URLSearchParams({
                    category,
                    page: String(page),
                });

                const response = await fetch(
                    `${API_URL}/api/products?${params.toString()}`,
                    { signal: controller.signal }
                );

                const data = await response.json();

                if(!response.ok)
                    throw new Error(data.message || 'No se pudieron cargar los platillos.');

                const products = (data.products ?? []).map((product) => ({
                    id: product.product_id ?? product.productId,
                    image: product.image_url ?? product.imageUrl,
                    name: product.product_name ?? product.name,
                    description: product.description,
                    price: product.price,
                }));

                setDishes((previous) =>
                    page === 1 ? products : [...previous, ...products]
                );

                setHasMore(data.hasMore ?? false);

            } catch (err) {
                if(err.name !== 'AbortError')
                    setError(err.message || 'Ocurrió un error al cargar el menú.');
            } finally {
                if(!controller.signal.aborted)
                    setLoading(false);
            }
        };

        fetchDishes();

        return () => controller.abort();
    }, [active, page]);

    const handleSelect = (i) => {
        if (i === active) return;

        setActive(i);
        setPage(1);
        setDishes([]);
        setHasMore(false);

        optionRefs.current[i]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        });
    };

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage((previous) => previous + 1);
        }
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
                onPointerLeave={(e) =>
                    e.pointerType === 'mouse' && setHovered(null)
                }
            >
                <span
                    className={`pill pill-hover ${isHovering ? 'visible' : ''}`}
                    style={{
                        left: hoverPill.left,
                        width: hoverPill.width,
                    }}
                />

                <span
                    className="pill pill-active"
                    style={{
                        left: activePill.left,
                        width: activePill.width,
                    }}
                />

                {categories.map((name, i) => (
                    <button
                        key={name}
                        type="button"
                        ref={(el) => (optionRefs.current[i] = el)}
                        className={`option ${active === i ? 'active' : ''}`}
                        onClick={() => handleSelect(i)}
                        onPointerEnter={(e) =>
                            e.pointerType === 'mouse' && setHovered(i)
                        }
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

            {loading && (
                <p className="menu-message">Cargando platillos...</p>
            )}

            {!loading && error && (
                <p className="menu-message menu-error">{error}</p>
            )}

            {!loading && !error && dishes.length === 0 && (
                <p className="menu-message">
                    Todavía no hay platillos en esta categoría.
                </p>
            )}

            {hasMore && (
                <button
                    type="button"
                    className="more-dishes"
                    onClick={handleLoadMore}
                    disabled={loading}
                >
                    <p data-text="Más">{loading ? 'Cargando...' : 'Más'}</p>

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
                </button>
            )}
        </section>
    );
}

export default Menu;