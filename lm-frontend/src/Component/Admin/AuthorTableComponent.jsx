import React, { useEffect, useState } from 'react'
import { countAuthor, createAuthor, deleteAuthorById, getAllAuthor } from '../../Services/AuthorService';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function AuthorTableComponent() {

    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [isEdit, setIsEdit] = useState(false)
    const [authorName, setAuthorName] = useState({
        authorName: ''
    })

    useEffect(() => {
        countAuthor().then(res => { const count = res.data; setTotalPage(Math.ceil(count / 10)) })
    }, [])

    const { data: authors, isLoading, refetch } = useQuery({
        queryFn: () => getAllAuthor(currentPage, 10).then(response => response.data),
        queryKey: ["authors", currentPage]
    })

    const handleDelete = (id) => {
        deleteAuthorById(id).then(res => { alert(res.data); refetch() }).catch(err => alert(err))
    }

    const addAuthor = (authorName) => {
        createAuthor(authorName).then(res => { alert("add author sucessfully"); refetch() }).catch(err => alert("some thing went wrong"))

    }

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
                            <button className="ms-4 font-bold text-emerald-400 " onClick={() => setIsEdit(!isEdit)}>add new Author!</button>
                            {
                                isEdit ? (<>
                                    <input type='text' placeholder='input author name here' className='ms-2 rounded-md text-sm text-black' onChange={(e) => { setAuthorName({ authorName: e.target.value }) }}></input>
                                    <button className='text-emerald-400 ms-2' onClick={() => addAuthor(authorName)}>
                                        submit
                                    </button>
                                    <button className='text-red-700 ms-2' onClick={() => {
                                        setAuthorName('')
                                        setIsEdit(false)
                                    }}>
                                        cancle
                                    </button>
                                </>

                                ) : (<>
                                </>)
                            }
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Author Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Number of books
                                </th>
                                <th className='w-1/5'></th>
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
                                        <td>
                                            <button onClick={() => handleDelete(auth.authorId)} class="font-bold text-white rounded-full px-2 py-1 bg-red-600 hover:bg-red-900 duration-300">delete this author</button>
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
                                className={`text-white border rounded-md px-4 py-2 mx-2 hover:bg-gray-500 duration-300 ${currentPage === index ? 'bg-gray-600':'bg-gray-400'}`}
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