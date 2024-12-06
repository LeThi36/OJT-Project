import { countBook, deleteBook, getAllBook } from '../../Services/BookService';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import { updateCategory } from '../../Services/CategoryService';

function BooktableComponent({ data, title, elementId }) {

    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [isEdit, setIsEdit] = useState(false)
    const [updatedCategory, setUpdatedCategory] = useState({
        categoryId: elementId,
        categoryName: ''
    })
    const [isConfirm, setIsConfirm] = useState({
        confirm: false,
        bookId: 0
    })
    const [errors, setErrors] = useState({})

    const queryClient = useQueryClient();

    if (data) {
        useEffect(() => {
            setTotalPage(Math.ceil(data.length / 8))
        }, [])
    }

    if (!data) {

        useEffect(() => {
            countBook().then(res => { const count = res.data; setTotalPage(Math.ceil(count / 8)) })
        }, [])

        const { data: books, isLoading } = useQuery({
            queryFn: () => getAllBook(currentPage, 8).then(response => response.data),
            queryKey: ["BOOK_TABLE", currentPage]
        })
        data = books
        if (isLoading) {
            return <div>Loading...</div>;
        }

    }

    function formatDateTime(isoString) {
        const date = new Date(isoString);

        const formattedDate = date.toLocaleDateString('en-GB');
        const formattedTime = date.toLocaleTimeString('en-GB');

        return `${formattedDate} ${formattedTime}`;
    }

    const handleConfirm = () => {
        deleteBook(isConfirm.bookId).then(res => { alert("delete successfully"); queryClient.invalidateQueries({ queryKey: ["BOOK_TABLE"] }) }).catch(err => alert("something went wrong"))
        setIsConfirm({
            confirm: false,
            bookId: 0
        })
    }

    const handleSubmit = (updatedCategory) => {
        if (validateCategoryForm()) {
            updateCategory(updatedCategory).then(res => { alert("update successfully"); setIsEdit(false) }).catch(err => alert("something went wrong"))
        }
    }

    const validateCategoryForm = () => {
        const newErrors = {};

        if (!updatedCategory.categoryName || updatedCategory.categoryName.trim() === "") {
            newErrors.categoryName = "Category name is required."
        } else if (updatedCategory.categoryName.length < 3) {
            newErrors.categoryName = "Category name must be at least 3 characters long."
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }


    return (
        <div >
            <div className="flex-grow border-2 border-gray-200 border-dashed rounded-lg">
                <div className="relative overflow-x-auto w-full">
                    <table className="w-full text-sm text-left text-gray-500">
                        <caption className="p-4 text-lg font-bold text-left text-gray-50 bg-slate-950 rounded-lg m-2 ">
                            {
                                title ? (<>
                                    <button onClick={() => setIsEdit(!isEdit)}>{title}</button>
                                </>) : "Books"
                            }
                            {
                                isEdit ? (<>
                                    <input type="text" className='ms-2 text-sm rounded-md text-black' placeholder='edit this name' onChange={(e) => { setUpdatedCategory({ ...updatedCategory, categoryName: e.target.value }) }} />
                                    <button className='me-2 ms-2 text-emerald-400' onClick={() => handleSubmit(updatedCategory)}>submit</button>
                                    {errors.categoryName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.categoryName}</p>
                                    )}
                                </>) : (<></>)
                            }
                            <Link className="ms-4 font-bold text-emerald-400 " to='/admin/book/add-new-book'>add new Book!</Link>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Author
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Publisher
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Publication Year
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Copies
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Updated At
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(b => {
                                return (
                                    <tr key={b.bookId}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <Link to={`/admin/book/${b.bookId}`}>
                                                {b.title}
                                            </Link>
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {b.category}
                                        </th>
                                        <td className="px-6 py-4">
                                            {b.author}
                                        </td>
                                        <td className="px-6 py-4">
                                            {b.publisher}
                                        </td>
                                        <td className="px-6 py-4">
                                            {b.publicationYear}
                                        </td>
                                        <td className="px-6 py-4">
                                            {b.copies}
                                        </td>
                                        <td className="px-6 py-4">
                                            {b.status}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDateTime(b.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDateTime(b.updatedAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => setIsConfirm({ confirm: true, bookId: b.bookId })} className="font-bold text-white rounded-full px-2 py-1 bg-red-600 hover:bg-red-900 duration-300">Delete Book</button>
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

            <div className={`${!isConfirm.confirm ? 'hidden overflow-y-hidden' : 'block overflow-y-hidden'} fixed inset-0 overflow-y-auto h-fullfull w-auto px-4 `}>
                <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

                    <div className="flex justify-end p-2">
                        <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setIsConfirm({ ...isConfirm, confirm: false })}>
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
                        <button onClick={() => setIsConfirm({ ...isConfirm, confirm: false })}
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

export default BooktableComponent