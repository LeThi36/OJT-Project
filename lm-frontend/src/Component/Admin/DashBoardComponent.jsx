import React, { useEffect, useState } from 'react'
import { countBook } from '../../Services/BookService'
import { useQuery } from 'react-query'
import { countBorrowedRecord, countPendingBorrowRecord, countRecord } from '../../Services/BorrowRecordService'
import { BarChart, BarPlot, ChartContainer } from '@mui/x-charts'
import { userCount } from '../../Services/UserService'
import { getAllCategoryName } from '../../Services/CategoryService'

function DashBoardComponent() {
    const { data: numberOfBook, isLoadingBookNum } = useQuery({
        queryFn: () => countBook().then(response => response.data),
        queryKey: ["NUMBER_OF_BOOK"]
    })

    const { data: numberOfUser, isLoadingUserNum } = useQuery({
        queryFn: () => userCount().then(response => response.data),
        queryKey: ["NUMBER_OF_USER"]
    })

    const { data: numberOfBorrowRecord, isloadingBorrowRecordNum } = useQuery({
        queryFn: () => countBorrowedRecord().then(res => res.data),
        queryKey: ["NUMBER_OF_BORROW_REQUEST"]
    })

    const { data: numberOfBorrowPendingRecord, isloadingPendingBorrowRecordNum } = useQuery({
        queryFn: () => countPendingBorrowRecord().then(res => res.data),
        queryKey: ["NUMBER_OF_PENDING_BORROW_REQUEST"]
    })


    if (isLoadingBookNum) {
        return (<div>loading number of book</div>)
    }

    if (isloadingPendingBorrowRecordNum) {
        return (<div>loading number of pending borrow</div>)
    }

    if (isloadingBorrowRecordNum) {
        return (<div>loading number of borrow record</div>)
    }

    if (isLoadingUserNum) {
        return (<div>loading number of user</div>)
    }

    const [xLabels, setXLabels] = useState([])
    const [uData, setUData] = useState([])

    // const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];

    useEffect(() => {
        getAllCategoryName().then(res => setXLabels(res.data))
        countRecord().then(res => setUData(res.data))
    }, [])


    return (
        <div>
            <div className="flex flex-wrap -m-4 text-center">
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <svg className="text-indigo-500 w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" /></svg>
                        <h2 className="title-font font-medium text-3xl text-gray-900">{numberOfBorrowRecord}</h2>
                        <p className="leading-relaxed">Borrow record</p>
                    </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <svg className=" text-indigo-500 w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>
                        <h2 className="title-font font-medium text-3xl text-gray-900">{numberOfUser}</h2>
                        <p className="leading-relaxed">Users</p>
                    </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <svg className="text-indigo-500 w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                        <h2 className="title-font font-medium text-3xl text-gray-900">{numberOfBorrowPendingRecord}</h2>
                        <p className="leading-relaxed">Pending borrow</p>
                    </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <svg className="text-indigo-500 w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z" /><path d="M13 3v6h6" /></svg>
                        <h2 className="title-font font-medium text-3xl text-gray-900">{numberOfBook}</h2>
                        <p className="leading-relaxed">Book</p>
                    </div>
                </div>
            </div>
            <div className='my-6'>
                <h1 className='flex justify-center text-4xl font-semibold'>Number of borrow request Order By Category</h1>
            </div>
            <BarChart className='mx-auto mt-5'
                colors={['#6366f1']}
                width={1000}
                height={300}
                series={[{ data: uData, label: 'borrow request', type: 'bar' }]}
                xAxis={[{ scaleType: 'band', data: xLabels }]}

            >
            </BarChart>
        </div>
    )
}

export default DashBoardComponent