import React, { useEffect, useState } from 'react'
import { getAllAuthor } from '../../Services/AuthorService'
import { getAllPublisher } from '../../Services/PublisherService'
import { getAllCategory } from '../../Services/CategoryService'
import { useQuery } from 'react-query'
import { addNewBook } from '../../Services/BookService'
import { useNavigate } from 'react-router-dom'

function BookFormComponent() {

    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [authorId, setAuthorId] = useState('')
    const [publisherId, setPublisherId] = useState('')
    const [publicationYear, setPublicationYear] = useState('')
    const [copies, setCopies] = useState('')
    const [availableCopies, setAvailableCopies] = useState('')
    const [status, setStatus] = useState('')

    const navigate = useNavigate()


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

    if (loadingCategories || loadingAuthors || loadingPublisher) {
        return <p>Loading...</p>;
    }

    

    function handleSubmit(e) {
        e.preventDefault()
        const data = { title, categoryId, authorId, publisherId, publicationYear, copies, availableCopies, status }
        console.log(data);
        
        addNewBook(data).then(res =>{
            alert("book add successfully")
            navigate("/admin")
        }).catch(error =>{
            console.log(error);
        })
    }

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <div className="mb-5">
                    <label htmlFor="Title" className="mb-3 block text-base font-medium text-[#07074D]">
                        Title
                    </label>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="Title" id="Title" placeholder="Book Title"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                        Category
                    </label>
                    <select onChange={(e) => setCategoryId(e.target.value)} type="text" name="phone" id="phone" placeholder="Enter your phone number"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                        <option value="">Select Category</option>
                        {
                            categories.map(cat => {
                                return (<option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>)
                            })
                        }
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="author" className="mb-3 block text-base font-medium text-[#07074D]">
                        Author
                    </label>
                    <select onChange={(e) => setAuthorId(e.target.value)} name="author" id="author"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                        <option value="">Select Author</option>
                        {
                            authors.map(auth => {
                                return (<option key={auth.authorId} value={auth.authorId}>{auth.authorName}</option>)
                            })
                        }
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="publisher" className="mb-3 block text-base font-medium text-[#07074D]">
                        Publisher
                    </label>
                    <select onChange={(e) => setPublisherId(e.target.value)} name="publisher" id="publisher"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                        <option value="">Select Publisher</option>
                        {
                            publishers.map(pub => {
                                return (<option key={pub.publisherId} value={pub.publisherId}>{pub.publisherName}</option>)
                            })
                        }
                    </select>
                </div>

                <div className="mb-5 pt-3">
                    <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                        Infomation
                    </label>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <input onChange={(e) => setPublicationYear(e.target.value)} value={publicationYear} type="text" name="area" id="area" placeholder="Publication Year"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <input onChange={(e) => setCopies(e.target.value)} value={copies} type="text" name="city" id="city" placeholder="Copies"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <input onChange={(e) => setAvailableCopies(e.target.value)} value={availableCopies} type="text" name="state" id="state" placeholder="Available Copies"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <select onChange={(e) => setStatus(e.target.value)} name="publisher" id="publisher"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                    <option value="">Select Status</option>
                                    <option value="NEW">NEW</option>
                                    <option value="USED">USED</option>
                                    <option value="DAMAGED">DAMAGED</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        onClick={(e) => handleSubmit(e)}
                        className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                        Book Appointment
                    </button>
                </div>
            </div >
        </div >
    )
}

export default BookFormComponent