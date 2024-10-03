import React from "react"

const  WelcomeComponent: React.FC = () => {

    return (
        <div className="w-screen h-screen flex justify-center items-center relative 
        overflow-hidden dark:bg-black bg-medium-brown">

            <img src='https://wallpapersbq.com/images/pokemon/pokemon-wallpaper-1.webp' 
            alt="" className="absolute inset-0 w-full h-full opacity-35 object-cover"/>
            <h1 
            // style={{textShadow: '4px 4px 6px rgba(255, 255, 255, 0.7)'}}
            className="relative z-10 px-4 py-6 font-extrabold text-3xl
            sm:text-4xl md:text-5xl  
            font-press-start text-center 
            text-white-brown bg-dark-brown
            dark:text-dark-brown dark:bg-white-brown 
            ">
                Bienvenido al mundo pokemon.....
            </h1>
        </div>
    );
}


export default WelcomeComponent