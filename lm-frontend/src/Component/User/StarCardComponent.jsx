import React, { useEffect, useState } from 'react'
import { userCount } from '../../Services/UserService'
import { countAuthor } from '../../Services/AuthorService'
import { countBook } from '../../Services/BookService'
import { countCategory } from '../../Services/CategoryService'

function StarCardComponent() {

    const [data, setData] = useState({
        user: '',
        book: '',
        author: '',
        category: ''
    })

    useEffect(() => {
        userCount().then(response => {
            setData(prevData => ({ ...prevData, user: response.data }));
        });
        countAuthor().then(response => {
            setData(prevData => ({ ...prevData, author: response.data }));
        });
        countBook().then(response => {
            setData(prevData => ({ ...prevData, book: response.data }));
        });
        countCategory().then(response => {
            setData(prevData => ({ ...prevData, category: response.data }));
        });
    }, []);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">The number of diverse customers and the number of products sold come with reputation</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Welcome to our Library Management System, where you can easily organize books, manage user accounts, and track borrowing and returns. With a simple interface, it's perfect for both librarians and personal collections, ensuring efficient control of your library resources.</p>
                </div>
                <div className="flex flex-wrap -m-4 text-center">
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <svg className="w-[24px] h-[24px] fill-[#8e8e8e] text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">

                                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>

                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">{data.category}</h2>
                            <p className="leading-relaxed">Category</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <svg className="w-[24px] h-[24px] fill-[#8e8e8e] text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path>
                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">{data.user}</h2>
                            <p className="leading-relaxed">Users</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <svg className="w-[24px] h-[24px] fill-[#8e8e8e] text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">{data.author}</h2>
                            <p className="leading-relaxed">Author</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <svg className="w-[24px] h-[24px] fill-[#8e8e8e] text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152V512l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427V224c0-17.7 14.3-32 32-32H62.3c63.6 0 125.6 19.6 177.7 56zm32 264V248c52.1-36.4 114.1-56 177.7-56H480c17.7 0 32 14.3 32 32V427c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z"></path>
                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">{data.book}</h2>
                            <p className="leading-relaxed">Book</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StarCardComponent