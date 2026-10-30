import FeatureCard from '../components/FeatureCard';
import ingredient from '../assets/IconFish.webp';
import cook from '../assets/IconCook.webp';
import check from '../assets/IconCheck.webp';
import house from '../assets/IconHouse.webp';
import doodle from '../assets/SecDoodle.webp';
import './Values.css';

const features = [
    {
        id: 1,
        icon: ingredient,
        title: 'INGREDIENTES FRESCOS',
        text: 'Seleccionamos cuidadosamente nuestros ingredientes para ofrecerte sabores auténticos.'
    },
    {
        id: 2,
        icon: cook,
        title: 'PREPARADO AL MOMENTO',
        text: 'Cada pedido se prepara con esmero para que disfrutes de la textura, el sabor y la calidad en cada pieza.'
    },
    {
        id: 3,
        icon: check,
        title: 'RECETAS ORIGINALES',
        text: 'Combinamos inspiración japonesa, ingredientes especiales y sabores únicos para disfrutar.'
    },
    {
        id: 4,
        icon: house,
        title: 'ENTREGA A DOMICILIO',
        text: 'Empacamos cada pedido con atención para que disfrutes tus platillos favoritos donde quieras.'
    }
]

function Values() {
    return (
        <section className="values-section section">
            <img className="hand-doodle" src={doodle} alt="Sushi Doodle" />
            
            <p className="decorator">MÁS QUE SUSHI</p>
            <h1 className="section-name">El Toque <span>Koi</span></h1>
            <p className="section-description">Pequeños detalles que hacen de cada visita una experiencia especial.</p>

            <div className="features-grid">
                {features.map((f) => (
                    <FeatureCard key={f.id} {...f} />
                ))}
            </div>
        </section>
    )
}

export default Values;