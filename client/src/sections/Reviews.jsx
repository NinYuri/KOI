import { useState, useRef, useEffect } from 'react'
import ReviewCard from '../components/ReviewCard';
import './Reviews.css';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function Reviews() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [active, setActive] = useState(0)

    const total = reviews.length
    const startX = useRef(null)
    const startY = useRef(null)
    const swiped = useRef(false)

    useEffect(() => {
        const controller = new AbortController();

        const load = async () => {
            try {
                const res = await fetch(`${API_URL}/api/reviews`, {
                    signal: controller.signal
                });

                if(!res.ok)
                    throw new Error(`Error ${res.status}`);

                const data = await res.json();

                // Adaptar datos de la API
                const formattedReviews = data.map(review => ({
                    id: review.review_id,
                    image: review.avatar_url,
                    name: `${review.first_name} ${review.last_name}`,
                    rating: review.rating,
                    comment: review.comment
                }));

                setReviews(formattedReviews);
                setActive(Math.floor(formattedReviews.length / 2));

            } catch (err) {
                if(err.name !== 'AbortError') {
                    console.error(err);
                    setError('Lo siento, no pudimos cargar las reseñas.');
                }
            } finally {
                if(!controller.signal.aborted)
                    setLoading(false);
            }
        };

        load();

        return () => controller.abort();
    }, []);

    const getOffset = (i) => {
        let diff = i - active
        if (diff > total / 2) diff -= total
        if (diff < -total / 2) diff += total
        return diff
    }

    const next = () => {
        if (total === 0) return;
        setActive((a) => (a + 1) % total);
    };

    const prev = () => {
        if (total === 0) return;
        setActive((a) => (a - 1 + total) % total);
    };

    const onPointerDown = (e) => {
        startX.current = e.clientX
        startY.current = e.clientY
        swiped.current = false
    }

    const onPointerUp = (e) => {
        if (startX.current === null) return
        const dx = e.clientX - startX.current
        const dy = e.clientY - startY.current
        startX.current = null

        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            swiped.current = true
            dx < 0 ? next() : prev()
        }
    }

    return (
        <section className="reviews-section section">
            <h1 className="section-name">Nuestros <span>Clientes</span> Cuentan</h1>
            <p className="section-description">Cada visita tiene una historia. Desliza para conocer nuestras favoritas.</p>

            {loading && <p className="reviews-status">Cargando reseñas…</p>}
            {error && <p className="reviews-status">{error}</p>}
            {!loading && !error && total === 0 && (
                <p className="reviews-status">Aún no hay reseñas.</p>
            )}

            {total > 0 && (
                <div
                    className="reviews-carousel"
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerCancel={() => { startX.current = null }}
                >
                    {reviews.map((review, i) => {
                        const offset = getOffset(i)
                        const position =
                            offset === 0 ? 'is-center' :
                            Math.abs(offset) === 1 ? 'is-side' : 'is-hidden'

                        return (
                            <ReviewCard
                                key={review.id}
                                image={review.image}
                                name={review.name}
                                rating={review.rating}
                                comment={review.comment}
                                className={position}
                                style={{ '--offset': offset }}
                                onClick={offset !== 0 ? () => {
                                    if (swiped.current) return
                                    setActive(i)
                                } : undefined}
                            />
                        )
                    })}
                </div>
            )}
        </section>
    )
}

export default Reviews;