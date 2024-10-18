import React from 'react'
import { getAuthorById } from '../../Services/AuthorService'
import { useParams } from 'react-router-dom'
import BooktableComponent from './BooktableComponent'
import { useQuery } from 'react-query'

function AuthorDetailCoponent() {

    const { id } = useParams()

    const { data: author, isLoading } = useQuery({
        queryFn: () => getAuthorById(id).then(response => response.data),
        queryKey: ["author", id]
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <BooktableComponent data={author.books} title={author.authorName} />
        </>

    )
}

export default AuthorDetailCoponent