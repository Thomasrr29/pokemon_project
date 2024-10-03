import { useState } from "react"
import PokemonList from "../components/pokemonList/pokemonList"
import SearchComponent from "../components/pokemonList/searchComponent"
import { Pokemon } from "../interface/pokemons.info.interface"


const PokemonsListPage = () => {

    const [searchResults, setSearchResults] = useState<Pokemon[]>([])

    return (
        <div>
            <SearchComponent onSearchResults={setSearchResults} ></SearchComponent>
            <PokemonList pokemon={searchResults}></PokemonList>
        </div>
    )
}


export default PokemonsListPage