import React from 'react'
import BooksComponent from './BooksComponent';
import { useQuery } from 'react-query';
import { getAllBook } from '../../Services/BookService';
import CategoryComponent from './CategoryComponent';

function BooksCardComponent() {
  const { data: books, isLoading } = useQuery({
    queryFn: () => getAllBook().then(response => response.data),
    queryKey: ["books"]
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <CategoryComponent />
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Books</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">ALL Books</h1>
      </div>
      <BooksComponent data={books} />
    </>
  )
}

export default BooksCardComponent