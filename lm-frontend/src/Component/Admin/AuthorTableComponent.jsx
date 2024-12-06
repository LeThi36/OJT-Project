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
    const [isConfirmAuthor, setIsConfirmAuthor] = useState({
        confirm: false,
        authorId: 0
    })
    const [error, setError] = useState("");


    useEffect(() => {
        countAuthor().then(res => { const count = res.data; setTotalPage(Math.ceil(count / 10)) })
    }, [])

    const { data: authors, isLoading, refetch } = useQuery({
        queryFn: () => getAllAuthor(currentPage, 10).then(response => response.data),
        queryKey: ["authors", currentPage]
    })

    const handleDelete = (id) => {
    }

    const addAuthor = (authorName) => {
        if (validateAuthorName()) {

            createAuthor(authorName).then(res => { alert("add author sucessfully"); refetch() }).catch(err => alert("some thing went wrong"))
        }

    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    const handleConfirm = () => {
        deleteAuthorById(isConfirmAuthor.authorId).then(res => { alert(res.data); refetch() }).catch(err => alert(err))
        setIsConfirmAuthor({
            confirm: false,
            authorId: 0
        })
    }
    const validateAuthorName = () => {
        if (!authorName.authorName || authorName.authorName.trim() === "") {
            setError("Author name is required.")
            return false
        } else if (authorName.authorName.length < 3) {
            setError("Author name must be at least 3 characters long.")
            return false;
        }
        setError("")
        return true
    };



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
                                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
                                            <button onClick={() => setIsConfirmAuthor({ confirm: true, authorId: auth.authorId })} class="font-bold text-white rounded-full px-2 py-1 bg-red-600 hover:bg-red-900 duration-300">delete this author</button>
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
                                className={`text-white border rounded-md px-4 py-2 mx-2 hover:bg-gray-500 duration-300 ${currentPage === index ? 'bg-gray-600' : 'bg-gray-400'}`}
                                onClick={() => setCurrentPage(index)}>
                                {index + 1}
                            </button>
                        )
                    })
                }
            </div>

            <div className={`${!isConfirmAuthor.confirm ? 'hidden overflow-y-hidden' : 'block overflow-y-hidden'} fixed inset-0 overflow-y-auto h-fullfull w-auto px-4 `}>
                <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

                    <div className="flex justify-end p-2">
                        <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setIsConfirmAuthor({ ...isConfirmAuthor, confirm: false })}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-6 pt-0 text-center">
                        <svg className="w-20 h-20 text-indigo-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">This action can not roll back!</h3>
                        <button onClick={() => handleConfirm()}
                            className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            Yes, I'm sure
                        </button>
                        <button onClick={() => setIsConfirmAuthor({ ...setIsConfirmAuthor, confirm: false })}
                            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                            data-modal-toggle="delete-user-modal">
                            No, cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthorTableComponent