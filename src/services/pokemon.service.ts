import axios from 'axios'
import { PokemonDetailsDto } from '../interface/pokemon.interface'

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

export const getDetailsPokemon = async (url: string): Promise<PokemonDetailsDto> => {

    const detailsPokemon = await axios.get(url)

    if(!detailsPokemon){
        throw new Error(`Error con la petición de pokemones`)
    }

    let types: string[] = []

    for(let pokemonType of detailsPokemon.data.types){
        
        types.push(pokemonType.type.name)
    }

    const urlForGetPokemonSpecie = detailsPokemon.data.species.url 

    const specie = await axios.get(`${urlForGetPokemonSpecie}`)
    const images = extractImagesDetailsPokemon(detailsPokemon.data.sprites)

    return {
        name: detailsPokemon.data.name,
        weight: detailsPokemon.data.weight,
        height: detailsPokemon.data.height,
        images: images,
        specie: specie.data.evolution_chain.url,
        types,
        stats: detailsPokemon.data.stats,
    }
}

function extractImagesDetailsPokemon(object: any): string[]{


    let images: string[] = []

    if(!object){
        throw new Error(`Please send a valid object for get the images`)
    }

    for (const [key, value] of Object.entries(object)) {
        if (typeof value === 'string' && key !== 'other') {
          images.push(value);
        }
      }
    

    return images.slice(0, 7)
}

