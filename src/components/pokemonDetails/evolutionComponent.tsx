import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { PokemonEvolutions } from "../../interface/pokemon.interface"

const EvolutionPokemonComponent = ({urlChain, onMajorEvolutionChange}: {urlChain: string, onMajorEvolutionChange: (evolution: string) => void}) => {


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

        <div className="bg-medium-brown py-10 md:py-20 px-4 md:px-8">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold font-press-start text-center mb-6 md:mb-10">Evoluciones: </p>
            <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
                {evolutionsPokemons.map((evolution) => (
                    <div key={evolution.name} 
                        className="rounded py-4 md:py-6 px-4 bg-light-brown w-full md:w-2/5 lg:w-1/4 
                                    hover:bg-white-brown cursor-pointer transition duration-300 ease-in-out">
                        <p className="font-press-start text-lg md:text-xl lg:text-2xl py-3 md:py-4 text-center">
                            {evolution.name.toUpperCase()}
                        </p>
                        <div className="space-y-2 md:space-y-3">
                            <div>
                                <label className="font-nanum text-lg md:text-xl font-bold text-dark-brown block">Habitat: </label>
                                <p className="font-nanum font-semibold">{evolution.habitat}</p>
                            </div>
                            <div>
                                <label className="font-nanum text-lg md:text-xl font-bold text-dark-brown block">Generación: </label>
                                <p className="font-nanum font-semibold">{evolution.generation}</p>
                            </div>
                            <div>
                                <label className="font-nanum text-lg md:text-xl font-bold text-dark-brown block">Diferencias género: </label>
                                <p className="font-nanum font-semibold">{evolution.gender_diferences.toString()}</p>
                            </div>
                            <div>
                                <label className="font-nanum text-lg md:text-xl font-bold text-dark-brown block">Mítico: </label>
                                <p className="font-nanum font-semibold">{evolution.mythical.toString()}</p>
                            </div>
                            <div>
                                <label className="font-nanum text-lg md:text-xl font-bold text-dark-brown block">Legendario: </label>
                                <p className="font-nanum font-semibold">{evolution.legendary.toString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    )
}


export default  EvolutionPokemonComponent