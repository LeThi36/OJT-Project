import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getResetPasswordToken, verifyToken } from '../../Services/ResetpasswordService'
import { resetPasswordAPICall } from '../../Services/AuthService'

function ResetPasswordComponent() {
    const { token } = useParams()
    const [resetPassword, setRequestPassword] = useState(
        {
            rsPass: '',
            comfirmRsPass: ''
        }
    )

    const [email, setEmail] = useState('')

    const [message, setMessage] = useState('')

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const requestObj = {
        email: email,
        token: token,
        password: resetPassword.rsPass
    }

    useEffect(() => {
        verifyToken(token).then(res => setMessage(res.data))
        getResetPasswordToken(token).then(res => setEmail(res.data.user.email))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(requestObj);
        
        if (resetPassword.rsPass !== resetPassword.comfirmRsPass) {
            alert("confirm password does not match!")
            setRequestPassword(
                {
                    rsPass: '',
                    comfirmRsPass: ''
                }
            )
        } else {
            try {
                setIsLoading(true)
                await resetPasswordAPICall(requestObj).then(res => alert(res.data))
            } catch (error) {
                console.log(error);
            } finally{
                setIsLoading(false)
                navigate('/login')
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
                                Rest-password
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
                                    <p>
                                        {message}
                                    </p>
                                    <label htmlFor="email" className="text-gray-700 text-lg font-bold mb-2">
                                        Email
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        </div>
                                        <input value={email} id="email" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" placeholder="you@example.com" readOnly />
                                    </div>
                                </div>
                                <div className="mb-8 text-left">
                                    <label htmlFor="resetpassword" className="text-gray-700 text-lg font-bold mb-2">
                                        Reset Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        </div>
                                        <input onChange={(e) => setRequestPassword({ ...resetPassword, rsPass: e.target.value })} id="resetpassword" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" placeholder="you@example.com" />
                                    </div>
                                </div>
                                <div className="mb-8 text-left">
                                    <label htmlFor="confirmPassword" className="text-gray-700 text-lg font-bold mb-2">
                                        Reset Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        </div>
                                        <input onChange={(e) => setRequestPassword({ ...resetPassword, comfirmRsPass: e.target.value })} id="confirmPassword" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" placeholder="you@example.com" />
                                    </div>
                                </div>
                                <div className="mb-4 text-center">
                                    <button onClick={(e) => handleSubmit(e)} className=" transition duration-500 bg-gray-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Reset Password
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

export default ResetPasswordComponent