import axios from "axios"
import { useEffect, useState } from "react"
import { getDetailsPokemonTypeAndUrl } from "../../services/pokemon.service"
import Pagination from "./pagination"
import { useNavigate } from "react-router-dom"
import { Pokemon } from "../../interface/pokemons.info.interface"


const PokemonList = () => {


    const [pokemonData, setPokemonData] = useState<Pokemon[]>([])
    const [totalPokemons, setTotalPokemons] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)


    let limit = 21
    let totalPages = Math.ceil(totalPokemons / limit)

    
    const BASE_URL_ALL_POKEMON: string = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${currentPage * limit}`


    const getPokemonsList = async () => {

        try {
        
            const response = await axios.get(`${BASE_URL_ALL_POKEMON}`)

            setTotalPokemons(response.data.count)
  
            let pokemonsDataForShow: Pokemon[] = [] 

            let pokemonData = response.data.results

            let pokemonDaticos: Pokemon = {
                name: '',
                img: '',
                url: '',
                types: ['', '']
            } 
            
            for(let pokemon of pokemonData){

                const detailsPokemon = await getDetailsPokemonTypeAndUrl(pokemon.url)
                
                pokemonDaticos = {
                    name: pokemon.name,
                    img: detailsPokemon.img,
                    types: detailsPokemon.type,
                    url: pokemon.url
                }

                pokemonsDataForShow.push(pokemonDaticos)

            }

            setPokemonData(pokemonsDataForShow)

        } catch(error){
    
            console.error(error)
        }
    }

    const navigate = useNavigate()

    const redirectToDetails = async (event: React.MouseEvent<HTMLElement>) => {

        const name = event.currentTarget.getAttribute('pokemon-name')

        if(name){
            navigate(`/pokemon/${name}`)
        } else {
            console.error(`THE POKEMON NAME WASN'T SEND`)
        }

    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    useEffect(() => {

        getPokemonsList()

    }, [BASE_URL_ALL_POKEMON])


    return (
        <div> 
                <section className="w-full grid grid-cols-1 px-10 py-6 bg-light-brown gap-y-10 md:grid-cols-2 md:py-10 lg:grid-cols-3 lg:py-20 place-items-center">
                { pokemonData?
                    (pokemonData.map(pokemon => (
                            <div className="flex flex-col bg-white-brown dark:bg-dark-brown rounded-xl w-80 px-6 py-4 
                                cursor-pointer pokemon-card"
                                pokemon-name={pokemon.name} 
                                key={pokemon.name}
                                onClick={redirectToDetails}
                            > 
                                <div>
                                    <img
                                    className="w-80 rounded bg-medium-brown" 
                                    src={pokemon.img} alt="" />
                                </div>
                                <div className="my-4 mx-4">
                                    <p className="text-2xl font-nanum 
                                    dark:text-white-brown text-dark-brown">{pokemon.name}</p>
                                    <div className="flex gap-4 items-center py-4">
                                    {
                                        pokemon.types.map(type => (
                                            <p key={type}
                                            className="bg-medium-brown py-1 px-4 
                                            rounded-xl text-white-brown font-nanum font-semibold">
                                                {type}
                                            </p>
                                        ))
                                    }
                                    </div>
                                </div>
                            </div>
                    ))) 
                    : (<p className="text-4xl font-nanum text-gray-700">No hay Pokemones disponibles 
                    <br></br><span>Intenta de nuevo</span></p>)     
                }  
             </section>
            {
                totalPages > 1 ?
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}/>     
                    : null
            }
        </div>
    )
}


export default PokemonList