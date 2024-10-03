export interface PaginationDto {
    totalPages: number,
    currentPage: number,
    onPageChange: (newNumber: number) => void; 
}