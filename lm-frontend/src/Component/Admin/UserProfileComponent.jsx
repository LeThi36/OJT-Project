import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../Services/UserService'
import { useQuery } from 'react-query'

function UserProfileComponent() {
    const { id } = useParams()

    const { data: user, isLoading } = useQuery({
        queryFn: () => getUserById(id).then(response => response.data),
        queryKey: ["user"]
    })

    if (isLoading) {
        return <p>Loading...</p>
    }


    function formatDateTime(isoString) {
        const date = new Date(isoString);
      
        const formattedDate = date.toLocaleDateString('en-GB');
        const formattedTime = date.toLocaleTimeString('en-GB'); 
      
        return `${formattedDate} ${formattedTime}`;
      }

    return (
        <div className='w-full'>
            <div className="bg-white w-2/3 shadow overflow-hidden sm:rounded-lg mx-auto">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
                        {user.username} Profile
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 text-center">
                        Details and informations about {user.username}.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {user.email}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {user.address}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Phone number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {user.phoneNumber}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Role
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {user.roleName}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                User Created At
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {formatDateTime(user.createdAt)}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                User Profile Updated At
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {formatDateTime(user.updatedAt)}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default UserProfileComponent
