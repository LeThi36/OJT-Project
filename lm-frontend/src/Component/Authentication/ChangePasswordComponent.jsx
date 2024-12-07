import React, { useState } from 'react'
import { changePasswordAPICall, getLoggedInUser } from '../../Services/AuthService'
import { useNavigate } from 'react-router-dom'

function ChangePasswordComponent() {

  const [user, setUser] = useState({
    email: getLoggedInUser(),
    oldPassword: '',
    newPassword: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const naviage = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user.newPassword === confirmPassword) {
      changePasswordAPICall(user).then(response => {
        alert(response.data)
      })
    } else {
      alert("confirm password not match")
    }
    naviage("/login")
  }
  return (
    <div>
      <div className="mx-auto container flex items-center" id="nav">
        <div className="w-full pt-2 p-4">

          <div className="mx-auto md:p-6 md:w-1/2">
            <div className="flex flex-wrap justify-between">
              <h1 className="text-2xl text-neutral-500 hover:text-neutral-500 transition duration-500 p-4">
                <i className="fas fa-sign-in-alt fa-fw fa-lg"></i>
                Change your password
              </h1>
              <a href="/" className="mt-8 text-neutral-500 hover:text-neutral-950 transition duration-500">
                <svg className=" w-6 h-6 inline-block align-bottom" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                Back to Home
                <i className="fas fa-chevron-circle-left fa-fw"></i>
              </a>
            </div>

            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div>
                <div className="mb-8 text-left">
                  <label htmlFor="username" className="text-gray-700 text-lg font-bold mb-2">
                    Username or Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} id="username" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" />
                  </div>
                </div>

                <div className="mb-8 text-left ">
                  <label htmlFor="oldPassword" className="block text-gray-700 text-lg font-bold mb-2">
                    Old Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <input value={user.oldPassword} onChange={(e) => setUser({ ...user, oldPassword: e.target.value })} name="oldPassword" id="oldPassword" type="password" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" />
                  </div>
                </div>
                <div className="mb-8 text-left ">
                  <label htmlFor="newPassword" className="block text-gray-700 text-lg font-bold mb-2">
                    New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <input value={user.newPassword} onChange={(e) => setUser({ ...user, newPassword: e.target.value })} name="newPassword" id="newPassword" type="password" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" />
                  </div>
                </div>
                <div className="mb-8 text-left ">
                  <label htmlFor="confirmPassword" className="block text-gray-700 text-lg font-bold mb-2">
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword" id="confirmPassword" type="password" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" />
                  </div>
                </div>
                <div className="mb-4 text-center">
                  <button onClick={(e) => handleSubmit(e)} className="transition duration-500 bg-gray-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordComponent