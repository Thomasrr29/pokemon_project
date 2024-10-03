import axios from "axios"
import { useEffect, useRef, useState } from "react";
import { cardEvolutionMajor, CardsEvolution } from "../../interface/cardEvolution";

interface evolution {
    lastEvolutionsNames: string[]
}

const EvolutionCardsComponent  = ({lastEvolutionsNames}: evolution) => {

    const [isLoading, setIsLoading] = useState(true)

    /*Cards evolution sera un array en el que su clave sera el nombre de la evolución y 
    los objetos de ese Array interior serán las cartas obtenidas de esa evolución */
    const [cardsEvolution, setCardsEvolution] = useState<CardsEvolution>({})
    const [error, setError] = useState<string | null>('')
    const dataFetchedRef = useRef(false)

    useEffect(() => {

        const getCardsMajorEvolution = async () => {

            if(!lastEvolutionsNames || lastEvolutionsNames.length === 0) return null; 

            if(dataFetchedRef.current) return null
            dataFetchedRef.current = true

            setIsLoading(true)
            setError(null)
            const newCardsEvolution: CardsEvolution = {};

            try {
                /*Buscamos las cartas del Pokemon por medio de los nombres 
                de su mayor evolución */
                await Promise.all(lastEvolutionsNames.map(async(majorEvolutionName) => {
                    const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
                        params: {
                            q: `name:"${majorEvolutionName}"`
                        }
                    });

                    /*Asignamos la clave del objeto que va a ser el nombre de la evolución y 
                    guardamos el array de las cartas obtenidas*/
                    newCardsEvolution[majorEvolutionName] = response.data.data.map((card: any) => ({
                        id: card.id,
                        name: card.name,
                        number: card.number,
                        supertype: card.supertype,
                        types: card.types,
                        images: card.images,

                    }))
                }))

                
                /*Cambiamos el estado de las cartas con la nueva o nuevas evoluciones*/

                setCardsEvolution(newCardsEvolution)
                setIsLoading(false)

            } catch(error) {
                    if (axios.isAxiosError(error)) {
                      setError(error.response?.data || error.message);
                    } else {
                      setError('An unexpected error occurred');
                    }
                    console.error('Error fetching cards:', error);
                } finally {
                    setIsLoading(false);
                }
           

            
        }

        /*Llamamos la función cada vez que haya un cambio en Last Names, en este caso 
        cada vez que se seleccione una carta diferente*/
        getCardsMajorEvolution()

    }, [lastEvolutionsNames])


    if(isLoading){
        return <p 
        className="text-3xl font-bold py-20">
            Cargando Cartas...
        </p>
    }

    return (
        <div className="py-10 md:py-20 px-4 md:px-10 bg-light-brown">
            <div className="mb-8 text-center">
                <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl font-press-start text-dark-brown">Final Evolution Cards</h3>
            </div>
                {Object.entries(cardsEvolution).map(([evolutionName, cards]) => (
                    <div key={evolutionName} className="mb-8">
                        <h2 className="text-white-brown text-2xl font-bold font-press-start my-8 py-2 
                        bg-medium-brown">{evolutionName}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 
                        lg:grid-cols-3 gap-6 place-content-center justify-center">
                            {cards.map((card) => (
                                <div key={card.id}
                                    className="bg-light-brown rounded py-4 px-4 md:px-6 pokemon-card 
                                    float-animation w-full cursor-pointer dark:bg-dark-brown">
                                    <div className="shine-effect"></div>
                                    <div className="grid grid-cols-[60%_30%] my-2 md:my-4">
                                        <p className="px-2 md:px-4 font-semibold 
                                        font-press-start text-sm md:text-base lg:text-lg 
                                        w-full mx-0 text-white-brown truncate">{card.name}</p>
                                        <p className="font-semibold text-right
                                        font-press-start text-sm md:text-base lg:text-lg 
                                        w-full mx-0 text-dark-brown dark:text-light-brown">{card.number}</p>
                                    </div>
                                    <section className="flex justify-center items-center">
                                        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
                                            <img src={card.images.large} alt={card.name}
                                                className="w-full h-auto object-cover transition-transform duration-300
                                                hover:scale-105 hover:my-2" />
                                        </div>
                                    </section>
                                    <section className="flex flex-col sm:flex-row justify-around my-4 space-y-2 sm:space-y-0 gap-6">
                                        <div className="text-center sm:text-left">
                                            <label className="font-bold font-nanum text-sm md:text-base 
                                            text-white-brown block sm:inline">Supertipo: </label>
                                            <p className="dark:text-light-brown text-dark-brown font-nanum font-semibold 
                                            text-sm md:text-base">{card.supertype}</p>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <label className="font-bold font-nanum text-sm md:text-base 
                                            text-white-brown block sm:inline">Tipo: </label>
                                            {card.types.map((type, index) => (
                                                <p key={index} className="text-dark-brown dark:text-light-brown font-nanum font-semibold 
                                                text-sm md:text-base">{type}</p>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
     
    )
}


export default EvolutionCardsComponent