import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TableCanProps<T> {
    heading?: string;
    ButtonName?: string;
    ButtonLink?: string;
    headerTr: string[];
    dataTr: T[];
    TrName: React.ElementType;
    showHeading?: boolean;
    TrPropsName?: Record<string, any>;
}

const TableCan = <T,>({
    heading,
    headerTr,
    dataTr,
    TrName,
    showHeading = false,
    TrPropsName = {}
}: TableCanProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Ensure dataTr is always an array (prevents errors)
    const safeData = Array.isArray(dataTr) ? dataTr : [];

    // Pagination Logic
    const totalPages = Math.ceil(safeData.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = safeData.slice(startIndex, endIndex);

    // Handle items per page change
    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = parseInt(e.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    // Get page numbers to display (always show 5 if possible)
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
            let endPage = startPage + maxPagesToShow - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxPagesToShow + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    return (
        <div className="rounded-xl bg-white shadow-md shadow-gray-400">
            {showHeading && (
                <div className="flex items-center justify-between gap-2 p-4">
                    <h1 className="text-2xl font-semibold capitalize">{heading}</h1>
                </div>
            )}
            <div className="overflow-x-auto overflow-y-visible">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-200 text-black capitalize">
                        <tr>
                            <th className="p-2 py-4 w-10">
                                <input type="checkbox" />
                            </th>
                            {headerTr.map((item, index) => (
                                <th
                                    key={index}
                                    className={`p-2 py-4 font-semibold ${item.toLowerCase() === "actions" ? "text-center" : "text-left"
                                        } capitalize`}
                                >
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((data, index) => {
                                return <TrName key={index} displayData={data} {...TrPropsName} />;
                            })
                        ) : (
                            <tr>
                                <td colSpan={headerTr.length + 1} className="text-center py-4 px-4">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Updated Pagination Component with Items Per Page Dropdown */}
            {safeData.length > 0 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">


                    <div className="flex-1 flex justify-between sm:hidden">
                        {/* Mobile pagination */}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{Math.min(safeData.length, 1 + (currentPage - 1) * itemsPerPage)}</span> - <span className="font-medium">{Math.min(currentPage * itemsPerPage, safeData.length)}</span> of{" "}
                                    <span className="font-medium">{safeData.length}</span> results
                                </p>
                            </div>
                            <div className="flex items-center space-x-4 border border-gray-300 rounded-md p-0">
                                <span className="text-sm text-gray-700 p-2 pr-0">Number of rows per page</span>
                                <div className=" bg-[#D1D1D1] h-full">
                                    <select
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                        className="border border-gray-300 p-2 rounded-md text-sm w-full h-full  focus:outline-none  rounded-l-none"
                                    >
                                        {/* <option value="1">1</option> */}
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <nav className="relative z-0 flex rounded-md items-center gap-4" aria-label="Pagination">
                                {/* Previous page button */}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>

                                <div className="flex items-center gap-0 bg-[#EEEEEE] rounded-lg overflow-hidden">
                                    {/* Page numbers */}
                                    {getPageNumbers().map(pageNumber => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => setCurrentPage(pageNumber)}
                                            className={`relative inline-flex items-center px-4 py-2 border ${currentPage === pageNumber
                                                    ? 'z-10 bg-[#9b9b9b] border-[#D1D1D1] text-white'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } text-sm font-medium`}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}
                                </div>

                                {/* Next page button */}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableCan;