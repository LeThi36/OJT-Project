import React from 'react'
import { Link } from 'react-router-dom'

function BooksComponent({data}) {

    if (!Array.isArray(data) || data.length === 0) {
        return <div className='flex justify-center my-6 text-xl font-semibold'>No books available</div>;
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        data.map(b => {
                            const url = b.imageUrl ? b.imageUrl.split('id=')[1] : '';
                            return (
                                <Link key={b.bookId} to={`/books/${b.bookId}`} className="lg:w-1/4 md:w-1/2 p-4 w-full border border-opacity-50 mb-4 cursor-pointer book-card">
                                    <div className="block relative h-48 rounded overflow-hidden">
                                        <img alt={b.title} className="object-contain object-center w-full h-full block" src={`https://drive.google.com/thumbnail?id=${url}`} />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase book-card__text">{b.category}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium book-card__title">{b.title}</h2>
                                        <p className="mt-1 text-md font-semibold  book-card__text">Author: {b.author}</p>
                                            <p className="mt-1 text-md font-semibold col-span-2  book-card__text">Publisher: {b.publisher}</p>
                                        <div className='grid grid-cols-3'>
                                        <p className="mt-1 text-md font-semibold col-span-2  book-card__text">Copies: {b.copies}</p>
                                            <p className="mt-1 text-md font-semibold col-end-5 book-card__status">{b.status}</p>
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