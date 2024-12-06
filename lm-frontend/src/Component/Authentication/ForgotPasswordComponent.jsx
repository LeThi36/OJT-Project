import React, { useState } from 'react'
import { resetPasswordRequest } from '../../Services/ResetpasswordService'

function ForgotPasswordComopent() {

  const [email, setEmail] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState({})

  const isValidate = () => {
    const newErrors = {}
    if (!email || email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is not valid"
    }
    setErrors(newErrors)
    return Object.values(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isValidate()) {
      setIsLoading(true)
      try {
        await resetPasswordRequest({ email: email }).then(res => alert(res.data)).catch(err => alert(err))
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className='h-screen'>
      <div className="mx-auto container flex items-center" id="nav">
        <div className="w-full pt-2 p-4">

          <div className="mx-auto md:p-6 md:w-1/2">
            <div className="flex flex-wrap justify-between">
              <h1 className="text-2xl text-neutral-500 hover:text-neutral-500 transition duration-500 p-4">
                <i className="fas fa-sign-in-alt fa-fw fa-lg"></i>
                Forgot-password ?
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
                  <label htmlFor="email" className="text-gray-700 text-lg font-bold mb-2">
                    Email
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <input onChange={(e) => setEmail(e.target.value)} id="email" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="mb-4 text-center">
                  <button onClick={(e) => handleSubmit(e)} className=" transition duration-500 bg-gray-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Reset Password'}
                  </button>
                </div>
                <div className="mt-8">
                  <p className="text-sm">
                    no account
                    <a className="ms-1 font-bold text-sm text-neutral-500 hover:text-orange-800" href="/register">
                      sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordComopent