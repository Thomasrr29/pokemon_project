import { ImagePokemon } from "../../interface/pokemon.interface"



const ImagePokemonComponent = ({images}: ImagePokemon) => {
    return (
        <div>
            {
                images ?
                <div className="w-full flex justify-center">
                {images.map((image: string) => (
    
                    <img src={image} 
                    key={image}
                    className="w-1/6 h-1/6 hover:scale-110 
                    transform transition duration-300 ease-in-out" />
                ))
                }
                </div> : 
                <p className="text-2xl font-press-start py-20">Cargando imagenes...</p>
            }
        </div>
       
    )
}


export default ImagePokemonComponent