import axios from "axios"
import { useEffect, useRef, useState } from "react";
import { cardEvolutionMajor } from "../../interface/cardEvolution";

interface evolution {
    evolution: string
}

const EvolutionCardsComponent  = ({evolution}: evolution) => {

    const [isLoading, setIsLoading] = useState(true)
    const [cardsEvolution, setCardsEvolution] = useState<cardEvolutionMajor[]>([])
    const [error, setError] = useState<string | null>('')
    const dataFetchedRef = useRef(false)
    

    let cardsEvolutionList: cardEvolutionMajor[] = []

    useEffect(() => {

        const getCardsMajorEvolution = async () => {

            if(!evolution) return null; 

            if(dataFetchedRef.current) return null
            dataFetchedRef.current = true

            setIsLoading(true)
            setError(null)

            try {
                const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
                    params: {
                        q: `name:"${evolution}"`
                    }
                });

                let cards = response.data


                for(const card of cards.data){

                    cardsEvolutionList.push({
                        id: card.id,
                        name: card.name,
                        number: card.number,
                        supertype: card.supertype,
                        types: card.types,
                        images: card.images,
                    })
                }

                setCardsEvolution(cardsEvolutionList)
                setIsLoading(false)


            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error en la solicitud:', error.response?.data || error.message);
                } else {
                    console.error('Error inesperado:', error);
                }
                throw error;
            }
        }
        getCardsMajorEvolution()
    }, [evolution])


    if(isLoading){
        return <p 
        className="text-3xl font-bold py-20">
            Cargando Cartas...
        </p>
    }

    return (
        <div className="py-10 md:py-20 px-4 md:px-10">
            <div className="mb-8 text-center">
                <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl font-press-start">Cartas</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-20">
                {cardsEvolution.map((card) => (
                    <div key={card.id} 
                        className="bg-light-brown rounded py-4 px-4 md:px-6 pokemon-card 
                                float-animation w-full cursor-pointer">
                        <div className="shine-effect"></div>
                        <div className="grid grid-cols-[60%_30%] my-2 md:my-4">
                            <p className="px-2 md:px-4 font-semibold 
                                        font-press-start text-sm md:text-base lg:text-lg 
                                        w-full mx-0 text-white-brown truncate">{card.name}</p>
                            <p className="font-semibold text-right
                                        font-press-start text-sm md:text-base lg:text-lg 
                                        w-full mx-0 text-dark-brown">{card.number}</p>
                        </div>
                        <section className="flex justify-center items-center">
                            <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
                                <img src={card.images.large} alt={card.name}
                                    className="w-full h-auto object-cover transition-transform duration-300
                                                hover:scale-105 hover:my-2" />
                            </div>
                        </section>
                        <section className="flex flex-col sm:flex-row justify-around my-4 space-y-2 sm:space-y-0">
                            <div className="text-center sm:text-left">
                                <label className="font-bold font-nanum text-sm md:text-base 
                                                text-white-brown block sm:inline">Supertipo: </label>
                                <p className="text-dark-brown font-nanum font-semibold 
                                            text-sm md:text-base">{card.supertype}</p>
                            </div>
                            <div className="text-center sm:text-left">
                                <label className="font-bold font-nanum text-sm md:text-base 
                                                text-white-brown block sm:inline">Tipo: </label>
                                {card.types.map((type, index) => (
                                    <p key={index} className="text-dark-brown font-nanum font-semibold 
                                                            text-sm md:text-base">{type}</p>
                                ))}
                            </div>
                        </section>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default EvolutionCardsComponent