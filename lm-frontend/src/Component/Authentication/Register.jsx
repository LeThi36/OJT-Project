import React, { useState } from 'react'
import { registerAPICall } from '../../Services/AuthService'

function Register() {
    
    const [errors, setErrors] = useState({})
    const [username, setUsername] = useState('')
    const [password_hash, setPassword_hash] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [passwordRepeate, setPasswordRepeat] = useState('')

    const isValidate = () => {
        const newErrors = {};

        if (!username || username.trim() === "") {
            newErrors.username = "Username is required"
        }

        if (!email || email.trim() === "") {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Email is not valid"
        }

        if (!address || address.trim() === "") {
            newErrors.address = "Address is required"
        }

        if (!phonenumber || phonenumber.trim() === "") {
            newErrors.phonenumber = "Phone number is required"
        } else if (!/^\d{10,11}$/.test(phonenumber)) {
            newErrors.phonenumber = "Phone number seem not right"
        }

        if (!password_hash || password_hash.trim() === "") {
            newErrors.password = "Password is required"
        } else if (password_hash.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }

        if (!passwordRepeate || passwordRepeate.trim() === "") {
            newErrors.passwordRepeat = "Repeat password is required"
        } else if (password_hash !== passwordRepeate) {
            newErrors.passwordRepeat = "Passwords do not match"
        }

        setErrors(newErrors)

        return Object.values(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isValidate()) {
            const register = { username, password_hash, email, address, phonenumber }
            registerAPICall(register).then(response => {
                alert(response.data)
            }).catch(error => {
                console.error(error);
            })
        }
    }


    return (
        <div className="mx-auto container flex items-center" id="nav">
            <div className="w-full pt-2 p-4">
                <div className="mx-auto md:p-6 md:w-3/4">
                    <div className="flex flex-wrap justify-between">
                        <h1 className="text-2xl text-neutral-500 hover:text-neutral-500 transition duration-500 p-4">
                            <i className="fas fa-sign-in-alt fa-fw fa-lg"></i>
                            Sign-up
                        </h1>
                        <a href="/" className="mt-8 text-neutral-500 hover:text-neutral-950 transition duration-500">
                            <svg className=" w-6 h-6 inline-block align-bottom" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                            Back to Home
                            <i className="fas fa-chevron-circle-left fa-fw"></i>
                        </a>
                    </div>

                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <form method="POST" action="#login">
                            <div className='grid grid-cols-2 gap-3'>
                                <div className="mb-8 text-left">
                                    <label htmlFor="username" className="text-gray-700 text-lg font-bold mb-2">
                                        Username
                                    </label>
                                    {errors.username && (
                                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                                    )}
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        </div>
                                        <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" required />
                                    </div>
                                </div>
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
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" placeholder="you@example.com" required />
                                    </div>
                                </div>


                                <div className="mb-8 text-left ">
                                    <label htmlFor="address" className="block text-gray-700 text-lg font-bold mb-2">
                                        Address
                                    </label>
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                    )}
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                                        </div>
                                        <input value={address} onChange={(e) => setAddress(e.target.value)} name="address" id="address" type="text" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" required />
                                    </div>
                                </div>
                                <div className="mb-8 text-left ">
                                    <label htmlFor="Phone number" className="block text-gray-700 text-lg font-bold mb-2">
                                        phone Number
                                    </label>
                                    {errors.phonenumber && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phonenumber}</p>
                                    )}
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        </div>
                                        <input value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} name="Phone number" id="Phone number" type="Phone number" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" required />
                                    </div>
                                </div>
                                <div className="mb-8 text-left">
                                    <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
                                        Password
                                    </label>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        </div>
                                        <input value={password_hash} onChange={(e) => setPassword_hash(e.target.value)} name="password" id="password" type="password" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" required />
                                    </div>
                                </div>
                                <div className="mb-8 text-left">
                                    <label htmlFor="repeat password" className="block text-gray-700 text-lg font-bold mb-2">
                                        repeat password
                                    </label>
                                    {errors.passwordRepeat && (
                                        <p className="text-red-500 text-sm mt-1">{errors.passwordRepeat}</p>
                                    )}
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        </div>
                                        <input value={passwordRepeate} onChange={(e) => setPasswordRepeat(e.target.value)} name="repeat password" id="repeat password" type="password" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" required />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 text-center">
                                <button onClick={(e) => handleSubmit(e)} className="transition duration-500 bg-gray-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register