import React from 'react'
import { useQuery } from 'react-query';
import { getAllBorrowRecord } from '../../Services/BorrowRecordService';
import { Link } from 'react-router-dom';

function BorrowRecordTableComponent() {

    const { data: borrow, isLoading } = useQuery({
        queryFn: () => getAllBorrowRecord().then(response => response.data),
        queryKey: ["borrow"]
    })

    if (isLoading) {
        return <p>Loading...</p>
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
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BorrowRecordTableComponent