import { PaginationDto } from "../../interface/paginationInterface"


const Pagination = (pagination: PaginationDto) => {

    const {totalPages, currentPage, onPageChange} = pagination 

    const handlePrev = () => {

        if(currentPage > 1){
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {

        if(currentPage < totalPages){
            onPageChange(currentPage + 1)
        }
    }

    return (
        
        <div className="w-full flex flex-col justify-center items-center py-10 bg-white-brown dark:bg-dark-brown gap-6">
            <div>
                <p className="font-bold text-dark-brown dark:text-white-brown">page: <span className="font-bold text-medium-brown">{currentPage}</span></p>
                <p className="font-bold text-dark-brown dark:text-white-brown">Pages: <span className="font-bold text-medium-brown">{totalPages}</span></p>
            </div>
            <div className="flex gap-6" >
                <button className="bg-medium-brown rounded py-2 px-6 
                font-bold text-white-brown hover:bg-dark-brown"
                onClick={handlePrev}
                disabled={currentPage === 1}>
                    Prev
                </button>
                <button className="bg-medium-brown rounded py-2 px-6 
                font-bold text-white-brown hover:bg-dark-brown"
                onClick={handleNext}
                disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            
        </div>
    )
}


export default Pagination 
