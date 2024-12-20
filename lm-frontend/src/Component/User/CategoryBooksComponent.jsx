import React from 'react'
import { useParams } from 'react-router-dom'
import { getCategoryById } from '../../Services/CategoryService';
import BooksComponent from './BooksComponent';
import { useQuery } from 'react-query';

function CategoryBooksComponent() {

    const { id } = useParams()

    const { data: categoryDetail, isLoading } = useQuery({
        queryFn: () => getCategoryById(id).then(response => response.data),
        queryKey: ["CATEGORY_DETAIL"]
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="flex flex-col text-center w-full mt-20">
                <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">{categoryDetail.categoryName}</h2>
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">ALL Books of {categoryDetail.categoryName}</h1>
            </div>
            <BooksComponent key={categoryDetail.categoryId} data={categoryDetail.books} />
        </>
    )
}

export default CategoryBooksComponent