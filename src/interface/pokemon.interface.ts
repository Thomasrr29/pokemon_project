
export interface PokemonEvolutions {
    name: string,
    generation: string,
    habitat: string | undefined,
    gender_diferences: boolean,
    mythical: boolean,
    legendary: boolean
    isFinalEvolution: boolean,
}


export interface ImagePokemon {
    images: string[] | undefined
}



export interface InfoPokemon {
    types: string[],
    weight: number,
    height: number 
}


export interface PokemonDetailsDto {
    name: string,
    images: string[],
    types: string[],
    weight: number,
    height: number
    specie: any,
} 