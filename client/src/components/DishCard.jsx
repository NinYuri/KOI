import './DishCard.css';

function DishCard({image, name, description, price}) {
    return (
        <article className="dish-card">
            <div className="dish-image">
                <img src={image} alt={name} />
            </div>

            <div className="dish-body">
                <h3 className="dish-name">{name}</h3>
                <p className="dish-description">{description}</p>
                <span className="dish-price">${price}</span>
            </div>
        </article>
    )
}

export default DishCard;