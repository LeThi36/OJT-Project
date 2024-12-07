import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { countBorrowedRecord, countRecord, getAllBorrowRecord, returnBorrowedBook } from '../../Services/BorrowRecordService';
import { Link } from 'react-router-dom';

function BorrowRecordTableComponent() {

    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    const { data: borrow, isLoading, refetch } = useQuery({
        queryFn: () => getAllBorrowRecord(currentPage, 12).then(response => response.data),
        queryKey: ["BORROW_RECORDS_ADMIN", currentPage]
    });

    useEffect(() => {
        countBorrowedRecord().then(res => { const count = res.data; setTotalPage(Math.ceil(count / 12))
         }).catch(
        )
    }, [])

    const returnBorrowMutation = useMutation({
        mutationFn: (borrowId) => {
            return returnBorrowedBook(borrowId);
        },
        onSuccess: () => {
            alert("update successfully")
            refetch()
        }
    });

    if (isLoading) {
        return <p>Loading...</p>
    }

    function handleReturnBook(borrowId) {
        returnBorrowMutation.mutate(borrowId)
    }

    return (
        <div >
            <div className="flex-grow border-2 border-gray-200 border-dashed rounded-lg">
                <div className="relative overflow-x-auto w-full">
                    <table className="w-full text-sm text-left text-gray-500">
                        <caption className="p-4 text-lg font-bold text-left text-gray-50 bg-slate-950 rounded-lg m-2 ">
                            Book Borrow Record
                            {/* <Link className="ms-4 font-bold text-emerald-400 " to='/admin/book/add-new-book'>add new Book!</Link> */}
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Book Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Borrow Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Due Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Return Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fine
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrow.map(b => {
                                return (
                                    <tr key={b.borrowId}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <Link to={`/admin/user/${b.user.userId}`}>
                                                {b.user.username}
                                            </Link>
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {b.user.email}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <Link to={`/admin/book/${b.book ? b.book.bookId : ''}`}>
                                                {b.book ? b.book.title : 'N/A'}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            {b.borrowDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {b.dueDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {b.returnDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {b.status}
                                        </td>
                                        <td className="px-6 py-4">
                                            {b.fine}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleReturnBook(b.borrowId)}
                                                style={{ display: b.status === "BORROWED" ? 'block' : 'none', color: 'white', backgroundColor: 'rgba(0, 0, 0)', padding: '8px 12px', borderRadius: 8 }}
                                                disabled={returnBorrowMutation.isLoading}
                                            >
                                                {returnBorrowMutation.isLoading ? "Processing..." : "Return"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                {Array(totalPage).fill(0).map((page, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`mx-1 px-4 py-2 ${currentPage === index ? 'bg-indigo-700 hover:bg-indigo-500' : 'bg-indigo-500'} text-white rounded hover:bg-indigo-300 duration-300`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default BorrowRecordTableComponent