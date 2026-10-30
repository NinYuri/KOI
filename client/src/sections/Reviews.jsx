import { useState } from 'react'
import ReviewCard from '../components/ReviewCard';
import olivia from '../assets/Olivia.jpg'
import valeria from '../assets/Avatar.jpg'
import camila from '../assets/Camila.jpg'
import doodle from '../assets/ThirdDoodle.webp';
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

    const getOffset = (i) => {
        let diff = i - active
        if(diff > total / 2) diff -= total
        if(diff < -total / 2) diff += total
        return diff
    }

    return (
        <section className="reviews-section section">
            <h1 className="section-name">Nuestros <span>Clientes</span> Cuentan</h1>
            <p className="section-description">Cada visita tiene una historia. Estas son algunas de las favoritas.</p>
        
            <div className="reviews-carousel">
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
                            onClick={offset !== 0 ? () => setActive(i) : undefined}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default Reviews;