import { InfoPokemon } from "../../interface/pokemon.interface"

const GeneralInfoPokemonComponent = (infoPokemon: InfoPokemon) => {
    
    const {types, weight, height} = infoPokemon

    return (
        <div>
            <div className="bg-medium-brown py-8 flex justify-center gap-10">
                <div className="bg-light-brown rounded py-4 px-3 w-1/4 hover:bg-white-brown cursor-pointer" >
                    <p className="font-press-start text-sm font-bold my-4"> Type </p>
                    <div className="flex  flex-col justify-center items-center">
                        {
                            types.map((type) => (
                                <p
                                key={type} 
                                className="font-nanum text-2xl 
                                rounded-xl text-dark-brown font-bold
                                ">{type}</p>
                            ))
                        }
                    </div>
                </div>
                <div className="bg-light-brown rounded py-4 px-3 w-1/4 hover:bg-white-brown cursor-pointer">
                    <p className="font-press-start text-sm sm:text-xl font-bold my-4 ">Weight </p>
                    <div className="flex justify-center items-center">
                        {
                            <p className="font-nanum text-2xl 
                            text-dark-brown font-bold">{weight}</p>
                        }
                    </div>
                </div>
                <div className="bg-light-brown rounded py-4 px-3 w-1/4 hover:bg-white-brown cursor-pointer">
                    <p className="font-press-start text-sm font-bold my-4 ">Height </p>
                    <div className="flex justify-center items-center">
                        {
                            <p className="font-nanum text-2xl
                            text-dark-brown font-bold">{height}</p>
                        }
                    </div>
                </div> 
            </div>
        </div>
    )
} 


export default GeneralInfoPokemonComponent