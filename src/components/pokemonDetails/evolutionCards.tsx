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
        <div className="py-20 ">
            <div>
                <h3 className="font-bold text-4xl font-press-start">Cartas</h3>
            </div>
            <div className="grid grid-cols-3 gap-20 w-90 px-20 py-24 cursor-pointer">

                {
                    cardsEvolution.map((card) => (
                        <div key={card.id} 
                        className="bg-light-brown rounded py-4 px-6 pokemon-card 
                        float-animation w-full">
                            <div className="shine-effect"></div>
                            <div className="grid grid-cols-[70%_10%] my-4">
                                <p className="px-10 font-semibold 
                                font-press-start text1xl w-full mx-0 text-white-brown">{card.name}</p>
                                <p className="font-semibold 
                                font-press-start text-1xl w-full mx-0 text-dark-brown">{card.number}</p>
                            </div>
                            <section className="flex justify-center items-center">
                                <div>
                                    <img src={card.images.large} alt={card.name}
                                    className="w-80 object-cover transition-trasform duration-300
                                    hover:scale-110 hover:my-4" />
                                </div>
                            </section>
                            <section className="flex justify-around my-4">
                                <div>
                                    <label htmlFor="" className="font-bold font-nanum hide-text 
                                    text-white-brown">Supertipo: </label>
                                    <p className=" text-dark-brown font-nanum font-semibold">{card.supertype}</p>
                                </div>
                                <div>
                                    <label htmlFor="" className="font-bold font-nanum hide-text 
                                    text-white-brown"> Tipo: </label>
                                    {
                                        card.types.map((type) => (
                                            <p className=" text-dark-brown font-nanum font-semibold">{type}</p>
                                        ))
                                    }
                                </div>
                                
                            </section>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}


export default EvolutionCardsComponent