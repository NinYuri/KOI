import { useState, useRef } from 'react'
import ReviewCard from '../components/ReviewCard';
import olivia from '../assets/Olivia.jpg'
import valeria from '../assets/Avatar.jpg'
import camila from '../assets/Camila.jpg'
import './Reviews.css';

const reviews = [
    { id: 1, image: olivia, name: 'Olivia Wilson', rating: 5,
      comment: 'Pedimos un combo para compartir y nos encantó. Llegó todo muy bien presentado y con un sabor increíble.' },
    { id: 2, image: valeria, name: 'Valeria Montero', rating: 5,
      comment: 'El Dragon Roll es mi favorito. Todo se siente fresco y la presentación está preciosa. ¡Ya quiero volver!' },
    { id: 3, image: camila, name: 'Camila Sánchez', rating: 4,
      comment: 'Me encantó encontrar opciones diferentes. El matcha latte y los mochi fueron la combinación perfecta.' },
]

function Reviews() {
    const [active, setActive] = useState(1)
    const total = reviews.length
    const startX = useRef(null)
    const startY = useRef(null)
    const swiped = useRef(false)

    const getOffset = (i) => {
        let diff = i - active
        if(diff > total / 2) diff -= total
        if(diff < -total / 2) diff += total
        return diff
    }

    const next = () => setActive((a) => (a + 1) % total)
    const prev = () => setActive((a) => (a - 1 + total) % total)

    const onPointerDown = (e) => {
        startX.current = e.clientX
        startY.current = e.clientY
        swiped.current = false
    }

    const onPointerUp = (e) => {
        if(startX.current === null) return
        const dx = e.clientX - startX.current
        const dy = e.clientY - startY.current
        startX.current = null

        if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            swiped.current = true
            dx < 0 ? next() : prev()
        }
    }

    return (
        <section className="reviews-section section">
            <h1 className="section-name">Nuestros <span>Clientes</span> Cuentan</h1>
            <p className="section-description">Cada visita tiene una historia. Desliza para conocer nuestras favoritas.</p>
        
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
                            {...review}
                            className={position}
                            style={{ '--offset': offset }}
                            onClick={offset !== 0 ? () => {
                                if(swiped.current) return
                                setActive(i)
                            } : undefined}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default Reviews;