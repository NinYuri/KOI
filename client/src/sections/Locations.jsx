import './Locations.css';

function Locations() {
    return (
        <section className="locations">
            <div className="locations-first">
                <h1 className="loc-city">México</h1>
                <p className="loc-street">Calle Jardín Sakura 128, Col. Bosques del Sol</p>
            </div>

            <div className="locations-second">
                <h1 className="loc-city">Tokio</h1>
                <p className="loc-street">2-14 Sakura Avenue, Shibuya-ku</p>
            </div>

            <div className="locations-third">
                <h1 className="loc-city">Canadá</h1>
                <p className="loc-street">86 Maple Blossom Street, Vancouver</p>
            </div>
        </section>
    )
}

export default Locations;