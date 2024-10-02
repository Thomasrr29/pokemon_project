
export interface PokemonEvolutions {
    name: string,
    generation: string,
    habitat: string,
    gender_diferences: boolean,
    mythical: boolean,
    legendary: boolean
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