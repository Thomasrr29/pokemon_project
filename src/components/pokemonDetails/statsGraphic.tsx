import { Stat } from "../../interface/statInterface"

const StatsGraphicsComponent = ({stats}: {stats: any}) => {

    /*Recopilar las estadisticas del pokemon seleccionado en la sección de información general */
    return (
        <div className="w-screen sm:w-screen lg:w-screen bg-light-brown px-8 gap-3 h-full py-2" >
            {
                stats.map((stat: Stat) => (
                    <div className={`flex justify-between w-[${stat.base_stat}px]
                     bg-medium-brown rounded dark:bg-dark-brown my-1`}>
                        <p className="mx-4 font-bold text-white-brown">{stat.base_stat}</p>
                        <p className="mx-4 font-bold text-white-brown">{stat.stat.name}</p>
                    </div>
                ))
            }
        </div>
    )
}


export default StatsGraphicsComponent