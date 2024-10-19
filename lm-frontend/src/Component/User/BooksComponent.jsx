import React from 'react'
import { Link } from 'react-router-dom'

function BooksComponent({data}) {


    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        data.map(b => {
                            return (
                                <Link to={`/books/${b.bookId}`} className="lg:w-1/4 md:w-1/2 p-4 w-full border border-opacity-50 mb-4 cursor-pointer">
                                    <a className="block relative h-48 rounded overflow-hidden">
                                        <img alt={b.title} className="object-contain object-center w-full h-full block" src='https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png' />
                                    </a>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{b.category}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{b.title}</h2>
                                        <p className="mt-1 text-md font-semibold">Author: {b.author}</p>
                                            <p className="mt-1 text-md font-semibold col-span-2">Publisher: {b.publisher}</p>
                                        <div className='grid grid-cols-3'>
                                        <p className="mt-1 text-md font-semibold col-span-2">Available Copies: {b.availableCopies}</p>
                                            <p className="mt-1 text-md font-semibold col-end-5">{b.status}</p>
                                        </div>

                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default BooksComponent