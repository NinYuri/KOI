import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Locations from './sections/Locations';
import Menu from './sections/Menu';

import './App.css';

function App() {
  return (
    <main className="app">
      <Navbar />
      <Hero />
      <Locations />
      <Menu />
      
    </main>
  )
}

export default App
