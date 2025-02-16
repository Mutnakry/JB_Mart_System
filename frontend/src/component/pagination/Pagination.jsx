import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, limit, setLimit }) => {
    const getPages = () => {
        const pages = [1];
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);

        if (currentPage > 3) {
            pages.push(1);
        }

        if (currentPage > 4) {
            pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) {
            pages.push('...');
        }

        if (currentPage < totalPages - 2) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <nav className='flex items-center justify-end py-4'>
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border text-ms border-gray-300  dark:bg-gray-700 dark:text-white"
                    >
                        &laquo;
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border text-md border-gray-300 dark:bg-gray-700 dark:text-white"
                    >
                        ថតក្រោយ
                    </button>
                </li>
                {getPages().map((page, index) => (
                    <li key={index}>
                        {page === '...' ? (
                            <li className="px-3 py-1 border text-md border-gray-300 dark:bg-gray-700 dark:text-white">...</li>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-1 border text-sm border-gray-300 dark:bg-gray-700 dark:text-white ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {page}
                            </button>

                        )}
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border text-md border-gray-300 dark:bg-gray-700 dark:text-white"
                    >
                        បន្ទាប់
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text- border  border-gray-300 dark:bg-gray-700 dark:text-white"
                    >
                        &raquo;
                    </button>
                </li>
            </ul>

        </nav>
    );
};

export default Pagination;


