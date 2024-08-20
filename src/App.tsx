import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pokemons from './pages/pokemons';
import Pokemon from './pages/pokemon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/pokemons/:id" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
