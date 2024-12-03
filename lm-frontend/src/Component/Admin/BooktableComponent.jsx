import { countBook, deleteBook, getAllBook } from '../../Services/BookService';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
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
            queryKey: ["books", currentPage]
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

    const handleDelete = async (bookId) => {
        await deleteBook(bookId);
        queryClient.invalidateQueries("books");
    };

    const handleSubmit = (updatedCategory) => {
        console.log(updatedCategory);

        updateCategory(updatedCategory).then(res => { alert("update successfully"); setIsEdit(false) }).catch(err => alert("something went wrong"))
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
                                            <button onClick={() => handleDelete(b.bookId)} class="font-bold text-red-600">Delete Book</button>
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
                                className='border rounded-md p-4 mx-2'
                                onClick={() => setCurrentPage(index)}>
                                {index + 1}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BooktableComponent