import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { addCategory, deleteCategoryById, getAllCategory } from '../../Services/CategoryService';
import { Link } from 'react-router-dom';

function CategoryTableComponent() {

    const [isEdit, setIsEdit] = useState(false)
    const [categoryName, setCategoryName] = useState({
        categoryName: ''
    })
    const [isConfirmCategory, setIsConfirmCategory] = useState({
        confirm: false,
        categoryId: 0
    })


    const { data: categories, isLoading, refetch } = useQuery({
        queryFn: () => getAllCategory().then(response => response.data),
        queryKey: ["categories"]
    })


    const handleAdd = (categoryName) => {
        addCategory(categoryName).then(res => { alert("add category sucessfully"); refetch() }).catch(err => alert("some thing went wrong"))
    }

    const handleCancle = () => {
        setCategoryName({
            categoryName: ''
        })
        setIsEdit(false)
    }

    const handleConfirm = () => {
        deleteCategoryById(isConfirmCategory.categoryId).then(res => { alert(res.data); refetch() }).catch(err => alert(err))
        setIsConfirmCategory({
            confirm:false,
            categoryId: 0
        })
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
                                            <button onClick={() => setIsConfirmCategory({ confirm: true, categoryId: cat.categoryId })} class="font-bold text-white rounded-full px-2 py-1 bg-red-600 hover:bg-red-900 duration-300">delete this category</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={`${!isConfirmCategory.confirm ? 'hidden overflow-y-hidden' : 'block overflow-y-hidden'} fixed inset-0 overflow-y-auto h-fullfull w-auto px-4 `}>
                <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

                    <div className="flex justify-end p-2">
                        <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setIsConfirmCategory({ ...isConfirmCategory, confirm: false })}>
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
                        <button onClick={() => setIsConfirmCategory({ ...isConfirmCategory, confirm: false })}
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

export default CategoryTableComponent