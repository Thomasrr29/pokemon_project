import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/header';
import PokemonDetailsPage from './pages/pokemonDetailsPage';
import PokemonList from './components/pokemonList/pokemonList';
import WelcomeComponent from './components/welcome/welcomeComponent';



function App() {
  return (

    <BrowserRouter>
      <HeaderComponent></HeaderComponent>
      <Routes>

        <Route path='/' element={<WelcomeComponent></WelcomeComponent>}></Route>
        <Route path='/pokemons' element={<PokemonList></PokemonList>}></Route>
        <Route path='/pokemon/:name' element={<PokemonDetailsPage></PokemonDetailsPage>}></Route>

      </Routes>
      <Outlet></Outlet>
    </BrowserRouter>

  );
}

export default App;