import axios from 'axios'

export const getDetailsPokemonTypeAndUrl = async (url: string) => {

    const detailsPokemon = await axios.get(url)
    let types: string[] = []

    for(let pokemonType of detailsPokemon.data.types){
        
        types.push(pokemonType.type.name)
    }

    return {
        name: detailsPokemon.data.name,
        img: detailsPokemon.data.sprites.front_default,
        type: types
    }
    
}
