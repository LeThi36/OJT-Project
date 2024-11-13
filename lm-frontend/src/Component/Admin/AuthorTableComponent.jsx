import React, { useEffect, useState } from 'react'
import { countAuthor, getAllAuthor } from '../../Services/AuthorService';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function AuthorTableComponent() {

    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        countAuthor().then(res => { const count = res.data; setTotalPage(Math.ceil(count / 8)) })
    }, [])

    const { data: authors, isLoading } = useQuery({
        queryFn: () => getAllAuthor(currentPage, 8).then(response => response.data),
        queryKey: ["authors", currentPage]
    })

    if (isLoading) {
        return <p>Loading...</p>
    }


    return (
        <div >
            <div className="flex-grow border-2 border-gray-200 border-dashed rounded-lg">
                <div className="relative overflow-x-auto w-full">
                    <table className="w-full text-sm text-left text-gray-500">
                        <caption className="p-4 text-lg font-bold text-left text-gray-50 bg-slate-950 rounded-lg m-2 ">
                            Authors
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Author Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Number of books
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map(auth => {
                                return (
                                    <tr key={auth.authorId}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <Link to={`${auth.authorId}`}>
                                                {auth.authorName}
                                            </Link>

                                        </th>
                                        <td className="px-6 py-4">
                                            {auth.books.length}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex justify-center mt-4'>
                {
                    Array(totalPage).fill(0).map((page, index) => {
                        return (
                            <button
                                key={index}
                                className='border rounded-md p-4 mx-2'
                                onClick={() => setCurrentPage(index)}>
                                {index + 1}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AuthorTableComponent