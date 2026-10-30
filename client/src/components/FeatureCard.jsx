import './FeatureCard.css';

function FeatureCard({icon, title, text}) {
    return (
        <article className="feature-card">
            <div className="feature-icon">
                <img src={icon} alt="" />
            </div>
            
            <div className="feature-body">
                <h3 className="feature-title">{title}</h3>
                <p className="feature-description">{text}</p>
            </div>
        </article>
    )
}

export default FeatureCard;