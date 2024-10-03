import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/header/header';
import PokemonDetailsPage from './pages/pokemonDetailsPage';
import WelcomeComponent from './components/welcome/welcomeComponent';
import PokemonsListPage from './pages/pokemonsPage';

function App() {
  return (
    
    <BrowserRouter>
      <HeaderComponent></HeaderComponent>
      <Routes>

        <Route path='/' element={<WelcomeComponent></WelcomeComponent>}></Route>
        <Route path='/pokemons' element={<PokemonsListPage></PokemonsListPage>}></Route>
        <Route path='/pokemon/:name' element={<PokemonDetailsPage></PokemonDetailsPage>}></Route>

      </Routes>
      <Outlet></Outlet>
    </BrowserRouter>

  );
}

export default App;