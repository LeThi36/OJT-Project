import React from 'react'
import { useQuery } from 'react-query';
import { getAllCategory } from '../../Services/CategoryService';
import { Link } from 'react-router-dom';

function CategoryTableComponent() {

    const { data: categories, isLoading } = useQuery({
        queryFn: () => getAllCategory().then(response => response.data),
        queryKey: ["categories"]
    })

    console.log(categories);
    

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div >
            <div className="flex-grow border-2 border-gray-200 border-dashed rounded-lg">
                <div className="relative overflow-x-auto w-full">
                    <table className="w-full text-sm text-left text-gray-500">
                        <caption className="p-4 text-lg font-bold text-left text-gray-50 bg-slate-950 rounded-lg m-2">
                            Category
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Category Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Number of books
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => {
                                return (
                                    <tr key={cat.categoryId}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <Link to={`/admin/category/${cat.categoryId}`}>
                                                {cat.categoryName}
                                            </Link>

                                        </th>
                                        <td className="px-6 py-4">
                                            {cat.books.length}
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

export default CategoryTableComponent