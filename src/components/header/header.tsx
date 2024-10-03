import { Link} from "react-router-dom"
import ThemeComponent from "./theme"


const HeaderComponent = () => {

    return (
        <div>
            <nav className="w-full py-10 bg-white-brown dark:bg-dark-brown flex items-center" >
                <Link to={'/'} className="w-full flex justify-center">
                    <div className="">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/640px-International_Pok%C3%A9mon_logo.svg.png"
                            alt="" className="w-40" />
                    </div>
                </Link>

                <div className="flex gap-10">
                    <Link to={'/pokemons'}>
                        <a href=""
                            className="font-bold dark:text-light-brown text-dark-brown text-xs hover:bg-light-brown dark:hover:bg-white-brown 
                                py-2 px-2 rounded-2xl font-press-start mx-6 sm:text-sm lg:text-lg">Pokemones</a>
                    </Link>
                </div>
                <ThemeComponent></ThemeComponent>
            </nav>
        </div>
    )
}


export default HeaderComponent