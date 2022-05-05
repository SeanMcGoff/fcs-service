import React from 'react';

interface PaginationProps {
    page: number;
    perPage: number;
    totalServices: number;
    paginate: (p: number) => void;
}


export default function Pagination(props: PaginationProps) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalServices / props.perPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className="w-full mt-4">
            <ul className='flex list-style-none justify-center'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button disabled={number == props.page} onClick={() => props.paginate(number)}
                            className={(number == props.page ? 'bg-slate-300' : 'bg-slate-100 hover:bg-slate-200')
                                + ' z-10 rounded-lg relative inline-flex items-center px-4 py-2 border text-sm font-medium'}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};