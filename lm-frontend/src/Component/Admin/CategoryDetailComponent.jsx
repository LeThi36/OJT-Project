import React from 'react'
import { useQuery } from 'react-query';
import { getCategoryById } from '../../Services/CategoryService';
import { Link, useParams } from 'react-router-dom';
import BooktableComponent from './BooktableComponent';

function CategoryDetailComponent() {

    const { id } = useParams()

    const { data: category, isLoading } = useQuery({
        queryFn: () => getCategoryById(id).then(response => response.data),
        queryKey: ["category", id]
    })

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <BooktableComponent data={category.books} title={category.categoryName}/>
        </>
    )
}

export default CategoryDetailComponent