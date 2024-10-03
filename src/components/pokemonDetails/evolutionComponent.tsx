import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { PokemonEvolutions } from "../../interface/pokemon.interface"

const EvolutionPokemonComponent = ({urlChain, onMajorEvolutionChange}: {urlChain: string, onMajorEvolutionChange: (lastEvolutionsNames: string[]) => void}) => {


    let evolutions: PokemonEvolutions[] = []

    let lastEvolutionsNames: string[] = []

    const [evolutionsPokemons, setEvolutionsPokemons] = useState<PokemonEvolutions[]>([]) 
    const [majorEvolution, setMajorEvolution] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const dataFetchedRef = useRef(false)


    useEffect(() => {

        const searchEvolutionsPokemons = async () => {

            if(dataFetchedRef.current) return; 
            dataFetchedRef.current = true; 
            try {
                setIsLoading(true)
                const evolutionsPokemon = await getEvolutionChain(urlChain)

                if(evolutions.length > 0){
                    setMajorEvolution(lastEvolutionsNames)
                    onMajorEvolutionChange(lastEvolutionsNames)
                } 
                setEvolutionsPokemons(evolutionsPokemon)
            } catch(error){
                throw new Error(`Error ${error}`)
            } finally {
                setIsLoading(false)
            }   
        }

        searchEvolutionsPokemons()


    }, [urlChain, onMajorEvolutionChange])


    const getEvolutionChain = async (url:string) => {
        const getEvolutionPokemonData = await axios.get(url)

        /*Obtener la información de la cadena evolutiva del pokemon */
        const chain = getEvolutionPokemonData.data.chain

        const enterToTheNextEvolution = async (evolution: any) => {
            
            if(evolution.species){
                let urlSpeciePokemon = evolution.species.url
                const specieEvolutionPokemonData = await axios.get(urlSpeciePokemon)
                const specie = specieEvolutionPokemonData.data

                if(evolution.evolves_to.length === 0){
                    /*Si el array tiene una longitud de 0 significa que es una evolución final 
                    así que lo asignamos al array */
                    lastEvolutionsNames.push(specie.name)
                }

                    /*Registrar la evolución para mostrar en la sección de evoluciones del detalle del pokemon */
                    evolutions.push({
                        name: specie.name || 'unknown', 
                        gender_diferences: specie.has_gender_differences || false,
                        legendary: specie.is_legendary || false,
                        mythical: specie.is_mythical || false,
                        habitat: specie.habitat?.name || 'unknown',
                        generation: specie.generation?.name || 'unknown',
                        isFinalEvolution: evolution.evolves_to.length === 0
                    })
    
                    for (const nextEvolution of evolution.evolves_to){

                        /*Si la evolución cuenta con más evoluciones entrar a la siguiente */
                        await enterToTheNextEvolution(nextEvolution)
                    }
            }
            
        }

        await enterToTheNextEvolution(chain)
        return evolutions

    }
       
    return (

        <div className="dark:bg-dark-brown bg-white-brown py-20">
            <p className="text-4xl font-bold font-press-start 
            text-dark-brown dark:text-white-brown pt-4">Evolutions: </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-content-center gap-10 py-10 px-4">
                {
                    evolutionsPokemons.map((evolution) => (
                        <div key={evolution.name} className="rounded py-6 px-4 bg-light-brown w-full h-full cursor-pointer">
                            <p className="text-dark-brown font-press-start text-2xl py-6">{evolution.name.toUpperCase()}</p>
                            <label htmlFor="" className="font-nanum text-2xl font-bold text-dark-brown">Habitat: </label>
                            <p className="font-nanum font-bold text-white-brown">{evolution.habitat}</p>
                            <label htmlFor="" className="font-nanum text-2xl font-bold text-dark-brown">Generation: </label>
                            <p className="font-nanum font-bold text-white-brown">{evolution.generation}</p>
                            <label htmlFor="" className="font-nanum text-2xl font-bold text-dark-brown">Gender Differences: </label>
                            <p className="font-nanum font-bold text-white-brown">{evolution.gender_diferences.toString()}</p>
                            <label htmlFor="" className="font-nanum text-2xl font-bold text-dark-brown">Mythic: </label>
                            <p className="font-nanum font-bold text-white-brown">{evolution.mythical.toString()}</p>
                            <label htmlFor="" className="font-nanum text-2xl font-bold text-dark-brown">Legendary: </label>
                            <p className="font-nanum font-bold text-white-brown" >{evolution.legendary.toString()}</p>
                            {evolution.isFinalEvolution && (
                                <p className="rounded-full px-4 py-2 inline-block 
                                font-press-start font-bold text-white-brown mt-4
                                transform hover:scale-105 transition-transform duration-300
                                shadow-lg hover:shadow-xl bg-medium-brown">Final Evolution</p>
                            )}
                        </div>
                    ))
                }

            </div>
        </div>
        
    )
}


export default  EvolutionPokemonComponent