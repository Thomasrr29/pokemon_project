import { Link, Router, Route, Routes, BrowserRouter } from "react-router-dom"
import WelcomeComponent from "./welcome/welcomeComponent"
import PokemonList from "./pokemonList/pokemonList"
import PokemonDetailsPage from "../pages/pokemonDetailsPage"


const HeaderComponent = () => {

    return (
        <BrowserRouter>
            <nav className="w-full py-10 bg-dark-brown flex items-center" >
                <Link to={'/'} className="w-full flex justify-center">
                    <div className="">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/640px-International_Pok%C3%A9mon_logo.svg.png"
                            alt="" className="w-40" />
                    </div>
                </Link>

                <div className="flex px-60 gap-10">
                    <Link to={'/pokemons'}>
                        <a href=""
                            className="font-bold text-light-brown text-lg hover:bg-white-brown 
                                py-2 px-6 rounded-2xl font-press-start">Pokemones</a>
                    </Link>
                </div>
            </nav>

            <Routes>

                <Route path='/' element={<WelcomeComponent></WelcomeComponent>}></Route>
                <Route path='/pokemons' element={<PokemonList></PokemonList>}></Route>
                <Route path='/pokemon/:name' element={<PokemonDetailsPage></PokemonDetailsPage>}></Route>

            </Routes>

        </BrowserRouter>
    )
}


export default HeaderComponent