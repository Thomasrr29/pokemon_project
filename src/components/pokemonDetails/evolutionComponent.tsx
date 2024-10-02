import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { PokemonEvolutions } from "./interface/pokemon.interface"


const EvolutionPokemonComponent: React.FC<{urlChain: string, onMajorEvolutionChange: (evolution: string) => void}> = ({urlChain, onMajorEvolutionChange}) => {


    let evolutions: PokemonEvolutions[] = []

    const [evolutionsPokemons, setEvolutionsPokemons] = useState<PokemonEvolutions[]>([]) 
    const [majorEvolution, setMajorEvolution] = useState<string>('')
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
                    let lastEvolutionName = evolutions[evolutions.length - 1].name
                    setMajorEvolution(lastEvolutionName)
                    onMajorEvolutionChange(lastEvolutionName)
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
        const chain = getEvolutionPokemonData.data.chain

        const enterToTheNextEvolution = async (evolution: any) => {
            
            if(evolution.species){
                let urlSpeciePokemon = evolution.species.url
                const specieEvolutionPokemonData = await axios.get(urlSpeciePokemon)
                const specie = specieEvolutionPokemonData.data



                    evolutions.push({
                        name: specie.name,
                        gender_diferences: specie.has_gender_differences,
                        legendary: specie.is_legendary,
                        mythical: specie.is_mythical,
                        habitat: specie.habitat.name,
                        generation: specie.generation.name
                    })
    
                    for (const nextEvolution of evolution.evolves_to){
                        await enterToTheNextEvolution(nextEvolution)
                    }
            }
            
        }

        
        await enterToTheNextEvolution(chain)
        return evolutions

    }
       
    return (

        <div className="bg-medium-brown py-20">
            <p className="text-4xl font-bold font-press-start">Evoluciones: </p>
            <div className="flex justify-center gap-10 py-10">
                {
                    evolutionsPokemons.map((evolution) => (
                        <div key={evolution.name} className="rounded py-6 px-4 bg-light-brown w-1/4 h-full hover:bg-white-brown cursor-pointer">
                            <p className="font-press-start text-2xl py-6">{evolution.name.toUpperCase()}</p>
                            <label htmlFor="" className="font-bold text-2xl">Habitat: </label>
                            <p>{evolution.habitat}</p>
                            <label htmlFor="" className="font-bold text-2xl">Generación: </label>
                            <p>{evolution.generation}</p>
                            <label htmlFor="" className="font-bold text-2xl">Diferencias genero: </label>
                            <p>{evolution.gender_diferences.toString()}</p>
                            <label htmlFor="" className="font-bold text-2xl">Mitico: </label>
                            <p>{evolution.mythical.toString()}</p>
                            <label htmlFor="" className="font-bold text-2xl">Legendario: </label>
                            <p>{evolution.legendary.toString()}</p>
                        </div>
                    ))
                }

            </div>
        </div>
        
    )
}


export default  EvolutionPokemonComponent