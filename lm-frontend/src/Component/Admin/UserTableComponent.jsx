import React, { useEffect, useState } from 'react'
import SidebarComopnent from './SidebarComopnent'
import { getAllUser } from '../../Services/UserService'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

function UserTableComponent() {

  const { data: users, isLoading } = useQuery({
    queryFn: () => getAllUser().then(response => response.data),
    queryKey: ["users"]
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div >
      <div className="flex-grow border-2 border-gray-200 border-dashed rounded-lg">
        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-gray-500">
            <caption class="p-4 text-lg font-bold text-left text-gray-50 bg-slate-950 rounded-lg m-2">
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
    </div>
  )
}

export default UserTableComponent
