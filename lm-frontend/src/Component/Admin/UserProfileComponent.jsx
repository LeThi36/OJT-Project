import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../Services/UserService'

function UserProfileComponent() {
    const { id } = useParams()
    const [username, setUsername] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [role, setRole] = useState('')
    const [createAt, setCreateAt] = useState('')
    const [updateAt, setUpdateAt] = useState('')


    useEffect(() => {
        if (id) {
            getUserById(id).then(response => {
                setUsername(response.data.username)
                setEmail(response.data.email)
                setPhoneNumber(response.data.phoneNumber)
                setAddress(response.data.address)
                setRole(response.data.roleName)
                setCreateAt(response.data.createdAt)
                setUpdateAt(response.data.updatedAt)
                console.log(response.data);

            }).catch(error => {
                alert(error)
            })
        }
    }, [id])

    function formatDateTime(isoString) {
        const date = new Date(isoString);
      
        const formattedDate = date.toLocaleDateString('en-GB');
        const formattedTime = date.toLocaleTimeString('en-GB'); 
      
        return `${formattedDate} ${formattedTime}`;
      }

    return (
        <div className='w-full'>
            <div className="bg-white max-w-4xl shadow overflow-hidden sm:rounded-lg mx-auto">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {username} Profile
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 text-center">
                        Details and informations about {username}.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {email}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {address}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Phone number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {phoneNumber}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Role
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {role}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                User Created At
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatDateTime(createAt)}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                User Profile Updated At
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatDateTime(updateAt)}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default UserProfileComponent
