import './Locations.css';

function Locations() {
    return (
        <section className="locations">
            <div className="first">
                <h1 className="city">México</h1>
                <p className="street">Calle Jardín Sakura 128, Col. Bosques del Sol</p>
            </div>

            <div className="second">
                <h1 className="city">Tokio</h1>
                <p className="street">2-14 Sakura Avenue, Shibuya-ku</p>
            </div>

            <div className="third">
                <h1 className="city">Canadá</h1>
                <p className="street">86 Maple Blossom Street, Vancouver</p>
            </div>
        </section>
    )
}

export default Locations;