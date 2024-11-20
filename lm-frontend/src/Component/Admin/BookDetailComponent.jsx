import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBookById, updateBook, updateBookImage } from '../../Services/BookService'
import { useQuery } from 'react-query'
import { getAllAuthor } from '../../Services/AuthorService'
import { getAllPublisher } from '../../Services/PublisherService'
import { getAllCategory } from '../../Services/CategoryService'

function BookDetailComponent() {
    const { id } = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const [bookDetail, setBookDetail] = useState(null)

    const { data: authors, isLoading: loadingAuthors } = useQuery({
        queryFn: () => getAllAuthor().then(response => response.data || []),
        queryKey: ["authors"],
    });
    const { data: publishers, isLoading: loadingPublisher } = useQuery({
        queryFn: () => getAllPublisher().then(response => response.data || []),
        queryKey: ["publishers"],
    });
    const { data: categories, isLoading: loadingCategories } = useQuery({
        queryFn: () => getAllCategory().then(response => response.data || []),
        queryKey: ["categories"],
    });

    const { data: book, isLoading: loadingBook, isError, error, refetch } = useQuery({
        queryFn: () => {
            const res = getBookById(id).then(res => res.data)
            return res
        },
        queryKey: ["book", id],
        enabled: !!id
    })
    useEffect(() => {
        if (book) {
            setBookDetail(book)
        }
    }, [book])

    if (loadingBook || loadingCategories || loadingAuthors || loadingPublisher) {
        return <p>Loading...</p>
    }
    if (isError) return <div>Error: {error.message}</div>

    function formatDateTime(isoString) {
        const date = new Date(isoString);

        const formattedDate = date.toLocaleDateString('en-GB');
        const formattedTime = date.toLocaleTimeString('en-GB');

        return `${formattedDate} ${formattedTime}`;
    }

    const handleEdit = () => {
        setIsEdit(true)
    }

    const handleCancelEdit = () => {
        setBookDetail(book)
        setIsEdit(false)
    }

    const handleSubmit = () => {
        console.log(bookDetail)
        updateBook(bookDetail, id).then(res => {
            console.log(res.data)
            refetch()
            setIsEdit(false)
        }).catch(err => alert(err))
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const formData = new FormData()
        formData.append('image', file)
        try {
            const response = await updateBookImage(formData, id)
            console.log("Response:", response)
            alert("Book Image update successfully!")
            refetch()
        } catch (error) {
            console.error("Error uploading book image:", error)
            alert("Failed to upload book image.")
        }
    }

    const handleButtonClick = () => {
        document.getElementById("fileInput").click();
    };

    if (!bookDetail) {
        return <div>No book details available.</div>;
    }

    return (
        <div className='w-full'>
            <div className="bg-white w-2/3 shadow overflow-hidden sm:rounded-lg mx-auto">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
                        {bookDetail.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 text-center">
                        Details and informations about {bookDetail.title}.
                    </p>
                    {
                        isEdit ?
                            <>
                                <button className='mx-2 capitalize text-red-600 font-semibold' onClick={() => handleCancelEdit()}>cancel</button>
                                <button className='mx-2 capitalize text-emerald-700 font-semibold' onClick={() => handleSubmit()}>Submit</button>
                            </>
                            :
                            <button className='mx-2 capitalize font-semibold text-emerald-700' onClick={() => handleEdit()}>eidt this book</button>
                    }

                </div>
                <div className='grid grid-cols-3'>
                    <div className="border-t border-gray-200 col-span-2">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Category
                                </dt>
                                {
                                    isEdit ?
                                        <select onChange={(e) => setBookDetail({ ...bookDetail, categoryId: e.target.value })} type="text" name="phone" id="phone" placeholder="Enter your phone number"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                            <option value="">Select Category</option>
                                            {
                                                categories.map(cat => {
                                                    return (<option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>)
                                                })
                                            }
                                        </select>
                                        :
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                            {bookDetail.category}
                                        </dd>
                                }
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Author
                                </dt>
                                {
                                    isEdit ?
                                        <select onChange={(e) => setBookDetail({ ...bookDetail, authorId: e.target.value })} name="author" id="author"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                            <option value="">Select Author</option>
                                            {
                                                authors.map(auth => {
                                                    return (<option key={auth.authorId} value={auth.authorId}>{auth.authorName}</option>)
                                                })
                                            }
                                        </select>
                                        :
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                            {bookDetail.author}
                                        </dd>
                                }
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Publisher
                                </dt>
                                {
                                    isEdit ?
                                        <select onChange={(e) => setBookDetail({ ...bookDetail, publisherId: e.target.value })} name="publisher" id="publisher"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                            <option value="">Select Publisher</option>
                                            {
                                                publishers.map(pub => {
                                                    return (<option key={pub.publisherId} value={pub.publisherId}>{pub.publisherName}</option>)
                                                })
                                            }
                                        </select>
                                        :
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                            {bookDetail.publisher}
                                        </dd>
                                }
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Publication Year
                                </dt>
                                {
                                    isEdit ?
                                        <input value={bookDetail.publicationYear} onChange={(e) => setBookDetail({ ...bookDetail, publicationYear: e.target.value })} className='"w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'></input>
                                        :
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                            {bookDetail.publicationYear}
                                        </dd>
                                }
                            </div>
                            <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Number of Copies
                                </dt>
                                {
                                    isEdit ?
                                        <input value={bookDetail.copies} onChange={(e) => setBookDetail({ ...bookDetail, copies: e.target.value })} className='"w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'></input>
                                        :
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                            {bookDetail.copies}
                                        </dd>
                                }
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Description
                                </dt>
                                {
                                    isEdit ?
                                        <input value={bookDetail.description} onChange={(e) => setBookDetail({ ...bookDetail, description: e.target.value })} className='"w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'></input>
                                        :
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                            {bookDetail.description}
                                        </dd>
                                }
                            </div>
                            <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Status
                                </dt>
                                {
                                    isEdit ?
                                        <select value={bookDetail.status} onChange={(e) => setBookDetail({ ...bookDetail, status: e.target.value })}
                                            className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'>
                                            <option value={'NEW'}>
                                                NEW
                                            </option>
                                            <option value={'USED'}>
                                                USED
                                            </option>
                                            <option value={'DAMAGED'}>
                                                DAMAGED
                                            </option>
                                        </select>
                                        :
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                            {bookDetail.status}
                                        </dd>
                                }
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Created At
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                    {bookDetail.createdAt}
                                </dd>
                            </div>
                            <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Updated At
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                    {bookDetail.updatedAt}
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className='w-full'>
                        <img className='w-full' src={'https://drive.google.com/thumbnail?id=' + bookDetail.imageUrl.split('id=')[1]}></img>
                        <button className='font-semibold capitalize text-red-700' onClick={(e) => handleButtonClick(e)}>edit book cover</button>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetailComponent