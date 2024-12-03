import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { addCategory, deleteCategoryById, getAllCategory } from '../../Services/CategoryService';
import { Link } from 'react-router-dom';

function CategoryTableComponent() {

    const [isEdit, setIsEdit] = useState(false)
    const [categoryName, setCategoryName] = useState({
        categoryName: ''
    })


    const { data: categories, isLoading, refetch } = useQuery({
        queryFn: () => getAllCategory().then(response => response.data),
        queryKey: ["categories"]
    })

    const handleDelete = (id) => {
        deleteCategoryById(id).then(res => { alert(res.data); refetch() }).catch(err => alert(err))
    }

    const handleAdd = (categoryName) => {
        addCategory(categoryName).then(res => { alert("add category sucessfully"); refetch() }).catch(err => alert("some thing went wrong"))
    }

    const handleCancle = () => {
        setCategoryName({
            categoryName: ''
        })
        setIsEdit(false)
    }


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
                            <button className="ms-4 font-bold text-emerald-400 " onClick={() => setIsEdit(!isEdit)}>add new Category!</button>
                            {
                                isEdit ? (<>
                                    <input type="text" className='rounded-md text-black text-sm ms-2' placeholder='input category name here' onChange={(e) => { setCategoryName({ categoryName: e.target.value }) }} />
                                    <button className='text-emerald-400 ms-2' onClick={() => handleAdd(categoryName)}>
                                        submit
                                    </button>
                                    <button className='text-red-700 ms-2' onClick={() => handleCancle()}>
                                        cancle
                                    </button>
                                </>) : (<></>)
                            }
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Category Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Number of books
                                </th>
                                <th className='w-1/5'></th>
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
                                        <td>
                                            <button onClick={() => handleDelete(cat.categoryId)} class="font-bold text-white rounded-full px-2 py-1 bg-red-600 hover:bg-red-900 duration-300">delete this category</button>
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