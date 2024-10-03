import { InfoPokemon } from "../../interface/pokemon.interface"

const GeneralInfoPokemonComponent = (infoPokemon: InfoPokemon) => {
    
    const {types, weight, height} = infoPokemon

    return (
        <div className="w-screen sm:w-screen lg:w-screen h-full">
            <div className="bg-light-brown py-8 flex justify-center gap-10">
                <div className="bg-medium-brown rounded py-4 px-3 w-1/4 
                hover:bg-dark-brown cursor-pointer dark:bg-dark-brown" >
                    <p className="text-white-brown font-press-start text-sm font-bold my-4"> Type </p>
                    <div className="flex  flex-col justify-center items-center">
                        {
                            types.map((type) => (
                                <p
                                key={type} 
                                className="font-nanum text-2xl 
                                rounded-xl text-white-brown font-bold
                                ">{type}</p>
                            ))
                        }
                    </div>
                </div>
                <div className="bg-medium-brown rounded py-4 px-3 w-1/4 
                hover:bg-dark-brown cursor-pointer dark:bg-dark-brown">
                    <p className="text-white-brown font-press-start text-sm sm:text-xl font-bold my-4 ">Weight </p>
                    <div className="flex justify-center items-center">
                        {
                            <p className="font-nanum text-2xl 
                            text-white-brown font-bold">{weight}</p>
                        }
                    </div>
                </div>
                <div className="bg-medium-brown rounded py-4 px-3 w-1/4 
                hover:bg-dark-brown cursor-pointer dark:bg-dark-brown">
                    <p className=" text-white-brown font-press-start text-sm font-bold my-4 ">Height </p>
                    <div className="flex justify-center items-center">
                        {
                            <p className="font-nanum text-2xl
                            text-white-brown font-bold">{height}</p>
                        }
                    </div>
                </div> 
            </div>
        </div>
    )
} 


export default GeneralInfoPokemonComponent