import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { countCategory, getAllCategory } from '../../Services/CategoryService'
import { useQuery } from 'react-query'
import axios from 'axios'

function CategoryComponent() {

    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        countCategory().then(res => {
            const count = res.data
            setTotalPage(Math.ceil(count / 6))
        }
        ).catch(err => console.log(err))
    }, [])


    const { data: categoryDetail, isLoading, isError, error } = useQuery({
        queryKey: ['CATEGORY_DETAIL',currentPage],
        queryFn: () => getAllCategory(currentPage,6).then(res => res.data),
        keepPreviousData: true

    })


    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) return <p>Error: {error.message}</p>

    if (!categoryDetail) {
        return <p>No categories found.</p>
    }

    return (

        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">The store's book categories</h2>
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">The store's book categories. Click to view detail category</h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {
                            categoryDetail.map((c) => {
                                return (
                                    <Link key={c.categoryId} to={`/category/${c.categoryId}`} className="p-4 md:w-1/3 cursor-pointer">
                                        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                            <div className="flex items-center mb-3">
                                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                                    <svg className="w-[24px] h-[24px] fill-[#ffffff]" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">


                                                        <path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z"></path>

                                                    </svg>
                                                </div>
                                                <h2 className="text-gray-900 text-lg title-font font-medium" key={c.categoryId}>{c.categoryName}</h2>
                                            </div>
                                            <div className="flex-grow">

                                                <p className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                                    </svg>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )

                            })
                        }

                    </div>
                    <div className="flex justify-center mt-4">
                        {Array(totalPage).fill(0).map((page, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`mx-1 px-4 py-2 ${currentPage === index ? 'bg-indigo-700' : 'bg-indigo-500'} text-white rounded`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CategoryComponent