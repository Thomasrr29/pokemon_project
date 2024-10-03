import { useEffect, useState } from "react"

const ThemeComponent = () => {


    const [theme, setTheme] = useState<string>('dark')

    useEffect(() => {

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
        document.documentElement.setAttribute('theme', theme)
    }, [theme])


    return (
        <div className="px-4 py-2 w-20 mr-10">
            <button 
            className={`font-bold py-1 px-4 rounded-xl ${theme === 'dark' ? 
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