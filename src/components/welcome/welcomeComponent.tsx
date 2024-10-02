import React from "react"

const  WelcomeComponent: React.FC = () => {

    return (
        <div className="w-full h-screen justify-center items-center bg-black">

            <img src='https://wallpapersbq.com/images/pokemon/pokemon-wallpaper-1.webp' 
            alt="" className="h-screen absolute w-full opacity-45"/>
            <h1 
            style={{textShadow: '2px 2px 2px rgba(255, 255, 255, 0.7)'}}
            className="relative left-50 font-extrabold text-5xl 
            font-press-start top-72 text-center text-yellow-600 
            ">
                Bienvenido al mundo pokemon.....
            </h1>
        </div>
    );
}


export default WelcomeComponent