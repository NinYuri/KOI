import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Locations from './sections/Locations';
import Menu from './sections/Menu';
import Values from './sections/Values';
import Reviews from './sections/Reviews';
import Footer from './sections/Footer';

import './App.css';

function App() {
  return (
    <main className="app">
      <Navbar />
      <Hero />
      <Locations />
      <Menu />
      <Values />
      <Reviews />
      <Footer />
      
    </main>
  )
}

export default App
