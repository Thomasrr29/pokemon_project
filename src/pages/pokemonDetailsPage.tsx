import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDetailsPokemon } from "../services/pokemon.service"
import { PokemonDetailsDto } from "../interface/pokemon.interface"
import ImagePokemonComponent from "../components/pokemonDetails/imagePokemon"
import GeneralInfoPokemonComponent from "../components/pokemonDetails/infoGeneral"
import EvolutionPokemonComponent from "../components/pokemonDetails/evolutionComponent"
import EvolutionCardsComponent from "../components/pokemonDetails/evolutionCards"
import StatsGraphicsComponent from "../components/pokemonDetails/statsGraphic"


const PokemonDetailsPage = () => {

    const BASE_POKEMON_DETAILS = 'https://pokeapi.co/api/v2/pokemon'

    const {name} = useParams<{name: string}>()

    const [majorEvolution, setMajorEvolution] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [pokemonInfo, setPokemonInfo] = useState<PokemonDetailsDto | null>(null)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {

        const GetDetailsCard = async () => {
 
            if(!name){
                setError(`Pokemon name is missing, please try again`)
                setIsLoading(false)
                throw new Error(`Pokemon name for get details doesn't exists`)
            }
    
            try {
                setIsLoading(true)
                setError(null)


                /*Buscar todos los detalles del pokemon por medio de su nombre */
                const [pokemonDetails] = await Promise.all([
                    getDetailsPokemon(`${BASE_POKEMON_DETAILS}/${name}`)
                ])
        
                if(!pokemonDetails){
                    throw new Error(`ISSUE GETTING THE POKEMON DETAILS, please try again`)
                }
                
                /*Asignar la información obtenido al estado para repartir a los componentes hijos */
                setPokemonInfo(pokemonDetails)
            
            } catch(error){
                setError(error instanceof Error ? error.message : "Unexpected issue, please try again")
            } finally {
                setIsLoading(false)
            }
        
        }

        GetDetailsCard()
      
    }, [name])


    /* Creamos esta función para recibir el valor de las máximas evoluciones del componente 
    EvolutionPokemonComponent y pasarle el valor a EvolutionCardsComponent 
    */

    /*⚠️Evaluar el beneficio de useCallback  */
    const handleMajorEvolutionChange = useCallback((lastEvolutionsNames: string[]) => {
        setMajorEvolution(lastEvolutionsNames)
    }, [])

    if(!pokemonInfo){
        return null
    }
   
    
    if(error){
        return <div>Error: {error}</div>
    }

    if(isLoading){
        return <p>Cargando ...</p>
    }

    return (
        <div className="w-full flex flex-col">         
                <section className="w-full py-20 bg-light-brown dark:bg-medium-brown">
                    <div className="w-full justify-center text-center">
                        <h2 className="text-center font-bold font-press-start
                        text-5xl my-10 dark:text-white-brown text-dark-brown">{pokemonInfo.name}</h2>

                        <ImagePokemonComponent 
                        images={pokemonInfo.images}></ImagePokemonComponent>

                        <div className="flex flex-col sm:flex-row lg:flex-row w-screen">
                            <GeneralInfoPokemonComponent 
                            types={pokemonInfo.types} 
                            weight={pokemonInfo.weight} 
                            height={pokemonInfo.height}></GeneralInfoPokemonComponent>
                            <StatsGraphicsComponent stats={pokemonInfo.stats}></StatsGraphicsComponent>
                        </div>
                       
                        <EvolutionPokemonComponent 
                        urlChain={pokemonInfo.specie}
                        onMajorEvolutionChange={handleMajorEvolutionChange}></EvolutionPokemonComponent>
                        <EvolutionCardsComponent 
                        lastEvolutionsNames={majorEvolution}></EvolutionCardsComponent>

                        
                    </div>
                </section>  
        </div>
    )
}


export default PokemonDetailsPage