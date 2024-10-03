import { useEffect, useState } from "react"

const ThemeComponent = () => {


    const [theme, setTheme] = useState<string>('dark')

    useEffect(() => {


        /*Añadir la clase HTML para usar las clases oscuras asignadas usando la herramientas 
        de clases de tailwiind (:dark)*/
        if(theme === 'dark'){
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

    }, [theme])

    const toggleTheme = () => {
        let selectedTheme = (theme === 'dark' ? 'light' : 'dark')
        setTheme(selectedTheme)
    }

    useEffect(() => {
        /*Asignamos el Atributo para tener un manejo global del tema actual */
        document.documentElement.setAttribute('theme', theme)
    }, [theme])


    return (
        <div className="px-2 py-2 w-20 mr-10">
            <button 
            className={`font-bold py-1 px-2 rounded-xl ${theme === 'dark' ? 
                'bg-white-brown text-dark-brown':
                'bg-dark-brown text-white-brown'
            }`}
            onClick={toggleTheme}>
                {theme === 'dark' ? 'dark' : 'light'}
            </button>   
        </div>
    )

}  

export default ThemeComponent