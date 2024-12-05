import React, { useEffect, useState } from 'react'
import BooksComponent from './BooksComponent';
import { useQuery, useQueryClient } from 'react-query';
import { countBook, getAllBook, searchBook } from '../../Services/BookService';
import CategoryComponent from './CategoryComponent';
import { Link } from 'react-router-dom';
import { getAllCategory } from '../../Services/CategoryService';
import { getAllAuthor } from '../../Services/AuthorService';

function BooksCardComponent() {

    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [searchContent, setSearchContent] = useState('')
    const [categoryId, setCategoryId] = useState(null)
    const [authorId, setAuthorId] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!isSearching) {
            countBook()
                .then((res) => {
                    const count = res.data;
                    setTotalPage(Math.ceil(count / 8))
                })
                .catch((err) => console.log(err))
        }

    }, [isSearching])

    const { data: books, isLoading: loadingBook, isError: erroBook } = useQuery({
        queryKey: isSearching ? ['books', 'search', searchContent, currentPage, categoryId, authorId] : ['books', currentPage],
        queryFn: () =>
            isSearching
                ? searchBook(categoryId, authorId, searchContent, currentPage, 8).then((res) => res.data)
                : getAllBook(currentPage, 8).then((response) => response.data),
        keepPreviousData: true,
    })

    const { data: category, isLoading: loadingCategories } = useQuery({
        queryKey: ['category'],
        queryFn: () => getAllCategory().then(res => res.data),
        keepPreviousData: true,
    })

    const { data: author, isLoading: loadingAuthors, isError: errorAtuthor } = useQuery({
        queryKey: ['author'],
        queryFn: () => getAllAuthor().then(res => res.data),
        keepPreviousData: true
    })

    const handleSearch = (e) => {
        e.preventDefault()
        setIsSearching(true)
        setCurrentPage(0)
        queryClient.invalidateQueries(['books'])
    }

    const handleReset = () => {
        setIsSearching(false)
        setSearchContent('')
        setCurrentPage(0)
        queryClient.invalidateQueries(['books'])
    }


    if (loadingBook || loadingCategories || loadingAuthors) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <CategoryComponent />
            <div className="flex flex-col text-center w-full mt-20">
                <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Books</h2>
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">ALL Books</h1>
            </div>
            <div className="text-center mt-4">
                <input
                    type="text"
                    value={searchContent}
                    onChange={(e) => setSearchContent(e.target.value)}
                    className='rounded-md w-64'
                    placeholder='search any book name'
                />
                <button onClick={handleSearch} className="mx-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 duration-300">
                    Search
                </button>
                {isSearching && (
                    <button onClick={handleReset} className="mx-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 duration-300">
                        Cancel
                    </button>
                )}

                <select onChange={(e) => setCategoryId(e.target.value === "null" ? null : e.target.value)} className='me-2 rounded-md'>
                    <option value="null">
                        Category
                    </option>
                    {(category).map((c) => {
                        return (
                            <option key={c.categoryId} value={c.categoryId}>
                                {c.categoryName}
                            </option>
                        )
                    })}
                </select>
                <select onChange={(e) => setAuthorId(e.target.value === "null" ? null : e.target.value)} className='rounded-md'>
                    <option value="null">
                        Author
                    </option>
                    {author.map((au) => {
                        return (
                            <option key={au.authorId} value={au.authorId}>
                                {au.authorName}
                            </option>
                        )
                    })}
                </select>
            </div>
            <BooksComponent data={books} />
            <div className='flex justify-center'>
                {!isSearching && Array(totalPage)
                    .fill(0)
                    .map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`mx-1 px-4 py-2 ${currentPage === index ? 'bg-indigo-700 hover:bg-indigo-500' : 'bg-indigo-500 hover:bg-indigo-300'
                                } text-white rounded duration-300`}
                        >
                            {index + 1}
                        </button>
                    ))}
            </div>
        </>
    )
}

export default BooksCardComponent