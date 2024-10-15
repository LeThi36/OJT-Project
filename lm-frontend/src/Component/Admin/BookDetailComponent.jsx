import React from 'react'
import { useParams } from 'react-router-dom'
import { getBookById } from '../../Services/BookService'
import { useQuery } from 'react-query'

function BookDetailComponent() {
    const { id } = useParams()
    const { data: book, isLoading } = useQuery({
        queryFn: () => getBookById(id).then(response => response.data),
        queryKey: ["book"]
    })

    if (isLoading) {
        return <p>Loading...</p>
    }

    function formatDateTime(isoString) {
        const date = new Date(isoString);

        const formattedDate = date.toLocaleDateString('en-GB');
        const formattedTime = date.toLocaleTimeString('en-GB');

        return `${formattedDate} ${formattedTime}`;
    }

    return (
        <div className='w-full'>
            <div className="bg-white w-2/3 shadow overflow-hidden sm:rounded-lg mx-auto">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
                        {book.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 text-center">
                        Details and informations about {book.title}.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Category
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {book.category}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Author
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {book.author}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Publisher
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {book.publisher}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Publication Year
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {book.publicationYear}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Number of Copies
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {book.copies}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Available Copies
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {book.availableCopies}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Status
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {book.status}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Created At
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {formatDateTime(book.createdAt)}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Available Copies
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {formatDateTime(book.updatedAt)}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default BookDetailComponent