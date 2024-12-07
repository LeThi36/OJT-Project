import React, { useEffect, useState } from 'react'
import SidebarComopnent from './SidebarComopnent'
import { getAllUser, userCount } from '../../Services/UserService'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { getAllAuthor } from '../../Services/AuthorService'
import { getAllBook, searchBook } from '../../Services/BookService'
import { createBorrowRecord } from '../../Services/BorrowRecordService'

function UserTableComponent() {

  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [modal, setModal] = useState(false)
  const queryClient = useQueryClient()
  const [authorId, setAuthorId] = useState(null)
  const [searchContent, setSearchContent] = useState('')
  const [dateModal, setDateModal] = useState(false)
  const [borrowUser1, setBorrowUser1] = useState({
    userEmail: '',
    bookName: '',
    authorName: ''
  })
  const [borrowRequest, setBorrowRequest] = useState({
    userId: null,
    bookId: null,
    borrowDate: null,
    borrowDurationDays: null,
  })
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    userCount().then(res => { const count = res.data; setTotalPage(Math.ceil(count / 8)) })
  }, [])

  const { data: author, isLoading: loadingAuthors } = useQuery({
    queryKey: ['author'],
    queryFn: () => getAllAuthor().then(res => res.data),
    keepPreviousData: true
  })

  const { data: books, isLoading: loadingBookBook, isError: erroBook } = useQuery({
    queryKey: ['searchbook', searchContent, authorId],
    queryFn: () => searchBook(null, authorId, searchContent, null, 8).then((res) => res.data),
    keepPreviousData: true,
  })

  const { data: users, isLoading: isLoadingUser } = useQuery({
    queryFn: () => getAllUser().then(response => response.data),
    queryKey: ["users", currentPage]
  })


  const handleSearch = (e) => {
    e.preventDefault()
    queryClient.invalidateQueries(['searchbook'])
  }

  const handleCreateBorrowRecord = async (e) => {
    e.preventDefault()

    setIsCreating(true)
    try {
      await createBorrowRecord(borrowRequest).then(res => alert("create borrow request successfully")).catch(err => alert("some thing went wrong"))
    } catch (error) {
    } finally {
      setIsCreating(false)
    }

  }

  if (loadingBookBook || erroBook || isLoadingUser || loadingAuthors) {
    return <p>Loading data or an error occurred...</p>;
  }

  return (
    <div >
      <div className="flex-grow border-2 border-gray-200 border-dashed rounded-lg">
        <div className="relative overflow-x-auto w-full">
          <caption className="p-4 text-lg font-bold text-gray-50 bg-slate-950 rounded-lg m-2 flex justify-between">
            Users
            <div className='text-start'>
              <h2>Search for username or Email</h2>
              <div className=''>
                <input type='text' className='rounded-lg align-middle text-black'>
                </input>
                <button className='ms-3 bg-indigo-600 rounded-xl px-3 py-2 align-middle '>search</button>
              </div>
            </div>
          </caption>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope='col' className='text-center'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                return (
                  <tr key={u.userId}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <Link to={`/admin/user/${u.userId}`}>
                        {u.username}
                      </Link>

                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {u.email}
                    </th>
                    <td className="px-6 py-4">
                      {u.phoneNumber}
                    </td>
                    <td className="px-6 py-4">
                      {u.address}
                    </td>
                    <td className="px-6 py-4 w-1/6 text-center">
                      <button className='bg-black text-white rounded-xl px-3 py-2' onClick={() => { setModal(true); setBorrowUser1({ ...borrowUser1, userEmail: u.email }); setBorrowRequest({ ...borrowRequest, userId: u.userId }) }}>
                        create borrow request

                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex justify-center mt-4'>
        {
          Array(totalPage).fill(0).map((page, index) => {
            return (
              <button
                key={index}
                className='border rounded-md p-4 mx-2'
                onClick={() => setCurrentPage(index)}>
                {index + 1}
              </button>
            )
          })
        }
      </div>
      <div className={`${modal ? 'block' : 'hidden'} fixed inset-0 overflow-y-auto w-auto px-4 z-40 bg-gray-400 bg-opacity-25`}>
        <div className='relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-xl'>
          <div className="flex justify-end p-2">
            <button type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setModal(false)}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div className='mx-3 p-3'>
            <h2 className='text-xl font-semibold text-center uppercase mb-2'>search</h2>
            <div className=' w-full flex gap-3'>
              <input className='border-2 rounded-lg p-2 text-black grow' placeholder='book title' onChange={(e) => setSearchContent(e.target.value)} />
              <select onChange={(e) => setAuthorId(e.target.value === "null" ? null : e.target.value)} className='rounded-md'>
                <option value="null">
                  Author
                </option>
                {author.map((au) => {
                  return (
                    <option key={au.authorId} value={au.authorId}>
                      {au.authorName}
                    </option>
                  )
                })}
              </select>
              <button onClick={handleSearch} className="mx-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 duration-300">
                Search
              </button>
            </div>
          </div>
          <div className='text-center'>
            <button className='my-2 border-2 rounded-lg py-2 px-3 w-11/12 hover:cursor-default uppercase' disabled={true}>select a book</button>
          </div>
          <div className='min-h-60 mt-3 border-t-2 pt-2 bg-gray-200'>
            {
              books.map((b, index) => {
                return (
                  <div className='px-2'>
                    <button
                      key={index}
                      className='border-2 rounded-md w-full py-3 grid grid-cols-2 text-start align-middle bg-indigo-500 text-white'
                      onClick={() => {
                        setDateModal(true)
                        setBorrowUser1({ ...borrowUser1, authorName: b.author, bookName: b.title })
                        setBorrowRequest({ ...borrowRequest, bookId: b.bookId })
                      }}
                    >
                      <p className='font-semibold uppercase text-xs my-auto ms-5'>
                        book name: {b.title}
                      </p>
                      <p className='font-semibold uppercase text-xs my-auto ms-5'>
                        author Name: {b.author}
                      </p>
                    </button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      {/* date modal */}
      <div className={`${dateModal ? 'block' : 'hidden'} fixed inset-0 overflow-y-auto w-auto px-4 z-50 bg-black bg-opacity-25`}>
        <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
          <div className="flex justify-end p-2">
            <button type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setDateModal(false)}>
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
            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Select borrow Date and Return Date</h3>
            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Email: {borrowUser1.userEmail}</h3>
            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Book Name: {borrowUser1.bookName}</h3>
            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Author Name: {borrowUser1.authorName}</h3>
            <div className='grid grid-flow-col'>
              <div className='flex-col'>
                <label className='text-start'>Borrow Date</label>
                <input type='date' onChange={(e) => {
                  setBorrowRequest({ ...borrowRequest, borrowDate: e.target.value })
                }
                }
                  className=" text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" />
              </div>
              <div className='flex-col'>
                <label className=''>Return Date</label>
                <input type='date' onChange={(e) => {
                  setBorrowRequest({ ...borrowRequest, borrowDurationDays: Math.ceil((new Date(e.target.value) - new Date(borrowRequest.borrowDate)) / (1000 * 60 * 60 * 24)) })
                }
                }
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" />
              </div>
            </div>
            <div>
              <button className='border my-5 py-3 px-2 rounded-lg hover:bg-indigo-500 hover:text-white duration-300 w-full'
                onClick={(e) => handleCreateBorrowRecord(e)}
                disabled={isCreating}>
                {isCreating ? "Processing..." : "Create Borrow Request for this User"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserTableComponent
