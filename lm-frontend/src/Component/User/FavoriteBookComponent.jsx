import React from 'react'
import { Link } from 'react-router-dom'
import BooksComponent from './BooksComponent'

function FavoriteBookComponent() {
    const favoriteBook = JSON.parse(localStorage.getItem('favoriteBook')) || []


    if (favoriteBook.length == 0) {
        return (
            <div className="flex flex-col text-center w-full mt-20 h-screen">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Favorite Books</h1>
                <div className=' h-[55vh] flex justify-center items-center'>
                    <Link to={'/books'}
                        class="rounded-full py-4 w-full max-w-[400px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                        <span class="px-2 font-semibold text-lg leading-8 text-indigo-600">Favorite Books is empty continue browsing</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" strokeWidth="1.6"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col text-center w-full mt-20">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Favorite Books</h1>
            </div>
            <BooksComponent data={favoriteBook.map(fav => fav.book)} />
        </>
    )
}

export default FavoriteBookComponent