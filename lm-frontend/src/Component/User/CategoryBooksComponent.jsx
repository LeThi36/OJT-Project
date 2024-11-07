import React from 'react'
import { useParams } from 'react-router-dom'
import { getCategoryById } from '../../Services/CategoryService';
import BooksComponent from './BooksComponent';
import { useQuery } from 'react-query';

function CategoryBooksComponent() {

    const { id } = useParams()

    const { data: category, isLoading } = useQuery({
        queryFn: () => getCategoryById(id).then(response => response.data),
        queryKey: ["category"]
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="flex flex-col text-center w-full mt-20">
                <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">{category.categoryName}</h2>
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">ALL Books of {category.categoryName}</h1>
            </div>
            <BooksComponent key={category.categoryId} data={category.books} />
        </>
    )
}

export default CategoryBooksComponent