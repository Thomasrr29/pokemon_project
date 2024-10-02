export interface pokemonEvolutionDto {

}

export interface PokemonEvolutions {
    name: string,
    generation: string,
    habitat: string,
    gender_diferences: boolean,
    mythical: boolean,
    legendary: boolean
}



export interface infoPokemon {
    types: string[],
    weight: number,
    height: number 
}


export interface pokemonDetailsDto {
    name: string,
    images: string[],
    types: string[],
    weight: number,
    height: number
    specie: any,

} 