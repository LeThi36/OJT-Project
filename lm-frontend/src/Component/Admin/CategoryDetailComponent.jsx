import React from 'react'
import { useQuery } from 'react-query';
import { getCategoryById } from '../../Services/CategoryService';
import { Link, useParams } from 'react-router-dom';
import BooktableComponent from './BooktableComponent';

function CategoryDetailComponent() {

    const { id } = useParams()

    const { data: categoryDetail, isLoading } = useQuery({
        queryFn: () => getCategoryById(id).then(response => response.data),
        queryKey: ["CATEGORY_DETAIL", id]
    })

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <BooktableComponent data={categoryDetail.books} title={categoryDetail.categoryName}/>
        </>
    )
}

export default CategoryDetailComponent