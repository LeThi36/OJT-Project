import React, { useEffect, useState } from 'react'
import BooksComponent from './BooksComponent';
import { useQuery } from 'react-query';
import { countBook, getAllBook } from '../../Services/BookService';
import CategoryComponent from './CategoryComponent';
import { Link } from 'react-router-dom';

function BooksCardComponent() {

  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    countBook().then(res => {
      const count = res.data
      setTotalPage(Math.ceil(count / 8))
    }).catch(err => console.log(err))
  }, [])


  const { data: books, isLoading } = useQuery({
    queryKey: ["books", currentPage],
    queryFn: () => getAllBook(currentPage,8).then(response => response.data),
    keepPreviousData: true
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
      <div className='flex justify-center'>
        {Array(totalPage)
          .fill(0)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`mx-1 px-4 py-2 ${currentPage === index ? 'bg-indigo-700' : 'bg-indigo-500'
                } text-white rounded`}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </>
  )
}

export default BooksCardComponent