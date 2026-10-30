import { FaStar, FaRegStar } from 'react-icons/fa';
import './ReviewCard.css';

function ReviewCard({image, name, comment, rating, className = '', style, onClick}) {
    const clickable = !!onClick

    return (
        <article 
            className={`review-card ${className}`}
            style={style}
            onClick={onClick}
            role={clickable ? 'button' : undefined}
            tabIndex={clickable ? 0 : undefined}
            onKeyDown={clickable ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
        >
            <div className="review-photo">
                <img src={image} alt={`Avatar de ${name}`} />
            </div>

            <h3 className="review-name">{name}</h3>

            <div className="review-stars" role="img">
                {Array.from({ length: 5 }, (_, i) =>
                    i < rating
                        ? <FaStar key={i} className="star star-filled" aria-hidden="true" />
                        : <FaRegStar key={i} className="star star-empty" aria-hidden="true" />
                )}
            </div>

            <p className="review-comment">"{comment}"</p>
        </article>
    )
}

export default ReviewCard;