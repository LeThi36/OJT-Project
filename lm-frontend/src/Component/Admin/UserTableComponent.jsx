import React, { useEffect, useState } from 'react'
import SidebarComopnent from './SidebarComopnent'
import { getAllUser, userCount } from '../../Services/UserService'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

function UserTableComponent() {

  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    userCount().then(res => { const count = res.data; setTotalPage(Math.ceil(count / 8)) })
  }, [])

  const { data: users, isLoading } = useQuery({
    queryFn: () => getAllUser().then(response => response.data),
    queryKey: ["users", currentPage]
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div >
      <div className="flex-grow border-2 border-gray-200 border-dashed rounded-lg">
        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-gray-500">
            <caption className="p-4 text-lg font-bold text-left text-gray-50 bg-slate-950 rounded-lg m-2">
              Users
            </caption>
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
    </div>
  )
}

export default UserTableComponent
