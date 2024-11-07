import { deleteBook, getAllBook } from '../../Services/BookService';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

function BooktableComponent({ data, title }) {

    if(!data){
        const { data: books, isLoading } = useQuery({
            queryFn: () => getAllBook().then(response => response.data),
            queryKey: ["books"]
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

    return (
        <div >
            <div className="flex-grow border-2 border-gray-200 border-dashed rounded-lg">
                <div className="relative overflow-x-auto w-full">
                    <table className="w-full text-sm text-left text-gray-500">
                        <caption className="p-4 text-lg font-bold text-left text-gray-50 bg-slate-950 rounded-lg m-2 ">
                            {
                                title ? title : "Books"
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
        </div>
    )
}

export default BooktableComponent