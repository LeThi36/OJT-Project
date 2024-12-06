import React, { useEffect, useState } from 'react'
import { isUserLoggedIn, loginAPICALL, saveLoggedInUser, storeToken } from '../../Services/AuthService'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


function Login() {


    const [errors, setErrors] = useState({})
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const navigate = useNavigate()

    const isValidate = () => {
        const newErrors = {}
        if (usernameOrEmail.trim() === '' || !usernameOrEmail) {
            newErrors.usernameOrEmail = ('usernameOrEmail is required')
        }
        if (!password || password.trim() === '') {
            newErrors.password = ('password is required')
        }
        setErrors(newErrors)
        return Object.values(newErrors).length === 0
    }

    const handleLogin = () => {
        if (isValidate()) {

            loginAPICALL(usernameOrEmail, password).then(response => {
                const token = 'Bearer ' + response.data.accessToken
                const userId = response.data.userId
                const role = response.data.role
                storeToken(token)
                saveLoggedInUser(usernameOrEmail, role, userId)
                if (role == "ROLE_ADMIN") {
                    navigate('/admin')
                }
                if (role == "ROLE_USER") {
                    navigate('/')
                }
            }).catch(error => {
                alert('wrong username or password')
            })
        }
    }

    const handleLoginFailure = () => {
        console.error('Login failed');
    };

    const handleLoginSuccess = (idToken) => {
        axios.post('http://localhost:8080/api/auth/login/google', idToken, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            const role = response.data.role
            const userId = response.data.userId
            const token = 'Bearer ' + response.data.accessToken
            storeToken(token)
            saveLoggedInUser(usernameOrEmail, role, userId)
            console.log(response.data);


            if (role == "ROLE_ADMIN") {
                navigate('/admin')
            }
            if (role == "ROLE_USER") {
                navigate('/')
            }

        }).catch(error => {
            console.error(error);

        })


    }



    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_googleClientId}>
            <div>
                <div className="mx-auto container flex items-center" id="nav">
                    <div className="w-full pt-2 p-4">

                        <div className="mx-auto md:p-6 md:w-1/2">
                            <div className="flex flex-wrap justify-between">
                                <h1 className="text-2xl text-neutral-500 hover:text-neutral-500 transition duration-500 p-4">
                                    <i className="fas fa-sign-in-alt fa-fw fa-lg"></i>
                                    Sign-in
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
                                        {errors.usernameOrEmail && (
                                            <p className="text-red-500 text-sm mt-1">{errors.usernameOrEmail}</p>
                                        )}
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                            </div>
                                            <input value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} id="username" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" placeholder="you@example.com" />
                                        </div>
                                    </div>

                                    <div className="mb-8 text-left ">
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
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" type="password" className="block pr-10 shadow appearance-none border-2 border-neutral-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-900 transition duration-500 ease-in-out" />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <label className=" block text-gray-500 font-bold" htmlFor="remember">
                                                    <input value={remember} onChange={() => setRemember(!value)} className="ml-2 leading-tight" type="checkbox" id="remember" name="remember" />
                                                    <span className="mx-2 text-sm">
                                                        remember me
                                                    </span>
                                                </label>
                                            </div>
                                            <div>
                                                <a className="font-bold text-sm text-neutral-500 hover:text-orange-800" href="/reset-password-request">
                                                    forgot password
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='google-login'>

                                        <GoogleLogin
                                            onSuccess={(credentialResponse) => handleLoginSuccess(credentialResponse)}
                                            onError={handleLoginFailure}
                                        />
                                    </div>

                                    <div className="mb-4 text-center">
                                        <button onClick={() => handleLogin()} className="transition duration-500 bg-gray-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            Login
                                        </button>
                                    </div>
                                    <div className="mt-8">
                                        <p className="text-sm">
                                            no account
                                            <a className="font-bold text-sm text-neutral-500 hover:text-orange-800" href="/register">
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
        </GoogleOAuthProvider>
    )
}

export default Login