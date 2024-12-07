import React, { useEffect, useState } from 'react'
import { getAllAuthor } from '../../Services/AuthorService'
import { getAllPublisher } from '../../Services/PublisherService'
import { getAllCategory } from '../../Services/CategoryService'
import { useQuery } from 'react-query'
import { addNewBook } from '../../Services/BookService'
import { useNavigate } from 'react-router-dom'

function BookFormComponent() {

    const [book, setBook] = useState({
        title: '',
        categoryId: '',
        authorId: '',
        publisherId: '',
        publicationYear: '',
        copies: '',
        description: '',
        status: ''
    })

    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

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



    async function handleSubmit(e) {
        e.preventDefault()
        if (validateForm()) {
            setIsLoading(true)
            const formData = new FormData();
            formData.append('bookDto', JSON.stringify(book));
            formData.append('image', selectedImage);

            try {
                const response = await addNewBook(formData);
                alert("Book added successfully!");
                navigate("/admin/book");
            } catch (error) {
                console.error("Error adding book:", error);
            } finally {
                setIsLoading(false)
            }
        } else {
            alert("Please fix the errors in the form.");
        }
    }

    const validateForm = () => {
        const errors = {}

        if (!book.title || book.title.trim() === "") {
            errors.title = "Title is required"
        }

        if (!book.categoryId || book.categoryId === "") {
            errors.categoryId = "Category is required"
        }

        if (!book.authorId || book.authorId === "") {
            errors.authorId = "Author is required"
        }

        if (!book.publisherId || book.publisherId === "") {
            errors.publisherId = "Publisher is required"
        }

        if (!book.publicationYear || book.publicationYear.trim() === "") {
            errors.publicationYear = "Publication Year is required"
        } else if (!/^\d{4}$/.test(book.publicationYear)) {
            errors.publicationYear = "Publication Year must be a valid year (example : 2024)"
        }

        if (!book.copies || book.copies.trim() === "") {
            errors.copies = "Number of copies is required"
        } else if (!/^\d+$/.test(book.copies)) {
            errors.copies = "Copies must be a number"
        }

        if (!book.status || book.status === "") {
            errors.status = "Status is required"
        }

        if (!book.description || book.description.trim() === "") {
            errors.description = "Description is required"
        }

        if (!selectedImage) {
            errors.image = "Book image is required"
        }

        setErrors(errors)
        return Object.keys(errors).length === 0
    }


    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[1000px] bg-white">
                <div className="mb-5">
                    <label htmlFor="Title" className="mb-3 block text-base font-medium text-[#07074D]">
                        Title
                    </label>
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    <input onChange={(e) => setBook({ ...book, title: e.target.value })} value={book.title} type="text" name="Title" id="Title" placeholder="Book Title"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                        Category
                    </label>
                    {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId}</p>}
                    <select onChange={(e) => setBook({ ...book, categoryId: e.target.value })} type="text" name="phone" id="phone" placeholder="Enter your phone number"
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
                    {errors.authorId && <p className="text-red-500 text-sm">{errors.authorId}</p>}
                    <select onChange={(e) => setBook({ ...book, authorId: e.target.value })} name="author" id="author"
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
                    {errors.publisherId && <p className="text-red-500 text-sm">{errors.publisherId}</p>}
                    <select onChange={(e) => setBook({ ...book, publisherId: e.target.value })} name="publisher" id="publisher"
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
                                {errors.publicationYear && <p className="text-red-500 text-sm">{errors.publicationYear}</p>}

                                <input onChange={(e) => setBook({ ...book, publicationYear: e.target.value })} value={book.publicationYear} type="text" name="area" id="area" placeholder="Publication Year"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                {errors.copies && <p className="text-red-500 text-sm">{errors.copies}</p>}

                                <input onChange={(e) => setBook({ ...book, copies: e.target.value })} value={book.copies} type="text" name="city" id="city" placeholder="Copies"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}

                                <select onChange={(e) => setBook({ ...book, status: e.target.value })} name="status" id="status"
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

                <div className="mb-5">
                    <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">
                        Description
                    </label>
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    <textarea rows={5} onChange={(e) => setBook({ ...book, description: e.target.value })} value={book.description} type="text" name="description" id="description" placeholder="Book Title"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>

                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

                <div className='mb-5 pt-3'>
                    <input type='file' className='rounded-md file:mr-3 border w-full text-[#6B7280] font-medium file:font-medium '
                        onChange={(event) => {
                            setSelectedImage(event.target.files[0]); // Update the state with the selected file
                        }}></input>
                </div>


                <div>
                    <button
                        onClick={(e) => handleSubmit(e)}
                        className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" disabled={isLoading}>
                        {
                            isLoading ? ("processing...") : ("Add new Book")
                        }
                    </button>
                </div>
            </div >
        </div >
    )
}

export default BookFormComponent