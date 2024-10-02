import React from "react"

const  WelcomeComponent: React.FC = () => {

    return (
        <div className="w-screen h-screen flex justify-center items-center relative overflow-hidden bg-black">

            <img src='https://wallpapersbq.com/images/pokemon/pokemon-wallpaper-1.webp' 
            alt="" className="absolute inset-0 w-full h-full opacity-35 object-cover"/>
            <h1 
            style={{textShadow: '2px 2px 2px rgba(255, 255, 255, 0.7)'}}
            className="relative z-10 px-4 font-extrabold text-3xl
            sm:text-4xl md:text-5xl  
            font-press-start text-center text-yellow-600 
            ">
                Bienvenido al mundo pokemon.....
            </h1>
        </div>
    );
}


export default WelcomeComponent