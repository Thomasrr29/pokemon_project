import { useState } from "react"

interface Pagination {
    totalPages: number,
    currentPage: number,
    onPageChange: (newNumber: number) => void; 
}

const Pagination = (pagination: Pagination) => {

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
        
        <div className="w-full flex flex-col justify-center items-center py-10 bg-dark-brown gap-6">
            <div>
                <p className="font-bold">page: <span className="font-mono">{currentPage}</span></p>
                <p className="font-bold">Pages: <span className="font-mono">{totalPages}</span></p>
            </div>
            <div className="flex gap-6" >
                <button className="bg-light-brown rounded py-2 px-6 
                font-bold text-gray-900 hover:bg-medium-brown"
                onClick={handlePrev}
                disabled={currentPage === 1}>
                    Prev
                </button>
                <button className="bg-light-brown rounded py-2 px-6 
                font-bold text-gray-900 hover:bg-medium-brown"
                onClick={handleNext}
                disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            
        </div>
    )
}


export default Pagination 
