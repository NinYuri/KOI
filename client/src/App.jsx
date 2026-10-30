import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Locations from './sections/Locations';
import Menu from './sections/Menu';
import Values from './sections/Values';

import './App.css';

function App() {
  return (
    <main className="app">
      <Navbar />
      <Hero />
      <Locations />
      <Menu />
      <Values />
      
    </main>
  )
}

export default App
