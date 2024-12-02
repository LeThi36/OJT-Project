import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById, updateUser, updateUserImage } from '../../Services/UserService'
import { useQuery } from 'react-query'

function UserProfileComponent() {
    const { id } = useParams()

    const [isEdit, setIsEdit] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [userProfile, setUserProfile] = useState(
        {
            phoneNumber: '',
            address: ''
        }
    )

    const { data: user, isLoading, refetch } = useQuery({
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

    const handleUpdate = (e) => {
        e.preventDefault()
        setIsEdit(true)
    }

    const handleSave = (e) => {
        e.preventDefault()
        updateUser(id, userProfile).then(res => { refetch(), setIsEdit(false) })
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setIsEdit(false)
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await updateUserImage(formData, id)
            console.log("Response:", response)
            alert("Avatar uploaded successfully!")
            refetch()
        } catch (error) {
            console.error("Error uploading avatar:", error)
            alert("Failed to upload avatar.")
        }
    };

    const handleButtonClick = () => {
        document.getElementById("fileInput").click();
    };

    let imageUrl = user.imageUrl
    const url = imageUrl.split('id=')[1]

    return (
        <div className='w-full mt-16'>
            <div className="bg-white w-2/3 shadow overflow-hidden sm:rounded-lg mx-auto">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
                        {user.username} Profile
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 text-center">
                        Details and informations about {user.username}.
                    </p>
                    <a href='/change-password' className="mt-1 text-grey-900 font-semibold capitalize text-start">
                        Change password
                    </a>

                    {isEdit ? (
                        <>
                            <button onClick={(e) => handleSave(e)} className="mt-1 text-grey-900 font-semibold capitalize border-s-2 ps-2 ms-2 border-s-gray-900 text-emerald-700">
                                save
                            </button>
                            <button onClick={(e) => handleCancel(e)} className="mt-1 text-grey-900 font-semibold capitalize border-s-2 ps-2 ms-2 border-s-gray-900 text-red-700">
                                cancel
                            </button>
                        </>
                    ) : (
                        <button onClick={(e) => handleUpdate(e)} className="mt-1 text-grey-900 font-semibold capitalize text-start mx-2 border-s-2 ps-2 border-s-gray-900">
                            Update Profile
                        </button>
                    )}

                </div>
                <div className='px-5 border-t-2 h-64 w-full bg-[url("https://miro.medium.com/v2/resize:fit:1200/1*6Jp3vJWe7VFlFHZ9WhSJng.jpeg")]'>
                    <div className='flex justify-center'>
                        <div className='relative'>
                            <img className='border-slate-950 border-2 object-cover rounded-full mt-2 h-56 w-56' src={`https://drive.google.com/thumbnail?id=${url}&sz=w1000`} alt="drive image" />
                            <button onClick={(e) => handleButtonClick(e)} className='absolute border rounded-full bg-white left-3/4 top-5'>
                                <svg className="w-[24px] h-[24px] fill-[#8e8e8e]" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                    <path d="M213.1 64.8L202.7 96H128c-35.3 0-64 28.7-64 64V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H437.3L426.9 64.8C420.4 45.2 402.1 32 381.4 32H258.6c-20.7 0-39 13.2-45.5 32.8zM448 256c0 8.8-7.2 16-16 16H355.3c-6.2 0-11.3-5.1-11.3-11.3c0-3 1.2-5.9 3.3-8L371 229c-13.6-13.4-31.9-21-51-21c-19.2 0-37.7 7.6-51.3 21.3L249 249c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l19.7-19.7C257.4 172.7 288 160 320 160c31.8 0 62.4 12.6 85 35l23.7-23.7c2.1-2.1 5-3.3 8-3.3c6.2 0 11.3 5.1 11.3 11.3V256zM192 320c0-8.8 7.2-16 16-16h76.7c6.2 0 11.3 5.1 11.3 11.3c0 3-1.2 5.9-3.3 8L269 347c13.6 13.4 31.9 21 51 21c19.2 0 37.7-7.6 51.3-21.3L391 327c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-19.7 19.7C382.6 403.3 352 416 320 416c-31.8 0-62.4-12.6-85-35l-23.7 23.7c-2.1 2.1-5 3.3-8 3.3c-6.2 0-11.3-5.1-11.3-11.3V320z"></path>
                                </svg>
                            </button>
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 flex">

                    <dl className='w-full'>
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
                                {isEdit ? (
                                    <input
                                        type="text"
                                        className="border p-1 rounded w-full"
                                        onChange={(e) => {
                                            setUserProfile({ ...userProfile, address: e.target.value });
                                        }}
                                    />
                                ) : (
                                    user.address
                                )}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Phone number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {isEdit ? (
                                    <input
                                        type="text"
                                        className="border p-1 rounded w-full"
                                        onChange={(e) => setUserProfile({ ...userProfile, phoneNumber: e.target.value })}
                                    />
                                ) : (
                                    user.phoneNumber
                                )}
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
